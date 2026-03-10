import type { Metadata } from "next";
import "./globals.css";
import ChatWidget from "./components/ChatWidget";

export const metadata: Metadata = {
  title: "Chinthana Wimalasuriya | Software & Systems Engineer",
  description:
    "Personal portfolio of Chinthana Wimalasuriya, a Software Engineer with 4+ years of experience in Full-Stack Web Development, Systems Engineering, and Embedded Systems.",
  keywords: [
    "Chinthana Wimalasuriya",
    "Software Engineer",
    "Full-Stack Developer",
    "Systems Engineer",
    "Embedded Systems",
    "Web Development",
    "React",
    "Next.js",
    "Portfolio",
  ],
  authors: [{ name: "Chinthana Wimalasuriya" }],
  openGraph: {
    title: "Chinthana Wimalasuriya | Software & Systems Engineer",
    description: "Software Engineer portfolio showcasing 4+ years of experience in full-stack web development and systems-level design.",
    type: "website",
    url: "https://chinthana-w.github.io",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Chinthana Wimalasuriya",
    url: "https://chinthana-w.github.io",
    jobTitle: "Software Engineer",
    description: "Software Engineer with 4+ years of experience in Full-Stack Web Development, Systems Engineering, and Embedded Systems.",
    alumniOf: "Southern Illinois University Carbondale",
    knowsAbout: ["Full-Stack Development", "Systems Engineering", "Embedded Systems", "React", "Next.js", "C++", "Python"]
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
