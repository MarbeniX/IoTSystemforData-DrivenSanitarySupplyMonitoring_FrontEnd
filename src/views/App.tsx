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
import { getOldestRecordTimestamp } from "../services/Records";

export default function App() {
    const {
        data: CDData,
        isLoading: CDisLoading,
        isError: CDisError,
        error: CDError,
    } = useQuery({
        queryKey: ["configData"],
        queryFn: getSensorTypeConfig,
    });

    const {
        data: ORData,
        isLoading: ORisLoading,
        isError: ORisError,
        error: ORError,
    } = useQuery({
        queryKey: ["oldestRecord"],
        queryFn: getOldestRecordTimestamp,
    });

    if (CDisLoading && ORisLoading) return <div>Loading...</div>;
    if (CDisError && ORisError)
        return (
            <div>
                Error: {(CDError as Error).message}
                Error: {(ORError as Error).message}
            </div>
        );
    if (CDData)
        return (
            <div className="min-h-screen bg-gray-100 p-6">
                <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 flex flex-col gap-6">
                        <SensorsStatesComponent />
                        <HistoricUsage
                            soapDispensePerUse={CDData.data.soapDispensePerUse}
                            tankFlushCapacity={CDData.data.tankFlushCapacity}
                            towelLengthPerUse={CDData.data.towelLengthPerUse}
                        />
                        <div className="md:grid-cols-1 lg:flex gap-6">
                            <GeneralConsume
                                soapDispensePerUse={
                                    CDData.data.soapDispensePerUse
                                }
                                tankFlushCapacity={
                                    CDData.data.tankFlushCapacity
                                }
                                towelLengthPerUse={
                                    CDData.data.towelLengthPerUse
                                }
                                oldestRecordTimestamp={ORData ? ORData : null}
                            />
                            <ConsumptionReport
                                oldestRecordTimestamp={ORData ? ORData : null}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-6">
                        <RefillDashboard
                            soapCapacity={CDData.data.soapCapacity}
                            soapDispensePerUse={CDData.data.soapDispensePerUse}
                            totalTowelLength={CDData.data.totalTowelLength}
                            towelLengthPerUse={CDData.data.towelLengthPerUse}
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
