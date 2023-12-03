/* eslint-disable @next/next/no-page-custom-font */

import { useThemeContext } from "@/context/theme.context";
import { Box } from "@mui/material";
import React from "react";
import { Toaster } from "react-hot-toast";
import NavWrapper from "../navigation/NavWrapper";
import Head from "next/head";

type Props = {
    children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
    const { theme } = useThemeContext();

    const metadata = {
        title: "NightBloom",
        description:
            "NightBloom is a tool that helps you find creative, unique, and AI-generated artworks.",
        url: "https://nightbloom.ai",
    };

    return (
        <React.Fragment>
            <Head>
                <title>{metadata.title}</title>
                <meta name="description" content={metadata.description} />
                <meta property="og:title" content={metadata.title} />
                <meta
                    property="og:description"
                    content={metadata.description}
                />
                <meta property="og:url" content={metadata.url} />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="/logo/logo.png" />
                <meta name="twitter:title" content={metadata.title} />
                <meta
                    name="twitter:description"
                    content={metadata.description}
                />
                <meta name="twitter:image" content="/logo/logo.png" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="logo/logo.svg" />
                <link rel="icon" href="logo/logo.svg" type="image/svg+xml" />
                <link rel="apple-touch-icon" href="logo/logo.png" />
                <link rel="icon" type="image/x-icon" href="/logo/logo.png" />
                <meta name="theme-color" content="#01282A" />
            </Head>
            <Box
                component="main"
                sx={{
                    backgroundColor: theme.palette.background.default,
                    maxWidth: "xl",
                    width: "100%",
                    height: "100%",
                    mx: "auto",
                }}
            >
                <Toaster />
                <NavWrapper>{children}</NavWrapper>
            </Box>
        </React.Fragment>
    );
};

export default Layout;
