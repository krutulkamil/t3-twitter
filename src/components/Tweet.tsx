import type { FunctionComponent } from "react";
import Image from "next/image";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
import { RouterOutputs } from "../utils/api";

interface TweetProps {
  tweet: RouterOutputs["tweet"]["timeline"]["tweets"][number];
}

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

const Tweet: FunctionComponent<TweetProps> = ({ tweet }): JSX.Element => {
  return (
    <div className="mb-4 border-b-2 border-gray-500">
      <div className="flex p-2">
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
    </div>
  );
};

export default Tweet;