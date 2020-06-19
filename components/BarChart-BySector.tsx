import React, { FunctionComponent } from "react";
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
      fieldName="filter.about.primarySector.@id"
      title="OE Policies by Educational Sector"
      urlMapping={urlMapping(items, "primarySector")}
      bgColor="gray"
      sortData={true}
    />
  );
};

export default BarChartPoliciesBySector;
