import React, { FunctionComponent, useRef } from "react";
import { buildFinalUrl } from "../utils/urls";
import { ResponsiveBar } from "@nivo/bar";

const sanitizeLabel = (s: string): string => s.replace(/<[^>]+>/g, " ");

const BarChartNivo: FunctionComponent<{
  data: { label: string; value: number }[];
  fieldName: string;
  title: string;
  urlMapping?: { name: string; id: string };
  bgColor?: "white" | "gray";
  sortData: boolean;
}> = ({ data, fieldName, title, urlMapping, bgColor, sortData }) => {
  const policyTheme = {
    background: "transparent",
    fontFamily: "Source Sans Pro, sans-serif",
    fontSize: 16,
    textColor: "#3E55CD",
    axis: {
      domain: {
        line: {
          stroke: "transparent",
          strokeWidth: 1,
        },
      },
      ticks: {
        line: {
          stroke: "#bbbbbb",
          strokeWidth: 1,
        },
        text: {},
      },
      legend: {
        text: {
          fontSize: 12,
        },
      },
    },
    grid: {
      line: {
        stroke: "#bbbbbb",
        strokeWidth: "1px",
      },
    },
    legends: {
      text: {
        fill: "#333333",
      },
    },
    labels: {
      text: {},
    },
    markers: {
      lineColor: "#000000",
      lineStrokeWidth: 1,
      text: {},
    },
    dots: {
      text: {},
    },
    tooltip: {
      container: {
        background: "white",
        color: "inherit",
        fontSize: "inherit",
        borderRadius: "2px",
        boxShadow: "0 1px 2px rgba(0, 0, 0, 0.25)",
        padding: "5px 9px",
      },
      basic: {
        whiteSpace: "pre",
        display: "flex",
        alignItems: "center",
      },
      chip: {
        marginRight: 7,
      },
      table: {},
      tableCell: {
        padding: "3px 5px",
      },
    },
    crosshair: {
      line: {
        stroke: "#000000",
        strokeWidth: 1,
        strokeOpacity: 0.75,
        strokeDasharray: "6 6",
      },
    },
    annotations: {
      text: {
        fontSize: 13,
        outlineWidth: 2,
        outlineColor: "#ffffff",
      },
      link: {
        stroke: "#000000",
        strokeWidth: 1,
        outlineWidth: 2,
        outlineColor: "#ffffff",
      },
      outline: {
        fill: "none",
        stroke: "#000000",
        strokeWidth: 2,
        outlineWidth: 2,
        outlineColor: "#ffffff",
      },
      symbol: {
        fill: "#000000",
        outlineWidth: 2,
        outlineColor: "#ffffff",
      },
    },
  };

  function handleClick(e) {
    if (e) {
      const label = sanitizeLabel(e.indexValue);
      window.open(buildFinalUrl(fieldName, label, urlMapping), "_blank");
      return false;
    }
  }

  return (
    <div className="container py-10 w-full">
      <h2 className={"h2"}>{title}</h2>
      <div style={{ height: "600px" }}>
        <ResponsiveBar
          data={data}
          indexBy="label"
          layout="horizontal"
          label="value"
          keys={["value"]}
          enableLabel={true}
          labelTextColor="#ffffff"
          colors={["#3e55cd"]}
          isInteractive={false}
          axisRight={{
            tickSize: 0,
            tickPadding: 40,
            tickRotation: 0,
            legend: "",
            legendPosition: "middle",
            legendOffset: 40,
          }}
          enableGridX={true}
          enableGridY={false}
          axisLeft={null}
          margin={{ top: 50, right: 200, bottom: 50, left: 10 }}
          theme={policyTheme}
          onClick={handleClick}
        />
      </div>
    </div>
  );
};

export default BarChartNivo;
