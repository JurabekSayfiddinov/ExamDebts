import Sidebar from "@/dashboard/sidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      <div className="sticky top-0 h-screen shrink-0">
        <Sidebar />
      </div>

      <main className="min-w-0 flex-1 overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;