import React, { FunctionComponent } from "react";
import Link from "next/link";

const Button: FunctionComponent<{ href: string }> = ({ href, children }) => {
  return (
    <>
      {href[0] === "/" ? (
        <Link href={href}>
          <a className="button">{children}</a>
        </Link>
      ) : (
        <a href={href} className="button">
          {children}
        </a>
      )}
    </>
  );
};

export default Button;
