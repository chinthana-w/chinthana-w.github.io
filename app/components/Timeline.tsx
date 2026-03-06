import { TIMELINE_ITEMS, type TimelineItem } from "@/app/lib/constants";

function BriefcaseIcon() {
  return (
    <svg
      className="w-3 h-3"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zM16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"
      />
    </svg>
  );
}

function GraduationCapIcon() {
  return (
    <svg
      className="w-3 h-3"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 14l9-5-9-5-9 5 9 5z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 14l6.16-3.422A12.083 12.083 0 0121 17.18V21M12 14l-6.16-3.422A12.083 12.083 0 003 17.18V21M5.5 10.5V16"
      />
    </svg>
  );
}

function TimelineCard({
  item,
  align,
}: {
  item: TimelineItem;
  align: "left" | "right";
}) {
  const isWork = item.type === "work";
  const accentText = isWork ? "text-[#0071e3]" : "text-[#5e5ce6]";
  const accentBorder = isWork ? "border-[#0071e3]/40" : "border-[#5e5ce6]/40";
  const accentBg = isWork ? "bg-[#0071e3]/8" : "bg-[#5e5ce6]/8";
  const cardBg = isWork ? "bg-[#f0f7ff]" : "bg-[#f5f4ff]";
  const accentGlow = isWork
    ? "hover:shadow-[0_4px_24px_rgba(0,113,227,0.12)]"
    : "hover:shadow-[0_4px_24px_rgba(94,92,230,0.12)]";
  const bulletColor = isWork ? "text-[#0071e3]" : "text-[#5e5ce6]";

  return (
    <div
      className={`group ${cardBg} border rounded-xl p-5 transition-all duration-300 hover:border-opacity-100 shadow-sm ${accentBorder} ${accentGlow} cursor-default`}
    >
      {/* Header — always visible */}
      <div className={`flex items-start gap-3 ${align === "right" ? "flex-row-reverse text-right" : ""}`}>
        <div className="flex-1 min-w-0">
          <p className={`font-mono text-xs mb-1 ${accentText}`}>{item.period}</p>
          <h3 className="text-[#1d1d1f] font-bold text-sm leading-snug mb-0.5">
            {item.title}
          </h3>
          <p className="text-[#3a3a3a] text-xs font-medium">
            {item.organization} &middot; {item.location}
          </p>
        </div>
        <span
          className={`flex-shrink-0 flex items-center gap-1 text-xs font-mono px-2 py-1 rounded-full ${accentBg} ${accentText}`}
        >
          {isWork ? <BriefcaseIcon /> : <GraduationCapIcon />}
          <span className="hidden sm:inline">{isWork ? "Work" : "Education"}</span>
        </span>
      </div>

      {/* Chevron hint */}
      <div
        className={`flex mt-3 ${align === "right" ? "justify-start" : "justify-end"}`}
      >
        <svg
          className={`w-4 h-4 ${accentText} opacity-40 group-hover:opacity-0 transition-opacity duration-300`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      {/* Highlights popup — expands on hover */}
      <div className="overflow-hidden max-h-0 group-hover:max-h-[32rem] transition-all duration-500 ease-in-out">
        <ul
          className={`space-y-2 border-t border-[#e8e8ed] pt-4 mt-1 ${align === "right" ? "text-right" : "text-left"}`}
        >
          {item.highlights.map((point, j) => (
            <li
              key={j}
              className={`flex items-start gap-2 text-xs text-[#1a1a1a] leading-relaxed ${align === "right" ? "flex-row-reverse" : ""}`}
            >
              <span className={`${bulletColor} mt-0.5 flex-shrink-0`}>▹</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Timeline() {
  return (
    <section id="experience" className="py-24 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-[#1d1d1f] mb-2">
          <span className="text-[#0071e3] font-mono text-xl mr-3">03.</span>
          Experience
        </h2>
        <div className="w-40 h-0.5 bg-[#d2d2d7] mb-6" />

        {/* Legend */}
        <div className="flex gap-6 mb-12">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full border-2 border-[#0071e3] bg-white flex-shrink-0" />
            <span className="text-[#3a3a3a] text-xs font-mono">Work</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full border-2 border-[#5e5ce6] bg-white flex-shrink-0" />
            <span className="text-[#3a3a3a] text-xs font-mono">Education</span>
          </div>
          <div className="flex items-center gap-2">
            <svg
              className="w-3 h-3 text-[#3a3a3a]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5"
              />
            </svg>
            <span className="text-[#3a3a3a] text-xs font-mono">
              Hover a card for details
            </span>
          </div>
        </div>

        <div className="relative">
          {/* Vertical center line — left-aligned on mobile, centered on md+ */}
          <div className="absolute left-[0.6875rem] top-0 bottom-0 w-px bg-gradient-to-b from-[#d2d2d7] via-[#d2d2d7] to-transparent md:left-1/2 md:-translate-x-px" />

          <div className="flex flex-col gap-10">
            {TIMELINE_ITEMS.map((item, i) => {
              const isWork = item.type === "work";
                  const dotBorder = isWork ? "border-[#0071e3]" : "border-[#5e5ce6]";
              const dotGlow = isWork
                ? "shadow-[0_0_8px_rgba(0,113,227,0.4)]"
                : "shadow-[0_0_8px_rgba(94,92,230,0.4)]";
              // Even items: card on LEFT on desktop (reversed on mobile → right)
              // Odd items:  card on RIGHT on desktop
              const isCardLeft = i % 2 === 0;

              return (
                <div key={i} className="relative">
                  {/* Dot on the line */}
                  <div
                    className={`absolute left-[0.6875rem] top-5 -translate-x-1/2 w-[0.875rem] h-[0.875rem] rounded-full border-2 ${dotBorder} ${dotGlow} bg-white z-10 md:left-1/2`}
                    aria-hidden="true"
                  />

                  {/* Two-column grid on desktop, single column (padded left) on mobile */}
                  <div className="pl-8 md:pl-0 md:grid md:grid-cols-2">
                    {/* LEFT desktop column */}
                    <div
                      className={`hidden md:block md:pr-10 ${isCardLeft ? "" : "md:flex md:justify-end md:items-start md:pt-3"}`}
                    >
                      {isCardLeft ? (
                        <TimelineCard item={item} align="right" />
                      ) : (
                        <span className={`font-mono text-xs font-semibold ${isWork ? "text-[#0071e3]" : "text-[#5e5ce6]"}`}>
                          {item.period}
                        </span>
                      )}
                    </div>

                    {/* RIGHT desktop column */}
                    <div
                      className={`hidden md:block md:pl-10 ${!isCardLeft ? "" : "md:flex md:items-start md:pt-3"}`}
                    >
                      {!isCardLeft ? (
                        <TimelineCard item={item} align="left" />
                      ) : (
                        <span className={`font-mono text-xs font-semibold ${isWork ? "text-[#0071e3]" : "text-[#5e5ce6]"}`}>
                          {item.period}
                        </span>
                      )}
                    </div>

                    {/* Mobile: full-width card, always shown */}
                    <div className="md:hidden">
                      <TimelineCard item={item} align="left" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
