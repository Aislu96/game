"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Menu = ({activeIcon, setActiveIcon}) => {

  const handleTouch = (icon) => {
    setActiveIcon(icon);
  };

  const getIconSrc = (icon) => {
    const iconPaths = {
      shop: "/shop",
      game: "/game",
      profile: "/profile",
    };

    return activeIcon === icon
      ? `${iconPaths[icon]}Active.svg`
      : `${iconPaths[icon]}.svg`;
  };

  const getHref = (icon) => {
    const iconLinks = {
      shop: "/shop",
      game: "/",
      profile: "/profile",
    };

    return iconLinks[icon];
  };

  return (
    <div className="flex flex-row justify-between w-full px-[30px] z-50 fixed bottom-2 left-0 right-0">
      {["shop", "game", "profile"].map((icon) => (
        <Link
          href={getHref(icon)}
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
        </Link>
      ))}
    </div>
  );
};

export default Menu;
