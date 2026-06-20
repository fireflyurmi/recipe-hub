"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isActive = (path) => pathname === path;
  
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Browse Recipes", path: "/browse" },
    { name: "Dashboard", path: "/dashboard" },
  ];

  return (
    <nav className="bg-bg-light dark:bg-bg-dark shadow-md border-b border-gray-100 dark:border-gray-800 relative z-50">
      <div className="page-container h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1">
          <Image src="/logo.png" alt="Logo" width={40} height={40} />
          <span className="text-2xl font-bold text-primary">
            Recipe<span className="text-red-700">Hub</span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className={`text-sm font-medium transition-colors ${
                isActive(link.path)
                  ? "text-primary border-b-2 border-primary pb-1"
                  : "text-gray-600 dark:text-gray-300 hover:text-primary"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop Auth + Toggle */}
        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          <Link
            href="/login"
            className="text-primary border border-primary px-5 py-2 rounded text-sm font-medium hover:bg-primary hover:text-white transition"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="bg-primary text-white border border-transparent px-5 py-2 rounded text-sm font-medium hover:bg-transparent hover:text-primary hover:border-primary transition"
          >
            Register
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="md:hidden p-2 text-gray-600 dark:text-gray-300"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-bg-light dark:bg-bg-dark border-b border-gray-100 dark:border-gray-800 p-6 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-lg font-medium text-gray-600 dark:text-gray-300"
            >
              Home
            </Link>
            <ThemeToggle />
          </div>

          <div className="flex flex-col gap-4">
            {navLinks.slice(1).map((link) => (
              <Link
                key={link.name}
                href={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-medium text-gray-600 dark:text-gray-300"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <Link
              href="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full text-center text-primary border border-primary px-5 py-2 rounded text-sm font-medium hover:bg-primary hover:text-white transition"
            >
              Login
            </Link>
            <Link
              href="/register"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full text-center bg-primary text-white border border-transparent px-5 py-2 rounded text-sm font-medium hover:bg-transparent hover:text-primary hover:border-primary transition"
            >
              Register
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;