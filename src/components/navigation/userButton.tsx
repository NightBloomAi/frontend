import Link from "next/link";
import React, { Dispatch, SetStateAction, useContext } from "react";
import { UserIcon } from "../assets/icons";
import { motion } from "framer-motion";
import { useAuthContext } from "../../contexts/authContext";

interface UserButtonProps {
  toggleUserMenu: () => void;
  userMenu: boolean;
  setUserMenu: Dispatch<SetStateAction<boolean>>;
}

export default function UserButton({
  toggleUserMenu,
  userMenu,
  setUserMenu,
}: UserButtonProps) {
  const { username } = useAuthContext();
  return (
    <div
      className={` cursor-pointer text-[var(--lightest-grey)] transition-colors duration-300`}
    >
      {<UserIcon className={`${userMenu? 'opacity-0': 'opacity-100'} text-hover text-lg duration-300`} onClick={toggleUserMenu} />}
      <motion.div
        onClick={() => {
          setUserMenu(false);
        }}
        className={`${userMenu? 'w-full': 'w-0'} fixed top-0 bottom-0 left-0 right-0 z-50 flex justify-center items-center`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div
          className={`absolute xl:right-10 right-5 duration-300 ${
            userMenu
              ? "top-0 flex flex-col items-center justify-start text-base bg-[var(--opaque-trans-grey)] boxshadow p-2 rounded-b-lg "
              : "-top-60"
          } `}
        >
          <div className="text-[var(--onDark)] p-2 py-4 text-base" onClick={toggleUserMenu}>
            {username}
          </div>
          <Link href="/" className="text-hover p-2 py-4 text-base">
            Account settings
          </Link>
          <Link href="/" className="text-hover p-2 py-4 text-base">
            Sign out
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
