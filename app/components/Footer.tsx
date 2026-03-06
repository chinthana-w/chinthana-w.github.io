import { GITHUB_USERNAME } from "@/app/lib/constants";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="py-8 px-6 border-t border-[#d2d2d7]">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-[#6e6e73] text-sm font-mono">
          Designed & Built by{" "}
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0071e3] hover:underline"
          >
            {GITHUB_USERNAME}
          </a>
        </p>
        <p className="text-[#6e6e73] text-sm font-mono">
          © {year} · Built with{" "}
          <a
            href="https://nextjs.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0071e3] hover:underline"
          >
            Next.js
          </a>{" "}
          &amp;{" "}
          <a
            href="https://tailwindcss.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0071e3] hover:underline"
          >
            Tailwind CSS
          </a>
        </p>
      </div>
    </footer>
  );
}
