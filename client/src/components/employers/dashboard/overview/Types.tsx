"use client";

import React from "react";
import { Chart, registerables } from "chart.js";
import { Pie } from "react-chartjs-2";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

Chart.register(...registerables);

const Types: React.FC<{ data: any }> = ({ data }) => {
  const chartData = {
    labels: data?.map((item: any) => item.label),
    datasets: [
      {
        data: data?.map((item: any) => item.value),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 133, 86, 0.2)",
          "rgba(255, 206, 36, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 133, 86, 1)",
          "rgba(255, 206, 36, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    maintainAspectRatio: false,
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Distribution of Job Types</CardTitle>
      </CardHeader>
      {data?.length !== 0 ? (
        <CardContent className="p-4">
          <Pie
            data={chartData}
            options={chartOptions}
            height={300}
            width={300}
          />
        </CardContent>
      ) : (
        <CardFooter>
          <p>No Data Available</p>
        </CardFooter>
      )}
    </Card>
  );
};

export default Types;
