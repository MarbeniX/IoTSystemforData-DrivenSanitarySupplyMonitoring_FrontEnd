import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import type { ViewMode } from "../../types";
import {
    addDays,
    addMonths,
    format,
    isAfter,
    isBefore,
    startOfDay,
    startOfMonth,
    startOfYear,
    subDays,
    subMonths,
} from "date-fns";
import ButtonGetToCurrentDate from "../consumePerPeriod/ButtonGetToCurrentDate";
import { useMemo } from "react";

type DateSelectorProps = {
    viewMode: ViewMode;
    currentDate: Date;
    setCurrentDate: React.Dispatch<React.SetStateAction<Date>>;
};

export default function DateSelector({
    viewMode,
    currentDate,
    setCurrentDate,
}: DateSelectorProps) {
    const handleNextDate = () =>
        setCurrentDate((prev) => {
            if (viewMode === "day") {
                return addDays(prev, 1);
            } else if (viewMode === "month") {
                return addMonths(prev, 1);
            } else if (viewMode === "year") {
                return addMonths(prev, 12);
            }
            return prev;
        });

    const handlePrevDate = () => {
        setCurrentDate((prev) => {
            if (viewMode === "day") {
                return subDays(prev, 1);
            } else if (viewMode === "month") {
                return subMonths(prev, 1);
            } else if (viewMode === "year") {
                return subMonths(prev, 12);
            }
            return prev;
        });
    };

    const actualDate = useMemo(() => new Date(), []);
    const dateStatus = useMemo(() => {
        let current = currentDate;
        let actual = actualDate;
        if (viewMode === "day") {
            current = startOfDay(current);
            actual = startOfDay(actual);
        }
        if (viewMode === "month") {
            current = startOfMonth(current);
            actual = startOfMonth(actual);
        }
        if (viewMode === "year") {
            current = startOfYear(current);
            actual = startOfYear(actual);
        }

        if (isBefore(current, actual)) {
            return "past";
        }
        if (isAfter(current, actual)) {
            return "future";
        }
        return "present";
    }, [currentDate, actualDate, viewMode]);
    const handleReturnToActual = () => setCurrentDate(actualDate);

    const formattedDateHeader = useMemo(() => {
        if (viewMode === "day") {
            return format(currentDate, "dd/MM/yyyy");
        }
        if (viewMode === "month") {
            return format(currentDate, "MM/yyyy");
        }
        if (viewMode === "year") {
            return format(currentDate, "yyyy");
        }
        return ""; // Fallback
    }, [currentDate, viewMode]);

    return (
        <div className="flex items-center justify-center gap-3 mb-4">
            {dateStatus === "future" && (
                <ButtonGetToCurrentDate
                    handleFunction={handleReturnToActual}
                    icon={1}
                />
            )}

            <button
                onClick={handlePrevDate}
                className="text-neutral-600 cursor-pointer"
            >
                {viewMode === "year" &&
                currentDate.getFullYear() === 2025 ? null : (
                    <FaChevronLeft />
                )}
            </button>

            <h3 className="text-xl font-semibold w-32 text-center">
                {formattedDateHeader}
            </h3>

            <button
                onClick={handleNextDate}
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
    );
}
