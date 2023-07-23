"use client"
import "@/styles/globals.css";
import { Inter } from "next/font/google";
import Head from "@/app/head";
import Navbar from "@/components/navigation/navbar";
import toast, { Toaster } from "react-hot-toast";
// import { useState, createContext } from "react";

// interface UserContextType {
//   loggedIn: boolean;
//   setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
//   username: string;
//   setUsername: React.Dispatch<React.SetStateAction<string>>;
// }

// export const UserContext = createContext<UserContextType>({
//   loggedIn: false,
//   setLoggedIn: () => {},
//   username: '',
//   setUsername: () => {},
// });

const inter = Inter({ subsets: ["latin"] });
// const [loggedIn, setLoggedIn] = useState(false);
// const [username, setUsername] = useState("");

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head />
      {/* <UserContext.Provider value={{ loggedIn, setLoggedIn, username, setUsername }}> */}
        <body className={inter.className}>
          <Navbar />
          <Toaster />
          {children}
        </body>
      {/* </UserContext.Provider> */}
    </html>
  );
}
