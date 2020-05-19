import React, { FunctionComponent } from "react";

const CardGroup: FunctionComponent<{ cols: number }> = ({ cols, children }) => (
  <div
    className={[
      "mt-20",
      "grid",

      "gap-6",
      "grid-cols-1",
      `md:grid-cols-${cols}`,
    ].join(" ")}
  >
    {children}
  </div>
);

export default CardGroup;
