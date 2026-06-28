"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { FcViewDetails } from "react-icons/fc";
import Image from "next/image";
import Link from "next/link";
import Swal from "sweetalert2";
import { useSession } from "@/lib/auth-client";
import LoadingSpinner from "@/components/LoadingSpinner";

const MyRecipesPage = () => {
  const { data: session } = useSession();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRecipes = () => {
    if (session?.user?.email) {
      fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/my-recipes/${session.user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setRecipes(data);
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, [session]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#9333ea",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/recipes/${id}`, {
          method: "DELETE",
        });
        if (res.ok) {
          setRecipes(recipes.filter((r) => r._id !== id));
          Swal.fire("Deleted!", "Your recipe has been deleted.", "success");
        }
      }
    });
  };

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gray-50 dark:bg-[#0f121e]">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">My Recipes</h1>
      
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
              <thead className="bg-gray-100 dark:bg-[#1f2437] text-gray-600 dark:text-gray-300">
                <tr>
                  <th className="p-4 md:p-6 font-semibold">Recipe</th>
                  <th className="p-4 md:p-6 text-center font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {recipes.map((recipe) => (
                  <tr key={recipe._id} className="text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-[#1f2437] transition-colors">
                    <td className="p-4 md:p-6 flex items-center gap-4">
                      <div className="relative w-12 h-12 shrink-0">
                        <Image
                          src={recipe.recipeImage}
                          alt={recipe.recipeName}
                          fill
                          className="rounded-lg object-cover"
                        />
                      </div>
                      <span className="font-medium truncate max-w-37.5 md:max-w-none">{recipe.recipeName}</span>
                    </td>
                    <td className="p-4 md:p-6">
                      <div className="flex justify-center items-center gap-3 md:gap-4">
                        <Link href={`/recipes/${recipe._id}`} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition">
                          <FcViewDetails size={22} />
                        </Link>
                        <Link href={`/dashboard/user/edit-recipe/${recipe._id}`} className="p-2 text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 rounded-full transition">
                          <FaEdit size={20} />
                        </Link>
                        <button onClick={() => handleDelete(recipe._id)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition">
                          <FaTrashAlt size={18} />
                        </button>
                      </div>
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