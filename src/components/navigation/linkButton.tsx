import React from "react";

type LinkButtonProps = {
  href: string;
  label: any;
  className?: string;
};

const LinkButton = ({ href, label, className }: LinkButtonProps) => (
  <a
    href={href}
    className={`text-[var(--lightest-grey)] transition-colors duration-300 text-hover text-lg ${className}`}
  >
    {label}
  </a>
);

export default LinkButton;
