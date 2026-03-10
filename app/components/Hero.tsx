export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[80vh] flex items-center justify-center overflow-hidden"
    >
      {/* Ambient glow orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#0071e3]/6 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-5%] right-[-5%] w-[400px] h-[400px] rounded-full bg-[#5e5ce6]/5 blur-[100px] pointer-events-none" />
      <div className="absolute top-[40%] right-[20%] w-[250px] h-[250px] rounded-full bg-[#0071e3]/4 blur-[80px] pointer-events-none" />

      {/* Background grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(#d2d2d7 1px, transparent 1px), linear-gradient(90deg, #d2d2d7 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#f5f5f7]/20 via-transparent to-[#f5f5f7]" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <p className="text-[#0071e3] font-mono text-sm md:text-base mb-4 tracking-widest uppercase">
          Hi, my name is
        </p>

        <h1 className="text-5xl md:text-7xl font-bold text-[#1d1d1f] mb-4 tracking-tight">
          Chinthana Wimalasuriya.
        </h1>

        <h2 className="text-3xl md:text-5xl font-bold text-[#6e6e73] mb-6">
          I build things for a smarter world.
        </h2>

        <p className="max-w-2xl mx-auto text-lg text-[#6e6e73] leading-relaxed mb-3">
          Software Engineer with 4+ years of experience across full-stack web development and
          systems-level design, from scalable cloud applications to bare-metal
          firmware. Currently pursuing a Master&apos;s in ECE at Southern Illinois
          University Carbondale.
        </p>
        <p className="max-w-2xl mx-auto text-lg text-[#0071e3] font-mono mb-10">
          I&apos;m open to work.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#projects"
            className="relative overflow-hidden inline-flex items-center justify-center px-8 py-3 rounded-full bg-[#0071e3] border border-[#0071e3] shadow-[0_4px_20px_rgba(0,113,227,0.25)] text-white font-semibold hover:bg-[#0064c8] transition-all duration-200"
          >
            <span className="absolute inset-0 rounded-full bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none" aria-hidden="true" />
            <span className="relative">View My Work</span>
          </a>
          <a
            href="/resume.pdf"
            download="Chinthana_Wimalasuriya_Resume.pdf"
            className="relative overflow-hidden inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-white border border-[#d2d2d7] shadow-[0_2px_8px_rgba(0,0,0,0.08)] text-[#0071e3] font-semibold hover:bg-[#f5f5f7] transition-all duration-200"
          >
            <span className="absolute inset-0 rounded-full bg-gradient-to-b from-white/[0.07] to-transparent pointer-events-none" aria-hidden="true" />
            <svg className="relative w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span className="relative">Get My Resume</span>
          </a>
          <a
            href="#contact"
            className="relative overflow-hidden inline-flex items-center justify-center px-8 py-3 rounded-full bg-white border border-[#d2d2d7] shadow-[0_2px_8px_rgba(0,0,0,0.06)] text-[#1d1d1f] font-semibold hover:bg-[#f5f5f7] transition-all duration-200"
          >
            <span className="absolute inset-0 rounded-full bg-gradient-to-b from-white/[0.06] to-transparent pointer-events-none" aria-hidden="true" />
            <span className="relative">Get In Touch</span>
          </a>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2">
          {[
            "4+ years experience",
            "Full-Stack",
            "Systems & Embedded",
            "M.S. ECE @ SIUC",
          ].map((label) => (
            <span
              key={label}
              className="flex items-center gap-1.5 text-[#1a1a1a] text-sm font-mono cursor-default select-none"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#0071e3]/40 flex-shrink-0" aria-hidden="true" />
              {label}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll indicator — sits above the WIP banner */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-[#6e6e73]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      {/* WIP banner — pinned to the very bottom */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none select-none z-20">
        {/* Label */}
          <div className="flex items-center justify-center gap-2 bg-amber-400/90 py-1.5">
          <span className="text-base leading-none">🚧</span>
          <span className="text-amber-900 font-mono text-[11px] tracking-widest uppercase font-semibold">
            Please pardon the dust &mdash; this site is still a work in progress!
          </span>
          <span className="text-base leading-none">🚧</span>
        </div>
      </div>
    </section>
  );
}
