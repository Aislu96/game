import Wheel from "./wheel";
import Energy from "./energy";
import ScoreDisplay from "./scoreDisplay";

const Game = () => {
  return (
    <div className="flex-grow flex flex-col justify-center items-center z-50 space-y-4">
      <ScoreDisplay />
      <Wheel />
      <Energy />
    </div>
  );
};

export default Game;
