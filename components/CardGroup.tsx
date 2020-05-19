import React, { FunctionComponent } from "react";

const CardGroup: FunctionComponent<{ cols: number }> = ({ cols, children }) => (
  <div
    className={[
      "mt-20",
      "grid",

      "gap-6",
      "grid-cols-1",
      // PurgeCSS: md:grid-cols-2 md:grid-cols-3 md:grid-cols-4 md:grid-cols-5
      `md:grid-cols-${cols ? cols : 3}`,
    ].join(" ")}
  >
    {children}
  </div>
);

export default CardGroup;
