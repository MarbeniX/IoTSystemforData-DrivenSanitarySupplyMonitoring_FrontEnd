import { SENSOR_META } from "../../meta";
import { ESPType } from "../../schemas";

type SimpleStatCardProps = {
    icon: React.ReactNode;
    sensorType: ESPType;
    value: number;
    soapDispensePerUse?: number;
    tankFlushCapacity?: number;
    towelLengthPerUse?: number;
    totalSec?: number;
};

const getLabelFromUnit = (unit: string | undefined): string => {
    if (!unit) return "N/A";
    return unit.split(" ")[0];
};

export default function SimpleStatCard({
    icon,
    sensorType,
    value,
    soapDispensePerUse,
    tankFlushCapacity,
    towelLengthPerUse,
    totalSec,
}: SimpleStatCardProps) {
    return (
        <div className="flex items-center gap-4 rounded-2xl border border-[#A3A894] bg-white shadow-sm py-2 px-4">
            <div className="grid p-4 place-items-center rounded-lg bg-[#D1D8BE] text-2xl text-neutral-800">
                {icon}
            </div>

            <div className="flex flex-col">
                <span className="text-sm text-neutral-600">
                    {getLabelFromUnit(SENSOR_META[sensorType].unit!)}
                </span>

                <strong className="text-lg font-bold text-neutral-900">
                    {sensorType === ESPType.SOAP && soapDispensePerUse
                        ? (value * soapDispensePerUse) / 1000
                        : sensorType === ESPType.TANK && tankFlushCapacity
                        ? value * tankFlushCapacity
                        : sensorType === ESPType.TOWEL && towelLengthPerUse
                        ? (value * towelLengthPerUse) / 100
                        : sensorType === ESPType.PAPER
                        ? value
                        : totalSec! / 60}
                </strong>
            </div>
        </div>
    );
}
