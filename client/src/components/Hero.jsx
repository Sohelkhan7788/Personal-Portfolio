import { TypeAnimation } from 'react-type-animation';
import { motion } from 'framer-motion';
import { HiDownload, HiMail } from 'react-icons/hi';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';

const Hero = () => {
  const scrollTo = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="min-h-screen flex items-center relative overflow-hidden pt-20">

      {/* Background Watermark */}
      <div className="watermark absolute bottom-0 left-0 select-none">Sohel Khan</div>

      {/* BG Blobs */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">

        {/* 🔥 Responsive Layout Fix */}
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-primary/10 text-primary border border-primary/20 rounded-full px-4 py-2 text-xs sm:text-sm font-medium mb-6"
            >
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              Available for Hire
            </motion.div>

            <h2 className="text-lg sm:text-xl font-medium text-gray-500 dark:text-gray-400 mb-2">
              Hi! I'm
            </h2>

            {/* 🔥 Responsive Heading */}
            <h1 className="section-heading text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-gray-900 dark:text-white mb-4 leading-tight">
              Sohel Khan
            </h1>

            {/* Animated Text */}
            <div className="text-lg sm:text-xl md:text-2xl font-semibold mb-6 h-14 flex items-center justify-center lg:justify-start">
              <span className="text-gray-700 dark:text-gray-300">I am a&nbsp;</span>
              <TypeAnimation
                sequence={[
                  'Full Stack Dev', 2000,
                  'MERN Developer', 2000,
                  'UI/UX Designer', 2000,
                  'Problem Solver', 2000,
                ]}
                wrapper="span"
                repeat={Infinity}
                className="text-primary font-bold"
              />
            </div>

            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base lg:text-lg leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
              I'm a software developer passionate about building smart and user-friendly digital solutions. 
              Specialized in MERN stack with a keen eye for design and performance.
            </p>

            {/* 🔥 Stats Responsive */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 mb-8">
              {[
                { num: '3+', label: 'Projects' },
                { num: '5+', label: 'Certifications' },
                { num: 'Fresher', label: 'Years Exp.' },
              ].map(stat => (
                <div key={stat.label}>
                  <div className="text-2xl sm:text-3xl font-black text-primary">{stat.num}</div>
                  <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* 🔥 Buttons Responsive */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">

              <button
                onClick={() => scrollTo('#contact')}
                className="flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-primary/30"
              >
                <HiMail size={20} />
                Hire Me
              </button>

              <a
                href="/Updated_Resume-Sohel.pdf"
                download="Sohel_Khan_Resume.pdf"
                className="flex items-center justify-center gap-2 border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <HiDownload size={20} />
                Download CV
              </a>
            </div>

            {/* Social Links */}
            <div className="flex justify-center lg:justify-start gap-4">
              {[
                { icon: <FaGithub size={20} />, url: 'https://github.com/Sohelkhan7788' },
                { icon: <FaLinkedin size={20} />, url: 'https://www.linkedin.com/in/sohel-khan-6090582b3/' },
                { icon: <FaInstagram size={20} />, url: 'https://www.instagram.com/callmesohel.439/?hl=en' },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-dark-card flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-primary hover:text-white transition-all duration-300 hover:scale-110"
                >
                  {social.icon}
                </a>
              ))}
            </div>

          </motion.div>

          {/* RIGHT IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative">

              {/* Glow */}
              <div className="absolute -inset-4 bg-gradient-to-br from-primary/30 to-transparent rounded-3xl blur-xl" />

              {/* 🔥 Responsive Image */}
              <div className="relative w-64 h-72 sm:w-72 sm:h-80 lg:w-96 lg:h-[420px] rounded-3xl overflow-hidden border-4 border-white dark:border-dark-card shadow-2xl">
                <img
                  src="/photo.png"
                  alt="Sohel Khan"
                  className="w-full h-full object-cover object-top"
                />
              </div>

              {/* Floating badges */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="absolute -bottom-6 -left-6 bg-white dark:bg-dark-card shadow-xl rounded-2xl px-4 py-2 flex items-center gap-2"
              >
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                <span className="text-xs sm:text-sm font-semibold dark:text-white">Open to Work</span>
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 3.5 }}
                className="absolute -top-4 -right-4 bg-primary text-white shadow-xl rounded-2xl px-4 py-2"
              >
                <div className="text-[10px] opacity-80">Experience</div>
                <div className="text-sm font-black">Fresher</div>
              </motion.div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;