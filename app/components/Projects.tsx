"use client";

import { useState, useEffect } from "react";
import { GITHUB_USERNAME } from "@/app/lib/constants";
import type { GitHubRepo } from "@/app/lib/github";

function StarIcon() {
  return (
    <svg
      className="w-4 h-4"
      fill="currentColor"
      viewBox="0 0 20 20"
      aria-hidden="true"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

function ForkIcon() {
  return (
    <svg
      className="w-4 h-4"
      fill="currentColor"
      viewBox="0 0 16 16"
      aria-hidden="true"
    >
      <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0z" />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
      />
    </svg>
  );
}

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Java: "#b07219",
  "C++": "#f34b7d",
  Go: "#00ADD8",
  Rust: "#dea584",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Shell: "#89e051",
};

export default function Projects() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadRepos() {
      try {
        const res = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=50&type=public`,
          { headers: { Accept: "application/vnd.github.v3+json" } }
        );
        if (!res.ok) throw new Error("Failed to fetch");
        const data: GitHubRepo[] = await res.json();
        const filtered = data
          .filter((repo) => !repo.fork && repo.description)
          .sort((a, b) => b.stargazers_count - a.stargazers_count)
          .slice(0, 12);
        setRepos(filtered);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    loadRepos();
  }, []);

  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-[#1d1d1f] mb-2">
          <span className="text-[#0071e3] font-mono text-xl mr-3">05.</span>
          GitHub Showcase
        </h2>
        <div className="w-48 h-0.5 bg-[#d2d2d7] mb-4" />
        <p className="text-[#6e6e73] mb-12">
          What I&apos;m working on these days. Check out{" "}
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0071e3] hover:underline"
          >
            my GitHub profile
          </a>{" "}
          for more.
        </p>

        {loading && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-white border border-[#d2d2d7] rounded-xl p-6 animate-pulse"
              >
                <div className="h-5 bg-[#e8e8ed] rounded w-3/4 mb-3" />
                <div className="h-4 bg-[#e8e8ed] rounded w-full mb-2" />
                <div className="h-4 bg-[#e8e8ed] rounded w-5/6" />
              </div>
            ))}
          </div>
        )}

        {error && (
          <div className="text-center py-16">
            <p className="text-[#6e6e73] mb-4">
              Unable to load projects right now.
            </p>
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0071e3] hover:underline"
            >
              View GitHub Profile →
            </a>
          </div>
        )}

        {!loading && !error && repos.length === 0 && (
          <div className="text-center py-16">
            <p className="text-[#6e6e73]">No public repositories found.</p>
          </div>
        )}

        {!loading && !error && repos.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {repos.map((repo) => (
              <article
                key={repo.id}
                className="group bg-[#f8f8fc] border border-[#ddddf5] rounded-xl p-6 flex flex-col hover:border-[#0071e3]/40 hover:-translate-y-1 transition-all duration-300 shadow-sm"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-[#0071e3]"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                      aria-hidden="true"
                    >
                      <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8Z" />
                    </svg>
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-[#1d1d1f] group-hover:text-[#0071e3] transition-colors truncate"
                    >
                      {repo.name}
                    </a>
                  </div>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#6e6e73] hover:text-[#0071e3] transition-colors flex-shrink-0 ml-2"
                    aria-label={`Open ${repo.name} on GitHub`}
                  >
                    <ExternalLinkIcon />
                  </a>
                </div>

                <p className="text-[#1a1a1a] text-sm leading-relaxed flex-1 mb-4">
                  {repo.description}
                </p>

                {repo.topics && repo.topics.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {repo.topics.slice(0, 3).map((topic) => (
                      <span
                        key={topic}
                        className="text-xs px-2 py-0.5 rounded-full bg-[#0071e3]/8 text-[#0071e3] font-mono"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center gap-4 text-sm text-[#6e6e73] mt-auto">
                  {repo.language && (
                    <span className="flex items-center gap-1.5">
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{
                          backgroundColor:
                            LANGUAGE_COLORS[repo.language] ?? "#6e6e73",
                        }}
                      />
                      <span className="font-mono">{repo.language}</span>
                    </span>
                  )}
                  <span className="flex items-center gap-1 text-[#6e6e73]">
                    <StarIcon />
                    {repo.stargazers_count}
                  </span>
                  <span className="flex items-center gap-1 text-[#6e6e73]">
                    <ForkIcon />
                    {repo.forks_count}
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="relative overflow-hidden inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0071e3]/8 border border-[#0071e3]/25 shadow-[0_2px_12px_rgba(0,113,227,0.08)] text-[#0071e3] font-semibold hover:bg-[#0071e3]/14 transition-all duration-200"
          >
            <span className="absolute inset-0 rounded-full bg-gradient-to-b from-white/[0.07] to-transparent pointer-events-none" aria-hidden="true" />
            <span className="relative flex items-center gap-2">View All on GitHub
            <ExternalLinkIcon /></span>
          </a>
        </div>
      </div>
    </section>
  );
}
