import Plot from "react-plotly.js";
import React, { FunctionComponent } from "react";
import { piecolors } from "../utils/colors";
import { buildFinalUrl } from "../utils/urls";
import { toPairs, sortBy } from "lodash";

const PieChart: FunctionComponent<{
  data: object;
  text: string[];
  fieldName: string;
  title: string;
  urlMapping?: { name: string; id: string };
}> = ({ data, text, fieldName, title, urlMapping }) => {
  function handleClick(e) {
    if (e.points) {
      const point = e.points[0];
      const label = point.label;
      window.open(buildFinalUrl(fieldName, label, urlMapping), "_blank");
      return false;
    }
  }

  function handleLegendClick(e) {
    const label = e.node.textContent;
    window.open(buildFinalUrl(fieldName, label, urlMapping), "_blank");
    return false;
  }

  const sortedData = sortBy(toPairs(data), [
    (o) => {
      return o[1];
    },
  ]).reverse();

  return (
    <div className="container pt-10">
      <Plot
        style={{ width: "100%", minHeight: "600px" }}
        data={[
          {
            values: sortedData.map(([_, v]) => v),
            labels: sortedData.map(([k, _]) => k),
            type: "pie",
            automargin: true,
            sort: false,
            direction: "clockwise",
            showlegend: true,
            textinfo: "text",
            textposition: "inside",
            texttemplate: "%{percent:1%f}",
            mode: "text",
            hole: 0.7,
            marker: {
              colors: piecolors,
            },
          },
        ]}
        layout={{
          autosize: true,
          plot_bgcolor: "transparent",
          paper_bgcolor: "transparent",
          title: {
            text: `<b>${title}</b>`,
            font: {
              family: "Courier Prime Sans, serif",
              size: 36,
            },
            x: 0,
          },
          margin: {
            l: 0,
          },
          font: {
            family: "Source Sans Pro, sans-serif",
            size: 16,
            color: "#3E55CD",
          },
        }}
        config={{ displaylogo: false, responsive: true, displayModeBar: false }}
        onClick={handleClick}
        onLegendClick={handleLegendClick}
        onLegendDoubleClick={handleLegendClick}
      />
    </div>
  );
};

export default PieChart;
