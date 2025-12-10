import Lottie from "lottie-react";
import forbiddenAnimation from "../../assets/forbidden.json";
import { Link } from "react-router";

const Forbidden = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4">
      
      {/* Lottie Animation */}
      <Lottie
        animationData={forbiddenAnimation}
        loop={false}
        autoplay={true}
        className="w-52 h-52"
      />

      {/* Heading */}
      <h1 className="text-3xl font-bold text-red-500 mt-4">
        You Are Forbidden to Access This Page
      </h1>

      {/* Description */}
      <p className="text-lg text-gray-600 mt-2 max-w-md">
        Please contact the administrator if you believe this is an error.
      </p>

      {/* Buttons */}
      <div className="mt-5 flex space-x-3">
        <Link to="/" className="btn btn-primary text-black">
          Go to Home
        </Link>

        <Link to="/dashboard" className="btn btn-secondary">
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default Forbidden;
