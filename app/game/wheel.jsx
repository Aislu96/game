"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { useGameContext } from "../context/game";

const Wheel = () => {
  const [rotation, setRotation] = useState(0);
  const [startAngle, setStartAngle] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const wheelRef = useRef(null);
  const lastAngleRef = useRef(0);
  const rotationCountRef = useRef(0);
  const { setScore, setEnergy } = useGameContext();
  const animationRef = useRef(null);
  const lastTimeRef = useRef(0);
  const velocityRef = useRef(0);

  const calculateAngle = useCallback((clientX, clientY) => {
    const rect = wheelRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    return Math.atan2(clientY - centerY, clientX - centerX) * (180 / Math.PI);
  }, []);

  const handleStart = useCallback(
    (clientX, clientY) => {
      setIsDragging(true);
      const angle = calculateAngle(clientX, clientY);
      setStartAngle(angle);
      lastAngleRef.current = angle;
      velocityRef.current = 0;
    },
    [calculateAngle]
  );

  const handleMove = useCallback(
    (clientX, clientY) => {
      if (!isDragging) return;
      const currentAngle = calculateAngle(clientX, clientY);
      let angleDiff = currentAngle - lastAngleRef.current;

      // Adjust for the boundary between 359 and 0 degrees
      if (angleDiff > 180) angleDiff -= 360;
      if (angleDiff < -180) angleDiff += 360;

      // Only update if movement is clockwise
      if (angleDiff > 0) {
        setRotation((prev) => (prev + angleDiff) % 360);
        rotationCountRef.current += angleDiff;
        velocityRef.current = angleDiff;

        // Check for full rotation
        if (rotationCountRef.current >= 360) {
          setScore((prevScore) => prevScore + 1);
          setEnergy((prevEnergy) => Math.max(0, prevEnergy - 1));
          rotationCountRef.current %= 360;
        }
      }
      lastAngleRef.current = currentAngle;
    },
    [isDragging, calculateAngle, setScore, setEnergy]
  );

  const handleEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  const animate = useCallback(
    (time) => {
      if (lastTimeRef.current !== 0) {
        const deltaTime = (time - lastTimeRef.current) / 1000; // Convert to seconds
        if (!isDragging) {
          // Apply deceleration
          velocityRef.current *= 0.95;
          if (Math.abs(velocityRef.current) > 0.1) {
            setRotation((prev) => (prev + velocityRef.current) % 360);
            rotationCountRef.current += velocityRef.current;
            if (rotationCountRef.current >= 360) {
              setScore((prevScore) => prevScore + 1);
              setEnergy((prevEnergy) => Math.max(0, prevEnergy - 1));
              rotationCountRef.current %= 360;
            }
          } else {
            velocityRef.current = 0;
          }
        }
      }
      lastTimeRef.current = time;
      animationRef.current = requestAnimationFrame(animate);
    },
    [isDragging, setScore, setEnergy]
  );

  useEffect(() => {
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate]);

  return (
    <div className="bg-[url('/arrow.svg')] mt-8 mb-4 h-[355px] w-[321px] bg-cover flex items-center justify-center mx-auto">
      <div
        ref={wheelRef}
        style={{
          transform: `rotate(${rotation}deg)`,
          willChange: "transform",
          transition: isDragging ? "none" : "transform 0.1s linear",
        }}
        className="w-[295px] h-[295px] rounded-full mb-5 bg-[url('/wheel.png')] bg-cover relative touch-none flex items-center justify-center"
        onTouchStart={(e) => {
          e.preventDefault();
          handleStart(e.touches[0].clientX, e.touches[0].clientY);
        }}
        onTouchMove={(e) => {
          e.preventDefault();
          handleMove(e.touches[0].clientX, e.touches[0].clientY);
        }}
        onTouchEnd={(e) => {
          e.preventDefault();
          handleEnd();
        }}
      ></div>
    </div>
  );
};

export default Wheel;
