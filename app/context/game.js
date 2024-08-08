"use client";
import { createContext, useContext, useState } from "react";

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [score, setScore] = useState(0);
  const [energy, setEnergy] = useState(1000);
  const [userId, setUserId] = useState(null);
  const [image, setImage] = useState(null);
  const [tg, setTg] = useState(null);
  const [username, setUsername] = useState(null);
  const [profitPerRoll, setProfitPerRoll] = useState(1);
  const [wallet, setWallet] = useState(0);
  const [theTopList, setTheTopList] = useState([]);
  const [users, setUsers] = useState([]);
  const [theTopFriends, setTheTopFriends] = useState([]);

  const [profitPerWeek, setProfitPerWeek] = useState(0);

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
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => useContext(GameContext);
