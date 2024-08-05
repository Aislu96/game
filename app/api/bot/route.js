import TelegramBot from "node-telegram-bot-api";
import { supabase } from "../../utils/supabase/server";

export const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, {
  polling: false,
});

const webAppUrl = "https://bi-xcoin-7rao.vercel.app";

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("Received a POST request", body);

    if (body.message) {
      const chatId = body.message.chat.id;
      const text = body.message.text;

      console.log("Message received:", text);

      if (text.startsWith("/start")) {
        console.log("User detected:", chatId);
        const params = text.split(" ");
        if (params.length > 1 && params[1].startsWith("invite_")) {
          console.log("Invited by:", params[1]);
          const inviterChatId = params[1].split("_")[1];
          await handleInvitation(chatId, inviterChatId);
        }
        await sendWelcomeMessage(chatId);
      }
    } else if (body.callback_query) {
      const chatId = body.callback_query.message.chat.id;
      const data = body.callback_query.data;

      console.log("Callback query received:", data);

      if (data === "invite") {
        const inviteLink = `https://t.me/BIXXcoin_bot?start=invite_${chatId}`;
        await bot.sendMessage(
          chatId,
          `Here's your invite link: ${inviteLink}\nShare this with your friends to earn more coins!`
        );
        console.log("Sent invite link");
      } else if (data === "play") {
        // Update user details when they press "Play"
        await updateUserData(chatId, body.callback_query.from);
        // Redirect to the web app
        await bot.answerCallbackQuery(body.callback_query.id, {
          url: webAppUrl,
        });
      }
    }

    return new Response(JSON.stringify({ message: "OK" }), { status: 200 });
  } catch (error) {
    console.error("Error processing request:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}

async function updateUserData(userId, userInfo) {
  const { first_name, last_name, username, language_code } = userInfo;

  console.log("Updating user data for:", userId);

  // Fetch user's profile photos
  const profilePhotos = await bot.getUserProfilePhotos(userId);
  let profilePictureUrl = null;
  if (profilePhotos.total_count > 0) {
    const fileId = profilePhotos.photos[0][0].file_id;
    const file = await bot.getFile(fileId);
    profilePictureUrl = `https://api.telegram.org/file/bot${process.env.TELEGRAM_BOT_TOKEN}/${file.file_path}`;
  }

  // Check if user exists
  const { data: existingUser, error: fetchError } = await supabase
    .from("Bixcoin")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (fetchError && fetchError.code !== "PGRST116") {
    console.error("Error fetching user data:", fetchError);
    return;
  }

  if (!existingUser) {
    console.log("No existing user found, creating new user:", userId);
    // Insert new user
    const { error } = await supabase.from("Bixcoin").insert({
      user_id: userId,
      score: 0,
      energy: 1000,
      updated_at: new Date(),
      first_name: first_name,
      last_name: last_name,
      username: username,
      language_code: language_code,
      profile_picture: profilePictureUrl,
    });

    if (error) {
      console.error("Error saving game data:", error);
    } else {
      console.log("New user data saved successfully");
    }
  } else {
    console.log("Updating existing user:", userId);
    // Update existing user
    const { error } = await supabase
      .from("Bixcoin")
      .update({
        updated_at: new Date(),
        first_name: first_name,
        last_name: last_name,
        username: username,
        language_code: language_code,
        profile_picture: profilePictureUrl,
      })
      .eq("user_id", userId);

    if (error) {
      console.error("Error updating user data:", error);
    } else {
      console.log("User data updated successfully");
    }
  }
}

async function handleInvitation(userId, inviterChatId) {
  // Add to Friends table
  const { error: friendsError } = await supabase.from("Friends").insert({
    user_id: inviterChatId,
    friends_id: userId,
  });

  if (friendsError) {
    console.error("Error adding to Friends table:", friendsError);
  } else {
    console.log("Added to Friends table successfully");

    // Update inviter's score
    const { data: inviterData, error: inviterFetchError } = await supabase
      .from("Bixcoin")
      .select("score")
      .eq("user_id", inviterChatId)
      .single();

    if (inviterFetchError) {
      console.error("Error fetching inviter's score:", inviterFetchError);
    } else {
      const newScore = inviterData.score + 100;
      const { error: scoreUpdateError } = await supabase
        .from("Bixcoin")
        .update({ score: newScore })
        .eq("user_id", inviterChatId);

      if (scoreUpdateError) {
        console.error("Error updating inviter's score:", scoreUpdateError);
      } else {
        console.log("Inviter's score updated successfully");
      }
    }
  }
}

async function sendWelcomeMessage(chatId) {
  const welcomeText = `Welcome to BIXcoin Bot 👋\n\nSPIN and watch your balance Grow.\nGot friends? Invite them to the game and earn more coins together.`;

  try {
    await bot.sendPhoto(
      chatId,
      "https://bi-xcoin-7rao.vercel.app/botBanner.png",
      {
        caption: welcomeText,
        reply_markup: JSON.stringify({
          inline_keyboard: [
            [{ text: "Play", web_app: { url: webAppUrl } }],
            [{ text: "Invite Friends", callback_data: "invite" }],
          ],
        }),
      }
    );
    console.log("Sent welcome message");
  } catch (error) {
    console.error("Error sending welcome message:", error);
  }
}

export async function GET() {
  return new Response(JSON.stringify({ message: "Bot API is running" }), {
    status: 200,
  });
}
