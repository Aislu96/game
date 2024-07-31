"use client";
import { useState } from "react";
import Image from "next/image";

const Menu = () => {
  const [activeIcon, setActiveIcon] = useState("game");

  const handleTouch = (icon) => {
    setActiveIcon(icon);
  };

  const getIconSrc = (icon) => {
    if (icon === "money") {
      return activeIcon === "money" ? "/moneyActive.svg" : "/money.svg";
    }
    if (icon === "game") {
      return activeIcon === "game" ? "/gameActive.svg" : "/game.svg";
    }
    if (icon === "user") {
      return activeIcon === "user" ? "/userActive.svg" : "/user.svg";
    }
  };

  return (
    <div className="flex flex-row justify-between w-full px-[30px] border z-50 fixed bottom-2 left-0 right-0">
      {["money", "game", "user"].map((icon) => (
        <div
          key={icon}
          className="relative"
          onTouchStart={() => handleTouch(icon)}
        >
          <Image
            src={getIconSrc(icon)}
            alt={icon}
            width={46}
            height={46}
            className="object-cover"
          />
          {activeIcon === icon && (
            <Image
              src="/pointer.svg"
              alt="pointer"
              width={20}
              height={20}
              className="absolute -top-10 left-2 object-cover"
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Menu;
