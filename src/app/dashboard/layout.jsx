'use client';
import { useState } from 'react';
import { usePathname } from 'next/navigation'; 
import Navbar from "@/components/shared/Navbar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { IoMenu } from 'react-icons/io5';

const DashboardLayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const userRole = pathname.startsWith('/dashboard/admin') ? 'admin' : 'user';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0b101a] transition-colors duration-300">
      <Navbar />
      
      <div className="lg:hidden p-4 bg-white dark:bg-[#0b101a]">
        <button onClick={() => setIsOpen(!isOpen)} className="text-2xl dark:text-white">
          <IoMenu />
        </button>
      </div>

      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-64 min-h-screen">
          <DashboardSidebar role={userRole} closeDrawer={() => {}} />
        </div>

        {/* Mobile Drawer */}
        {isOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-black/50" onClick={() => setIsOpen(false)} />
            <div className="relative w-64 h-full bg-white dark:bg-[#161a29]">
              <DashboardSidebar role={userRole} closeDrawer={() => setIsOpen(false)} />
            </div>
          </div>
        )}

        <main className="grow p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;