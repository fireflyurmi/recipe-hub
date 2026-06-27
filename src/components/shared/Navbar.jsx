"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { VscSignOut, VscSignIn } from "react-icons/vsc";
import { SiGnuprivacyguard } from "react-icons/si";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Session status
  const { data: session } = authClient.useSession();
  const isActive = (path) => pathname === path;

  const handleLogout = async () => {
    await authClient.signOut();
    toast.success("Logged out successfully");
    router.push("/login");
    setIsMobileMenuOpen(false);
  };

  // Dynamic dashboard path logic
  const getDashboardPath = () => {
    if (!session?.user) return "/login";
    return session.user.role === "admin" ? "/dashboard/admin" : "/dashboard/user";
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Browse Recipes", path: "/browse" },
    { name: "Dashboard", path: getDashboardPath() },
  ];

  return (
    <nav className="bg-bg-light dark:bg-bg-dark shadow-md border-b border-gray-100 dark:border-gray-800 relative z-50">
      <div className="page-container h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-1">
          <Image src="/logo.png" alt="Logo" width={40} height={40} />
          <span className="text-2xl font-bold text-primary">Recipe<span className="text-red-700">Hub</span></span>
        </Link>

        {/* Desktop Nav */}
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

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          {session ? (
            <div className="flex items-center gap-4">
              <Image src={session.user.image || "/default-avatar.png"} alt="User" width={35} height={35} className="rounded-full border border-primary" />
              <button onClick={handleLogout} className="flex items-center gap-2 text-red-600 hover:text-red-700 text-sm font-medium transition">
                <VscSignOut size={18} /> Logout
              </button>
            </div>
          ) : (
            <>
              <Link href="/login" className="flex items-center gap-2 text-primary border border-primary px-5 py-2 rounded text-sm font-medium hover:bg-primary hover:text-white transition">
                <VscSignIn size={18} /> Login
              </Link>
              <Link href="/register" className="flex items-center gap-2 bg-primary text-white px-5 py-2 rounded text-sm font-medium hover:bg-transparent hover:text-primary border border-primary transition">
                <SiGnuprivacyguard size={18} /> Register
              </Link>
            </>
          )}
        </div>

        <button className="md:hidden p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-bg-light dark:bg-bg-dark border-b p-6 flex flex-col gap-6">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.path} onClick={() => setIsMobileMenuOpen(false)} className="text-gray-600 dark:text-gray-300 font-medium">
              {link.name}
            </Link>
          ))}
          {session ? (
            <div className="flex items-center gap-3">
              <button onClick={handleLogout} className="flex items-center gap-2 text-red-600"><VscSignOut /> Logout</button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="flex justify-center items-center gap-2 text-primary border p-2 rounded"><VscSignIn /> Login</Link>
              <Link href="/register" onClick={() => setIsMobileMenuOpen(false)} className="flex justify-center items-center gap-2 bg-primary text-white p-2 rounded"><SiGnuprivacyguard /> Register</Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;