import { createBrowserRouter } from "react-router";
import HomePage from "./pages/HomePage.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import Jobs from "./pages/Jobs.tsx";
import App from "./App.tsx";
import SignUpPage from "./pages/SignUpPage.tsx";
import SignInPage from "./pages/SignInPage.tsx";
import MyJobsPage from "./pages/MyJobsPage.tsx";
import MyListingsPage from "./pages/MyListingsPage.tsx";
import CreateJobPage from "./pages/CreateJobPage.tsx";
import EditJobPage from "./pages/EditJobPage.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "jobs", element: <Jobs /> },
      {
        path: "jobs/new",
        element: (
          <ProtectedRoute>
            <CreateJobPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "jobs/:id/edit",
        element: (
          <ProtectedRoute>
            <EditJobPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "my-jobs",
        element: (
          <ProtectedRoute>
            <MyJobsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "my-listings",
        element: (
          <ProtectedRoute>
            <MyListingsPage />
          </ProtectedRoute>
        ),
      },
      { path: "signup", element: <SignUpPage /> },
      { path: "signin", element: <SignInPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

export default router;
