import apiClient from "../lib/axios";
import { isAxiosError } from "axios";
import {
    DayMonthOrYearSuppliesRecordsSchema,
    LatestRecordsSchema,
    MonthlyOrYearlyRecordsBySupplyTypeSchema,
    SupplyHistoricArraySchema,
    TodaySoapTowelSummarySchema,
    type DayMonthOrYearSuppliesRecords,
    type LatestRecords,
    type MonthlyOrYearlyRecordsBySupplyType,
    type SupplyHistoricArray,
    type TodaySoapTowelSummary,
} from "../schemas";
import type { RecordParams } from "../types";

export async function getHistoricSummary(): Promise<SupplyHistoricArray> {
    try {
        const url = "/records/historic-summary";
        const response = await apiClient.get(url);
        const parsedData = SupplyHistoricArraySchema.parse(response.data);
        return parsedData;
    } catch (error) {
        throw new Error(
            isAxiosError(error)
                ? `API Error: ${error.response?.status} ${error.response?.statusText}`
                : "An unexpected error occurred"
        );
    }
}

export async function getTodaySoapTowelSummary(): Promise<TodaySoapTowelSummary> {
    try {
        const url = "/records/today-soap-towel-summary";
        const response = await apiClient.get(url);
        const parsedData = TodaySoapTowelSummarySchema.parse(response.data);
        return parsedData;
    } catch (error) {
        throw new Error(
            isAxiosError(error)
                ? `API Error: ${error.response?.status} ${error.response?.statusText}`
                : "An unexpected error occurred"
        );
    }
}

export async function getLastRecords(): Promise<LatestRecords> {
    try {
        const url = "/records/latest-records";
        const response = await apiClient.get(url);
        const parsedData = LatestRecordsSchema.parse(response.data);
        return parsedData;
    } catch (error) {
        throw new Error(
            isAxiosError(error)
                ? `API Error: ${error.response?.status} ${error.response?.statusText}`
                : "An unexpected error occurred"
        );
    }
}

export async function getMontlyOrYearlyRecordsBySupplyType(
    params: RecordParams
): Promise<MonthlyOrYearlyRecordsBySupplyType> {
    try {
        const url = "/records/monthly-or-yearly-records-by-supply-type";
        const response = await apiClient.get(url, { params });
        const parsedData = MonthlyOrYearlyRecordsBySupplyTypeSchema.parse(
            response.data
        );
        return parsedData;
    } catch (error) {
        throw new Error(
            isAxiosError(error)
                ? `API Error: ${error.response?.status} ${error.response?.statusText}`
                : "An unexpected error occurred"
        );
    }
}

export async function getSuppliesRecordsByDayOrMonthOrYear(
    params: RecordParams
): Promise<DayMonthOrYearSuppliesRecords> {
    try {
        const url = "/records/day-month-or-year-supplies-records";
        const response = await apiClient.get(url, { params });
        const parsedData = DayMonthOrYearSuppliesRecordsSchema.parse(
            response.data
        );
        return parsedData;
    } catch (error) {
        throw new Error(
            isAxiosError(error)
                ? `API Error: ${error.response?.status} ${error.response?.statusText}`
                : "An unexpected error occurred"
        );
    }
}
