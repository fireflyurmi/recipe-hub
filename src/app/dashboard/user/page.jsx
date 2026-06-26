"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useSession } from "@/lib/auth-client"; 
import badgeImage from "@/assets/badge.png";
import { GiImperialCrown } from "react-icons/gi";

const StatsCard = ({ title, value, color }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="bg-white dark:bg-[#161a29] p-6 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-none hover:shadow-xl transition-all duration-300"
  >
    <p className="text-gray-500 dark:text-gray-400 text-sm">{title}</p>
    <h3 className={`text-3xl font-bold ${color}`}>{value}</h3>
  </motion.div>
);

const UserDashboardOverviewPage = () => {
  const { data: session } = useSession();
  const userName = session?.user?.name || "Guest";
  const isPremium = session?.user?.isPremium === true;

  return (
    <div className="space-y-8">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
        Welcome back, {userName}! 👋
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatsCard title="Total Recipes" value="12" color="text-purple-600" />
        <StatsCard title="Total Favorites" value="25" color="text-red-500" />
        <StatsCard title="Likes Received" value="320" color="text-purple-600" />
      </div>

      {/* Premium Membership Section */}
      <div className="bg-linear-to-r from-purple-600 to-indigo-600 p-6 md:p-8 rounded-3xl text-white flex flex-col md:flex-row justify-between items-center gap-4 shadow-xl">
        <div className="text-center md:text-left">
          <h2 className="text-4xl font-bold mb-3 flex items-center justify-center md:justify-start gap-3">
            {isPremium && (
              <motion.div
                style={{ transformOrigin: "top center", display: "inline-block" }}
                animate={{ rotate: [10, -10] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
              >
                <GiImperialCrown className="text-yellow-400" size={40} />
              </motion.div>
            )}
            {isPremium ? "You are a Premium Member" : "Please Subscribe to be a Premium Member"}
          </h2>
          <p className="opacity-90 text-sm md:text-base">
            Enjoy unlimited recipes and exclusive features.
          </p>
        </div>

        {/* Image */}
        <motion.div
          animate={{ scale: [1, 1.2, 0.8, 1], rotate: [0, 10, -10, 0], opacity: [1, 0.7, 0.9, 1] }}
          transition={{ duration: 8, ease: "easeInOut", repeat: Infinity, repeatType: "loop", repeatDelay: 2 }}
        >
          <Image
            src={badgeImage}
            alt="Premium Badge"
            width={400}
            height={400}
            className="shrink-0"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default UserDashboardOverviewPage;