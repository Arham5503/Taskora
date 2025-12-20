import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "../Components/Layout.jsx";
import Login from "../Pages/Login.jsx";
import Signup from "../Pages/Signup.jsx";
import LandingPage from "../Pages/LandingPage.jsx";
import PricingModal from "../Components/PricingModal.jsx";
import Dashboard from "../Pages/Dashboard.jsx";
import ProjectsPage from "../Pages/ProjectsPage.jsx";
import TasksPage from "../Pages/TasksPage.jsx";
import TaskCalendar from "../Pages/Calendar.jsx";
import NotificationInbox from "../Pages/Notifications.jsx";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
};

const AppRoutes = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* PUBLIC */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* PROTECTED LAYOUT */}
      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/project" element={<ProjectsPage />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/calendar" element={<TaskCalendar />} />
        <Route path="/notifications" element={<NotificationInbox />} />
        <Route path="/pricing" element={<PricingModal />} />
      </Route>
    </>
  )
);

export default AppRoutes;
