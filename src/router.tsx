import { createBrowserRouter } from "react-router";
import HomePage from "./pages/HomePage.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import Jobs from "./pages/Jobs.tsx";
import App from "./App.tsx";
import SignUpPage from "./pages/SignUpPage.tsx";
import SignInPage from "./pages/SignInPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "jobs", element: <Jobs /> },
      { path: "signup", element: <SignUpPage /> },
      { path: "signin", element: <SignInPage /> },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
