import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const profilePics = [
  "https://randomuser.me/api/portraits/women/84.jpg",
  "https://randomuser.me/api/portraits/women/93.jpg",
  "https://randomuser.me/api/portraits/women/19.jpg",
  "https://randomuser.me/api/portraits/women/91.jpg",
  "https://randomuser.me/api/portraits/women/28.jpg",
  "https://randomuser.me/api/portraits/women/18.jpg",
  "https://randomuser.me/api/portraits/women/43.jpg",
  "https://randomuser.me/api/portraits/women/47.jpg",
  "https://randomuser.me/api/portraits/women/22.jpg",
  "https://randomuser.me/api/portraits/women/15.jpg",
  "https://randomuser.me/api/portraits/women/12.jpg",
  "https://randomuser.me/api/portraits/women/45.jpg",
  "https://randomuser.me/api/portraits/women/50.jpg",
  "https://randomuser.me/api/portraits/women/53.jpg",
  "https://randomuser.me/api/portraits/women/26.jpg",
  "https://randomuser.me/api/portraits/women/27.jpg",
  "https://randomuser.me/api/portraits/women/48.jpg",
  "https://randomuser.me/api/portraits/women/80.jpg",
  "https://randomuser.me/api/portraits/women/35.jpg",
  "https://randomuser.me/api/portraits/men/22.jpg",
  "https://randomuser.me/api/portraits/men/64.jpg",
  "https://randomuser.me/api/portraits/men/74.jpg",
  "https://randomuser.me/api/portraits/men/90.jpg",
  "https://randomuser.me/api/portraits/men/54.jpg",
  "https://randomuser.me/api/portraits/men/19.jpg",
  "https://randomuser.me/api/portraits/men/48.jpg",
  "https://randomuser.me/api/portraits/men/70.jpg",
  "https://randomuser.me/api/portraits/men/18.jpg",
  "https://randomuser.me/api/portraits/men/23.jpg",
  "https://randomuser.me/api/portraits/men/3.jpg",
  "https://randomuser.me/api/portraits/men/32.jpg",
];

const userNames = [
  "Alex Turner",
  "Avery Wallace",
  "Bailey Fisher",
  "Casey Griffin",
  "Charlie Murphy",
  "Dakota James",
  "Devon Anderson",
  "Dylan Baker",
  "Emerson Scott",
  "Frankie Morris",
  "Harper Kelly",
  "Jamie Edwards",
  "Jesse Alexander",
  "Jordan Cooper",
  "Kendall Russell",
  "Morgan Ward",
  "Parker Bell",
  "Pat Nelson",
  "Peyton Brooks",
  "Quinn Peterson",
  "Riley Hughes",
  "Harper Nichols",
  "Rowan Clark",
  "Sam Bennett",
  "Skyler Morgan",
  "Stevie Gibson",
  "Taylor Hayes",
  "Tyler Richardson",
  "Reese Campbell",
  "Blair Sanders",
  "Phoenix King",
];

const emails = [
  "davidkieltyxasdjiadsak01@live.co.uk",
  "davidkieltyxasdjiadsak02@live.co.uk",
  "davidkieltyxasdjiadsak03@live.co.uk",
  "davidkieltyxasdjiadsak04@live.co.uk",
  "davidkieltyxasdjiadsak05@live.co.uk",
  "davidkieltyxasdjiadsak06@live.co.uk",
  "davidkieltyxasdjiadsak07@live.co.uk",
  "davidkieltyxasdjiadsak08@live.co.uk",
  "davidkieltyxasdjiadsak09@live.co.uk",
  "davidkieltyxasdjiadsak10@live.co.uk",
  "davidkieltyxasdjiadsak11@live.co.uk",
  "davidkieltyxasdjiadsak12@live.co.uk",
  "davidkieltyxasdjiadsak13@live.co.uk",
  "davidkieltyxasdjiadsak14@live.co.uk",
  "davidkieltyxasdjiadsak15@live.co.uk",
  "davidkieltyxasdjiadsak16@live.co.uk",
  "davidkieltyxasdjiadsak17@live.co.uk",
  "davidkieltyxasdjiadsak18@live.co.uk",
  "davidkieltyxasdjiadsak19@live.co.uk",
  "davidkieltyxasdjiadsak20@live.co.uk",
  "davidkieltyxasdjiadsak21@live.co.uk",
  "davidkieltyxasdjiadsak22@live.co.uk",
  "davidkieltyxasdjiadsak23@live.co.uk",
  "davidkieltyxasdjiadsak24@live.co.uk",
  "davidkieltyxasdjiadsak25@live.co.uk",
  "davidkieltyxasdjiadsak26@live.co.uk",
  "davidkieltyxasdjiadsak27@live.co.uk",
  "davidkieltyxasdjiadsak28@live.co.uk",
  "davidkieltyxasdjiadsak29@live.co.uk",
  "davidkieltyxasdjiadsak30@live.co.uk",
  "davidkieltyxasdjiadsak31@live.co.uk",
];

