import { useRouter } from "next/router";
import Timeline from "../components/Timeline";
import type { NextPage } from "next";

const UserPage: NextPage = (): JSX.Element => {

  const router = useRouter();

  const name = router.query.name as string;

  console.log('name: ', name);

  return (
    <div>
      <Timeline where={{
        author: {
          name
        }
      }} />
    </div>
  );
};

export default UserPage;