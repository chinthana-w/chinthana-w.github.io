import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jester | Full-Stack Developer & Portfolio",
  description:
    "Personal portfolio and resume supplement showcasing GitHub projects, skills, and experience.",
  keywords: ["developer", "portfolio", "full-stack", "github", "software engineer"],
  authors: [{ name: "Jester" }],
  openGraph: {
    title: "Jester | Full-Stack Developer",
    description: "Personal portfolio showcasing projects and skills.",
    type: "website",
    url: "https://jester-2-6.github.io",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
