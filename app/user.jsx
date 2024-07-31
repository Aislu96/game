import Image from "next/image";

const User = ({index, item, user}) => {
    const userClasses = user.id === item.id ? 'bg-customGray rounded-xl my-1' : 'my-0.5';
    return (
        <div className={`py-1.5 px-2.5 flex flex-row items-center gap-[38px] justify-between ${userClasses}`}>
            <div className="flex flex-row gap-[5px] items-center">
                <p className="font-light text-base min-w-[35px] text-center">{index + 4}.</p>
                <div className="relative">
                    <Image src={"/border.svg"} alt={"border"} width={50} height={50}
                           className="object-cover"/>
                    <div className="absolute top-[5px] left-[5px]">
                        <Image src={item.imageSrc} alt="пользователь" width={40} height={46}
                               className="object-cover hexagon-small"/>
                    </div>
                </div>
                <p className="font-light text-base">{item.username}</p>
            </div>
            <div className="flex flex-row gap-[5px]">
                <Image src={"/arrowsCircle.svg"} alt="arrows in a circle" width={20} height={20}
                       className="object-contain"/>
                <p className="font-light text-base">{item.score}</p>
            </div>
        </div>
    )
}

export default User;