"use client";

import LabeledIcon from "./labeledIcon";
import { useState, useEffect, use } from "react";
import Game from "./game/game";
import Shop from "./shop/page";
import Image from "next/image";
import { useGameContext } from "./context/game";
import { supabase } from "./utils/supabase/server";
import Menu from "./menu";
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

  const {
    userId,
    setUserId,
    tg,
    setTg,
    score,
    setScore,
    energy,
    setEnergy,
    setImage,
    setUsername,
    setProfitPerWeek,
  } = useGameContext();

  const [startGame, setStartGame] = useState(false);

  async function saveUserData() {
    if (!userId) return;

    // Fetch user's profile photos
    const profilePhotos = await bot.getUserProfilePhotos(userId);
    let profilePictureUrl = null;
    if (profilePhotos.total_count > 0) {
      const fileId = profilePhotos.photos[0][0].file_id;
      const file = await bot.getFile(fileId);
      profilePictureUrl = `https://api.telegram.org/file/bot${process.env.TELEGRAM_BOT_TOKEN}/${file.file_path}`;
    }

    const { data, error } = await supabase.from("Bixcoin").upsert({
      user_id: userId,
      score: score,
      energy: energy,
      updated_at: new Date(),
      first_name: tg?.initDataUnsafe?.user?.first_name,
      last_name: tg?.initDataUnsafe?.user?.last_name,
      username: tg?.initDataUnsafe?.user?.username,
      language_code: tg?.initDataUnsafe?.user?.language_code,
      profile_picture: profilePictureUrl, // Save profile picture URL
    });
    if (error) console.error("Error saving game data:", error);
    else console.log("Game data saved successfully");
  }

  async function loadUserData() {
    console.log("Loading user data");
    if (!userId) return;
    const { data, error } = await supabase
      .from("Bixcoin")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (error) {
      console.error("Error loading game data:", error);
    } else if (data) {
      console.log("User data loaded successfully");
      const now = new Date();
      const lastUpdated = new Date(data.updated_at);
      const timeDifferenceSeconds = Math.floor((now - lastUpdated) / 1000);
      console.log("Time difference: " + timeDifferenceSeconds);
      const energyGain = Math.floor(timeDifferenceSeconds / 10);
      const newEnergy = Math.min(1000, data.energy + energyGain);

      console.log(data);

      setScore(data.score);
      setEnergy(newEnergy);
      setImage(data.profile_picture);
      setUsername(data.username);

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
    const initializeTelegramWebApp = async () => {
      if (typeof window !== "undefined" && window.Telegram?.WebApp) {
        window.Telegram.WebApp.expand();
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
        // await loadUserData();

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

    // Prevent default touch actions only on the main container
    const preventDefaultTouch = (e) => {
      if (e.target.closest(".wheel-container")) return; // Allow touches on the wheel
      e.preventDefault();
    };

    document.addEventListener("touchmove", preventDefaultTouch, {
      passive: false,
    });

    // Cleanup function
    return () => {
      if (typeof window !== "undefined" && window.Telegram?.WebApp) {
        window.Telegram.WebApp.offEvent("viewportChanged", saveUserData);
        window.Telegram.WebApp.offEvent("mainButtonClicked", saveUserData);
      }
      if (typeof window !== "undefined") {
        window.removeEventListener("beforeunload", saveUserData);
      }
      document.removeEventListener("touchmove", preventDefaultTouch);
    };
  }, []);

  const calculateProfitPerWeek = async () => {
    const { data, error } = await supabase
      .from("Bixcoin")
      .select("updated_at")
      .eq("user_id", userId)
      .single();

    if (error) {
      console.error("Error fetching data from Bixcoin table:", error);
      return;
    }

    const updatedAt = new Date(data.updated_at);
    const now = new Date();
    const daysSinceUpdate = Math.floor(
      (now - updatedAt) / (1000 * 60 * 60 * 24)
    );
    const profitPerWeek = ((7 - daysSinceUpdate) / 7) * score;
    const formattedProfitPerWeek = Math.max(0, profitPerWeek);

    setProfitPerWeek(formattedProfitPerWeek);
  };

  useEffect(() => {
    if (userId) {
      loadUserData();
      calculateProfitPerWeek();
    }
  }, [userId]);

  return (
    <div className="relative flex flex-col h-screen bg-black text-white overflow-hidden rounded-t-xl">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-orange-500 opacity-30 blur-[120px] -translate-y-1/4 translate-x-1/4"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-purple-600 opacity-30 blur-[120px] translate-y-1/4 -translate-x-1/4"></div>
      <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] rounded-full bg-blue-500 opacity-20 blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute top-0 left-0 w-full  h-[90vh] z-20">
        <div className="absolute h-[92.9%] w-full bg-white opacity-5 z-20"></div>
        <div
          className={`w-full opacity-5 absolute z-20 bottom-0 h-0 triangle`}
        ></div>
      </div>

      <LabeledIcon />
      {/* <div className="absolute top-[17%] left-0 w-full h-[90vh] z-20 wheel-container"> */}
      <Game />
      {/* </div> */}

      <Menu setActiveIcon={setActiveIcon} activeIcon={activeIcon} />
    </div>
  );
};

export default Page;
