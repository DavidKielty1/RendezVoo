/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Disclosure } from "@headlessui/react";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import styles from "./../styles/sparklyGradient.module.css";

interface FilterMeetupsListProps {
  onSearchChange: (searchTerm: string) => void;
  onLocationChange: (location: string) => void;
}

export default function FilterComponent({
  onSearchChange,
  onLocationChange,
}: FilterMeetupsListProps) {
  const handleSearchInputChange = (e: { currentTarget: { value: string } }) => {
    onSearchChange(e.currentTarget.value);
  };

  const handleLocationInputChange = (e: {
    currentTarget: { value: string };
  }) => {
    onLocationChange(e.currentTarget.value);
  };

  return (
    <Disclosure>
      {({ open }) => (
        <>
          <div
            className={`${styles.myUniqueGradient} w-full rounded-lg shadow-lg`}
          >
            <Disclosure.Button className="flex w-full justify-center px-4 py-2 text-xl lg:px-10">
              Search Meetups
              <ChevronRightIcon
                className={`ml-0.5 mt-0.5 w-6 scale-125 ${
                  open ? "rotate-90 transform" : ""
                }`}
              />
            </Disclosure.Button>
          </div>
          <Disclosure.Panel className="text-gray-500">
            <div className="flex flex-col justify-center gap-4 rounded-lg py-8  text-xl xl:flex-row">
              <div className="flex flex-col items-center gap-1 pb-4 ">
                <input
                  placeholder="Filter by Search Term"
                  type="text"
                  spellCheck="false"
                  className="w-72 rounded-lg bg-blue-950/60 px-2 py-1 text-center text-white placeholder-white shadow-lg focus:placeholder-transparent"
                  onChange={handleSearchInputChange}
                />
              </div>
              <div className="flex flex-col items-center gap-1 pb-4">
                <input
                  placeholder="Sort by Location"
                  type="text"
                  spellCheck="false"
                  className="w-72 rounded-lg bg-blue-950/60 px-2 py-1 text-center text-white placeholder-white shadow-lg focus:placeholder-transparent"
                  onChange={handleLocationInputChange}
                />
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
