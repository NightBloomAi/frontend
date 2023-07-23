import "@/styles/globals.css";
import { Inter } from "next/font/google";
import Head from "@/app/head";
import Navbar from "@/components/navigation/navbar";
import toast, { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head />
      <body className={inter.className}>
        <Navbar />
        <Toaster />
        {children}
      </body>
    </html>
  );
}
