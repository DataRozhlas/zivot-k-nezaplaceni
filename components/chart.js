import dynamic from "next/dynamic";
import SharedTooltip from "../components/sharedTooltip";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const ResponsiveXYFrame = dynamic(
  () => import("semiotic/lib/ResponsiveXYFrame"),
  { ssr: false }
);

const DividedLine = dynamic(() => import("semiotic/lib/DividedLine"), {
  ssr: false,
});

function TickLine({ xy }) {
  return (
    <line
      key={`line-${xy.y1}-${xy.x1}`}
      x1={xy.x1}
      x2={xy.x2}
      y1={xy.y1}
      y2={xy.y2}
      style={{
        strokeDasharray: "3 3",
        stroke: "#CDCDCD",
        strokeOpacity: 0.4,
      }}
    />
  );
}

function getYAxis(props) {
  const step = (props.yMax - props.yMin) / 5;
  const yAxisTicks = Array.from(
    new Array(5 + 1),
    (x, i) => props.yMin + i * step
  );
  if (!props.showYAxis) {
    return {
      orient: "left",
      ticks: 0,
      baseline: false,
      showOutboundTickLines: false,
      tickLineGenerator: (e) => null,
      tickFormat: (e) => null,
    };
  }

  const getTickValue = (e) => {
    if (e === props.yMin || e === props.yMax) {
      return e + (props.nonpercentage ? "" : " %");
    }
    return null;
  };
  return {
    orient: "left",
    tickValues: yAxisTicks,
    baseline: false,
    showOutboundTickLines: false,
    tickLineGenerator: ({ xy }) => <TickLine xy={xy} key={uuidv4()} />,
    tickFormat: getTickValue,
    label: props.yLabel,
  };
}

const shortTick = (tick) => {
  // Handle date format like "DD. MM. YYYY"
  const parseTickToDate = (t) => {
    const dateParts = t.split(". ");
    if (dateParts.length === 3) {
      const day = parseInt(dateParts[0]);
      const month = parseInt(dateParts[1]);
      const year = parseInt(dateParts[2]);
      if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
        return new Date(year, month - 1, day);
      }
    }
    return null;
  };

  // If tick contains date-like format, try to parse it
  if (tick.includes("–")) {
    const parts = tick.split("–");
    const datePart = parts[parts.length - 1];
    const date = parseTickToDate(datePart);
    if (date instanceof Date && !isNaN(date.valueOf())) {
      return new Intl.DateTimeFormat("cs-CZ", {
        month: "short",
        year: "numeric",
      }).format(date);
    }
  }

  // For simple date format like "DD. MM. YYYY"
  const date = parseTickToDate(tick);
  if (date instanceof Date && !isNaN(date.valueOf())) {
    return new Intl.DateTimeFormat("cs-CZ", {
      month: "short",
      year: "numeric",
    }).format(date);
  }

  // For simple numeric ticks or other formats, return as is
  return tick;
};

function getXAxis(props, ticks) {
  console.log("getXAxis called with:", { props, ticks });

  // Create evenly distributed tick values between first and last
  const tickValues = [];
  const firstWeek = props.firstWeek;
  const lastWeek = props.firstWeek + props.ticks.length - 1;
  const range = lastWeek - firstWeek;

  // Use a fixed number of ticks that works well for most ranges
  const totalTicks = 12;

  // Calculate exact positions without rounding
  for (let i = 0; i < totalTicks; i++) {
    // Use exact fractional positioning
    const exactPosition = firstWeek + (i * range) / (totalTicks - 1);
    tickValues.push(exactPosition);
  }

  return {
    orient: "bottom",
    showOutboundTickLines: true,
    tickValues: tickValues,
    tickFormat: (d) => {
      const index = d - props.firstWeek;
      if (index < 0 || index >= props.ticks.length) {
        return "";
      }

      // Only show first and last labels
      const isFirst = index === 0;
      const isLast = index === props.ticks.length - 1;

      const shouldShowLabel = isFirst || isLast;
      const result = shouldShowLabel ? shortTick(props.ticks[index]) : "";

      console.log(
        `Tick ${index}: "${props.ticks[index]}" -> "${result}" (show: ${shouldShowLabel})`
      );
      return result;
    },
    tickLineGenerator: ({ xy }) => <TickLine xy={xy} key={uuidv4()} />,
  };
}

function generateAnnotations(props, dataLines, stacked) {
  if (props.annotation) {
    const tooltipAnnotations = dataLines
      .map((l, i) => {
        return {
          type: "frame-hover",
          x: props.annotation.week,
          y: stacked
            ? dataLines
                .slice(i)
                .map((pl) => pl[props.annotation.week - props.firstWeek])
                .reduce((a, b) => a + b, 0)
            : l[props.annotation.week - props.firstWeek],
          value: l[props.annotation.week - props.firstWeek],
        };
      })
      .slice(props.annotation.lineIndex, props.annotation.lineIndex + 1);
    const pointAnnotations = dataLines.map((l, i) => {
      return {
        type: "xy",
        x: props.annotation.week,
        y: stacked
          ? dataLines
              .slice(i)
              .map((pl) => pl[props.annotation.week - props.firstWeek])
              .reduce((a, b) => a + b, 0)
          : dataLines[i][props.annotation.week - props.firstWeek],
      };
    });

    return [
      {
        type: "x",
        week: props.annotation.week,
        disable: ["connector", "note"],
      },
    ]
      .concat(tooltipAnnotations)
      .concat(pointAnnotations);
  } else return [];
}

function getAreaLineStyle(dataColors, i) {
  return {
    fill: dataColors[i],
    fillOpacity: "1",
  };
}

