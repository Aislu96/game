"use client";
import { createContext, useContext, useState } from "react";

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [score, setScore] = useState(0);
  const [energy, setEnergy] = useState(1000);

  return (
    <GameContext.Provider
      value={{
        score,
        setScore,
        energy,
        setEnergy,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => useContext(GameContext);
