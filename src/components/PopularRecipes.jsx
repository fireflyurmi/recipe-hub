'use client';

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaRegHeart } from "react-icons/fa";
import { BsFire } from "react-icons/bs";

const PopularRecipes = () => {
  const recipes = [
    { id: 1, rank: "1", name: "Classic Pancakes", author: "Sarah Johnson", likes: "1.2K", image: "https://images.unsplash.com/photo-1595854341625-f33ee10dbf94?auto=format&fit=crop&q=80&w=400" },
    { id: 2, rank: "2", name: "Beef Steak", author: "John Smith", likes: "982", image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&q=80&w=400" },
    { id: 3, rank: "3", name: "Caesar Salad", author: "Mia Brown", likes: "876", image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&q=80&w=400" },
    { id: 4, rank: "4", name: "Grilled Salmon", author: "David Wilson", likes: "765", image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=400" },
    { id: 5, rank: "5", name: "Veggie Stir Fry", author: "Emma Davis", likes: "654", image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&q=80&w=400" },
  ];

  return (
    <section className="py-12 bg-white dark:bg-[#0b101a] transition-colors duration-300">
      <div className="page-container">
        <div className="flex items-center justify-between mb-8 px-2">
          <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2 text-gray-900 dark:text-white">
            {/* Animated Fire Icon */}
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, -5, 5, 0],
                opacity: [1, 0.8, 1]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              <BsFire className="text-orange-400" size={40} />
            </motion.div>
            Popular Recipes
          </h2>
          
          <Link href="/browse">
            <motion.div
              whileHover={{ scale: 1.05, backgroundColor: "#6944f0", color: "#ffffff" }}
              whileTap={{ scale: 0.95 }}
              className="text-[12px] md:text-sm font-semibold text-primary bg-primary/10 px-4 py-2 rounded-lg transition-all shrink-0"
            >
              View All
            </motion.div>
          </Link>
        </div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
        >
          {recipes.map((recipe) => (
            <motion.div
              key={recipe.id}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              whileHover={{ y: -10, boxShadow: "0px 10px 25px rgba(0,0,0,0.1)" }}
              className="bg-white dark:bg-[#1e2030] rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700/50 transition-all duration-300"
            >
              <div className="relative h-48 w-full mb-4 overflow-hidden rounded-xl">
                <Image src={recipe.image} alt={recipe.name} fill className="object-cover transition-transform duration-500 hover:scale-110" />
                <div className="absolute top-2 left-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-white w-8 h-8 flex items-center justify-center rounded-full font-bold text-sm shadow">
                  {recipe.rank}
                </div>
              </div>
              <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1 truncate">{recipe.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{recipe.author}</p>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 gap-1">
                <FaRegHeart className="text-red-500" />
                <span>{recipe.likes}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PopularRecipes;