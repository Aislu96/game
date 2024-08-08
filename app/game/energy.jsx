"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useGameContext } from "../context/game";

const Energy = () => {
  const { energy } = useGameContext();
  return (
    <div className="mb-6 flex justify-center">
      <Image
        src={"/lightning.svg"}
        alt="Lightning"
        width={20}
        height={32}
        className="mr-4 mb-4"
      />
      <span className="space-y-2">
        <div className="flex items-end">
          <h1 className="text-4xl"> {energy}</h1>
          <h3 className="text-2xl text-stone-400">/1000</h3>
        </div>
        <div className="text-sm text-center">1 Energy - 10 Sec</div>
      </span>
    </div>
  );
};

export default Energy;
