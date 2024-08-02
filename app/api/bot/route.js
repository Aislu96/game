import TelegramBot from "node-telegram-bot-api";
import { supabase } from "../../utils/supabase/server";

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: false });

// Your web app URL (update this with your actual URL)
const webAppUrl = "https://bi-xcoin-7rao.vercel.app";

export async function POST(req) {
  console.log("Received a POST request");

  const body = await req.json();
  console.log("Request body:", body);

  if (body.message) {
    const chatId = body.message.chat.id;
    const text = body.message.text;

    console.log("Message received:", text);

    if (text === "/start") {
      const welcomeText = `Welcome to BIXcoin Bot 👋\n\nTap on the coin and watch your balance grow.\nHow much is BIXcoin worth? Who knows, maybe a lot someday!\nGot friends? Invite them to the game and earn more coins together.`;

      await bot.sendPhoto(chatId, "/botBanner.png", {
        caption: welcomeText,
        reply_markup: JSON.stringify({
          inline_keyboard: [
            [{ text: "Play", callback_data: `play_${chatId}` }],
            [{ text: "Invite Friends", callback_data: "invite" }],
          ],
        }),
      });
      console.log("Sent welcome message");
    }
  } else if (body.callback_query) {
    const chatId = body.callback_query.message.chat.id;
    const data = body.callback_query.data;

    console.log("Callback query received:", data);

    if (data === "invite") {
      const inviteLink = `https://t.me/BIXXcoin_bot/?start=invite_${chatId}`;
      await bot.sendMessage(
        chatId,
        `Here's your invite link: ${inviteLink}\nShare this with your friends to earn more coins!`
      );
      console.log("Sent invite link");
    } else if (data.startsWith("play_")) {
      const inviterChatId = data.split("_")[1];
      const newUserChatId = chatId;

      async function saveUserData() {
        const userId = newUserChatId;
        const firstName = body.callback_query.from.first_name;
        const lastName = body.callback_query.from.last_name;
        const username = body.callback_query.from.username;
        const languageCode = body.callback_query.from.language_code;
        const score = 0;
        const energy = 1000;

        console.log("Saving user data for:", userId);

        // Check if user exists
        const { data: existingUser, error: fetchError } = await supabase
          .from("Bixcoin")
          .select("*")
          .eq("user_id", userId)
          .single();

        if (fetchError) {
          console.error("Error fetching user data:", fetchError);
          return;
        }

        if (!existingUser) {
          // Insert new user
          const { data, error } = await supabase.from("Bixcoin").insert({
            user_id: userId,
            score: score,
            energy: energy,
            updated_at: new Date(),
            first_name: firstName,
            last_name: lastName,
            username: username,
            language_code: languageCode,
          });

          if (error) {
            console.error("Error saving game data:", error);
          } else {
            console.log("New user data saved successfully");

            // Add to Friends table
            const { error: friendsError } = await supabase
              .from("Friends")
              .insert({
                user_id: inviterChatId,
                friends_id: userId,
              });

            if (friendsError) {
              console.error("Error adding to Friends table:", friendsError);
            } else {
              console.log("Added to Friends table successfully");

              // Update inviter's score
              const { data: inviterData, error: inviterFetchError } =
                await supabase
                  .from("Bixcoin")
                  .select("score")
                  .eq("user_id", inviterChatId)
                  .single();

              if (inviterFetchError) {
                console.error(
                  "Error fetching inviter's score:",
                  inviterFetchError
                );
              } else {
                const newScore = inviterData.score + 100;
                const { error: scoreUpdateError } = await supabase
                  .from("Bixcoin")
                  .update({ score: newScore })
                  .eq("user_id", inviterChatId);

                if (scoreUpdateError) {
                  console.error(
                    "Error updating inviter's score:",
                    scoreUpdateError
                  );
                } else {
                  console.log("Inviter's score updated successfully");
                }
              }
            }
          }
        } else {
          console.log("User already exists in the database");
        }
      }

      await saveUserData();
    }
  }

  return new Response(JSON.stringify({ message: "OK" }), { status: 200 });
}
