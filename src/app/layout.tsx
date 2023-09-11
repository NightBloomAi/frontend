"use client";

import "@/styles/globals.css";
import { Inter } from "next/font/google";
import AuthContextProvider from "@/contexts/authContext";
import React from "react";
import Head from "@/app/head";
import Navbar from "@/components/navigation/navbar";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";
import { StageProvider } from "@/contexts/stageContext";
import { themeLight } from "@/styles/theme";
import { ThemeProvider } from "@mui/material";

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
            <body className={inter.className}>
                <StageProvider>
                    <QueryClientProvider client={queryClient}>
                        <AuthContextProvider>
                            <ThemeProvider theme={themeLight}>
                                <Navbar />
                                <Toaster />
                                {children}
                            </ThemeProvider>
                        </AuthContextProvider>
                    </QueryClientProvider>
                </StageProvider>
            </body>
        </html>
    );
}
