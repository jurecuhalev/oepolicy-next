import React, { FunctionComponent } from "react";
import URL from "url";

interface ICard {
  type: "tool" | "paper";
  author: string;
  title: string;
  description: string;
  href: string;
  maphref: string;
}

const Card: FunctionComponent<ICard> = ({
  type,
  author,
  title,
  description,
  href,
  maphref,
}) => (
  <article className="bg-white rounded border-blue border px-4 py-3 card font-sans-source flex flex-col">
    <h1 className="font-bold mb-1">{title}</h1>
    <div className="card__description flex-grow">
      {type === "tool" && <div>{author}</div>}
      {description && <div>{description}</div>}
    </div>

    <div className="card__links mt-6">
      <a
        className="block truncate"
        href={href}
        target="_blank"
        rel="noreferrer noopener"
      >
        {URL.parse(href).host}
      </a>
      {maphref && (
        <a
          className="block truncate"
          href={maphref}
          target="_blank"
          rel="noreferrer noopener"
        >
          oerworldmap.org
        </a>
      )}
    </div>
  </article>
);

export default Card;
