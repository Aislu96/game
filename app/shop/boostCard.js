import React from 'react';
import Image from 'next/image';

const BoostCard = ({ iconSrc, altText, text, isActive, onClick }) => {
    return (
        <div className={`border-after relative ${isActive ? '' : ''}`}>
            <div className="py-[6px] flex flex-row justify-between">
                <div className="flex flex-row gap-[5px] items-center">
                    <Image src={iconSrc} alt={altText} width={39} height={39} className="object-cover" />
                    <p className="text-lg font-light">{text}</p>
                </div>
                <div
                    className="w-[80px] h-[31px] flex items-center justify-center my-1 border-customYellow border-[1px] rounded-md gradient"
                    onClick={onClick}
                >
                    <p className=" active text-lg font-light">{isActive ? '21:11h' : 'use'}</p>
                </div>
            </div>
        </div>
    );
};

export default BoostCard;
