import React from 'react';
import Image from 'next/image';
import { FaHeart, FaStar } from 'react-icons/fa';
import burgerImage from '../assets/burger.png'; 

const CommunityAndNewsletter = () => {
  const testimonials = [
    { 
      name: "Emily Johnson", 
      text: "“Who Emily Johnson: Explore recipes from around the world to express feel and get the best cuisines.”" 
    },
    { 
      name: "Michael Brown", 
      text: "“I love my favorite pasta box. Share favorites and discuss others with your family.”" 
    },
    { 
      name: "Sophia Davis", 
      text: "“Love sharing my recipes and love doing it over and over and over times.”" 
    },
  ];

  return (
    <section className="py-16 bg-white dark:bg-[#0b101a] transition-colors">
      <div className="page-container">
        
        {/* --- Testimonial Section --- */}
        <div className="mb-20">
          <div className="flex items-center gap-2 mb-10">
            <FaHeart className="text-red-500" size={30} />
            <h2 className="text-2xl font-bold dark:text-white">What Our Community Says</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="p-6 border border-gray-100 dark:border-gray-800 rounded-3xl dark:bg-[#161a29]">
                <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm leading-relaxed">{t.text}</p>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center text-purple-600 dark:text-purple-300 font-bold">
                    {t.name.charAt(0)}
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-sm dark:text-white">{t.name}</h4>
                    <div className="flex text-yellow-400 text-xs">
                      <FaStar/><FaStar/><FaStar/><FaStar/><FaStar/>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Slider Dots */}
          <div className="flex justify-center gap-2 mt-8">
            <div className="w-2 h-2 rounded-full bg-purple-600" />
            <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-700" />
            <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-700" />
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="relative bg-[#6944f0] dark:bg-[#6944f0] rounded-3xl p-8 md:p-12 overflow-hidden">
          <div className="max-w-xl relative z-10">
            <h2 className="text-3xl font-bold mb-4 text-white">Get Delicious Recipes <br></br> In Your Inbox</h2>
            <p className="text-gray-400 mb-8 max-w-sm">Explore our newsletter for fresh recipes, exciting tips, and delicious content.</p>
            
            <div className="flex bg-white p-2 rounded-2xl max-w-sm shadow-sm border border-gray-100 dark:border-none">
              <input type="email" placeholder="Enter your email" className="w-full px-4 outline-none bg-transparent" />
              <button className="bg-[#5a43d0] text-white px-6 py-3 rounded-xl font-medium">Subscribe</button>
            </div>
          </div>
          
          {/* Main Food Image */}
          <div className="absolute right-0 top-0 h-full w-75 hidden md:flex items-center justify-center">
            <Image src={burgerImage} alt="Food" width={500} height={500} className="object-contain" />
          </div>
        </div>

      </div>
    </section>
  );
};

export default CommunityAndNewsletter;