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
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        height: "100svh",
        overflow: "hidden",
        width: "100%",
        position: "relative",
      }}
    >
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Backdrop overlay for mobile/tablet */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.4)",
            zIndex: 40,
            display: "none",
          }}
          className="sidebar-backdrop"
        />
      )}

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
          overflow: "hidden",
        }}
      >
        <Header
          onCreateClick={() => setShowCreateModel(true)}
          onMenuClick={() => setSidebarOpen((v) => !v)}
        />
        <div
          style={{
            flex: 1,
            padding: "1.25rem",
            overflowY: "auto",
            backgroundColor: colors.background,
          }}
        >
          <Outlet context={{ showCreateModel, setShowCreateModel }} />
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .sidebar-backdrop { display: block !important; }
        }
      `}</style>
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
