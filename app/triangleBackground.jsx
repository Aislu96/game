import React from "react";
import Menu from "./menu";

const TriangleBackground = ({ activeIcon, children }) => {
  const getTriangleClass = () => {
    switch (activeIcon) {
      case 0:
        return "triangle";
      case 1:
        return "triangle-two";
      case 2:
        return "triangle-three";
      default:
        return "triangle";
    }
  };

  return (
    <div className="relative flex flex-col h-screen bg-[url('/gameBG2.svg')] bg-black bg-cover text-white">
      <div
        className={`absolute top-0 left-0 w-full h-[90vh] bg-white opacity-5 ${getTriangleClass()}`}
      ></div>
      <div className="relative flex flex-col h-full z-10">
        <div className="flex-grow flex flex-col justify-center items-center space-y-4 z-[100]">
          {children}
        </div>
        <Menu />
      </div>
    </div>
  );
};

export default TriangleBackground;
