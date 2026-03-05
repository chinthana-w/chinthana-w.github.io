import Image from "next/image";
import { NOTABLE_PROJECTS } from "@/app/lib/constants";

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

export default function NotableProjects() {
  const featured = NOTABLE_PROJECTS.filter((p) => p.featured);
  const rest = NOTABLE_PROJECTS.filter((p) => !p.featured);

  return (
    <section id="notable-projects" className="py-24 px-6 bg-[#1e293b]/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-[#e2e8f0] mb-2">
          <span className="text-[#38bdf8] font-mono text-xl mr-3">03.</span>
          Notable Projects
        </h2>
        <div className="w-56 h-0.5 bg-[#334155] mb-12" />

        {/* Featured cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {featured.map((project) => (
            <a
              key={project.title}
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-[#0f172a] border border-[#334155] rounded-2xl overflow-hidden flex flex-col hover:border-[#38bdf8]/60 transition-all duration-300 hover:shadow-[0_0_40px_rgba(56,189,248,0.08)]"
            >
              {/* Accent bar — always visible, sits on top of image if present */}
              <div className="absolute top-0 left-0 right-0 h-1 z-10 rounded-t-2xl bg-gradient-to-r from-[#38bdf8] to-[#818cf8] opacity-70 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Project screenshot */}
              {project.image ? (
                <div className="relative w-full aspect-video overflow-hidden">
                  <Image
                    src={project.image}
                    alt={`${project.title} screenshot`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0f172a]/60" />
                </div>
              ) : null}

              <div className="p-8 flex flex-col flex-1">

              <div className="flex items-start justify-between mb-4">
                <span className="text-xs font-mono text-[#38bdf8] uppercase tracking-widest bg-[#38bdf8]/10 px-2.5 py-1 rounded-full">
                  Featured
                </span>
                <span className="text-[#94a3b8] group-hover:text-[#38bdf8] transition-colors duration-200">
                  <ExternalLinkIcon />
                </span>
              </div>

              <h3 className="text-xl font-bold text-[#e2e8f0] mb-3 group-hover:text-[#38bdf8] transition-colors duration-200">
                {project.title}
              </h3>

              <p className="text-[#94a3b8] text-sm leading-relaxed mb-6 flex-1">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-mono text-[#38bdf8] bg-[#38bdf8]/10 px-2.5 py-1 rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              </div>{/* end p-8 */}
            </a>
          ))}
        </div>

        {/* Secondary grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {rest.map((project) => (
            <a
              key={project.title}
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-[#0f172a] border border-[#334155] rounded-xl overflow-hidden flex flex-col hover:border-[#38bdf8]/50 transition-all duration-300 hover:shadow-[0_0_24px_rgba(56,189,248,0.06)]"
            >
              {/* Project screenshot */}
              {project.image ? (
                <div className="relative w-full aspect-video overflow-hidden">
                  <Image
                    src={project.image}
                    alt={`${project.title} screenshot`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0f172a]/60" />
                </div>
              ) : null}

              <div className="p-6 flex flex-col flex-1">
              <div className="flex items-start justify-between mb-3">
                <svg
                  className="w-8 h-8 text-[#38bdf8]/40 group-hover:text-[#38bdf8]/70 transition-colors duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  />
                </svg>
                <span className="text-[#475569] group-hover:text-[#38bdf8] transition-colors duration-200">
                  <ExternalLinkIcon />
                </span>
              </div>

              <h3 className="text-sm font-bold text-[#e2e8f0] mb-2 group-hover:text-[#38bdf8] transition-colors duration-200">
                {project.title}
              </h3>

              <p className="text-[#64748b] text-xs leading-relaxed mb-4 flex-1">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-mono text-[#64748b] bg-[#1e293b] px-2 py-0.5 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              </div>{/* end p-6 */}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
