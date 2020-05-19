import React, { FunctionComponent } from "react";

const CardGroup: FunctionComponent = ({ children }) => (
  <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-6">{children}</div>
);

export default CardGroup;
