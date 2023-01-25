import { useState } from "react";
import { object, string } from "zod";
import { api } from "../utils/api";
import type { FunctionComponent, FormEvent } from "react";

export const tweetSchema = object({
  text: string({
    required_error: "Tweet text is required"
  })
    .min(10)
    .max(280)
});

const CreateTweet: FunctionComponent = (): JSX.Element => {
  const [text, setText] = useState<string>("");
  const [error, setError] = useState<string>("");

  const { mutateAsync } = api.tweet.create.useMutation();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      tweetSchema.parse({ text })
    } catch (error) {
      setError((error as Error).message);
      return;
    }

    await mutateAsync({ text });
  };

  return (
    <>
      {error && JSON.stringify(error)}
      <form onSubmit={void handleSubmit}>
        <textarea onChange={(event) => setText(event.target.value)} value={text} />
        <div>
          <button type="submit">Tweet</button>
        </div>
      </form>

    </>
  );
};

export default CreateTweet;