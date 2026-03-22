import "./App.css";
import { Outlet } from "react-router";
import { Toaster } from "react-hot-toast";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <div className="wrapper">
        <Toaster position="top-right" />
        <Header name="JobChaser" tagline="Find your dream job" />
        <main className="p-5 light:bg-amber-400">
          <Outlet />
        </main>
        <Footer description="JobChaser is a platform that helps you find your dream job. We provide a wide range of job listings and resources to help you succeed in your job search." />
      </div>
    </ThemeProvider>
  );
}

export default App;
