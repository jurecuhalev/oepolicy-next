import Plot from "react-plotly.js";
import { d3 } from "plotly.js";
import React, { FunctionComponent, useRef } from "react";
import { stringify } from "querystring";
import { getURL } from "../utils/urls";
import { url } from "inspector";

// https://stackoverflow.com/a/51506718/141200
const wrap = (s: string, w: number): string =>
  s.replace(new RegExp(`(?![^\\n]{1,${w}}$)([^\\n]{1,${w}})\\s`, "g"), "$1\n");

const sanitizeLabel = (s: string): string => s.replace(/<[^>]+>/g, " ");

const buildFinalUrl = (
  filterName: string,
  label: string,
  urlMapping?: { name: string; id: string }
): string => {
  const qs = stringify({
    "filter.about.@type": "Policy",
    [filterName]: [urlMapping ? urlMapping[label] : label],
  });
  return getURL({
    path: process.env.NEXT_PUBLIC_RESOURCE_URL,
    params: {
      "filter.about.@type": "Policy",
      [filterName]: [urlMapping ? urlMapping[label] : label],
    },
  });
};

const BarChart: FunctionComponent<{
  x: any[];
  y: any[];
  text: string[];
  filterName: string;
  title: string;
  urlMapping?: { name: string; id: string };
}> = ({ x, y, text, filterName, title, urlMapping }) => {
  let plotRef = useRef(null);

  // Plotly doesn't support word wrap on legend items, so we manually add <br /> line breaks
  // (that we of have to later strip with `sanitizeLabel`
  y = y.map((item) => wrap(item, 20).replace(/(\r\n|\n|\r)/gm, "<br />"));

  function handleClick(e) {
    if (e.points) {
      const point = e.points[0];
      const label = sanitizeLabel(point.label);
      window.open(buildFinalUrl(filterName, label, urlMapping), "_blank");
      return false;
    }
  }

  const addExtraClickEvents = () => {
    console.log("extra events", filterName, urlMapping);
    console.log(d3.selectAll(".yaxislayer-above").selectAll("text"));
    d3.selectAll(".yaxislayer-above")
      .selectAll("text")
      .on("click", function (d) {
        console.log(d.text, filterName, urlMapping);
        const label = sanitizeLabel(d.text);
        window.open(buildFinalUrl(filterName, label, urlMapping), "_blank");
        return false;
      });
  };

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
          scrollZoom: false,
          displayModeBar: true,
          modeBarButtonsToRemove: [
            "zoom2d",
            "pan2d",
            "select2d",
            "lasso2d",
            "zoomIn2d",
            "zoomOut2d",
            "autoScale2d",
            "resetScale2d",
            "hoverClosestCartesian",
            "hoverCompareCartesian",
            "toImage",
            "toggleSpikelines",
          ],
        }}
        onClick={handleClick}
        onAfterPlot={addExtraClickEvents}
      />
    </div>
  );
};

export default BarChart;
