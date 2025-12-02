import { useMemo } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
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
import type { ViewMode } from "../../types";

const VIEW_CONFIG = {
    day: {
        formatStr: "dd/MM/yyyy",
        addFn: addDays,
        subFn: subDays,
        startOfFn: startOfDay,
    },
    month: {
        formatStr: "MM/yyyy",
        addFn: addMonths,
        subFn: subMonths,
        startOfFn: startOfMonth,
    },
    year: {
        formatStr: "yyyy",
        addFn: addMonths,
        subFn: subMonths,
        step: 12,
        startOfFn: startOfYear,
    },
};

type DateSelectorProps = {
    viewMode: ViewMode;
    currentDate: Date;
    setCurrentDate: React.Dispatch<React.SetStateAction<Date>>;
    oldestRecordTimestamp: string | null;
};

export default function DateSelector({
    viewMode,
    currentDate,
    setCurrentDate,
    oldestRecordTimestamp,
}: DateSelectorProps) {
    const currentConfig = VIEW_CONFIG[viewMode];
    const actualDate = new Date();

    const handleNextDate = () => {
        const step = viewMode === "year" ? 12 : 1;
        setCurrentDate((prev) => currentConfig.addFn(prev, step));
    };

    const handlePrevDate = () => {
        const step = viewMode === "year" ? 12 : 1;
        setCurrentDate((prev) => currentConfig.subFn(prev, step));
    };

    const handleReturnToActual = () => setCurrentDate(actualDate);

    const dateStatus = useMemo(() => {
        const currentNormalized = currentConfig.startOfFn(currentDate);
        const actualNormalized = currentConfig.startOfFn(actualDate);

        if (isBefore(currentNormalized, actualNormalized)) return "past";
        if (isAfter(currentNormalized, actualNormalized)) return "future";
        return "present";
    }, [currentDate, viewMode]);

    const formattedDateHeader = format(currentDate, currentConfig.formatStr);
    const formattedOldestRecord = oldestRecordTimestamp
        ? format(new Date(oldestRecordTimestamp), currentConfig.formatStr)
        : "";
    const formattedActualDate = format(actualDate, currentConfig.formatStr);

    const isAtOldestLimit = formattedOldestRecord === formattedDateHeader;
    const isAtFutureLimit = formattedActualDate === formattedDateHeader;

    return (
        <div className="flex items-center justify-center gap-3 mb-4">
            {oldestRecordTimestamp && (
                <>
                    {dateStatus === "future" && (
                        <ButtonGetToCurrentDate
                            handleFunction={handleReturnToActual}
                            icon={1}
                        />
                    )}

                    {!isAtOldestLimit && (
                        <button
                            onClick={handlePrevDate}
                            className="text-neutral-600 cursor-pointer"
                        >
                            <FaChevronLeft />
                        </button>
                    )}
                </>
            )}

            <h3 className="text-xl font-semibold w-32 text-center">
                {formattedDateHeader}
            </h3>

            {oldestRecordTimestamp && (
                <>
                    {!isAtFutureLimit && (
                        <button
                            onClick={handleNextDate}
                            className="text-neutral-600 cursor-pointer"
                        >
                            <FaChevronRight />
                        </button>
                    )}
                    {dateStatus === "past" && (
                        <ButtonGetToCurrentDate
                            handleFunction={handleReturnToActual}
                            icon={2}
                        />
                    )}
                </>
            )}
        </div>
    );
}
