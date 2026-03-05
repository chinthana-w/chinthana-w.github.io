import { GITHUB_USERNAME } from "@/app/lib/constants";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="py-8 px-6 border-t border-[#334155]">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-[#94a3b8] text-sm font-mono">
          Designed & Built by{" "}
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#38bdf8] hover:underline"
          >
            {GITHUB_USERNAME}
          </a>
        </p>
        <p className="text-[#94a3b8] text-sm font-mono">
          © {year} · Built with{" "}
          <a
            href="https://nextjs.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#38bdf8] hover:underline"
          >
            Next.js
          </a>{" "}
          &amp;{" "}
          <a
            href="https://tailwindcss.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#38bdf8] hover:underline"
          >
            Tailwind CSS
          </a>
        </p>
      </div>
    </footer>
  );
}
