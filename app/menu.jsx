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
        <div className="flex flex-row justify-between w-full px-[30px]">
            <div onTouchStart={() => handleTouch("money")}>
                <Image
                    src={getIconSrc("money")}
                    alt="money"
                    width={46}
                    height={46}
                    className="object-cover"
                />
            </div>
            <div onTouchStart={() => handleTouch("game")}>
                <Image
                    src={getIconSrc("game")}
                    alt="game"
                    width={46}
                    height={46}
                    className="object-cover"
                />
            </div>
            <div onTouchStart={() => handleTouch("user")}>
                <Image
                    src={getIconSrc("user")}
                    alt="user"
                    width={46}
                    height={46}
                    className="object-cover"
                />
            </div>
        </div>
    );
};

export default Menu;
