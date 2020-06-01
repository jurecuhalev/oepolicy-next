import { countBy } from "lodash";
import React, { FunctionComponent, useRef } from "react";
import BarChart from "./BarChart";
import { dataSimple } from "../utils/charts";

const BarChartPoliciesByFocus: FunctionComponent<{ items: any[] }> = ({
  items,
}) => {
  const data = dataSimple(items, "focus");

  return (
    <BarChart
      x={Object.values(data)}
      y={Object.keys(data)}
      text={Object.values(data).map(String)}
      filterName="focus"
      title="OE Policies by Focus"
    />
  );
};

export default BarChartPoliciesByFocus;
