export const randomChoice = (arr) => {
  if (!arr || arr.length === 0) {
    return "Default Choice";
  }
  return arr[Math.floor(Math.random() * arr.length)];
};

export const imageArray = [
  "https://blog.trip-my-france.com/wp-content/uploads/2021/03/Best-European-Cafes-Cafe-New-York-Budapest-Flickr-900x450.jpg",
  "https://www.londonkensingtonguide.com/wp-content/uploads/2020/09/Peggy-Porschen-bakery-Kings-Road-Kensington-2.jpg",
  "https://annasherchand.com/wp-content/uploads/2021/04/cute-cafes-in-london-1024x623.jpeg",
  "https://housing.com/news/wp-content/uploads/2022/12/Best-cafes-in-Ahmedabad-compressed-686x400.jpg",
  "https://www.kensingtonmums.co.uk/wp-content/uploads/2022/03/Photo-Resizer-2022_03_14_04_56_14.jpg",
  "https://data.awol.com.au/wp-content/uploads/2018/04/img_1.jpg",
  "https://media.architecturaldigest.com/photos/64591806f1080e397f9f2d96/16:9/w_5583,h_3140,c_limit/Grand%20Hotel%20Mackinac%20130_Cat2.jpg",
  "https://res.cloudinary.com/ocean-holidays-test/image/upload/c_scale,w_auto,f_auto,dpr_auto/WingedBoots/MagazineArticle/1595/mahbxjdl7ma1tj2moa4w.jpg",
  "https://www.thetimes.co.uk/travel/wp-content/uploads/sites/6/2021/12/HERO-Dromoland-Brian-Boru-Suite-Bedroom-copy.jpg?resize=1220,480",
  "https://www.mind-mag.com/wp-content/uploads/2018/04/pink-zebra-feast-india-company-kanpur-india-renesa--1440x520.jpg",
  "https://static.trip101.com/main_pics/233946/medium.jpg",
  "https://images.lifestyleasia.com/wp-content/uploads/sites/6/2023/06/06111916/wes-anderson-hotels-in-thailand-tiktok-trend-filming.jpg?tr=w-1200,h-900",
  "https://content.api.news/v3/images/bin/e84940b2229bc3a950e4dfdf8327a657?width=2048",
  "https://images.viewretreats.com/wp-content/uploads/2022/05/10173146/Vana-Belle-Samui.jpeg",
  "https://www.sovereign.com/-/media/bynder/sovereign-properties/greece/mykonos/bill-and-coo-suites/facilities/bill-coo-suites-2022-sunset-lounge-001-117758-hybris.jpg?rev=318df555704b42298905f2d73d06a235",
  "https://images.bauerhosting.com/celebrity/sites/3/2023/06/the-french-dispatch.jpg?ar=16%3A9&fit=crop&crop=top&auto=format&w=undefined&q=80",
  "https://assets.suitcasemag.com/images/hero_mobile/125890-wes-hotel.jpg",
  "https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/wp-content/uploads/2023/05/image.png",
  "https://media.timeout.com/images/105184499/750/562/image.jpg",
  "https://static.designmynight.com/uploads/2023/06/Colonel-Saab-London.jpg",
  "https://freight.cargo.site/w/4961/q/75/i/f4c13e89684eb1c999743385de8ff262e6602d132adec48f988f4a8b7995ceef/the-darjeeling-limited.jpg",
  "https://i.redd.it/0xt2vwvuouv01.jpg",
  "https://images.squarespace-cdn.com/content/v1/5702ab9d746fb9634796c9f9/1610044626086-ZC1YK1WA5NN7QV8JEDNR/Marshalltown+Country+Club+1000.jpg",
  "https://images.unsplash.com/photo-1635711517978-3b0ff0a53550?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8M3w5NjI1ODA4fHxlbnwwfHx8fHw%3D&w=1000&q=80",
  "https://media.cnn.com/api/v1/images/stellar/prod/201125215143-09-accidentally-wes-anderson.jpg?q=x_0,y_100,h_1125,w_1999,c_crop/w_800",
  "https://images.unsplash.com/photo-1631913220937-dccccad3231a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8N3w5NjI1ODA4fHxlbnwwfHx8fHw%3D&w=1000&q=80",
  "https://cdn.enjoytravel.com/img/travel-news/rhaetian-railway-graubunden-switzerland.jpg",
];

