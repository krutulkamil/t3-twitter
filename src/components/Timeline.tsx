import type { FunctionComponent } from "react";
import CreateTweet from "./CreateTweet";
import Tweet from "./Tweet";
import { api } from "../utils/api";

const Timeline: FunctionComponent = (): JSX.Element => {
  const { data } = api.tweet.timeline.useQuery({
    limit: 10
  });

  return (
    <div>
      <CreateTweet />
      <div className="border-l-2 border-r-2 border-t-2 border-gray-500">
        {data?.tweets.map((tweet) => <Tweet key={tweet.id} tweet={tweet} />)}
      </div>
    </div>
  );
};

export default Timeline;