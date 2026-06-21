'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaHeart, FaStar } from 'react-icons/fa';
import burgerImage from '../assets/burger.png'; 

const CommunityAndNewsletter = () => {
  const testimonials = [
    { name: "Emily Johnson", text: "“Who Emily Johnson: Explore recipes from around the world to express feel and get the best cuisines.”" },
    { name: "Michael Brown", text: "“I love my favorite pasta box. Share favorites and discuss others with your family.”" },
    { name: "Sophia Davis", text: "“Love sharing my recipes and love doing it over and over and over times.”" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section className="py-16 bg-white dark:bg-[#0b101a] transition-colors overflow-hidden">
      <div className="page-container">
        
        {/* --- Testimonial Section --- */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mb-20"
        >
          <motion.div variants={itemVariants} className="flex items-center gap-2 mb-10">
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1, 1.2, 1], 
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                repeatDelay: 1, 
                ease: "easeInOut" 
              }}
            >
              <FaHeart className="text-red-500" size={30} />
            </motion.div>
            <h2 className="text-xl md:text-2xl font-bold dark:text-white">What Our Community Says?</h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div 
                key={i} 
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="p-6 border border-gray-100 dark:border-gray-800 rounded-3xl dark:bg-[#161a29] shadow-sm"
              >
                <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm leading-relaxed">{t.text}</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center text-purple-600 dark:text-purple-300 font-bold">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm dark:text-white">{t.name}</h4>
                    <div className="flex text-yellow-400 text-xs"><FaStar/><FaStar/><FaStar/><FaStar/><FaStar/></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* --- Newsletter Section --- */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="relative bg-[#6944f0] rounded-3xl p-8 md:p-12 overflow-hidden"
        >
          <div className="max-w-xl relative z-10">
            <h2 className="text-3xl font-bold mb-4 text-white">Get Delicious Recipes <br/> In Your Inbox</h2>
            <p className="text-gray-200 mb-8 max-w-sm">Explore our newsletter for fresh recipes, exciting tips, and delicious content.</p>
            
            <div className="flex bg-white p-2 rounded-2xl max-w-sm shadow-sm">
              <input type="email" placeholder="Enter your email" className="w-full px-4 outline-none bg-transparent" />
              <button className="bg-[#5a43d0] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#4a36b0] transition-colors">Subscribe</button>
            </div>
          </div>
          
          <motion.div 
            className="absolute right-0 top-0 h-full w-75 hidden md:flex items-center justify-center"
            animate={{ 
              scale: [1, 1.2, 0.8, 1],
              rotate: [0, 10, -10, 0],
              opacity: [1, 0.7, 0.9, 1]
            }}
            transition={{ 
              duration: 8, 
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "loop",
              repeatDelay: 2
            }}
          >
            <Image src={burgerImage} alt="Food" width={500} height={500} className="object-contain" />
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};

export default CommunityAndNewsletter;