function getLineLineStyle(lineStyles, dataColors, i, highlightedLineIndex) {
  const customLineStyle = lineStyles ? lineStyles[i] : undefined;
  if (customLineStyle === "dashed") {
    return {
      stroke: dataColors[i],
      strokeWidth: 1,
      strokeOpacity:
        highlightedLineIndex !== undefined
          ? i === highlightedLineIndex
            ? 1
            : 0.25
          : 1,
      fill: dataColors[i],
      strokeDasharray: i === 0 ? "10 10" : "5 5",
    };
  }

  return {
    stroke: dataColors[i],
    strokeWidth: i === highlightedLineIndex ? 4 : 2,
    strokeOpacity:
      highlightedLineIndex !== undefined
        ? i === highlightedLineIndex
          ? 1
          : 0.25
        : 1,
    fill: dataColors[i],
  };
}

function Chart({
  dataProps,
  chartType,
  filter,
  highlightedLineIndex,
  lineStyles,
}) {
  const dataLines = dataProps.values.lines.filter((_, i) =>
    filter ? filter.includes(i) : true
  );
  const dataColors = dataProps.colors.filter((_, i) =>
    filter ? filter.includes(i) : true
  );
  const stacked = chartType === "stackedarea";
  const lines = stacked
    ? dataLines.map((l, li) => {
        return {
          coordinates: l
            .map((v, i) => {
              return {
                week: i + dataProps.firstWeek,
                value: dataLines
                  .slice(li)
                  .map((pl) => pl[i])
                  .reduce((a, b) => a + b, 0),
              };
            })
            .filter((c) => c.value !== null),
        };
      })
    : dataLines.map((l, li) => {
        return {
          coordinates: l
            .map((v, i) => {
              return {
                week: i + dataProps.firstWeek,
                value: l[i],
              };
            })
            .filter((c) => c.value !== null),
        };
      });
  const annotations = generateAnnotations(dataProps, dataLines, stacked);

  const lineType = chartType === "stackedarea" ? "area" : undefined;
  const lineStyle = (d, i) => {
    return chartType === "stackedarea"
      ? getAreaLineStyle(dataColors, i)
      : getLineLineStyle(lineStyles, dataColors, i, highlightedLineIndex);
  };
  const tooltipLines = dataLines.map((line, lineIndex) => {
    return {
      lineValues: line,
      color: dataColors[lineIndex],
    };
  });
  const [ticks, setTicks] = useState(5); // Default to 5 ticks
  useEffect(() => {
    var chart = document.getElementsByClassName("chart-content")[0];
    if (!chart) return;

    const width = chart.offsetWidth;
    if (width === 0) return;

    // Simple calculation: show more ticks for wider charts
    let calculatedTicks;
    if (width < 400) {
      calculatedTicks = 3;
    } else if (width < 600) {
      calculatedTicks = 5;
    } else if (width < 800) {
      calculatedTicks = 7;
    } else {
      calculatedTicks = 10;
    }

    // Ensure we don't exceed the number of available data points
    const maxTicks = Math.min(calculatedTicks, dataProps.weeks);
    setTicks(Math.max(2, maxTicks)); // Always show at least 2 ticks
  });
  const frameProps = {
    lines: lines,
    size: dataProps.size,
    margin: {
      left: dataProps.yLabel ? 65 : 55,
      bottom: 50,
      right: 48,
      top: 10,
    },

    lineType: lineType,
    responsiveWidth: true,
    xAccessor: "week",
    yAccessor: "value",
    yExtent: [dataProps.yMin, dataProps.yMax],
    xExtent: [dataProps.firstWeek, dataProps.weeks + dataProps.firstWeek - 1],
    lineDataAccessor: "coordinates",
    // customLineMark: ({ d, i, xScale, yScale }) => {
    //   return (
    //     <DividedLine
    //       key={`threshold-${i}`}
    //       data={[d]}
    //       parameters={point => {
    //         if (point.week > 2 && point.week < 5) {
    //           return { stroke: "red", fill: "none" };
    //         }
    //         return { stroke: "rgb(77, 67, 12)", fill: "none" };
    //       }}
    //       customAccessors={{ x: d => xScale(d.x), y: d => yScale(d.y) }}
    //       lineDataAccessor={d => d.data}
    //     />
    //   );
    // },
    lineStyle: lineStyle,
    pointStyle: { fill: "none", stroke: "gray", strokeWidth: "1px" },
    axes: [getYAxis(dataProps), getXAxis(dataProps, ticks)],
    hoverAnnotation: [
      {
        type: "x",
        disable: ["connector", "note"],
      },
    ],
    annotations: annotations,
    //optimizeCustomTooltipPosition: true,
    customHoverBehavior: (x) =>
      dataProps.onHover ? dataProps.onHover(x) : null,
    tooltipContent: (d) => {
      return (
        <SharedTooltip
          firstWeek={dataProps.firstWeek}
          weeks={dataProps.weeks}
          week={d.x}
          lines={tooltipLines}
          nonpercentage={dataProps.nonpercentage}
          ticks={dataProps.ticks}
        />
      );
    },
  };
  return (
    <div>
      <h3
        style={{
          textAlign: "center",
          marginLeft: "50px",
          marginRight: "10px",
          textTransform: "uppercase",
          height: dataProps.title ? "2rem" : 0,
          overflow: "hidden",
        }}
      >
        {dataProps.title}
      </h3>
      <h4
        style={{
          textAlign: "center",
          margin: "0",
          marginLeft: "50px",
          marginRight: "10px",
          fontSize: "0.85rem",
          fontWeight: "normal",
        }}
      >
        {dataProps.subtitle}
      </h4>
      <div>
        <ResponsiveXYFrame {...frameProps} />
      </div>
    </div>
  );
}
export default Chart;
