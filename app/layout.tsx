import type { Metadata } from "next";
import "./globals.css";
import ChatWidget from "./components/ChatWidget";

export const metadata: Metadata = {
  title: "Chinthana | Full-Stack Developer & Portfolio",
  description:
    "Personal portfolio and resume supplement showcasing GitHub projects, skills, and experience.",
  keywords: ["developer", "portfolio", "full-stack", "github", "software engineer"],
  authors: [{ name: "Chinthana" }],
  openGraph: {
    title: "Chinthana | Full-Stack Developer",
    description: "Personal portfolio showcasing projects and skills.",
    type: "website",
    url: "https://chinthana-w.github.io",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
