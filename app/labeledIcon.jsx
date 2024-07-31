import React from "react";
import Image from "next/image";

const LabeledIcon = ({ topList, setTopList }) => {
  function handelTouch() {
    setTopList(!topList);
  }

  return (
    <div className="flex flex-row justify-between px-[30px] w-full border fixed top-8 left-0 right-0 z-10">
      <div className="flex flex-col items-center gap-1">
        <Image
          src={"/boost.svg"}
          alt="boost"
          width={50}
          height={40}
          className="object-cover"
        />
        <p className="text-medium text-sm">Boost</p>
      </div>
      <div
        className="flex flex-col items-center gap-1"
        onTouchStart={() => handelTouch()}
      >
        <Image
          src={"/top.svg"}
          alt="boost"
          width={50}
          height={40}
          className="object-cover"
        />
        <p className="text-medium text-sm">TOP</p>
      </div>
    </div>
  );
};

export default LabeledIcon;
