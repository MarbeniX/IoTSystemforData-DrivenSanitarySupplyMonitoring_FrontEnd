import { z } from "zod";

export enum SensorType {
    PAPER = 0,
    TANK = 1,
    SOAP = 2,
    WATER = 3,
    TOWEL = 4,
}

export enum ESPType {
    PAPER = SensorType.PAPER,
    TANK = SensorType.TANK,
    SOAP = SensorType.SOAP,
    WATER = SensorType.WATER,
    TOWEL = SensorType.TOWEL,
    MASTER = 5,
}

const ESPTypeSchema = z.nativeEnum(ESPType);

export const ESP32TypesArraySchema = z.object({
    message: z.string(),
    data: z.array(
        z.object({
            _id: z.string(),
            espType: ESPTypeSchema,
            alertMessage: z.number(),
        })
    ),
});

export const SupplyHistoricArraySchema = z.object({
    message: z.string(),
    result: z.array(
        z.object({
            count: z.number(),
            sensorType: ESPTypeSchema,
            totalSec: z.number().optional(),
        })
    ),
});

export const SensorTypeConfigSchema = z.object({
    message: z.string(),
    data: z.object({
        _id: z.string(),
        soapCapacity: z.number(),
        soapDispensePerUse: z.number(),
        tankFlushCapacity: z.number(),
        totalTowelLength: z.number(),
        towelLengthPerUse: z.number(),
        watterPressure: z.number(),
    }),
});

export const TodaySoapTowelSummarySchema = z.object({
    message: z.string(),
    result: z.object({
        soapCount: z.number(),
        towelCount: z.number(),
    }),
});

export const LatestRecordsSchema = z.object({
    message: z.string(),
    result: z.array(
        z.object({
            _id: z.string(),
            sensorType: ESPTypeSchema,
            timestamp: z.string(),
            seconds: z.number().optional(),
            revolutions: z.number().optional(),
        })
    ),
});

const RecordEntrySchema = z.object({
    label: z.string(),
    count: z.number(),
    totalSec: z.number().optional(),
});

export const MonthlyOrYearlyRecordsBySupplyTypeSchema = z.object({
    message: z.string(),
    result: z.array(RecordEntrySchema),
});

export const DayMonthOrYearSuppliesRecordsSchema = SupplyHistoricArraySchema;

export type ESP32TypesArray = z.infer<typeof ESP32TypesArraySchema>;
export type SupplyHistoricArray = z.infer<typeof SupplyHistoricArraySchema>;
export type SensorTypeConfig = z.infer<typeof SensorTypeConfigSchema>;
export type TodaySoapTowelSummary = z.infer<typeof TodaySoapTowelSummarySchema>;
export type LatestRecords = z.infer<typeof LatestRecordsSchema>;
export type RecordEntry = z.infer<typeof RecordEntrySchema>;
export type MonthlyOrYearlyRecordsBySupplyType = z.infer<
    typeof MonthlyOrYearlyRecordsBySupplyTypeSchema
>;
export type DayMonthOrYearSuppliesRecords = z.infer<
    typeof DayMonthOrYearSuppliesRecordsSchema
>;
