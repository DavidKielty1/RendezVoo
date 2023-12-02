/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";
// import {  protectedProcedure } from "../trpc";

export const replyRouter = createTRPCRouter({
  getAllReplies: publicProcedure
    .input(z.object({ parentId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.comment.findMany({
        take: 1,
        orderBy: [{ createdAt: "desc" }],
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

  //   create: protectedProcedure
  //     .input(
  //       z.object({
  //         title: z.string(),
  //         content: z.string(),
  //         meetupId: z.string(),
  //         userId: z.string(),
  //       }),
  //     )
  //     .mutation(({ ctx, input }) => {
  //       return ctx.db.comment.create({
  //         data: {
  //           title: input.title,
  //           meetupId: input.meetupId,
  //           userId: input.userId,
  //           content: input.content,
  //         },
  //       });
  //     }),

  //   delete: protectedProcedure
  //     .input(z.object({ id: z.string() }))
  //     .mutation(({ ctx, input }) => {
  //       return ctx.db.comment.delete({
  //         where: {
  //           id: input.id,
  //         },
  //       });
  //     }),
});
