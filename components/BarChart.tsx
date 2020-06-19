import Plot from "react-plotly.js";
import React, { FunctionComponent, useRef } from "react";
import { buildFinalUrl } from "../utils/urls";

// https://stackoverflow.com/a/51506718/141200
const wrap = (s: string, w: number): string =>
  s.replace(new RegExp(`(?![^\\n]{1,${w}}$)([^\\n]{1,${w}})\\s`, "g"), "$1\n");

const sanitizeLabel = (s: string): string => s.replace(/<[^>]+>/g, " ");

const BarChart: FunctionComponent<{
  x: number[];
  y: string[];
  text: string[];
  fieldName: string;
  title: string;
  urlMapping?: { name: string; id: string };
  bgColor?: "white" | "gray";
  sortData: boolean;
}> = ({ x, y, text, fieldName, title, urlMapping, bgColor, sortData }) => {
  const plotRef = useRef(null);

  // Plotly doesn't support word wrap on legend items, so we manually add <br /> line breaks
  // (that we of have to later strip with `sanitizeLabel`
  y = y.map((item) => wrap(item, 20).replace(/(\r\n|\n|\r)/gm, "<br />"));

  function handleClick(e) {
    if (e.points) {
      const point = e.points[0];
      const label = sanitizeLabel(point.label);
      window.open(buildFinalUrl(fieldName, label, urlMapping), "_blank");
      return false;
    }
  }

  const transforms = sortData
    ? [
        {
          type: "sort",
          target: "x",
          order: "ascending",
        },
      ]
    : [];

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
            transforms: transforms,
          },
        ]}
        layout={{
          autosize: true,
          plot_bgcolor: bgColor === "white" ? "#FFFFFF" : "#EEEEEE",
          paper_bgcolor: bgColor === "white" ? "#FFFFFF" : "#EEEEEE",
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
          scrollZoom: false,
          displayModeBar: false,
        }}
        onClick={handleClick}
      />
    </div>
  );
};

export default BarChart;
