import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiMail, HiPhone, HiLocationMarker } from 'react-icons/hi';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import toast from 'react-hot-toast';
import api from '../api'; // ✅ use api

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill all fields');
      return;
    }

    setLoading(true);

    try {
      await api.post('/contact', form); // ✅ fixed
      toast.success('Message sent successfully! 🎉');
      setForm({ name: '', email: '', message: '' });
    } catch {
      toast.error('Failed to send. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const info = [
    { icon: <HiMail size={20} />, label: 'Email', value: 'soyalkhan1402@gmail.com' },
    { icon: <HiPhone size={20} />, label: 'Phone', value: '+91 8005620439' },
    { icon: <HiLocationMarker size={20} />, label: 'Location', value: 'Jaipur, Rajasthan, India' },
  ];

  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-dark-card/30">

      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="section-heading text-3xl sm:text-4xl lg:text-6xl font-black text-primary mb-4">
            Contact Me
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-lg">
            Questions or just want to say hello?
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* LEFT */}
          <motion.div>
            <h3 className="text-xl font-bold dark:text-white mb-6">
              Let's Work Together
            </h3>

            <div className="space-y-5 mb-8">
              {info.map(item => (
                <div key={item.label} className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">{item.label}</div>
                    <div className="font-semibold dark:text-white">
                      {item.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              {[
                { icon: <FaGithub />, url: 'https://github.com/Sohelkhan7788' },
                { icon: <FaLinkedin />, url: 'https://www.linkedin.com/in/sohel-khan-6090582b3/' },
              ].map((s, i) => (
                <a key={i} href={s.url} target="_blank" rel="noreferrer"
                  className="w-10 h-10 bg-white dark:bg-dark-card flex items-center justify-center rounded-xl hover:bg-primary hover:text-white">
                  {s.icon}
                </a>
              ))}
            </div>
          </motion.div>

          {/* RIGHT */}
          <motion.div>
            <form onSubmit={handleSubmit} className="bg-white dark:bg-dark-card p-6 rounded-3xl shadow-lg space-y-4">

              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full px-4 py-3 rounded-xl border"
              />

              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Your Email"
                className="w-full px-4 py-3 rounded-xl border"
              />

              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={4}
                placeholder="Your Message"
                className="w-full px-4 py-3 rounded-xl border"
              />

              <button className="w-full bg-primary text-white py-3 rounded-xl font-bold">
                {loading ? 'Sending...' : 'Send Message'}
              </button>

            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Contact;