import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import axios from 'axios';

const techColors = {
  HTML: 'bg-orange-100 text-orange-600',
  CSS: 'bg-blue-100 text-blue-600',
  JavaScript: 'bg-yellow-100 text-yellow-700',
  React: 'bg-cyan-100 text-cyan-600',
  'Node.js': 'bg-green-100 text-green-600',
  MongoDB: 'bg-emerald-100 text-emerald-600',
  Express: 'bg-gray-100 text-gray-600',
  Tailwind: 'bg-teal-100 text-teal-600',
};

const fallbackProjects = [
  {
    _id: '1',
    title: 'Fashion Store Frontend',
    description: 'Modern fashion e-commerce frontend with clean UI.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'React'],
    image: '',
    liveUrl: 'https://fashion-store-1212.netlify.app/',
    githubUrl: 'https://github.com/Sohelkhan7788/fashion-store-frontend',
  },
  {
    _id: '2',
    title: 'Weather Web App',
    description: 'Weather app using API.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    image: '',
    liveUrl: 'https://sohelkhan7788.github.io/Weather-Web-App/',
    githubUrl: 'https://github.com/Sohelkhan7788/Weather-Web-App',
  },
];

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/projects')
      .then(r => {
        console.log("PROJECTS:", r.data);
        setProjects(r.data.length ? r.data : fallbackProjects);
      })
      .catch(() => setProjects(fallbackProjects))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="projects" className="py-24 relative">
      
      {/* Watermark */}
      <div className="watermark absolute top-0 right-0 select-none">
        Projects
      </div>

      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-heading text-5xl md:text-6xl font-black text-primary mb-4">
            Projects
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-lg max-w-xl mx-auto">
            Some things I've built with passion and purpose.
          </p>
        </motion.div>

        {/* Loading */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1,2,3].map(i => (
              <div key={i} className="h-72 rounded-3xl bg-gray-100 dark:bg-dark-card animate-pulse" />
            ))}
          </div>
        ) : (

          /* Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {projects.map((project, i) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bg-white dark:bg-dark-card rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-800"
              >

                {/* IMAGE */}
                <div className="h-48 relative overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
                  
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-5xl font-black text-white/20">
                        {project.title?.[0]}
                      </span>
                    </div>
                  )}

                  {/* 🔥 Overlay Buttons */}
                  <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-5">

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:scale-110 transition"
                      >
                        <FaGithub size={20} />
                      </a>
                    )}

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:scale-110 transition"
                      >
                        <FaExternalLinkAlt size={18} />
                      </a>
                    )}

                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-6">
                  <h3 className="font-bold text-xl dark:text-white mb-2">
                    {project.title}
                  </h3>

                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* TECH TAGS */}
                  <div className="flex flex-wrap gap-2">
                    {(project.technologies || []).map(tech => (
                      <span
                        key={tech}
                        className={`text-xs font-medium px-2 py-1 rounded-lg ${
                          techColors[tech] || 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

              </motion.div>
            ))}

          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;