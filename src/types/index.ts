import type { SensorType } from "../schemas";

export type RecordParams = {
    supplyType?: SensorType;
    month?: string;
    year?: string;
    day?: string;
};

export type WeeklyChartData = {
    day: string;
    value: number;
    totalSec?: number;
};

export type TransformedWeek = {
    title: string;
    chartData: WeeklyChartData[];
};

export type MonthlyChartData = {
    month: string;
    value: number;
};

export type ViewMode = "month" | "year" | "day";
