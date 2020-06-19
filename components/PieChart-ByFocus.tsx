import React, { FunctionComponent } from "react";
import PieChart from "./PieChart";
import { dataSimple, dataWithMapping, urlMapping } from "../utils/charts";

const PieChartPoliciesByFocus: FunctionComponent<{ items: any[] }> = ({
  items,
}) => {
  const data = dataSimple(items, "focus");
  delete data.undefined;

  return (
    <PieChart
      data={data}
      text={Object.values(data).map(String)}
      fieldName="filter.about.focus.keyword"
      title="OE Policies by Focus / Policy Dimensions"
      // urlMapping={urlMapping(items, "focus")}
    />
  );
};

export default PieChartPoliciesByFocus;
