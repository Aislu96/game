"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { useGameContext } from "../context/game";

const Wheel = () => {
  const [rotation, setRotation] = useState(0);
  const [startAngle, setStartAngle] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const clockRef = useRef(null);
  const lastAngleRef = useRef(0);
  const rotationCountRef = useRef(0);
  const { setScore, setEnergy } = useGameContext();
  const requestRef = useRef();
  const previousTimeRef = useRef();

  const calculateAngle = useCallback((clientX, clientY) => {
    const rect = clockRef.current.getBoundingClientRect();
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
      setStartAngle(angle);
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
      if (angleDiff > 180) {
        setIsDragging(false);
        return;
      }
      if (angleDiff > 0) {
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
      } else {
        setIsDragging(false);
      }
    },
    [isDragging, calculateAngle, startAngle, setScore, setEnergy]
  );

  const handleEnd = useCallback(() => {
    setIsDragging(false);
    lastAngleRef.current = rotation;
  }, [rotation]);

  const animate = useCallback(
    (time) => {
      if (previousTimeRef.current != undefined) {
        const deltaTime = time - previousTimeRef.current;
        setRotation((prevRotation) => {
          const newRotation = prevRotation + (isDragging ? 0.1 * deltaTime : 0);
          return newRotation % 360;
        });
      }
      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    },
    [isDragging]
  );

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [animate]);

  useEffect(() => {
    const preventDefaultScroll = (e) => {
      e.preventDefault();
    };

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
    <div className="bg-[url('/arrow.svg')] mt-8 mb-4 h-[355px] w-[321px] bg-cover flex items-center justify-center mx-auto">
      <div
        ref={clockRef}
        style={{ transform: `rotate(${rotation}deg)` }}
        className="w-[295px] h-[295px] rounded-full mb-5 bg-[url('/wheel.png')] bg-cover relative touch-none flex items-center justify-center"
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
