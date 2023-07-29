"use client";
import "@/styles/globals.css";
import { Inter } from "next/font/google";
import Head from "@/app/head";
import Navbar from "@/components/navigation/navbar";
import toast, { Toaster } from "react-hot-toast";
import { useState, createContext, useEffect } from "react";

interface UserContextType {
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  signInPopUpVisible: boolean;
  setSignInPopUpVisible: React.Dispatch<React.SetStateAction<boolean>>;
  loginNotSignUp: boolean;
  setLoginNotSignUp: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UserContext = createContext<UserContextType>({
  loggedIn: false,
  setLoggedIn: () => {},
  username: "",
  setUsername: () => {},
  signInPopUpVisible: false,
  setSignInPopUpVisible: () => {},
  loginNotSignUp: true,
  setLoginNotSignUp: () => {},
});

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [signInPopUpVisible, setSignInPopUpVisible] = useState(false);
  const [loginNotSignUp, setLoginNotSignUp] = useState(true);

  useEffect(() => {
    fetch("https://nightbloom-search.net/account/current_user", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => {
        if (res.status === 500) {
          setLoggedIn(false);
          console.log(res);
        }
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setUsername(data.email);
        setLoggedIn(true);
      });
  }, []);

  return (
    <html lang="en">
      <Head />
      <UserContext.Provider
        value={{
          loggedIn,
          setLoggedIn,
          username,
          setUsername,
          signInPopUpVisible,
          setSignInPopUpVisible,
          loginNotSignUp,
          setLoginNotSignUp,
        }}
      >
        <body className={inter.className}>
          <Navbar />
          <Toaster />
          {children}
        </body>
      </UserContext.Provider>
    </html>
  );
}
