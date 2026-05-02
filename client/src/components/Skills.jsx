import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const fallbackSkills = [
  { _id: '1', name: 'HTML5', category: 'frontend', proficiency: 95 },
  { _id: '2', name: 'CSS3', category: 'frontend', proficiency: 90 },
  { _id: '3', name: 'JavaScript', category: 'frontend', proficiency: 85 },
  { _id: '4', name: 'React.js', category: 'frontend', proficiency: 82 },
  { _id: '5', name: 'Tailwind CSS', category: 'frontend', proficiency: 88 },
  { _id: '6', name: 'Node.js', category: 'backend', proficiency: 78 },
  { _id: '7', name: 'Express.js', category: 'backend', proficiency: 75 },
  { _id: '8', name: 'MongoDB', category: 'database', proficiency: 80 },
  { _id: '9', name: 'MySQL', category: 'database', proficiency: 70 },
  { _id: '10', name: 'Git & GitHub', category: 'tools', proficiency: 85 },
  { _id: '11', name: 'Linux (RHCSA)', category: 'devops', proficiency: 80 },
  { _id: '12', name: 'REST APIs', category: 'backend', proficiency: 82 },
];

const categoryMeta = {
  frontend: { label: 'Frontend', color: '#e74c3c' },
  backend: { label: 'Backend', color: '#3498db' },
  database: { label: 'Database', color: '#2ecc71' },
  devops: { label: 'DevOps', color: '#f39c12' },
  tools: { label: 'Tools', color: '#9b59b6' },
  other: { label: 'Other', color: '#1abc9c' },
};

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    axios.get('/api/skills')
      .then(r => setSkills(r.data.length ? r.data : fallbackSkills))
      .catch(() => setSkills(fallbackSkills));
  }, []);

  const categories = ['all', ...new Set(skills.map(s => s.category))];
  const filtered = activeCategory === 'all'
    ? skills
    : skills.filter(s => s.category === activeCategory);

  return (
    <section id="skills" className="py-20 relative">

      <div className="watermark absolute bottom-0 right-0 select-none">Skills</div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="section-heading text-3xl sm:text-4xl lg:text-6xl font-black text-primary mb-4">
            Skills
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-lg">
            Technologies I work with
          </p>
        </motion.div>

        {/* 🔥 Category Filter Responsive */}
        <div className="flex flex-wrap gap-3 justify-center mb-10">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-primary text-white shadow-lg shadow-primary/30'
                  : 'bg-gray-100 dark:bg-dark-card text-gray-600 dark:text-gray-300 hover:bg-primary/10'
              }`}
            >
              {cat === 'all' ? 'All' : categoryMeta[cat]?.label || cat}
            </button>
          ))}
        </div>

        {/* 🔥 Grid Responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">

          {filtered.map((skill, i) => (
            <motion.div
              key={skill._id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-white dark:bg-dark-card rounded-2xl p-4 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >

              <div className="flex justify-between items-center mb-3">
                <span className="font-semibold text-sm sm:text-base dark:text-white">
                  {skill.name}
                </span>
                <span className="text-xs sm:text-sm font-bold text-primary">
                  {skill.proficiency}%
                </span>
              </div>

              {/* Progress Bar */}
              <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.proficiency}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: i * 0.05 }}
                  className="h-full rounded-full"
                  style={{
                    backgroundColor:
                      categoryMeta[skill.category]?.color || '#e74c3c'
                  }}
                />
              </div>

              <div className="mt-2">
                <span className="text-[10px] sm:text-xs text-gray-400 capitalize">
                  {skill.category}
                </span>
              </div>

            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default Skills;