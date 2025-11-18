import { SENSOR_META } from "../../meta";
import { ESPType } from "../../schemas";

type PopUpSupplyMenuProps = {
    setSelectedInsumo: React.Dispatch<React.SetStateAction<ESPType>>;
    setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function PopUpSupplyMenu({
    setSelectedInsumo,
    setIsMenuOpen,
}: PopUpSupplyMenuProps) {
    return (
        <div className="absolute top-full right-0 z-10 bg-white">
            {Object.entries(SENSOR_META)
                .filter(([key]) => Number(key) !== ESPType.MASTER)
                .map(([key, info]) => {
                    const insumoType = Number(key) as ESPType;
                    return (
                        <button
                            key={insumoType}
                            onClick={() => {
                                setSelectedInsumo(insumoType);
                                setIsMenuOpen(false);
                            }}
                            className="block w-full px-4 py-2 text-lg text-neutral-700 hover:bg-gray-100 cursor-pointer"
                        >
                            {info.label}
                        </button>
                    );
                })}
        </div>
    );
}
