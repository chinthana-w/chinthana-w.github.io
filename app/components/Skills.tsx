import { SKILLS } from "@/app/lib/constants";

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6 bg-[#1e293b]/50">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-[#e2e8f0] mb-2">
          <span className="text-[#38bdf8] font-mono text-xl mr-3">02.</span>
          Skills & Technologies
        </h2>
        <div className="w-64 h-0.5 bg-[#334155] mb-12" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SKILLS.map((skillGroup) => (
            <div
              key={skillGroup.category}
              className="bg-[#0f172a] border border-[#334155] rounded-xl p-6 hover:border-[#38bdf8]/50 transition-colors duration-300"
            >
              <h3 className="text-[#38bdf8] font-semibold mb-4 text-sm uppercase tracking-wider">
                {skillGroup.category}
              </h3>
              <ul className="space-y-2">
                {skillGroup.items.map((item) => (
                  <li
                    key={item}
                    className="text-[#94a3b8] text-sm flex items-center gap-2 font-mono"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
