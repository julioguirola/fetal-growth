"use client";
import { Button } from "@/components/ui/button";
import {
  ChartContainer,
  type ChartConfig,
} from "@/components/ui/chart";
import { Bar, BarChart } from "recharts"
import { chartData, chartConfig } from "@/lib/percentile-curve";

export default function Home() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <Bar dataKey="points" fill="var(--color-desktop)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
