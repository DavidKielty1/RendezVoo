import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { type FormEvent, useState } from "react";
import { type Meetup } from "~/utils/types";
import Head from "next/head";
import Button from "~/components/Button";

function Edit() {
  const router = useRouter();
  const { data: sessionData } = useSession();
  const meetupId = router.query.meetupId as string;

  api.meetup.getOne.useQuery(
    { meetupId },
    {
      enabled: sessionData?.user !== undefined,
      onSuccess: (data: Meetup) => {
        setInputTitle(data.title);
        setInputLocation(data.location);
        setInputDescription(data.description);
        setInputImage(data.image);
        // setInputTime("01/01/2024 20:00");
      },
    },
  );

  const [inputTitle, setInputTitle] = useState<string>("");
  const [inputLocation, setInputLocation] = useState<string>("");
  const [inputDescription, setInputDescription] = useState<string>("");
  const [inputTime, setInputTime] = useState<string>("");
  const [inputImage, setInputImage] = useState<string>("");

  const titleHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputTitle(event.target.value);
  };

  const locationHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputLocation(event.target.value);
  };

  const descriptionHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setInputDescription(event.target.value);
  };

  const timeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const time = event.target.value;
    const timeAltered = time.replace("T", ", ");
    setInputTime(timeAltered);
  };

  const imageHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputImage(event.target.value);
  };

  const updateMeetup = api.meetup.update.useMutation({});

  function submitHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    updateMeetup.mutate({
      id: meetupId,
      title: inputTitle,
      location: inputLocation,
      description: inputDescription,
      time: inputTime,
      image: inputImage,
    });

    void router.push("/" + meetupId);
  }
  return (
    <>
      <Head>
        <title>David Kielty Edit Details</title>
        <meta name="description" content="" />
        <link rel="icon" href="..//favicon.ico" />
      </Head>
      <form onSubmit={(e) => submitHandler(e)} className="h-screen">
        <div className="mx-auto mt-16 max-w-4xl rounded-md border border-gray-300 bg-slate-100 px-20 py-10 shadow-xl">
          <h2 className="pb-8 text-xl font-bold">Edit Appointment Details</h2>
          <div>
            <div>
              <input
                autoFocus
                required
                id="title"
                name="title"
                value={inputTitle}
                type="text"
                className="input input-bordered input-sm  mb-2 h-10 w-full "
                onChange={titleHandler}
              ></input>
            </div>
            <div>
              <textarea
                required
                id="description"
                name="description"
                className="input input-bordered input-sm h-28 w-full"
                value={inputDescription}
                onChange={descriptionHandler}
              ></textarea>
            </div>
            <div>
              <input
                required
                id="location"
                name="location"
                type="text"
                value={inputLocation}
                className="input input-bordered input-sm mb-2 h-10 w-full "
                onChange={locationHandler}
              ></input>
            </div>
            <div>
              <input
                required
                id="time"
                name="time"
                // value={inputTime}
                type="datetime-local"
                className="input input-bordered input-sm  mb-2 h-10 w-full "
                onChange={timeHandler}
              ></input>
            </div>
            <div>
              <input
                required
                id="image"
                name="image"
                type={`url | string`}
                className="input input-bordered input-sm  mb-2 h-10 w-full "
                value={inputImage}
                onChange={imageHandler}
              />
            </div>
          </div>
          <div className="pt-8">
            <Button>Submit</Button>
          </div>
        </div>
      </form>
    </>
  );
}

export default Edit;
