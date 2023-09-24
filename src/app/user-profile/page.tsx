"use client"
import { useAuthContext } from "@/contexts/authContext";
import React from "react";

export default function UserProfile() {
  const { session } = useAuthContext();
  console.log(session);
  console.log(session?.email);

  return (
    <main className="container mx-auto px-4 max-w-screen-xl flex flex-col items-center">
        <div className="h-16"></div>
      <div>{session?.email}</div>
    </main>
  );
}
