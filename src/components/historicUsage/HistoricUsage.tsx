import { useQuery } from "@tanstack/react-query";
import HistaticUsageCard from "./HistoricUsageCard";
import { getHistoricSummary } from "../../services/Records";
import { SENSOR_META } from "../../meta";

type ConsuptionStatsProps = {
    soapDispensePerUse: number;
    tankFlushCapacity: number;
    towelLengthPerUse: number;
};

export default function ConsumptionStats({
    soapDispensePerUse,
    tankFlushCapacity,
    towelLengthPerUse,
}: ConsuptionStatsProps) {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["historicSummary"],
        queryFn: getHistoricSummary,
    });

    return (
        <section className="font-sans w-full">
            <h2 className="text-3xl font-medium text-neutral-800 mb-6 pl-2">
                Consumo histórico
            </h2>

            {isLoading && (
                <div className="h-64 flex justify-center items-center">
                    Cargando datos...
                </div>
            )}

            {isError && (
                <div className="h-64 flex justify-center items-center text-red-500">
                    Error: {error.message}
                </div>
            )}

            {data && !isLoading && (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
                        {data.result.map((stat) => {
                            const info = SENSOR_META[stat.sensorType];
                            return (
                                <HistaticUsageCard
                                    key={stat.sensorType}
                                    count={stat.count}
                                    totalSec={stat.totalSec}
                                    sensorType={stat.sensorType}
                                    label={info.label}
                                    icon={<info.icon />}
                                    unit={info.unit}
                                    soapDispensePerUse={soapDispensePerUse}
                                    tankFlushCapacity={tankFlushCapacity}
                                    towelLengthPerUse={towelLengthPerUse}
                                />
                            );
                        })}
                    </div>
                </>
            )}
        </section>
    );
}
