/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const replyRouter = createTRPCRouter({
  getAllReplies: publicProcedure
    .input(z.object({ parentId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.comment.findMany({
        take: 10,
        orderBy: [{ createdAt: "asc" }],
        where: {
          parentId: input.parentId,
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

  create: protectedProcedure
    .input(
      z.object({
        author: z.string(),
        userId: z.string(),
        content: z.string(),
        meetupId: z.string(),
        parentId: z.string(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.comment.create({
        data: {
          author: input.author,
          content: input.content,
          meetupId: input.meetupId,
          userId: input.userId,
          parentId: input.parentId,
        },
      });
    }),
});
