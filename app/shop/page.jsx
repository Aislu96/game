import Menu from "../menu";

const Shop = () => {
    return (
        <div className="relative flex flex-col h-screen bg-black text-white overflow-hidden speech">
            <div className="absolute top-0 left-0 w-full h-[89.7%] bg-white opacity-5 z-20 rounded-[50px]"></div>
            <Menu className="fixed bottom-0 w-full z-30"/>
        </div>
    )
}

export default Shop;