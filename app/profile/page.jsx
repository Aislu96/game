"use client";
import React, {useState} from "react";
import Image from "next/image";
import Menu from "../menu";
import Link from "next/link";
import {useGameContext} from "../context/game";

const Page = () => {
    const { score } = useGameContext();
    const [activeIcon, setActiveIcon] = useState("game");


    const getTriangleClass = () => {
        if (activeIcon === "shop") return "triangle-two";
        if (activeIcon === "game") return "triangle";
        if (activeIcon === "profile") return "triangle-three";
        return "";
    };
    const triangleClass = getTriangleClass();
    const getImageSrc = (score) => {
        if (score >= 0 && score <= 100) {
            return { src: "/coal.svg", text: "Coal" };
        } else if (score > 100 && score <= 500) {
            return { src: "/copper.svg", text: "Copper" };
        } else if (score > 500 && score <= 2000) {
            return { src: "/gold.svg", text: "Gold" };
        } else if (score > 2000 && score <= 5000) {
            return { src: "/emerald.svg", text: "Emerald" };
        } else if (score > 5000 && score <= 10000) {
            return { src: "/diamond.svg", text: "Diamond" };
        } else if (score > 10000) {
            return { src: "/binXCoin.svg", text: "BinX Coin" };
        } else {
            return { src: "/coal.svg", text: "Coal" };
        }
    };

    const user_name = "@User_Name";
    return (
        <div className="h-screen bg-customFon">
            <div className="absolute top-0 left-0 w-full  h-[90vh] z-20">
                <div className="absolute h-[92.9%] w-full bg-white opacity-5 z-20 rounded-t-[50px]"></div>
                <div className={`w-full opacity-5 absolute z-20 bottom-0 h-0 ${triangleClass}`}></div>
            </div>
            <div className="relative bg-no-repeat bg-center bg-cover h-[128px]">
                <Image
                    src={"/profileImageBg.png"}
                    alt={"background image"}
                    layout="fill"
                    objectFit="cover "
                    className="absolute top-10"
                />
                <div className="absolute top-28 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="relative">
                        <Image
                            src={"/border.svg"}
                            alt={"border"}
                            width={150}
                            height={155}
                            className="object-cover"
                        />
                        <div className="absolute top-2.5 left-2">
                            <Image
                                src={"/img.svg"}
                                alt="пользователь"
                                width={76}
                                height={83}
                                className="object-cover hexagon_profile"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-20 text-3xl text-center mb-5">
        <span className="font-medium gradient-text">
          {user_name}
        </span>
            </div>
            <div className="flex flex-col px-[30px] gap-5">
                <div className="flex flex-row gap-2.5">
                    <div className="h-[84px] w-full rounded-[10px] border-solid border-[1px]  relative border-transparent gradient-profile flex flex-col justify-center px-2.5">
                        <div className="flex flex-row gap-1.5 items-baseline">
                            <p className="text-medium text-sm text-white">Your score:</p>
                            <p className="text-medium text-base text-white">{score}</p>
                        </div>
                        <div className="flex flex-row gap-1.5 items-baseline">
                            <p className="text-medium text-sm text-white">League:</p>
                            <p className="text-medium text-base text-white">{getImageSrc(score).text}</p>
                            <Image
                            src={getImageSrc(score).src}
                            alt="score-based image"
                            width={17}
                            height={17}
                        /></div>
                    </div>
                    <div className=" relative h-[84px] w-full rounded-[10px] border-solid border-[1px] border-transparent gradient-profile-three flex flex-col justify-center px-2.5">
                        <div className="flex flex-row gap-1.5 items-baseline">
                            <p className="text-medium text-sm text-white">Earned:</p>
                            <p className="text-medium text-base text-white">{score * 0.0002}</p>
                            <Image
                                src="/tether.svg"
                                alt="tether"
                                width={13}
                                height={13}
                            /></div>
                        <div className="flex flex-row gap-1.5 items-baseline relative">
                            <p className="text-medium text-sm text-white">Profit per week:</p>
                            <p className="text-medium text-base text-white">10</p>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-center h-9 w-full rounded-[10px] border-solid border-[1px] border-transparent gradient-profile-three">
                    <p className="text-medium text-base text-white">Attach a crypto wallet</p>
                </div>
              <div className="flex items-center justify-center h-9 w-full rounded-[10px] border-solid border-[1px] border-transparent gradient-profile-two">
                <p className="text-medium text-base text-white">Learn more about the project</p>
              </div>
                <div className="flex items-center justify-around h-10 w-full rounded-[10px] border-solid border-[1px] border-customYellow">
                    <Link href="/" target="_blank"><Image src="unix.svg" alt="unix" width={21} height={21} className="object-contain" /></Link>
                    <div className="w-px h-5 bg-customYellow"></div>
                    <Link href="/" target="_blank"><Image src="instagram.svg" alt="instagram" width={21} height={21} className="object-contain" /></Link>
                    <div className="w-px h-5 bg-customYellow"></div>
                    <Link href="/" target="_blank"><Image src="facebook.svg" alt="facebook" width={21} height={21} className="object-contain" /></Link>
                </div>
            </div>
            <Menu setActiveIcon={setActiveIcon} activeIcon={activeIcon}/>

        </div>
    );
};

export default Page;
