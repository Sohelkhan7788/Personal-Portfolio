import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { HiMail } from 'react-icons/hi';
import { useRef } from 'react';

const Footer = () => {
  const clickRef = useRef({ count: 0, timer: null });
  const pressTimer = useRef(null);

  const scrollTo = (id) =>
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });

  // 🔥 Desktop (triple click)
  const handleSecretAccess = () => {
    clickRef.current.count++;

    if (clickRef.current.count === 3) {
      window.location.href = "/admin/login";
    }

    clearTimeout(clickRef.current.timer);
    clickRef.current.timer = setTimeout(() => {
      clickRef.current.count = 0;
    }, 800);
  };

  // 🔥 Mobile (long press)
  const handleTouchStart = () => {
    pressTimer.current = setTimeout(() => {
      window.location.href = "/admin/login";
    }, 800); // hold for 0.8 sec
  };

  const handleTouchEnd = () => {
    clearTimeout(pressTimer.current);
  };

  return (
    <footer className="bg-[#1e2a4a] text-white py-10">

      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* 🔥 Responsive Layout */}
        <div className="flex flex-col items-center gap-8 text-center md:flex-row md:justify-between md:text-left">

          {/* Watermark */}
          <div className="text-3xl sm:text-4xl md:text-5xl font-black text-white/10 font-playfair">
            Sohel Khan
          </div>

          {/* Nav Links */}
          <nav className="flex flex-wrap gap-4 sm:gap-6 justify-center">
            {[
              ['Projects', '#projects'],
              ['Certifications', '#certifications'],
              ['Skills', '#skills'],
              ['Contact Me', '#contact'],
            ].map(([label, href]) => (
              <button
                key={label}
                onClick={() => scrollTo(href)}
                className="text-gray-300 hover:text-white text-sm font-medium transition-all duration-300"
              >
                {label}
              </button>
            ))}
          </nav>

          {/* Social */}
          <div className="flex gap-3">
            {[
              { icon: <FaLinkedin size={18} />, url: 'https://www.linkedin.com/in/sohel-khan-6090582b3/' },
              { icon: <FaGithub size={18} />, url: 'https://github.com/Sohelkhan7788' },
              { icon: <HiMail size={18} />, url: 'mailto:soyalkhan1402@gmail.com' },
            ].map((s, i) => (
              <a
                key={i}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-white/10 hover:bg-primary flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* 🔥 Bottom (SECRET TRIGGER) */}
        <div
          onClick={handleSecretAccess}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="border-t border-white/10 mt-8 pt-6 text-center text-gray-400 text-xs sm:text-sm cursor-pointer select-none"
        >
          © {new Date().getFullYear()} Sohel Khan. Built with React + MERN Stack.
        </div>

      </div>
    </footer>
  );
};

export default Footer;