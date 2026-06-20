import React from 'react';
import { FaSearch, FaClipboardList, FaUsers, FaInfinity } from 'react-icons/fa';

const WhyChooseUs = () => {
  const features = [
    { id: 1, title: "Diverse Recipes", desc: "Explore recipes from around the world", icon: FaSearch, color: "text-purple-500", bg: "bg-purple-500/10" },
    { id: 2, title: "Easy to Follow", desc: "Step-by-step instructions", icon: FaClipboardList, color: "text-blue-500", bg: "bg-blue-500/10" },
    { id: 3, title: "Community Driven", desc: "Share, like & connect with others", icon: FaUsers, color: "text-red-500", bg: "bg-red-500/10" },
    { id: 4, title: "100% Free", desc: "All recipes are free forever", icon: FaInfinity, color: "text-green-500", bg: "bg-green-500/10" },
  ];

  return (
    <section className="py-16 bg-white dark:bg-[#0b101a]">
      <div className="page-container">
        <div className="bg-[#ebebfa] dark:bg-[#161a29] p-12 rounded-3xl">
          <h2 className="text-2xl font-bold text-center mb-12">Why Choose RecipeHub?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.id} className="flex flex-col items-center text-center">
                  <div className={`p-4 rounded-full mb-4 ${feature.bg} ${feature.color}`}>
                    <Icon size={24} />
                  </div>
                  <h3 className="font-bold mb-1">{feature.title}</h3>
                  <p className="text-sm text-gray-500">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;