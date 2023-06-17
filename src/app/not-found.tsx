"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <div className="flex flex-col w-screen h-screen justify-center items-center">
        <h1>404 - Page Not Found</h1>
        <br />
        <p>Sorry, there is nothing to see here</p>
      </div>
    </>
  );
}
