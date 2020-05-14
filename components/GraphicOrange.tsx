import React, { FunctionComponent } from "react";
import PieChartColour from "../assets/svg/piechart_colour.svg";
import BarChartPink from "../assets/svg/barchart_pink.svg";

const GraphicOrange: FunctionComponent = ({}) => (
  <div className="graphic-orange" aria-hidden={true}>
    <div className="browser1">
      <img src="/img/browser.png" alt="" aria-hidden={true} />
      <PieChartColour />
    </div>
    <div className="browser2">
      <img src="/img/browser.png" alt="" aria-hidden={true} />
      <BarChartPink />
    </div>
  </div>
);

export default GraphicOrange;
