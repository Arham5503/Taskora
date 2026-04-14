import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Layout from "../Components/Layout.jsx";
import Login from "../Pages/Login.jsx";
import Signup from "../Pages/Signup.jsx";
import LandingPage from "../Pages/LandingPage.jsx";
import PricingModal from "../Components/PricingModal.jsx";
import Dashboard from "../Pages/Dashboard.jsx";
import ProjectsPage from "../Pages/ProjectsPage.jsx";
import ProjectDetail from "../Pages/ProjectDetail.jsx";
import TasksPage from "../Pages/TasksPage.jsx";
import TaskCalendar from "../Pages/Calendar.jsx";
import NotificationInbox from "../Pages/Notifications.jsx";
import ProfilePage from "../Pages/Profile.jsx";
import JoinProject from "../Pages/JoinProject.jsx";
import { useAuth } from "../Context/AuthContext.jsx";
import OTP from "../Pages/OTP-verify.jsx";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Checking auth...</div>;

  if (!user) return <Navigate to="/" replace />;

  if (!user.is_verified) return <Navigate to="/verify" replace />;

  return children;
};

const AppRoutes = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* PUBLIC */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/join/:inviteCode" element={<JoinProject />} />
      <Route path="/verify" element={<OTP />} />

      {/* PROTECTED */}
      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/project" element={<ProjectsPage />} />
        <Route path="/project/:projectId" element={<ProjectDetail />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/calendar" element={<TaskCalendar />} />
        <Route path="/notifications" element={<NotificationInbox />} />
        <Route path="/pricing" element={<PricingModal />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>
    </>,
  ),
);

export default AppRoutes;
