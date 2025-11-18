import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
} from "recharts";
import type { WeeklyChartData } from "../../types";

type WeeklyChartProps = {
    title: string;
    data: WeeklyChartData[];
};

export default function WeeklyChart({ title, data }: WeeklyChartProps) {
    const chartData = data.length > 0 ? data : [{ day: "-", value: 0 }];
    const yAxisDomain = [0, 100];

    return (
        <div className="flex w-full flex-col p-2">
            <h4 className="mb-2 font-normal text-lg text-[#171817] text-center">
                {title}
            </h4>

            <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={chartData}
                        margin={{ top: 5, right: 5, left: -20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="6 6" vertical={false} />
                        <XAxis
                            dataKey="day"
                            tickLine={true}
                            axisLine={true}
                            fontSize={12}
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
                        />{" "}
                        <Bar dataKey="value" fill="#A7C1A8" barSize={50} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
