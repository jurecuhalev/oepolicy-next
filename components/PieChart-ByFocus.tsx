import { countBy } from "lodash";
import Plot from "react-plotly.js";
import React from "react";

const PieChartPoliciesByFocus = ({ items }) => {
  const data = countBy(
    items.flatMap((item) => {
      return item.about.focus ? item.about.focus : [];
    })
  );

  function handleClick(e) {
    if (e.points) {
      const point = e.points[0];
      const label = point.label;
      window.open(
        `https://oerworldmap.org/resource/?filter.about.%40type=%22Policy%22&filter.about.focus.keyword=%5B%22${label}%22%5D`,
        "_blank"
      );
      return false;
    }
  }

  function handleLegendClick(e) {
    const label = e.node.textContent;
    window.open(
      `https://oerworldmap.org/resource/?filter.about.%40type=%22Policy%22&filter.about.focus.keyword=%5B%22${label}%22%5D`,
      "_blank"
    );
    return false;
  }

  return (
    <div className="container">
      <Plot
        style={{ width: "100%", minHeight: "500px" }}
        data={[
          {
            values: Object.values(data),
            labels: Object.keys(data),
            type: "pie",
            automargin: true,
            sort: true,
            showlegend: true,
            textinfo: "text",
            textposition: "inside",
            texttemplate: "%{percent:1%f}",
            mode: "text",
            hole: 0.7,
          },
        ]}
        layout={{
          autosize: true,
        }}
        config={{ displaylogo: false, responsive: true }}
        onClick={handleClick}
        onLegendClick={handleLegendClick}
        onLegendDoubleClick={handleLegendClick}
      />
    </div>
  );
};

export default PieChartPoliciesByFocus;
