import Wheel from "./wheel";
import Energy from "./energy";
import ScoreDisplay from "./scoreDisplay";
import LabeledIcon from "./labeledIcon";

const Game = () => {
  return (
    <div className="flex-grow  flex-col justify-center items-center space-y-4  z-[100] ">
      <LabeledIcon />

      <ScoreDisplay />
      <Wheel />
      <Energy />
    </div>
  );
};

export default Game;
