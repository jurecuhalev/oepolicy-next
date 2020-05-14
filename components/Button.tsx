import React, { FunctionComponent } from "react";
import Link from "next/link";

const Button: FunctionComponent<{ href: string }> = ({ href, children }) => (
  <Link href={href}>
    <a className="button">{children}</a>
  </Link>
);

export default Button;
