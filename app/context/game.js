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
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => useContext(GameContext);
