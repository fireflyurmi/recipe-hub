import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaRegHeart } from "react-icons/fa";
import { BsFire } from "react-icons/bs";

const PopularRecipes = () => {
  const recipes = [
    {
      id: 1,
      rank: "1",
      name: "Classic Pancakes",
      author: "Sarah Johnson",
      likes: "1.2K",
      image:
        "https://images.unsplash.com/photo-1595854341625-f33ee10dbf94?auto=format&fit=crop&q=80&w=400",
    },
    {
      id: 2,
      rank: "2",
      name: "Beef Steak",
      author: "John Smith",
      likes: "982",
      image:
        "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&q=80&w=400",
    },
    {
      id: 3,
      rank: "3",
      name: "Caesar Salad",
      author: "Mia Brown",
      likes: "876",
      image:
        "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&q=80&w=400",
    },
    {
      id: 4,
      rank: "4",
      name: "Grilled Salmon",
      author: "David Wilson",
      likes: "765",
      image:
        "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=400",
    },
    {
      id: 5,
      rank: "5",
      name: "Veggie Stir Fry",
      author: "Emma Davis",
      likes: "654",
      image:
        "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&q=80&w=400",
    },
  ];

  return (
    <section className="py-12 bg-white dark:bg-[#0b101a] transition-colors duration-300">
      <div className="page-container">
        <div className="flex items-center justify-between mb-8 px-2">
          <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2 text-gray-900 dark:text-white">
            <BsFire className="text-orange-400" size={40} />
            Popular Recipes
          </h2>
          <Link
            href="/browse"
            className="text-[12px] md:text-sm font-semibold text-primary bg-primary/10 px-3 py-1.5 rounded-lg hover:bg-primary hover:text-white transition-all duration-300 shrink-0"
          >
            View All
          </Link>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-white dark:bg-[#1e2030] rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700/50 group transition"
            >
              {/* Image & Rank Badge */}
              <div className="relative h-48 w-full mb-4 overflow-hidden rounded-xl">
                <Image
                  src={recipe.image}
                  alt={recipe.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-2 left-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-white w-8 h-8 flex items-center justify-center rounded-full font-bold text-sm shadow">
                  {recipe.rank}
                </div>
              </div>

              {/* Details */}
              <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1 truncate">
                {recipe.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                {recipe.author}
              </p>

              {/* Likes */}
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 gap-1">
                <FaRegHeart className="text-red-500" />{" "}
                <span>{recipe.likes}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularRecipes;
