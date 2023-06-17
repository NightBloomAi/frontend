import React from "react";

export default function Loading() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32 animate-spin"></div>
    </div>
  );
}
