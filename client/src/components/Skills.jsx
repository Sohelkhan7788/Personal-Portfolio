import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import api from '../api'; // ✅ FIXED

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
];

const categoryMeta = {
  frontend: { label: 'Frontend', color: '#e74c3c' },
  backend: { label: 'Backend', color: '#3498db' },
  database: { label: 'Database', color: '#2ecc71' },
};

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    api.get('/skills') // ✅ FIXED
      .then(res => setSkills(res.data?.length ? res.data : fallbackSkills))
      .catch(() => setSkills(fallbackSkills));
  }, []);

  const categories = ['all', ...new Set(skills.map(s => s.category))];

  const filtered =
    activeCategory === 'all'
      ? skills
      : skills.filter(s => s.category === activeCategory);

  return (
    <section id="skills" className="py-20 relative">

      <div className="watermark absolute bottom-0 right-0">Skills</div>

      <div className="max-w-6xl mx-auto px-4">

        {/* Heading */}
        <motion.div className="text-center mb-10">
          <h2 className="text-4xl font-black text-primary mb-4">Skills</h2>
          <p className="text-gray-500">Technologies I work with</p>
        </motion.div>

        {/* Filter */}
        <div className="flex flex-wrap gap-3 justify-center mb-10">
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl ${
                activeCategory === cat
                  ? 'bg-primary text-white'
                  : 'bg-gray-100'
              }`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {filtered.map(skill => (
            <div key={skill._id}
              className="bg-white dark:bg-dark-card p-4 rounded-xl shadow">

              <div className="flex justify-between mb-2">
                <span>{skill.name}</span>
                <span>{skill.proficiency}%</span>
              </div>

              <div className="h-2 bg-gray-200 rounded">
                <div
                  className="h-2 rounded"
                  style={{
                    width: `${skill.proficiency}%`,
                    background: categoryMeta[skill.category]?.color
                  }}
                />
              </div>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default Skills;