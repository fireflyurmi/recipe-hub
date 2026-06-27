"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaTrashAlt } from "react-icons/fa";
import Image from "next/image";
import { FcViewDetails } from "react-icons/fc";
import { useSession } from "@/lib/auth-client";
import LoadingSpinner from "@/components/LoadingSpinner"; 

const MyRecipesPage = () => {
  const { data: session } = useSession();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user?.email) {
      fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/my-recipes/${session.user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setRecipes(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Failed to fetch", err);
          setLoading(false);
        });
    }
  }, [session]);

  return (
    <div className="min-h-screen p-4 md:p-8">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
        My Recipes
      </h1>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-[#161a29] rounded-3xl shadow-xl overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
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
                  <tr key={recipe._id} className="text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-[#1f2437]">
                    <td className="p-6 flex items-center gap-4">
                      <div className="w-12 h-12 relative rounded-lg overflow-hidden border">
                        <Image src={recipe.recipeImage} alt={recipe.recipeName} fill className="object-cover" />
                      </div>
                      <span className="font-semibold">{recipe.recipeName}</span>
                    </td>
                    <td className="p-6">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${recipe.status === "Published" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                        {recipe.status}
                      </span>
                    </td>
                    <td className="p-6">{recipe.likesCount}</td>
                    <td className="p-6 flex justify-center gap-4">
                      <button className="text-blue-500"><FcViewDetails size={20} /></button>
                      <button className="text-red-500"><FaTrashAlt size={18} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default MyRecipesPage;