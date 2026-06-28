"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams, useRouter } from "next/navigation";
import LoadingSpinner from "@/components/LoadingSpinner";

const UserEditRecipePage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    cuisine: "",
    difficulty: "",
    prepTime: "",
    ingredients: "",
    instructions: "",
    url: "",
    price: "",
  });

  // Fetch existing recipe data
  useEffect(() => {
    if (id) {
      fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/recipes/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setFormData({
            name: data.recipeName || "",
            category: data.category || "",
            cuisine: data.cuisineType || "",
            difficulty: data.difficultyLevel || "",
            prepTime: data.preparationTime || "",
            ingredients: data.ingredients || "",
            instructions: data.instructions || "",
            url: data.recipeImage || "",
            price: data.price || "",
          });
          setLoading(false);
        })
        .catch(() => {
          toast.error("Failed to load recipe data");
          setLoading(false);
        });
    }
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedPayload = {
      recipeName: formData.name,
      recipeImage: formData.url,
      category: formData.category,
      price: parseFloat(formData.price),
      cuisineType: formData.cuisine,
      difficultyLevel: formData.difficulty,
      preparationTime: formData.prepTime,
      ingredients: formData.ingredients,
      instructions: formData.instructions,
      updatedAt: new Date().toISOString(),
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/recipes/${id}`,
        {
          method: "PATCH", 
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedPayload),
        },
      );

      if (res.ok) {
        toast.success("Recipe updated successfully!");
        setTimeout(() => router.push("/dashboard/user/my-recipes"), 1500);
      } else {
        const errorData = await res.json();
        toast.error(errorData.message || "Failed to update recipe.");
      }
    } catch (error) {
      toast.error("Server connection error.");
    }
  };

  const inputClass =
    "w-full p-3 mt-1 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1f2437] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all";
  const labelClass =
    "block text-sm font-medium text-gray-700 dark:text-gray-300";

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0f121e] p-4 md:p-8">
      <ToastContainer position="top-right" theme="colored" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto bg-white dark:bg-[#161a29] rounded-3xl shadow-xl p-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Edit Recipe
        </h1>
        <form
          onSubmit={handleUpdate}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="md:col-span-2">
            <label className={labelClass}>
              Recipe Image Link <span className="text-red-500">*</span>
            </label>
            <input
              required
              type="url"
              value={formData.url}
              onChange={(e) =>
                setFormData({ ...formData, url: e.target.value })
              }
              className={inputClass}
            />
          </div>
          <div className="md:col-span-2">
            <label className={labelClass}>
              Recipe Name <span className="text-red-500">*</span>
            </label>
            <input
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>
              Category <span className="text-red-500">*</span>
            </label>
            <select
              required
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className={inputClass}
            >
              <option value="">Select Category</option>
              <option>Appetizer</option>
              <option>Main Course</option>
              <option>Dessert</option>
              <option>Beverage</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>
              Price ($) <span className="text-red-500">*</span>
            </label>
            <input
              required
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>
              Cuisine Type <span className="text-red-500">*</span>
            </label>
            <select
              required
              value={formData.cuisine}
              onChange={(e) =>
                setFormData({ ...formData, cuisine: e.target.value })
              }
              className={inputClass}
            >
              <option value="">Select Cuisine</option>
              <option>Italian</option>
              <option>Mexican</option>
              <option>Bengali</option>
              <option>Indian</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>
              Difficulty Level <span className="text-red-500">*</span>
            </label>
            <select
              required
              value={formData.difficulty}
              onChange={(e) =>
                setFormData({ ...formData, difficulty: e.target.value })
              }
              className={inputClass}
            >
              <option value="">Select Difficulty</option>
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className={labelClass}>
              Prep Time <span className="text-red-500">*</span>
            </label>
            <input
              required
              value={formData.prepTime}
              onChange={(e) =>
                setFormData({ ...formData, prepTime: e.target.value })
              }
              className={inputClass}
            />
          </div>
          <div className="md:col-span-2">
            <label className={labelClass}>
              Ingredients <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              rows="3"
              value={formData.ingredients}
              onChange={(e) =>
                setFormData({ ...formData, ingredients: e.target.value })
              }
              className={inputClass}
            ></textarea>
          </div>
          <div className="md:col-span-2">
            <label className={labelClass}>
              Instructions <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              rows="3"
              value={formData.instructions}
              onChange={(e) =>
                setFormData({ ...formData, instructions: e.target.value })
              }
              className={inputClass}
            ></textarea>
          </div>
          <button
            type="submit"
            className="md:col-span-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-500/20"
          >
            Update Recipe
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default UserEditRecipePage;
