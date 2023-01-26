import { signIn, useSession } from "next-auth/react";
import Container from "./Container";
import type { FunctionComponent } from "react";

const LoggedOutBanner: FunctionComponent = (): JSX.Element | null => {
  const { data: session } = useSession();

  if (session) {
    return null;
  }

  return (
    <div className="bg-primary fixed bottom-0 w-full p-4">
      <Container classNames="bg-transparent flex justify-between">
        <p className="text-white">Do not miss out</p>
        <div>
          <button
            className="text-white shadow-md px-4 py-2"
            onClick={() => void signIn()}
          >
            Login
          </button>
        </div>
      </Container>
    </div>
  );
};

export default LoggedOutBanner;