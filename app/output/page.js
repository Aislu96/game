import Image from "next/image";
import React from "react";

const Output = () => {
    return (
        <div className="h-screen bg-black text-white relative overflow-hidden">
            <div className="px-[30px] pt-[20px]">
                <Image
                    src={"/backArrow.svg"}
                    alt="backArrow"
                    width={40}
                    height={25}
                    className="object-cover relative z-10"
                />
            </div>
            <div className="px-[30px] flex flex-row justify-between pb-20">
                <div
                    className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full bg-yellow-500 opacity-30 blur-[120px] -translate-x-1/4 translate-y-1/4"></div>
                <div
                    className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full bg-purple-600 opacity-30 blur-[120px] translate-x-1/4 -translate-y-1/4"></div>
                <div
                    className="absolute top-1/2 right-1/2 w-[400px] h-[400px] rounded-full bg-blue-500 opacity-20 blur-[100px] -translate-y-1/2 -translate-x-1/2"></div>
            </div>
            <div className="relative">
                <Image
                    src={"/fonImg.svg"}
                    alt="fontImg"
                    width={375}
                    height={600}
                    className="object-cover w-full absolute z-0 -top-20 left-0 h-[600px]"
                />
                <Image
                    src={"/output.svg"}
                    alt="output"
                    width={171}
                    height={31}
                    className="object-cover h-[31px] mx-auto mb-2.5 relative z-10"
                />
                <div
                    className="w-[315px] h-[386px] p-2.5 bg-customFon rounded-xl border-[1px] border-customBorder relative z-10 mx-auto">
                    <div className="border-after">
                        <div className="flex flex-row justify-between items-center py-2">
                            <h2 className="text-xl font-normal">Partner brokers</h2>
                            <p className="text-sm font-normal gradient-text">min 10USDT</p>
                        </div>
                        <p className="text-customGray2 text-xs">When choosing a broker, the money will be sent to the personal account of the selected broker</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Output;