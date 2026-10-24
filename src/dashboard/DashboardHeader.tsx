
import {
  MenuRounded,
  NotificationsRounded,
  CheckCircleRounded,
  OpenInNewRounded,
} from "@mui/icons-material";

import {
  IconButton,
  Avatar,
  Tooltip,
} from "@mui/material";
import LanguageSwitcher from "../components/LanguageSwitcher";



interface DashboardHeaderProps {
  onMenuClick?: () => void;
}

const DashboardHeader = ({
  onMenuClick,
}: DashboardHeaderProps) => {
  return (
    <header className="flex h-[80px] items-center justify-between px-5 md:px-8">
      

      <IconButton
        onClick={onMenuClick}
        aria-label="Открыть меню"
        sx={{ color: "#607381" }}
      >
        <MenuRounded />
      </IconButton>

      
      <div className="flex items-center gap-3 md:gap-5">

      
        <div className="hidden sm:block">
          <LanguageSwitcher />
        </div>

  
        <Tooltip title="System status">
          <IconButton sx={{ color: "#85cbb7" }}>
            <CheckCircleRounded />
          </IconButton>
        </Tooltip>

   
        <Tooltip title="Notifications">
          <IconButton sx={{ color: "#647987" }}>
            <NotificationsRounded />
          </IconButton>
        </Tooltip>

      
        <Tooltip title="Open in new tab">
          <IconButton sx={{ color: "#81919e" }}>
            <OpenInNewRounded />
          </IconButton>
        </Tooltip>

    
        <Avatar
          sx={{
            width: 46,
            height: 46,
            backgroundColor: "#69c5fc",
            fontSize: "26px",
          }}
        >
          👨🏻
        </Avatar>
      </div>
    </header>
  );
};

export default DashboardHeader;
