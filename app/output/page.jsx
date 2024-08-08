"use client";
import Image from "next/image";
import React, { useState } from "react";
import OutputCard from "./outputCard";
import Link from "next/link";

const Output = () => {
  const [isTouched, setIsTouched] = useState(false);

  const handleTouchStart = () => {
    setIsTouched(true);
  };

  const handleTouchEnd = () => {
    setIsTouched(false);
  };
  return (
    <div className="h-screen bg-black text-white relative overflow-hidden">
      <div className="px-[30px] pt-[20px]">
        <Link href="/shop">
          {" "}
          <Image
            src={"/backArrow.svg"}
            alt="backArrow"
            width={40}
            height={25}
            className="object-cover relative z-10"
          />
        </Link>
      </div>
      <div className="px-[30px] flex flex-row justify-between pb-20">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full bg-yellow-500 opacity-30 blur-[120px] -translate-x-1/4 translate-y-1/4"></div>
        <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full bg-purple-600 opacity-30 blur-[120px] translate-x-1/4 -translate-y-1/4"></div>
        <div className="absolute top-1/2 right-1/2 w-[400px] h-[400px] rounded-full bg-blue-500 opacity-20 blur-[100px] -translate-y-1/2 -translate-x-1/2"></div>
      </div>
      <div className="relative">
        <Image
          src={"/fonImg.svg"}
          alt="fontImg"
          width={375}
          height={600}
          className="object-cover w-full absolute z-0 -top-20 left-0 h-[800px]"
        />
        <Image
          src={"/output.svg"}
          alt="output"
          width={171}
          height={31}
          className="object-cover h-[31px] mx-auto mb-2.5 relative z-10"
        />
        <div className="w-[315px] p-2.5 bg-customFon rounded-xl border-[1px] border-customBorder relative z-10 mx-auto h-full">
          <div className="border-after-two">
            <div className="flex flex-row justify-between items-center py-2">
              <h2 className="text-xl font-normal">Partner brokers</h2>
              <p className="text-sm font-normal gradient-text">min 10USDT</p>
            </div>
            <p className="text-customGray2 text-xs mb-2.5">
              When choosing a broker, the money will be sent to the personal
              account of the selected broker
            </p>
          </div>
          <div className="flex flex-col overflow-y-auto h-[280px]">
            <OutputCard
              iconSrc="/artsmarkers.svg"
              altText="Artsmarkers"
              text="Artsmarkers"
            />
            <OutputCard
              iconSrc="/artsmarkers.svg"
              altText="Artsmarkers"
              text="Artsmarkers"
            />
            <OutputCard
              iconSrc="/artsmarkers.svg"
              altText="Artsmarkers"
              text="Artsmarkers"
            />
            <OutputCard
              iconSrc="/artsmarkers.svg"
              altText="Artsmarkers"
              text="Artsmarkers"
            />
            <OutputCard
              iconSrc="/artsmarkers.svg"
              altText="Artsmarkers"
              text="Artsmarkers"
            />
            <OutputCard
              iconSrc="/artsmarkers.svg"
              altText="Artsmarkers"
              text="Artsmarkers"
            />
          </div>
        </div>
        <div className="w-[315px] [h-100px] mx-auto  p-2.5 bg-customFon rounded-xl border-[1px] border-customBorder fixed bottom-0  left-2 right-2 justify-center z-10 mt-[30px] flex flex-row gap-2.5">
          <div className="flex flex-col">
            <div className="flex flex-row justify-between items-center py-1">
              <h2 className="text-lg font-normal">Your wallet</h2>
              <p className="text-xs font-normal gradient-text">min 50USDT</p>
            </div>
            <p className="text-customGray2 text-xs w-[185px]">
              The withdrawal fee is calculated individually from the selected
              exchange
            </p>
          </div>
          <div
            className="px-[12.5px] py-[2.5px]"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <Image
              src={isTouched ? "walletHover.svg" : "/wallet.svg"}
              alt="wallet"
              width={75}
              height={75}
              className="object-cover h-[75px] w-[75px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Output;
