export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background grid pattern */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #334155 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0f172a]" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <p className="text-[#38bdf8] font-mono text-sm md:text-base mb-4 tracking-widest uppercase">
          Hi, my name is
        </p>

        <h1 className="text-5xl md:text-7xl font-bold text-[#e2e8f0] mb-4 tracking-tight">
          Chinthana.
        </h1>

        <h2 className="text-3xl md:text-5xl font-bold text-[#94a3b8] mb-6">
          I build things for the web and beyond.
        </h2>

        <p className="max-w-2xl mx-auto text-lg text-[#94a3b8] leading-relaxed mb-10">
          Software engineer with 4+ years across full-stack web development and
          systems-level design &mdash; from scalable cloud applications to bare-metal
          firmware. Currently pursuing a Master&apos;s in ECE at Southern Illinois
          University Carbondale.
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
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
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
    </section>
  );
}
