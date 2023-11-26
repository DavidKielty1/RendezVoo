/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { type NextPage } from "next";
import Head from "next/head";

import HomeModal from "~/components/HomeModal";

// require("dotenv").config();

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>David Kielty RendezVue</title>
        <meta name="description" content="" />
        <link rel="icon" href="../../public/favicon.ico" />
      </Head>
      <Content />
    </>
  );
};

export default Home;

const Content: React.FC = () => {
  return <HomeModal />;
};
