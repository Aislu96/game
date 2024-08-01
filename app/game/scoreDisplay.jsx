import React from "react";
import Image from "next/image";
import { useGameContext } from "../context/game";
import { useEffect } from "react";
import { supabase } from "../utils/supabase/server";

const ScoreDisplay = () => {
  const { userId, energy, tg } = useGameContext();

  async function saveUserData() {
    if (!userId) return;
    const { data, error } = await supabase.from("Bixcoin").upsert({
      user_id: userId,
      score: score,
      energy: energy,
      updated_at: new Date(),
      first_name: tg?.initDataUnsafe?.user?.first_name,
      last_name: tg?.initDataUnsafe?.user?.last_name,
      username: tg?.initDataUnsafe?.user?.username,
      language_code: tg?.initDataUnsafe?.user?.language_code,
    });
    if (error) console.error("Error saving game data:", error);
    else console.log("Game data saved successfully");
  }

  const { score } = useGameContext();
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
      return "/coal.svg";
    }
  };

  useEffect(() => {
    saveUserData();
  }, [score]);

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
