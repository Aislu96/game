import React from "react";
import QRCode from "qrcode.react";

const QRCodeComponent = ({ url }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-[#F9BA0B] p-8 rounded-lg shadow-md flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Continue on your Phone
        </h1>
        <QRCode value={url} size={256} bgColor="#5149BA" fgColor="#F9BA0B" />
      </div>
    </div>
  );
};

export default QRCodeComponent;
