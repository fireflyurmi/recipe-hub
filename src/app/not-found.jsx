import Link from "next/link";
import Image from "next/image";

const NotFoundPage = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
      <div className="relative w-64 h-64 mb-5">
        <Image
          src="/404-illustration.png"
          alt="404 Illustration"
          fill
          className="object-contain"
        />
      </div>

      {/* Error Message */}
      <h1 className="text-6xl font-extrabold text-primary mb-4">404</h1>
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
        Page Not Found
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md">
        Oops! The recipe or page you are looking for seems to have gone missing
        from our kitchen.
      </p>

      {/* Back Home Button */}
      <Link
        href="/"
        className="bg-primary text-white px-8 py-3 rounded-lg font-medium hover:bg-purple-700 transition-all duration-300 shadow-md"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
