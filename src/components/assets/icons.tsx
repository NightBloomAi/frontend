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

function fingerprintIcon({ className }: { className?: string }) {
  return (
    <svg
      width="14"
      height="15"
      viewBox="0 0 14 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.392 2.73688C10.3453 2.73688 10.2987 2.72521 10.2578 2.70188C9.13782 2.12438 8.16949 1.87938 7.00865 1.87938C5.85365 1.87938 4.75699 2.15354 3.75949 2.70188C3.61949 2.77771 3.44449 2.72521 3.36282 2.58521C3.28699 2.44521 3.33949 2.26438 3.47949 2.18854C4.56449 1.59938 5.75449 1.29604 7.00865 1.29604C8.25115 1.29604 9.33615 1.57021 10.5262 2.18271C10.672 2.25854 10.7245 2.43354 10.6487 2.57354C10.5962 2.67854 10.497 2.73688 10.392 2.73688ZM2.04449 5.79938C1.98615 5.79938 1.92782 5.78188 1.87532 5.74688C1.74115 5.65354 1.71199 5.47271 1.80532 5.33854C2.38282 4.52188 3.11782 3.88021 3.99282 3.43104C5.82449 2.48604 8.16949 2.48021 10.007 3.42521C10.882 3.87438 11.617 4.51021 12.1945 5.32104C12.2878 5.44938 12.2587 5.63604 12.1245 5.72938C11.9903 5.82271 11.8095 5.79354 11.7162 5.65938C11.1912 4.92438 10.5262 4.34688 9.73865 3.94438C8.06449 3.08688 5.92365 3.08688 4.25532 3.95021C3.46199 4.35854 2.79699 4.94188 2.27199 5.67688C2.22532 5.75854 2.13782 5.79938 2.04449 5.79938ZM5.69032 12.8402C5.61449 12.8402 5.53865 12.811 5.48615 12.7527C4.97865 12.2452 4.70449 11.9185 4.31365 11.2127C3.91115 10.4952 3.70115 9.62021 3.70115 8.68104C3.70115 6.94854 5.18282 5.53688 7.00282 5.53688C8.82282 5.53688 10.3045 6.94854 10.3045 8.68104C10.3045 8.84438 10.1762 8.97271 10.0128 8.97271C9.84949 8.97271 9.72115 8.84438 9.72115 8.68104C9.72115 7.26938 8.50199 6.12021 7.00282 6.12021C5.50365 6.12021 4.28449 7.26938 4.28449 8.68104C4.28449 9.52104 4.47115 10.2969 4.82699 10.9269C5.20032 11.5977 5.45699 11.8835 5.90615 12.3385C6.01699 12.4552 6.01699 12.636 5.90615 12.7527C5.84199 12.811 5.76615 12.8402 5.69032 12.8402ZM9.87282 11.761C9.17865 11.761 8.56615 11.586 8.06449 11.2419C7.19532 10.6527 6.67615 9.69604 6.67615 8.68104C6.67615 8.51771 6.80449 8.38938 6.96782 8.38938C7.13115 8.38938 7.25949 8.51771 7.25949 8.68104C7.25949 9.50354 7.67949 10.2794 8.39115 10.7577C8.80532 11.0377 9.28949 11.1719 9.87282 11.1719C10.0128 11.1719 10.2462 11.1544 10.4795 11.1135C10.637 11.0844 10.7887 11.1894 10.8178 11.3527C10.847 11.5102 10.742 11.6619 10.5787 11.691C10.2462 11.7552 9.95449 11.761 9.87282 11.761ZM8.70032 12.9627C8.67699 12.9627 8.64782 12.9569 8.62449 12.951C7.69699 12.6944 7.09032 12.3502 6.45449 11.726C5.63782 10.9152 5.18865 9.83604 5.18865 8.68104C5.18865 7.73604 5.99365 6.96604 6.98532 6.96604C7.97699 6.96604 8.78199 7.73604 8.78199 8.68104C8.78199 9.30521 9.32449 9.81271 9.99532 9.81271C10.6662 9.81271 11.2087 9.30521 11.2087 8.68104C11.2087 6.48188 9.31282 4.69688 6.97949 4.69688C5.32282 4.69688 3.80615 5.61854 3.12365 7.04771C2.89615 7.52021 2.77949 8.07438 2.77949 8.68104C2.77949 9.13604 2.82032 9.85354 3.17032 10.7869C3.22865 10.9385 3.15282 11.1077 3.00115 11.1602C2.84949 11.2185 2.68032 11.1369 2.62782 10.991C2.34199 10.2269 2.20199 9.46854 2.20199 8.68104C2.20199 7.98104 2.33615 7.34521 2.59865 6.79104C3.37449 5.16354 5.09532 4.10771 6.97949 4.10771C9.63365 4.10771 11.792 6.15521 11.792 8.67521C11.792 9.62021 10.987 10.3902 9.99532 10.3902C9.00365 10.3902 8.19865 9.62021 8.19865 8.67521C8.19865 8.05104 7.65615 7.54354 6.98532 7.54354C6.31449 7.54354 5.77199 8.05104 5.77199 8.67521C5.77199 9.67271 6.15699 10.606 6.86282 11.306C7.41699 11.8544 7.94782 12.1577 8.77032 12.3852C8.92782 12.426 9.01532 12.5894 8.97449 12.741C8.94532 12.8752 8.82282 12.9627 8.70032 12.9627Z"
        fill="fill-[var(--onDark)]"
      />
    </svg>
  );
}

export { SearchIcon, UserIcon, CopyIcon, LikeIcon, ExportIcon };
