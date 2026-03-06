"use client";

import { useEffect, useState } from "react";
import { NAV_LINKS } from "@/app/lib/constants";

function NavIcon({ href, size = "w-4 h-4" }: { href: string; size?: string }) {
  const cls = `${size} flex-shrink-0`;
  switch (href) {
    case "#about":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="8" r="4" />
          <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
        </svg>
      );
    case "#skills":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      );
    case "#experience":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="2" y="7" width="20" height="14" rx="2" />
          <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
        </svg>
      );
    case "#projects":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="3" y="3" width="8" height="8" rx="1" />
          <rect x="13" y="3" width="8" height="8" rx="1" />
          <rect x="13" y="13" width="8" height="8" rx="1" />
          <rect x="3" y="13" width="8" height="8" rx="1" />
        </svg>
      );
    case "#contact":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      );
    default:
      return null;
  }
}

export default function Navbar() {
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          setActiveSection("#" + visible[0].target.id);
        }
      },
      // Trigger when a section occupies the middle band of the viewport
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* ── Desktop: fixed top nav ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 hidden md:flex items-center justify-between px-8 py-5">
        {/* Logo */}
        <a
          href="#hero"
          className="text-base font-bold text-[#38bdf8] font-mono tracking-tight hover:opacity-80 transition-opacity"
        >
          chinthana-w
        </a>

        {/* Liquid-glass pill containing all nav links */}
        <div className="relative flex items-center gap-0.5 px-2 py-1.5 rounded-full bg-[#0f172a]/65 backdrop-blur-2xl border border-white/[0.09] shadow-[0_8px_32px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.08)]">
          {/* Top-edge glass shine */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/[0.06] to-transparent pointer-events-none" aria-hidden="true" />

          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                className={`relative z-10 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-300 select-none ${
                  isActive
                    ? "text-[#e2e8f0] scale-[1.06]"
                    : "text-[#94a3b8] hover:text-[#cbd5e1]"
                }`}
              >
                {/* Magnifier: active inner oval */}
                {isActive && (
                  <span
                    className="absolute inset-0 rounded-full bg-white/[0.13] border border-white/[0.14] shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_2px_10px_rgba(56,189,248,0.15)]"
                    aria-hidden="true"
                  />
                )}
                <NavIcon href={link.href} size="w-3.5 h-3.5" />
                <span className="relative">{link.label}</span>
              </a>
            );
          })}
        </div>

        {/* GitHub button */}
        <a
          href="https://github.com/chinthana-w"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm px-4 py-2 rounded-full bg-[#0f172a]/65 backdrop-blur-2xl border border-white/[0.09] shadow-[0_4px_16px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.08)] text-[#38bdf8] hover:text-[#e2e8f0] hover:bg-white/[0.08] transition-all duration-200 font-medium"
        >
          GitHub
        </a>
      </nav>

      {/* ── Mobile: fixed bottom floating glass-pill nav ── */}
      {/* Replaces the transparent top nav entirely, so content never clips through it */}
      <nav className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 md:hidden">
        <div className="relative flex items-center px-1.5 py-1.5 rounded-full bg-[#0f172a]/82 backdrop-blur-2xl border border-white/[0.09] shadow-[0_8px_32px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.08)]">
          {/* Top-edge glass shine */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/[0.06] to-transparent pointer-events-none" aria-hidden="true" />

          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                className={`relative z-10 flex flex-col items-center gap-0.5 px-3 py-2 rounded-full font-medium transition-all duration-300 select-none ${
                  isActive
                    ? "text-[#e2e8f0] scale-[1.08]"
                    : "text-[#64748b]"
                }`}
              >
                {/* Magnifier: active inner oval */}
                {isActive && (
                  <span
                    className="absolute inset-0 rounded-full bg-white/[0.14] border border-white/[0.14] shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_2px_10px_rgba(56,189,248,0.15)]"
                    aria-hidden="true"
                  />
                )}
                <NavIcon href={link.href} size="w-[1.15rem] h-[1.15rem]" />
                <span className="relative text-[10px] leading-none">{link.label}</span>
              </a>
            );
          })}
        </div>
      </nav>
    </>
  );
}
