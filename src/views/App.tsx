import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useQuery } from "@tanstack/react-query";
import SensorsStatesComponent from "../components/sensorsStates/SensorsStates";
import HistoricUsage from "../components/historicUsage/HistoricUsage";
import RefillDashboard from "../components/refill/RefillDashboard";
import LastRecordsDashboard from "../components/LastRecords";
import ConsumptionReport from "../components/consumePerPeriod/ComsumptionReport";
import { getSensorTypeConfig } from "../services/SensorTypeConfig";
import GeneralConsume from "../components/generalConsume/GeneralConsume";

export default function App() {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["configData"],
        queryFn: getSensorTypeConfig,
    });

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {(error as Error).message}</div>;

    if (data)
        return (
            <div className="min-h-screen bg-gray-100 p-6">
                <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 flex flex-col gap-6">
                        <SensorsStatesComponent />
                        <HistoricUsage
                            soapDispensePerUse={data.data.soapDispensePerUse}
                            tankFlushCapacity={data.data.tankFlushCapacity}
                            towelLengthPerUse={data.data.towelLengthPerUse}
                        />
                        <div className="md:grid-cols-1 lg:flex gap-6">
                            <GeneralConsume
                                soapDispensePerUse={
                                    data.data.soapDispensePerUse
                                }
                                tankFlushCapacity={data.data.tankFlushCapacity}
                                towelLengthPerUse={data.data.towelLengthPerUse}
                            />
                            <ConsumptionReport />
                        </div>
                    </div>

                    <div className="flex flex-col gap-6">
                        <RefillDashboard
                            soapCapacity={data.data.soapCapacity}
                            soapDispensePerUse={data.data.soapDispensePerUse}
                            totalTowelLength={data.data.totalTowelLength}
                            towelLengthPerUse={data.data.towelLengthPerUse}
                        />
                        <LastRecordsDashboard />
                    </div>
                </main>

                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
            </div>
        );
}
