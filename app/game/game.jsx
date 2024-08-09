import Wheel from "./wheel";
import Energy from "./energy";
import ScoreDisplay from "./scoreDisplay";

const Game = () => {
  return (
    <div className="h-[390px] flex-col mt-[32%] justify-center items-center z-50 space-y-4">
      <ScoreDisplay />
      <Wheel />
      <Energy />
    </div>
  );
};

export default Game;
