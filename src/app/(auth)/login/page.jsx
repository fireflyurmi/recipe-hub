'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import chefImage from '../../../assets/chef.png';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import { FcGoogle } from 'react-icons/fc';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#0b101a] p-4 py-12">
      <div className="flex flex-col lg:flex-row w-full max-w-5xl bg-purple-50 dark:bg-[#161a29] rounded-3xl shadow-2xl overflow-hidden min-h-150">
        
        {/* Image Side */}
        <div className="w-full lg:w-1/2 relative bg-purple-50 dark:bg-[#161a29] h-64 lg:h-auto">
          <Image 
            src={chefImage} 
            alt="Chef" 
            fill 
            className="object-contain" 
            priority 
          />
        </div>

        {/* Form Side */}
        <div className="w-full lg:w-1/2 p-8 md:p-16 flex flex-col justify-center">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white">Welcome Back</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2 mb-8">Sign in to your RecipeHub account</p>
          
          <form className="space-y-4">
            <input 
              type="email" 
              placeholder="Email Address" 
              className="w-full p-3 bg-purple-50 dark:bg-[#0b101a] border dark:border-gray-700 rounded-lg outline-none transition-all duration-300 focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-white" 
              required 
            />
            
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Password" 
                className="w-full p-3 bg-purple-50 dark:bg-[#0b101a] border dark:border-gray-700 rounded-lg outline-none transition-all duration-300 focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-white" 
                required 
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3.5 text-gray-400">
                {showPassword ? <IoEyeOff size={20} /> : <IoEye size={20} />}
              </button>
            </div>

            <button className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 hover:scale-[1.02] transition-all duration-300 shadow-lg">
              Login
            </button>
            
            <div className="text-center text-gray-400 text-sm py-2">OR</div>
            
            <button type="button" className="w-full flex items-center justify-center gap-3 border dark:border-gray-700 py-3 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:scale-[1.02] transition-all duration-300">
              <FcGoogle size={22} /> Continue with Google
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            Don&apos;t have an account? <a href="/register" className="text-purple-600 font-bold hover:underline">Register</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;