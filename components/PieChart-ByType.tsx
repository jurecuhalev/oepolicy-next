import React, { FunctionComponent } from "react";
import PieChart from "./PieChart";
import { dataWithMapping, urlMapping } from "../utils/charts";

const PieChartByType: FunctionComponent<{ items: any[] }> = ({ items }) => {
  const data = dataWithMapping(items, "additionalType");

  return (
    <PieChart
      data={data}
      text={Object.values(data).map(String)}
      fieldName="filter.about.additionalType.@id"
      title="OE Policies by Type"
      urlMapping={urlMapping(items, "additionalType")}
    />
  );
};

export default PieChartByType;
