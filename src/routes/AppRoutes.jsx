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
import HomeScreen from "../Components/HomeScreen.jsx";

const ProtectedRoute = ({ children }) => {
  const auth = localStorage.getItem("token"); // change logic if needed
  return auth ? children : <Navigate to="/login" replace />;
};

const AppRoutes = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected Routes */}
      <Route
        path="/pricing"
        element={
          <ProtectedRoute>
            <PricingModal />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<HomeScreen />} />
        <Route path="pricing" element={<PricingModal />} />
        <Route path="home" element={<HomeScreen />} />
      </Route>
    </>
  )
);

export default AppRoutes;