export const imagePaths = [
  "Seed 1.jpg",
  "Seed 2.jpg",
  "Seed 3.jpeg",
  "Seed 4.webp",
  "Seed 5.jpg",
  "Seed 6.jpg",
  "Seed 7.webp",
  "Seed 8.webp",
  "Seed 9.webp",
  "Seed 10.webp",
  "Seed 11.jpeg",
  "Seed 12.jpg",
  "Seed 13.avif",
  "Seed 14.jpg",
  "Seed 15.webp",
  "Seed 16.jpg",
  "Seed 17.jpg",
  "Seed 18.jpg",
  "Seed 19.jpg",
  "Seed 20.jpg",
  "Seed 21.jfif",
  "Seed 22.jpg",
  "Seed 23.jfif",
  "Seed 24.jfif",
  "Seed 24.jpg",
];

export const cities = [
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

export const places = [
  "Cafe",
  "Restaurant",
  "Beach",
  "Countryside",
  "Park",
  "Theatre",
  "Pub",
  "Museum",
  "Art Gallery",
  "Picnic Spot",
  "Botanical Garden",
  "Winery",
  "Amusement Park",
  "Zoo",
  "Lake",
  "Historic Site",
  "Movie Theater",
  "Concert Venue",
  "Hiking Trail",
  "Bookstore",
  "Gourmet Food Market",
  "Shopping Mall",
  "Karaoke Bar",
  "Ice Cream Parlor",
  "Golf Course",
];

export const events = [
  "Gathering",
  "Rendezvous",
  "Social",
  "Gathering",
  "Meet and Greet",
  "Assembly",
  "Conclave",
  "Convocation",
  "Congregation",
  "Festivity",
  "Party",
  "Soiree",
  "Gala",
  "Hangout",
  "Gathering",
  "Event",
  "Celebration",
  "Gathering",
  "Function",
  "Shindig",
  "Affair",
  "Mixer",
  "Symposium",
  "Conference",
];

export const meetupDescriptions = [
  "Gather with us for a fantastic experience, meeting new friends in a stunning locale. Memories await!",
  "Come and enjoy a unique moment with peers in a splendid environment. Let's make lasting memories!",
  "Join a vibrant gathering of enthusiasts in an exquisite setting. Let's build unforgettable experiences!",
  "Meet like-minded individuals in a picturesque spot for an unforgettable adventure. Creating joyous memories!",
  "Connect with fellow enthusiasts for a splendid time in a serene setting. Let's cherish these moments!",
  "Unite for a delightful experience with peers in a lovely place. Making memories that last forever!",
  "Experience the joy of meeting new friends in an attractive locale. Let's make history together!",
  "Be part of a special meetup in an idyllic spot. Creating moments and laughter!",
  "Join a circle of friends for a memorable time in a beautiful backdrop. Let's craft lasting memories!",
  "Engage with kindred spirits in a delightful setting for a time to remember. Memories to be made!",
  "Gather for an extraordinary adventure with friends in a scenic place. Let's savor these moments!",
  "Meet, mingle, and create lasting memories in an enchanting environment. Unforgettable times await!",
  "Come together in a picturesque setting for a memorable journey with friends. Let's make it special!",
  "Share an incredible experience with peers in a stunning location. Creating moments to treasure!",
  "Be part of a unique gathering in a gorgeous setting. Let's make memories that sparkle!",
  "Connect, enjoy, and create memories in a breathtaking locale. An adventure of a lifetime!",
  "Join a fun-filled meetup in a charming spot. Let's weave unforgettable memories together!",
  "Gather for an exhilarating time with friends in a lovely setting. Creating joyous tales!",
  "Meet and bond over shared interests in a beautiful environment. Let's create magic together!",
  "Unite for a splendid time in an extraordinary place. Memories that will last a lifetime!",
  "Engage in a delightful meetup in a picturesque location. Let's make every moment count!",
  "Experience the excitement of new friendships in a stunning setting. Creating memories to cherish!",
  "Join us for an exhilarating adventure with like-minded folks. Let's capture these moments!",
  "Gather for a magical experience in a serene landscape. Creating memories and bonds!",
  "Connect with new friends in a splendid setting for a memorable escapade. Let's enjoy the journey!",
  "Meet, laugh, and create in an enchanting locale. Unforgettable experiences ahead!",
  "Join a festive gathering in a scenic paradise. Let's make memories that resonate!",
  "Experience joy and camaraderie in a beautiful setting. Creating memories to look back on!",
  "Unite for a fantastic experience with peers in an idyllic spot. Memories in the making!",
  "Engage with a vibrant community in a stunning locale. Let's create moments to remember!",
];

export const comments = [
  "Really thrilled about this meetup. Looking forward to great conversations and new connections!",
  "First time attending this event. Any advice from regular attendees would be much appreciated!",
  "So excited to join! I've heard great things about this group. Can't wait to meet everyone.",
  "Any tips on parking or transport for the venue? I'm new to the area and would appreciate some help.",
  "Bringing board games for anyone interested in a post-meetup match. Let's enjoy and have some fun!",
  "Always excited to see familiar faces and meet newcomers. These events are the highlights of my month!",
  "Interested in discussing latest industry trends after the meetup. Anyone else want to join in?",
  "Heard about a special guest speaker. Can anyone share more details? Can't wait to hear them speak!",
  "My first time with this group. Feeling a bit nervous but excited to meet new people and share experiences.",
  "Planning to document the meetup with photos and a blog. Let me know if you're okay with being featured!",
  "Who else is coming from the north side? Maybe we could coordinate transportation or meet up beforehand.",
  "Can't wait to try the food at the venue! Heard they have some amazing dishes. Anyone tried them before?",
  "Is the event kid-friendly? Thinking of bringing my niece along. She's very much into these kinds of events.",
  "Looking forward to the outdoor activities. I hope the weather stays nice. Fingers crossed!",
  "Excited to learn from everyone. These meetups are always so enlightening and full of knowledge.",
  "Bringing my camera along to capture some candid moments. If you have photo requests, let me know!",
  "Heard this meetup's topic is really interesting. Can't wait to dive deep into the discussions.",
  "Who's up for some post-event networking? It's always great to connect with like-minded individuals.",
  "I'll be bringing some of my homemade snacks. Hope you guys will like them. See you all very soon!",
  "This will be my second time attending. The last event was fantastic, and I'm sure this will be even better!",
  "Thrilled to be part of this event. The community vibe here is just awesome!",
  "Looking to carpool with someone for the next meetup. Anyone interested?",
  "I'm bringing a friend along who's new to this. Let's make them feel welcome!",
  "The last meetup was so inspiring. Can't wait to see what's in store this time!",
  "Does anyone know if the venue is wheelchair accessible? Asking for a friend.",
  "I've been to a few of these now, and they never disappoint. Kudos to the organizers!",
  "Anyone interested in a quick coffee or bite before the meetup starts?",
  "The discussion topics are always so thought-provoking. Really opens up new perspectives.",
  "Can't believe how much I've learned from these gatherings. It's been a fantastic journey.",
  "The energy at these events is just infectious. Always leaves me feeling more motivated!",
  "Really looking forward to connecting with everyone. These meetups are always a highlight!",
  "Does anyone know if there's a dress code for this meetup?",
  "Excited to see what new insights and perspectives I'll gain from this event.",
  "Wondering if anyone from the tech industry will be attending. Would love to network!",
  "Let's hope for good weather! Outdoor meetups have a charm of their own.",
  "Is it alright to bring a plus one? My colleague is interested in joining.",
  "Hoping to find some new book recommendations at the meetup. Any fellow readers?",
  "If anyone's interested, I'm thinking of organizing a group activity after the meetup.",
  "Curious to know if there will be any vegan food options available.",
  "Can't wait to see all the creative minds coming together at this event.",
  "If this is anything like the last event, we're in for a treat!",
  "Looking forward to some insightful discussions and learning opportunities.",
  "Any photographers attending? Would love to connect and exchange tips!",
  "Bringing my sketchbook along, in case anyone wants to join me for some drawing.",
  "Who's ready for some networking? Always exciting to meet professionals from different fields.",
  "I'll be taking notes during the discussions. Happy to share them post-meetup!",
  "Eager to see how this meetup will inspire my next project.",
  "If anyone needs directions or assistance, feel free to reach out. Happy to help!",
  "Looking forward to unwinding and having some good conversations.",
  "Is there a specific theme or topic for this meetup? Want to come prepared.",
  "Hoping to connect with others who are into sustainable living. See you there!",
  "Will there be a Q&A session? I have a few questions I'd love to get opinions on.",
  "Excited to meet people from different backgrounds and hear their stories.",
  "If anyone's into podcasts, let's exchange recommendations at the meetup!",
  "Curious to learn more about the various projects everyone's working on.",
  "It's my first time attending. A bit nervous but mostly excited!",
  "Planning to bring some games for anyone interested in a friendly competition.",
  "Looking forward to the group discussions. Always leave with new insights.",
  "Anyone else traveling from out of town for this meetup?",
  "Hoping to find some collaboration opportunities at this event. Let's network!",
  "Really thrilled about this meetup. Looking forward to great conversations and new connections!",
  "First time attending this event. Any advice from regular attendees would be much appreciated!",
  "So excited to join! I've heard great things about this group. Can't wait to meet everyone.",
  "Any tips on parking or transport for the venue? I'm new to the area and would appreciate some help.",
  "Bringing board games for anyone interested in a post-meetup match. Let's enjoy and have some fun!",
  "Always excited to see familiar faces and meet newcomers. These events are the highlights of my month!",
  "Interested in discussing latest industry trends after the meetup. Anyone else want to join in?",
  "Heard about a special guest speaker. Can anyone share more details? Can't wait to hear them speak!",
  "My first time with this group. Feeling a bit nervous but excited to meet new people and share experiences.",
  "Planning to document the meetup with photos and a blog. Let me know if you're okay with being featured!",
  "Who else is coming from the north side? Maybe we could coordinate transportation or meet up beforehand.",
  "Can't wait to try the food at the venue! Heard they have some amazing dishes. Anyone tried them before?",
  "Is the event kid-friendly? Thinking of bringing my niece along. She's very much into these kinds of events.",
  "Looking forward to the outdoor activities. I hope the weather stays nice. Fingers crossed!",
  "Excited to learn from everyone. These meetups are always so enlightening and full of knowledge.",
  "Bringing my camera along to capture some candid moments. If you have photo requests, let me know!",
  "Heard this meetup's topic is really interesting. Can't wait to dive deep into the discussions.",
  "Who's up for some post-event networking? It's always great to connect with like-minded individuals.",
  "I'll be bringing some of my homemade snacks. Hope you guys will like them. See you all very soon!",
  "This will be my second time attending. The last event was fantastic, and I'm sure this will be even better!",
  // Additional comments with the theme of visiting local capital city landmarks and various group activities
  "Anyone up for a hike after the meetup? I've heard the nearby trails are beautiful.",
  "Excited to explore the city landmarks post-meetup. Would anyone like to join?",
  "I'm planning a visit to the famous museum next weekend. Let's form a group!",
  "How about a countryside excursion next time? I love connecting with nature.",
  "Let's organize a city landmark scavenger hunt for our next meetup!",
  "Who's interested in a photography walk around the capital's historic sites?",
  "Thinking of renting bikes to explore the city after our gathering. Anyone in?",
  "A picnic in the nearby countryside sounds delightful for our next event.",
  "I'm keen on visiting the famous botanical garden here. It's perfect for a group outing.",
  "How about a group visit to the iconic tower in the city? Could be a fun trip!",
  "Wouldn't it be great to have a meetup at a countryside vineyard?",
  "Anyone interested in a guided tour of the capital's landmarks?",
  "Planning a group hike to the nearby hills. It's going to be refreshing!",
  "Let's organize a potluck in one of the city's beautiful parks next time.",
  "I've always wanted to explore the old town area. Let's make it a group activity!",
  "The idea of a countryside retreat sounds amazing for our next meetup.",
  "Who's up for a sunrise photography session at the city's most famous viewpoint?",
  "Let's have a group cycling tour around the capital's landmarks!",
  "Organizing a small group for a countryside exploration. Nature lovers, join in!",
  "How about a historical walk through the capital's ancient streets?",
  "I'm planning a day trip to the nearby mountains. Great opportunity for bonding!",
  "A city treasure hunt would be a fun way to explore and learn about the capital.",
  "Anyone else interested in exploring the local art scene? Could be a fun group outing.",
  "Let's have a meetup at a landmark café in the city center next time.",
  "I'm thinking of organizing a countryside star-gazing event. Anyone interested?",
  "Who's up for an adventure in the nearby forest? Great for team-building!",
  "Planning a cultural tour of the city's landmarks. Join me for an enriching experience!",
  "A visit to the famous castle in the city could be a great group activity.",
  "How about a walking tour to explore hidden gems in our capital?",
  "I love the idea of a group outing to a countryside farm.",
  "Let's organize a group visit to the national museum. It'll be educational and fun.",
  "Who's interested in a culinary tour of the city? Discovering local flavors together!",
  "A group kayaking trip in the nearby river would be exhilarating. Who's in?",
  "Exploring the capital's historic district could be a great way to spend the day after our meetup.",
  "How about a group painting session in the countryside? Let's get creative!",
  "Planning a group trip to the city's most famous monument. Let's learn its history!",
  "Anyone up for a pottery-making workshop in the countryside?",
  "How about a group book club meeting at a historic library in the city?",
  "Let's organize a meetup at the city's famous rooftop bar. Stunning views guaranteed!",
  "I'm keen on a group meditation session in the tranquility of the nearby hills.",
  "Exploring the city's architecture could be a fascinating group activity.",
];

export const userIDs = [
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

const city = randomChoice(cities);
const place = randomChoice(places);
const event = randomChoice(events);
// const templates = [
//   "Looking forward to seeing you all there!",
//   "Finally, a chance to meet everyone!",
//   `Can't wait to explore ${city}. It's going to be amazing!`,
//   `So excited for the ${event}. It's going to be unforgettable!`,
//   `@${mentionUser}, are you joining the ${event}?`,
//   "This is going to be my first meetup. Can't wait!",
//   `@${mentionUser}, let's catch up at
//     ${place},
//    during the meetup.`,
//   "I'm thrilled about visiting ${city}. See you all soon!",
//   "Counting down the days until the event!",
//   `@${mentionUser}, looking forward to seeing you there!`,
//   "I've always wanted to visit ${city}. This meetup is the perfect excuse!",
//   "Can't wait to meet new people and share experiences.",
//   `Who else is excited for the ${event} at
//     ${place},
//   ?`,
//   "Finally getting the chance to meet everyone in person!",
//   "This meetup is going to be the highlight of my year!",
//   "Eagerly anticipating our time in ${city}. It's going to be great!",
//   `@${mentionUser}, are you attending the ${event}?`,
//   "I'm ready to make some amazing memories with all of you!",
//   `@${mentionUser},
//   , can't wait to hear your thoughts on ${event}.`,
//   "Looking forward to a great time at ${place}.",
//   "Let's make this meetup an event to remember!",
//   "I'm so excited to connect with fellow enthusiasts in ${city}.",
//   "Can't wait to dive into all the activities planned for us!",
//   `@${mentionUser}, let's explore
//     ${city},
//    together after the meetup!`,
//   "This meetup is going to be a fantastic opportunity for networking and fun.",
//   "I'm all set for an amazing time at ${place}.",
//   "Count me in for the adventures in ${city}!",
//   `@
//     ${mentionUser},
//   , looking forward to your presentation at the ${event}.`,
//   "I've heard so much about ${place}. Excited to see it myself!",
//   "Bringing my camera to capture the best moments of the meetup!",
//   "Ready for an unforgettable experience with all of you in ${city}.",
//   `@${mentionUser}, excited to meet you at the
//     ${event},
//   !`,
//   "I'm sure this meetup is going to be a blast!",
//   "Can't wait to exchange ideas and experiences with everyone.",
//   `Looking forward to the ${event} at
//     ${place},
//   . It sounds fantastic!`,
//   "Hoping to learn a lot and have fun at the same time!",
//   `@
//     ${mentionUser},
//   , let's get together at the meetup and discuss our project.`,
//   "So glad to be part of this vibrant community. See you all soon!",
//   "I'm ready to soak in the vibes of ${city}.",
//   `@
//     ${mentionUser},
//   , can't wait to catch up with you at ${place}.`,
//   "Eager to make new connections and strengthen existing ones!",
//   "This is going to be my first time at ${place}. Super excited!",
//   `Anyone else staying near
//     ${city},
//   ? Maybe we can explore together.`,
//   "Looking forward to a day full of learning and fun.",
//   `@
//     ${mentionUser},
//   , we should team up for the activities at ${place}.`,
//   "Can't wait to share this experience with all of you!",
//   "Excited to see what ${city} has in store for us.",
//   `@${mentionUser}, ready for our adventure in
//     ${city},
//   ?`,
//   "This meetup is going to be a great way to kick off the year!",
//   "Let's make the most of our time together at ${place}!",
//   `@${mentionUser}, are you joining the ${event}?`,
//   `@${mentionUser}, let's catch up at ${place} during the meetup.`,
//   `@${mentionUser}, looking forward to seeing you there!`,
//   `@${mentionUser}, can't wait to hear your thoughts on ${event}.`,
//   `@${mentionUser}, let's explore
//     ${city},
//    together after the meetup!`,
//   `@${mentionUser}, are you attending the ${event}?`,
//   `@${mentionUser}, let's get together at the meetup and discuss our project.`,
//   `@${mentionUser}, can't wait to catch up with you at ${place}.`,
// ];

export const userNames = [
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
