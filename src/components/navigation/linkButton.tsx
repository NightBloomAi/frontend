import React from "react";

type LinkButtonProps = {
  href: string;
  label: any;
};

const LinkButton = ({ href, label }: LinkButtonProps) => (
  <a
    href={href}
    className="text-white hover:text-gray-300 transition-colors duration-300 mr-4 text-hover"
  >
    {label}
  </a>
);

export default LinkButton;
