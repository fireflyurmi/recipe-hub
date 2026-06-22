'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';
import { authClient } from '@/lib/auth-client';
import chefImage from '../../../assets/chef.png';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import { FcGoogle } from 'react-icons/fc';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
        fetchOptions: {
          onResponse: () => setLoading(false),
        },
      });

      if (error) {
        toast.error(error.message || "Invalid email or password. Please try again.");
      } else {
        toast.success("Welcome back! You have logged in successfully.");
        router.push(callbackUrl);
      }
    } catch (err) {
      toast.error("An unexpected error occurred. Please try again later.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#0b101a] p-4 py-12">
      <div className="flex flex-col lg:flex-row w-full max-w-5xl bg-purple-50 dark:bg-[#161a29] rounded-3xl shadow-2xl overflow-hidden min-h-150">
        
        <div className="w-full lg:w-1/2 relative bg-purple-50 dark:bg-[#161a29] h-64 lg:h-auto">
          <Image src={chefImage} alt="Chef" fill className="object-contain" priority />
        </div>

        <div className="w-full lg:w-1/2 p-8 md:p-16 flex flex-col justify-center">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white">Welcome Back</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2 mb-8">Sign in to your RecipeHub account</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="email" 
              placeholder="Email Address" 
              onChange={(e) => setEmail(e.target.value)} 
              className="w-full p-3 bg-purple-50 dark:bg-[#0b101a] border dark:border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-white" 
              required 
            />
            
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Password" 
                onChange={(e) => setPassword(e.target.value)} 
                className="w-full p-3 bg-purple-50 dark:bg-[#0b101a] border dark:border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-white" 
                required 
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)} 
                className="absolute right-3 top-3.5 text-gray-400"
              >
                {showPassword ? <IoEye size={20} /> : <IoEyeOff size={20} />}
              </button>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 hover:scale-[1.02] transition-all duration-300 shadow-lg disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
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