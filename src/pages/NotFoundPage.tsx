import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20">
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <p className="text-gray-400">The page you are looking for does not exist.</p>
      <Link
        to="/"
        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      >
        Back to the homepage
      </Link>
    </div>
  );
}
