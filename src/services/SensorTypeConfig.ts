import apiClient from "../lib/axios";
import { isAxiosError } from "axios";
import { SensorTypeConfigSchema, type SensorTypeConfig } from "../schemas";

export async function getSensorTypeConfig(): Promise<SensorTypeConfig> {
    try {
        const url = "/sensorTypeConfig/";
        const response = await apiClient.get(url);
        const parsedData = SensorTypeConfigSchema.parse(response.data);
        return parsedData;
    } catch (error) {
        throw new Error(
            isAxiosError(error)
                ? `API Error: ${error.response?.status} ${error.response?.statusText}`
                : "An unexpected error occurred"
        );
    }
}
