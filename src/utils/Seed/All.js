import { seedUsers } from "./Users.js";
import { seedMeetups } from "./Meetups.js";
import { seedCommentRepliesAndLikes } from "./Replies.js";

async function seedAll() {
  try {
    console.log("Starting user seeding...");
    await seedUsers();
    console.log("User seeding complete.");
  } catch (error) {
    console.error("An error occurred during user seeding:", error);
    process.exit(1); // Exit the process with an error code
  }

  try {
    console.log("Starting meetup seeding...");
    await seedMeetups();
    console.log("Meetup seeding complete.");
  } catch (error) {
    console.error("An error occurred during meetup seeding:", error);
    process.exit(1); // Exit the process with an error code
  }

  try {
    console.log("Starting comment replies and likes seeding...");
    await seedCommentRepliesAndLikes();
    console.log("Comment replies and likes seeding complete.");
  } catch (error) {
    console.error(
      "An error occurred during comment replies and likes seeding:",
      error,
    );
    process.exit(1); // Exit the process with an error code
  }
}

seedAll().then(() => {
  console.log("All seeding operations complete.");
});
