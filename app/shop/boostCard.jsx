'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const BoostCard = ({ iconSrc, altText, text, duration }) => {
    const [isActive, setIsActive] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);

    const handleTouch = () => {
        if (!isActive) {
            setIsActive(true);
            setTimeLeft(duration);
        }
    };

    useEffect(() => {
        let timer;
        if (isActive && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft(prevTime => {
                    if (prevTime <= 1) {
                        setIsActive(false);
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);
        } else {
            clearInterval(timer);
        }

        return () => clearInterval(timer);
    }, [isActive, timeLeft]);

    const formatTime = (seconds) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
    };

    return (
        <div className="border-after relative" onTouchStart={handleTouch}>
            <div className="py-[6px] flex flex-row justify-between">
                <div className={`flex flex-row gap-[5px] items-center ${isActive ? 'transition-opacity duration-500 ease-in-out opacity-50' : ""}`}>
                    <Image src={iconSrc} alt={altText} width={39} height={39} className="object-cover" />
                    <p className="text-lg font-light">{text}</p>
                </div>
                <div className={`w-[80px] h-[31px] flex items-center justify-center my-1 gradient ${isActive ? 'blink' : ""}`}>
                    <p className="text-base font-light">{isActive ? formatTime(timeLeft)+'h' : 'use'}</p>
                </div>
            </div>
        </div>
    );
};

export default BoostCard;
