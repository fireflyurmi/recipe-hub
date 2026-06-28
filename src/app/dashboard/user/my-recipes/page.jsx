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
      fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/my-recipes/${session.user.email}`,
      )
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

  // Updated Delete function with SweetAlert2
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
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URI}/recipes/${id}`,
          {
            method: "DELETE",
          },
        );

        if (res.ok) {
          setRecipes(recipes.filter((r) => r._id !== id));
          Swal.fire("Deleted!", "Your recipe has been deleted.", "success");
        } else {
          Swal.fire("Error!", "Something went wrong.", "error");
        }
      }
    });
  };

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
          {/* Table content */}
          <table className="w-full text-left">
            <thead className="bg-gray-50 dark:bg-[#1f2437] text-gray-500">
              <tr>
                <th className="p-6">Recipe</th>
                <th className="p-6">Status</th>
                <th className="p-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {recipes.map((recipe) => (
                <tr key={recipe._id} className="text-gray-900 dark:text-white">
                  <td className="p-6 flex items-center gap-4">
                    <Image
                      src={recipe.recipeImage}
                      alt={recipe.recipeName}
                      width={48}
                      height={48}
                      className="rounded-lg object-cover"
                    />
                    <span className="font-semibold">{recipe.recipeName}</span>
                  </td>
                  <td className="p-6">{recipe.status}</td>
                  <td className="p-6 flex justify-center gap-4">
                    <Link href={`/recipes/${recipe._id}`}>
                      <FcViewDetails size={20} />
                    </Link>
                    <Link
                      href={`/dashboard/user/edit-recipe/${recipe._id}`}
                      className="text-yellow-500"
                    >
                      <FaEdit size={18} />
                    </Link>
                    <button
                      onClick={() => handleDelete(recipe._id)}
                      className="text-red-500"
                    >
                      <FaTrashAlt size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}
    </div>
  );
};
export default MyRecipesPage;
