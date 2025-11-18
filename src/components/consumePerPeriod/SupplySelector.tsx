import MonthlyYearlySelector from "./MonthlyYearlySelector";
import { FaChevronDown } from "react-icons/fa";
import { SENSOR_META } from "../../meta";
import PopUpSupplyMenu from "./PopUpSupplyMenu";
import type { ViewMode } from "../../types";
import type { ESPType } from "../../schemas";

type SupplySelectorProps = {
    setViewMode: React.Dispatch<React.SetStateAction<ViewMode>>;
    viewMode: ViewMode;
    isMenuOpen: boolean;
    setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
    selectedInsumo: ESPType;
    setSelectedInsumo: React.Dispatch<React.SetStateAction<ESPType>>;
};

export default function SupplySelector({
    setViewMode,
    viewMode,
    isMenuOpen,
    setIsMenuOpen,
    selectedInsumo,
    setSelectedInsumo,
}: SupplySelectorProps) {
    return (
        <div className="flex justify-between items-center">
            <MonthlyYearlySelector
                setViewMode={setViewMode}
                viewMode={viewMode}
            />

            <div className="relative flex items-center gap-2">
                <span className="text-[#6B6E6C] text-xl">Mostrar</span>
                <div
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="flex items-center gap-2 text-xl py-1 cursor-pointer bg-white px-3 rounded-t-lg"
                >
                    {SENSOR_META[selectedInsumo].label}
                    <FaChevronDown className="text-xs" />
                </div>

                {isMenuOpen && (
                    <PopUpSupplyMenu
                        setSelectedInsumo={setSelectedInsumo}
                        setIsMenuOpen={setIsMenuOpen}
                    />
                )}
            </div>
        </div>
    );
}
