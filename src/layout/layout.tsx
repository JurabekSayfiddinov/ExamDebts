import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="min-h-screen bg-[#f1f5fb]">
      <Outlet />
    </div>
  );
};

export default Layout;