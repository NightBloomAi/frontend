"use client";
import React, { useContext } from "react";
import { UserContext } from "../layout";

export default function FavouritesPage() {
  const { loggedIn } = useContext(UserContext);
  const { signInPopUpVisible } = useContext(UserContext);
  const { setSignInPopUpVisible } = useContext(UserContext);
  const { setLoginNotSignUp } = useContext(UserContext);
  return (
    <main className="container mx-auto px-4 max-w-screen-xl">
      {loggedIn ? (
        <div>favorites</div>
      ) : (
        <div className="flex h-screen w-full items-center justify-center text-center text-base">
          Please{" "}
          <span
            onClick={() => {
              setSignInPopUpVisible(true);
              setLoginNotSignUp(true);
            }}
            className={`m-2 cursor-pointer text-[var(--pink)] duration-300 hover:-translate-y-1 after:absolute hover:after:w-[2.65rem] after:w-0 after:duration-300 after:h-[0.15rem] after:bg-[var(--pink)] relative after:rounded-full after:left-0 after:-bottom-1`}
          >
            Login
          </span>{" "}
          to view your favorites
        </div>
      )}
    </main>
  );
}
