import Header from "./Header";
import Sidebar from "./Sidebar";
import { AppSettingsProvider } from "../Context/ThemeContext";

import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <AppSettingsProvider>
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <Header />
          <div className="page-content">
            <Outlet />
          </div>
        </div>
      </div>
    </AppSettingsProvider>
  );
}
export default Layout;
