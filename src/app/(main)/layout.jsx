import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300 bg-white dark:bg-[#111827]">
      <Navbar />
      <main className="grow container mx-auto px-4 md:px-8 py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;