import { useState } from "react";

export const SliderButton = () => {
    const [isLeftSelected, setIsLeftSelected] = useState(true);

    const onRightClick = () => {
        if(!isLeftSelected) {
            return;
        }
        setIsLeftSelected(false)
    };

    const onLeftClick = () => {
        if(isLeftSelected) {
            return;
        }
        setIsLeftSelected(true)
    };
    
    return (<div className=" flex rounded-full border w-fit">
        <div className={`py-2 px-4  rounded-full font-semibold cursor-pointer ${isLeftSelected ? 'bg-white text-black' : 'bg-inherit'} transition-all animate-fadeOut `} onClick={onLeftClick}>Day</div>
        <div className={`py-2 px-4  rounded-full font-semibold cursor-pointer ${!isLeftSelected ? 'bg-white text-black' : ''}`} onClick={onRightClick}>Week</div>
     </div>)
};