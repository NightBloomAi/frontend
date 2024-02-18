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
    Link as MuiLink,
    useScrollTrigger,
} from "@mui/material";
import React, { useState } from "react";
import { useThemeContext } from "@/context/theme.context";
import { useAuthContext } from "@/context/auth.context";
import { useNavContext } from "@/context/nav.context";
import { updateQuery } from "@/utils/helperFunctions";
import { Views } from "@/models/view.models";
import { Logout } from "@mui/icons-material";
import { useRouter } from "next/router";
import AccountMenu from "./AccountMenu";
import MenuIcon from "@mui/icons-material/Menu";
import SignInDialog from "@/components/auth/SignInDialog";
import SignUpDialog from "@/components/auth/SignUpDialog";
import StyleIcon from "@mui/icons-material/Style";
import TopLoadingBar from "@/components/utils/TopLoadingBar";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import GradingIcon from "@mui/icons-material/Grading";
import ForogtPasswordDialog from "../auth/ForgotPasswordDialog";
import ResetPasswordDialog from "../auth/ResetPasswordDialog";
import BookIcon from "@mui/icons-material/Book";
import AboutMenu from "./AboutMenu";
import Link from "next/link";

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
                sx={{ my: 2, fontWeight: 600, cursor: "pointer" }}
                fontFamily={"MuseoModerno"}
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

                <Divider sx={{ mt: 1 }} />

                {/***************************************************
                 * MISC OPTIONS
                 ***************************************************/}
                <ListItem key={"privacy-policy"} disablePadding>
                    <ListItemButton
                        sx={{ textAlign: "left" }}
                        onClick={async () => {
                            router.push("/privacy-policy");
                        }}
                    >
                        <ListItemIcon>
                            <ShieldOutlinedIcon sx={{ fontSize: 26 }} />
                        </ListItemIcon>
                        <ListItemText primary={"Privacy Policy"} />
                    </ListItemButton>
                </ListItem>
                <ListItem key={"terms-of-service"} disablePadding>
                    <ListItemButton
                        sx={{ textAlign: "left" }}
                        onClick={async () => {
                            router.push("/terms-of-service");
                        }}
                    >
                        <ListItemIcon>
                            <GradingIcon sx={{ fontSize: 26 }} />
                        </ListItemIcon>
                        <ListItemText primary={"Terms of Service"} />
                    </ListItemButton>
                </ListItem>
                <Divider sx={{ mt: 1 }} />

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
                    <React.Fragment>
                        {/***************************************************
                         * ACCOUNT OPTIONS
                         ***************************************************/}
                        <ListItem key={"account-settings"} disablePadding>
                            <ListItemButton
                                sx={{ textAlign: "left" }}
                                onClick={async () => {
                                    router.push("/account-settings");
                                }}
                            >
                                <ListItemIcon>
                                    <SettingsOutlinedIcon
                                        sx={{ fontSize: 26 }}
                                    />
                                </ListItemIcon>
                                <ListItemText primary={"Account Settings"} />
                            </ListItemButton>
                        </ListItem>
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
                    </React.Fragment>
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
                        size="large"
                        sx={{ mr: 2, display: { sm: "none" } }}
                    >
                        <MenuIcon fontSize="large" />
                    </IconButton>
                    {/***************************************************
                     * LOGO
                     ***************************************************/}
                    <Typography
                        variant="h6"
                        component="div"
                        fontFamily={"MuseoModerno"}
                        color={"primary"}
                        onClick={() => router.push("/")}
                        sx={{
                            flex: 1,
                            cursor: "pointer",
                            display: {
                                xs: "none",
                                sm: "block",
                                fontWeight: 600,
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
                            <MuiLink
                                component={Link}
                                key={item.id}
                                href={item.href}
                                target={item.openInNewTab ? "_blank" : "_self"}
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
                            </MuiLink>
                        ))}

                        {/***************************************************
                         * ABOUT OPTIONS
                         ***************************************************/}
                        <AboutMenu />
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
                            <AccountMenu />
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
                        <ForogtPasswordDialog />
                        <ResetPasswordDialog />
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
    {
        id: "blog",
        name: "Blog",
        href: "https://www.blog.nightbloom.ai",
        openInNewTab: true,
        icon: <BookIcon className="w-7 h-7" />,
    },
];

export default NavWrapper;
