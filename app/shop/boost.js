import Image from "next/image";
import React, {useState} from "react";
import BoostCard from "./boostCard";

const Boast = () => {
    // Состояние для активной карточки
    const [activeCard, setActiveCard] = useState(null);

    // Функция обработки касания
    const handleClick = (cardId) => {
        setActiveCard(prevId => prevId === cardId ? null : cardId); // Переключение состояния
    };

    return (
        <div className="flex flex-col relative mx-auto">
            <Image
                src="/boostImg.svg"
                alt="boost"
                width={113}
                height={29}
                className="object-cover h-[31px] ml-[21px] relative z-10"
            />
            <div
                className="w-[315px] h-[181px] p-2.5 bg-customFon rounded-xl border-[1px] border-customBorder relative z-10">
                <BoostCard
                    iconSrc="lightningTwo.svg"
                    altText="Recover ENERGY"
                    text="Recover ENERGY"
                    isActive={activeCard === 1}
                    onClick={() => handleClick(1)}
                />
                <BoostCard
                    iconSrc="hand.svg"
                    altText="x2 BinXcoin 2 min"
                    text="x2 BinXcoin 2 min"
                    isActive={activeCard === 2}
                    onClick={() => handleClick(2)}
                />
                <BoostCard
                    iconSrc="coins.svg"
                    altText="+100 BinXcoin"
                    text="+100 BinXcoin"
                    isActive={activeCard === 3}
                    onClick={() => handleClick(3)}
                />
            </div>
        </div>
    )
}

export default Boast;