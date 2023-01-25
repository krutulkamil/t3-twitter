import { createTRPCRouter, protectedProcedure } from "../trpc";
import { tweetSchema } from "../../../components/CreateTweet";

export const tweetRouter = createTRPCRouter({
  create: protectedProcedure
    .input(tweetSchema)
    .mutation(({ ctx, input }) => {
      const { prisma, session } = ctx;
      const { text } = input;

      const userId = session.user.id;

      return prisma.tweet.create({
        data: {
          text,
          author: {
            connect: {
              id: userId
            }
          }
        }
      });
    })
});