import { Link } from "react-router";
import Button from "../components/Button";
import { useAuth } from "../context/AuthContext";

export default function HomePage() {
  const { isLoggedIn } = useAuth();

  return (
    <>
      <h1>JobChaser Start page</h1>
      <h2>Welcome {isLoggedIn ? "back!" : "guest!"}</h2>
      <Link to={"/jobs"} className="text-blue-500">
        <Button onClick={() => {}} text="View Jobs"></Button>
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
            <Button onClick={() => {}} text="Create new job"></Button>
          </Link>
        </>
      )}
    </>
  );
}
