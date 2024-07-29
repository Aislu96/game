import React from "react";
import Image from "next/image";

const ScoreDisplay = ({ score }) => {
    const getImageSrc = () => {
        if (score >= 0 && score <= 100) {
            return "/coal.svg";
        } else if (score > 100 && score <= 500) {
            return "/copper.svg";
        } else if (score > 500 && score <= 2000) {
            return "/gold.svg";
        } else if (score > 2000 && score <= 5000) {
            return "/emerald.svg";
        } else if (score > 5000 && score <= 10000) {
            return "/diamond.svg";
        } else if (score > 10000) {
            return "/binXCoin.svg";
        } else {
            return  "/coal.svg";
        }
    }

    return (
        <div className="flex flex-row justify-center gap-5 w-full">
            <Image
                src={getImageSrc()}
                alt="score-based image"
                width={50}
                height={50}
            />
            <p className="text-4xl">{score}</p>
        </div>
    );
};

export default ScoreDisplay;
