"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function BrowseRecipesPage() {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Appetizer", "Main Course", "Dessert", "Beverage"];

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setIsLoading(true);
        const url = selectedCategory === "All"
          ? `${process.env.NEXT_PUBLIC_SERVER_URI}/all-recipes`
          : `${process.env.NEXT_PUBLIC_SERVER_URI}/all-recipes?category=${selectedCategory}`;
        const res = await fetch(url);
        const data = await res.json();
        setRecipes(data);
      } catch (error) { console.error(error); } finally { setIsLoading(false); }
    };
    fetchRecipes();
  }, [selectedCategory]);

  return (
    <div className="min-h-screen p-8 bg-gray-50 dark:bg-[#0f121e]">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white text-center">All Recipes</h1>
      
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {categories.map((cat) => (
          <button key={cat} onClick={() => setSelectedCategory(cat)} 
            className={`px-4 py-2 rounded-full transition-all duration-300 ease-in-out border border-transparent ${
              selectedCategory === cat 
                ? "bg-purple-600 text-white shadow-lg shadow-purple-500/30 scale-105" 
                : "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700 hover:border-purple-500/50"
            }`}>
            {cat}
          </button>
        ))}
      </div>

      {isLoading ? <LoadingSpinner /> : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {recipes.map((recipe) => (
            <div key={recipe._id} className="bg-white dark:bg-[#161a29] p-4 rounded-xl shadow-lg border border-transparent hover:border-purple-500/50 transition-all">
              <div className="relative w-full h-48 overflow-hidden rounded-lg">
                <Image src={recipe.recipeImage} alt={recipe.recipeName} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="flex justify-between items-center mt-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white truncate">{recipe.recipeName}</h2>
                <span className="text-purple-600 font-bold bg-purple-100 dark:bg-purple-900/30 px-2 py-1 rounded-lg text-sm">
                  ${recipe.price || "0.00"}
                </span>
              </div>
              <Link href={`/recipes/${recipe._id}`}>
                <button className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded-lg transition-all">
                  View Details
                </button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}