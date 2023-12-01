/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useState } from "react";
import { api } from "../utils/api";
import { useRouter } from "next/router";
import Button from "./Button";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NewMeetupForm = () => {
  const router = useRouter();

  const [inputTitle, setInputTitle] = useState<string>("");
  const [inputLocation, setInputLocation] = useState<string>("");
  const [inputCoordinates, setCoordinates] = useState<number[]>([]);
  const [inputDescription, setInputDescription] = useState<string>("");
  const [inputTime, setInputTime] = useState<string>("");
  const [inputImage, setInputImage] = useState<string>("");

  const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
  const MapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
  const geocoder = mbxGeocoding({ accessToken: MapboxToken });

  const titleHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    setInputTitle(event.currentTarget.value);
  };

  const locationHandler = async (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    setInputLocation(event.currentTarget.value);
    if (event.currentTarget.value && event.currentTarget.value.length > 0) {
      const geoData = await geocoder
        .forwardGeocode({
          query: event.currentTarget.value,
          limit: 1,
        })
        .send();

      if (geoData.body.features[0] === undefined) {
        setCoordinates([12.271638, 45.475799]);
      } else {
        setCoordinates(geoData.body.features[0].geometry.coordinates);
      }
    }
  };

  const descriptionHandler = (
    event: React.KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    setInputDescription(event.currentTarget.value);
  };

  const timeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputTime(event.target.value);
  };

  const imageHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    setInputImage(event.currentTarget.value);
  };

  const createMeetup = api.meetup.create.useMutation({
    onSuccess: () => {
      const { refetch: refetchMeetups } = api.meetup.getAllMeetups.useQuery();
      void refetchMeetups();
    },
  });

  // showToast(result.error.format()._errors[0], "error")

  const submitHandler = () => {
    function notify() {
      toast("New Meetup Submitted");
    }

    notify();

    if (inputCoordinates) {
      createMeetup.mutate({
        title: inputTitle,
        location: inputLocation,
        description: inputDescription,
        time: inputTime,
        image: inputImage,
        coordinates: inputCoordinates,
      });
    } else {
      console.error("No coordinates available.");
    }

    void router.push(`/Meetups`);
  };

  return (
    <form onSubmit={submitHandler} className=" h-screen">
      <div className="mx-auto mt-16 max-w-4xl rounded-md border border-gray-300 bg-slate-100 px-20 py-10 shadow-xl">
        <h2 className="pb-8 text-xl font-bold text-slate-600">
          New Meetup Details
        </h2>
        <input
          required
          id="title"
          name="title"
          type="text"
          placeholder="Title"
          className="input input-bordered input-sm  mb-2 h-10 w-full"
          onKeyUp={(event: React.KeyboardEvent<HTMLInputElement>): void =>
            titleHandler(event)
          }
        ></input>
        <textarea
          required
          id="description"
          name="description"
          placeholder="Description"
          maxLength={255}
          className="input input-bordered input-sm h-28 w-full"
          onKeyUp={(event: React.KeyboardEvent<HTMLTextAreaElement>): void =>
            descriptionHandler(event)
          }
        ></textarea>
        <input
          required
          id="location"
          name="location"
          type="text"
          placeholder="Location"
          className="input input-bordered input-sm  mb-2 h-10 w-full"
          onKeyUp={(event: React.KeyboardEvent<HTMLInputElement>): void => {
            locationHandler(event);
          }}
        ></input>
        <input
          required
          id="time"
          name="time"
          type="datetime-local"
          placeholder="Time"
          className=" input input-bordered input-sm mb-2 h-10 w-full"
          onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
            timeHandler(event);
          }}
        ></input>
        <div>
          <input
            className="input input-bordered input-sm  mb-2 h-10 w-full"
            id="image"
            name="image"
            type="url"
            required
            placeholder="Image Url"
            onKeyUp={(event: React.KeyboardEvent<HTMLInputElement>): void =>
              imageHandler(event)
            }
          />
        </div>
        <div className="pt-8">
          <Button>Submit</Button>
        </div>
      </div>
    </form>
  );
};

export default NewMeetupForm;
