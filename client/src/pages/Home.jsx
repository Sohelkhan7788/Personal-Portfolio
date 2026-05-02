import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Projects from '../components/Projects';
import Certifications from '../components/Certifications';
import Skills from '../components/Skills';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const Home = () => (
  <div className="min-h-screen bg-white dark:bg-[#0f0f1a] transition-colors duration-300">
    <Navbar />
    <Hero />
    <Projects />
    <Certifications />
    <Skills />
    <Contact />
    <Footer />
  </div>
);

export default Home;
