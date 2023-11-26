/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const meetupRouter = createTRPCRouter({
  getAllMeetups: publicProcedure.query(async ({ ctx }) => {
    const posts = await ctx.db.meetup.findMany({
      take: 250,
    });
    return posts;
  }),

  getAll: publicProcedure
    .input(z.object({ page: z.number() }))
    .query(async ({ ctx, input }) => {
      const postsPerPage = 10;
      const skip = ((input?.page || 1) - 1) * postsPerPage;

      const posts = await ctx.db.meetup.findMany({
        skip: skip,
        take: postsPerPage,
        orderBy: { createdAt: "desc" },
      });
      return posts;
    }),

  getAllFromUser: publicProcedure
    .input(z.object({ id: z.string(), page: z.number() }))
    .query(async ({ ctx, input }) => {
      const postsPerPage = 10;
      const skip = ((input?.page || 1) - 1) * postsPerPage;

      const meetups = await ctx.db.meetup.findMany({
        where: {
          userId: input.id,
        },
        skip: skip,
        take: postsPerPage,
        orderBy: [{ createdAt: "desc" }],
      });
      return meetups;
    }),

  getGeoData: publicProcedure.query(async ({ ctx }) => {
    const coordinates = await ctx.db.meetup.findMany({
      take: 250,
    });
    return coordinates;
  }),

  getOne: publicProcedure
    .input(z.object({ meetupId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.meetup.findUnique({
        where: { id: input.meetupId },
      });
    }),

  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        location: z.string(),
        coordinates: z.array(z.number()),
        description: z.string(),
        time: z.string(),
        image: z.string(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.meetup.create({
        data: {
          title: input.title,
          location: input.location,
          coordinates: input.coordinates,
          description: input.description,
          time: input.time,
          image: input.image,
          userId: ctx.session.user.id,
        },
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string(),
        location: z.string(),
        description: z.string(),
        time: z.string(),
        image: z.string(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.meetup.update({
        where: {
          id: input.id,
        },
        data: {
          title: input.title,
          location: input.location,
          description: input.description,
          time: input.time,
          image: input.image,
          userId: ctx.session.user.id,
        },
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.db.meetup.delete({
        where: {
          id: input.id,
        },
      });
    }),

  searchFilter: publicProcedure
    .input(z.object({ searchInput: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.meetup.findMany({
        where: {
          title: {
            contains: input.searchInput,
            mode: "insensitive", // Optional: makes the search case-insensitive
          },
        },
      });
    }),
});
