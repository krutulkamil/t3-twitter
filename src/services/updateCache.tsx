import { InfiniteData, QueryClient } from "@tanstack/query-core";
import { RouterInputs, RouterOutputs } from "../utils/api";

interface UpdateCacheProps {
  client: QueryClient,
  variables: {
    tweetId: string;
  },
  data: {
    userId: string;
  },
  action: "like" | "unlike",
  input: RouterInputs["tweet"]["timeline"]
}

export const updateCache = ({ client, variables, data, action, input }: UpdateCacheProps) => {
  client.setQueryData([
    [
      "tweet",
      "timeline"
    ],
    {
      input,
      type: "infinite"
    }
  ], (oldData) => {

    const newData = oldData as InfiniteData<RouterOutputs["tweet"]["timeline"]>;

    const value = action === "like" ? 1 : -1;

    const newTweets = newData?.pages?.map((page) => {
      return {
        tweets: page.tweets.map((tweet) => {
          if (tweet.id === variables.tweetId) {
            return {
              ...tweet,
              likes: action === "like" ? [data.userId] : [],
              _count: {
                likes: tweet._count.likes + value
              }
            };
          }

          return tweet;
        })
      };
    });

    return {
      ...newData,
      pages: newTweets
    };
  });
};