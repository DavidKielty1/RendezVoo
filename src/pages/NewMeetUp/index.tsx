import NewMeetupForm from "~/components/NewMeetupForm";
import Head from "next/head";

function NewMeetUp() {
  return (
    <>
      <Head>
        <title>David Kielty New Meetup</title>
        <meta name="description" content="" />
        <link rel="icon" href="..//favicon.ico" />
      </Head>
      <NewMeetupForm />
    </>
  );
}

export default NewMeetUp;
