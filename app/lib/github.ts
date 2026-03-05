export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  updated_at: string;
  fork: boolean;
}

export async function fetchGitHubRepos(username: string): Promise<GitHubRepo[]> {
  const res = await fetch(
    `https://api.github.com/users/${username}/repos?sort=updated&per_page=50&type=public`,
    {
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
      next: { revalidate: 3600 },
    }
  );

  if (!res.ok) {
    return [];
  }

  const repos: GitHubRepo[] = await res.json();
  return repos
    .filter((repo) => !repo.fork && repo.description)
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 12);
}
