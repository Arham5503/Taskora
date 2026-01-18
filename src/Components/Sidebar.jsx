import {
  Home,
  CalendarDays,
  FileChartPie,
  CircleCheckBig,
  ChartPie,
  Star,
  Rocket,
  ChevronUp,
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

  return (
    <aside
      style={{ backgroundColor: colors.sidebar }}
      className="sidebar flex flex-col w-1/5 min-w-[250px] p-4 h-screen shadow-xl"
    >
      {/* Logo */}
      <div className="mb-6">
        <img src="/Logo.png" alt="PlanOra Logo" className="w-40" />
      </div>

      {/* Navigation */}
      <ul className="flex flex-col gap-1 flex-1">
        <li
          className="flex items-center rounded-lg gap-2 p-2 cursor-pointer"
          style={{
            backgroundColor:
              activeTab === "dashboard" ? "#DBEAFE" : "transparent",
            color: activeTab === "dashboard" ? colors.primary : colors.text,
          }}
        >
          <Home />
          <Link to={"/dashboard"}>Home</Link>
        </li>
        <Link to={"/project"}>
          <li
            className="flex items-center rounded-lg gap-2 p-2 cursor-pointer"
            style={{
              backgroundColor:
                activeTab === "project" ? "#DBEAFE" : "transparent",
              color: activeTab === "project" ? colors.primary : colors.text,
            }}
          >
            <FileChartPie />
            <span>Projects</span>
          </li>
        </Link>
        <Link to={"/tasks"}>
          <li
            className="flex items-center rounded-lg gap-2 p-2 cursor-pointer"
            style={{
              backgroundColor:
                activeTab === "tasks" ? "#DBEAFE" : "transparent",
              color: activeTab === "tasks" ? colors.primary : colors.text,
            }}
          >
            <CircleCheckBig />
            <span>My Tasks</span>
          </li>
        </Link>
        <Link to={"/calendar"}>
          <li
            className="flex items-center rounded-lg gap-2 p-2 cursor-pointer"
            style={{
              backgroundColor:
                activeTab === "calendar" ? "#DBEAFE" : "transparent",
              color: activeTab === "calendar" ? colors.primary : colors.text,
            }}
          >
            <CalendarDays />
            <span>Calendar</span>
          </li>
        </Link>
        <Link to={"/"}>
          <li
            className="flex items-center rounded-lg gap-2 p-2 cursor-pointer"
            style={{ color: colors.text }}
            // style={{
            //   backgroundColor:
            //     activeTab === "dashboard" ? "#DBEAFE" : "transparent",
            //   color: activeTab === "dashboard" ? colors.primary : colors.text,
            // }}
          >
            <ChartPie />
            <span>Productivity</span>
          </li>
        </Link>
        <Link to={"/notifications"}>
          <li
            className="flex items-center rounded-lg gap-2 p-2 cursor-pointer"
            style={{
              backgroundColor:
                activeTab === "notifications" ? "#DBEAFE" : "transparent",
              color:
                activeTab === "notifications" ? colors.primary : colors.text,
            }}
          >
            <MessageSquareDot />
            <span>Notifications</span>
          </li>
        </Link>
      </ul>
      {/* <div className="p-5 bg-linear-to-r from-[#0077ffb5] to-[#00a2ff6d] rounded-2xl space-y-2"> */}
      {/* <div className="p-5 bg-[url('./assets/ChoosePro.png')] rounded-2xl space-y-2">
  <div>
    <span className="bg-white w-10 text-3xl rounded-2xl">🎉</span>
  </div>
  <div>
    <h2 className="text-[16px] font-medium">Upgrade to Pro</h2>
    <p className="text-[10px]">Choose best Plan for You</p>
  </div>
  <button className="text-center text-[16px] bg-[#105EF5] w-[90%] m-auto py-1 text-white rounded-xl cursor-pointer">
    <Link to={"/pricing"}>Go to plans</Link>
  </button>
</div> */}
      {/* Logout */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 cursor-pointer mt-4"
        style={{ color: colors.text }}
      >
        <LogOut />
        Log out
      </button>
    </aside>
  );
}
export default Sidebar;
