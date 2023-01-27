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
  const utils = api.useContext();

  const { mutateAsync } = api.tweet.create.useMutation({
    onSuccess: async () => {
      setText("");
      await utils.tweet.timeline.invalidate();
    }
  });

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      tweetSchema.parse({ text });
    } catch (error) {
      setError((error as Error).message);
      return;
    }

    await mutateAsync({ text });
  };

  return (
    <>
      {error && JSON.stringify(error)}
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col border-2 p-4 rounded-md mb-4"
      >
        <textarea
          onChange={(event) => setText(event.target.value)}
          value={text}
          className="shadow p-4 w-full"
        />
        <div className="mt-4 flex justify-end">
          <button
            type="submit"
            className="bg-primary text-white px-4 py-2 rounded-md"
          >
            Tweet
          </button>
        </div>
      </form>
    </>
  );
};

export default CreateTweet;