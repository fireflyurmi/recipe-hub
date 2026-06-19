import { Inter } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/shared/ThemeProvider"; 

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
        </ThemeProvider>
      </body>
    </html>
  );
}