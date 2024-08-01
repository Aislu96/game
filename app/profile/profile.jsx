import React from "react";
import Image from "next/image";

const Profile = () => {
  const user_name = "@User_Name";
  return (
    <div className="h-screen bg-black">
      <div className="relative bg-no-repeat bg-center bg-cover h-[128px]">
        <Image
          src={"/profileImageBg.png"}
          alt={"background image"}
          layout="fill"
          objectFit="cover "
          className="absolute top-10"
        />
        <div className="absolute top-28 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <Image
              src={"/border.svg"}
              alt={"border"}
              width={150}
              height={155}
              className="object-cover"
            />
            <div className="absolute top-2.5 left-2">
              <Image
                src={"/img.svg"}
                alt="пользователь"
                width={76}
                height={83}
                className="object-cover hexagon_profile"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="border mt-16 text-3xl text-center">
        <span className="font-medium bg-clip-text text-transparent bg-gradient-to-r from-purple-custom to-orange-custom">
          {user_name}
        </span>
      </div>

      <div className="flex items-center justify-between border h-60 p-2">
        <div className="h-60 space-y-2">
          <div className="border border-purple-custom rounded-lg h-1/2 w-60 text-white">
            {" "}
            your friends
          </div>
          <div className="border border-purple-custom rounded-lg h-1/2 w-60 text-white">
            {" "}
            your friends
          </div>
        </div>

        <div className="border border-orange-custom rounded-lg h-full w-40 text-white">
          {" "}
          your friends
        </div>
      </div>
    </div>
  );
};

export default Profile;
