import React from "react";
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
              Hello! I&apos;m Chinthana, a software engineer with 4+ years of
              professional full-stack web development and systems-level design
              experience. My journey spans from crafting modern SPAs and cloud
              infrastructure to writing bare-metal firmware and FPGA logic.
            </p>
            <p>
              I’ve found that the best software comes from 
              fast-moving teams that aren't afraid of hard problems. 
              My background is in end-to-end ownership, handling things from 
              design decisons to testing and deployment. I value clean code, 
              automated testing, and a deployment process that just works, 
              so we can focus on building what matters.
            </p>
            <p>
              Currently pursuing a Master&apos;s in Electrical &amp; Computer
              Engineering at Southern Illinois University Carbondale (GPA 4.0),
              where I research methods to accelerate circuit testing with deep learning.
              I also handle the management of the department UNIX system Lab 
              and the EDA research cluster.
            </p>
            <p>Here are a few technologies I&apos;ve been working with recently:</p>
            <ul className="grid grid-cols-2 gap-2 mt-4">
              {[
                "C/C++ / CUDA",
                "TypeScript / React",
                "Python",
                "Node.js / GraphQL",
                "Docker / k3s",
                "FPGA / Baremetal C",
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
