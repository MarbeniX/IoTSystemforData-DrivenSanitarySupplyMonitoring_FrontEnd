import { useState, useMemo } from "react";
import {
    format,
    isAfter,
    isBefore,
    startOfDay,
    startOfMonth,
    startOfYear,
} from "date-fns";
import { ESPType } from "../../schemas";
import { useQuery } from "@tanstack/react-query";
import { getMontlyOrYearlyRecordsBySupplyType } from "../../services/Records";
import type { RecordParams, ViewMode } from "../../types";
import MonthlyGraphics from "./MonthlyGraphics";
import YearlyGraphics from "./YearlyGraphics";
import SupplySelector from "./SupplySelector";

export default function ConsumptionReport() {
    const [viewMode, setViewMode] = useState<ViewMode>("month");
    const [currentDate, setCurrentDate] = useState(new Date());
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [selectedInsumo, setSelectedInsumo] = useState<ESPType>(
        ESPType.WATER
    );

    const queryParams = useMemo(() => {
        const params: RecordParams = {
            supplyType: selectedInsumo.valueOf(),
        };
        if (viewMode === "month") {
            params.month = format(currentDate, "yyyy-MM");
        } else if (viewMode === "year") {
            params.year = format(currentDate, "yyyy");
        }
        return params;
    }, [selectedInsumo, viewMode, currentDate]);

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["dataByPeriod", queryParams],
        queryFn: () => getMontlyOrYearlyRecordsBySupplyType(queryParams),
        enabled: selectedInsumo <= ESPType.TOWEL,
    });

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

    return (
        <section className="font-sans w-full pt-6 px-6">
            <h2 className="text-3xl font-medium text-neutral-800 mb-4">
                Consumo por periodo
            </h2>

            <SupplySelector
                setViewMode={setViewMode}
                viewMode={viewMode}
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
                selectedInsumo={selectedInsumo}
                setSelectedInsumo={setSelectedInsumo}
            />

            <div className="bg-white p-6 rounded-b-xl shadow-md">
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
                        {viewMode === "month" && (
                            <MonthlyGraphics
                                data={data}
                                currentDate={currentDate}
                                setCurrentDate={setCurrentDate}
                                viewMode={viewMode}
                                dateStatus={dateStatus}
                                handleReturnToActual={handleReturnToActual}
                            />
                        )}

                        {viewMode === "year" && (
                            <YearlyGraphics
                                data={data}
                                currentDate={currentDate}
                                setCurrentDate={setCurrentDate}
                                viewMode={viewMode}
                                dateStatus={dateStatus}
                                handleReturnToActual={handleReturnToActual}
                            />
                        )}
                    </>
                )}
            </div>
        </section>
    );
}
