import React from "react";

export default function ErrorMsg({ error }: { error: string | null | undefined }) {
  return (
    <div>
      <div className="w-full flex justify-center items-center">
        <div className="text-center">
          <h1 className="text-4xl font-museo">Error</h1>
          <p>{error}</p>
        </div>
      </div>
    </div>
  );
}
