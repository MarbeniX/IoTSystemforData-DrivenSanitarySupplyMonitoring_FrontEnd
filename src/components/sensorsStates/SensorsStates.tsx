import { useQuery } from "@tanstack/react-query";
import SensorCard from "./SensorCard";
import { getESP32Alerts } from "../../services/ESP32Type";
import { SENSOR_META } from "../../meta";

export default function SensorDashboard() {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["esp32Alerts"],
        queryFn: getESP32Alerts,
    });

    return (
        <section className="font-sans w-full">
            <h2 className="text-3xl font-medium text-neutral-800 mb-6 pl-2">
                Estado de sensores
            </h2>
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
                    <div className="flex flex-wrap gap-4">
                        {data?.data.map((sensor) => {
                            const info = SENSOR_META[sensor.espType];
                            return (
                                <SensorCard
                                    key={sensor._id}
                                    alertMessage={sensor.alertMessage}
                                    label={info.label}
                                    icon={<info.icon />}
                                />
                            );
                        })}
                    </div>
                </>
            )}
        </section>
    );
}
