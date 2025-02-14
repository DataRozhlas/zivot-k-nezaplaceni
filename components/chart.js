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
      tickLineGenerator: e => null,
      tickFormat: e => null,
    };
  }

  const getTickValue = e => {
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

const shortTick = tick => {
  const parseTickToDate = t => {
    const dateParts = t.split(". ");
    if (dateParts.length === 3)
      return new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
    else return null;
  };
  const parts = tick.split("–");
  const datePart = parts[parts.length - 1];
  const date = parseTickToDate(datePart);
  if (date instanceof Date && !isNaN(date.valueOf())) {
    const firstPart = tick.replace(datePart, "");
    return `${new Intl.DateTimeFormat("cs-CZ", { month: "short", year: "2-digit" }).format(date)}`;
  }

  return tick;
};

function getXAxis(props, ticks) {
  var mod;
  for (mod = 1; mod < 100; mod++) {
    if (props.weeks / mod <= ticks) {
      break;
    }
  }

  const maxCount = props.ticks.length / mod;
  const getTickValue = e => {
    const index = e - props.firstWeek;
    const isFirst = index === 0;
    const isLast = index === props.ticks.length - 1;
    if (ticks === 0) {
      return isFirst || isLast ? `${shortTick(props.ticks[index])}` : null;
    }

    const isModth = index % mod === 0;
    const isInLimit = index / mod + 1 <= maxCount;
    return (isModth && isInLimit) || isLast
      ? `${shortTick(props.ticks[index])}`
      : null;
  };
  return {
    orient: "bottom",
    showOutboundTickLines: true,
    ticks: props.weeks > 30 ? props.weeks / 4 : props.weeks,
    tickFormat: getTickValue,
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
              .map(pl => pl[props.annotation.week - props.firstWeek])
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
            .map(pl => pl[props.annotation.week - props.firstWeek])
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
                .map(pl => pl[i])
                .reduce((a, b) => a + b, 0),
            };
          })
          .filter(c => c.value !== null),
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
          .filter(c => c.value !== null),
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
  const [ticks, setTicks] = useState(2);
  useEffect(() => {
    var chart = document.getElementsByClassName("chart-content")[0];
    const width = chart.offsetWidth;
    const averageTickLength =
      dataProps.ticks.map(t => shortTick(t).length).reduce((a, b) => a + b) /
      dataProps.ticks.length;
    const maxCount = width / (averageTickLength * 50);
    const ticks = Math.min(dataProps.weeks, Math.round(maxCount));
    setTicks(ticks);
  });
  const frameProps = {
    lines: lines,
    size: dataProps.size,
    margin: {
      left: dataProps.yLabel ? 65 : 55,
      bottom: 50,
      right: 45,
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
    //         console.log(d);
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
    customHoverBehavior: x => (dataProps.onHover ? dataProps.onHover(x) : null),
    tooltipContent: d => {
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
