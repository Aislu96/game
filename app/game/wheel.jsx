"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { useGameContext } from "../context/game";

const Wheel = () => {
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const wheelRef = useRef(null);
  const startAngleRef = useRef(0);
  const lastAngleRef = useRef(0);
  const rotationCountRef = useRef(0);
  const { setScore, setEnergy, profitPerRoll } = useGameContext();

  const calculateAngle = useCallback((clientX, clientY) => {
    const rect = wheelRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    let angle =
      Math.atan2(clientY - centerY, clientX - centerX) * (180 / Math.PI);
    return (angle + 360) % 360;
  }, []);

  const handleStart = useCallback(
    (clientX, clientY) => {
      setIsDragging(true);
      const angle = calculateAngle(clientX, clientY);
      startAngleRef.current = angle;
      lastAngleRef.current = angle;
    },
    [calculateAngle]
  );

  const handleMove = useCallback(
    (clientX, clientY) => {
      if (!isDragging) return;
      const currentAngle = calculateAngle(clientX, clientY);
      let angleDiff = currentAngle - lastAngleRef.current;
      if (angleDiff < -180) angleDiff += 360;
      if (angleDiff > 180) angleDiff -= 360;

      if (angleDiff > 0) {
        setRotation((prev) => prev + angleDiff);
        rotationCountRef.current += angleDiff;
        if (
          rotationCountRef.current >= 360 &&
          Math.abs(currentAngle - startAngleRef.current) < 30
        ) {
          setScore((prevScore) => prevScore + profitPerRoll);
          setEnergy((prevEnergy) => Math.max(0, prevEnergy - 1));
          rotationCountRef.current = 0;
        }
        lastAngleRef.current = currentAngle;
      } else {
        setIsDragging(false);
      }
    },
    [isDragging, calculateAngle, setScore, setEnergy, profitPerRoll]
  );

  const handleEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    const preventDefaultScroll = (e) => e.preventDefault();
    document.body.style.overflow = "hidden";
    document.addEventListener("touchmove", preventDefaultScroll, {
      passive: false,
    });
    return () => {
      document.body.style.overflow = "auto";
      document.removeEventListener("touchmove", preventDefaultScroll);
    };
  }, []);

  return (
    <div className="bg-[url('/arrow.svg')] max-h-[333px] max-w-[300px] h-full w-full bg-cover flex items-center justify-center mx-auto">
      <div
        ref={wheelRef}
        style={{
          transform: `rotate(${rotation}deg)`,
          transition: isDragging ? "none" : "transform 0.1s linear",
        }}
        className="max-w-[295px] max-h-[295px] h-full w-full rounded-full bg-[url('/wheel.png')] bg-cover relative touch-none flex items-center justify-center"
        onTouchStart={(e) =>
          handleStart(e.touches[0].clientX, e.touches[0].clientY)
        }
        onTouchMove={(e) =>
          handleMove(e.touches[0].clientX, e.touches[0].clientY)
        }
        onTouchEnd={handleEnd}
      ></div>
    </div>
  );
};

export default Wheel;
