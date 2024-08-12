"use client";
import React, { useState, useEffect, use } from "react";
import Image from "next/image";
import { supabase } from "../utils/supabase/server";
import { useTranslations } from "../utils/hooks/useTranslations";

const BoostCard = ({ iconSrc, altText, text, duration, onClick }) => {
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const { t } = useTranslations();

  const handleTouch = () => {
    if (!isActive) {
      setIsActive(true);
      setTimeLeft(duration);
    }
  };
  useEffect(() => {
    console.log("Duration changed:", duration);
    setTimeLeft(duration);
    setIsActive(duration > 0);
  }, [duration]);

  useEffect(() => {
    let timer;
    if (isActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => {
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
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
  };

  const handleClick = () => {
    if (!isActive) {
      onClick();
    }
  };

  return (
    <div className="border-after relative" onClick={handleClick}>
      <div className="py-[6px] flex flex-row justify-between">
        <div
          className={`flex flex-row gap-[5px] items-center ${
            isActive
              ? "transition-opacity duration-500 ease-in-out opacity-50"
              : ""
          }`}
        >
          <Image
            src={iconSrc}
            alt={altText}
            width={39}
            height={39}
            className="object-cover"
          />
          <p className="text-lg font-light">{text}</p>
        </div>
        <button
          className={`w-[80px] h-[31px] flex items-center justify-center my-1 gradient ${
            isActive ? "blink" : ""
          }`}
        >
          <p className="text-base font-light">
            {isActive ? formatTime(timeLeft) + "h" : t("Use")}
          </p>
        </button>
      </div>
    </div>
  );
};

export default BoostCard;
