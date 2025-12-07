import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Layout from "./Components/Layout.jsx";
import Login from "./Pages/Login.jsx";
import PricingModal from "./Components/PricingModal.jsx";
import HomeScreen from "./Components/HomeScreen.jsx";
import Signup from "./Pages/Signup.jsx";
import LandingPage from "./Pages/LandingPage.jsx";
import "./App.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<LandingPage />}>
        {/* <Route index element={<HomeScreen />} /> */}
        <Route index element={<LandingPage />} />
        <Route path="pricing" element={<PricingModal />} />
        <Route path="home" element={<HomeScreen />} />
      </Route>
    </>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
