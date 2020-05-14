import React, { FunctionComponent } from "react";

type Props = {
  title: string;
  subtitle?: string;
  background: "white" | "gray";
};

const ContentBlock: FunctionComponent<Props> = ({
  title,
  subtitle,
  children,
  background,
}) => (
  <div
    className={[background === "white" ? "bg-white" : "bg-gray", ""].join(" ")}
  >
    <div className="container py-30 content">
      {subtitle && <h2 className="h3">{subtitle}</h2>}
      <h1 className="h2 mb-15">{title}</h1>
      {children}
    </div>
  </div>
);

export default ContentBlock;
