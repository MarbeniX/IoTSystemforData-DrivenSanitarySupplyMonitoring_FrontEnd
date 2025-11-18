import clsx from "clsx";

type SensorCardProps = {
    alertMessage: number;
    label: string;
    icon: React.ReactNode;
};

export default function SensorCard({
    alertMessage,
    label,
    icon,
}: SensorCardProps) {
    return (
        <div
            className={`rounded-2xl min-w-40 flex flex-col py-5 border-2 bg-[#F9F9F9] border-gray-200 items-center justify-center gap-1 shadow-md ${
                alertMessage === 0 ? "border-green-500" : "border-red-500"
            }`}
        >
            <div className="flex flex-col items-center gap-0.5">
                <div
                    className={clsx(
                        "w-14 h-14 rounded-full grid place-items-center",
                        "text-2xl text-[#171817]",
                        "bg-[#D2EEE4]"
                    )}
                >
                    {icon}
                </div>
                <span className="text-sm text-[#1A211F]">{label}</span>
            </div>

            <strong className="text-2xl font-bold text-neutral-900">
                {alertMessage === 0 ? "Active" : "Inactive"}
            </strong>
        </div>
    );
}
