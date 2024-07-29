"use client";
import React, { useState, useRef, useEffect, useCallback, use } from "react";
import { FaCircle } from "react-icons/fa";
import Image from "next/image";
import { supabase } from "./utils/supabase/server";
import { ImSpinner9 } from "react-icons/im";

const RotatingClockGame = () => {
  const [score, setScore] = useState(0);
  const [energy, setEnergy] = useState(1000);
  const [rotation, setRotation] = useState(0);
  const [startAngle, setStartAngle] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const clockRef = useRef(null);
  const lastAngleRef = useRef(0);
  const rotationCountRef = useRef(0);
  const [startGame, setStartGame] = useState(false);
  const [userId, setUserId] = useState(null);
  const [tg, setTg] = useState(null);

  async function saveUserData() {
    if (!userId) return;
    const { data, error } = await supabase.from("Bixcoin").upsert({
      user_id: userId,
      score: score,
      energy: energy,
      updated_at: new Date(),
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
    saveUserData();
    // const saveInterval = setInterval(saveUserData, 30000); // Save every 30 seconds

    // return () => clearInterval(saveInterval);
  }, [score]);

  useEffect(() => {
    const interval = setInterval(() => {
      setEnergy((prevEnergy) => Math.min(1000, prevEnergy + 1));
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (userId) {
      loadUserData();
    }
  }, [userId]);

  const calculateAngle = (clientX, clientY) => {
    const rect = clockRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    let angle =
      Math.atan2(clientY - centerY, clientX - centerX) * (180 / Math.PI);
    return (angle + 360) % 360; // Normalize to 0-360
  };

  const handleStart = (clientX, clientY) => {
    setIsDragging(true);
    const angle = calculateAngle(clientX, clientY);
    setStartAngle(angle);
    lastAngleRef.current = angle;
    rotationCountRef.current = 0;
  };

  const handleMove = (clientX, clientY) => {
    if (!isDragging) return;
    const currentAngle = calculateAngle(clientX, clientY);
    let angleDiff = currentAngle - lastAngleRef.current;

    // Adjust for the boundary between 359 and 0 degrees
    if (angleDiff < -180) angleDiff += 360;
    if (angleDiff > 180) {
      setIsDragging(false);
    }

    if (angleDiff > 0) {
      rotationCountRef.current += angleDiff;
      setRotation(currentAngle);

      // Check for full rotation
      if (
        rotationCountRef.current >= 360 &&
        Math.abs(currentAngle - startAngle) < 30
      ) {
        setScore((prevScore) => prevScore + 1);
        setEnergy((prevEnergy) => Math.max(0, prevEnergy - 1));
        rotationCountRef.current = 0;
      }

      lastAngleRef.current = currentAngle;
    } else {
      setIsDragging(false);
    }
  };

  const handleEnd = () => {
    setIsDragging(false);
  };

  // function ensureDocumentIsScrollable() {
  //   const isScrollable =
  //     document.documentElement.scrollHeight > window.innerHeight;
  //   if (!isScrollable) {
  //     document.documentElement.style.setProperty(
  //       "height",
  //       "calc(100vh + 1px)",
  //       "important"
  //     );
  //   }
  // }
  // function preventCollapse() {
  //   if (window.scrollY === 0) {
  //     window.scrollTo(0, 1);
  //   }
  // }

  // const scrollableElement = document.querySelector(".scrollable-element");
  // scrollableElement.addEventListener("touchstart", preventCollapse);

  // window.addEventListener("load", ensureDocumentIsScrollable);

  // // Prevent windwo.scrollY from becoming zero
  // function preventCollapse(event) {
  //   if (window.scrollY === 0) {
  //     window.scrollTo(0, 1);
  //   }
  // }

  // // Attach the above function to the touchstart event handler of the scrollable element
  // // const scrollableElement = document.querySelector(".scrollable-element");
  // scrollableElement.addEventListener("touchstart", preventCollapse);

  // const preventCollapse = useCallback(() => {
  //   if (typeof window !== "undefined" && window.scrollY === 0) {
  //     window.scrollTo(0, 1);
  //   }
  // }, []);

  // const ensureDocumentIsScrollable = useCallback(() => {
  //   if (typeof window !== "undefined") {
  //     const isScrollable =
  //       document.documentElement.scrollHeight > window.innerHeight;
  //     if (!isScrollable) {
  //       document.documentElement.style.setProperty(
  //         "height",
  //         "calc(100vh + 1px)",
  //         "important"
  //       );
  //     }
  //   }
  // }, []);

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     window.addEventListener("load", ensureDocumentIsScrollable);

  //     const scrollableElement = document.querySelector(".scrollable-element");
  //     if (scrollableElement) {
  //       scrollableElement.addEventListener("touchstart", preventCollapse);
  //     }

  //     return () => {
  //       window.removeEventListener("load", ensureDocumentIsScrollable);
  //       if (scrollableElement) {
  //         scrollableElement.removeEventListener("touchstart", preventCollapse);
  //       }
  //     };
  //   }
  // }, [ensureDocumentIsScrollable, preventCollapse]);

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     // Prevent default touch actions
  //     document.addEventListener(
  //       "touchstart",
  //       function (event) {
  //         event.preventDefault();
  //       },
  //       { passive: false }
  //     );

  //     document.addEventListener(
  //       "touchmove",
  //       function (event) {
  //         event.preventDefault();
  //       },
  //       { passive: false }
  //     );

  //     document.addEventListener(
  //       "touchend",
  //       function (event) {
  //         event.preventDefault();
  //       },
  //       { passive: false }
  //     );
  //   }
  // }, []);

  return (
    <div className=" h-screen bg-black  text-white flex flex-col items-center justify-between pt-20">
      <div className="text-4xl mb-4 w-full px-10">Score: {score}</div>
      <div className="relative flex items-center justify-center">
        <div className="bg-[url('/arrow.svg')] h-[380px] w-[380px] bg-cover flex items-center justify-center">
          <div
            ref={clockRef}
            className="w-[295px] h-[295px] rounded-full mb-5 bg-white relative touch-none flex items-center justify-center"
            onTouchStart={(e) => {
              e.preventDefault(); // Prevent default touch behavior
              handleStart(e.touches[0].clientX, e.touches[0].clientY);
            }}
            onTouchMove={(e) => {
              e.preventDefault(); // Prevent default touch behavior
              handleMove(e.touches[0].clientX, e.touches[0].clientY);
            }}
            onTouchEnd={(e) => {
              e.preventDefault(); // Prevent default touch behavior
              handleEnd();
            }}
          >
            <div
              className="absolute top-0 left-1/2 w-1.5 h-1/2 bg-black origin-bottom rounded-full"
              style={{ transform: `rotate(${rotation}deg)` }}
            >
              <FaCircle className="text-black absolute top-full  left-1/2 text-2xl -translate-x-1/2 -translate-y-1/2" />
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6 flex">
        <Image
          src={"/lightning.svg"}
          alt="Lightning"
          width={36}
          height={50}
          className="mr-4 mb-4"
        />
        <span className="space-y-2">
          <div className="flex items-end">
            <h1 className="text-5xl"> {energy}</h1>
            <h3 className="text-3xl text-stone-400">/1000</h3>
          </div>
          <div className="text-sm text-center">1 Energy - 10 Sec</div>
        </span>
      </div>
    </div>
  );
};

export default RotatingClockGame;
