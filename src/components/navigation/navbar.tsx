"use client";

import React, { useState, useMemo, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { NavItem } from "@/types/nav.type";
import { FavIcon, UserIcon, HomeIcon, SignOutIcon, SignInIcon } from "../assets/icons";
import { MenuButton } from "./menuButton";
import Logo from "./logo";
import LinkButton from "./linkButton";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StyleIcon from '@mui/icons-material/Style';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import SignInButton from "./SignInButton";
import { AuthContext } from "../contexts/authcontext";

const navItems: NavItem[] = [
  {
    name: "Home",
    href: "/",
    icon: <HomeOutlinedIcon className="w-7 h-7" />,
  },
  {
    name: "Favorites",
    href: "/favorites",
    icon: <FavoriteIcon className="w-7 h-7"/>,
  },
  {
    name: "Style Guide",
    href: "/style-guide",
    icon: <StyleIcon className="w-7 h-7"/>,
  },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [whichPage, setWhichPage] = useState("");
  const { loggedIn } = useContext(AuthContext);

  const mobileNavItems: NavItem[] = [
    {
      name: "Home",
      href: "/",
      icon: <HomeOutlinedIcon className="h-7 w-7"/>,
    },
    {
      name: "Favorites",
      href: "/favorites",
      icon: <FavoriteIcon className="h-7 w-7"/>,
    },
    {
      name: "Style Guide",
      href: "/style-guide",
      icon: <StyleIcon className="h-7 w-7"/>,
    },
    {
      name: loggedIn ? "Sign Out" : "Sign In",
      href: loggedIn ? "/sign-out" : "/sign-in",
      icon: loggedIn ? <LogoutIcon className="h-7 w-7" /> : <AccountCircleRoundedIcon className="h-7 w-7" />,
    },
  ];

  const toggleMenu = () => setIsMenuOpen((prevState) => !prevState);

  const NavLinks = useMemo(
    () =>
      navItems.map((item: NavItem) => (
        <LinkButton
          key={item.name}
          href={item.href}
          label={item.name}
          onClick={() => {
            toggleMenu;
            setWhichPage(item.name);
          }}
          className="mr-4 text-lg"
        />
      )),
    []
  );

  const handleScroll = () => {
    if (window.scrollY > 64) {
      const currentScrollPos = window.scrollY;

      if (currentScrollPos > prevScrollPos) {
        setVisible(false);
      }
      setPrevScrollPos(currentScrollPos);
    } else {
      setVisible(true);
    }
  };

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  return (
    <div
      className={`fixed z-30 h-16 w-screen flex items-center justify-center ${
        visible ? "bg-transparent" : "bg-[var(--trans-grey)]"
      }`}
    >
      
      {/* Desktop view */}
      <div className="hidden md:flex flex-row justify-between px-4 container text-base max-w-screen-xl">
        <Logo />
        <div className="flex-auto flex flex-row justify-center items-center gap-x-2">
          {NavLinks}
        </div>
        <SignInButton />
      </div>

      {/* Mobile view */}
      <div className="z-50 md:hidden flex flex-row justify-end px-4 container text-base">
        <MenuButton
          isOpen={isMenuOpen}
          onClick={toggleMenu}
          style={{ marginLeft: "2rem" }}
        />
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, x: "-100%" }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="z-40 fixed top-0 left-0 md:hidden flex flex-col h-screen w-screen bg-[var(--grey)] justify-start items-start p-4"
        >
          <Logo />
          <div className="flex-auto flex flex-col justify-start items-start gap-y-4 w-full">
            {mobileNavItems.map((item: NavItem) => (
              <div
                className={`mr-4 px-5 py-3 w-full text-lg flex items-center justify-start gap-x-3 ${
                  whichPage == item.name
                    ? "w-full bg-[var(--trans-grey)] rounded-full"
                    : ""
                }`}
              >
                {item.icon}
                <LinkButton
                  key={item.name}
                  href={item.href}
                  label={item.name}
                  onClick={() => {
                    toggleMenu();
                    setWhichPage(item.name);
                  }}
                />
                
              </div>
              
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default React.memo(Navbar);
