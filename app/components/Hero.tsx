export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[80vh] flex items-center justify-center overflow-hidden"
    >
      {/* Ambient glow orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#38bdf8]/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-5%] right-[-5%] w-[400px] h-[400px] rounded-full bg-[#818cf8]/10 blur-[100px] pointer-events-none" />
      <div className="absolute top-[40%] right-[20%] w-[250px] h-[250px] rounded-full bg-[#38bdf8]/5 blur-[80px] pointer-events-none" />

      {/* Background grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(#334155 1px, transparent 1px), linear-gradient(90deg, #334155 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a]/30 via-transparent to-[#0f172a]" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <p className="text-[#38bdf8] font-mono text-sm md:text-base mb-4 tracking-widest uppercase">
          Hi, my name is
        </p>

        <h1 className="text-5xl md:text-7xl font-bold text-[#e2e8f0] mb-4 tracking-tight">
          Chinthana Wimalasuriya.
        </h1>

        <h2 className="text-3xl md:text-5xl font-bold text-[#94a3b8] mb-6">
          I build things for the web and beyond.
        </h2>

        <p className="max-w-2xl mx-auto text-lg text-[#94a3b8] leading-relaxed mb-3">
          Software engineer with 4+ years across full-stack web development and
          systems-level design &mdash; from scalable cloud applications to bare-metal
          firmware. Currently pursuing a Master&apos;s in ECE at Southern Illinois
          University Carbondale.
        </p>
        <p className="max-w-2xl mx-auto text-lg text-[#38bdf8] font-mono mb-10">
          I&apos;m open to work.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#projects"
            className="px-8 py-3 bg-[#38bdf8] text-[#0f172a] font-semibold rounded-lg hover:bg-[#7dd3fc] transition-colors duration-200"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="px-8 py-3 border border-[#38bdf8] text-[#38bdf8] font-semibold rounded-lg hover:bg-[#38bdf8]/10 transition-colors duration-200"
          >
            Get In Touch
          </a>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {[
            { label: "4+ yrs experience" },
            { label: "Full-Stack" },
            { label: "Systems & Embedded" },
            { label: "M.S. ECE @ SIUC" },
          ].map(({ label }) => (
            <span
              key={label}
              className="px-4 py-1.5 rounded-full bg-[#1e293b] border border-[#334155] text-[#94a3b8] text-sm font-mono"
            >
              {label}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll indicator — sits above the WIP banner */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-[#94a3b8]"
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
        <div className="flex items-center justify-center gap-2 bg-[#0f172a]/90 py-1">
          <span className="text-base leading-none">🚧</span>
          <span className="text-[#facc15] font-mono text-[10px] tracking-widest uppercase opacity-60">
            Please pardon the dust &mdash; this site is still a work in progress!
          </span>
          <span className="text-base leading-none">🚧</span>
        </div>
      </div>
    </section>
  );
}
