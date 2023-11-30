import { MeetupsList } from "~/components/MeetupsList";
import ClusterMap from "~/components/ClusterMap";
import Head from "next/head";
import FilterComponent from "~/components/FilterComponent";
import { useState } from "react";
import SortMeetups from "~/utils/SortMeetups";

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
    { searchInput },
    {
      onSuccess: (data: Meetup[]) => {
        setFilteredMeetups(data ?? filteredData);
        setMeetups(data ?? filteredMeetups);
      },
    },
  );

  const handleSearchChange = (newSearchInput: string) => {
    setSearchInput(newSearchInput);
  };
  const handleLocationChange = (newLocationInput: string) => {
    setLocationInput(newLocationInput);
  };
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };
  const handleSortedMeetupsHandler = (newMeetups: Meetup[]) => {
    setMeetups(newMeetups);
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
        <SortMeetups
          sortedMeetups={handleSortedMeetupsHandler}
          locationInput={locationInput}
        />
      </div>
    </>
  );
};

export default HomePage;
