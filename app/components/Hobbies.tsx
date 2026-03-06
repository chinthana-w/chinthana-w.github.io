import type React from "react";
import Image from "next/image";

interface Hobby {
  title: string;
  icon: React.ReactNode;
  description: string;
  highlights: string[];
  // Drop images into public/hobbies/ and list their paths here, e.g. "/hobbies/travel-1.jpg"
  images: string[];
}

const HOBBIES: Hobby[] = [
  {
    title: "Photography",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    description:
      "Photography lets me slow down and notice things I would otherwise walk past. I gravitate toward street, landscape, and travel photography, often pairing it with my trips.",
    highlights: ["Street", "Landscape", "Travel"],
    // Add image paths like "/hobbies/photo-1.jpg" to show a photo strip
    images: [],
  },
  {
    title: "Travel",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    description:
      "Exploring new places is one of my biggest passions. I love immersing myself in different cultures, trying local food, and uncovering the stories behind the places I visit.",
    highlights: ["North America", "Southeast Asia", "Road trips"],    // Add image paths like "/hobbies/travel-1.jpg" to show a photo strip
    images: [],  },
  {
    title: "Gaming",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
      </svg>
    ),
    description:
      "Gaming is where I unwind and scratch my competitive itch. I enjoy everything from strategy and simulation games to the occasional co-op adventure with friends.",
    highlights: ["FPS", "RPG", "Co-op"],
    // Add image paths like "/hobbies/gaming-1.jpg" to show a photo strip
    images: [],
  },
];

export default function Hobbies() {
  return (
    <section id="hobbies" className="py-24 px-6 bg-[#fafafa]">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-[#1d1d1f] mb-2">
          <span className="text-[#0071e3] font-mono text-xl mr-3">06.</span>
          Off the Clock
        </h2>
        <div className="w-48 h-0.5 bg-[#d2d2d7] mb-12" />

        <div className="grid md:grid-cols-3 gap-6">
          {HOBBIES.map((hobby) => (
            <div
              key={hobby.title}
              className="group bg-[#f0f4ff] border border-[#c7d7f5] rounded-2xl overflow-hidden flex flex-col hover:border-[#0071e3]/40 transition-all duration-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] shadow-sm"
            >
              {/* Photo strip — shown when images are provided */}
              {hobby.images.length > 0 && (
                <div
                  className={`grid gap-0.5 ${
                    hobby.images.length === 1
                      ? "grid-cols-1"
                      : hobby.images.length === 2
                      ? "grid-cols-2"
                      : "grid-cols-3"
                  }`}
                >
                  {hobby.images.slice(0, 3).map((src, i) => (
                    <div key={i} className="relative aspect-video overflow-hidden">
                      <Image
                        src={src}
                        alt={`${hobby.title} photo ${i + 1}`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                  ))}
                </div>
              )}

              <div className="p-8 flex flex-col flex-1">
              {hobby.images.length === 0 && (
                <div className="text-[#0071e3]/50 group-hover:text-[#0071e3] transition-colors duration-300 mb-5">
                  {hobby.icon}
                </div>
              )}

              <h3 className="text-lg font-bold text-[#1d1d1f] mb-3">{hobby.title}</h3>

              <p className="text-[#1a1a1a] text-sm leading-relaxed mb-6 flex-1">
                {hobby.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {hobby.highlights.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-mono text-[#0071e3] bg-[#0071e3]/8 px-2.5 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              </div>{/* end p-8 */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
