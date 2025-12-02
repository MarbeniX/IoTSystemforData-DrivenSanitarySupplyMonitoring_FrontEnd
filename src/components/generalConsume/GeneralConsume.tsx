import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { ESPType } from "../../schemas";
import SimpleStatCard from "./StatCard";
import { SENSOR_META } from "../../meta";
import type { RecordParams, ViewMode } from "../../types";
import PeriodSelector from "./PeriodSelector";
import DateSelector from "./DateSelector";
import { getSuppliesRecordsByDayOrMonthOrYear } from "../../services/Records";

type GeneralConsumeProps = {
    soapDispensePerUse: number;
    tankFlushCapacity: number;
    towelLengthPerUse: number;
    oldestRecordTimestamp: string | null;
};

export default function GeneralConsume({
    soapDispensePerUse,
    tankFlushCapacity,
    towelLengthPerUse,
    oldestRecordTimestamp,
}: GeneralConsumeProps) {
    const [viewMode, setViewMode] = useState<ViewMode>("day");
    const [currentDate, setCurrentDate] = useState(new Date());

    const queryParams = useMemo(() => {
        const params: RecordParams = {};
        if (viewMode === "day") {
            params.day = format(currentDate, "yyyy-MM-dd");
        } else if (viewMode === "month") {
            params.month = format(currentDate, "yyyy-MM");
        } else if (viewMode === "year") {
            params.year = format(currentDate, "yyyy");
        }
        return params;
    }, [viewMode, currentDate]);

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["historicStats", queryParams],
        queryFn: () => getSuppliesRecordsByDayOrMonthOrYear(queryParams),
    });

    return (
        <section className="font-sans w-full max-w-md">
            <h2 className="text-3xl font-medium text-neutral-800 mb-4">
                Consumo general
            </h2>

            <PeriodSelector viewMode={viewMode} setViewMode={setViewMode} />

            <div className="bg-white p-6 rounded-b-xl rounded-tr-xl shadow-md">
                <DateSelector
                    viewMode={viewMode}
                    currentDate={currentDate}
                    setCurrentDate={setCurrentDate}
                    oldestRecordTimestamp={oldestRecordTimestamp}
                />

                {isLoading && <div className="text-center">Cargando...</div>}
                {isError && (
                    <div className="text-center text-red-500">
                        Error:{" "}
                        {error instanceof Error
                            ? error.message
                            : "Unknown error"}
                    </div>
                )}

                {data && !isLoading && (
                    <div className="grid grid-cols-2 gap-4">
                        {data.result.map((item) => {
                            if (item.sensorType === ESPType.MASTER) return null;
                            const info = SENSOR_META[item.sensorType];
                            return (
                                <SimpleStatCard
                                    key={item.sensorType}
                                    sensorType={item.sensorType}
                                    value={item.count}
                                    icon={<info.icon />}
                                    totalSec={item.totalSec}
                                    soapDispensePerUse={soapDispensePerUse}
                                    tankFlushCapacity={tankFlushCapacity}
                                    towelLengthPerUse={towelLengthPerUse}
                                />
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
}
