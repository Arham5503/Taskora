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
import { useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AppSettingsContext } from "../Context/ThemeContext";
function Sidebar() {
  const { colors } = useContext(AppSettingsContext);
  const [activeTab, setActiveTab] = useState("dashboard");
  return (
    <>
      <aside className="sidebar flex flex-col w-1/5 min-w-[250px] p-4 h-screen shadow-xl bg-white">
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
          <li
            className="flex items-center rounded-lg gap-2 p-2 cursor-pointer"
            style={{
              backgroundColor:
                activeTab === "dashboard" ? "#DBEAFE" : "transparent",
              color: activeTab === "dashboard" ? colors.primary : colors.text,
            }}
          >
            <CircleCheckBig />
            <span>My Tasks</span>
          </li>
          <li
            className="flex items-center rounded-lg gap-2 p-2 cursor-pointer"
            style={{
              backgroundColor:
                activeTab === "dashboard" ? "#DBEAFE" : "transparent",
              color: activeTab === "dashboard" ? colors.primary : colors.text,
            }}
          >
            <CalendarDays />
            <span>Calendar</span>
          </li>
          <li
            className="flex items-center rounded-lg gap-2 p-2 cursor-pointer"
            style={{
              backgroundColor:
                activeTab === "dashboard" ? "#DBEAFE" : "transparent",
              color: activeTab === "dashboard" ? colors.primary : colors.text,
            }}
          >
            <ChartPie />
            <span>Productivity</span>
          </li>
          <li
            className="flex items-center rounded-lg gap-2 p-2 cursor-pointer"
            style={{
              backgroundColor:
                activeTab === "dashboard" ? "#DBEAFE" : "transparent",
              color: activeTab === "dashboard" ? colors.primary : colors.text,
            }}
          >
            <MessageSquareDot />
            <span>Notifications</span>
          </li>
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
        <Link
          to={"/login"}
          className="flex items-center text-[#1C1F25] gap-2 cursor-pointer mt-4"
        >
          <LogOut />
          Log out
        </Link>
      </aside>
    </>
  );
}
export default Sidebar;
