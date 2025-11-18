import apiClient from "../lib/axios";
import { isAxiosError } from "axios";
import { ESP32TypesArraySchema, type ESP32TypesArray } from "../schemas";

export async function getESP32Alerts(): Promise<ESP32TypesArray> {
    try {
        const url = "/esp32Type";
        const response = await apiClient.get(url);
        const parsedData = ESP32TypesArraySchema.parse(response.data);
        return parsedData;
    } catch (error) {
        throw new Error(
            isAxiosError(error)
                ? `API Error: ${error.response?.status} ${error.response?.statusText}`
                : "An unexpected error occurred"
        );
    }
}
