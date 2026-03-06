import { SKILLS } from "@/app/lib/constants";

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-[#1d1d1f] mb-2">
          <span className="text-[#0071e3] font-mono text-xl mr-3">02.</span>
          Skills & Technologies
        </h2>
        <div className="w-64 h-0.5 bg-[#d2d2d7] mb-12" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SKILLS.map((skillGroup) => (
            <div
              key={skillGroup.category}
              className="bg-[#f0f7ff] border border-[#c5dff8] rounded-xl p-6 hover:border-[#0071e3]/40 transition-colors duration-300 shadow-sm"
            >
              <h3 className="text-[#0071e3] font-semibold mb-4 text-sm uppercase tracking-wider">
                {skillGroup.category}
              </h3>
              <ul className="space-y-2">
                {skillGroup.items.map((item) => (
                  <li
                    key={item}
                    className="text-[#6e6e73] text-sm flex items-center gap-2 font-mono"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0071e3] flex-shrink-0" />
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
