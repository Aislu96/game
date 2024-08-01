"use client";

import LabeledIcon from "./labeledIcon";

import { useState, useEffect } from "react";

import Game from "./game/game";
import Shop from "./shop/page";
import Profile from "./profile/profile";
import Image from "next/image";
import { useGameContext } from "./context/game";
import { supabase } from "./utils/supabase/server";

const Page = () => {
  const [activeIcon, setActiveIcon] = useState("game");

  const handleTouch = (icon) => {
    setActiveIcon(icon);
  };

  const getIconSrc = (icon) => {
    const iconPaths = {
      shop: "/shop",
      game: "/game",
      profile: "/profile",
    };

    return activeIcon === icon
      ? `${iconPaths[icon]}Active.svg`
      : `${iconPaths[icon]}.svg`;
  };

  const { userId, setUserId, tg, setTg, score, setScore, energy, setEnergy } =
    useGameContext();

  const [startGame, setStartGame] = useState(false);

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

  async function loadUserData() {
    if (!userId) return;
    const { data, error } = await supabase
      .from("Bixcoin")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (error) {
      console.error("Error loading game data:", error);
    } else if (data) {
      const now = new Date();
      const lastUpdated = new Date(data.updated_at);
      const timeDifferenceSeconds = Math.floor((now - lastUpdated) / 1000);
      console.log("Time difference: " + timeDifferenceSeconds);
      const energyGain = Math.floor(timeDifferenceSeconds / 10);
      const newEnergy = Math.min(1000, data.energy + energyGain);

      setScore(data.score);
      setEnergy(newEnergy);

      // Update the user's energy in the database
      const { error: updateError } = await supabase
        .from("Bixcoin")
        .update({ energy: newEnergy, updated_at: now })
        .eq("user_id", userId);

      if (updateError) {
        console.error("Error updating user energy:", updateError);
      } else {
        console.log("User energy updated successfully");
      }
    }
    setStartGame(true);
  }

  useEffect(() => {
    const initializeTelegramWebApp = () => {
      if (typeof window !== "undefined" && window.Telegram?.WebApp) {
        const webApp = window.Telegram.WebApp;
        setTg(webApp);
        const user = webApp.initDataUnsafe?.user;
        if (user?.id) {
          setUserId(user.id);
          window?.Telegram?.WebApp?.disableVerticalSwipes();
          console.log("Telegram user ID set:", user.id);
        } else {
          console.warn("No user ID found in Telegram Web App data");
          setUserId(1); // Fallback for development
        }

        webApp.onEvent("viewportChanged", saveUserData);
        webApp.onEvent("mainButtonClicked", saveUserData);

        // Add event listener for beforeunload
        window.addEventListener("beforeunload", saveUserData);

        setStartGame(true);
      } else {
        console.warn(
          "Telegram Web App not found. Are you running in development mode?"
        );
        setUserId(1); // Fallback for development
        setStartGame(true);
      }
    };

    initializeTelegramWebApp();

    // Cleanup function
    return () => {
      if (typeof window !== "undefined" && window.Telegram?.WebApp) {
        window.Telegram.WebApp.offEvent("viewportChanged", saveUserData);
        window.Telegram.WebApp.offEvent("mainButtonClicked", saveUserData);
      }
      if (typeof window !== "undefined") {
        window.removeEventListener("beforeunload", saveUserData);
      }
    };
  }, []);

  useEffect(() => {
    if (userId) {
      loadUserData();
    }
  }, [userId]);

  return (
    <div className="relative flex flex-col h-screen bg-black text-white overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-orange-500 opacity-30 blur-[120px] -translate-y-1/4 translate-x-1/4"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-purple-600 opacity-30 blur-[120px] translate-y-1/4 -translate-x-1/4"></div>
      <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] rounded-full bg-blue-500 opacity-20 blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>

      <div className="absolute top-0 left-0 w-full h-[89.7%] bg-white opacity-5 z-20 rounded-[50px]"></div>
      <LabeledIcon />
      <Game />

      {/* <Shop />
      <Profile /> */}
      <div className="flex flex-row justify-between w-full px-[30px] z-50 fixed bottom-2 left-0 right-0">
        {["shop", "game", "profile"].map((icon) => (
          <div
            key={icon}
            className="relative"
            onTouchStart={() => handleTouch(icon)}
          >
            <Image
              src={getIconSrc(icon)}
              alt={icon}
              width={46}
              height={46}
              className="object-cover"
            />
            {activeIcon === icon && (
              <Image
                src="/pointer.svg"
                alt="pointer"
                width={20}
                height={20}
                className="absolute -top-8 left-2 object-cover"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
