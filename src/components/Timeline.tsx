import { useEffect } from "react";
import CreateTweet from "./CreateTweet";
import Tweet from "./Tweet";
import { api } from "../utils/api";
import { useScrollPosition } from "../hooks/useScrollPosition";
import { useDebounce } from "../hooks/useDebounce";
import type { FunctionComponent } from "react";

const LIMIT = 10;

const Timeline: FunctionComponent = (): JSX.Element => {
  const scrollPosition = useScrollPosition();
  const debouncedScrollPosition = useDebounce<number>(scrollPosition, 400);

  const { data, hasNextPage, fetchNextPage, isFetching } = api.tweet.timeline.useInfiniteQuery({
    limit: LIMIT
  }, {
    getNextPageParam: (lastPage) => lastPage.nextCursor
  });

  useEffect(() => {
    if (debouncedScrollPosition > 90 && hasNextPage && !isFetching) {
      fetchNextPage()
    }
  }, [fetchNextPage, hasNextPage, isFetching, debouncedScrollPosition]);

  const tweets = data?.pages.flatMap((page) => page.tweets) ?? [];

  return (
    <div>
      <CreateTweet />
      <div className="border-l-2 border-r-2 border-t-2 border-gray-500">
        {tweets.map((tweet) => <Tweet key={tweet.id} tweet={tweet} />)}
        {!hasNextPage && <p>No more items to load</p>}
      </div>
    </div>
  );
};

export default Timeline;