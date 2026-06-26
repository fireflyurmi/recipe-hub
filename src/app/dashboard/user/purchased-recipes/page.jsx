"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const purchasedRecipes = [
  { id: 1, name: "Beef Steak", price: "$2.99", date: "May 26, 2024", image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?q=80&w=100&auto=format&fit=crop" },
  { id: 2, name: "Chocolate Lava Cake", price: "$1.99", date: "May 25, 2024", image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?q=80&w=100&auto=format&fit=crop" },
  { id: 3, name: "Chicken Biryani", price: "$2.49", date: "May 20, 2024", image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=100&auto=format&fit=crop" },
  { id: 4, name: "Pancakes", price: "$1.49", date: "May 18, 2024", image: "https://images.unsplash.com/photo-1598214886806-c87b84b7078b?q=80&w=100&auto=format&fit=crop" },
];

const PurchasedRecipesPage = () => {
  return (
    <div className="min-h-screen p-4 md:p-8">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
        Purchased Recipes
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
                <th className="p-6 font-medium">Price</th>
                <th className="p-6 font-medium">Purchased On</th>
                <th className="p-6 font-medium text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {purchasedRecipes.map((recipe) => (
                <tr key={recipe.id} className="text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-[#1f2437] transition-colors">
                  <td className="p-6 flex items-center gap-4">
                    <div className="w-12 h-12 relative rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                      <Image src={recipe.image} alt={recipe.name} fill className="object-cover" sizes="48px" />
                    </div>
                    <span className="font-semibold">{recipe.name}</span>
                  </td>
                  <td className="p-6">{recipe.price}</td>
                  <td className="p-6 text-gray-500 dark:text-gray-400">{recipe.date}</td>
                  <td className="p-6 text-center">
                    <button className="px-5 py-2 border border-purple-600 text-purple-600 dark:text-purple-400 dark:border-purple-400 rounded-lg hover:bg-purple-600 hover:text-white transition-all font-medium">
                      View Details
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

export default PurchasedRecipesPage;