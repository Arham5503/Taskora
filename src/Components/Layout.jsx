import Header from "./Header";
import Sidebar from "./Sidebar";

import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="page-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
export default Layout;
