'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { authClient } from '@/lib/auth-client';
import chefImage from '../../../assets/chef-2.png';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import { FcGoogle } from 'react-icons/fc';

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', image: '', password: '' });
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters.");
    if (!/[A-Z]/.test(formData.password)) return toast.error("Password must contain an uppercase letter.");
    if (!/[a-z]/.test(formData.password)) return toast.error("Password must contain a lowercase letter.");

    const { error } = await authClient.signUp.email({
      email: formData.email,
      password: formData.password,
      name: formData.name,
      image: formData.image,
      
      additionalFields: {
        role: "user",
        isPremium: false,
        isBlocked: false,
      },
    });

    if (error) {
      toast.error(error.message || "Registration failed");
    } else {
      toast.success("Account created successfully!");
      router.push('/login');
    }
  };

  const handleGoogleSignup = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (error) {
      toast.error("Google Sign-Up failed. Please ensure the backend is configured.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#0b101a] p-4 py-12">
      <div className="flex flex-col lg:flex-row w-full max-w-5xl bg-purple-50 dark:bg-[#161a29] rounded-3xl shadow-2xl overflow-hidden min-h-150">
        <div className="w-full lg:w-1/2 relative bg-purple-50 dark:bg-[#161a29] h-64 lg:h-auto">
          <Image src={chefImage} alt="Chef" fill className="object-cover" priority />
        </div>
        
        <div className="w-full lg:w-1/2 p-8 md:p-16 flex flex-col justify-center">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white">Create your account</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2 mb-8">Join our community of food lovers</p>
          
          <form onSubmit={handleRegister} className="space-y-4">
            <input 
              type="text" 
              placeholder="Full Name" 
              onChange={(e) => setFormData({...formData, name: e.target.value})} 
              className="w-full p-3 bg-purple-50 dark:bg-[#0b101a] border dark:border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-white" 
              required 
            />
            <input 
              type="email" 
              placeholder="Email Address" 
              onChange={(e) => setFormData({...formData, email: e.target.value})} 
              className="w-full p-3 bg-purple-50 dark:bg-[#0b101a] border dark:border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-white" 
              required 
            />
            <input 
              type="url" 
              placeholder="Image URL" 
              onChange={(e) => setFormData({...formData, image: e.target.value})} 
              className="w-full p-3 bg-purple-50 dark:bg-[#0b101a] border dark:border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-white" 
            />
            
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Password" 
                onChange={(e) => setFormData({...formData, password: e.target.value})} 
                className="w-full p-3 bg-purple-50 dark:bg-[#0b101a] border dark:border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-white" 
                required 
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3.5 text-gray-400">
                {showPassword ? <IoEye size={20} /> : <IoEyeOff size={20} />}
              </button>
            </div>
            
            <div className="text-xs text-gray-500 dark:text-gray-400 px-1 space-y-1">
              <p className="font-semibold">Password must include:</p>
              <ul className="list-disc pl-5 space-y-0.5">
                <li>Minimum 6 characters</li>
                <li>At least one uppercase letter</li>
                <li>At least one lowercase letter</li>
              </ul>
            </div>

            <button type="submit" className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 hover:scale-[1.02] transition-all duration-300 shadow-lg">
              Create Account
            </button>
            <div className="text-center text-gray-400 text-sm py-2">OR</div>
            <button 
              type="button" 
              onClick={handleGoogleSignup}
              className="w-full flex items-center justify-center gap-3 border dark:border-gray-700 py-3 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:scale-[1.02] transition-all duration-300"
            >
              <FcGoogle size={22} /> Sign up with Google
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account? <a href="/login" className="text-purple-600 font-bold hover:underline">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;