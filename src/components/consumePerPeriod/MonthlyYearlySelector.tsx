import clsx from "clsx";
import type { ViewMode } from "../../types";

type MonthlyYearlySelectorProps = {
    setViewMode: React.Dispatch<React.SetStateAction<ViewMode>>;
    viewMode: ViewMode;
};

export default function MonthlyYearlySelector({
    setViewMode,
    viewMode,
}: MonthlyYearlySelectorProps) {
    return (
        <div className="flex gap-1">
            {(["month", "year"] as ViewMode[]).map((mode) => {
                const labels: Record<ViewMode, string> = {
                    day: "Día",
                    month: "Mes",
                    year: "Año",
                };

                return (
                    <button
                        key={mode}
                        onClick={() => setViewMode(mode)}
                        className={clsx(
                            "px-4 py-1 text-lg font-normal rounded-t-md transition",
                            viewMode === mode
                                ? "bg-white text-[#1A211F]"
                                : "bg-[#F4F8EA] text-[#6B6E6C] cursor-pointer"
                        )}
                    >
                        {labels[mode]}
                    </button>
                );
            })}
        </div>
    );
}
