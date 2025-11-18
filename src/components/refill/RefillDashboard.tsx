import { useQuery } from "@tanstack/react-query";
import RefillCard from "./RefillCard";
import { getTodaySoapTowelSummary } from "../../services/Records";

type RefillDashboardProps = {
    soapCapacity: number;
    soapDispensePerUse: number;
    totalTowelLength: number;
    towelLengthPerUse: number;
};

export default function RefillDashboard({
    soapCapacity,
    soapDispensePerUse,
    totalTowelLength,
    towelLengthPerUse,
}: RefillDashboardProps) {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["refillData"],
        queryFn: getTodaySoapTowelSummary,
    });

    return (
        <section className="font-sans w-full">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-medium text-neutral-800">
                    Recargas
                </h2>
                <span className="text-sm text-neutral-600 font-mono">
                    {new Date().toLocaleString()}
                </span>
            </div>

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
                    <div className="grid grid-cols-1 md:grid-cols-2  gap-6 w-auto">
                        <RefillCard
                            capacity={soapCapacity}
                            dispensePerUse={soapDispensePerUse}
                            currentCount={data.result.soapCount}
                            title="Jabón"
                        />

                        <RefillCard
                            capacity={totalTowelLength}
                            dispensePerUse={towelLengthPerUse}
                            currentCount={data.result.towelCount}
                            title="Toallas"
                        />
                    </div>
                </>
            )}
        </section>
    );
}
