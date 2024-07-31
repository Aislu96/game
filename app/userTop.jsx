///UserTop

import Image from "next/image";

const UserTop = ({ rankSrc, userImgSrc, username }) => {
  return (
    <div className="flex flex-col items-center">
      <Image
        src={rankSrc}
        alt="place on the top list"
        width={42}
        height={42}
        className="object-cover relative top-4 z-10"
      />
      <div className="relative">
        <Image
          src={"/border.svg"}
          alt={"border"}
          width={90}
          height={90}
          className="object-cover"
        />
        <div className="absolute top-2.5 left-2">
          <Image
            src={userImgSrc}
            alt="пользователь"
            width={74}
            height={83}
            className="object-cover hexagon"
          />
        </div>
      </div>
      <p className="text-medium text-sm mt-[5px] gradient-text">{username}</p>
    </div>
  );
};
export default UserTop;
