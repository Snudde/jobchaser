import { Binoculars } from "lucide-react";
import { Link } from "react-router";
import Button from "./Button";
import { ThemeToggle } from './ThemeToggle';

interface HeaderProps {
  name: string;
  tagline: string;
}

export default function Header({ name, tagline }: HeaderProps) {
  return (
    <header className="header w-full flex justify-between mb-5 bg-blue-950 light:bg-amber-500 p-5 items-center">
      <div className="flex flex-col items-center">
        <Link to={"/"}>
          <h1 className="flex items-center">
            <Binoculars className="mr-2 inline-block size-15" />
            {name}
          </h1>
        </Link>
        <p className="tagline">{tagline}</p>
      </div>
      <nav className="flex items-center">
        <ul className="flex gap-4">
          <li>
            <Link to={"/jobs"} className="text-blue-500">
              <Button onClick={() => {}} text="Jobs" />
            </Link>
          </li>
          <li>
            <Link to={"/signup"} className="text-blue-500">
              <Button onClick={() => {}} text="Sign Up" />
            </Link>
          </li>
          <li>
            <Link to={"/signin"} className="text-blue-500">
              <Button onClick={() => {}} text="Sign In" />
            </Link>
          </li>
          <li>
            <ThemeToggle />
          </li>
        </ul>
      </nav>
    </header>
  );
}
