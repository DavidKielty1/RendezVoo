import { PrismaClient } from "@prisma/client";
import {
  userIDs,
  cities,
  places,
  events,
  userNames,
  randomChoice,
} from "./ArrayHelper.js";

const prisma = new PrismaClient();

const generateDynamicReply = (mentionUser, city, place, event) => {
  const templates = [
    "Looking forward to seeing you all there!",
    "Finally, a chance to meet everyone!",
    `Can't wait to explore ${city}. It's going to be amazing!`,
    `So excited for the ${event}. It's going to be unforgettable!`,
    `@${mentionUser}, are you joining the ${event}?`,
    "This is going to be my first meetup. Can't wait!",
    `@${mentionUser}, let's catch up at 
      ${place},
     during the meetup.`,
    "I'm thrilled about visiting ${city}. See you all soon!",
    "Counting down the days until the event!",
    `@${mentionUser}, looking forward to seeing you there!`,
    "I've always wanted to visit ${city}. This meetup is the perfect excuse!",
    "Can't wait to meet new people and share experiences.",
    `Who else is excited for the ${event} at 
      ${place},
    ?`,
    "Finally getting the chance to meet everyone in person!",
    "This meetup is going to be the highlight of my year!",
    `Eagerly anticipating our time in ${city}. It's going to be great!`,
    `@${mentionUser}, are you attending the ${event}?`,
    `I'm ready to make some amazing memories with all of you!`,
    `@${mentionUser},
    , can't wait to hear your thoughts on ${event}.`,
    `Looking forward to a great time at ${place}.`,
    `Let's make this meetup an event to remember!`,
    `I'm so excited to connect with fellow enthusiasts in ${city}.`,
    `Can't wait to dive into all the activities planned for us!`,
    `@${mentionUser}, let's explore 
      ${city},
     together after the meetup!`,
    `This meetup is going to be a fantastic opportunity for networking and fun.`,
    `I'm all set for an amazing time at ${place}.`,
    `Count me in for the adventures in ${city}!`,
    `@
      ${mentionUser},
    , looking forward to your presentation at the ${event}.`,
    `I've heard so much about ${place}. Excited to see it myself!`,
    `Bringing my camera to capture the best moments of the meetup!`,
    `Ready for an unforgettable experience with all of you in ${city}.`,
    `@${mentionUser}, excited to meet you at the 
      ${event},
    !`,
    `I'm sure this meetup is going to be a blast!`,
    `Can't wait to exchange ideas and experiences with everyone.`,
    `Looking forward to the ${event} at 
      ${place},
    . It sounds fantastic!`,
    `Hoping to learn a lot and have fun at the same time!`,
    `@
      ${mentionUser},
    , let's get together at the meetup and discuss our project.`,
    `So glad to be part of this vibrant community. See you all soon!`,
    `I'm ready to soak in the vibes of ${city}.`,
    `@
      ${mentionUser},
    , can't wait to catch up with you at ${place}.`,
    `Eager to make new connections and strengthen existing ones!`,
    `This is going to be my first time at ${place}. Super excited!`,
    `Anyone else staying near 
      ${city},
    ? Maybe we can explore together.`,
    `Looking forward to a day full of learning and fun.`,
    `@
      ${mentionUser},
    , we should team up for the activities at ${place}.`,
    `Can't wait to share this experience with all of you!`,
    `Excited to see what ${city} has in store for us.`,
    `@${mentionUser}, ready for our adventure in 
      ${city},
    ?`,
    `This meetup is going to be a great way to kick off the year!`,
    `Let's make the most of our time together at ${place}!`,
    `@${mentionUser}, are you joining the ${event}?`,
    `@${mentionUser}, let's catch up at ${place} during the meetup.`,
    `@${mentionUser}, looking forward to seeing you there!`,
    `@${mentionUser}, can't wait to hear your thoughts on ${event}.`,
    `@${mentionUser}, let's explore 
      ${city},
     together after the meetup!`,
    `@${mentionUser}, are you attending the ${event}?`,
    `@${mentionUser}, let's get together at the meetup and discuss our project.`,
    `@${mentionUser}, can't wait to catch up with you at ${place}.`,
  ];

  return randomChoice(templates);
};

async function seedCommentRepliesAndLikes() {
  let commentCounter = 0;
  let likeCounter = 0;

  for (const userId of userIDs) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    const userName = user ? user.name : "Unknown User";

    const existingComments = await prisma.comment.findMany();

    if (existingComments.length > 0) {
      for (let i = 0; i < 40; i++) {
        const commentToReply = randomChoice(existingComments);

        if (commentToReply.userId === userId) continue;

        const mentionUser = await prisma.user
          .findUnique({
            where: { id: commentToReply.userId },
            select: { name: true },
          })
          .then((u) => u?.name || "Unknown User");
        const city = randomChoice(cities);
        const place = randomChoice(places);
        const event = randomChoice(events);

        // Create a dynamic reply
        const dynamicReply = generateDynamicReply(
          mentionUser,
          city,
          place,
          event,
        );

        // Create a comment
        await prisma.comment
          .create({
            data: {
              title: `${userName}`,
              content: dynamicReply,
              userId: userId,
              meetupId: commentToReply.meetupId,
              parentId: commentToReply.id,
            },
          })
          .then((comment) => {
            commentCounter++;
            console.log(
              `Reply Comment #${commentCounter} created: ${comment.id} by User ${userId}`,
            );
          });
      }
    }

    // Like random comments
    const allComments = await prisma.comment.findMany();
    const commentsToLike = allComments
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    for (const comment of commentsToLike) {
      await prisma.like
        .create({
          data: {
            userId: userId,
            commentId: comment.id,
          },
        })
        .then((like) => {
          likeCounter++;
          console.log(
            `Like #${likeCounter} on Comment ${comment.id} by User ${userId}`,
          );
        });
    }
  }

  console.log("Comments, replies, and likes seeded!");
}

seedCommentRepliesAndLikes()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
