import { MeetupsList } from "~/components/MeetupsList";
import ClusterMap from "~/components/ClusterMap";
import Head from "next/head";
import FilterComponent from "~/components/FilterComponent";
import { useEffect, useState } from "react";
import sortMeetupsByLocation from "~/utils/SortMeetupsByLocation";

import { api } from "../../utils/api";
import { type Meetup } from "~/utils/types";

const HomePage: React.FC = () => {
  const [meetups, setMeetups] = useState<Meetup[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [locationInput, setLocationInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data: fetchedMeetups } = api.meetup.getAll.useQuery(
    { page: currentPage },
    {
      onSuccess: (data: Meetup[]) => {
        setMeetups(data ?? fetchedMeetups);
      },
    },
  );

  const [filteredMeetups, setFilteredMeetups] = useState<Meetup[]>(meetups);
  const { data: filteredData } = api.meetup.searchFilter.useQuery(
    { searchInput, page: currentPage },
    {
      onSuccess: (data: Meetup[]) => {
        setFilteredMeetups(data ?? filteredData);
        setMeetups(data ?? filteredMeetups);
      },
    },
  );

  useEffect(() => {
    if (locationInput) {
      void sortMeetupsByLocation(locationInput, meetups, (sortedMeetups) => {
        setMeetups(sortedMeetups);
      });
    }
  }, [locationInput, meetups]);

  const handleSearchChange = (newSearchInput: string) => {
    setSearchInput(newSearchInput);
  };
  const handleLocationChange = (newLocationInput: string) => {
    setLocationInput(newLocationInput);
  };
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <Head>
        <title>David Kielty Meetups</title>
        <meta name="description" content="" />
        <link rel="icon" href="..//favicon.ico" />
      </Head>
      <div className="flex flex-col gap-4">
        <div className="mb-8 h-[500px] w-full shadow-lg" id="map">
          <ClusterMap />
        </div>
        <FilterComponent
          onSearchChange={handleSearchChange}
          onLocationChange={handleLocationChange}
        />
        <MeetupsList meetups={meetups} onPageChange={handlePageChange} />
      </div>
    </>
  );
};

export default HomePage;
