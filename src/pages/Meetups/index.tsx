import { MeetupsList } from "~/components/MeetupsList";
import ClusterMap from "~/components/ClusterMap";
import Head from "next/head";
import FilterComponent from "~/components/FilterComponent";
import { useState } from "react";
import FilteredMeetupsList from "~/components/FilteredMeetupsList";

const HomePage: React.FC = () => {
  const [searchInput, setSearchInput] = useState("");

  const handleSearchChange = (newSearchInput: string) => {
    setSearchInput(newSearchInput);
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
        <FilterComponent onSearchChange={handleSearchChange} />
        {searchInput && <FilteredMeetupsList searchInput={searchInput} />}
        {searchInput.length < 1 && <MeetupsList />}
      </div>
    </>
  );
};

export default HomePage;
