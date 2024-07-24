'use client';
import Image from "next/image";
import {useEffect, useState} from "react";

export default function Home() {
    const [score, setScore] = useState(0);
    const [glasses, setGlasses] = useState(1000);
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const handleClockRotationComplete = () => {
        setScore(prevScore => prevScore + 1);
        setGlasses(prevGlasses => prevGlasses - 1);
    };

    useEffect(() => {
        let timer;
        if (!isLoggedIn) {
            timer = setTimeout(() => {
                if (glasses < 1000) {
                    setGlasses(prevGlasses => prevGlasses + 1);
                }
            }, 10000);
        }
        return () => clearTimeout(timer);
    }, [glasses]);

    return (
        <main className="bg-black h-[100vh] overflow-hidden">
            <section className="pt-11 pb-6 mx-auto max-w-96 min-w-80">
                <h1 className="text-3xl text-regular text-white pl-10">Score: {score}</h1>
                <div className="my-[120px] relative flex items-center justify-center">
                    <Image src="/arrow.png" alt="arrow" width={320} height={320} className="object-contain mx-auto"/>
                    <Image src="/clock.png" alt="clock" width={250} height={250} className="object-contain absolute transition-transform duration-1000 ease-in-out transform-gpu hover:rotate-360" onClick={handleClockRotationComplete}/>
                </div>
                <div className="flex flex-row gap-2 w-[320px] justify-center h-[60px]">
                    <Image src="/lightning.svg" width={32} height={48} alt="lightning" className="object-contain w-[32px] h-[48px]"/>
                    <div className="flex flex-col">
                        <div className="flex flex-row items-baseline">
                            <h2 className="text-4xl text-regular text-white">{glasses}</h2>
                            <span className="text-2xl text-regular text-gray-600">/</span>
                            <h2 className="text-2xl text-regular text-gray-600">1000</h2>
                        </div>
                        <p className="text-[10px] text-regular text-white text-center">1 Energy - 10 Sec</p>
                    </div>
                </div>
            </section>
        </main>
    );
}
