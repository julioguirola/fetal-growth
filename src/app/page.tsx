"use client";
import {
  ChartContainer,
  type ChartConfig, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, LineChart, Line } from "recharts"
import { chartData, centiles, chartDataM } from "@/lib/percentile-curve";

const chartConfig = {
    EFW_0_99 : {
        label: "99%",
    },
    EFW_0_975 : {
        label: "97.5%",
    },
    EFW_0_95 : {
        label: "95%",
    },
    EFW_0_9 : {
        label: "90%",
    },
    EFW_0_75 : {
        label: "75%",
    },
    EFW_0_5 : {
        label: "50%",
    },
    EFW_0_25 : {
        label: "25%",
    },
    EFW_0_1 : {
        label: "10%",
    },
    EFW_0_05 : {
        label: "5%",
    },
    EFW_0_025 : {
        label: "2.5%",
    },
    EFW_0_01 : {
        label: "1%",
    },
} satisfies ChartConfig

export default function Home() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <ChartContainer config={chartConfig} className="h-full w-1/2">
        <LineChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="week"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
          />
          <YAxis
            dataKey="EFW_0_99"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickCount={20}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          {centiles.map(centile => (
            <Line
              key={centile}
              type="natural"
              dataKey={`EFW_${centile.replace('.','_')}`}
              stroke="pink"
            />
          ))}
        </LineChart>
      </ChartContainer>
      <ChartContainer config={chartConfig} className="h-full w-1/2">
        <LineChart accessibilityLayer data={chartDataM}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="week"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
          />
          <YAxis
            dataKey="EFW_0_99"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickCount={20}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          {centiles.map(centile => (
            <Line
              key={centile}
              type="natural"
              dataKey={`EFW_${centile.replace('.','_')}`}
            />
          ))}
        </LineChart>
      </ChartContainer>
    </div>
  );
}
