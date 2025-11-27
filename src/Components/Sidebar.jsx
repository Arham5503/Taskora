import reactLogo from "../assets/react.svg";
import {
  Home,
  CalendarDays,
  Inbox,
  ChartPie,
  Star,
  Rocket,
  ChevronUp,
  LogOut,
} from "lucide-react";
import { Link } from "react-router-dom";
function Sidebar() {
  // pathname.include("/home");
  return (
    <>
      <aside className="sidebar flex flex-col w-[20%] p-4 justify-between h-screen shadow-xl">
        <img src={reactLogo} width={45} alt="" />
        <ul className="flex flex-col p-2 my-4 gap-2.5">
          <li className="flex text-[#6d7178] gap-2 cursor-pointer">
            <Home />{" "}
            <Link to={"/home"}>
              <span>Home</span>
            </Link>
          </li>
          <li className="flex text-[#6d7178] gap-2 cursor-pointer">
            <CalendarDays />
            <span>Calender</span>
          </li>
          <li className="flex text-[#6d7178] gap-2 cursor-pointer">
            <Inbox />
            <span>Inbox</span>
          </li>
          <li className="flex text-[#6d7178] gap-2 cursor-pointer">
            <ChartPie /> <span>Productivity</span>
          </li>
          <li className="flex text-[#6d7178] gap-2 cursor-pointer">
            <Star /> Favourite <ChevronUp />
          </li>
          <li className="flex text-[#6d7178] gap-2 cursor-pointer">
            <Rocket /> Work Space <ChevronUp />
          </li>
        </ul>
        {/* <div className="p-5 bg-linear-to-r from-[#0077ffb5] to-[#00a2ff6d] rounded-2xl space-y-2"> */}
        <div className="p-5 bg-[url('./assets/ChoosePro.png')] rounded-2xl space-y-2">
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
        </div>
        <Link to={"/login"} className="flex text-[#1C1F25] cursor-pointer my-4">
          <LogOut />
          Log out
        </Link>
      </aside>
    </>
  );
}
export default Sidebar;
