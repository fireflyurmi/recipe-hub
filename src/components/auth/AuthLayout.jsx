import React from 'react';
import Image from 'next/image';
import chefImage from '../assets/chef.png';

const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="flex w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden min-h-[600px]">
        {/* Left Side: Form */}
        <div className="w-full lg:w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-800">{title}</h2>
          <p className="text-gray-500 mt-2 mb-8">{subtitle}</p>
          {children}
        </div>
        
        {/* Right Side: Visual using Next/Image */}
        <div className="hidden lg:flex w-1/2 bg-orange-50 relative">
          <Image 
            src={chefImage} 
            alt="Professional Chef" 
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 0vw, 50vw"
            priority // Optimization for LCP
          />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;