import { useState } from "react";

export type SliderButtonProps = {
    onLeftClick: () => void;
    onRightClick: () => void;
    leftLabel?: string;
    rightLabel?: string
};

export const SliderButton = (props: SliderButtonProps) => {
    const {leftLabel, rightLabel} = props;
    
    const [isLeftSelected, setIsLeftSelected] = useState(true);

    const onRightClick = () => {
        if(!isLeftSelected) {
            return;
        }
        setIsLeftSelected(false)
        props.onRightClick();
    };

    const onLeftClick = () => {
        if(isLeftSelected) {
            return;
        }
        setIsLeftSelected(true)
        props.onLeftClick();
    };
    
    return (<div className=" flex rounded-full border w-fit">
        <div className={`py-2 px-4  rounded-full font-semibold cursor-pointer ${isLeftSelected ? 'bg-white text-black' : 'bg-inherit'} transition-all animate-fadeOut `} onClick={onLeftClick}>{leftLabel || 'Left'}</div>
        <div className={`py-2 px-4  rounded-full font-semibold cursor-pointer ${!isLeftSelected ? 'bg-white text-black' : ''}`} onClick={onRightClick}>{rightLabel || 'Right'}</div>
     </div>)
};