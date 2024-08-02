"use client";
import Image from "next/image";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { list, user } from "../data.js";
import User from "@/app/User";
import UserTop from "@/app/userTop";
import Link from "next/link";
import { useGameContext } from "../context/game.js";
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase/server";
import { useRouter } from "next/navigation";

const Friends = () => {
  const { userId } = useGameContext();
  const [users, setUsers] = useState([]);
  const [theTopList, setTheTopList] = useState([]);
  const [isUserInList, setIsUserInList] = useState(false);
  const router = useRouter();

  const handleAddFriendClick = () => {
    const inviteLink = `https://t.me/BIXXcoin_bot/?start=invite_${userId}`;
    const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(
      inviteLink
    )}&text=${encodeURIComponent("Join me on BIXcoin!")}`;

    // Open the Telegram app with the pre-filled message
    window.open(telegramUrl, "_blank");
  };

  async function getUsersSortedByScore() {
    // Fetch data from the Bixcoin table
    let { data, error } = await supabase
      .from("Bixcoin")
      .select("user_id, username, score");

    if (error) {
      console.error("Error fetching data:", error);
      return [];
    }

    // Map the data to the desired format
    const users = data.map((user) => ({
      id: user.user_id,
      username: user.username,
      score: user.score,
      imageSrc: "/img.svg",
    }));

    // Sort the users by score in descending order
    users.sort((a, b) => b.score - a.score);

    console.log(users, "users");

    return users;
  }
  useEffect(() => {
    async function fetchUsers() {
      const sortedUsers = await getUsersSortedByScore();
      setUsers(sortedUsers);
      const topList = sortedUsers.slice(0, 20);
      setTheTopList(topList);
      setIsUserInList(topList.some((item) => item.id === userId));
      console.log(isUserInList, "isUserInList", userId, "userId");
    }
    fetchUsers();
  }, [userId]);

  const handleInvestFriends = () => {
    const invistationLink = `https://t.me/BiXXcoin_bot?start=${userId}`;
  };

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
      <div className="px-[30px] flex flex-row justify-between pb-20">
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
        <div className="flex flex-col items-center">
          <UserTop
            rankSrc="/one.svg"
            userImgSrc={theTopList[0]?.imageSrc}
            username={theTopList[0]?.username}
          />
          <div className="flex flex-col items-center mt-[15px]">
            <div className="relative" onClick={handleAddFriendClick}>
              <Image
                src={"/addFriends.svg"}
                alt={"add a friend"}
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
          src={"/friendsImg.svg"}
          alt="topList"
          width={122}
          height={31}
          className="object-cover h-[31px] mx-auto mb-2.5 relative z-10"
        />
        <ScrollArea className="w-[322px] h-[326px] px-[5px] pt-3 mx-auto bg-customFon rounded-xl border-[1px] border-customBorder relative z-10">
          {Array.isArray(users) &&
            theTopList.length > 0 &&
            theTopList.slice(3).map((item, index) => (
              <div className="border-after" key={index}>
                <User item={item} index={index} />
              </div>
            ))}
          {!isUserInList && (
            <div className="absolute bottom-0 left-0 bg-customGray rounded-b-xl w-full">
              <User item={user} index={100} />
            </div>
          )}
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </div>
    </div>
  );
};

export default Friends;
