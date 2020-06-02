import { countBy, toPairs, sortBy } from "lodash"
import Plot from "react-plotly.js"
import React from "react"
import { piecolors } from "../utils/colors"

const PieChartPoliciesByFocus = ({ items }) => {
  const data = countBy(
    items.flatMap((item) => {
      return item.about.focus ? item.about.focus : []
    })
  )
  const sortedData = sortBy(toPairs(data), [
    (o) => {
      return o[1]
    },
  ]).reverse()

  function handleClick(e) {
    if (e.points) {
      const point = e.points[0]
      const label = point.label
      window.open(
        `https://oerworldmap.org/resource/?filter.about.%40type=%22Policy%22&filter.about.focus.keyword=%5B%22${label}%22%5D`,
        "_blank"
      )
      return false
    }
  }

  function handleLegendClick(e) {
    const label = e.node.textContent
    window.open(
      `https://oerworldmap.org/resource/?filter.about.%40type=%22Policy%22&filter.about.focus.keyword=%5B%22${label}%22%5D`,
      "_blank"
    )
    return false
  }

  return (
    <div className="container py-10">
      <Plot
        style={{ width: "100%", minHeight: "600px" }}
        data={[
          {
            values: sortedData.map((v) => v[1]),
            labels: sortedData.map((v) => v[0]),
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
            l: 0,
          },
          font: {
            family: "Source Sans Pro, sans-serif",
            size: 16,
            color: "#3E55CD",
          },
        }}
        config={{ displaylogo: false, responsive: true }}
        onClick={handleClick}
        onLegendClick={handleLegendClick}
        onLegendDoubleClick={handleLegendClick}
      />
    </div>
  )
}

export default PieChartPoliciesByFocus
