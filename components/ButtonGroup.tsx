import React, { FunctionComponent } from "react";
import Link from "next/link";

const ButtonGroup: FunctionComponent = ({ children }) => (
  <div className="my-20 button-group">{children}</div>
);

export default ButtonGroup;
