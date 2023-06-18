import React from "react";

type LinkButtonProps = {
  href: string;
  label: any;
};

const LinkButton = ({ href, label }: LinkButtonProps) => (
  <a
    href={href}
    className="text-[var(--lightest-grey)] transition-colors duration-300 mr-4 text-hover text-lg"
  >
    {label}
  </a>
);

export default LinkButton;
