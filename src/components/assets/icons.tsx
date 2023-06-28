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

function CopyIcon({ className }: { className?: string }) {
  return (
    <svg
      width="14"
      height="16"
      viewBox="0 0 14 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M10.1821 0H1.45482C0.65482 0 0.000274658 0.654545 0.000274658 1.45455V11.6364H1.45482V1.45455H10.1821V0ZM12.3639 2.90909H4.36391C3.56391 2.90909 2.90937 3.56364 2.90937 4.36364V14.5455C2.90937 15.3455 3.56391 16 4.36391 16H12.3639C13.1639 16 13.8185 15.3455 13.8185 14.5455V4.36364C13.8185 3.56364 13.1639 2.90909 12.3639 2.90909ZM12.3639 14.5455H4.36391V4.36364H12.3639V14.5455Z"
        className={`fill-[var(--onDark)] ${className}`}
      />
    </svg>
  );
}

function LikeIcon({ className }: { className?: string }) {
  return (
    <svg
      width="18"
      height="16"
      viewBox="0 0 18 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M8.71962 16L7.45532 14.849C2.96485 10.7771 0.000274658 8.09155 0.000274658 4.79564C0.000274658 2.11008 2.11036 0 4.79592 0C6.31308 0 7.76921 0.706267 8.71962 1.82234C9.67003 0.706267 11.1262 0 12.6433 0C15.3289 0 17.439 2.11008 17.439 4.79564C17.439 8.09155 14.4744 10.7771 9.98393 14.8578L8.71962 16Z"
        className={`fill-[var(--onDark)] ${className}`}
      />
    </svg>
  );
}

function ExportIcon({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M14.0003 11V14H2.00027V11H0.000274658V14C0.000274658 15.1 0.900275 16 2.00027 16H14.0003C15.1003 16 16.0003 15.1 16.0003 14V11H14.0003ZM3.00027 5L4.41027 6.41L7.00027 3.83V12H9.00027V3.83L11.5903 6.41L13.0003 5L8.00027 0L3.00027 5Z"
        className={`fill-[var(--onDark)] ${className}`}
      />
    </svg>
  );
}

export { SearchIcon, UserIcon, CopyIcon, LikeIcon, ExportIcon };
