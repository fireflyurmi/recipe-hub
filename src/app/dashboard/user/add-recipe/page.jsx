"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSession } from "@/lib/auth-client";

const AddRecipePage = () => {
  const { data: session } = useSession();

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    cuisine: "",
    difficulty: "",
    prepTime: "",
    ingredients: "",
    instructions: "",
    url: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const recipePayload = {
      recipeName: formData.name,
      recipeImage: formData.url,
      category: formData.category,
      cuisineType: formData.cuisine,
      difficultyLevel: formData.difficulty,
      preparationTime: formData.prepTime,
      ingredients: formData.ingredients,
      instructions: formData.instructions,
      authorId: session?.user?.id || "unknown",
      authorName: session?.user?.name || "Anonymous",
      authorEmail: session?.user?.email || "N/A",
      likesCount: 0,
      isFeatured: false,
      status: "pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/recipes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(recipePayload),
      });

      // Parse the response body to get the message from the server
      const data = await res.json();

      if (res.ok) {
        toast.success("Recipe published successfully!");
        setFormData({
          name: "",
          category: "",
          cuisine: "",
          difficulty: "",
          prepTime: "",
          ingredients: "",
          instructions: "",
          url: "",
        });
      } else {
        // This will display the specific message: "Recipe limit reached!..."
        toast.error(data.message || "Failed to publish recipe.");
      }
    } catch (error) {
      toast.error("Server connection error.");
    }
  };

  const inputClass =
    "w-full p-3 mt-1 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1f2437] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all";
  const labelClass =
    "block text-sm font-medium text-gray-700 dark:text-gray-300";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0f121e] p-4 md:p-8">
      <ToastContainer position="top-right" theme="colored" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto bg-white dark:bg-[#161a29] rounded-3xl shadow-xl p-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Add New Recipe
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          Fill in the details below to share your creation.
        </p>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className={labelClass}>Recipe Image Link <span className="text-red-500">*</span></label>
            <input required type="url" value={formData.url} placeholder="https://example.com/image.jpg" 
              onChange={(e) => setFormData({ ...formData, url: e.target.value })} className={inputClass} />
          </div>

          <div className="md:col-span-2">
            <label className={labelClass}>Recipe Name <span className="text-red-500">*</span></label>
            <input required value={formData.name} placeholder="Enter recipe name" 
              onChange={(e) => setFormData({ ...formData, name: e.target.value })} className={inputClass} />
          </div>

          <div>
            <label className={labelClass}>Category <span className="text-red-500">*</span></label>
            <select required value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className={inputClass}>
              <option value="">Select Category</option>
              <option>Appetizer</option><option>Main Course</option><option>Dessert</option><option>Beverage</option>
            </select>
          </div>

          <div>
            <label className={labelClass}>Cuisine Type <span className="text-red-500">*</span></label>
            <select required value={formData.cuisine} onChange={(e) => setFormData({ ...formData, cuisine: e.target.value })} className={inputClass}>
              <option value="">Select Cuisine</option>
              <option>Italian</option><option>Mexican</option><option>Bengali</option><option>Indian</option><option>Chinese</option>
            </select>
          </div>

          <div>
            <label className={labelClass}>Difficulty Level <span className="text-red-500">*</span></label>
            <select required value={formData.difficulty} onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })} className={inputClass}>
              <option value="">Select Difficulty</option>
              <option>Easy</option><option>Medium</option><option>Hard</option>
            </select>
          </div>

          <div>
            <label className={labelClass}>Prep Time <span className="text-red-500">*</span></label>
            <input required value={formData.prepTime} placeholder="e.g., 30 mins" 
              onChange={(e) => setFormData({ ...formData, prepTime: e.target.value })} className={inputClass} />
          </div>

          <div className="md:col-span-2">
            <label className={labelClass}>Ingredients <span className="text-red-500">*</span></label>
            <textarea required rows="4" value={formData.ingredients} placeholder="List your ingredients here..." 
              onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })} className={inputClass}></textarea>
          </div>

          <div className="md:col-span-2">
            <label className={labelClass}>Instructions <span className="text-red-500">*</span></label>
            <textarea required rows="4" value={formData.instructions} placeholder="Step-by-step instructions..." 
              onChange={(e) => setFormData({ ...formData, instructions: e.target.value })} className={inputClass}></textarea>
          </div>

          <button type="submit" className="md:col-span-2 bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-purple-500/20">
            Publish Recipe
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default AddRecipePage;