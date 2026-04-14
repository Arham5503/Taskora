import {
  Home,
  CalendarDays,
  FileChartPie,
  CircleCheckBig,
  LogOut,
  MessageSquareDot,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppSettingsContext } from "../Context/ThemeContext";
import { useAuth } from "../Context/AuthContext";

function Sidebar() {
  const { colors } = useContext(AppSettingsContext);
  const { setUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    const path = location.pathname.split("/")[1];
    setActiveTab(path || "dashboard");
  }, [location.pathname]);

  const handleLogout = async () => {
    await fetch("http://localhost:2004/api/logout", {
      method: "GET",
      credentials: "include",
    }).then(() => {
      setUser(null);
      navigate("/");
    });
  };

  const navItems = [
    {
      key: "dashboard",
      icon: <Home size="1.1rem" />,
      label: "Home",
      to: "/dashboard",
    },
    {
      key: "project",
      icon: <FileChartPie size="1.1rem" />,
      label: "Projects",
      to: "/project",
    },
    {
      key: "tasks",
      icon: <CircleCheckBig size="1.1rem" />,
      label: "My Tasks",
      to: "/tasks",
    },
    {
      key: "calendar",
      icon: <CalendarDays size="1.1rem" />,
      label: "Calendar",
      to: "/calendar",
    },
    {
      key: "notifications",
      icon: <MessageSquareDot size="1.1rem" />,
      label: "Notifications",
      to: "/notifications",
    },
  ];

  return (
    <aside
      style={{ backgroundColor: colors.sidebar }}
      className="sidebar flex flex-col h-screen shadow-xl"
      style={{
        backgroundColor: colors.sidebar,
        width: "clamp(3.5rem, 20%, 16rem)",
        minWidth: "3.5rem",
        padding: "1rem",
      }}
    >
      {/* Logo */}
      <div style={{ marginBottom: "1.5rem" }}>
        <img
          src="/Logo.png"
          alt="Taskora Logo"
          style={{ width: "clamp(2rem, 70%, 10rem)", maxWidth: "10rem" }}
        />
      </div>

      {/* Navigation */}
      <ul
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.25rem",
          flex: 1,
        }}
      >
        {navItems.map(({ key, icon, label, to }) => (
          <li key={key}>
            <Link
              to={to}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.5rem 0.625rem",
                borderRadius: "0.5rem",
                textDecoration: "none",
                fontSize: "0.9375rem",
                backgroundColor: activeTab === key ? "#DBEAFE" : "transparent",
                color: activeTab === key ? colors.primary : colors.text,
                transition: "background 0.15s",
                whiteSpace: "nowrap",
                overflow: "hidden",
              }}
            >
              <span style={{ flexShrink: 0 }}>{icon}</span>
              <span
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
                className="sidebar-label"
              >
                {label}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {/* Logout */}
      <button
        onClick={handleLogout}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          marginTop: "1rem",
          cursor: "pointer",
          color: colors.text,
          background: "none",
          border: "none",
          padding: "0.5rem 0.625rem",
          borderRadius: "0.5rem",
          fontSize: "0.9375rem",
          whiteSpace: "nowrap",
          overflow: "hidden",
        }}
      >
        <span style={{ flexShrink: 0 }}>
          <LogOut size="1.1rem" />
        </span>
        <span className="sidebar-label">Log out</span>
      </button>

      <style>{`
        @media (max-width: 640px) {
          .sidebar-label { display: none; }
        }
      `}</style>
    </aside>
  );
}

export default Sidebar;
