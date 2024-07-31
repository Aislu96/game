const Wheel = () => {
  return (
    <div className="bg-[url('/arrow.svg')] h-[380px] w-[380px] bg-cover flex items-center justify-center">
      <div
        ref={clockRef}
        className="w-[295px] h-[295px] rounded-full mb-5 bg-white relative touch-none flex items-center justify-center"
        onTouchStart={(e) => {
          e.preventDefault(); // Prevent default touch behavior
          handleStart(e.touches[0].clientX, e.touches[0].clientY);
        }}
        onTouchMove={(e) => {
          e.preventDefault(); // Prevent default touch behavior
          handleMove(e.touches[0].clientX, e.touches[0].clientY);
        }}
        onTouchEnd={(e) => {
          e.preventDefault(); // Prevent default touch behavior
          handleEnd();
        }}
      >
        <div
          className="absolute top-0 left-1/2 w-1.5 h-1/2 bg-black origin-bottom rounded-full"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          <FaCircle className="text-black absolute top-full  left-1/2 text-2xl -translate-x-1/2 -translate-y-1/2" />
        </div>
      </div>
    </div>
  );
};

export default Wheel;
