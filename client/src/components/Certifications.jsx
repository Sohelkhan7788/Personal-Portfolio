import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import api from '../api'; // ✅ axios instance use

const fallbackCertifications = [
  {
    _id: '1',
    title: 'Red Hat Certified System Administrator (RHCSA)',
    issuer: 'Red Hat',
    issueDate: 'Oct 2024',
    expiryDate: 'Oct 2027',
    credentialUrl: 'https://www.credly.com/badges/cc25ab36-435d-481c-a024-97674f83a174',
  },
  {
    _id: '2',
    title: 'MongoDB Certification',
    issuer: 'MongoDB',
    issueDate: 'Jun 2024',
    expiryDate: '',
    credentialUrl: 'https://learn.mongodb.com/c/SjwAyD6hTsa2IMwvVG8flg',
  },
  {
    _id: '3',
    title: 'Prompt Design in Vertex AI Skill Badge',
    issuer: 'Google',
    issueDate: 'May 2024',
    expiryDate: 'Dec 2034',
    credentialUrl:
      'https://www.credly.com/badges/a45d8892-83a1-4413-bcb5-3882f1702d9f/linked_in_profile',
  },
  {
    _id: '4',
    title: 'Introduction to Generative AI',
    issuer: 'Udemy',
    issueDate: '2023',
    expiryDate: '',
    credentialUrl:
      'https://www.skills.google/public_profiles/65c5560c-c085-406f-b534-ac029c927819/badges/8866792',
  },
];

const Certifications = () => {
  const [certs, setCerts] = useState([]);

  useEffect(() => {
    api
      .get('/certifications') // ✅ production safe
      .then((res) => {
        setCerts(res.data?.length ? res.data : fallbackCertifications);
      })
      .catch((err) => {
        console.error('Certifications API error:', err);
        setCerts(fallbackCertifications);
      });
  }, []);

  return (
    <section id="certifications" className="py-16 sm:py-20 relative">

      {/* Watermark */}
      <div className="watermark absolute top-0 right-0 select-none">
        Certifications
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="section-heading text-3xl sm:text-4xl lg:text-6xl font-black text-primary mb-4">
            Certifications
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-lg">
            Verified credentials that prove my expertise
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

          {certs.map((cert, i) => (
            <motion.div
              key={cert._id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ scale: 1.03 }}
              className="w-full bg-white dark:bg-dark-card rounded-2xl p-5 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all"
            >

              {/* Top */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                  {cert.issuer?.[0] || 'C'}
                </div>

                <div>
                  <h3 className="font-semibold text-sm sm:text-base dark:text-white">
                    {cert.title}
                  </h3>
                  <p className="text-xs text-gray-400">{cert.issuer}</p>
                </div>
              </div>

              {/* Dates */}
              <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1 mb-4">
                <p>
                  <span className="font-medium">Issued:</span> {cert.issueDate}
                </p>
                {cert.expiryDate && (
                  <p>
                    <span className="font-medium">Expires:</span> {cert.expiryDate}
                  </p>
                )}
              </div>

              {/* Button */}
              <a
                href={cert.credentialUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-block text-xs sm:text-sm bg-primary text-white px-4 py-2 rounded-lg font-medium hover:scale-105 transition-all"
              >
                Show Credential
              </a>

            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default Certifications;