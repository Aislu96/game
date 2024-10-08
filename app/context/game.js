"use client";
import { createContext, useContext, useState } from "react";
import { useEffect } from "react";
// import { useRouter } from "next/navigation";

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  // const router = useRouter();
  // useEffect(() => {
  //   if (typeof window !== "undefined" && window.Telegram?.WebApp) {
  //     const userLanguage =
  //       window.Telegram.WebApp.initDataUnsafe?.user?.language_code || "en";
  //     if (userLanguage !== router.locale) {
  //       router.push(router.pathname, router.asPath, { locale: userLanguage });
  //     }
  //   }
  // }, [router]);

  const [score, setScore] = useState(0);
  const [energy, setEnergy] = useState(1000);
  const [userId, setUserId] = useState(null);
  const [image, setImage] = useState(null);
  const [tg, setTg] = useState(null);
  const [username, setUsername] = useState(null);
  const [profitPerRoll, setProfitPerRoll] = useState(1);
  const [wallet, setWallet] = useState("");
  const [theTopList, setTheTopList] = useState([]);
  const [users, setUsers] = useState([]);
  const [theTopFriends, setTheTopFriends] = useState([]);

  const [profitPerWeek, setProfitPerWeek] = useState(0);
  const [language_code, setLanguageCode] = useState("en");

  return (
    <GameContext.Provider
      value={{
        score,
        setScore,
        energy,
        setEnergy,
        userId,
        setUserId,
        tg,
        setTg,
        image,
        setImage,
        username,
        setUsername,
        profitPerRoll,
        setProfitPerRoll,
        profitPerWeek,
        setProfitPerWeek,
        wallet,
        setWallet,
        theTopList,
        setTheTopList,
        users,
        setUsers,
        theTopFriends,
        setTheTopFriends,
        language_code,
        setLanguageCode,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => useContext(GameContext);
