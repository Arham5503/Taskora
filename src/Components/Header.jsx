import { Search, CirclePlus, Bell, User, Sun, Moon } from "lucide-react";
import { useContext, useState, useEffect } from "react";
import { AppSettingsContext } from "../Context/ThemeContext";
import { Link, useLocation } from "react-router-dom";

function Header({ onCreateClick }) {
  const { isDark, toggleTheme, colors } = useContext(AppSettingsContext);
  const [activeTab, setActiveTab] = useState("dashboard");
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname.split("/")[1];
    setActiveTab(path || "dashboard");
  }, [location.pathname]);

  return (
    <>
      <header
        style={{ backgroundColor: colors.header }}
        className="px-5 shadow-md"
      >
        <nav className="flex justify-between items-center py-3">
          <h1
            style={{ color: colors.text }}
            className="text-[18px] border-blue-600 border-b-2 first-letter:uppercase lowercase"
          >
            {activeTab}
          </h1>
          <div className="flex justify-between gap-5 px-2 items-center">
            <div className="relative w-full max-w-sm">
              <Search
                stroke={isDark ? "#ffffff" : "#000000"}
                className="absolute left-2 top-1/2 -translate-y-1/2"
                width={20}
              />
              <input
                type="text"
                placeholder="Search"
                style={{
                  border: `1px solid ${colors.border}`,
                  color: colors.text,
                }}
                className="w-full pl-9 pr-3 py-2  rounded-2xl focus:outline-none"
              />
            </div>
            <button onClick={toggleTheme} className="cursor-pointer">
              {isDark ? <Sun stroke="#ffffff" strokeWidth={2} /> : <Moon />}
            </button>
            <div className="cursor-pointer">
              <CirclePlus
                stroke={isDark ? "#ffffff" : "#000000"}
                strokeWidth={2}
                onClick={onCreateClick}
              />
            </div>
            <Link to={"/notifications"} className="cursor-pointer">
              <Bell stroke={isDark ? "#ffffff" : "#000000"} strokeWidth={2} />
            </Link>
            <div className="cursor-pointer">
              <User stroke={isDark ? "#ffffff" : "#000000"} strokeWidth={2} />
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
export default Header;
