import { Bell, CirclePlus, Menu, Moon, Sun, User } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AppSettingsContext } from "../Context/ThemeContext";

function Header({ onCreateClick, onMenuClick }) {
  const { isDark, toggleTheme, colors } = useContext(AppSettingsContext);
  const [activeTab, setActiveTab] = useState("dashboard");
  const location = useLocation();
  const iconColor = isDark ? "#E2E8F0" : "#334155";

  useEffect(() => {
    const path = location.pathname.split("/")[1];
    setActiveTab(path || "dashboard");
  }, [location.pathname]);

  const actionStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0.45rem",
    borderRadius: "0.5rem",
    border: `1px solid ${colors.border}`,
    background: "transparent",
    cursor: "pointer",
    color: iconColor,
  };

  return (
    <>
      <header
        style={{
          backgroundColor: colors.header,
          borderBottom: `1px solid ${colors.border}`,
          backdropFilter: "blur(16px)",
          padding: "0 1.25rem",
          flexShrink: 0,
          zIndex: 30,
          position: "relative",
        }}
      >
        <nav
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "3.5rem",
            gap: "0.75rem",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              minWidth: 0,
            }}
          >
            <button
              onClick={onMenuClick}
              aria-label="Open menu"
              className="hamburger-btn"
              style={{
                ...actionStyle,
                display: "none",
                background: colors.primarySoft,
              }}
            >
              <Menu size={22} stroke={iconColor} strokeWidth={2} />
            </button>

            <h1
              style={{
                color: colors.boldText,
                fontSize: "1.125rem",
                fontWeight: 700,
                margin: 0,
                borderBottom: `2px solid ${colors.primary}`,
                textTransform: "capitalize",
                whiteSpace: "nowrap",
                flexShrink: 0,
                paddingBottom: "1px",
              }}
            >
              {activeTab}
            </h1>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              flexShrink: 0,
            }}
          >
            <button onClick={toggleTheme} aria-label="Toggle theme" style={actionStyle}>
              {isDark ? (
                <Sun stroke={iconColor} strokeWidth={2} size={20} />
              ) : (
                <Moon stroke={iconColor} strokeWidth={2} size={20} />
              )}
            </button>

            <button onClick={onCreateClick} aria-label="Create new" style={actionStyle}>
              <CirclePlus stroke={iconColor} strokeWidth={2} size={20} />
            </button>

            <Link to="/notifications" aria-label="Notifications" style={actionStyle}>
              <Bell stroke={iconColor} strokeWidth={2} size={20} />
            </Link>

            <Link to="/profile" aria-label="Profile" style={actionStyle}>
              <User stroke={iconColor} strokeWidth={2} size={20} />
            </Link>
          </div>
        </nav>
      </header>

      <style>{`
        @media (max-width: 1024px) {
          .hamburger-btn { display: flex !important; }
        }
        @media (min-width: 1025px) {
          .hamburger-btn { display: none !important; }
        }
      `}</style>
    </>
  );
}

export default Header;
