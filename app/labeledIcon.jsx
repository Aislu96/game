import React from "react";
import Image from "next/image";
import Link from "next/link";

const LabeledIcon = () => {
  return (
    <div className="flex flex-row justify-between px-[30px] w-full fixed mt-6 left-0 right-0 z-30">
      <Link href="/friends">
        <Image
          src={"/friendsIcon.svg"}
          alt="friends"
          width={41}
          height={40}
          className="object-cover mx-auto z-50"
        />
        <p className="text-medium text-sm p-1 text-center">Friends</p>
      </Link>

      <Link href="/toplist">
        <Image
          src={"/top.svg"}
          alt="boost"
          width={50}
          height={40}
          className="object-cover z-50"
        />
        <p className="text-medium text-sm text-center">TOP</p>
      </Link>
    </div>
  );
};

export default LabeledIcon;
