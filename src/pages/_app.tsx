import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { api } from "~/utils/api";

import { PageLayout } from "~/components/PageLayout";

import "~/styles/globals.css";
import "mapbox-gl/dist/mapbox-gl.css";

import { ToastContainer } from "react-toastify";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <UserProvider>
        <PageLayout>
          <Component {...pageProps} />
          <ToastContainer
            position="bottom-right"
            closeOnClick
            theme="light"
            autoClose={5000}
            pauseOnHover
          />
        </PageLayout>
      </UserProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
