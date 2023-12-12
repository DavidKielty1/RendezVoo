import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const likeCommentRouter = createTRPCRouter({
  getAllLikedComment: protectedProcedure.query(async ({ ctx }) => {
    const allLikeComments = ctx.db.like.findMany({});
    return allLikeComments;
  }),

  getLikedCommentForSinglePost: publicProcedure
    .input(z.object({ commentId: z.string(), userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const likedPost = ctx.db.like.findFirst({
        where: {
          commentId: input.commentId,
          userId: input.userId,
        },
      });
      return likedPost;
    }),

  likeComment: protectedProcedure
    .input(z.object({ commentId: z.string(), userId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.like.create({
        data: { commentId: input.commentId, userId: input.userId },
      });
    }),

  removeCommentLike: protectedProcedure
    .input(z.object({ commentId: z.string(), userId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const likeRecord = await ctx.db.like.findFirst({
        where: {
          commentId: input.commentId,
          userId: input.userId,
        },
        select: { id: true },
      });
      if (likeRecord) {
        return ctx.db.like.delete({
          where: { id: likeRecord.id },
        });
      }
    }),
});
