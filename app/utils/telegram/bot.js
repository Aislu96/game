const TelegramBot = require("node-telegram-bot-api");
const bot = new TelegramBot("7312215401:AAFF9fc4ZeC9HBZT3jTmUUPxO7ogT651ZiI", {
  polling: true,
});

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const username = msg.from.username;

  const welcomeText = `Hi, @${username}! Welcome to BixCoin 👋

Roll the wheel and watch your balance grow.
Got friends? Invite them to the game and earn more coins together.`;

  const options = {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{ text: "Play", callback_data: "play" }],
        [{ text: "Invite Friends", callback_data: "invite" }],
      ],
    }),
    parse_mode: "Markdown",
    caption: welcomeText,
  };

  // Replace 'PATH_TO_YOUR_BANNER_IMAGE' with the actual path or URL of your banner image
  bot.sendPhoto(chatId, "/botBanner.png", options);
});

// Handle button clicks
bot.on("callback_query", (callbackQuery) => {
  const action = callbackQuery.data;
  const msg = callbackQuery.message;
  const chatId = msg.chat.id;

  if (action === "play") {
    // Add logic to start the game
    bot.sendMessage(chatId, "Let's play! [Add your game logic here]");
  } else if (action === "invite") {
    // Add logic to generate and send an invite link
    bot.sendMessage(
      chatId,
      "Here's your invite link: [Generate and insert invite link]"
    );
  }
});
