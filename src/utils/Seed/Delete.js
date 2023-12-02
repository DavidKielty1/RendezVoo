import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function deleteAllData() {
  try {
    // Delete Likes first to avoid foreign key constraint issues
    await prisma.like.deleteMany({});

    // Delete Comments
    await prisma.comment.deleteMany({});

    // Delete SavedMeetups
    await prisma.savedMeetup.deleteMany({});

    // Delete Meetups
    await prisma.meetup.deleteMany({});

    // Finally, delete Users
    await prisma.user.deleteMany({});

    console.log("All data deleted successfully");
  } catch (error) {
    console.error("Error deleting data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

// Call the function to execute the deletions
deleteAllData();
