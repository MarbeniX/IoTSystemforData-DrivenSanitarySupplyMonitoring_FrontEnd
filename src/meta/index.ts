import {
    FaToiletPaper,
    FaToilet,
    FaPumpSoap,
    FaFaucet,
    FaCrown,
} from "react-icons/fa";
import { PiTowelFill } from "react-icons/pi";
import { ESPType } from "../schemas";

export type SensorMetaInfo = {
    label: string;
    unit: string | null;
    icon: React.ReactNode;
};

export const SENSOR_META = {
    [ESPType.PAPER]: {
        label: "Papel",
        unit: "Rollos consumidos",
        icon: FaToiletPaper,
    },
    [ESPType.TANK]: {
        label: "Tanque",
        unit: "Litros descargados",
        icon: FaToilet,
    },
    [ESPType.SOAP]: {
        label: "Jabón",
        unit: "Litros dispensados",
        icon: FaPumpSoap,
    },
    [ESPType.WATER]: {
        label: "Agua",
        unit: "Minutos de flujo",
        icon: FaFaucet,
    },
    [ESPType.TOWEL]: {
        label: "Toallas",
        unit: "Metros utilizados",
        icon: PiTowelFill,
    },
    [ESPType.MASTER]: {
        label: "Master",
        unit: null, // o "", depende del uso
        icon: FaCrown,
    },
} as const;
