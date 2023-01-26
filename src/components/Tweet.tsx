import type { FunctionComponent } from "react";
import Image from "next/image";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
import { updateCache } from "../services/updateCache";
import { api, RouterOutputs } from "../utils/api";
import { AiFillHeart } from "react-icons/ai";
import { QueryClient } from "@tanstack/query-core";

dayjs.extend(relativeTime);
dayjs.extend(updateLocale);

dayjs.updateLocale("en", {
  relativeTime: {
    future: "in %s",
    past: "%s ago",
    s: "1m",
    m: "1m",
    mm: "%dm",
    h: "1h",
    hh: "%dh",
    d: "1d",
    dd: "%dh",
    M: "1M",
    MM: "%dM",
    y: "1y",
    yy: "%dy"
  }
});

interface TweetProps {
  tweet: RouterOutputs["tweet"]["timeline"]["tweets"][number];
  client: QueryClient;
}

const Tweet: FunctionComponent<TweetProps> = ({ tweet, client }): JSX.Element => {

  const likeMutation = api.tweet.like.useMutation({
    onSuccess: (data, variables) => {
      updateCache({ client, data, variables, action: "like" });
    }
  }).mutateAsync;

  const unlikeMutation = api.tweet.unlike.useMutation({
    onSuccess: (data, variables) => {
      updateCache({ client, data, variables, action: "unlike" });
    }
  }).mutateAsync;

  const hasLiked = tweet.likes.length > 0;

  return (
    <div className="mb-4 border-b-2 border-gray-500">
      <div className="flex items-center p-2">
        {tweet.author && tweet.author.image && (
          <Image
            src={tweet.author.image}
            alt={`${tweet.author.name} profile picture`}
            width={48}
            height={48}
            className="rounded-full"
          />
        )}

        <div className="ml-2">
          <div className="flex items-center">
            <p className="font-bold">{tweet.author.name}</p>
            <p className="pl-1 text-sm text-gray-500">
              - {dayjs(tweet.createdAt).fromNow()}</p>
          </div>

          <div>{tweet.text}</div>
        </div>

      </div>

      <div className="mt-4 flex p-2 items-center">
        <AiFillHeart
          color={hasLiked ? "red" : "gray"}
          className="cursor-pointer"
          size="1.5rem"
          onClick={async () => {
            if (hasLiked) {
              await unlikeMutation({
                tweetId: tweet.id
              });
              return;
            }
            await likeMutation({
              tweetId: tweet.id
            });
          }}
        />
        <span className="text-sm text-gray-500">{10}</span>
      </div>
    </div>
  );
};

export default Tweet;