import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
} from "recharts";
import type { MonthlyChartData } from "../../types";

type AnnnualChartProps = {
    data: MonthlyChartData[];
};
export default function AnnualChart({ data: ANNUAL_DATA }: AnnnualChartProps) {
    const yAxisDomain = [0, 100];
    const barColor = "#A7C1A8";

    return (
        <section className="font-sans w-ful rounded-lg">
            <div className="w-full h-72">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={ANNUAL_DATA}
                        margin={{
                            top: 5,
                            right: 10,
                            left: -20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="6 6" vertical={false} />

                        <XAxis
                            dataKey="month"
                            tickLine={true}
                            axisLine={true}
                            fontSize={12}
                            stroke="#666"
                        />

                        <YAxis
                            domain={yAxisDomain}
                            ticks={[0, 25, 50, 75, 100]}
                            tickLine={true}
                            axisLine={true}
                            fontSize={12}
                        />

                        <Tooltip
                            cursor={{ fill: "rgba(200, 200, 200, 0.2)" }}
                            contentStyle={{
                                backgroundColor: "white",
                                borderRadius: "8px",
                                borderColor: "#ccc",
                            }}
                            labelStyle={{ color: "#333", fontWeight: "bold" }}
                        />

                        <Bar dataKey="value" fill={barColor} barSize={50} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </section>
    );
}