const userIDs = [
  "cloudfreyj0000l908tmjdzbxv",
  "cloudfreyj0000l910tmjdzbxv",
  "cloudfreyj0000l911tmjdzbxv",
  "cloudfreyj0000l912tmjdzbxv",
  "cloudfreyj0000l913tmjdzbxv",
  "cloudfreyj0000l914tmjdzbxv",
  "cloudfreyj0000l915tmjdzbxv",
  "cloudfreyj0000l916tmjdzbxv",
  "cloudfreyj0000l917tmjdzbxv",
  "cloudfreyj0000l918tmjdzbxv",
  "cloudfreyj0000l919tmjdzbxv",
  "cloudfreyj0000l920tmjdzbxv",
  "cloudfreyj0000l921tmjdzbxv",
  "cloudfreyj0000l922tmjdzbxv",
  "cloudfreyj0000l923tmjdzbxv",
  "cloudfreyj0000l924tmjdzbxv",
  "cloudfreyj0000l925tmjdzbxv",
  "cloudfreyj0000l926tmjdzbxv",
  "cloudfreyj0000l927tmjdzbxv",
  "cloudfreyj0000l928tmjdzbxv",
  "cloudfreyj0000l929tmjdzbxv",
  "cloudfreyj0000l930tmjdzbxv",
  "cloudfreyj0000l931tmjdzbxv",
  "cloudfreyj0000l932tmjdzbxv",
  "cloudfreyj0000l933tmjdzbxv",
  "cloudfreyj0000l934tmjdzbxv",
  "cloudfreyj0000l935tmjdzbxv",
  "cloudfreyj0000l936tmjdzbxv",
  "cloudfreyj0000l937tmjdzbxv",
  "cloudfreyj0000l938tmjdzbxv",
  "cloudfreyj0000l939tmjdzbxv",
];

const cities = [
  "Paris, France",
  "London, UK",
  "Berlin, Germany",
  "Madrid, Spain",
  "Rome, Italy",
  "Vienna, Austria",
  "Oslo, Norway",
  "Athens, Greece",
  "Prague, Czechia",
  "Dublin, Ireland",
  "Amsterdam, Netherlands",
  "Brussels, Belgium",
  "Lisbon, Portugal",
  "Zurich, Switzerland",
  "Budapest, Hungary",
  "Warsaw, Poland",
  "Copenhagen, Denmark",
  "Stockholm, Sweden",
  "Helsinki, Finland",
  "Reykjavik, Iceland",
  "Edinburgh, Scotland",
  "Barcelona, Spain",
  "Venice, Italy",
  "Munich, Germany",
  "Canberra, Australia",
  "Brasília, Brazil",
  "Ottawa, Canada",
  "Beijing, China",
  "New Delhi, India",
  "Tokyo, Japan",
  "Mexico City, Mexico",
  "Wellington, New Zealand",
  "Abuja, Nigeria",
  "Moscow, Russia",
  "Pretoria, South Africa",
  "Bangkok, Thailand",
  "Washington, D.C., United States",
  "Hanoi, Vietnam",
  "Buenos Aires, Argentina",
  "Jakarta, Indonesia",
  "Ankara, Turkey",
  "Kuala Lumpur, Malaysia",
  "Nairobi, Kenya",
  "Malé, Maldives",
];

