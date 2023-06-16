import React from "react";

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3 ${className}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  );
}

function UserIcon({ className }: { className?: string }) {
  return (
    <svg
      width="56"
      height="48"
      viewBox="0 0 56 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g clipPath="url(#clip0_53617_20029)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M28 14C22.48 14 18 18.48 18 24C18 29.52 22.48 34 28 34C33.52 34 38 29.52 38 24C38 18.48 33.52 14 28 14ZM34.36 28.83C32.93 27.09 29.46 26.5 28 26.5C26.54 26.5 23.07 27.09 21.64 28.83C20.62 27.49 20 25.82 20 24C20 19.59 23.59 16 28 16C32.41 16 36 19.59 36 24C36 25.82 35.38 27.49 34.36 28.83ZM24.5 21.5C24.5 19.56 26.06 18 28 18C29.94 18 31.5 19.56 31.5 21.5C31.5 23.44 29.94 25 28 25C26.06 25 24.5 23.44 24.5 21.5Z"
          fill="#CAC4D0"
        />
      </g>
      <defs>
        <clipPath id="clip0_53617_20029">
          <rect x="8" y="4" width="40" height="40" rx="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export { SearchIcon, UserIcon };
