"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Menu = ({ activeIcon }) => {
  // const [activeIcon, setActiveIcon] = useState("game");

  // const handleTouch = (icon) => {
  //   setActiveIcon(icon);
  // };

  // const getIconSrc = (icon) => {
  //   const iconPaths = {
  //     shop: "/shop",
  //     game: "/game",
  //     profile: "/profile",
  //   };

  //   return activeIcon === icon
  //     ? `${iconPaths[icon]}Active.svg`
  //     : `${iconPaths[icon]}.svg`;
  // };

  // const getHref = (icon) => {
  //   const iconLinks = {
  //     shop: "/shop",
  //     game: "/",
  //     profile: "/profile",
  //   };

  //   return iconLinks[icon];
  // };

  return (
    <div className="flex flex-row justify-between w-full px-[30px] z-[100] !fixed !bottom-2 !left-0 !right-0">
      {["shop", "game", "profile"].map((icon) => (
        <Link
          href={icon === "game" ? "/" : `/${icon}`}
          key={icon}
          className="relative"
          // onClick={() => handleTouch(icon)}
        >
          <Image
            src={`/${icon === activeIcon ? icon + "Active" : icon}.svg`}
            alt={icon}
            width={46}
            height={46}
            className="object-cover"
          />
          {/* {activeIcon === icon && (
            <Image
              src="/pointer.svg"
              alt="pointer"
              width={20}
              height={20}
              className="absolute -top-8 left-3 object-cover"
            />
          )} */}
        </Link>
      ))}
    </div>
  );
};

export default Menu;
