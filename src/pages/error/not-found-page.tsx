import { Link } from "react-router-dom";
import NotFoundIllustration from "../../assets/not-found-page.png";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
      <div className="max-w-md">
        <h1 className="text-6xl font-bold text-blue-500">404</h1>
        <h2 className="mt-4 text-2xl font-semibold text-white">
          Oops! Page Not Found
        </h2>
        <p className="mt-2 text-white">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <img
          src={NotFoundIllustration}
          alt="404 Illustration"
          className="mt-6 w-full rounded-lg shadow-md"
        />
        <Link
          to="/"
          className="mt-6 inline-block px-6 py-3 text-white bg-blue-500 rounded-lg shadow hover:bg-blue-600 transition duration-300"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
