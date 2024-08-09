import Wheel from "./wheel";
import Energy from "./energy";
import ScoreDisplay from "./scoreDisplay";
import LabeledIcon from "./labeledIcon";

const Game = () => {
  return (
    <div className="flex-grow  flex-col justify-center items-center z-20 space-y-4">
      <LabeledIcon />
      <div className="h-[480px]  !mt-[35%] z-50">
        <ScoreDisplay />
        <Wheel />
        <Energy />
      </div>
    </div>
  );
};

export default Game;
