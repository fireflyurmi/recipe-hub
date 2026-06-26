"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaTrashAlt } from "react-icons/fa";
import Image from "next/image";

const favoriteRecipes = [
  { id: 1, name: "Chocolate Cake", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=200&auto=format&fit=crop" },
  { id: 2, name: "Pancakes", image: "https://images.unsplash.com/photo-1598214886806-c87b84b7078b?q=80&w=200&auto=format&fit=crop" },
  { id: 3, name: "Grilled Salmon", image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=200&auto=format&fit=crop" },
  { id: 4, name: "Caesar Salad", image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?q=80&w=200&auto=format&fit=crop" },
];

const MyFavoritesPage = () => {
  return (
    <div className="min-h-screen p-4 md:p-8">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
        My Favorites
      </h1>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-[#161a29] rounded-3xl shadow-xl overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 dark:bg-[#1f2437] text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-800">
              <tr>
                <th className="p-6 font-medium">Recipe</th>
                <th className="p-6 font-medium"></th>
                <th className="p-6 font-medium text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {favoriteRecipes.map((recipe) => (
                <tr key={recipe.id} className="text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-[#1f2437] transition-colors">
                  <td className="p-4 w-20">
                    <div className="w-16 h-16 relative rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                      <Image 
                        src={recipe.image} 
                        alt={recipe.name} 
                        fill 
                        className="object-cover" 
                        sizes="64px"
                      />
                    </div>
                  </td>
                  <td className="p-6 font-semibold text-lg">{recipe.name}</td>
                  <td className="p-6 flex flex-col md:flex-row items-center justify-center gap-4">
                    {/* View Details Button */}
                    <button className="px-6 py-2 border border-purple-600 text-purple-600 dark:text-purple-400 dark:border-purple-400 rounded-lg hover:bg-purple-600 hover:text-white dark:hover:bg-purple-500 transition-all font-medium">
                      View Details
                    </button>
                    
                    {/* Remove Button */}
                    <button className="flex items-center gap-2 px-6 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all font-medium">
                      <FaTrashAlt size={16} />
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default MyFavoritesPage;