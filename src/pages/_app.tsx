import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Container from "../components/Container";
import LoggedOutBanner from "../components/LoggedOutBanner";
import { api } from "../utils/api";
import "../styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
                                                       Component,
                                                       pageProps: { session, ...pageProps }
                                                     }) => {
  return (
    <SessionProvider session={session}>
      <Container>
        <main>
          <Component {...pageProps} />
        </main>
      </Container>
      <LoggedOutBanner />
      <ReactQueryDevtools initialIsOpen={false} />
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
