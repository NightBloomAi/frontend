import {
    Box,
    Typography,
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    CssBaseline,
    AppBar,
    Toolbar,
    IconButton,
    Button,
    Drawer,
    ListItemIcon,
    Link,
    useScrollTrigger,
} from "@mui/material";
import React, { useState } from "react";
import { useThemeContext } from "@/context/theme.context";
import { useAuthContext } from "@/context/auth.context";
import { useNavContext } from "@/context/nav.context";
import { updateQuery } from "@/utils/helperFunctions";
import { useRouter } from "next/router";
import MenuIcon from "@mui/icons-material/Menu";
import SignInDialog from "../auth/SignInDialog";
import SignUpDialog from "../auth/SignUpDialog";
import StyleIcon from "@mui/icons-material/Style";
import TopLoadingBar from "../utils/TopLoadingBar";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { Views } from "@/models/view.models";
import { Logout } from "@mui/icons-material";

type Props = {
    children: React.ReactNode;
};

/**
 * This component wraps the children components with the navigation menu.
 *
 * @param children Children components
 * @returns Navigation wrapper component that wraps the children components
 */
const NavWrapper: React.FC<Props> = ({ children }) => {
    const router = useRouter();
    const { theme } = useThemeContext();
    const { activeNav } = useNavContext();
    const { userSession, isLoading, signOutMutation } = useAuthContext();
    const [mobileOpen, setMobileOpen] = useState(false);
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 80,
    });

    /**
     * Toggle mobile drawer
     */
    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    /**
     * Mobile drawer component for navigation menu
     */
    const drawer = (
        <Box
            onClick={handleDrawerToggle}
            sx={{
                textAlign: "center",
                background: theme.palette.background.default,
                height: "100%",
            }}
        >
            <Typography
                variant="h6"
                component={"div"}
                sx={{ my: 2, fontWeight: 700, cursor: "pointer" }}
                className="font-museo"
                color={theme.palette.primary.main}
            >
                NightBloom
            </Typography>
            <Divider />
            <List>
                {navItems.map((item) => (
                    <ListItem key={item.id} disablePadding>
                        <ListItemButton
                            sx={{
                                textAlign: "left",
                                color:
                                    activeNav === item.id
                                        ? theme.palette.primary.main
                                        : theme.palette.text.primary,
                            }}
                            onClick={() => {
                                router.push(item.href);
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    color:
                                        activeNav === item.id
                                            ? theme.palette.primary.main
                                            : theme.palette.text.primary,
                                }}
                            >
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.name} />
                        </ListItemButton>
                    </ListItem>
                ))}

                {/***************************************************
                 * SIGN IN/ SIGN UP / PROFILE OPTIONS
                 ***************************************************/}
                {userSession === null ? (
                    <React.Fragment>
                        <ListItem key={"signin"} disablePadding>
                            <ListItemButton
                                sx={{ textAlign: "left" }}
                                onClick={() => {
                                    updateQuery({ view: Views.SIGN_IN });
                                }}
                            >
                                <ListItemIcon>
                                    <AccountCircleRoundedIcon />
                                </ListItemIcon>
                                <ListItemText primary={"Sign In"} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem key={"sign up"} disablePadding>
                            <ListItemButton
                                sx={{ textAlign: "left" }}
                                onClick={() => {
                                    updateQuery({ view: Views.SIGN_UP });
                                }}
                            >
                                <ListItemIcon>
                                    <PersonAddIcon sx={{ fontSize: 26 }} />
                                </ListItemIcon>
                                <ListItemText primary={"Sign Up"} />
                            </ListItemButton>
                        </ListItem>
                    </React.Fragment>
                ) : (
                    <ListItem key={"sign out"} disablePadding>
                        <ListItemButton
                            sx={{ textAlign: "left" }}
                            onClick={async () => {
                                await signOutMutation?.mutate();
                            }}
                        >
                            <ListItemIcon>
                                <Logout sx={{ fontSize: 26 }} />
                            </ListItemIcon>
                            <ListItemText primary={"Sign Out"} />
                        </ListItemButton>
                    </ListItem>
                )}
            </List>
        </Box>
    );

    /**
     * Return the navigation wrapper
     */
    return (
        <Box
            sx={{
                display: "flex",
                backgroundColor: theme.palette.background.default,
                width: "100%",
            }}
        >
            {isLoading && <TopLoadingBar />}
            <CssBaseline />
            <AppBar
                component="nav"
                elevation={0}
                sx={{
                    backgroundColor: trigger
                        ? theme.palette.background.default
                        : "transparent",
                }}
            >
                <Toolbar
                    sx={{
                        justifyContent: "space-between",
                        alignItems: "center",
                        display: "flex",
                        maxWidth: "xl",
                        width: "100%",
                        mx: "auto",
                    }}
                >
                    {/***************************************************
                     * MENU ICON (MOBILE ONLY)
                     ***************************************************/}
                    <IconButton
                        color="secondary"
                        aria-label="open drawer"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: "none" } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    {/***************************************************
                     * LOGO
                     ***************************************************/}
                    <Typography
                        variant="h6"
                        component="div"
                        className="font-museo"
                        color={"primary"}
                        onClick={() => router.push("/")}
                        sx={{
                            flex: 1,
                            cursor: "pointer",
                            display: {
                                xs: "none",
                                sm: "block",
                                fontWeight: 700,
                            },
                        }}
                    >
                        NightBloom
                    </Typography>
                    {/***************************************************
                     * DESKTOP NAVIGATION ITEMS
                     ***************************************************/}
                    <Box sx={{ display: { xs: "none", sm: "block" } }}>
                        {navItems.map((item) => (
                            <Link
                                key={item.id}
                                onClick={() => router.push(item.href)}
                                sx={{
                                    textDecoration: "none",
                                    color:
                                        activeNav === item.id
                                            ? theme.palette.primary.main
                                            : theme.palette.text.primary,
                                    mx: 2,
                                    fontSize: 18,
                                    cursor: "pointer",
                                    "&:hover": {
                                        color: theme.palette.primary.dark,
                                    },
                                }}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </Box>

                    {/***************************************************
                     * ACCOUNT/PROFILE MENU (DESKTOP ONLY)
                     ***************************************************/}
                    <Box
                        sx={{
                            display: {
                                xs: "none",
                                sm: "flex",
                                color: theme.palette.text.primary,
                            },
                            flex: 1,
                            justifyContent: "flex-end",
                            alignItems: "center",
                            textAlign: "right",
                        }}
                    >
                        {userSession !== null ? (
                            <UserMenu />
                        ) : (
                            <Button
                                variant="outlined"
                                onClick={() =>
                                    updateQuery({ view: Views.SIGN_IN })
                                }
                                sx={{
                                    px: 4,
                                }}
                            >
                                Sign In
                            </Button>
                        )}
                        <SignInDialog />
                        <SignUpDialog />
                    </Box>
                </Toolbar>
            </AppBar>
            {/***************************************************
             * MOBILE DRAWER
             ***************************************************/}
            <nav>
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: "block", sm: "none" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: drawerWidth,
                        },
                    }}
                >
                    {drawer}
                </Drawer>
            </nav>
            {/***************************************************
             * CHILDREN
             ***************************************************/}
            <Box component="main" sx={{ p: 2, width: "100%" }}>
                <Toolbar />
                {children}
            </Box>
        </Box>
    );
};

const drawerWidth = 260;
const navItems = [
    {
        id: "home",
        name: "Home",
        href: "/",
        icon: <HomeRoundedIcon className="w-8 h-8" />,
    },
    {
        id: "favourites",
        name: "Favorites",
        href: "/favorites",
        icon: <FavoriteRoundedIcon className="w-7 h-7" />,
    },
    {
        id: "style-guide",
        name: "Style Guide",
        href: "/style-guide",
        icon: <StyleIcon className="w-7 h-7" />,
    },
];

export default NavWrapper;
