import { centiles, curveBuilder } from "@/lib/percentile-curve";
import {
  ChartContainer,
  type ChartConfig } from "@/components/ui/chart";
import { CartesianGrid, XAxis, YAxis, LineChart, Line } from "recharts"

const rangoSemanas = Array.from({length: 40 - 14 + 1}, (_, i) => i + 14);

const chartData = (sex: 'M' | 'F') => rangoSemanas.map(w => {
    let efws: Record<string, number> = {};
    for (const centile of centiles) {
        efws[`EFW_${centile.replace('.','_')}`] = curveBuilder(sex, centile)(w);
    }
    return {
        week: w,
        ...efws,
    }
});

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

export default function Grafica({sex} : {sex: 'F' | 'M'}) {
    return <ChartContainer config={chartConfig} className="h-150 w-[90%]">
        <LineChart accessibilityLayer data={chartData(sex)}>
          <CartesianGrid vertical={true} horizontal={true} />
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
          {centiles.map(centile => (
            <Line
              key={centile}
              type="natural"
              dataKey={`EFW_${centile.replace('.','_')}`}
              stroke={sex === 'F' ? "pink" : "#086bc1"}
              dot={false}
            />
          ))}
        </LineChart>
      </ChartContainer>
}

