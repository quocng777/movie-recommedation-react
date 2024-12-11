import React from "react";
import { Link } from "react-router-dom";

const InterruptsPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-gray-900 to-gray-800 text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Oops! Something went wrong.</h1>
        <p className="text-xl mb-6">
          We encountered an issue. But don't worry, you can go back to the
          homepage.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-lg rounded-md shadow-md transition duration-300"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default InterruptsPage;