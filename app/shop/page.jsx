"use client";

import React, { useState } from "react";
import Menu from "../menu";
import Image from "next/image";

const Shop = () => {
  const [isClicked, setIsClicked] = useState(false);

  function handleClick() {
    setIsClicked(!isClicked);
    console.log(isClicked);
  }

  return (
    <div className="relative flex flex-col h-screen bg-black text-white overflow-hidden">
      {/* ... (previous code remains the same) ... */}

      <div className="flex flex-col relative mx-auto">
        <Image
          src={"/boostImg.svg"}
          alt="boost"
          width={113}
          height={29}
          className="object-cover h-[31px] ml-[21px] relative z-10"
        />
        <div className="w-[315px] h-[181px] p-2.5 bg-customFon rounded-xl border-[1px] border-customBorder relative z-10">
          {["Recover ENERGY", "x2 BinXcoin 2 min", "+100 BinXcoin"].map(
            (item, index) => (
              <div
                key={index}
                className={`border-after ${isClicked ? "opacity-50" : ""}`}
              >
                <div className="py-[6px] flex flex-row justify-between">
                  <div className="flex flex-row gap-[5px] items-center">
                    <Image
                      src={
                        index === 0
                          ? "lightningTwo.svg"
                          : index === 1
                          ? "hand.svg"
                          : "coins.svg"
                      }
                      alt={item}
                      width={39}
                      height={39}
                      className="object-cover"
                    />
                    <p className="text-lg font-light">{item}</p>
                  </div>
                  <div
                    className="w-[80px] h-[31px] flex items-center justify-center my-1 border-customYellow border-[1px] rounded-md cursor-pointer"
                    onClick={handleClick}
                  >
                    <p className="text-lg font-light">
                      {isClicked ? "21:11h" : "use"}
                    </p>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
      <Menu />
    </div>
  );
};

export default Shop;
