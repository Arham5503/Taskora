import Header from "./Header";
import Sidebar from "./Sidebar";
import {
  AppSettingsProvider,
  AppSettingsContext,
} from "../Context/ThemeContext";
import { Outlet } from "react-router-dom";
import { useContext } from "react";

function AppContent() {
  const { colors } = useContext(AppSettingsContext);

  return (
    <div className="app-container flex h-screen">
      <Sidebar />
      <div className="main-content flex-1 flex flex-col">
        <Header />
        <div
          className="page-content flex-1 p-5 overflow-auto"
          style={{ backgroundColor: colors.background }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}

function Layout() {
  return (
    <AppSettingsProvider>
      <AppContent />
    </AppSettingsProvider>
  );
}

export default Layout;
