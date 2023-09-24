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

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const queryClient = new QueryClient();

    return (
        <html lang="en">
            <Head />
            <body className={`${inter.className} overflow-x-hidden`}>
                <StageProvider>
                    <QueryClientProvider client={queryClient}>
                        <AuthContextProvider>
                            <ThemeProvider theme={themeLight}>
                                <Navbar />
                                <Toaster />
                                <main className="mx-auto px-4 max-w-screen-xl h-[calc(100%-4rem)]">
                                    <div className="h-16"></div>
                                    {children}
                                </main>
                            </ThemeProvider>
                        </AuthContextProvider>
                    </QueryClientProvider>
                </StageProvider>
            </body>
        </html>
    );
}
