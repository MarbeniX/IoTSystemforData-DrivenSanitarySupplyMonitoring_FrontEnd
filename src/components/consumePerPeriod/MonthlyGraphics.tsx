import WeeklyChart from "./WeeklyChart";
import { addMonths, format, getDay, parseISO, subMonths } from "date-fns";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import type { TransformedWeek, ViewMode, WeeklyChartData } from "../../types";
import { useMemo } from "react";
import type {
    MonthlyOrYearlyRecordsBySupplyType,
    RecordEntry,
} from "../../schemas";
import { es } from "date-fns/locale";
import ButtonGetToCurrentDate from "./ButtonGetToCurrentDate";

type MonthlyGraphicsProps = {
    data: MonthlyOrYearlyRecordsBySupplyType;
    currentDate: Date;
    handleReturnToActual: () => void;
    setCurrentDate: React.Dispatch<React.SetStateAction<Date>>;
    viewMode: ViewMode;
    dateStatus: "past" | "present" | "future";
    oldestRecordTimestamp: string | null;
};

const formatDayLabel = (dateString: string): string => {
    try {
        const date = parseISO(dateString);
        const day = format(date, "E", { locale: es });
        return day.charAt(0).toUpperCase() + day.slice(1).replace(".", "");
    } catch (error) {
        console.log("Error parsing date:", error);
        return "Err";
    }
};

export default function MonthlyGraphics({
    data,
    currentDate,
    setCurrentDate,
    viewMode,
    handleReturnToActual,
    dateStatus,
    oldestRecordTimestamp,
}: MonthlyGraphicsProps) {
    const transformedWeeklyData = useMemo((): TransformedWeek[] => {
        if (!data || viewMode !== "month" || !data.result) {
            return [];
        }
        const allDays = data.result;
        if (allDays.length === 0) return [];

        const weeks: TransformedWeek[] = [];
        let currentWeek: RecordEntry[] = [];

        for (let i = 0; i < allDays.length; i++) {
            const day = allDays[i];
            currentWeek.push(day);

            const currentDate = parseISO(day.label);

            // getDay() devuelve 0 (Dom) a 6 (Sáb). 5 es Viernes.
            const isFriday = getDay(currentDate) === 5;
            const isLastDayInArray = i === allDays.length - 1;

            // Si es viernes O es el último día de los datos,
            // cerramos y procesamos la semana.
            if (isFriday || isLastDayInArray) {
                // 1. Transforma los datos para el gráfico
                const chartData: WeeklyChartData[] = currentWeek.map((d) => ({
                    day: formatDayLabel(d.label),
                    value: d.count,
                    totalSec: d.totalSec,
                }));

                const startDate = parseISO(currentWeek[0].label);
                const endDate = parseISO(
                    currentWeek[currentWeek.length - 1].label
                );
                const title = `Del ${format(startDate, "d")} al ${format(
                    endDate,
                    "d 'de' MMMM",
                    { locale: es }
                )}`;

                weeks.push({ title, chartData });
                currentWeek = [];
            }
        }
        return weeks;
    }, [data, viewMode]);

    const handlePrevMonth = () => setCurrentDate((prev) => subMonths(prev, 1));
    const handleNextMonth = () => setCurrentDate((prev) => addMonths(prev, 1));

    const currentMonthName = format(currentDate, "MMMM", { locale: es });

    return (
        <>
            <div className="flex items-center justify-center gap-4 mb-4">
                {oldestRecordTimestamp && (
                    <>
                        {dateStatus === "future" && (
                            <ButtonGetToCurrentDate
                                handleFunction={handleReturnToActual}
                                icon={1}
                            />
                        )}

                        <button
                            onClick={handlePrevMonth}
                            className="text-neutral-600 cursor-pointer"
                            disabled={currentDate.getMonth() === 0}
                        >
                            {currentDate.getMonth() === 0 ? null : (
                                <FaChevronLeft />
                            )}
                        </button>
                    </>
                )}

                <h3 className="text-xl font-semibold w-32 text-center capitalize">
                    {currentMonthName}
                </h3>

                {oldestRecordTimestamp && (
                    <>
                        <button
                            onClick={handleNextMonth}
                            className="text-neutral-600 cursor-pointer"
                            disabled={currentDate.getMonth() === 11}
                        >
                            {currentDate.getMonth() === 11 ? null : (
                                <FaChevronRight />
                            )}
                        </button>

                        {dateStatus === "past" && (
                            <ButtonGetToCurrentDate
                                handleFunction={handleReturnToActual}
                                icon={2}
                            />
                        )}
                    </>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                {transformedWeeklyData.map((week) => (
                    <>
                        <WeeklyChart
                            key={week.title}
                            title={week.title}
                            data={week.chartData}
                        />
                    </>
                ))}
            </div>
        </>
    );
}
