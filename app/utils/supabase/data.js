import { supabase } from "./server";

export async function getUsersSortedByScore() {
  // Fetch data from the Bixcoin table
  let { data, error } = await supabase
    .from("Bixcoin")
    .select("user_id, username, score");

  if (error) {
    console.error("Error fetching data:", error);
    return [];
  }

  // Map the data to the desired format
  const users = data.map((user) => ({
    id: user.user_id,
    username: user.username,
    score: user.score,
    imageSrc: "/img.svg",
  }));

  // Sort the users by score in descending order
  users.sort((a, b) => b.score - a.score);

  return users;
}

// Example usage
// getUsersSortedByScore().then((users) => console.log(users));
