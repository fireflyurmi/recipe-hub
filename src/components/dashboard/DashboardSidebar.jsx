'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IoStatsChart, IoBook, IoAddCircle, IoHeart, IoBag, IoPerson, IoPeople, IoDocumentText, IoWallet, IoSettings, IoClose } from 'react-icons/io5';
import { FaCrown } from 'react-icons/fa';
import { BiSolidPurchaseTag } from "react-icons/bi";
const menuConfig = {
  user: [
    { name: 'Overview', path: '/dashboard/user', icon: IoStatsChart },
    { name: 'My Recipes', path: '/dashboard/user/my-recipes', icon: IoBook },
    { name: 'Add Recipe', path: '/dashboard/user/add-recipe', icon: IoAddCircle },
    { name: 'My Favorites', path: '/dashboard/user/my-favorites', icon: IoHeart },
    { name: 'Purchased Recipes', path: '/dashboard/user/purchased-recipes', icon: BiSolidPurchaseTag },
    { name: 'Premium', path: '/dashboard/user/premium', icon: FaCrown },
    { name: 'Profile', path: '/dashboard/user/profile', icon: IoPerson },
  ],
  admin: [
    { name: 'Overview', path: '/dashboard/admin', icon: IoStatsChart },
    { name: 'Manage Users', path: '/dashboard/admin/manage-users', icon: IoPeople },
    { name: 'Manage Recipes', path: '/dashboard/admin/manage-recipes', icon: IoBook },
    { name: 'Recipe Reports', path: '/dashboard/admin/recipe-reports', icon: IoDocumentText },
    { name: 'Transactions', path: '/dashboard/admin/transactions', icon: IoWallet },
    { name: 'Profile', path: '/dashboard/admin/profile', icon: IoPerson },
  ]
};

const DashboardSidebar = ({ closeDrawer, role = 'user' }) => {
  const pathname = usePathname();
  const items = menuConfig[role] || menuConfig.user;

  return (
    <aside className="w-64 h-full bg-white dark:bg-[#161a29] flex flex-col justify-between dark:border-gray-800">
      <div className="p-6 space-y-2">
        <div className="flex justify-end lg:hidden mb-4">
          <button onClick={closeDrawer} className="text-2xl text-gray-600 dark:text-gray-300">
            <IoClose />
          </button>
        </div>
        {items.map((item) => (
          <Link 
            key={item.name} 
            href={item.path}
            onClick={closeDrawer}
            className={`flex items-center gap-3 w-full p-3 rounded-lg transition-all ${
              pathname === item.path 
                ? 'bg-purple-600 text-white' 
                : 'text-gray-600 dark:text-gray-400 hover:bg-purple-100 dark:hover:bg-purple-900/20'
            }`}
          >
            <item.icon size={22} />
            {item.name}
          </Link>
        ))}
      </div>
      <div className="p-6 cursor-pointer" onClick={closeDrawer}>
        <div className="w-10 h-10 rounded-full bg-gray-800 text-white flex items-center justify-center font-bold">N</div>
      </div>
    </aside>
  );
};

export default DashboardSidebar;