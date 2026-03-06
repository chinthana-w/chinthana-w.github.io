import { SOCIAL_LINKS, GITHUB_USERNAME } from "@/app/lib/constants";

function GitHubIcon() {
  return (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  );
}

const ICONS: Record<string, React.FC> = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  email: EmailIcon,
};

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6 bg-[#1e293b]/50">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-[#e2e8f0] mb-2">
          <span className="text-[#38bdf8] font-mono text-xl mr-3">07.</span>
          Get In Touch
        </h2>
        <div className="w-36 h-0.5 bg-[#334155] mx-auto mb-8" />

        <p className="text-[#94a3b8] text-lg leading-relaxed mb-10">
          Whether you have a project in mind, a question, or just want to say
          hi, my inbox is always open. You can also ask{" "}
          <span className="text-[#38bdf8] font-semibold">Sif</span>, my AI
          assistant (bottom right), for quick answers about my background and
          work. I&apos;ll do my best to get back to you!
        </p>

        <a
          href={`mailto:chinthana.w@siu.edu`}
          className="relative overflow-hidden inline-flex items-center justify-center px-10 py-4 rounded-full bg-[#38bdf8]/20 backdrop-blur-xl border border-[#38bdf8]/40 shadow-[inset_0_1px_0_rgba(56,189,248,0.25),0_4px_20px_rgba(56,189,248,0.15)] text-[#e2e8f0] font-semibold hover:bg-[#38bdf8]/30 transition-all duration-200 text-lg mb-12"
        >
          <span className="absolute inset-0 rounded-full bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none" aria-hidden="true" />
          <span className="relative">Say Hello</span>
        </a>

        <div className="flex justify-center gap-8">
          {SOCIAL_LINKS.map((link) => {
            const Icon = ICONS[link.icon];
            return (
              <a
                key={link.label}
                href={link.href}
                target={link.icon !== "email" ? "_blank" : undefined}
                rel={link.icon !== "email" ? "noopener noreferrer" : undefined}
                className="text-[#94a3b8] hover:text-[#38bdf8] transition-colors duration-200"
                aria-label={link.label}
              >
                {Icon && <Icon />}
              </a>
            );
          })}
        </div>

        <p className="mt-8 text-[#94a3b8] text-sm font-mono">
          Also available on{" "}
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#38bdf8] hover:underline"
          >
            GitHub
          </a>
        </p>
      </div>
    </section>
  );
}
