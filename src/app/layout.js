import { Inter } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/shared/ThemeProvider"; 
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ 
  variable: "--font-inter", 
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "RecipeHub",
  description: "Share and discover amazing recipes",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          {/* 2. Add ToastContainer here so it is available globally */}
          <ToastContainer 
            position="top-right" 
            autoClose={3000} 
            hideProgressBar={false} 
            newestOnTop={true} 
            closeOnClick 
            rtl={false} 
            pauseOnFocusLoss 
            draggable 
            pauseOnHover 
            theme="colored"
          />
        </ThemeProvider>
      </body>
    </html>
  );
}