import { NavLink, useLocation } from "react-router-dom";

import {
  DashboardRounded,
  AccountBalanceWalletRounded,
  DeleteRounded,
  PeopleRounded,
  FolderRounded,
  MenuRounded,
} from "@mui/icons-material";

import { IconButton, Tooltip } from "@mui/material";

const logo = "https://www.adl5-8.tj/adl5-8-logo.svg";

const menuItems = [
  {
    icon: <DashboardRounded />,
    title: "Dashboard",
    path: "/dashboard",
  },
  {
    icon: <AccountBalanceWalletRounded />,
    title: "Debts",
    path: "/debts",
  },
  {
    icon: <DeleteRounded />,
    title: "Trash",
    path: "/trash",
  },
  {
    icon: <PeopleRounded />,
    title: "Contacts",
    path: "/contacts",
  },
  {
    icon: <FolderRounded />,
    title: "Folders",
    path: "/folders",
  },
  {
    icon: <PeopleRounded />,
    title: "Users",
    path: "/users",
  },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="flex min-h-screen w-[110px] flex-col items-center border-r border-[#e8edf3] bg-[#f8f9fc] py-4">

      <NavLink
        to="/dashboard"
        className="mb-9 flex h-[65px] w-[65px] items-center justify-center rounded-full bg-white"
      >
        <img
          src={logo}
          alt="Adl 5:8"
          className="h-12 w-12 object-contain"
        />
      </NavLink>

      <div className="flex flex-1 flex-col items-center gap-7">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <Tooltip
              key={item.title}
              title={item.title}
              placement="right"
            >
              <IconButton
                component={NavLink}
                to={item.path}
                sx={{
                  width: "58px",
                  height: "58px",
                  borderRadius: "12px",

                  backgroundColor: isActive
                    ? "#e7eeff"
                    : "transparent",

                  color: isActive
                    ? "#437eff"
                    : "#81909e",

                  "&:hover": {
                    backgroundColor: "#e7eeff",
                    color: "#437eff",
                  },
                }}
              >
                {item.icon}
              </IconButton>
            </Tooltip>
          );
        })}
      </div>

      <div className="mt-auto">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#b4e4ff] text-2xl">
          👨🏻
        </div>
      </div>

    </aside>
  );
};

export default Sidebar;