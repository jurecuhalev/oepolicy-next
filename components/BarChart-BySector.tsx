import React, { FunctionComponent, useRef } from "react";
import BarChart from "./BarChart";
import { dataWithMapping, urlMapping } from "../utils/charts";

const BarChartPoliciesBySector: FunctionComponent<{ items: any[] }> = ({
  items,
}) => {
  const data = dataWithMapping(items, "primarySector");
  return (
    <BarChart
      x={Object.values(data)}
      y={Object.keys(data)}
      text={Object.values(data).map(String)}
      filterName="filter.about.primarySector.@id"
      title="OE Policies by Primary Educational Sector"
      urlMapping={urlMapping(items, "primarySector")}
    />
  );
};

export default BarChartPoliciesBySector;
