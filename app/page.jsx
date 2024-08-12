"use client";

import LabeledIcon from "./game/labeledIcon";
import { useState, useEffect, use } from "react";
import Game from "./game/game";
import Shop from "./shop/page";
import Image from "next/image";
import { useGameContext } from "./context/game";
import { supabase } from "./utils/supabase/server";
import Menu from "./menu";
import Friends from "./friends/page";
import BgGradient from "./bgGradient";

const Page = () => {
  const [activeIcon, setActiveIcon] = useState("game");

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
    setWallet,
    setTheTopList,
    setTheTopFriends,
    language_code,
    setLanguageCode,
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

  async function getUserWallet() {
    if (!userId) return;
    const { data, error } = await supabase
      .from("Account")
      .select("wallet")
      .eq("user_id", userId)
      .single();

    if (error) {
      console.error("Error fetching user wallet:", error);
      return;
    }

    setWallet(data.wallet);
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
      setLanguageCode(data.language_code);

      await getUserWallet();
    }

    calculateProfitPerWeek(data.updated_at);
    await getUsersSortedByScore();
    await getFriendsSortedByScore();

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

  const calculateProfitPerWeek = (updated_at) => {
    const updatedAt = new Date(updated_at);
    const now = new Date();
    const daysSinceUpdate = Math.floor(
      (now - updatedAt) / (1000 * 60 * 60 * 24)
    );
    const profitPerWeek = ((7 - daysSinceUpdate) / 7) * score;
    const formattedProfitPerWeek = Math.max(0, profitPerWeek);

    setProfitPerWeek(formattedProfitPerWeek * 0.0002);
  };

  async function getUsersSortedByScore() {
    // Fetch data from the Bixcoin table
    let { data, error } = await supabase
      .from("Bixcoin")
      .select("user_id, username, score, profile_picture");

    if (error) {
      console.error("Error fetching data:", error);
      return [];
    }

    // Map the data to the desired format
    const users = data.map((user) => ({
      id: user.user_id,
      username: user.username,
      score: user.score,
      imageSrc: user.profile_picture ? user.profile_picture : "/binXcoin.svg",
    }));

    // Sort the users by score in descending order
    users.sort((a, b) => b.score - a.score);

    console.log(users, "users");
    const topList = users.slice(0, 20);
    setTheTopList(topList);
  }

  async function getFriendsSortedByScore() {
    // Fetch friends from the Friends table
    let { data: friendsData, error: friendsError } = await supabase
      .from("Friends")
      .select("friends_id")
      .eq("user_id", userId);

    if (friendsError) {
      console.error("Error fetching friends:", friendsError);
      return [];
    }

    // Extract friend IDs
    const friendIds = friendsData.map((friend) => friend.friends_id);

    friendIds.push(userId);

    // Fetch data for friends from the Bixcoin table
    let { data: bixcoinData, error: bixcoinError } = await supabase
      .from("Bixcoin")
      .select("user_id, username, score, profile_picture")
      .in("user_id", friendIds);

    if (bixcoinError) {
      console.error("Error fetching friend data:", bixcoinError);
      return [];
    }

    // Map the data to the desired format
    const friends = bixcoinData.map((friend) => ({
      id: friend.user_id,
      username: friend.username,
      score: friend.score,
      imageSrc: friend.profile_picture
        ? friend.profile_picture
        : "/binXcoin.svg",
    }));

    friends.sort((a, b) => b.score - a.score);

    console.log(friends, "friends");

    const topFriends = friends.slice(0, 20);
    setTheTopFriends(topFriends);
  }

  useEffect(() => {
    if (userId) {
      loadUserData();
    }
  }, [userId]);

  return (
    <div className="relative flex flex-col h-screen bg-[url('/gameBG2.svg')] bg-black bg-cover  text-white ">
      <div className="absolute top-0 left-0 w-full  h-[90vh] ">
        <div className="absolute h-[92.9%] w-full bg-white opacity-5 "></div>
        <div
          className={`w-full opacity-5 absolute  -bottom-[0.3px] h-0 triangle`}
        ></div>
      </div>

      <Game />

      <Menu setActiveIcon={setActiveIcon} activeIcon={activeIcon} />
    </div>
  );
};

export default Page;
