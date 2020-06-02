import React, { FunctionComponent } from "react";
import { countBy, toPairs, fromPairs } from "lodash";
import countries from "../json/iso3166-1-alpha-2.json";
import Plot from "react-plotly.js";

const BarChartStackedRepository: FunctionComponent<{
  items: any[];
  services: any[];
}> = ({ items, services }) => {
  const servicesData = countBy(
    services.flatMap((item) => {
      if (item?.about?.location) {
        const location = item.about.location;
        return location.map((loc) => {
          return countries[loc.address.addressCountry];
        });
      }
      return [];
    })
  );

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

  const filteredData = fromPairs(
    toPairs(data).filter((item) => {
      const [k, ,] = item;
      return k in servicesData;
    })
  );
  const title = "Policies and Repositories by Country";

  const trace1 = {
    x: Object.keys(filteredData),
    y: Object.values(filteredData),
    type: "bar",
    name: "Policies",
  };

  const trace2 = {
    x: Object.keys(servicesData),
    y: Object.values(servicesData),
    type: "bar",
    name: "Repositories",
  };

  return (
    <div className="container py-10">
      <Plot
        data={[trace1, trace2]}
        style={{ width: "100%", minHeight: "600px" }}
        layout={{
          barmode: "group",
          autosize: true,
          plot_bgcolor: "#EEEEEE",
          paper_bgcolor: "#EEEEEE",
          title: {
            text: `<b>${title}</b>`,
            font: {
              family: "Courier Prime Sans, serif",
              size: 36,
            },
            x: 0,
          },
          margin: {
            r: 150,
            l: 5,
          },
          font: {
            family: "Source Sans Pro, sans-serif",
            size: 16,
            color: "#3E55CD",
          },
        }}
        config={{
          displaylogo: false,
          responsive: true,
          scrollZoom: false,
          displayModeBar: false,
        }}
      />
    </div>
  );
};

export default BarChartStackedRepository;
