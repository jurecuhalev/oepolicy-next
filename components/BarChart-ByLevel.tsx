import { countBy } from "lodash";
import React, { FunctionComponent, useRef } from "react";
import BarChart from "./BarChart";

const BarChartPoliciesByLevel: FunctionComponent<{ items: any[] }> = ({
  items,
}) => {
  const data = countBy(
    items.flatMap((item) => {
      return item.about.spatialCoverage ? item.about.spatialCoverage : [];
    })
  );

  return (
    <BarChart
      x={Object.values(data)}
      y={Object.keys(data)}
      text={Object.values(data).map(String)}
      url={`https://oerworldmap.org/resource/?filter.about.%40type=%22Policy%22&filter.about.spatialCoverage=`}
      title="OE Policies by Level"
    />
  );
};

export default BarChartPoliciesByLevel;
