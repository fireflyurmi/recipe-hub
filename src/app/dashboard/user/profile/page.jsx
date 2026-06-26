"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useSession } from "@/lib/auth-client"; 
import Image from "next/image";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserProfilePage = () => {
  const { data: session } = useSession();
  
  const [formData, setFormData] = useState({
    name: session?.user?.name || "",
    image: session?.user?.image || "",
  });

  const handleUpdate = (e) => {
    e.preventDefault();
    toast.success("Profile updated successfully!");
  };

  const inputClass = "w-full p-3 mt-1 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1f2437] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0f121e] p-4 md:p-8">
      <ToastContainer position="top-right" theme="colored" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto bg-white dark:bg-[#161a29] rounded-3xl shadow-xl p-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Profile Settings</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">Manage your profile information</p>

        <form onSubmit={handleUpdate} className="flex flex-col md:flex-row gap-8">
          {/* Left Side */}
          <div className="flex flex-col items-center gap-4 min-w-50">
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-purple-500 shadow-lg">
              <Image 
                src={session?.user?.image || "/default-avatar.png"} 
                alt="Profile" 
                fill 
                className="object-cover" 
              />
            </div>
            <p className="text-black dark:text-gray-300 font-light text-center break-all">
              {session?.user?.email || "user@example.com"}
            </p>
          </div>

          {/* Right Side */}
          <div className="flex-1 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
              <input 
                className={inputClass}
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Image URL</label>
              <input 
                className={inputClass}
                value={formData.image}
                onChange={(e) => setFormData({...formData, image: e.target.value})}
              />
            </div>

            <button 
              type="submit" 
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-purple-500/20"
            >
              Update Profile
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default UserProfilePage;