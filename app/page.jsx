"use client";

import LabeledIcon from "./labeledIcon";
import ScoreDisplay from "./scoreDisplay";
import Menu from "./menu";
import Wheel from "./wheel";
import Energy from "./energy";
import { useState } from "react";
import TopList from "./topList";

const Page = () => {
  const [score, setScore] = useState(0);
  const [topList, setTopList] = useState(false);

  return (
    <div className="relative flex flex-col h-screen bg-black text-white overflow-hidden">
      <TopList />
      {/* <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-orange-500 opacity-30 blur-[120px] -translate-y-1/4 translate-x-1/4"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-purple-600 opacity-30 blur-[120px] translate-y-1/4 -translate-x-1/4"></div>
      <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] rounded-full bg-blue-500 opacity-20 blur-[100px] -translate-x-1/2 -translate-y-1/2"></div> */}

      {/* <div className="absolute top-0 left-0 w-full h-[89.7%] bg-white opacity-5 z-20 rounded-[50px]"></div> */}

      {/* <LabeledIcon topList={topList} setTopList={setTopList} /> */}

      {/* Centered content */}
      {/* <div className="flex-grow flex flex-col justify-center items-center z-30">
        <ScoreDisplay score={score} />
        <Wheel />
        <Energy />
      </div>


      <Menu className="fixed bottom-0 w-full z-30" /> */}
    </div>
  );
};

export default Page;
