"use client";
import React, { useRef, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useGameContext } from "../context/game";

const Wheel = () => {
  const wheelRef = useRef(null);
  const rotationCount = useRef(0);
  const { setScore, setEnergy, profitPerRoll } = useGameContext();
  const [lastAngle, setLastAngle] = useState(0);

  const rotate = useMotionValue(0);
  const rotateTransform = useTransform(
    rotate,
    (value) => `rotate(${value}deg)`
  );

  const handlePanEnd = () => {
    if (rotationCount.current >= 360) {
      setScore((prevScore) => prevScore + profitPerRoll);
      setEnergy((prevEnergy) => Math.max(0, prevEnergy - 1));
      rotationCount.current = 0;
    }
  };

  const handlePan = (event, info) => {
    const wheelElement = wheelRef.current;
    const rect = wheelElement.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const angle =
      (Math.atan2(info.point.y - centerY, info.point.x - centerX) * 180) /
      Math.PI;
    const normalizedAngle = (angle + 360) % 360;

    let diff = normalizedAngle - lastAngle;
    if (diff < -180) diff += 360;
    if (diff > 180) diff -= 360;

    if (diff > 0) {
      rotate.set(rotate.get() + diff);
      rotationCount.current += diff;
    }

    setLastAngle(normalizedAngle);
  };

  return (
    <div className="bg-[url('/arrow.svg')] max-h-[333px] max-w-[300px] h-full w-full bg-cover flex items-center justify-center mx-auto">
      <motion.img
        ref={wheelRef}
        src="/wheel.png"
        alt="Wheel"
        style={{
          maxWidth: "295px",
          maxHeight: "295px",
          width: "100%",
          height: "100%",
          transform: rotateTransform,
        }}
        className="rounded-full relative touch-none"
        drag
        dragElastic={0}
        dragMomentum={false}
        onPan={handlePan}
        onPanEnd={handlePanEnd}
      />
    </div>
  );
};

export default Wheel;
