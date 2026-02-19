import { Link } from "react-router";
import Button from "../components/Button";

export default function HomePage() {
  return (
    <>
      <h1>JobChaser Start page</h1>
      <Link to={"/jobs"} className="text-blue-500">
        <Button onClick={() => {}} text="View Jobs"></Button>
      </Link>
    </>
  );
}
