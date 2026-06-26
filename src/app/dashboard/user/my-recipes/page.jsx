
"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Image from "next/image";
import { FcViewDetails } from "react-icons/fc";

const recipes = [
  {
    id: 1,
    name: "Spaghetti Carbonara",
    status: "Published",
    likes: 45,
    image:
      "https://images.unsplash.com/photo-1612874742237-6526221588e3?q=80&w=100&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Chicken Curry",
    status: "Published",
    likes: 32,
    image:
      "https://images.unsplash.com/photo-1603894584373-5ac82b24898f?q=80&w=100&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Avocado Salad",
    status: "Draft",
    likes: 12,
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=100&auto=format&fit=crop",
  },
];

const MyRecipesPage = () => {
  return (
    <div className="min-h-screen p-4 md:p-8 max-w-full overflow-x-hidden">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
        My Recipes
      </h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-[#161a29] rounded-3xl shadow-xl overflow-hidden w-full"
      >
        {/* Mobile */}
        <div className="md:hidden divide-y divide-gray-100 dark:divide-gray-800">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="p-4 flex items-center justify-between gap-4 hover:bg-gray-50 dark:hover:bg-[#1f2437] transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-12 h-12 relative rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 flex-shrink-0">
                  <Image
                    src={recipe.image}
                    alt={recipe.name}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-gray-900 dark:text-white truncate">
                    {recipe.name}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        recipe.status === "Published"
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                      }`}
                    >
                      {recipe.status}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {recipe.likes} likes
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button className="text-blue-500 hover:text-blue-600 transition-colors p-1">
                  <FcViewDetails size={20} />
                </button>
                <button className="text-red-500 hover:text-red-600 transition-colors p-1">
                  <FaTrashAlt size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 dark:bg-[#1f2437] text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-800">
              <tr>
                <th className="p-6 font-medium">Recipe</th>
                <th className="p-6 font-medium">Status</th>
                <th className="p-6 font-medium">Likes</th>
                <th className="p-6 font-medium text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {recipes.map((recipe) => (
                <tr
                  key={recipe.id}
                  className="text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-[#1f2437] transition-colors"
                >
                  <td className="p-6 flex items-center gap-4">
                    <div className="w-12 h-12 relative rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                      <Image
                        src={recipe.image}
                        alt={recipe.name}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    <span className="font-semibold">{recipe.name}</span>
                  </td>
                  <td className="p-6">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        recipe.status === "Published"
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                      }`}
                    >
                      {recipe.status}
                    </span>
                  </td>
                  <td className="p-6">{recipe.likes}</td>
                  <td className="p-6 flex justify-center gap-4">
                    <button className="text-blue-500 hover:text-blue-600 transition-colors">
                      <FcViewDetails size={20} />
                    </button>
                    <button className="text-red-500 hover:text-red-600 transition-colors">
                      <FaTrashAlt size={18} />
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

export default MyRecipesPage;