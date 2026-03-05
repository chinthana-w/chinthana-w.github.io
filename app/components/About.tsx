import { GITHUB_USERNAME } from "@/app/lib/constants";

export default function About() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-[#e2e8f0] mb-2">
          <span className="text-[#38bdf8] font-mono text-xl mr-3">01.</span>
          About Me
        </h2>
        <div className="w-48 h-0.5 bg-[#334155] mb-12" />

        <div className="grid md:grid-cols-3 gap-12 items-start">
          <div className="md:col-span-2 space-y-4 text-[#94a3b8] leading-relaxed">
            <p>
              Hello! I&apos;m Jester, a software developer with a passion for
              building elegant solutions to complex problems. My journey into
              programming started with a curiosity about how things work, and
              it has grown into a deep love for crafting software that makes a
              difference.
            </p>
            <p>
              I enjoy working across the full stack — from designing intuitive
              user interfaces to architecting scalable backend systems. I
              believe in writing clean, maintainable code that others can
              understand and build upon.
            </p>
            <p>
              When I&apos;m not coding, you&apos;ll find me exploring new
              technologies, contributing to open-source projects, or learning
              something new. I&apos;m always looking for interesting problems
              to solve.
            </p>
            <p>Here are a few technologies I&apos;ve been working with recently:</p>
            <ul className="grid grid-cols-2 gap-2 mt-4">
              {[
                "TypeScript",
                "React / Next.js",
                "Python",
                "Node.js",
                "Docker",
                "GitHub Actions",
              ].map((tech) => (
                <li key={tech} className="flex items-center gap-2 text-sm">
                  <span className="text-[#38bdf8]">▹</span>
                  <span className="font-mono">{tech}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex justify-center md:justify-end">
            <div className="relative group">
              <div className="w-56 h-56 rounded-xl bg-[#38bdf8]/20 border-2 border-[#38bdf8] flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-2">👨‍💻</div>
                  <p className="text-[#38bdf8] font-mono text-sm">
                    @{GITHUB_USERNAME}
                  </p>
                </div>
              </div>
              <div className="absolute -inset-1 rounded-xl bg-[#38bdf8]/10 -z-10 group-hover:bg-[#38bdf8]/20 transition-colors duration-300" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
