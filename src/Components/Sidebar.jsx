import {
  Home,
  CalendarDays,
  FileChartPie,
  CircleCheckBig,
  LogOut,
  MessageSquareDot,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppSettingsContext } from "../Context/ThemeContext";
import { useAuth } from "../Context/AuthContext";

function Sidebar({ isOpen, onClose }) {
  const { colors } = useContext(AppSettingsContext);
  const { setUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    const path = location.pathname.split("/")[1];
    setActiveTab(path || "dashboard");
    // Close drawer on navigation (mobile)
    if (onClose) onClose();
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
    <>
      {/* ── Desktop sidebar: always visible, icon-only below 768px ── */}
      <aside
        className="sidebar-desktop"
        style={{
          backgroundColor: colors.sidebar,
          width: "clamp(3.5rem, 15vw, 16rem)",
          minWidth: "3.5rem",
          maxWidth: "16rem",
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          flexShrink: 0,
          boxShadow: "2px 0 8px rgba(0,0,0,0.06)",
          overflowY: "auto",
          transition: "width 0.2s ease",
        }}
      >
        <SidebarContent
          navItems={navItems}
          activeTab={activeTab}
          colors={colors}
          handleLogout={handleLogout}
          showLabels={true}
          labelClass="sidebar-label"
        />
      </aside>

      {/* ── Mobile/Tablet drawer: slides in from left ── */}
      <>
        {/* Backdrop */}
        <div
          onClick={onClose}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.45)",
            zIndex: 49,
            opacity: isOpen ? 1 : 0,
            pointerEvents: isOpen ? "auto" : "none",
            transition: "opacity 0.25s ease",
          }}
          className="sidebar-drawer-backdrop"
        />

        {/* Drawer panel */}
        <aside
          className="sidebar-drawer"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            height: "100svh",
            width: "16rem",
            backgroundColor: colors.sidebar,
            zIndex: 50,
            display: "flex",
            flexDirection: "column",
            padding: "1rem",
            boxShadow: "4px 0 24px rgba(0,0,0,0.15)",
            transform: isOpen ? "translateX(0)" : "translateX(-100%)",
            transition: "transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
            overflowY: "auto",
          }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close menu"
            style={{
              alignSelf: "flex-end",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "0.25rem",
              color: colors.text,
              marginBottom: "0.5rem",
            }}
          >
            <X size={20} />
          </button>

          <SidebarContent
            navItems={navItems}
            activeTab={activeTab}
            colors={colors}
            handleLogout={handleLogout}
            showLabels={true}
          />
        </aside>
      </>

      <style>{`
        /* Desktop: show static sidebar, hide drawer */
        @media (min-width: 1025px) {
          .sidebar-desktop { display: flex !important; }
          .sidebar-drawer { display: none !important; }
          .sidebar-drawer-backdrop { display: none !important; }
        }
        /* Tablet & mobile: hide static sidebar, use drawer */
        @media (max-width: 1024px) {
          .sidebar-desktop { display: none !important; }
          .sidebar-drawer { display: flex !important; }
          .sidebar-drawer-backdrop { display: block !important; }
        }
        /* Icon-only mode on small desktop */
        @media (min-width: 1025px) and (max-width: 1200px) {
          .sidebar-label { display: none; }
        }
      `}</style>
    </>
  );
}

/* Shared nav content used by both desktop aside and mobile drawer */
function SidebarContent({
  navItems,
  activeTab,
  colors,
  handleLogout,
  showLabels,
  labelClass,
}) {
  return (
    <>
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
          listStyle: "none",
          margin: 0,
          padding: 0,
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
                gap: "0.625rem",
                padding: "0.5rem 0.75rem",
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
                className={labelClass}
                style={{ overflow: "hidden", textOverflow: "ellipsis" }}
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
          gap: "0.625rem",
          marginTop: "1rem",
          cursor: "pointer",
          color: colors.text,
          background: "none",
          border: "none",
          padding: "0.5rem 0.75rem",
          borderRadius: "0.5rem",
          fontSize: "0.9375rem",
          whiteSpace: "nowrap",
          overflow: "hidden",
          width: "100%",
          textAlign: "left",
        }}
      >
        <span style={{ flexShrink: 0 }}>
          <LogOut size="1.1rem" />
        </span>
        <span className={labelClass}>Log out</span>
      </button>
    </>
  );
}

export default Sidebar;
