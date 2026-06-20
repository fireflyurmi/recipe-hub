import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaFacebook, FaInstagram, FaTwitter, FaPinterest } from 'react-icons/fa';

const Footer = () => {
  const footerSections = [
    { title: "Quick Links", links: ["Home", "Browse Recipes", "Categories", "About Us", "Contact"] },
    { title: "Categories", links: ["Breakfast", "Lunch", "Dinner", "Dessert", "Vegan", "Gluten Free"] },
    { title: "Support", links: ["Help Center", "Privacy Policy", "Terms of Service", "Community Guidelines"] },
  ];

  return (
    <footer className="bg-bg-light dark:bg-bg-dark border-t border-gray-200 dark:border-gray-800 transition-colors duration-300 py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Logo */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image src="/logo.png" alt="RecipeHub Logo" width={40} height={40} />
              <span className="text-2xl font-bold text-primary">
                Recipe<span className="text-red-700">Hub</span>
              </span>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-xs">
              Your ultimate destination for discovering, sharing, and creating delicious recipes from around the world.
            </p>
            <div className="flex gap-4 text-primary">
              <FaFacebook size={24} className="cursor-pointer hover:opacity-80" />
              <FaInstagram size={24} className="cursor-pointer hover:opacity-80" />
              <FaTwitter size={24} className="cursor-pointer hover:opacity-80" />
              <FaPinterest size={24} className="cursor-pointer hover:opacity-80" />
            </div>
          </div>

          {/* Links Columns */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="font-bold text-gray-900 dark:text-white mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary transition">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 dark:border-gray-800 mt-12 pt-6 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} RecipeHub. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;