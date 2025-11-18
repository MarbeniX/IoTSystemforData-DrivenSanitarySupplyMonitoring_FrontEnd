import {
    MdOutlineKeyboardDoubleArrowLeft,
    MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";

type ButtonGetToCurrentDateProps = {
    handleFunction: () => void;
    icon: number;
};

export default function ButtonGetToCurrentDate({
    handleFunction,
    icon,
}: ButtonGetToCurrentDateProps) {
    return (
        <button
            onClick={handleFunction}
            className="cursor-pointer text-2xl text-neutral-600"
        >
            {icon === 1 ? (
                <MdOutlineKeyboardDoubleArrowLeft />
            ) : (
                <MdOutlineKeyboardDoubleArrowRight />
            )}
        </button>
    );
}
