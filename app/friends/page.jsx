"use client";
import Image from "next/image";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import User from "../user.jsx";
import UserTop from "../userTop";
import Link from "next/link";
import { useGameContext } from "../context/game.js";
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase/server";
import { useRouter } from "next/navigation";
import Wheel from "../game/wheel";
import Game from "../game/game";
import LabeledIcon from "../labeledIcon";
import Menu from "../menu";

const Friends = () => {
  const { userId, score, image, username, theTopFriends } = useGameContext();
  const [isUserInList, setIsUserInList] = useState(false);
  const [user, setUser] = useState(null);
  const [userIndex, setUserIndex] = useState(null);

  useEffect(() => {
    const foundUser = theTopFriends.find((item) => item.id === userId);
    if (foundUser) {
      setUser(foundUser);
      setUserIndex(theTopFriends.indexOf(foundUser));
    }
    setIsUserInList(foundUser?.id);
  }, [userId]);

  const [isTouched, setIsTouched] = useState(false);

  const handleTouchStart = () => {
    setIsTouched(true);
  };

  const handleTouchEnd = () => {
    setIsTouched(false);
  };

  const handleAddFriendClick = () => {
    const inviteLink = `https://t.me/BIXXcoin_bot/?start=invite_${userId}`;
    const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(
      inviteLink
    )}&text=${encodeURIComponent("Join me on BIXcoin!")}`;
    window.open(telegramUrl, "_blank");
  };

  useEffect(() => {
    setIsUserInList(theTopFriends.some((item) => item.id === userId));
    console.log(isUserInList, "isUserInList", userId, "userId");
  }, [userId]);

  return (
    <div className="relative flex flex-col h-screen bg-black text-white overflow-hidden ">
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

      <Menu />
    </div>
  );

  // return (
  //   <div className="h-screen bg-black text-white relative overflow-hidden">
  //     <Wheel />
  {
    /* <Image
        src={"/fireworksTwo.svg"}
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
      <div className="px-4 flex flex-row justify-between pb-10">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full bg-yellow-500 opacity-30 blur-[120px] -translate-x-1/4 translate-y-1/4"></div>
        <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full bg-purple-600 opacity-30 blur-[120px] translate-x-1/4 -translate-y-1/4"></div>
        <div className="absolute top-1/2 right-1/2 w-[400px] h-[400px] rounded-full bg-blue-500 opacity-20 blur-[100px] -translate-y-1/2 -translate-x-1/2"></div>
        <div className={`flex flex-col items-center mt-[45px]`}>
          <UserTop
            rankSrc="/two.svg"
            userImgSrc={
              theTopFriends[1]?.imageSrc
                ? theTopFriends[1]?.imageSrc
                : "/binXcoin.svg"
            }
            username={
              username == theTopFriends[1]?.username
                ? "You"
                : theTopFriends[1]?.username
            }
          />
        </div>
        <div className="flex flex-col items-center ml-3">
          <UserTop
            rankSrc="/one.svg"
            userImgSrc={theTopFriends[0]?.imageSrc}
            username={
              username == theTopFriends[0]?.username
                ? "You"
                : theTopFriends[0]?.username
            }
          />
          <div
            className="flex flex-col items-center mt-[15px]"
            onClick={handleAddFriendClick}
          >
            <div
              className="relative"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <Image
                src={isTouched ? "/addFriendsHover.svg" : "/addFriends.svg"}
                alt={"add a friends"}
                width={50}
                height={50}
                className="object-cover"
              />
            </div>
            <p className="text-medium text-sm mt-[5px] gradient-text">INVITE</p>
          </div>
        </div>
        <div className="flex flex-col items-center mt-[85px]">
          <UserTop
            rankSrc="/three.svg"
            userImgSrc={
              theTopFriends[2]?.imageSrc
                ? theTopFriends[2]?.imageSrc
                : "/binXcoin.svg"
            }
            username={
              username == theTopFriends[2]?.username
                ? "You"
                : theTopFriends[2]?.username
            }
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
          src={"/friendsImg.svg"}
          alt="topList"
          width={122}
          height={31}
          className="object-cover h-[31px] mx-auto mb-2.5 relative z-10"
        />

        <ScrollArea className="w-[322px] h-[326px] px-[5px] pt-3 mx-auto bg-customFon rounded-xl border-[1px] border-customBorder relative z-10">
          {Array.isArray(theTopFriends) &&
            theTopFriends.length > 0 &&
            theTopFriends.slice(3).map((item, index) => (
              <div className="border-after" key={index}>
                <User item={item} index={index} />
              </div>
            ))}
          {!isUserInList && (
            <div className="absolute bottom-0 left-0 bg-customGray rounded-b-xl w-full">
              <User item={user} index={userIndex + 1} />
            </div>
          )}
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </div> */
  }
  {
    /* </div>
  ); */
  }
};

export default Friends;
