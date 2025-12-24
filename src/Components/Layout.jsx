import Header from "./Header";
import Sidebar from "./Sidebar";
import {
  AppSettingsProvider,
  AppSettingsContext,
} from "../Context/ThemeContext";
import { Outlet } from "react-router-dom";
import { useContext, useState } from "react";

function AppContent() {
  const { colors } = useContext(AppSettingsContext);
  const [showCreateModel, setShowCreateModel] = useState(false);
  return (
    <div className="app-container flex h-screen">
      <Sidebar />
      <div className="main-content flex-1 flex flex-col">
        <Header onCreateClick={() => setShowCreateModel(true)} />
        <div
          className="page-content flex-1 p-5 overflow-auto"
          style={{ backgroundColor: colors.background }}
        >
          <Outlet
            context={{
              showCreateModel,
              setShowCreateModel,
            }}
          />
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
