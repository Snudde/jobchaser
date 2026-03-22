import { Link } from "react-router";
import Button from "../components/Button";
import { useAuthStore } from "../store/authStore";

export default function HomePage() {
  const isLoggedIn = useAuthStore((state) => state.isAuthenticated);

  return (
    <>
      <h1 className="mb-5">JobChaser</h1>
      <h2 className="mb-5">Welcome {isLoggedIn ? "back!" : "guest!"}</h2>
      <div className="flex gap-3">
      <Link to={"/jobs"} className="text-blue-500">
        <Button onClick={() => {}} text="View Available Jobs"></Button>
      </Link>
      {isLoggedIn && (
        <>
          <Link to={"/my-jobs"} className="text-blue-500">
            <Button onClick={() => {}} text="My Jobs"></Button>
          </Link>
          <Link to={"/my-listings"} className="text-blue-500">
            <Button onClick={() => {}} text="My Listings"></Button>
          </Link>
          <Link to={"/jobs/new"} className="text-blue-500">
            <Button onClick={() => {}} text="Submit New Job"></Button>
          </Link>
        </>
      )}
      </div>
    </>
  );
}
