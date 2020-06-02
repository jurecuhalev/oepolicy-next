import React, { FunctionComponent } from "react";
import { countBy } from "lodash";
import BarChart from "./BarChart";
import countries from "../json/iso3166-1-alpha-2.json";

const BarChartPoliciesByCountry: FunctionComponent<{ items: any[] }> = ({
  items,
}) => {
  const data = countBy(
    items.flatMap((item) => {
      if (item.about?.location) {
        const location = item.about.location;
        return location.map((loc) => {
          return countries[loc.address.addressCountry];
        });
      }
      return [];
    })
  );

  return (
    <BarChart
      x={Object.values(data)}
      y={Object.keys(data)}
      text={Object.values(data).map(String)}
      fieldName="about.location.address.addressCountry"
      title="OE Policies by Country"
    />
  );
};

export default BarChartPoliciesByCountry;
