import type { FunctionComponent } from "react";
import CreateTweet from "./CreateTweet";

const Timeline: FunctionComponent = (): JSX.Element => {
  return (
    <div>
      <CreateTweet />
    </div>
  )
};

export default Timeline;