import { countBy } from "lodash";
import Plot from "react-plotly.js";
import Plotly, { d3 } from "plotly.js";
import React, { useRef } from "react";

const BarChartPolicesByFocus = ({ items }) => {
  let plotRef = useRef(null);
  const data = countBy(
    items.flatMap((item) => {
      return item.about.focus ? item.about.focus : [];
    })
  );

  function handleClick(e) {
    console.log(e);
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

  function addExtraClickEvents() {
    d3.selectAll(".yaxislayer-above")
      .selectAll("text")
      .on("click", function (d) {
        window.open(
          `https://oerworldmap.org/resource/?filter.about.%40type=%22Policy%22&filter.about.focus.keyword=%5B%22${d.text}%22%5D`,
          "_blank"
        );
        return false;
      });
  }

  return (
    <div className="container py-10">
      <Plot
        ref={plotRef}
        style={{ width: "100%", minHeight: "600px" }}
        data={[
          {
            type: "bar",
            x: Object.values(data),
            y: Object.keys(data),
            orientation: "h",
            text: Object.values(data).map(String),
            textposition: "outside",
            hoverinfo: "none",

            marker: {
              color: "#3E55CD",
            },
            transforms: [
              {
                type: "sort",
                target: "x",
                order: "ascending",
              },
            ],
          },
        ]}
        layout={{
          autosize: true,
          plot_bgcolor: "#EEEEEE",
          paper_bgcolor: "#EEEEEE",
          title: {
            text: "<b>OE Policies by Focus</b>",
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
          yaxis: {
            side: "right",
            fixedrange: true,
          },
          xaxis: {
            color: "#555555",
            gridcolor: "#BBBBBB",
            fixedrange: true,
          },
        }}
        config={{
          displaylogo: false,
          responsive: true,
          displayModeBar: false,
          scrollZoom: false,
        }}
        onClick={handleClick}
        onAfterPlot={addExtraClickEvents}
      />
    </div>
  );
};

export default BarChartPolicesByFocus;
