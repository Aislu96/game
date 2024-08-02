import React, { useState } from 'react';
import Image from 'next/image';

const BoostCard = ({ iconSrc, altText, text }) => {
    const [isActive, setIsActive] = useState(false);

    const handleClick = () => {
        setIsActive(!isActive);
    };

    return (
        <div className="border-after relative" onClick={handleClick}>
            <div className="py-[6px] flex flex-row justify-between">
                <div className={`flex flex-row gap-[5px] items-center ${isActive ? 'transition-opacity duration-500 ease-in-out opacity-50' : ""}`}>
                    <Image src={iconSrc} alt={altText} width={39} height={39} className="object-cover" />
                    <p className="text-lg font-light">{text}</p>
                </div>
                <div className={`w-[80px] h-[31px] flex items-center justify-center my-1 border-customYellow border-[1px] rounded-md gradient  ${isActive ? 'blink' : ""}`}>
                    <p className="text-lg font-light">{isActive ? '21:11h' : 'use'}</p>
                </div>
            </div>
        </div>
    );
};

export default BoostCard;
