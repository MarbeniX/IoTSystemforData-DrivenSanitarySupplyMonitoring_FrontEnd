import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

type RefillCardProps = {
    capacity: number;
    dispensePerUse: number;
    currentCount: number;
    title: string;
};

export default function RefillCard({
    capacity,
    dispensePerUse,
    currentCount,
    title,
}: RefillCardProps) {
    const progressColor = "#D1D8BE";

    const percentage = Math.min(
        Math.round((currentCount / capacity) * 100),
        100
    );
    const dispensesPerCycle = Math.floor(capacity / dispensePerUse);
    const cycles = Math.floor(currentCount / dispensePerUse);

    return (
        <div className="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-md border border-gray-200">
            <h3 className="text-center text-sm font-bold text-[#171817]">
                {title}
            </h3>

            <div className="w-40 h-40 self-center">
                <CircularProgressbar
                    value={percentage}
                    text={`${percentage}%`}
                    strokeWidth={15}
                    styles={{
                        path: {
                            stroke: progressColor,
                            strokeLinecap: "round",
                        },

                        trail: {
                            stroke: "#E6E6E6",
                        },

                        text: {
                            fill: "#292B24",
                            fontSize: "20px",
                            fontWeight: "bold",
                        },
                    }}
                />
            </div>

            <div className="w-full space-y-1">
                <div className="flex flex-col text-sm gap-1">
                    <div className="flex justify-between">
                        <span className="font-semibold text-[#4E5146]">
                            Ciclo
                        </span>
                        <span className="font-normal text-neutral-800">
                            {cycles}
                        </span>
                    </div>

                    <div className="flex justify-between">
                        <span className="font-semibold text-[#4E5146]">
                            Capacidad
                        </span>
                        <span className="font-normal text-neutral-800">
                            {capacity} ml
                        </span>
                    </div>

                    <div className="flex justify-between">
                        <span className="font-semibold text-[#4E5146]">
                            Dispensación por uso
                        </span>
                        <span className="font-normal text-neutral-800">
                            {
                                <>
                                    {dispensePerUse}{" "}
                                    {title === "Toallas" ? "cm" : "ml"}
                                </>
                            }
                        </span>
                    </div>

                    <div className="flex justify-between">
                        <span className="font-semibold text-[#4E5146]">
                            Capacidad
                        </span>
                        <span className="font-normal text-neutral-800">
                            {
                                <>
                                    {capacity}{" "}
                                    {title === "Toallas" ? "m" : "ml"}
                                </>
                            }
                        </span>
                    </div>

                    <div className="flex justify-between">
                        <span className="font-semibold text-[#4E5146]">
                            Dispensaciones por ciclo
                        </span>
                        <span className="font-normal text-neutral-800">
                            {dispensesPerCycle}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
