import {
    Tooltip,
    IconButton,
    ListItemIcon,
    Menu,
    MenuItem,
    Divider,
} from "@mui/material";
import React from "react";
import { Logout } from "@mui/icons-material";
import { useAuthContext } from "@/context/auth.context";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import GradingIcon from "@mui/icons-material/Grading";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { useRouter } from "next/router";

const UserMenu = () => {
    const router = useRouter();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const { signOutMutation } = useAuthContext();
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <React.Fragment>
            <Tooltip title="Account menu">
                <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                >
                    <AccountCircleIcon fontSize="large" />
                </IconButton>
            </Tooltip>

            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        "&:before": {
                            content: '""',
                            display: "block",
                            position: "absolute",
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: "background.paper",
                            transform: "translateY(-50%) rotate(45deg)",
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
                <MenuItem
                    onClick={async () => {
                        router.push("/account-settings");
                        handleClose();
                    }}
                >
                    <ListItemIcon>
                        <SettingsOutlinedIcon fontSize="small" />
                    </ListItemIcon>
                    Account Settings
                </MenuItem>
                <Divider />
                <MenuItem
                    onClick={async () => {
                        router.push("/privacy-policy");
                        handleClose();
                    }}
                >
                    <ListItemIcon>
                        <ShieldOutlinedIcon fontSize="small" />
                    </ListItemIcon>
                    Privacy Policy
                </MenuItem>
                <MenuItem
                    onClick={async () => {
                        router.push("/terms-of-service");
                        handleClose();
                    }}
                >
                    <ListItemIcon>
                        <GradingIcon fontSize="small" />
                    </ListItemIcon>
                    Terms of Service
                </MenuItem>
                <Divider />
                <MenuItem
                    onClick={async () => {
                        console.log("signing out - user menu");
                        await signOutMutation?.mutate();
                        handleClose();
                    }}
                >
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </React.Fragment>
    );
};

export default UserMenu;
