"use client";
import React, { useState, useRef, useEffect } from "react";
import { FaCircle } from "react-icons/fa";
import Image from "next/image";

const RotatingClockGame = () => {
  const [score, setScore] = useState(0);
  const [energy, setEnergy] = useState(1000);
  const [rotation, setRotation] = useState(0);
  const [startAngle, setStartAngle] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const clockRef = useRef(null);
  const lastAngleRef = useRef(0);
  const rotationCountRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setEnergy((prevEnergy) => Math.min(1000, prevEnergy + 1));
    }, 10000); // 10000 milliseconds = 10 seconds

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []);

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
    rotationCountRef.current = 0;
  };

  const handleMove = (clientX, clientY) => {
    if (!isDragging) return;
    const currentAngle = calculateAngle(clientX, clientY);
    let angleDiff = currentAngle - lastAngleRef.current;

    // Adjust for the boundary between 359 and 0 degrees
    if (angleDiff < -180) angleDiff += 360;
    if (angleDiff > 180) {
      setIsDragging(false);
    }

    // angleDiff -= 360;

    // Only update if movement is clockwise
    if (angleDiff > 0) {
      rotationCountRef.current += angleDiff;
      setRotation(currentAngle);

      // Check for full rotation
      if (
        rotationCountRef.current >= 360 &&
        Math.abs(currentAngle - startAngle) < 30
      ) {
        setScore((prevScore) => prevScore + 1);
        setEnergy((prevEnergy) => Math.max(0, prevEnergy - 1));
        rotationCountRef.current = 0;
      }

      lastAngleRef.current = currentAngle;
    } else {
      setIsDragging(false);
    }
    // If movement is anticlockwise, do nothing (don't update lastAngleRef or rotation)
  };

  const handleEnd = () => {
    setIsDragging(false);
  };

  return (
    <div className="h-screen bg-black text-white flex flex-col items-center justify-between pt-20">
      <div className="text-4xl mb-4 w-full px-10">Score: {score}</div>
      <div className="relative flex items-center justify-center">
        <div className="bg-[url('/arrow.svg')] h-[380px] w-[380px] bg-cover flex items-center justify-center">
          <div
            ref={clockRef}
            className="w-[295px] h-[295px] rounded-full mb-5  bg-white relative touch-none flex items-center justify-center"
            onTouchStart={(e) =>
              handleStart(e.touches[0].clientX, e.touches[0].clientY)
            }
            onTouchMove={(e) =>
              handleMove(e.touches[0].clientX, e.touches[0].clientY)
            }
            onTouchEnd={handleEnd}
          >
            <div
              className="absolute top-0 left-1/2 w-1.5 h-1/2 bg-black origin-bottom rounded-full"
              style={{ transform: `rotate(${rotation}deg)` }}
            >
              <FaCircle className="text-black absolute top-full  left-1/2 text-2xl -translate-x-1/2 -translate-y-1/2" />
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6 flex">
        <Image
          src={"/lightning.svg"}
          alt="Lightning"
          width={36}
          height={50}
          className="mr-4 mb-4"
        />
        <span className="space-y-2">
          <div className="flex items-end">
            <h1 className="text-5xl"> {energy}</h1>
            <h3 className="text-3xl text-stone-400">/1000</h3>
          </div>
          <div className="text-sm text-center">1 Energy - 10 Sec</div>
        </span>
      </div>
    </div>
  );
};

export default RotatingClockGame;
