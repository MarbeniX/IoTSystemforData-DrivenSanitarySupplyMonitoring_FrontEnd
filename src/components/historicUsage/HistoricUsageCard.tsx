import { ESPType } from "../../schemas";

type StatCardProps = {
    count: number;
    totalSec?: number;
    label: string;
    icon: React.ReactNode;
    unit: string | null;
    sensorType: ESPType;
    soapDispensePerUse: number;
    tankFlushCapacity: number;
    towelLengthPerUse: number;
};

export default function StatCard({
    count,
    totalSec,
    label,
    icon,
    unit,
    sensorType,
    soapDispensePerUse,
    tankFlushCapacity,
    towelLengthPerUse,
}: StatCardProps) {
    return (
        <div className="flex flex-col bg-white rounded-2xl py-3 shadow-md border-[#919492] border-2 px-6">
            <div className="flex justify-between items-center w-full">
                <span className="text-2xl font-medium text-neutral-700">
                    {label}
                </span>
                <div className="w-14 h-14 rounded-full grid place-items-center text-2xl text-neutral-800 bg-[#D1D8BE] /* Color oliva pálido de la imagen */">
                    {icon}
                </div>
            </div>

            <div className="flex w-full justify-between">
                <div className="flex flex-col w-full gap-2">
                    <strong className="text-3xl font-bold text-neutral-900">
                        {sensorType === ESPType.SOAP && soapDispensePerUse
                            ? ((count * soapDispensePerUse) / 1000).toFixed(2)
                            : sensorType === ESPType.TANK && tankFlushCapacity
                            ? count * tankFlushCapacity
                            : sensorType === ESPType.TOWEL && towelLengthPerUse
                            ? ((count * towelLengthPerUse) / 100).toFixed(2)
                            : sensorType === ESPType.PAPER
                            ? count
                            : (totalSec! / 60).toFixed(2)}
                    </strong>
                    <span className="text-sm text-[#6B6E6C]">{unit}</span>
                </div>

                {sensorType === ESPType.TANK ||
                sensorType === ESPType.SOAP ||
                sensorType === ESPType.TOWEL ? (
                    <div className="flex flex-col text-right w-full gap-2">
                        <strong className="text-3xl font-bold text-neutral-900">
                            {count}
                        </strong>
                        <span className="text-sm text-[#6B6E6C]">
                            Activaciones
                        </span>
                    </div>
                ) : null}
            </div>
        </div>
    );
}
