/**
 * Lightweight client-side RAG (Retrieval-Augmented Generation) utilities.
 *
 * Pipeline:
 *   1. buildChunks  — split the resume and GitHub repos into discrete text chunks
 *   2. buildIndex   — embed all chunks in one batchEmbedContents API call
 *   3. retrieve     — embed an incoming query and return the top-K most
 *                     semantically similar chunk texts via cosine similarity
 */

export interface RagChunk {
  id: string;
  text: string;
  embedding: number[];
}

interface RepoInfo {
  name: string;
  description: string | null;
  language: string | null;
  topics: string[];
  fork: boolean;
  stargazers_count: number;
}

function cosineSimilarity(a: number[], b: number[]): number {
  let dot = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  const denom = Math.sqrt(normA) * Math.sqrt(normB);
  return denom === 0 ? 0 : dot / denom;
}

/**
 * Split the resume into per-section chunks and append one chunk per GitHub
 * repo. Returns un-embedded chunks ready to be passed to buildIndex.
 */
export function buildChunks(
  resumeText: string,
  repos: RepoInfo[]
): Omit<RagChunk, "embedding">[] {
  const chunks: Omit<RagChunk, "embedding">[] = [];

  // Split by === Section === markers, capturing the headers.
  const parts = resumeText.split(/(=== .+ ===)/);
  let currentSection = "Overview";
  let buffer = "";

  for (const part of parts) {
    const headerMatch = part.match(/^=== (.+) ===$/);
    if (headerMatch) {
      if (buffer.trim()) {
        chunks.push({
          id: currentSection,
          text: `[${currentSection}]\n${buffer.trim()}`,
        });
      }
      currentSection = headerMatch[1];
      buffer = "";
    } else {
      buffer += part;
    }
  }
  if (buffer.trim()) {
    chunks.push({
      id: currentSection,
      text: `[${currentSection}]\n${buffer.trim()}`,
    });
  }

  // One chunk per GitHub repo.
  for (const repo of repos.filter((r) => !r.fork && r.description)) {
    const lines = [
      `[GitHub Project: ${repo.name}]`,
      `Description: ${repo.description}`,
      repo.language ? `Language: ${repo.language}` : null,
      repo.topics?.length ? `Topics: ${repo.topics.slice(0, 6).join(", ")}` : null,
    ].filter(Boolean) as string[];
    chunks.push({ id: `repo:${repo.name}`, text: lines.join("\n") });
  }

  return chunks;
}

async function batchEmbed(texts: string[], apiKey: string): Promise<number[][]> {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/text-embedding-004:batchEmbedContents?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        requests: texts.map((text) => ({
          model: "models/text-embedding-004",
          content: { parts: [{ text }] },
        })),
      }),
    }
  );
  if (!res.ok) return texts.map(() => []);
  const data = await res.json();
  return (data.embeddings as { values: number[] }[]).map((e) => e?.values ?? []);
}

/**
 * Embed all chunks in a single batch request and return the complete index.
 * Call once on startup and cache the result for the session.
 */
export async function buildIndex(
  chunks: Omit<RagChunk, "embedding">[],
  apiKey: string
): Promise<RagChunk[]> {
  const embeddings = await batchEmbed(
    chunks.map((c) => c.text),
    apiKey
  );
  return chunks.map((c, i) => ({ ...c, embedding: embeddings[i] ?? [] }));
}

/**
 * Embed a query and return the texts of the top-K most relevant chunks.
 * Falls back to returning the first topK chunk texts if embedding fails.
 */
export async function retrieve(
  query: string,
  index: RagChunk[],
  apiKey: string,
  topK = 5
): Promise<string[]> {
  if (index.length === 0) return [];

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/text-embedding-004:embedContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "models/text-embedding-004",
        content: { parts: [{ text: query }] },
      }),
    }
  );

  if (!res.ok) return index.slice(0, topK).map((c) => c.text);

  const data = await res.json();
  const queryEmbedding: number[] = data.embedding?.values ?? [];
  if (queryEmbedding.length === 0) return index.slice(0, topK).map((c) => c.text);

  return index
    .filter((c) => c.embedding.length > 0)
    .map((c) => ({ text: c.text, score: cosineSimilarity(queryEmbedding, c.embedding) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
    .map((c) => c.text);
}
