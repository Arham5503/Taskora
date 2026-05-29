import { Bell, CirclePlus, Menu, Moon, Sun, User } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AppSettingsContext } from "../Context/ThemeContext";
import { getUnreadNotificationCount } from "../api/ApiBuilder";

function Header({ onCreateClick, onMenuClick }) {
  const { isDark, toggleTheme, colors } = useContext(AppSettingsContext);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [unreadCount, setUnreadCount] = useState(0);
  const location = useLocation();
  const iconColor = isDark ? "#E2E8F0" : "#334155";

  useEffect(() => {
    const path = location.pathname.split("/")[1];
    setActiveTab(path || "dashboard");
  }, [location.pathname]);

  useEffect(() => {
    fetchUnreadCount();
    const intervalId = window.setInterval(fetchUnreadCount, 30000);

    window.addEventListener("notifications:changed", fetchUnreadCount);
    return () => {
      window.clearInterval(intervalId);
      window.removeEventListener("notifications:changed", fetchUnreadCount);
    };
  }, []);

  useEffect(() => {
    if (location.pathname === "/notifications") {
      fetchUnreadCount();
    }
  }, [location.pathname]);

  const fetchUnreadCount = async () => {
    try {
      const response = await getUnreadNotificationCount();
      setUnreadCount(response.unreadCount ?? response.count ?? 0);
    } catch (error) {
      console.error("Failed to fetch unread notifications:", error);
    }
  };

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
        className="relative z-30"
        style={{
          backgroundColor: colors.header,
          borderBottom: `1px solid ${colors.border}`,
          backdropFilter: "blur(16px)",
          padding: "0 1.25rem",
          flexShrink: 0,
        }}
      >
        <nav className="flex justify-space-between items-center h-14 gap-3">
          <div className="flex gap-3 items-center min-w-0">
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
              className="m-0 weight-700 capitalize whitespace-nowrap "
              style={{
                color: colors.boldText,
                fontSize: "1.125rem",
                fontWeight: 700,
                borderBottom: `2px solid ${colors.primary}`,
                flexShrink: 0,
                paddingBottom: "1px",
              }}
            >
              {activeTab}
            </h1>
          </div>

          <div
            className="flex items-center gap-1.5 "
            style={{
              flexShrink: 0,
            }}
          >
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              style={actionStyle}
            >
              {isDark ? (
                <Sun stroke={iconColor} strokeWidth={2} size={20} />
              ) : (
                <Moon stroke={iconColor} strokeWidth={2} size={20} />
              )}
            </button>

            <button
              onClick={onCreateClick}
              aria-label="Create new"
              style={actionStyle}
            >
              <CirclePlus stroke={iconColor} strokeWidth={2} size={20} />
            </button>

            <Link
              to="/notifications"
              aria-label="Notifications"
              style={{ ...actionStyle, position: "relative" }}
            >
              <Bell stroke={iconColor} strokeWidth={2} size={20} />
              {unreadCount > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "-0.35rem",
                    right: "-0.35rem",
                    minWidth: "1.05rem",
                    height: "1.05rem",
                    padding: "0 0.25rem",
                    borderRadius: "9999px",
                    backgroundColor: "#DC2626",
                    color: "#fff",
                    border: `2px solid ${colors.header}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    lineHeight: 1,
                  }}
                >
                  {unreadCount > 99 ? "99+" : unreadCount}
                </span>
              )}
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
