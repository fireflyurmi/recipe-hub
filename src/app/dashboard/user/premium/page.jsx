"use client";

import { motion } from "framer-motion";
import { FaCheck } from "react-icons/fa";
import Image from "next/image";
import { useSearchParams } from "next/navigation"; 
import { Suspense } from "react"; 
import paymentImg from "@/assets/payment.png";

const PremiumContent = () => {
  const searchParams = useSearchParams();
  const recipeId = searchParams.get("recipeId"); 

  return (
    <div className="min-h-screen p-4 md:p-8 flex items-center justify-center bg-gray-50 dark:bg-[#0f121e]">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white dark:bg-[#161a29] rounded-3xl shadow-2xl p-8 dark:border-gray-800"
      >
        <h2 className="text-xl font-bold text-white mb-6 text-center bg-[#a476f5] rounded-full py-2">
          PRO Plan
        </h2>

        <div className="bg-purple-50 dark:bg-[#1f2437] rounded-2xl p-6 mb-6 flex items-start gap-4">
          <Image
            src={paymentImg}
            alt="Premium Card"
            width={80}
            height={120}
            className="rounded-lg shadow-md"
          />
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white">
              Premium Membership
            </h3>
            <ul className="text-sm text-gray-600 dark:text-gray-400 mt-2 space-y-1">
              <li className="flex items-center gap-2">
                <FaCheck className="text-purple-500" /> Unlimited recipe
                creation
              </li>
              <li className="flex items-center gap-2">
                <FaCheck className="text-purple-500" /> Premium badge
              </li>
              <li className="flex items-center gap-2">
                <FaCheck className="text-purple-500" /> Early access
              </li>
              <li className="flex items-center gap-2">
                <FaCheck className="text-purple-500" /> Priority support
              </li>
            </ul>
          </div>
        </div>

        <div className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          $9.99{" "}
          <span className="text-lg font-normal text-gray-500">/ month</span>
        </div>

        <form action="/api/checkout_sessions" method="POST">
          <input type="hidden" name="recipeId" value={recipeId || ""} />

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-purple-500/20"
          >
            Pay $9.99
          </button>
        </form>
        <p className="text-center text-xs text-gray-400 mt-4">
          Secure payment powered by Stripe
        </p>
      </motion.div>
    </div>
  );
};

export default function PremiumPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PremiumContent />
    </Suspense>
  );
}
