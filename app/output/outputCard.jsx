'use client';
import React, { useState } from 'react';
import Image from 'next/image';

const OutputCard = ({ iconSrc, altText, text }) => {
    const [isTouched, setIsTouched] = useState(false);

    const handleTouchStart = () => {
        setIsTouched(true);
    };

    const handleTouchEnd = () => {
        setIsTouched(false);
    };

    return (
        <div
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            <div className={`p-[6px] flex flex-row justify-between my-1 ${isTouched ? 'bg-customGray' : ''}`}>
                <div className='flex flex-row gap-[5px] items-center'>
                    <Image src={iconSrc} alt={altText} width={46} height={31} className="object-cover" />
                    <p className="text-base font-light">{text}</p>
                </div>
                <div className={`w-[80px] h-[31px] flex items-center justify-center my-1 gradient ${isTouched ? 'gradient-out' : ''}`}>
                    <p className="text-base font-light">select</p>
                </div>
            </div>
        </div>
    );
};

export default OutputCard;
