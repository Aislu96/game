import React from "react";

const page = () => {
  if (typeof window !== "undefined") {
    window.onload = function () {
      const urlParams = new URLSearchParams(window.location.search);
      const chatId = urlParams.get("chatId");
      window.location.href = `https://t.me/BIXXcoin_bot?start=invite_${chatId}`;
    };
  }

  return (
    <div>
      <h1>Redirecting to BIXcoin Bot...</h1>
    </div>
  );
};

export default page;
