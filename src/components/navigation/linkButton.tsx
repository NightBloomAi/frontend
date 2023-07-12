import Link from "next/link";
import React from "react";

type LinkButtonProps = {
  href: string;
  label: any;
  className?: string;
};

const LinkButton = ({ href, label, className }: LinkButtonProps) => (
  <Link
    href={href}
    className={`text-[var(--lightest-grey)] transition-colors duration-300 text-hover text-lg ${className}`}
  >
    {label}
  </Link>
);

export default LinkButton;
