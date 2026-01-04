import { centiles, curveBuilder } from "@/lib/percentile-curve";
import { ChartContainer, type ChartConfig, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { CartesianGrid, XAxis, YAxis, LineChart, Line, ReferenceDot } from "recharts"
import { semanas } from "@/lib/percentile-curve";

const colors = ["#007ebc", "#ff0000", "#e66633", "#0a7500", "#74c0fc", "#0a7500", "#e66633", "#ff0000", "#007ebc", "#000000", "#000000"];

const chartData = (sex: 'M' | 'F') => semanas.map(w => {
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

export default function Grafica({sex, x, y, percentile} : {sex: 'F' | 'M', x: number , y: number , percentile: number | null}) {
    console.log(x)
    return (
        <ChartContainer config={chartConfig} className="h-150 w-[98%]">
            <LineChart accessibilityLayer data={chartData(sex)}>
                <ChartLegend content={<ChartLegendContent />} className="flex flex-wrap" />
                <CartesianGrid vertical={true} horizontal={true} />
                <XAxis
                    dataKey="week"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickCount={80}
                />
                <YAxis
                    dataKey="EFW_0_99"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickCount={25}
                />
                {centiles.map((centile, index) => (
                    <Line
                    key={centile}
                    type="natural"
                    dataKey={`EFW_${centile.replace('.','_')}`}
                    stroke={colors[index]}
                    dot={false}
                    strokeWidth={2}
                    />
                ))}
                {percentile !== null && <ReferenceDot x={x} y={y} r={2} fill="#000" stroke="#fff" strokeWidth={1} label={{ position: 'top', value: `${percentile}%` }} />}
            </LineChart>
      </ChartContainer>
      );
}

