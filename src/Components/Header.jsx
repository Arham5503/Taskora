import {
  Search,
  CirclePlus,
  Bell,
  User,
  Sun,
  Moon,
  Menu,
  X,
} from "lucide-react";
import { useContext, useState, useEffect } from "react";
import { AppSettingsContext } from "../Context/ThemeContext";
import { Link, useLocation } from "react-router-dom";

function Header({ onCreateClick, onMenuClick }) {
  const { isDark, toggleTheme, colors } = useContext(AppSettingsContext);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname.split("/")[1];
    setActiveTab(path || "dashboard");
  }, [location.pathname]);

  // Close search on route change
  useEffect(() => {
    setSearchOpen(false);
  }, [location.pathname]);

  const iconColor = isDark ? "#ffffff" : "#111827";

  return (
    <>
      <header
        style={{
          backgroundColor: colors.header,
          boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
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
          {/* Left: Hamburger (tablet/mobile) + Page Title */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              minWidth: 0,
            }}
          >
            {/* Hamburger — only visible on tablet/mobile */}
            <button
              onClick={onMenuClick}
              aria-label="Open menu"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "0.25rem",
                display: "none",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "0.375rem",
                flexShrink: 0,
                color: iconColor,
              }}
              className="hamburger-btn"
            >
              <Menu size={22} stroke={iconColor} strokeWidth={2} />
            </button>

            {/* Page Title */}
            <h1
              style={{
                color: colors.text,
                fontSize: "1.125rem",
                fontWeight: 600,
                margin: 0,
                borderBottom: "2px solid #2563EB",
                textTransform: "capitalize",
                whiteSpace: "nowrap",
                flexShrink: 0,
                paddingBottom: "1px",
              }}
            >
              {activeTab}
            </h1>
          </div>

          {/* Right: Actions */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              flexShrink: 0,
            }}
          >
            {/* Search input — hidden on mobile, shown inline on desktop */}
            <div
              className="search-desktop"
              style={{
                position: "relative",
                width: "clamp(8rem, 18vw, 18rem)",
              }}
            >
              <Search
                stroke={isDark ? "#ffffff" : "#9CA3AF"}
                size={15}
                style={{
                  position: "absolute",
                  left: "0.6rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  pointerEvents: "none",
                }}
              />
              <input
                type="text"
                placeholder="Search…"
                style={{
                  width: "100%",
                  paddingLeft: "2rem",
                  paddingRight: "0.75rem",
                  paddingTop: "0.4rem",
                  paddingBottom: "0.4rem",
                  border: `1px solid ${colors.border}`,
                  borderRadius: "9999px",
                  color: colors.text,
                  backgroundColor: "transparent",
                  fontSize: "0.875rem",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>

            {/* Search icon — mobile only */}
            <button
              onClick={() => setSearchOpen((v) => !v)}
              aria-label="Search"
              className="search-mobile-btn"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "0.375rem",
                display: "none",
                alignItems: "center",
                borderRadius: "0.375rem",
              }}
            >
              {searchOpen ? (
                <X size={20} stroke={iconColor} strokeWidth={2} />
              ) : (
                <Search size={20} stroke={iconColor} strokeWidth={2} />
              )}
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "0.375rem",
                display: "flex",
                alignItems: "center",
                borderRadius: "0.375rem",
              }}
            >
              {isDark ? (
                <Sun stroke="#ffffff" strokeWidth={2} size={20} />
              ) : (
                <Moon size={20} stroke={iconColor} strokeWidth={2} />
              )}
            </button>

            {/* Create */}
            <button
              onClick={onCreateClick}
              aria-label="Create new"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "0.375rem",
                display: "flex",
                alignItems: "center",
                borderRadius: "0.375rem",
              }}
            >
              <CirclePlus stroke={iconColor} strokeWidth={2} size={20} />
            </button>

            {/* Notifications */}
            <Link
              to="/notifications"
              aria-label="Notifications"
              style={{
                display: "flex",
                alignItems: "center",
                padding: "0.375rem",
                borderRadius: "0.375rem",
              }}
            >
              <Bell stroke={iconColor} strokeWidth={2} size={20} />
            </Link>

            {/* Profile */}
            <Link
              to="/profile"
              aria-label="Profile"
              style={{
                display: "flex",
                alignItems: "center",
                padding: "0.375rem",
                borderRadius: "0.375rem",
              }}
            >
              <User stroke={iconColor} strokeWidth={2} size={20} />
            </Link>
          </div>
        </nav>

        {/* Mobile search bar — slides down when searchOpen */}
        <div
          style={{
            overflow: "hidden",
            maxHeight: searchOpen ? "4rem" : "0",
            transition: "max-height 0.2s ease",
          }}
          className="search-mobile-bar"
        >
          <div style={{ position: "relative", paddingBottom: "0.75rem" }}>
            <Search
              stroke={isDark ? "#ffffff" : "#9CA3AF"}
              size={15}
              style={{
                position: "absolute",
                left: "0.6rem",
                top: "0.55rem",
                pointerEvents: "none",
              }}
            />
            <input
              type="text"
              placeholder="Search…"
              autoFocus={searchOpen}
              style={{
                width: "100%",
                paddingLeft: "2rem",
                paddingRight: "0.75rem",
                paddingTop: "0.45rem",
                paddingBottom: "0.45rem",
                border: `1px solid ${colors.border}`,
                borderRadius: "9999px",
                color: colors.text,
                backgroundColor: "transparent",
                fontSize: "0.875rem",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>
        </div>
      </header>

      <style>{`
        /* Tablet & mobile: show hamburger, hide desktop search, show mobile search btn */
        @media (max-width: 1024px) {
          .hamburger-btn { display: flex !important; }
          .search-desktop { display: none !important; }
          .search-mobile-btn { display: flex !important; }
          .search-mobile-bar { display: block; }
        }
        /* Desktop: hide hamburger and mobile controls */
        @media (min-width: 1025px) {
          .hamburger-btn { display: none !important; }
          .search-desktop { display: block !important; }
          .search-mobile-btn { display: none !important; }
          .search-mobile-bar { display: none !important; }
        }
        /* Icon hover feedback */
        .hamburger-btn:hover,
        .search-mobile-btn:hover {
          background: rgba(0,0,0,0.06);
        }
      `}</style>
    </>
  );
}

export default Header;
