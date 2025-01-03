/* eslint-disable @typescript-eslint/no-var-requires */
import { PrismaClient } from "@prisma/client";
import {
  imagePaths,
  cities,
  comments,
  meetupDescriptions,
  userIDs,
  places,
  events,
  randomChoice,
} from "./ArrayHelper.js";

const prisma = new PrismaClient();

import mbxGeocoding from "@mapbox/mapbox-sdk/services/geocoding.js";
const MapboxToken = process.env.NEXT_PUBLIC_MAPTOKEN;
const geocoder = mbxGeocoding({ accessToken: MapboxToken });

const generateMeetupData = async () => {
  const randomCity = randomChoice(cities);
  const randomPlace = randomChoice(places);
  const randomEvent = randomChoice(events);
  const randomDescription = randomChoice(meetupDescriptions);
  const userId = randomChoice(userIDs);

  const title = `${randomCity || "Default City"} ${
    randomPlace || "Default Place"
  } ${randomEvent || "Default Event"}`;

  const description = `${
    randomDescription ||
    "Join us for an amazing time with like-minded people in a beautiful setting. Let's create memories!"
  }`;

  const location = `${randomPlace || "Default Place"} ${
    randomCity || "Default City"
  }`;

  const geoData = await geocoder
    .forwardGeocode({
      query: randomCity,
      limit: 1,
    })
    .send();

  const coordinates = geoData.body.features[0].geometry.coordinates;
  const time = new Date().toLocaleString();
  const image =
    `/images/${encodeURIComponent(
      imagePaths[Math.floor(Math.random() * imagePaths.length)],
    )}` || "default-image-path";

  return {
    title,
    description,
    location,
    time,
    image,
    userId,
    coordinates: coordinates,
  };
};

export async function seedMeetups() {
  await prisma.comment.deleteMany({});
  await prisma.savedMeetup.deleteMany({});
  await prisma.meetup.deleteMany({});

  let allMeetups = [];

  for (let i = 0; i < 20; i++) {
    let meetupData = await generateMeetupData();
    meetupData.userId = "cm5334qqx0000o7qtal3hij2e";

    let createdMeetup = await prisma.meetup.create({
      data: meetupData,
    });
    allMeetups.push(createdMeetup);

    let selectedUserIDs = userIDs.sort(() => 0.5 - Math.random()).slice(0, 7);

    for (const userId of selectedUserIDs) {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { name: true },
      });

      const userName = user?.name || "Unknown User";

      await prisma.comment.create({
        data: {
          author: `${userName}`,
          content: randomChoice(comments),
          userId: `${userId}`,
          meetupId: createdMeetup.id,
        },
      });
    }

    console.log(`Seeded meetup #${i + 1}`);
  }

  // Seed remaining meetups
  for (let i = 20; i < 100; i++) {
    let meetupData = await generateMeetupData();

    let createdMeetup = await prisma.meetup.create({
      data: meetupData,
    });
    allMeetups.push(createdMeetup);

    let selectedUserIDs = userIDs.sort(() => 0.5 - Math.random()).slice(0, 7);

    for (const userId of selectedUserIDs) {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { name: true },
      });

      const userName = user?.name || "Unknown User";

      await prisma.comment.create({
        data: {
          author: `${userName}`,
          content: randomChoice(comments),
          userId: `${userId}`,
          meetupId: createdMeetup.id,
        },
      });
    }

    console.log(`Seeded meetup #${i + 1}`);
  }

  // Seed SavedMeetups
  for (const meetup of allMeetups) {
    // Randomly select 10 unique user IDs for each meetup
    let selectedUserIDs = userIDs
      .sort(() => 0.5 - Math.random())
      .slice(0, 7)
      .map((userId) => ({
        userId: userId,
        meetupId: meetup.id,
      }));

    await prisma.savedMeetup.createMany({
      data: selectedUserIDs,
    });
  }

  console.log("All meetups, comments, and saved meetups seeded!");
  await prisma.$disconnect();
}

seedMeetups().catch((e) => {
  console.error(e);
  prisma.$disconnect().catch((error) => {
    console.error("Error while disconnecting Prisma:", error);
  });
});
