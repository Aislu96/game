///topList

"use client";

import Image from "next/image";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { list, user } from "../data.js";
import User from "../user.jsx";
import UserTop from "../userTop";
import Link from "next/link";

import { useGameContext } from "../context/game.js";
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase/server";

const TopList = () => {
  const { userId, theTopList } = useGameContext();

  const [isUserInList, setIsUserInList] = useState(false);
  const [user, setUser] = useState(null);
  const [userIndex, setUserIndex] = useState(null);

  useEffect(() => {
    const foundUser = theTopList.find((item) => item.id === userId);
    if (foundUser) {
      setUser(foundUser);
      setUserIndex(theTopList.indexOf(foundUser));
    }
    setIsUserInList(foundUser?.id);
    console.log("foundUser", foundUser, isUserInList, "isUserInList");
  }, [userId]);

  return (
    <div className="h-screen bg-black text-white relative overflow-hidden">
      <Image
        src={"/fireworks.svg"}
        alt={"fireworks"}
        width={375}
        height={279}
        className="object-cover absolute top-0 left-0 w-full z-0"
      />
      <div className="px-[30px] pt-[20px]">
        <Link href="/">
          {" "}
          <Image
            src={"/backArrow.svg"}
            alt="backArrow"
            width={40}
            height={25}
            className="object-cover relative z-10"
          />
        </Link>
      </div>
      <div className=" px-4 flex flex-row justify-between pb-8">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full bg-yellow-500 opacity-30 blur-[120px] -translate-x-1/4 translate-y-1/4"></div>
        <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full bg-purple-600 opacity-30 blur-[120px] translate-x-1/4 -translate-y-1/4"></div>
        <div className="absolute top-1/2 right-1/2 w-[400px] h-[400px] rounded-full bg-blue-500 opacity-20 blur-[100px] -translate-y-1/2 -translate-x-1/2"></div>
        <div className="flex flex-col items-center mt-[45px]">
          <UserTop
            rankSrc="/two.svg"
            userImgSrc={theTopList[1]?.imageSrc}
            username={theTopList[1]?.username}
          />
        </div>
        <div className="flex flex-col items-center ml-4">
          <UserTop
            rankSrc="/one.svg"
            userImgSrc={theTopList[0]?.imageSrc}
            username={theTopList[0]?.username}
          />
        </div>
        <div className="flex flex-col items-center mt-[85px]">
          <UserTop
            rankSrc="/three.svg"
            userImgSrc={theTopList[2]?.imageSrc}
            username={theTopList[2]?.username}
          />
        </div>
      </div>
      <div className="relative">
        <Image
          src={"/fonImg.svg"}
          alt="fontImg"
          width={375}
          height={600}
          className="object-cover w-full absolute z-0 -top-16 left-0 h-[600px]"
        />
        <Image
          src={"/topList.svg"}
          alt="topList"
          width={122}
          height={31}
          className="object-cover h-[31px] mx-auto mb-2.5 relative z-10"
        />
        <ScrollArea className="w-[322px] h-[300px]  px-[5px] pt-3 mx-auto bg-customFon rounded-xl border-[1px] border-customBorder relative z-10">
          {Array.isArray(theTopList) &&
            theTopList.length > 0 &&
            theTopList.slice(3).map(
              (item, index) => (
                console.log(item, "item"),
                (
                  <div className="border-after" key={index}>
                    <User item={item} index={index} />
                  </div>
                )
              )
            )}
          {!isUserInList && (
            <div className="absolute bottom-0 left-0 bg-customGray rounded-b-xl w-full">
              <User item={user} index={userIndex + 1} />
            </div>
          )}
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </div>
    </div>
  );
};

export default TopList;
