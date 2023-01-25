import { type NextPage } from "next";
import Head from "next/head";
import { signIn, useSession } from "next-auth/react";
import Timeline from "../components/Timeline";

const Home: NextPage = () => {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <p>hello from tRPC</p>
        <button onClick={() => void signIn()}>Login</button>
        <Timeline />
      </div>
    </>
  );
};

export default Home;
