"use client";
import "@/styles/globals.css";
import { Inter } from "next/font/google";
import Head from "@/app/head";
import Navbar from "@/components/navigation/navbar";
import toast, { Toaster } from "react-hot-toast";
import { useState, createContext, useEffect, useContext } from "react";
import AuthContextProvider, { AuthContext } from "@/components/contexts/authcontext";


const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {loggedIn, setLoggedIn} = useContext(AuthContext);
  const {username, setUsername} = useContext(AuthContext);
  const {signInPopUpVisible, setSignInPopUpVisible} = useContext(AuthContext);
  const {loginNotSignUp, setLoginNotSignUp} = useContext(AuthContext);

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
      <AuthContextProvider>
        <body className={inter.className}>
          <Navbar />
          <Toaster />
          {children}
        </body>
        </AuthContextProvider>
      
    </html>
  );
}
