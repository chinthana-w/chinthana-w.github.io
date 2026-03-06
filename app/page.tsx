import Navbar from "@/app/components/Navbar";
import Hero from "@/app/components/Hero";
import About from "@/app/components/About";
import Skills from "@/app/components/Skills";
import Timeline from "@/app/components/Timeline";
import NotableProjects from "@/app/components/NotableProjects";
import Projects from "@/app/components/Projects";
import Hobbies from "@/app/components/Hobbies";
import Contact from "@/app/components/Contact";
import Footer from "@/app/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pb-28 md:pb-0">
        <Hero />
        <About />
        <Skills />
        <Timeline />
        <NotableProjects />
        <Projects />
        <Hobbies />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
