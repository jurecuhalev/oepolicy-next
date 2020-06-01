import Plot from "react-plotly.js";
import { d3 } from "plotly.js";
import React, { FunctionComponent, useRef } from "react";

const BarChart: FunctionComponent<{
  x: any[];
  y: any[];
  text: string[];
  url: string;
  title: string;
}> = ({ x, y, text, url, title }) => {
  let plotRef = useRef(null);

  function handleClick(e) {
    if (e.points) {
      const point = e.points[0];
      const label = point.label;
      const finalUrl = `${url}%5B%22${label}%22%5D`;
      window.open(finalUrl, "_blank");
      return false;
    }
  }

  function addExtraClickEvents() {
    d3.selectAll(".yaxislayer-above")
      .selectAll("text")
      .on("click", function (d) {
        const finalUrl = `${url}%5B%22${d.text}%22%5D`;
        window.open(finalUrl, "_blank");
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
            x,
            y,
            text,
            orientation: "h",
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

export default BarChart;
