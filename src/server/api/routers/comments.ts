/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const commentRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(z.object({ meetupId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.comment.findMany({
        take: 50,
        orderBy: [{ createdAt: "desc" }],
        where: {
          meetupId: input.meetupId,
          parentId: null,
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });
    }),

  getAllFromUser: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.comment.findMany({
        take: 25,
        orderBy: [{ createdAt: "desc" }],
        where: {
          userId: input.userId,
        },
        include: {
          meetup: {
            select: {
              title: true,
            },
          },
        },
      });
    }),

  create: protectedProcedure
    .input(
      z.object({
        author: z.string(),
        content: z.string(),
        meetupId: z.string(),
        userId: z.string(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.comment.create({
        data: {
          author: input.author,
          meetupId: input.meetupId,
          userId: input.userId,
          content: input.content,
        },
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.db.comment.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
