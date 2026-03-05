import Navbar from "@/app/components/Navbar";
import Hero from "@/app/components/Hero";
import About from "@/app/components/About";
import Skills from "@/app/components/Skills";
import NotableProjects from "@/app/components/NotableProjects";
import Projects from "@/app/components/Projects";
import Hobbies from "@/app/components/Hobbies";
import Contact from "@/app/components/Contact";
import Footer from "@/app/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <NotableProjects />
        <Projects />
        <Hobbies />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
