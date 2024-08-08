"use client";
import { supabase } from "../utils/supabase/server";
import Image from "next/image";
import React, { use, useEffect, useState } from "react";
import BoostCard from "./boostCard";
import { useGameContext } from "../context/game";

const Boast = () => {
  const { userId, setEnergy, score, setScore, setProfitPerRoll } =
    useGameContext();
  const [boostTimes, setBoostTimes] = useState({
    recover: null,
    x2: null,
    plus100: null,
  });

  useEffect(() => {
    const fetchBoostTimes = async () => {
      const { data, error } = await supabase
        .from("Boost")
        .select("recover, x2, plus100")
        .eq("user_id", userId)
        .single();
      if (error) {
        console.error("Error fetching boost times:", error);
      } else if (data) {
        const updatedBoostTimes = {
          recover: calculateRemainingTime(data.recover, 24 * 60 * 60),
          x2: calculateRemainingTime(data.x2, 2 * 60 * 60),
          plus100: calculateRemainingTime(data.plus100, 60 * 60),
        };
        console.log("Updated boost times:", updatedBoostTimes);
        setBoostTimes(updatedBoostTimes);
      }
    };
    fetchBoostTimes();
  }, [userId]);

  const calculateRemainingTime = (boostTime, allocatedDuration) => {
    console.log(
      "Boost time",
      boostTime,
      "Allocated duration",
      allocatedDuration
    );
    if (!boostTime) return 0; // Changed from allocatedDuration to 0
    const now = new Date();
    const boostDate = new Date(boostTime);
    const remainingTime = Math.max(
      0,
      allocatedDuration - (now - boostDate) / 1000
    );
    console.log("Remaining time", remainingTime);
    return remainingTime;
  };
  const handleBoost = async (column) => {
    const now = new Date().toISOString();
    const { data, error } = await supabase.from("Boost").upsert(
      {
        user_id: userId,
        [column]: now,
      },
      {
        onConflict: "user_id",
      }
    );
    if (error) {
      console.error("Error updating boost:", error);
    } else {
      console.log("Boost updated successfully");
      // Update local state
      setBoostTimes((prev) => ({
        ...prev,
        [column]:
          column === "recover"
            ? 24 * 60 * 60
            : column === "x2"
            ? 2 * 60 * 60
            : 60 * 60,
      }));
    }
  };

  useEffect(() => {
    console.log("Boost times", boostTimes);
  }, [boostTimes]);

  return (
    <div className="flex flex-col relative mx-auto">
      <Image
        src="/boostImg.png"
        alt="boost"
        width={113}
        height={29}
        className="object-cover h-[31px] ml-[21px] relative z-10"
      />
      <div className="w-[315px] h-[181px] p-2.5 bg-customFon rounded-xl border-[1px] border-customBorder relative z-10">
        <BoostCard
          iconSrc="lightningTwo.svg"
          altText="Recover ENERGY"
          text="Recover ENERGY"
          duration={boostTimes.recover}
          onClick={() => {
            handleBoost("recover");
            setEnergy(1000);
          }}
        />
        <BoostCard
          iconSrc="hand.svg"
          altText="x2 BinXcoin 2 min"
          text="x2 BinXcoin 2 min"
          duration={boostTimes.x2}
          onClick={() => {
            handleBoost("x2");
            setProfitPerRoll(2);
            setTimeout(() => {
              setProfitPerRoll(1);
            }, 2 * 60 * 1000); // 2 minutes
          }}
        />
        <BoostCard
          iconSrc="coins.svg"
          altText="plus100 BinXcoin"
          text="plus100 BinXcoin"
          duration={boostTimes.plus100}
          onClick={() => {
            handleBoost("plus100");
            setScore(score + 100);
          }}
        />
      </div>
    </div>
  );
};

export default Boast;
