/* eslint-disable @next/next/no-page-custom-font */
import React from "react";

export default function Head() {
  const metadata = {
    title: "NightBloom",
    description:
      "NightBloom is a tool that helps you find creative, unique, and AI-generated artworks.",
    url: "https://nightbloom.ai",
  };

  return (
    <head>
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
      <meta property="og:title" content={metadata.title} />
      <meta property="og:description" content={metadata.description} />
      <meta property="og:url" content={metadata.url} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="/logo/logo.png" />
      <meta name="twitter:title" content={metadata.title} />
      <meta name="twitter:description" content={metadata.description} />
      <meta name="twitter:image" content="/logo/logo.png" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="logo/logo.svg" />
      <link rel="icon" href="logo/logo.svg" type="image/svg+xml" />
      <link rel="apple-touch-icon" href="logo/logo.png" />
      <link rel="icon" type="image/x-icon" href="/logo/logo.png" />
      <meta name="theme-color" content="#01282A" />

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Comfortaa&family=MuseoModerno&display=swap"
        rel="stylesheet"
      />
    </head>
  );
}
