"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import Menu from "../menu";
import Boost from "./boost";

const Shop = () => {
    return (
        <div className="relative flex flex-col h-screen bg-black text-white overflow-hidden">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-orange-500 opacity-30 blur-[120px] -translate-y-1/4 translate-x-1/4"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-purple-600 opacity-30 blur-[120px] translate-y-1/4 -translate-x-1/4"></div>
            <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] rounded-full bg-blue-500 opacity-20 blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute top-0 left-0 w-full h-[89.7%] bg-white opacity-5 rounded-[50px]"></div>
            <div className="flex flex-row gap-5 px-[30px] py-5 z-30 items-center mx-auto">
                <div className="flex flex-col py-[50px]">
                    <div className="flex flex-col">
                        <h2 className="font-normal text-2xl mb-[5px]">You earned</h2>
                        <div className="flex flex-row gap-[5px]">
                            <Image src="binXcoin.svg" alt="binXcoin" width={24} height={24} className="object-contain"/>
                            <p className="font-normal text-2xl">1</p>
                        </div>
                        <p className="font-normal text-xs text-customGray2">1BinX =0.0002 USDT</p>
                    </div>
                    <div
                        className="w-[140px] h-[34px] rounded-[10px] border-solid border-[1px] border-transparent gradient mt-[27px]">
                        <Link  href="/output" className="m-[4px] rounded-[6px] bg-customYellow2 text-black text-base font-medium h-6 w-[130px] flex items-center justify-center">Output
                        </Link>
                    </div>
                </div>
                <div className="flex flex-col items-center  relative">
                    <Image src="/romb.svg" alt="rombus" width={154} height={240} className="object-contain" />
                </div>
            </div>
            <Boost/>
            <Menu/>
        </div>
    );
};

export default Shop;
