//
//
//Deprecated. This component is not currently being utilized.
//
//

import Image from "next/image";

type DummyMeetup = {
  id: string;
  title: string;
  description: string;
  location: string;
  time: string;
  image: string;
};

const DummyMeetups: DummyMeetup[] = [
  {
    id: "d1",
    title: "Instalbul Getaway",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ducimus velit quasi at corporis rem, eaque, fugit pariatur vitae eos nam consequuntur odit reprehenderit adipisci ipsa voluptates quam error consectetur repellat.",
    location: "Instanbul, Turkey",
    time: "2023, 10, 24",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/4/4a/Hagia_Sophia_%28228968325%29.jpeg?w=200",
  },
  {
    id: "d2",
    title: "Visit Dentist",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ducimus velit quasi at corporis rem, eaque, fugit pariatur vitae eos nam consequuntur odit reprehenderit adipisci ipsa voluptates quam error consectetur repellat.",
    location: "Wellington Spa Dentist",
    time: "2023, 08, 29",
    image:
      "https://cdn.logojoy.com/wp-content/uploads/2018/07/30131804/dental7.png?w=200",
  },
  {
    id: "d3",
    title: "Walk the Dog",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ducimus velit quasi at corporis rem, eaque, fugit pariatur vitae eos nam consequuntur odit reprehenderit adipisci ipsa voluptates quam error consectetur repellat.",
    location: "Kelvingrove Park",
    time: "2023, 08, 24",
    image:
      "https://dynamic.brandcrowd.com/asset/logo/00f66e87-afe8-4d22-8936-4574d821fa82/logo-search-grid-1x?logoTemplateVersion=1&v=638085060708430000?w=200",
  },
];

export const DummyData = () => {
  const myLoader = ({ src }: { src: string; width: number }) => {
    return `${src}?w=${200}`;
  };

  return (
    <ul className="flex w-full flex-col">
      {DummyMeetups?.map((dummymeetup) => (
        <li key={dummymeetup.id} title={dummymeetup.title} className="mb-7 ">
          <section className="card mb-7 border border-slate-200 bg-base-100 p-0 shadow-2xl lg:h-[250px]">
              <article className="flex flex-col justify-center lg:flex-row ">
                <div className="relative h-[249px] overflow-hidden rounded-tl-md rounded-tr-md opacity-80 lg:w-5/12 lg:rounded-bl-md lg:rounded-tr-none xl:w-4/12 ">
                  <Image
                    loader={myLoader}
                    src={dummymeetup.image}
                    alt="Picture of the author"
                    fill
                    sizes="(max-width: 400px)"
                    priority
                  />
                </div>
                <div className="flex flex-col justify-between lg:w-7/12 xl:w-8/12">
                  <section className="flex flex-col">
                    <div className="flex justify-center">
                      <p className="text-md line-clamp-1 w-full bg-slate-100 py-1 text-center font-sans font-bold capitalize text-slate-600 lg:rounded-t-md lg:rounded-tl-none lg:py-3 lg:text-xl">
                        {dummymeetup.title}
                      </p>
                    </div>
                    <div className="mx-2 mt-2 flex max-w-full flex-col justify-between">
                      <div className="flex w-full flex-col text-center lg:flex-row">
                        {/* <p className="text-md mt-2 w-full font-bold text-yellow-500 sm:mr-1 sm:mt-0 sm:w-2/12 lg:text-right">
                            What?
                          </p> */}
                        <p className="text-bottom text-md line-clamp-6 w-full lg:mx-3 lg:line-clamp-3 lg:text-left lg:text-lg ">
                          {dummymeetup.description}
                        </p>
                      </div>
                      <div className="mt-2 flex w-full flex-col text-center sm:flex-row ">
                        {/* <p className="text-md mt-2 w-full font-bold text-yellow-500 sm:mr-1 sm:mt-0 sm:w-2/12 lg:text-right">
                            Where?
                          </p> */}
                        <p className="text-md line-clamp-1  max-h-5  w-full overflow-hidden lg:mx-3 lg:text-left  lg:text-lg">
                          {dummymeetup.location}
                        </p>
                      </div>
                      <div className="mt-2 flex w-full flex-col text-center sm:flex-row ">
                        {/* <p className="text-md mt-2 w-full font-bold text-yellow-500 sm:mr-1 sm:mt-0 sm:w-2/12 lg:text-right">
                            When?
                          </p> */}
                        <p className="text-md mt-2 w-full sm:mt-0 lg:mx-3 lg:text-left  lg:text-lg">
                          {dummymeetup.time}
                        </p>
                      </div>
                    </div>
                  </section>
                </div>
              </article>
          </section>
        </li>
      ))}
    </ul>
  );
};
