import AnnualChart from "./AnualChart";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { addMonths, format, parseISO, subMonths } from "date-fns";
import type { MonthlyOrYearlyRecordsBySupplyType } from "../../schemas";
import { useMemo } from "react";
import type { MonthlyChartData, ViewMode } from "../../types";
import { es } from "date-fns/locale";
import ButtonGetToCurrentDate from "./ButtonGetToCurrentDate";

type YearlyGraphicsProps = {
    data: MonthlyOrYearlyRecordsBySupplyType;
    currentDate: Date;
    handleReturnToActual: () => void;
    setCurrentDate: React.Dispatch<React.SetStateAction<Date>>;
    viewMode: ViewMode;
    dateStatus: "past" | "present" | "future";
};

const formatMonthLabel = (monthString: string): string => {
    try {
        const date = parseISO(monthString);
        const month = format(date, "MMM", { locale: es });
        return month.charAt(0).toUpperCase() + month.slice(1).replace(".", "");
    } catch (e) {
        console.error("Error parsing month string:", e);
        return "Err";
    }
};

export default function YearlyGraphics({
    data,
    currentDate,
    handleReturnToActual,
    setCurrentDate,
    viewMode,
    dateStatus,
}: YearlyGraphicsProps) {
    const transformedAnnualData = useMemo((): MonthlyChartData[] => {
        if (!data || viewMode !== "year" || !data.result) {
            return [];
        }

        return data.result.map((monthEntry) => ({
            month: formatMonthLabel(monthEntry.label), // "2025-01" -> "Ene"
            value: monthEntry.count, // "count" -> "value"
        }));
    }, [data, viewMode]); // Se recalcula si 'data' o 'viewMode' cambian

    const handlePrevYear = () => setCurrentDate((prev) => subMonths(prev, 12));
    const handleNextYear = () => setCurrentDate((prev) => addMonths(prev, 12));
    return (
        <>
            <div className="flex items-center justify-center gap-4 mb-4">
                {dateStatus === "future" && (
                    <ButtonGetToCurrentDate
                        handleFunction={handleReturnToActual}
                        icon={1}
                    />
                )}
                <button
                    onClick={handlePrevYear}
                    className="text-neutral-600 cursor-pointer"
                    disabled={currentDate.getFullYear() === 2025}
                >
                    {currentDate.getFullYear() === 2025 ? null : (
                        <FaChevronLeft />
                    )}{" "}
                </button>

                <h3 className="text-xl font-semibold w-32 text-center capitalize">
                    {currentDate.getFullYear()}
                </h3>

                <button
                    onClick={handleNextYear}
                    className="text-neutral-600 cursor-pointer"
                >
                    <FaChevronRight />
                </button>
                {dateStatus === "past" && (
                    <ButtonGetToCurrentDate
                        handleFunction={handleReturnToActual}
                        icon={2}
                    />
                )}
            </div>
            <AnnualChart data={transformedAnnualData} />
        </>
    );
}
