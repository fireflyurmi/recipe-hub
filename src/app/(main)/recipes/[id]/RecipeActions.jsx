"use client";
import { FaHeart, FaFlag, FaStar } from "react-icons/fa";

export default function RecipeActions({ recipeId }) {
  return (
    <div className="mt-10 flex flex-wrap gap-4 border-t pt-6 border-gray-200 dark:border-gray-700">
      <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200">
        <FaHeart className="text-red-500" /> Like
      </button>
      <button className="flex items-center gap-2 px-6 py-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 rounded-lg hover:opacity-80">
         <FaStar /> Favorite
      </button>
      <button className="flex items-center gap-2 px-6 py-2 bg-gray-200 dark:bg-gray-800 rounded-lg hover:opacity-80">
        <FaFlag /> Report
      </button>
    </div>
  );
}
