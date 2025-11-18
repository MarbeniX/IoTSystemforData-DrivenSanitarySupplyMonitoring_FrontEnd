import { useQuery } from "@tanstack/react-query";
import { format, parseISO } from "date-fns"; // 1. Asegúrate de importar parseISOimport { getLastRecords } from "../services/Records";
import { ESPType } from "../schemas";
import { getLastRecords } from "../services/Records";
import { SENSOR_META } from "../meta";

export default function LastRecordsDashboard() {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["lastRecords"],
        queryFn: getLastRecords,
    });

    const renderCell = (value: number | string | null, unit: string = "") => {
        if (value === null || value === undefined) {
            return <span className="text-neutral-400">NA</span>;
        }
        return (
            <span className="text-neutral-700">
                {value}
                {unit}
            </span>
        );
    };

    const OUTPUT_FORMAT = "dd/MM/yy HH:mm:ss";
    const formatTimestamp = (isoTimestamp: string): string => {
        try {
            const parsedDate = parseISO(isoTimestamp);
            return format(parsedDate, OUTPUT_FORMAT);
        } catch (error) {
            console.error("Error formatting timestamp:", error);
            return isoTimestamp;
        }
    };

    if (data)
        return (
            <section className="font-sans w-full">
                <h2 className="text-3xl font-medium text-neutral-800 mb-6">
                    Ultimos registros
                </h2>

                <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="pb-4 text-left font-semibold text-[#171817]">
                                    Insumo
                                </th>
                                <th className="pb-4 text-left font-semibold text-[#171817]">
                                    Fecha y hora
                                </th>
                                <th className="pb-4 text-left font-semibold text-[#171817]">
                                    Seg. por uso
                                </th>
                                <th className="pb-4 text-left font-semibold text-[#171817]">
                                    RPS
                                </th>
                            </tr>
                        </thead>

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
                                <tbody>
                                    {data.result.map((log) => (
                                        <tr
                                            key={log._id}
                                            className="border-b border-gray-100 last:border-b-0"
                                        >
                                            <td className="py-3 px-2 text-sm text-[#6B6E6C]">
                                                {
                                                    SENSOR_META[
                                                        log.sensorType as ESPType
                                                    ].label
                                                }
                                            </td>

                                            <td className="py-3 px-2 text-sm text-[#6B6E6C]">
                                                {formatTimestamp(log.timestamp)}
                                            </td>

                                            <td className="py-3 px-2 text-sm text-[#6B6E6C]">
                                                {renderCell(
                                                    log.seconds!,
                                                    " seg"
                                                )}
                                            </td>

                                            <td className="py-3 px-2 text-sm text-[#6B6E6C]">
                                                {renderCell(
                                                    log.revolutions!,
                                                    " rps"
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </>
                        )}
                    </table>
                </div>
            </section>
        );
}
