"use client";
import React, { useContext } from "react";
import { UserIcon } from "../assets/icons";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { styled, alpha } from "@mui/material/styles";
import LogoutIcon from "@mui/icons-material/Logout";
import Divider from "@mui/material/Divider";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { IconButton, Menu, MenuItem, MenuProps } from "@mui/material";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAuthContext } from "../../contexts/authContext";

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  overflow: "visible",

  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: "var(--lightest-grey)",
    overflow: "visible",
    backgroundColor: "var(--opaque-trans-grey)",
    "&::after": {
      content: '""',
      position: "absolute",
      top: "-16px",
      right: "11px",
      width: "0",
      height: "0",
      borderTop: "8px solid transparent",
      borderBottom: "8px solid var(--opaque-trans-grey)",
      borderLeft: "8px solid transparent",
      borderRight: "8px solid transparent",
      zIndex: theme.zIndex.drawer + 1,
    },
    "&::before": {
      content: '""',
      position: "absolute",
      top: "-20px",
      right: "9px",
      width: "0",
      height: "0",
      borderTop: "10px solid transparent",
      borderRight: "10px solid transparent",
      borderBottom: "10px solid rgba(0, 0, 0, 0.3)",
      borderLeft: "10px solid transparent",
      zIndex: theme.zIndex.drawer + 1,
    },
    boxShadow:
      "rgba(0, 0, 0, 0.3) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",

    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      fontSize: "1rem",
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: "var(--lightest-grey)",
        marginRight: theme.spacing(1.5),
      },
      "&:hover": {
        backgroundColor: "var(--trans-grey)",
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

export default function UserMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { session, logout } = useAuthContext();
  const router = useRouter();

  return (
    <div className="h-12 flex items-center justify-center cursor-pointer duration-300 relative">
      <IconButton
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <AccountCircleIcon
          className="h-6 w-6 text-[var(--lightest-grey)]"
          sx={{ color: "#CAC4D0" }}
        />
      </IconButton>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <div className="menu-arrow" />
        {/* <MenuItem
          onClick={handleClose}
          disableRipple
          sx={{
            "&:hover": {
              backgroundColor: "#27262c",
            },
          }}
        >
          {session?.email}
        </MenuItem> */}

        <MenuItem
          onClick={() => {
            router.push("/user-profile");
            handleClose();
          }}
          disableRipple
        >
          <AccountCircleIcon
            className="text-[var(--lightest-grey)]"
            sx={{ color: "#CAC4D0" }}
          />
          View your profile
        </MenuItem>
        <Divider
          sx={{ my: 0.5, backgroundColor: "rgba(208, 188, 255, 0.11)" }}
        />
        <MenuItem
          onClick={() => {
            router.push("/");
            handleClose();
          }}
          disableRipple
        >
          <SettingsOutlinedIcon />
          Account Settings
        </MenuItem>
        <Divider
          sx={{ my: 0.5, backgroundColor: "rgba(208, 188, 255, 0.11)" }}
        />
        <MenuItem
          onClick={() => {
            logout();
            handleClose;
          }}
          disableRipple
        >
          <LogoutIcon />
          Sign Out
        </MenuItem>
      </StyledMenu>
    </div>
  );
}
