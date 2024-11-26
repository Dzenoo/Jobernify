"use client";

import React from "react";

import { Chart, registerables } from "chart.js";
import { Bar } from "react-chartjs-2";
import { useTheme } from "next-themes";

import { getMonthsLabels } from "@/lib/utils";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

Chart.register(...registerables);

const JobsPerMonth: React.FC<{ data: any }> = ({ data }) => {
  const { resolvedTheme } = useTheme();
  const labels = getMonthsLabels();

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Jobs",
        data: data,
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
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
          text: "Number of Jobs",
          color: resolvedTheme === "dark" ? "white" : "black",
        },
        ticks: {
          color: resolvedTheme === "dark" ? "white" : "black",
          stepSize: 1,
          precision: 0,
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
        <CardTitle>Number of Jobs Posted Per Month</CardTitle>
      </CardHeader>
      {data ? (
        <CardContent className="flex-1 p-4">
          <div className="h-full">
            <Bar
              width={250}
              height={250}
              data={chartData}
              options={chartOptions}
            />
          </div>
        </CardContent>
      ) : (
        <CardFooter>
          <p>No Data Available</p>
        </CardFooter>
      )}
    </Card>
  );
};

export default JobsPerMonth;
