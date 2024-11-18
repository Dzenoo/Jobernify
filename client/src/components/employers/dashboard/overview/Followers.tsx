"use client";

import React from "react";
import { Chart, registerables } from "chart.js";
import { Line } from "react-chartjs-2";
import { useTheme } from "next-themes";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

import { getMonthsLabels } from "@/lib/utils";

Chart.register(...registerables);

const Followers: React.FC<{ data: any }> = ({ data }) => {
  const { resolvedTheme } = useTheme();
  const labels = getMonthsLabels();

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Followers",
        data: data,
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Number of Followers",
          color: resolvedTheme === "dark" ? "white" : "black",
        },
        ticks: {
          stepSize: 1,
          precision: 0,
          color: resolvedTheme === "dark" ? "white" : "black",
        },
        grid: {
          color:
            resolvedTheme === "dark"
              ? "rgba(255, 255, 255, 0.1)"
              : "rgba(0, 0, 0, 0.1)",
        },
      },
      x: {
        title: {
          display: true,
          text: "Month",
          color: resolvedTheme === "dark" ? "white" : "black",
        },
        ticks: {
          color: resolvedTheme === "dark" ? "white" : "black",
        },
        grid: {
          color:
            resolvedTheme === "dark"
              ? "rgba(255, 255, 255, 0.1)"
              : "rgba(0, 0, 0, 0.1)",
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: resolvedTheme === "dark" ? "white" : "black",
        },
      },
    },
  };

  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle>Total Followers Over Time</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 p-4">
        {data ? (
          <div className="h-full">
            <Line
              width={250}
              height={250}
              data={chartData}
              options={chartOptions}
            />
          </div>
        ) : (
          <CardFooter>
            <p>No Data Available</p>
          </CardFooter>
        )}
      </CardContent>
    </Card>
  );
};

export default Followers;
