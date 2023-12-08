import { Tooltip, ListItemIcon, Menu, MenuItem, Link } from "@mui/material";
import React from "react";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import GradingIcon from "@mui/icons-material/Grading";
import { useRouter } from "next/router";
import { useThemeContext } from "@/context/theme.context";
import { useNavContext } from "@/context/nav.context";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const AboutMenu = () => {
    const router = useRouter();
    const { theme } = useThemeContext();
    const { activeNav } = useNavContext();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <React.Fragment>
            <Tooltip title="About">
                <Link
                    onClick={handleClick}
                    sx={{
                        textDecoration: "none",
                        color: theme.palette.text.primary,
                        mx: 2,
                        fontSize: 18,
                        cursor: "pointer",
                        "&:hover": {
                            color: theme.palette.primary.dark,
                        },
                    }}
                >
                    About <ArrowDropDownIcon sx={{ mx: -0.5 }} />
                </Link>
            </Tooltip>

            <Menu
                anchorEl={anchorEl}
                id="about-menu"
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
                            left: 14,
                            width: 10,
                            height: 10,
                            bgcolor: "background.paper",
                            transform: "translateY(-50%) rotate(45deg)",
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: "left", vertical: "top" }}
                anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
            >
                <MenuItem
                    onClick={async () => {
                        router.push("/privacy-policy");
                        handleClose();
                    }}
                    sx={{
                        color:
                            activeNav === "privacy-policy"
                                ? theme.palette.primary.main
                                : theme.palette.text.primary,
                    }}
                >
                    <ListItemIcon
                        sx={{
                            color:
                                activeNav === "privacy-policy"
                                    ? theme.palette.primary.main
                                    : theme.palette.text.primary,
                        }}
                    >
                        <ShieldOutlinedIcon fontSize="small" />
                    </ListItemIcon>
                    Privacy Policy
                </MenuItem>
                <MenuItem
                    onClick={async () => {
                        router.push("/terms-of-service");
                        handleClose();
                    }}
                    sx={{
                        color:
                            activeNav === "terms-of-service"
                                ? theme.palette.primary.main
                                : theme.palette.text.primary,
                    }}
                >
                    <ListItemIcon
                        sx={{
                            color:
                                activeNav === "terms-of-service"
                                    ? theme.palette.primary.main
                                    : theme.palette.text.primary,
                        }}
                    >
                        <GradingIcon fontSize="small" />
                    </ListItemIcon>
                    Terms of Service
                </MenuItem>
            </Menu>
        </React.Fragment>
    );
};

export default AboutMenu;
