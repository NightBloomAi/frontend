"use client";

import { NavItem } from "@/types/nav.type";
import React from "react";
import { UserIcon } from "../assets/icons";
import { motion } from "framer-motion";
import { MenuButton } from "./menuButton";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const navItems: NavItem[] = [
    {
      name: "Home",
      href: "#",
    },
    {
      name: "Favorites",
      href: "#",
    },
    {
      name: "Style Guide",
      href: "#",
    },
  ];

  return (
    <div className="fixed z-30 bg-[var(--trans-grey)] h-16 w-screen flex items-center justify-center">
      {/* Desktop view */}
      <div className="hidden md:flex flex-row justify-between px-4 container text-base">
        {/* Logo */}
        <div className="flex-1 flex flex-row justify-start items-center">
          <a href="#" className="text-white">
            Night<span className="text-purple-500">Bloom</span>
          </a>
        </div>

        {/* Nav Links */}
        <div className="flex-auto flex flex-row justify-center items-center gap-x-2">
          {navItems.map((item: NavItem) => (
            <a
              key={item.name}
              href={item.href}
              className="text-white hover:text-gray-300 transition-colors duration-300 mr-4 text-hover"
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* User */}
        <div className="flex-1 flex flex-row justify-end items-center">
          <a
            href="#"
            className="text-white hover:text-gray-300 transition-colors duration-300"
          >
            <UserIcon />
          </a>
        </div>
      </div>

      {/* Mobile view */}
      <div className="z-50 md:hidden flex flex-row justify-end px-4 container text-base">
        <MenuButton
          isOpen={isMenuOpen}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          style={{ marginLeft: "2rem" }}
        />
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, x: "-100%" }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="z-40 fixed top-0 left-0 md:hidden flex flex-col h-screen w-screen bg-[var(--grey)] justify-start p-4"
        >
          {/* Logo */}
          <div className="flex-1 flex flex-row justify-start items-start">
            <a href="#" className="text-white">
              Night<span className="text-purple-500">Bloom</span>
            </a>
          </div>

          {/* Nav Links */}
          <div className="flex-auto flex flex-col justify-start items-start gap-y-4">
            {navItems.map((item: NavItem) => (
              <a
                key={item.name}
                href={item.href}
                className="text-white hover:text-gray-300 transition-colors duration-300 mr-4 text-hover"
              >
                {item.name}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
