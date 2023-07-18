"use client";

import React, { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { NavItem } from "@/types/nav.type";
import { UserIcon } from "../assets/icons";
import { MenuButton } from "./menuButton";
import Logo from "./logo";
import LinkButton from "./linkButton";
import Link from "next/link";
import SignInPopup from "../sign-in/signInPopup";

const navItems: NavItem[] = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Favorites",
    href: "/favorites",
  },
  {
    name: "Style Guide",
    href: "/style-guide",
  },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [whichPage, setWhichPage] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [signInClicked, setSignInClicked] = useState(false);
  const [popUpVisible, setPopupVisible] = useState(false);
  const [signUpVisible, setSignUpVisible] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const [login, setLogin] = useState(false);

  const togglePopupVisible = () => setPopupVisible(!popUpVisible);
  const toggleSignInButton = () => setSignInClicked(!signInClicked);

  const closePopup = () => {
    setPopupVisible(false);
    setSignUp(false);
    setLogin(false);
  };

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (hasMounted) {
      setTimeout(() => {
        setSignUpVisible(!signUpVisible);
      }, 300);
    }
  }, [signInClicked]);

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
          className="mr-4"
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
      {popUpVisible && (
      <SignInPopup closePopup={closePopup} signUp={signUp} login={login}/>
      )}
      {/* Desktop view */}
      <div className="hidden md:flex flex-row justify-between px-4 container text-base max-w-screen-xl">
        <Logo />
        <div className="flex-auto flex flex-row justify-center items-center gap-x-2">
          {NavLinks}
        </div>
        <div className="flex-1 flex flex-row justify-end items-center">
          {loggedIn ? (
            <LinkButton onClick={toggleMenu} href="/" label={<UserIcon />} />
          ) : signUpVisible ? (
            <motion.div
              animate={{ x: 0 }}
              initial={{ x: 100 }}
              className="flex items-center justify-center text-[var(--lightest-grey)] text-base"
            >
              <div
                onClick={() => {
                  togglePopupVisible();
                  setSignUp(true);
                  setLogin(false);
                }}
                className={`${
                  signUp ? "text-[var(--pink)]" : "text-[var(--lightest-grey)]"
                } hover:text-[var(--pink)] cursor-pointer hover:-translate-y-1 duration-300`}
              >
                Sign Up &nbsp;
              </div>
              <div>| &nbsp;</div>
              <div
                onClick={() => {
                  togglePopupVisible();
                  setLogin(true);
                  setSignUp(false);
                }}
                className={`${
                  login ? "text-[var(--pink)]" : "text-[var(--lightest-grey)]"
                } hover:text-[var(--pink)] cursor-pointer hover:-translate-y-1 duration-300`}
              >
                Login
              </div>
            </motion.div>
          ) : (
            <div
              onClick={toggleSignInButton}
              className={`${
                signInClicked
                  ? "opacity-0 duration-300 translate-x-36"
                  : "block duration-300"
              } cursor-pointer px-3 py-1 border-2 border-[var(--pink)] rounded-full text-[var(--pink)] text-[1rem] hover:text-[var(--grey)] hover:bg-[var(--pink)] duration-300 hover:translate-y-0`}
            >
              Sign In
            </div>
          )}
        </div>
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
            {navItems.map((item: NavItem) => (
              <LinkButton
                key={item.name}
                href={item.href}
                label={item.name}
                onClick={() => {
                  toggleMenu();
                  setWhichPage(item.name);
                }}
                className={`mr-4 px-4 py-3 w-full ${
                  whichPage == item.name
                    ? "w-full bg-[var(--trans-grey)] rounded-full"
                    : ""
                }`}
              />
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default React.memo(Navbar);
