
import { type NextPage } from "next";
import Head from "next/head";

import HomeModal from "~/components/HomeModal";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>David Kielty RendezVoo</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Content />
    </>
  );
};

export default Home;

const Content: React.FC = () => {
  return <HomeModal />;
};
