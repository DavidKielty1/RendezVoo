import { createTRPCRouter } from "~/server/api/trpc";
import { meetupRouter } from "~/server/api/routers/meetups";
import { commentRouter } from "~/server/api/routers/comments";
import { userRouter } from "~/server/api/routers/user";
import { savedMeetupRouter } from "./routers/savedmeetup";
import { replyRouter } from "./routers/replies";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  reply: replyRouter,
  meetup: meetupRouter,
  comment: commentRouter,
  user: userRouter,
  savedmeetup: savedMeetupRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
