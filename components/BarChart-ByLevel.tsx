import React, { FunctionComponent } from "react";
import BarChartNivo from "./BarChartNivo";
import { dataSimple } from "../utils/charts";
import { countBy, toPairs, sortBy } from "lodash";

const BarChartPoliciesByLevel: FunctionComponent<{ items: any[] }> = ({
  items,
}) => {
  const data = dataSimple(items, "spatialCoverage");
  delete data.undefined;

  const sortOrder = [
    "Multi-national",
    "National",
    "State",
    "Multi-regional",
    "Regional/Local",
    "Multi-Institutional",
    "Institutional",
    "Multi-departmental",
  ];

  let sortedPairs = toPairs(data);
  sortedPairs.sort((a, b) => {
    return sortOrder.indexOf(b[0]) - sortOrder.indexOf(a[0]);
  });

  const keys = sortedPairs.map(([k, _]) => k);
  const sortedData = sortedPairs.map(([k, v]) => {
    return { id: k, label: k, value: v };
  });

  return (
    <BarChartNivo
      data={sortedData}
      fieldName="filter.about.spatialCoverage"
      title="OE Policies by Level"
      bgColor="gray"
      sortData={false}
    />
  );
};

export default BarChartPoliciesByLevel;
