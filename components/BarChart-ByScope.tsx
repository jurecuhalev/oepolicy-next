import React, { FunctionComponent } from "react";
import BarChart from "./BarChart";
import { dataWithMapping, urlMapping } from "../utils/charts";

const BarChartPoliciesByScope: FunctionComponent<{ items: any[] }> = ({
  items,
}) => {
  const data = dataWithMapping(items, "scope");

  return (
    <BarChart
      x={Object.values(data)}
      y={Object.keys(data)}
      text={Object.values(data).map(String)}
      fieldName="filter.about.scope.@id"
      title="OE Policies by Scope"
      urlMapping={urlMapping(items, "scope")}
    />
  );
};

export default BarChartPoliciesByScope;
