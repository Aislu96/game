import Wheel from "./wheel";
import Energy from "./energy";
import ScoreDisplay from "./scoreDisplay";

const Game = () => {
  return (
    <div className="flex-grow flex flex-col justify-center items-center z-30">
      <ScoreDisplay />
      <Wheel />
      <Energy />
    </div>
  );
};

export default Game;
