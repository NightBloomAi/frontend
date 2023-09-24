"use client";

import "@/styles/globals.css";
import { Inter } from "next/font/google";
import React from "react";
import Head from "@/app/head";
import Navbar from "@/components/navigation/navbar";
import AuthContextProvider from "@/contexts/authContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { StageProvider } from "@/contexts/stageContext";
import { ThemeProvider } from "@mui/material";
import { themeLight } from "@/styles/theme";
import { Toaster } from "react-hot-toast";
import { UserFavProvider } from "@/contexts/userFavContext";
import { NavProvider } from "@/contexts/navContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const queryClient = new QueryClient();

    return (
        <html lang="en" suppressHydrationWarning>
            <Head />
            <body className={inter.className}>
                <StageProvider>
                    <QueryClientProvider client={queryClient}>
                        <AuthContextProvider>
                            <UserFavProvider>
                                <ThemeProvider theme={themeLight}>
                                    <NavProvider>
                                        <Navbar />
                                        <Toaster />
                                        <main className="mx-auto px-4 max-w-screen-xl h-[calc(100%-4rem)]">
                                            <div className="h-16"></div>
                                            {children}
                                        </main>
                                    </NavProvider>
                                </ThemeProvider>
                            </UserFavProvider>
                        </AuthContextProvider>
                    </QueryClientProvider>
                </StageProvider>
            </body>
        </html>
    );
}
