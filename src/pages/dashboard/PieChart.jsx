import React from "react";
import ReactApexChart from "react-apexcharts";

const PieChart = ({ spended }) => {
  const options = {
    legend: {
      show: false, // This line disables the legend
    },
    colors: ["#3459D0", "#E3E6ED"],
    chart: {
      type: "donut",
    },
    label: false,

    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        dataLabels: {
          enabled: false, // Disable series label
          formatter: function (val, opts) {
            return opts.w.config.series[opts.seriesIndex] + "%";
          },
        },
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  return (
    <div id="chart"> 
      {spended < 1  ? (
        <ReactApexChart options={options} series={[1 ,100- spended]} type="donut" />
      ) : (
        <ReactApexChart options={options} series={[spended ,100- spended]} type="donut" />
        
      )}
    </div>
  );
};

export default PieChart;
