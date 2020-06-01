import { countBy } from "lodash";
import React, { FunctionComponent, useRef } from "react";
import BarChart from "./BarChart";
import { dataSimple } from "../utils/charts";

const BarChartPoliciesByLevel: FunctionComponent<{ items: any[] }> = ({
  items,
}) => {
  const data = dataSimple(items, "spatialCoverage");

  return (
    <BarChart
      x={Object.values(data)}
      y={Object.keys(data)}
      text={Object.values(data).map(String)}
      filterName="spatialCoverage"
      title="OE Policies by Level"
    />
  );
};

export default BarChartPoliciesByLevel;
