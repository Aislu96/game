"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { useGameContext } from "../context/game";

const Wheel = () => {
  const [rotation, setRotation] = useState(0);
  const wheelRef = useRef(null);
  const { setScore, setEnergy } = useGameContext();
  const lastTouchRef = useRef(null);
  const rotationCountRef = useRef(0);
  const animationRef = useRef(null);

  const calculateAngle = useCallback((touch) => {
    const rect = wheelRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    return Math.atan2(touch.clientY - centerY, touch.clientX - centerX);
  }, []);

  const handleTouchStart = useCallback((e) => {
    e.preventDefault();
    lastTouchRef.current = e.touches[0];
  }, []);

  const handleTouchMove = useCallback(
    (e) => {
      e.preventDefault();
      if (!lastTouchRef.current) return;

      const touch = e.touches[0];
      const lastAngle = calculateAngle(lastTouchRef.current);
      const currentAngle = calculateAngle(touch);
      let angleDiff = currentAngle - lastAngle;

      // Adjust for the boundary between PI and -PI
      if (angleDiff > Math.PI) angleDiff -= 2 * Math.PI;
      if (angleDiff < -Math.PI) angleDiff += 2 * Math.PI;

      // Convert to degrees and update rotation
      const rotationDiff = (angleDiff * 180) / Math.PI;
      if (rotationDiff > 0) {
        setRotation((prev) => (prev + rotationDiff) % 360);
        rotationCountRef.current += rotationDiff;

        // Check for full rotation
        if (rotationCountRef.current >= 360) {
          setScore((prevScore) => prevScore + 1);
          setEnergy((prevEnergy) => Math.max(0, prevEnergy - 1));
          rotationCountRef.current %= 360;
        }
      }

      lastTouchRef.current = touch;
    },
    [calculateAngle, setScore, setEnergy]
  );

  const handleTouchEnd = useCallback((e) => {
    e.preventDefault();
    lastTouchRef.current = null;
  }, []);

  const interpolateRotation = useCallback(
    (timestamp) => {
      if (lastTouchRef.current) {
        handleTouchMove({
          touches: [lastTouchRef.current],
          preventDefault: () => {},
        });
      }
      animationRef.current = requestAnimationFrame(interpolateRotation);
    },
    [handleTouchMove]
  );

  useEffect(() => {
    animationRef.current = requestAnimationFrame(interpolateRotation);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [interpolateRotation]);

  return (
    <div className="bg-[url('/arrow.svg')] mt-8 mb-4 h-[355px] w-[321px] bg-cover flex items-center justify-center mx-auto">
      <div
        ref={wheelRef}
        style={{
          transform: `rotate(${rotation}deg)`,
          willChange: "transform",
        }}
        className="w-[295px] h-[295px] rounded-full mb-5 bg-[url('/wheel.png')] bg-cover relative touch-none flex items-center justify-center"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      ></div>
    </div>
  );
};

export default Wheel;
