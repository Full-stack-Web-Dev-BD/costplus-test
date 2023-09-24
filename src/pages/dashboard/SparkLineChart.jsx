import React from "react";
import Chartist from "react-chartist";
import ChartistTooltip from "chartist-plugin-tooltips-updated";

export const LineChart = ({series}) => {
  const data = {
    series:series
  };

  const options = {
    low: 0,
    showArea: true,
    fullWidth: true,
    axisX: {
      position: "end",
      showGrid: true,
    },
    axisY: {
      showGrid: false,
      showLabel: false,
      labelInterpolationFnc: (value) => `$${value / 1}k`,
    },
  };

  const plugins = [ChartistTooltip()];

  return (
    <Chartist
      data={data}
      options={{ ...options, plugins }}
      type="Line"
      className="ct-series-g ct-double-octave"
      style={{ height: '100px' }} 
    />
  );
};
