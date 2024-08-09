"use client";
import React, {useEffect, useState, useRef} from "react";
import Image from "next/image";
import Menu from "../menu";
import Link from "next/link";
import {useGameContext} from "../context/game";
import {supabase} from "../utils/supabase/server";

const Page = () => {
    const {score, image, username, userId, profitPerWeek, wallet, setWallet} =
        useGameContext();
    const [activeIcon, setActiveIcon] = useState("game");

    const [isWalletValid, setIsWalletValid] = useState(false);
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [isWalletAttached, setIsWalletAttached] = useState(false);
    const [disabledInput, setDisabledInput] = useState(false);

    const getTriangleClass = () => {
        if (activeIcon === "shop") return "triangle-two";
        if (activeIcon === "game") return "triangle";
        if (activeIcon === "profile") return "triangle-three";
        return "";
    };
    const triangleClass = getTriangleClass();
    const getImageSrc = (score) => {
        if (score >= 0 && score <= 100) {
            return {src: "/coal.svg", text: "Coal"};
        } else if (score > 100 && score <= 500) {
            return {src: "/copper.svg", text: "Copper"};
        } else if (score > 500 && score <= 2000) {
            return {src: "/gold.svg", text: "Gold"};
        } else if (score > 2000 && score <= 5000) {
            return {src: "/emerald.svg", text: "Emerald"};
        } else if (score > 5000 && score <= 10000) {
            return {src: "/diamond.svg", text: "Diamond"};
        } else if (score > 10000) {
            return {src: "/binXcoin.svg", text: "BinXcoin"};
        } else {
            return {src: "/coal.svg", text: "Coal"};
        }
    };
    const clickButtonReplace = () => {
        setDisabledInput(true);
    }

    const inputRef = useRef(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [isFormVisible]);

    useEffect(() => {
        // Проверка валидности при изменении wallet
        const isValid = wallet.length >= 27 && wallet.length <= 34;
        setIsWalletValid(isValid);
    }, [wallet]);

    const handleWalletChange = (e) => {
        setWallet(e.target.value);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isWalletValid) {
            setIsFormSubmitted(true);
            setIsWalletAttached(true);
            setDisabledInput(true);
            try {
                const {data, error} = await supabase
                    .from("Account")
                    .upsert({user_id: userId, wallet: wallet});
                if (error) {
                    console.error(error);
                } else {
                    console.log("Wallet updated successfully");
                }
            } catch (error) {
                console.error(error);
            }
        }
    };

    const toggleFormVisibility = () => {
        setIsFormVisible(!isFormVisible);
        setIsFormSubmitted(false);
    };

    return (
        <div className="h-screen bg-customFon relative">
            {isFormVisible && (
                <div
                    className="absolute w-full h-full bg-customOverlay opacity-60 top-0 left-0 z-10"
                    onClick={toggleFormVisibility}
                ></div>
            )}
            <div className="absolute top-0 left-0 w-full  h-[90vh]">
                <div className="absolute h-[92.9%] w-full bg-white opacity-5 rounded-t-[50px]"></div>
                <div
                    className={`w-full opacity-5 absolute z-20 bottom-0 h-0 triangle-three`}
                ></div>
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
                                src={image ? image : "/binXcoin.svg"}
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
                <span className="font-medium gradient-text">{"@" + username}</span>
            </div>
            <div className="flex flex-col mx-[30px] gap-5 relative">
                {isFormVisible && (
                    <div
                        className="opacity-100 py-3 px-1.5 flex flex-col gap-1.5 absolute left-0 -top-16 w-full z-[200] bg-customFon2 border-[1px] border-solid border-customBorder rounded-xl">
                        <div className="flex flex-row items-center">
                            <p className="text-medium text-base text-white text-center w-full">
                                Enter your wallet
                            </p>
                            <div className="w-4 h-4 cursor-pointer relative mr-2" onClick={toggleFormVisibility}>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-full h-0.5 bg-white transform rotate-45"></div>
                                </div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-full h-0.5 bg-white transform -rotate-45"></div>
                                </div>
                            </div>
                        </div>
                        {isFormSubmitted ? (
                            <div
                                className="w-full bg-customFon px-2.5 py-4 border-[1px]  border-solid border-customBorder rounded-xl">
                                <p className="text-medium text-base text-white text-center">
                                    Your wallet is saved
                                </p>
                            </div>
                        ) : (
                            <form
                                className="flex flex-col gap-1.5 z-50"
                                name="form-wallet"
                                onSubmit={handleSubmit}
                            >
                                <div className="relative">
                                    <input
                                        type="text"
                                        ref={inputRef}
                                        className={`w-full text-medium text-base text-white bg-customFon outline-0 h-[50px] px-2.5 py-4 border-[1px] border-solid border-customBorder rounded-xl pr-6 ${disabledInput ? 'opacity-50' : ''}`}
                                        placeholder=""
                                        minLength="27"
                                        maxLength="34"
                                        value={wallet}
                                        onChange={handleWalletChange}
                                        disabled={disabledInput}
                                    />

                                </div>
                                {isWalletAttached ?
                                    <button
                                        className={`bg-customYellow2 w-full h-8 rounded-xl text-medium text-base ${
                                            !isWalletValid ? "opacity-50" : ""
                                        }`}
                                        disabled={!isWalletValid}
                                    onClick={clickButtonReplace}>Replace
                                    </button> :

                                    <button
                                        type="submit"
                                        className={`bg-customYellow2 w-full h-8 rounded-xl text-medium text-base ${
                                            !isWalletValid ? "opacity-50" : ""
                                        }`}
                                        disabled={!isWalletValid}>Save
                                    </button>
                                }
                            </form>

                        )}
                    </div>
                )}
                <div className="flex flex-row gap-2.5">
                    <div
                        className="overflow-hidden relative w-full p-2.5 rounded-[10px] border-solid border-[1px] border-transparent gradient-profile flex flex-col justify-center">
                        <div className="absolute w-full h-full radial-gradient-two "></div>
                        <div className="flex flex-row gap-1.5 items-baseline relative flex-wrap">
                            <p className="text-medium text-sm text-white">Your score:</p>
                            <p className="text-medium text-base text-white">{score}</p>
                        </div>
                        <div className="flex flex-row gap-1.5 items-baseline relative flex-wrap">
                            <p className="text-medium text-sm text-white">League:</p>
                            <p className="text-medium text-base text-white">
                                {getImageSrc(score).text}
                            </p>
                            <Image
                                src={getImageSrc(score).src}
                                alt="score-based image"
                                width={17}
                                height={17}
                                className="object-cover"
                            />
                        </div>
                    </div>
                    <div
                        className="overflow-hidden relative w-full p-2.5 rounded-[10px] border-solid border-[1px] border-transparent gradient-profile flex flex-col justify-center">
                        <div className="absolute w-full h-full radial-gradient left-0"></div>
                        <div className="flex flex-row gap-1.5 items-baseline relative flex-wrap">
                            <p className="text-medium text-sm text-white">Earned:</p>
                            <p className="text-medium text-base text-white">
                                {(score * 0.0002).toFixed(2)}
                            </p>
                            <Image src="/tether.svg" alt="tether" width={13} height={13}/>
                        </div>
                        <div className="flex flex-row gap-1.5 items-baseline relative flex-wrap">
                            <p className="text-medium text-sm text-white">Profit per week:</p>
                            <p className="text-medium text-base text-white">
                                {profitPerWeek.toFixed(2)}
                            </p>
                        </div>
                    </div>
                </div>
                <div
                    className="cursor-pointer flex items-center justify-center h-9 w-full rounded-[10px] border-solid border-[1px] border-transparent gradient-profile-three"
                    onClick={toggleFormVisibility}
                >
                    <p className="text-medium text-base text-white">
                        {isWalletAttached
                            ? "Change the wallet address"
                            : "Attach a crypto wallet"}
                    </p>
                </div>
                <Link
                    href="/"
                    className="flex items-center justify-center h-9 w-full rounded-[10px] border-solid border-[1px] border-transparent gradient-profile-two"
                >
                    <p className="text-medium text-base text-white">
                        Learn more about the project
                    </p>
                </Link>
                <div
                    className="flex items-center justify-around h-10 w-full rounded-[10px] border-solid border-[1px] border-customYellow">
                    <Link href="/" target="_blank">
                        <Image
                            src="unix.svg"
                            alt="unix"
                            width={21}
                            height={21}
                            className="object-contain"
                        />
                    </Link>
                    <div className="w-px h-5 bg-customYellow"></div>
                    <Link href="/" target="_blank">
                        <Image
                            src="instagram.svg"
                            alt="instagram"
                            width={21}
                            height={21}
                            className="object-contain"
                        />
                    </Link>
                    <div className="w-px h-5 bg-customYellow"></div>
                    <Link href="/" target="_blank">
                        <Image
                            src="facebook.svg"
                            alt="facebook"
                            width={21}
                            height={21}
                            className="object-contain"
                        />
                    </Link>
                </div>
            </div>

            <Menu setActiveIcon={setActiveIcon} activeIcon={activeIcon}/>
        </div>
    );
};

export default Page;
