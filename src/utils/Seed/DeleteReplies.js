import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function deleteLikesForReplies() {
  try {
    const deletedLikes = await prisma.like.deleteMany({
      where: {
        comment: {
          parentId: {
            not: null, // Selects likes for comments that are replies
          },
        },
      },
    });

    console.log(`Deleted ${deletedLikes.count} likes for replies.`);
  } catch (error) {
    console.error("Error deleting likes for replies:", error);
  }
}

async function deleteAllReplies() {
  try {
    const deletedReplies = await prisma.comment.deleteMany({
      where: {
        parentId: {
          not: null, // This condition selects all comments where parentId is not null
        },
      },
    });

    console.log(`Deleted ${deletedReplies.count} replies.`);
  } catch (error) {
    console.error("Error deleting replies:", error);
  } finally {
    await prisma.$disconnect();
  }
}
async function deleteRepliesAndAssociatedLikes() {
  await deleteLikesForReplies();
  await deleteAllReplies();
  await prisma.$disconnect();
}

deleteRepliesAndAssociatedLikes();
