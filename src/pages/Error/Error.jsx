import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-800 text-white px-4 overflow-hidden">
      
      <div className="absolute top-[-50px] left-[-50px] w-72 h-72 bg-white/5 rounded-full animate-pulse"></div>
      <div className="absolute bottom-[-80px] right-[-60px] w-96 h-96 bg-white/5 rounded-full animate-pulse"></div>
      
      <h1 className="text-[8rem] font-extrabold leading-none tracking-tight z-10">404</h1>
      <p className="text-xl md:text-2xl font-light mb-6 text-gray-300 z-10">
        Oops! The page you’re looking for doesn’t exist.
      </p>
      <Link
        to="/"
        className="mt-4 px-6 py-3 border border-white text-white font-medium rounded-full hover:bg-white hover:text-black transition duration-300 z-10"
      >
        Go Home
      </Link>

      <div className="absolute bottom-6 text-gray-500 text-sm z-10">
        © {new Date().getFullYear()} — All rights reserved
      </div>
    </div>
  );
};

export default ErrorPage;
