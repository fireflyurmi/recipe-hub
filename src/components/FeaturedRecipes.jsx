'use client';

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaClock } from "react-icons/fa";
import { IoSparkles } from "react-icons/io5";

const FeaturedRecipes = () => {
  const recipes = [
    { id: 1, name: "Creamy Garlic Pasta", category: "Italian Cuisine", time: "20 Min", image: "https://images.unsplash.com/photo-1621668180247-495201421689?auto=format&fit=crop&q=80&w=500" },
    { id: 2, name: "Butter Chicken", category: "Indian Cuisine", time: "40 Min", image: "https://images.unsplash.com/photo-1588166524941-3bf31a98e723?auto=format&fit=crop&q=80&w=500" },
    { id: 3, name: "Spicy Tacos", category: "Mexican Cuisine", time: "25 Min", image: "https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?auto=format&fit=crop&q=80&w=500" },
    { id: 4, name: "Chocolate Lava Cake", category: "Dessert", time: "40 Min", image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&q=80&w=500" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="py-12 bg-white dark:bg-bg-dark transition-colors duration-300">
      <div className="page-container">
        <div className="flex items-center justify-between mb-8 px-2">
          <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2 text-gray-900 dark:text-white">
            <motion.div
              animate={{ 
                rotate: [0, 20, -20, 0],
                scale: [1, 1.2, 1] 
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              <IoSparkles className="text-orange-400" size={40} />
            </motion.div>

            Featured Recipes
          </h2>
          
          <Link href="/browse">
            <motion.div
              whileHover={{ scale: 1.05, backgroundColor: "#6944f0", color: "#ffffff" }}
              whileTap={{ scale: 0.95 }}
              className="text-[12px] md:text-sm font-semibold text-primary bg-primary/10 px-4 py-2 rounded-lg transition-colors shrink-0"
            >
              View All
            </motion.div>
          </Link>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {recipes.map((recipe) => (
            <motion.div
              key={recipe.id}
              variants={cardVariants}
              whileHover={{ y: -8, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)" }}
              className="bg-white dark:bg-[#1e2030] rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700/50 transition-all duration-300"
            >
              <div className="relative h-48 w-full mb-4 overflow-hidden rounded-xl">
                <Image
                  src={recipe.image}
                  alt={recipe.name}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
              </div>
              <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1">
                {recipe.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                {recipe.category}
              </p>
              <div className="flex items-center text-xs text-gray-400 gap-1">
                <FaClock /> <span>{recipe.time}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedRecipes;