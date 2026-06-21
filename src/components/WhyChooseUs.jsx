'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaClipboardList, FaUsers, FaInfinity } from 'react-icons/fa';

const WhyChooseUs = () => {
  const features = [
    { id: 1, title: "Diverse Recipes", desc: "Explore recipes from around the world", icon: FaSearch, color: "text-purple-500", bg: "bg-purple-500/10" },
    { id: 2, title: "Easy to Follow", desc: "Step-by-step instructions", icon: FaClipboardList, color: "text-blue-500", bg: "bg-blue-500/10" },
    { id: 3, title: "Community Driven", desc: "Share, like & connect with others", icon: FaUsers, color: "text-red-500", bg: "bg-red-500/10" },
    { id: 4, title: "100% Free", desc: "All recipes are free forever", icon: FaInfinity, color: "text-green-500", bg: "bg-green-500/10" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section className="py-16 bg-white dark:bg-[#0b101a] transition-colors">
      <div className="page-container">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          className="bg-[#ebebfa] dark:bg-[#161a29] p-12 rounded-3xl"
        >
          <h2 className="text-2xl font-bold text-center mb-12 dark:text-white">Why Choose RecipeHub?</h2>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-4 gap-8"
          >
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <motion.div 
                  key={feature.id} 
                  variants={itemVariants}
                  whileHover={{ y: -10 }}
                  className="flex flex-col items-center text-center group"
                >
                  <motion.div 
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    className={`p-4 rounded-full mb-4 ${feature.bg} ${feature.color}`}
                  >
                    <Icon size={24} />
                  </motion.div>
                  <h3 className="font-bold mb-1 dark:text-white">{feature.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{feature.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;