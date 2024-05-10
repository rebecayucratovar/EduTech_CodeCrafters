import { Outlet } from "react-router-dom";
import { NavBar } from "./NavBar";
export const Layout = () => {
  return (
    <div className="content-layout">
      <NavBar />
      <Outlet />
    </div>
  );
};
