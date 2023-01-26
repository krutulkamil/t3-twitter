import { InfiniteData, QueryClient } from "@tanstack/query-core";
import { RouterOutputs } from "../utils/api";

interface UpdateCacheProps {
  client: QueryClient,
  variables: {
    tweetId: string;
  },
  data: {
    userId: string;
  },
  action: "like" | "unlike"
}

export const updateCache = ({ client, variables, data, action }: UpdateCacheProps) => {
  client.setQueryData([
    [
      "tweet",
      "timeline"
    ],
    {
      input: {
        limit: 10
      },
      type: "infinite"
    }
  ], (oldData) => {

    const newData = oldData as InfiniteData<RouterOutputs["tweet"]["timeline"]>;

    const newTweets = newData.pages.map((page) => {
      return {
        tweets: page.tweets.map((tweet) => {
          if (tweet.id === variables.tweetId) {
            return {
              ...tweet,
              likes: action === "like" ? [data.userId] : []
            }
          }

          return tweet;
        })
      }
    });

    return {
      ...newData,
      pages: newTweets
    }
  });
};