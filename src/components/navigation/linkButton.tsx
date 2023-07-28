import Link from "next/link";
import React from "react";

type LinkButtonProps = {
  href: string;
  label: any;
  className?: string;
  onClick: ()=> void;
};

const LinkButton = ({ href, label, className, onClick }: LinkButtonProps) => (
  <Link
    href={href}
    className={`text-[var(--lightest-grey)] transition-colors duration-300 text-hover ${className}`}
    onClick={onClick}
  >
    {label}
  </Link>
);

export default LinkButton;
