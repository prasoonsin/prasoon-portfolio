import Hero from "../components/portfolio/Hero";
import About from "./About";
import Education from "./Education";
import Experience from "./Experience";
import Skills from "./Skills";
import Projects from "./Projects";
import Certifications from "./Certifications";
import CodingStats from "../components/portfolio/CodingStats";
import Blog from "./Blog";
import Resume from "../components/portfolio/Resume";
import Contact from "./Contact";

function Home() {
  return (
    <>
      <Hero />
      <About />
      <Education />
      <Experience />
      <Skills />
      <Projects />
      <Certifications />
      <CodingStats />
      <Blog />
      <Resume />
      <Contact />
    </>
  );
}

export default Home;