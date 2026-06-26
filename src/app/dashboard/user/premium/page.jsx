"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheckCircle, FaCheck } from "react-icons/fa";
import Image from "next/image";
import paymentImg from "@/assets/payment.png";

const PremiumPage = () => {
  const [showSuccess, setShowSuccess] = useState(false);

  return (
    <div className="min-h-screen p-4 md:p-8 flex items-center justify-center bg-gray-50 dark:bg-[#0f121e]">
      {/* Checkout Card */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white dark:bg-[#161a29] rounded-3xl shadow-2xl p-8  dark:border-gray-800"
      >
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">PAYMENT CHECKOUT (STRIPE)</h2>
        
        <div className="bg-purple-50 dark:bg-[#1f2437] rounded-2xl p-6 mb-6 flex items-start gap-4">
          <Image src={paymentImg} alt="Premium Card" width={80} height={120} className="rounded-lg shadow-md" />
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white">Premium Membership</h3>
            <ul className="text-sm text-gray-600 dark:text-gray-400 mt-2 space-y-1">
              <li className="flex items-center gap-2"><FaCheck className="text-purple-500" /> Unlimited recipe creation</li>
              <li className="flex items-center gap-2"><FaCheck className="text-purple-500" /> Premium badge</li>
              <li className="flex items-center gap-2"><FaCheck className="text-purple-500" /> Early access to new features</li>
              <li className="flex items-center gap-2"><FaCheck className="text-purple-500" /> Priority support</li>
            </ul>
          </div>
        </div>

        <div className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          $9.99 <span className="text-lg font-normal text-gray-500">/ month</span>
        </div>

        <button 
          onClick={() => setShowSuccess(true)}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-purple-500/20"
        >
          Pay $9.99
        </button>
        <p className="text-center text-xs text-gray-400 mt-4">Secure payment powered by Stripe</p>
      </motion.div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          >
            <motion.div 
              initial={{ y: 50 }} animate={{ y: 0 }}
              className="bg-white dark:bg-[#161a29] p-8 rounded-3xl max-w-sm w-full text-center shadow-2xl"
            >
              <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Payment Successful! 🎉</h2>
              <p className="text-gray-500 dark:text-gray-400 mt-2">Welcome to Premium. You now have access to all premium features.</p>
              
              <div className="bg-gray-50 dark:bg-[#1f2437] p-4 rounded-xl my-6 text-left text-sm">
                <p className="text-gray-500">Transaction ID</p>
                <div className="flex justify-between font-mono text-gray-900 dark:text-white mt-1">
                  <span>pi_9A88N8ET9C8N9</span>
                  <span>$9.99</span>
                </div>
              </div>

              <button 
                onClick={() => setShowSuccess(false)}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-xl transition-all"
              >
                Go to Dashboard
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PremiumPage;