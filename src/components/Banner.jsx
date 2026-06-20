import React from "react";
import Link from "next/link";
import Image from "next/image";
import bannerImage from "@/assets/banner.png";
import { FaUtensils, FaUsers, FaStar, FaThLarge } from "react-icons/fa";

const Banner = () => {
  const stats = [
    {
      label: "Recipes",
      count: "10K+",
      icon: FaUtensils,
      color: "bg-orange-100 text-orange-600",
    },
    {
      label: "Happy Users",
      count: "5K+",
      icon: FaUsers,
      color: "bg-pink-100 text-pink-600",
    },
    {
      label: "Reviews",
      count: "2K+",
      icon: FaStar,
      color: "bg-violet-100 text-violet-600",
    },
    {
      label: "Categories",
      count: "50+",
      icon: FaThLarge,
      color: "bg-amber-100 text-amber-600",
    },
  ];

  return (
    <section className="py-16">
      <div className="page-container">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12 mb-16">
          <div className="md:w-1/2 space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
              Find, Share & Create{" "}
              <span className="text-primary">Amazing Recipes</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-lg">
              Join our community of food lovers. Discover delicious recipes,
              share your culinary creations and inspire others every day.
            </p>
            <div className="flex gap-4 pt-4">
              <Link
                href="/browse"
                className="bg-primary text-white px-8 py-3 rounded-lg font-medium hover:bg-purple-700 transition"
              >
                Browse Recipes
              </Link>
            </div>
          </div>

          {/* Banner Image */}
          <div className="md:w-1/2 flex justify-center">
            <Image
              src={bannerImage}
              alt="Delicious Pasta"
              width={500}
              height={500}
              className="w-full max-w-md object-contain"
              priority
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white dark:bg-[#1e2030] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700/50 flex flex-col items-center text-center transition-colors duration-300"
              >
                <div className={`p-3 rounded-full mb-4 ${stat.color}`}>
                  <Icon size={24} />
                </div>
                <span className="text-3xl font-bold block text-gray-900 dark:text-white">
                  {stat.count}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {stat.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Banner;
