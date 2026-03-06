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
    <section id="notable-projects" className="py-24 px-6 bg-[#fafafa]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-[#1d1d1f] mb-2">
          <span className="text-[#0071e3] font-mono text-xl mr-3">04.</span>
          Notable Projects
        </h2>
        <div className="w-56 h-0.5 bg-[#d2d2d7] mb-12" />

        {/* Featured cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {featured.map((project) => (
            <a
              key={project.title}
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-[#f0f7ff] border border-[#c5dff8] rounded-2xl overflow-hidden flex flex-col hover:border-[#0071e3]/50 transition-all duration-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.10)]"
            >
              {/* Accent bar — always visible, sits on top of image if present */}
              <div className="absolute top-0 left-0 right-0 h-1 z-10 rounded-t-2xl bg-gradient-to-r from-[#0071e3] to-[#5e5ce6] opacity-70 group-hover:opacity-100 transition-opacity duration-300" />

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
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
                </div>
              ) : null}

              <div className="p-8 flex flex-col flex-1">

              <div className="flex items-start justify-between mb-4">
                <span className="text-xs font-mono text-[#0071e3] uppercase tracking-widest bg-[#0071e3]/8 px-2.5 py-1 rounded-full">
                  Featured
                </span>
                <span className="text-[#6e6e73] group-hover:text-[#0071e3] transition-colors duration-200">
                  <ExternalLinkIcon />
                </span>
              </div>

              <h3 className="text-xl font-bold text-[#1d1d1f] mb-3 group-hover:text-[#0071e3] transition-colors duration-200">
                {project.title}
              </h3>

              <p className="text-[#1a1a1a] text-sm leading-relaxed mb-6 flex-1">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-mono text-[#0071e3] bg-[#0071e3]/8 px-2.5 py-1 rounded-md"
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
              className="group bg-[#f8f8fc] border border-[#ddddf5] rounded-xl overflow-hidden flex flex-col hover:border-[#0071e3]/40 transition-all duration-300 hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)]"
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
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
                </div>
              ) : null}

              <div className="p-6 flex flex-col flex-1">
              <div className="flex items-start justify-between mb-3">
                <svg
                  className="w-8 h-8 text-[#0071e3]/40 group-hover:text-[#0071e3]/70 transition-colors duration-200"
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
                <span className="text-[#86868b] group-hover:text-[#0071e3] transition-colors duration-200">
                  <ExternalLinkIcon />
                </span>
              </div>

              <h3 className="text-sm font-bold text-[#1d1d1f] mb-2 group-hover:text-[#0071e3] transition-colors duration-200">
                {project.title}
              </h3>

              <p className="text-[#1a1a1a] text-xs leading-relaxed mb-4 flex-1">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-mono text-[#6e6e73] bg-[#f5f5f7] px-2 py-0.5 rounded"
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
