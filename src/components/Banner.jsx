'use client';

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import bannerImage from "@/assets/banner.png";
import { FaUtensils, FaUsers, FaStar, FaThLarge } from "react-icons/fa";

const Banner = () => {
  const stats = [
    { label: "Recipes", count: "10K+", icon: FaUtensils, color: "bg-orange-100 text-orange-600", borderColor: "hover:border-orange-500" },
    { label: "Happy Users", count: "5K+", icon: FaUsers, color: "bg-pink-100 text-pink-600", borderColor: "hover:border-pink-500" },
    { label: "Reviews", count: "2K+", icon: FaStar, color: "bg-violet-100 text-violet-600", borderColor: "hover:border-violet-500" },
    { label: "Categories", count: "50+", icon: FaThLarge, color: "bg-amber-100 text-amber-600", borderColor: "hover:border-amber-500" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section className="py-16">
      <div className="page-container">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12 mb-16">
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="md:w-1/2 space-y-6"
          >
            <motion.h1 
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight"
            >
              Find, Share & Create{" "}
              <span className="text-primary inline-block">Amazing Recipes</span>
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-lg text-gray-600 dark:text-gray-400 max-w-lg"
            >
              Join our community of food lovers. Discover delicious recipes, share your culinary creations and inspire others every day.
            </motion.p>
            
            <motion.div variants={itemVariants} className="pt-4">
              <Link href="/browse">
                <motion.div
                  whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(105, 68, 240, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-medium transition-all"
                >
                  Browse Recipes
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>

          <div className="md:w-1/2 flex justify-center">
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 6, ease: "easeInOut", repeat: Infinity, repeatType: "loop" }}
            >
              <Image
                src={bannerImage}
                alt="Delicious Pasta"
                width={500}
                height={500}
                className="w-full max-w-md object-contain"
                priority
              />
            </motion.div>
          </div>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10, boxShadow: "0px 20px 30px rgba(0,0,0,0.1)" }}
                className={`bg-white dark:bg-[#1e2030] p-6 rounded-3xl shadow-sm border-2 border-transparent transition-all duration-300 cursor-pointer ${stat.borderColor}`}
              >
                <motion.div 
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                  className={`p-4 rounded-full mb-4 inline-flex ${stat.color}`}
                >
                  <Icon size={24} />
                </motion.div>
                <span className="text-3xl font-bold block text-gray-900 dark:text-white">
                  {stat.count}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {stat.label}
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Banner;