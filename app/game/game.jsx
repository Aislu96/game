import Wheel from "./wheel";
import Energy from "./energy";
import ScoreDisplay from "./scoreDisplay";
import LabeledIcon from "./labeledIcon";

const Game = () => {
  return (
    <div className="flex-grow  flex-col justify-center items-center z-20 space-y-4 border-2">
      <LabeledIcon />

      <ScoreDisplay />
      <Wheel />
      <Energy />
    </div>
  );
};

export default Game;
