"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";

export default function PurchasedRecipesPage() {
  const { data: session } = useSession();
  const [purchased, setPurchased] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user?.email) {
      fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/payments/${session.user.email}`,
      )
        .then((res) => res.json())
        .then((data) => {
          setPurchased(Array.isArray(data) ? data : []);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Failed to fetch:", err);
          setPurchased([]);
          setLoading(false);
        });
    }
  }, [session]);

  if (loading)
    return (
      <div className="p-8 text-center dark:text-white">
        Loading your recipes...
      </div>
    );

  return (
    <div className="min-h-screen p-4 md:p-8 max-w-6xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
        My Purchased Recipes
      </h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-[#161a29] rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 dark:bg-[#1f2437] text-gray-500 dark:text-gray-400 text-sm">
              <tr>
                <th className="px-4 py-4 md:px-6 font-medium">
                  Transaction ID
                </th>
                <th className="px-4 py-4 md:px-6 font-medium">Price</th>
                <th className="px-4 py-4 md:px-6 font-medium">Date</th>
                <th className="px-4 py-4 md:px-6 font-medium text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {purchased.map((item) => (
                <tr
                  key={item._id}
                  className="text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-[#1f2437] text-sm md:text-base"
                >
                  {/* Truncated ID for mobile, full for desktop */}
                  <td className="px-4 py-4 md:px-6 font-mono text-xs md:text-sm text-gray-600 dark:text-gray-300 truncate max-w-30 md:max-w-none">
                    <span className="md:hidden">
                      {item.transactionId?.slice(-8) || "N/A"}
                    </span>
                    <span className="hidden md:inline">
                      {item.transactionId || "N/A"}
                    </span>
                  </td>
                  <td className="px-4 py-4 md:px-6 font-semibold">
                    ${item.amount}
                  </td>
                  <td className="px-4 py-4 md:px-6 text-gray-500 dark:text-gray-400 whitespace-nowrap">
                    {item.paidAt
                      ? new Date(item.paidAt).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="px-4 py-4 md:px-6 text-center">
                    <Link
                      href={`/recipes/${item.recipeId}`}
                      className="inline-block px-3 py-1.5 md:px-5 md:py-2 border border-purple-600 text-purple-600 dark:text-purple-400 dark:border-purple-400 rounded-lg hover:bg-purple-600 hover:text-white transition-all text-xs md:text-sm font-medium"
                    >
                      Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {purchased.length === 0 && (
            <div className="p-10 text-center text-gray-500">
              No purchased recipes found.
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
