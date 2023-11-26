/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

type SavedMeetupWithMeetup = {
  // Include other fields from the SavedMeetup model if necessary
  meetup: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    title: string;
    description: string;
    location: string;
    time: string;
    image: string;
    userId: string;
    type: string;
    coordinates: number[];
    // Include other fields from the Meetup model if necessary
  };
};

export const saveMeetupRouter = createTRPCRouter({
  getAllSavedMeetups: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input, ctx }) => {
      const savedMeetups = await ctx.db.savedMeetup.findMany({
        where: { userId: input.userId },
        include: {
          meetup: true,
        },
      });
      const meetups = savedMeetups.map(
        (savedMeetup: SavedMeetupWithMeetup) => savedMeetup.meetup,
      );
      return meetups;
    }),

  create: protectedProcedure
    .input(z.object({ userId: z.string(), meetupId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { userId, meetupId } = input;

      const savedMeetup = await ctx.db.savedMeetup.create({
        data: {
          userId,
          meetupId,
        },
      });

      return savedMeetup;
    }),
});