const bios = [
  "Adventure seeker and nature lover. Excited to connect with fellow outdoor enthusiasts!",
  "Aspiring chef who loves to explore new cuisines. Looking forward to sharing recipes and dining experiences!",
  "Tech geek, passionate about the latest gadgets. Keen to meet others who share my curiosity for innovation.",
  "Artist at heart, exploring the world through my lens. Love meeting fellow creatives.",
  "Fitness fanatic, dedicated to a healthy lifestyle. Excited to find workout buddies!",
  "Bookworm and aspiring writer. Eager to discuss literature and exchange book recommendations.",
  "Travel junkie, constantly seeking new adventures. Can't wait to share travel stories and tips!",
  "Music enthusiast, always ready for a good concert. Let's exchange playlists and concert experiences!",
  "Budding entrepreneur, fascinated by startups. Eager to connect with like-minded business minds.",
  "Gardening lover, passionate about sustainable living. Excited to exchange green tips and tricks.",
  "Coffee aficionado, exploring the world one cup at a time. Let's chat over a virtual coffee!",
  "History buff, always down for a museum visit. Looking forward to historical debates and discussions.",
  "Yoga practitioner, embracing mindfulness. Excited to meet fellow yogis and share practices.",
  "Language learner, currently tackling Spanish. Happy to practice and exchange language learning tips.",
  "Baker extraordinaire, passionate about pastries. Eager to exchange recipes and baking stories.",
  "Movie fanatic, always up for a film discussion. Let's share reviews and recommendations!",
  "Volunteer and community organizer. Excited to connect with people who want to make a difference.",
  "Fashion lover, keeping up with the latest trends. Let's share style tips and favorite brands!",
  "Photographer capturing life's moments. Keen to connect with other photography enthusiasts.",
  "Science nerd, fascinated by the universe. Let's discuss the wonders of science and technology.",
  "Cyclist and outdoor adventurer. Looking forward to meeting fellow cycling enthusiasts.",
  "Foodie exploring the world through taste. Excited to meet other gourmets and share dining experiences.",
  "Animal lover and pet parent. Can't wait to share cute pet stories and tips!",
  "Board game enthusiast, always ready for game night. Looking for fellow gamers to join the fun.",
  "Dancer at heart, expressing myself through movement. Excited to connect with other dancers.",
  "Amateur astronomer, stargazing whenever possible. Keen to meet others who share my passion for the cosmos.",
  "Sustainability advocate, striving for a greener planet. Excited to exchange eco-friendly ideas.",
  "DIY hobbyist, love creating and fixing things. Looking forward to sharing projects and inspiration.",
  "Digital nomad, working and traveling. Excited to meet fellow remote workers and travelers.",
  "Runner and marathoner, chasing new goals. Looking for running buddies and training tips.",
  "Wine connoisseur, exploring the world of wines. Let's chat about our favorite vineyards and vintages.",
  "Chess player, always strategizing. Excited to meet fellow chess enthusiasts for a game or two.",
  "Podcast host, discussing a range of topics. Eager to connect with fellow podcasters and listeners.",
  "Stand-up comedy fan, love a good laugh. Let's share our favorite comedians and jokes.",
  "Minimalist, finding joy in simplicity. Keen to exchange ideas on living a minimalist lifestyle.",
  "Vegan foodie, exploring plant-based cuisine. Excited to share recipes and dining spots.",
  "Skier and snowboarder, chasing the snow. Looking forward to meeting fellow winter sports enthusiasts.",
  "Gamer, immersed in virtual worlds. Let's connect and share gaming experiences.",
  "Knitting and crochet hobbyist, creating cozy crafts. Excited to meet fellow crafters and share patterns.",
  "Meditation and mindfulness practitioner. Eager to meet others on this journey of self-discovery.",
];

// Use RandomChoice if population more Users
// const randomChoice = (arr) => {
//   if (!arr || arr.length === 0) {
//     // Return a default value or handle the empty array case as needed.
//     return "Default Choice";
//   }
//   return arr[Math.floor(Math.random() * arr.length)];
// };

//Otherwise just index
export async function seedUsers() {
  for (let i = 0; i < userIDs.length; i++) {
    const id = userIDs[i];
    const userExists = await prisma.user.findUnique({
      where: { id },
    });
    if (userExists) {
      console.log(`User with ID ${id} already exists, skipping...`);
      continue; // Skip this iteration and don't attempt to create this user
    }

    const userName = userNames[i];
    const profilePic = profilePics[i]; // You might want to randomize this if there are more pics than users
    const email = emails[i];
    const location = cities[i];
    const bio = bios[i];

    await prisma.user.create({
      data: {
        id: id,
        email: email,
        name: userName,
        image: profilePic,
        location: location,
        description: bio,
      },
    });
  }
}

seedUsers()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
