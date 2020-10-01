import React, { FunctionComponent } from "react";

const HeroHome: FunctionComponent = () => (
  <div className="hero-home">
    <div className="container flex flex-col justify-center">
      <h1 className="h3 mb-5">Open Education Policy Hub</h1>
      <h2 className="h1 mb-15">Shaping Open Futures in Education Together</h2>
      <p className="h3">
        A project by{" "}
        <a className="font-bold hover:text-pink" href="https://oerworldmap.org">
          OER World Map
        </a>
      </p>
    </div>
  </div>
);

export default HeroHome;
