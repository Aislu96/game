import Image from "next/image";


const TopList = ({topList, setTopList}) => {
    function handelTouch() {
        setTopList(!topList);
    }

    return (
        <div className="h-screen bg-black text-white relative">
            <Image src={"/fireworks.svg"} alt={"fireworks"} width={375} height={279}
                   className="object-cover absolute top-0 left-0 w-full z-0"/>
            <div className="px-[30px] pt-[20px]">
                <Image src={"/backArrow.svg"} alt="backArrow" width={40} height={25}
                       className="object-cover relative z-10" onTouchStart={() => handelTouch()}/>
            </div>
            <div className="px-[30px] flex flex-row justify-between pb-20">
                <div className="flex flex-col items-center mt-[45px]">
                    <Image src={"/two.svg"} alt="place on the top list" width={42} height={42}
                           className="object-cover relative top-4 z-10"/>
                    <div className="relative">
                        <Image src={"/border.svg"} alt={"border"} width={90} height={90} className="object-cover"/>
                        <div className="absolute top-2.5 left-2">
                            <Image src={"/img.svg"} alt="пользователь" width={76} height={83}
                                   className="object-cover hexagon"/>
                        </div>
                    </div>
                    <p className="text-medium text-sm mt-[5px] gradient-text">ishakumn</p>
                </div>
                <div className="flex flex-col items-center">
                    <Image src={"/one.svg"} alt="place on the top list" width={42} height={42}
                           className="object-cover relative top-4 z-10"/>
                    <div className="relative">
                        <Image src={"/border.svg"} alt={"border"} width={90} height={90} className="object-cover"/>
                        <div className="absolute top-2.5 left-2">
                            <Image src={"/img.svg"} alt="пользователь" width={76} height={83}
                                   className="object-cover hexagon"/>
                        </div>
                    </div>
                    <p className="text-medium text-sm mt-[5px] gradient-text">aislisha96</p>
                </div>
                <div className="flex flex-col items-center  mt-[85px]">
                    <Image src={"/three.svg"} alt="place on the top list" width={42} height={42}
                           className="object-cover relative top-4 z-10" />
                    <div className="relative">
                        <Image src={"/border.svg"} alt={"border"} width={90} height={90} className="object-cover"/>
                        <div className="absolute top-2.5 left-2">
                            <Image src={"/img.svg"} alt="пользователь" width={76} height={83}
                                   className="object-cover hexagon"/>
                        </div>
                    </div>
                    <p className="text-medium text-sm mt-[5px] gradient-text">KotuneN</p>
                </div>
            </div>
            <div className="relative">
                <Image src={"/fonImg.svg"} alt="fontImg" width={375} height={443}
                       className="object-cover w-full absolute z-0 -top-16 left-0"/>
                <Image src={"/topList.svg"} alt="topList" width={122} height={31}
                       className="object-cover h-[31px] mx-auto mb-2.5 relative z-10"/>
                <div
                    className="max-w-fit max-h-322 px-[5px] pt-3 mx-auto bg-customFon rounded-xl border-[1px] border-customBorder relative z-10 overflow-y-scroll">
                    <div className="border-after">
                        <div className="mt-1.5 mx-2.5 flex mb-2 flex-row items-center gap-[38px] ">
                            <div className="flex flex-row gap-[5px] items-center">
                                <p className="font-light text-base min-w-[35px] text-center">4.</p>
                                <div className="relative">
                                    <Image src={"/border.svg"} alt={"border"} width={50} height={50} className="object-cover"/>
                                    <div className="absolute top-[5px] left-[5px]">
                                        <Image src={"/img.svg"} alt="пользователь" width={40} height={46}
                                               className="object-cover hexagon-small"/>
                                    </div>
                                </div>
                                <p className="font-light text-base">ishakumn</p>
                            </div>
                            <div className="flex flex-row gap-[5px]">
                                <Image src={"/arrowsCircle.svg"} alt="arrows in a circle" width={20} height={20}
                                       className="object-contain"/>
                                <p className="font-light text-base">10002</p>
                            </div>
                        </div>
                    </div>
                    <div className="border-after">
                        <div className="mt-1.5 mx-2.5 flex mb-2 flex-row items-center gap-[38px] ">
                            <div className="flex flex-row gap-[5px] items-center">
                                <p className="font-light text-base min-w-[35px] text-center">5.</p>
                                <div className="relative">
                                    <Image src={"/border.svg"} alt={"border"} width={50} height={50} className="object-cover"/>
                                    <div className="absolute top-[5px] left-[5px]">
                                        <Image src={"/img.svg"} alt="пользователь" width={40} height={46}
                                               className="object-cover hexagon-small"/>
                                    </div>
                                </div>
                                <p className="font-light text-base">aislisha96</p>
                            </div>
                            <div className="flex flex-row gap-[5px]">
                                <Image src={"/arrowsCircle.svg"} alt="arrows in a circle" width={20} height={20}
                                       className="object-contain"/>
                                <p className="font-light text-base">10002</p>
                            </div>
                        </div>
                    </div>
                    <div className="border-after">
                        <div className="mt-1.5 mx-2.5 flex mb-2 flex-row items-center gap-[38px] ">
                            <div className="flex flex-row gap-[5px] items-center">
                                <p className="font-light text-base min-w-[35px] text-center">6.</p>
                                <div className="relative">
                                    <Image src={"/border.svg"} alt={"border"} width={50} height={50} className="object-cover"/>
                                    <div className="absolute top-[5px] left-[5px]">
                                        <Image src={"/img.svg"} alt="пользователь" width={40} height={46}
                                               className="object-cover hexagon-small"/>
                                    </div>
                                </div>
                                <p className="font-light text-base">KotuneN</p>
                            </div>
                            <div className="flex flex-row gap-[5px]">
                                <Image src={"/arrowsCircle.svg"} alt="arrows in a circle" width={20} height={20}
                                       className="object-contain"/>
                                <p className="font-light text-base">10002</p>
                            </div>
                        </div>
                    </div>
                    <div className="border-after">
                        <div className="mt-1.5 mx-2.5 flex mb-2 flex-row items-center gap-[38px] ">
                            <div className="flex flex-row gap-[5px] items-center">
                                <p className="font-light text-base min-w-[35px] text-center">7.</p>
                                <div className="relative">
                                    <Image src={"/border.svg"} alt={"border"} width={50} height={50} className="object-cover"/>
                                    <div className="absolute top-[5px] left-[5px]">
                                        <Image src={"/img.svg"} alt="пользователь" width={40} height={46}
                                               className="object-cover hexagon-small"/>
                                    </div>
                                </div>
                                <p className="font-light text-base">aislisha96</p>
                            </div>
                            <div className="flex flex-row gap-[5px]">
                                <Image src={"/arrowsCircle.svg"} alt="arrows in a circle" width={20} height={20}
                                       className="object-contain"/>
                                <p className="font-light text-base">10002</p>
                            </div>
                        </div>
                    </div>
                    <div className="border-after">
                        <div className="mt-1.5 mx-2.5 flex mb-2 flex-row items-center gap-[38px] ">
                            <div className="flex flex-row gap-[5px] items-center">
                                <p className="font-light text-base min-w-[35px] text-center">8.</p>
                                <div className="relative">
                                    <Image src={"/border.svg"} alt={"border"} width={50} height={50} className="object-cover"/>
                                    <div className="absolute top-[5px] left-[5px]">
                                        <Image src={"/img.svg"} alt="пользователь" width={40} height={46}
                                               className="object-cover hexagon-small"/>
                                    </div>
                                </div>
                                <p className="font-light text-base">ishakumn</p>
                            </div>
                            <div className="flex flex-row gap-[5px]">
                                <Image src={"/arrowsCircle.svg"} alt="arrows in a circle" width={20} height={20}
                                       className="object-contain"/>
                                <p className="font-light text-base">10002</p>
                            </div>
                        </div>
                    </div>
                    <div className="border-after">
                        <div className="mt-1.5 mx-2.5 flex mb-2 flex-row items-center gap-[38px] ">
                            <div className="flex flex-row gap-[5px] items-center">
                                <p className="font-light text-base min-w-[35px] text-center">9.</p>
                                <div className="relative">
                                    <Image src={"/border.svg"} alt={"border"} width={50} height={50} className="object-cover"/>
                                    <div className="absolute top-[5px] left-[5px]">
                                        <Image src={"/img.svg"} alt="пользователь" width={40} height={46}
                                               className="object-cover hexagon-small"/>
                                    </div>
                                </div>
                                <p className="font-light text-base">ishakumn</p>
                            </div>
                            <div className="flex flex-row gap-[5px]">
                                <Image src={"/arrowsCircle.svg"} alt="arrows in a circle" width={20} height={20}
                                       className="object-contain"/>
                                <p className="font-light text-base">10002</p>
                            </div>
                        </div>
                    </div>
                    <div className="border-after">
                        <div className="mt-1.5 mx-2.5 flex mb-2 flex-row items-center gap-[38px] ">
                            <div className="flex flex-row gap-[5px] items-center">
                                <p className="font-light text-base min-w-[35px] text-center">10.</p>
                                <div className="relative">
                                    <Image src={"/border.svg"} alt={"border"} width={50} height={50} className="object-cover"/>
                                    <div className="absolute top-[5px] left-[5px]">
                                        <Image src={"/img.svg"} alt="пользователь" width={40} height={46}
                                               className="object-cover hexagon-small"/>
                                    </div>
                                </div>
                                <p className="font-light text-base">aislisha96</p>
                            </div>
                            <div className="flex flex-row gap-[5px]">
                                <Image src={"/arrowsCircle.svg"} alt="arrows in a circle" width={20} height={20}
                                       className="object-contain"/>
                                <p className="font-light text-base">10002</p>
                            </div>
                        </div>
                    </div>
                    <div className="border-after">
                        <div className="mt-1.5 mx-2.5 flex mb-2 flex-row items-center gap-[38px] ">
                            <div className="flex flex-row gap-[5px] items-center">
                                <p className="font-light text-base min-w-[35px] text-center">11.</p>
                                <div className="relative">
                                    <Image src={"/border.svg"} alt={"border"} width={50} height={50} className="object-cover"/>
                                    <div className="absolute top-[5px] left-[5px]">
                                        <Image src={"/img.svg"} alt="пользователь" width={40} height={46}
                                               className="object-cover hexagon-small"/>
                                    </div>
                                </div>
                                <p className="font-light text-base">aislisha96</p>
                            </div>
                            <div className="flex flex-row gap-[5px]">
                                <Image src={"/arrowsCircle.svg"} alt="arrows in a circle" width={20} height={20}
                                       className="object-contain"/>
                                <p className="font-light text-base">10002</p>
                            </div>
                        </div>
                    </div>
                    <div className="border-after">
                        <div className="mt-1.5 mx-2.5 flex mb-2 flex-row items-center gap-[38px] ">
                            <div className="flex flex-row gap-[5px] items-center">
                                <p className="font-light text-base min-w-[35px] text-center">12.</p>
                                <div className="relative">
                                    <Image src={"/border.svg"} alt={"border"} width={50} height={50} className="object-cover"/>
                                    <div className="absolute top-[5px] left-[5px]">
                                        <Image src={"/img.svg"} alt="пользователь" width={40} height={46}
                                               className="object-cover hexagon-small"/>
                                    </div>
                                </div>
                                <p className="font-light text-base">KotuneN</p>
                            </div>
                            <div className="flex flex-row gap-[5px]">
                                <Image src={"/arrowsCircle.svg"} alt="arrows in a circle" width={20} height={20}
                                       className="object-contain"/>
                                <p className="font-light text-base">10002</p>
                            </div>
                        </div>
                    </div>
                    <div className="border-after">
                        <div className="mt-1.5 mx-2.5 flex mb-2 flex-row items-center gap-[38px] ">
                            <div className="flex flex-row gap-[5px] items-center">
                                <p className="font-light text-base min-w-[35px] text-center">13.</p>
                                <div className="relative">
                                    <Image src={"/border.svg"} alt={"border"} width={50} height={50} className="object-cover"/>
                                    <div className="absolute top-[5px] left-[5px]">
                                        <Image src={"/img.svg"} alt="пользователь" width={40} height={46}
                                               className="object-cover hexagon-small"/>
                                    </div>
                                </div>
                                <p className="font-light text-base">aislisha96</p>
                            </div>
                            <div className="flex flex-row gap-[5px]">
                                <Image src={"/arrowsCircle.svg"} alt="arrows in a circle" width={20} height={20}
                                       className="object-contain"/>
                                <p className="font-light text-base">10002</p>
                            </div>
                        </div>
                    </div>
                    <div className="border-after">
                        <div className="mt-1.5 mx-2.5 flex mb-2 flex-row items-center gap-[38px] ">
                            <div className="flex flex-row gap-[5px] items-center">
                                <p className="font-light text-base min-w-[35px] text-center">14.</p>
                                <div className="relative">
                                    <Image src={"/border.svg"} alt={"border"} width={50} height={50} className="object-cover"/>
                                    <div className="absolute top-[5px] left-[5px]">
                                        <Image src={"/img.svg"} alt="пользователь" width={40} height={46}
                                               className="object-cover hexagon-small"/>
                                    </div>
                                </div>
                                <p className="font-light text-base">aislisha96</p>
                            </div>
                            <div className="flex flex-row gap-[5px]">
                                <Image src={"/arrowsCircle.svg"} alt="arrows in a circle" width={20} height={20}
                                       className="object-contain"/>
                                <p className="font-light text-base">10002</p>
                            </div>
                        </div>
                    </div>
                    <div className="border-after">
                        <div className="mt-1.5 mx-2.5 flex mb-2 flex-row items-center gap-[38px] ">
                            <div className="flex flex-row gap-[5px] items-center">
                                <p className="font-light text-base min-w-[35px] text-center">15.</p>
                                <div className="relative">
                                    <Image src={"/border.svg"} alt={"border"} width={50} height={50} className="object-cover"/>
                                    <div className="absolute top-[5px] left-[5px]">
                                        <Image src={"/img.svg"} alt="пользователь" width={40} height={46}
                                               className="object-cover hexagon-small"/>
                                    </div>
                                </div>
                                <p className="font-light text-base">KotuneN</p>
                            </div>
                            <div className="flex flex-row gap-[5px]">
                                <Image src={"/arrowsCircle.svg"} alt="arrows in a circle" width={20} height={20}
                                       className="object-contain"/>
                                <p className="font-light text-base">10002</p>
                            </div>
                        </div>
                    </div>
                    <div className="border-after">
                        <div className="mt-1.5 mx-2.5 flex mb-2 flex-row items-center gap-[38px] ">
                            <div className="flex flex-row gap-[5px] items-center">
                                <p className="font-light text-base min-w-[35px] text-center">16.</p>
                                <div className="relative">
                                    <Image src={"/border.svg"} alt={"border"} width={50} height={50} className="object-cover"/>
                                    <div className="absolute top-[5px] left-[5px]">
                                        <Image src={"/img.svg"} alt="пользователь" width={40} height={46}
                                               className="object-cover hexagon-small"/>
                                    </div>
                                </div>
                                <p className="font-light text-base">KotuneN</p>
                            </div>
                            <div className="flex flex-row gap-[5px]">
                                <Image src={"/arrowsCircle.svg"} alt="arrows in a circle" width={20} height={20}
                                       className="object-contain"/>
                                <p className="font-light text-base">10002</p>
                            </div>
                        </div>
                    </div>
                    <div className="border-after">
                        <div className="mt-1.5 mx-2.5 flex mb-2 flex-row items-center gap-[38px] ">
                            <div className="flex flex-row gap-[5px] items-center">
                                <p className="font-light text-base min-w-[35px] text-center">17.</p>
                                <div className="relative">
                                    <Image src={"/border.svg"} alt={"border"} width={50} height={50} className="object-cover"/>
                                    <div className="absolute top-[5px] left-[5px]">
                                        <Image src={"/img.svg"} alt="пользователь" width={40} height={46}
                                               className="object-cover hexagon-small"/>
                                    </div>
                                </div>
                                <p className="font-light text-base">aislisha96</p>
                            </div>
                            <div className="flex flex-row gap-[5px]">
                                <Image src={"/arrowsCircle.svg"} alt="arrows in a circle" width={20} height={20}
                                       className="object-contain"/>
                                <p className="font-light text-base">10002</p>
                            </div>
                        </div>
                    </div>
                    <div className="border-after">
                        <div className="mt-1.5 mx-2.5 flex mb-2 flex-row items-center gap-[38px] ">
                            <div className="flex flex-row gap-[5px] items-center">
                                <p className="font-light text-base min-w-[35px] text-center">18.</p>
                                <div className="relative">
                                    <Image src={"/border.svg"} alt={"border"} width={50} height={50} className="object-cover"/>
                                    <div className="absolute top-[5px] left-[5px]">
                                        <Image src={"/img.svg"} alt="пользователь" width={40} height={46}
                                               className="object-cover hexagon-small"/>
                                    </div>
                                </div>
                                <p className="font-light text-base">ishakumn</p>
                            </div>
                            <div className="flex flex-row gap-[5px]">
                                <Image src={"/arrowsCircle.svg"} alt="arrows in a circle" width={20} height={20}
                                       className="object-contain"/>
                                <p className="font-light text-base">10002</p>
                            </div>
                        </div>
                    </div>
                    <div className="border-after">
                        <div className="mt-1.5 mx-2.5 flex mb-2 flex-row items-center gap-[38px] ">
                            <div className="flex flex-row gap-[5px] items-center">
                                <p className="font-light text-base min-w-[35px] text-center">19.</p>
                                <div className="relative">
                                    <Image src={"/border.svg"} alt={"border"} width={50} height={50} className="object-cover"/>
                                    <div className="absolute top-[5px] left-[5px]">
                                        <Image src={"/img.svg"} alt="пользователь" width={40} height={46}
                                               className="object-cover hexagon-small"/>
                                    </div>
                                </div>
                                <p className="font-light text-base">aislisha96</p>
                            </div>
                            <div className="flex flex-row gap-[5px]">
                                <Image src={"/arrowsCircle.svg"} alt="arrows in a circle" width={20} height={20}
                                       className="object-contain"/>
                                <p className="font-light text-base">10002</p>
                            </div>
                        </div>
                    </div>
                    <div className="border-after">
                        <div className="mt-1.5 mx-2.5 flex mb-2 flex-row items-center gap-[38px] ">
                            <div className="flex flex-row gap-[5px] items-center">
                                <p className="font-light text-base min-w-[35px] text-center">20.</p>
                                <div className="relative">
                                    <Image src={"/border.svg"} alt={"border"} width={50} height={50} className="object-cover"/>
                                    <div className="absolute top-[5px] left-[5px]">
                                        <Image src={"/img.svg"} alt="пользователь" width={40} height={46}
                                               className="object-cover hexagon-small"/>
                                    </div>
                                </div>
                                <p className="font-light text-base">ishakumn</p>
                            </div>
                            <div className="flex flex-row gap-[5px]">
                                <Image src={"/arrowsCircle.svg"} alt="arrows in a circle" width={20} height={20}
                                       className="object-contain"/>
                                <p className="font-light text-base">10002</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TopList;