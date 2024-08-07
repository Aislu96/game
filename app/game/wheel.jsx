"use client";

import Image from "next/image";
import React, { useState, useRef, useCallback } from "react";
import { useGameContext } from "../context/game";

const Wheel = () => {
  const [rotation, setRotation] = useState(0);
  const [startAngle, setStartAngle] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const clockRef = useRef(null);
  const lastAngleRef = useRef(0);
  const rotationCountRef = useRef(0);

  const { setScore, setEnergy } = useGameContext();

  const calculateAngle = (clientX, clientY) => {
    const rect = clockRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    let angle =
      Math.atan2(clientY - centerY, clientX - centerX) * (180 / Math.PI);
    return (angle + 360) % 360; // Normalize to 0-360
  };

  const handleStart = (clientX, clientY) => {
    setIsDragging(true);
    const angle = calculateAngle(clientX, clientY);
    setStartAngle(angle);
    lastAngleRef.current = angle;
  };

  const handleMove = useCallback(
    (clientX, clientY) => {
      if (!isDragging) return;

      const currentAngle = calculateAngle(clientX, clientY);
      let angleDiff = currentAngle - lastAngleRef.current;

      if (angleDiff < -180) angleDiff += 360;
      if (angleDiff > 180) {
        setIsDragging(false);
        return;
      }

      if (angleDiff > 0) {
        requestAnimationFrame(() => {
          setRotation((prevRotation) => prevRotation + angleDiff);
          rotationCountRef.current += angleDiff;

          if (
            rotationCountRef.current >= 360 &&
            Math.abs(currentAngle - startAngle) < 30
          ) {
            setScore((prevScore) => prevScore + 1);
            setEnergy((prevEnergy) => Math.max(0, prevEnergy - 1));
            rotationCountRef.current = 0;
          }

          lastAngleRef.current = currentAngle;
        });
      } else {
        setIsDragging(false);
      }
    },
    [isDragging, startAngle, setScore, setEnergy]
  );

  const handleEnd = () => {
    setIsDragging(false);
    lastAngleRef.current = rotation;
  };

  return (
    <div className="bg-[url('/arrow.svg')] mt-8 mb-4 h-[355px] w-[321px] bg-cover flex items-center justify-center mx-auto">
      <div
        ref={clockRef}
        style={{
          transform: `rotate(${rotation}deg)`,
          touchAction: "none",
          willChange: "transform",
        }}
        className="w-[295px] h-[295px] rounded-full mb-5 bg-[url('/wheel.png')] bg-cover relative flex items-center justify-center"
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
