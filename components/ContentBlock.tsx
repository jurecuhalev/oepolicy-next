import React, { FunctionComponent } from "react";

type Props = {
  title: string;
  subtitle?: string;
  background: "white" | "gray";
  noTopPadding?: boolean;
};

const ContentBlock: FunctionComponent<Props> = ({
  title,
  subtitle,
  children,
  background,
  noTopPadding,
}) => (
  <div
    className={[background === "white" ? "bg-white" : "bg-gray", ""].join(" ")}
  >
    <div
      className={[
        noTopPadding === true ? "pt-0 pb-30" : "py-30",
        "container",
        "content",
      ].join(" ")}
    >
      {subtitle && <h2 className="h3">{subtitle}</h2>}
      {title && <h1 className="h2 mb-15">{title}</h1>}
      {children}
    </div>
  </div>
);

export default ContentBlock;
