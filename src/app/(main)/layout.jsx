import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300 bg-bg-light dark:bg-bg-dark">
      <Navbar />
      <main className="grow w-full page-container py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;