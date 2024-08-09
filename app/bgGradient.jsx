import React from "react";

const GgGradient = () => {
  return (
    <div>
      {" "}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-orange-500 opacity-30 blur-[120px] -translate-y-1/4 translate-x-1/4"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-purple-600 opacity-30 blur-[120px] translate-y-1/4 -translate-x-1/4"></div>
      <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] rounded-full bg-blue-500 opacity-20 blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
    </div>
  );
};

export default GgGradient;
