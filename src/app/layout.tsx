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
                            <Navbar />
                            <Toaster />
                            {children}
                        </AuthContextProvider>
                    </QueryClientProvider>
                </StageProvider>
            </body>
        </html>
    );
}
