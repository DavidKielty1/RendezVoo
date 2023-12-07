/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { useState } from "react";
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
  const [isOpen, setIsOpen] = useState(false);

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation(); // Prevents the event from bubbling up to the Disclosure
    onSearchChange(e.currentTarget.value);
  };

  const handleLocationInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    e.stopPropagation(); // Prevents the event from bubbling up to the Disclosure
    onLocationChange(e.currentTarget.value);
  };

  return (
    <Disclosure as="div" open={isOpen} onChange={setIsOpen}>
      {({ open }) => (
        <>
          <div
            className={`rounded-lg shadow-lg xl:hover:shadow-glow ${styles.myUniqueGradient}`}
          >
            <Disclosure.Button
              as="div"
              className="align-center flex w-full flex-col items-center justify-center self-center px-4 py-2 text-xl lg:px-10"
            >
              <div className="fel-row flex" onClick={() => setIsOpen(!open)}>
                Search Meetups
                <ChevronRightIcon
                  className={`ml-0.5 mt-0.5 w-6 scale-125 ${
                    open ? "rotate-90 transform" : ""
                  }`}
                />
              </div>
              <Disclosure.Panel as="div" className={`text-gray-500`}>
                <div className="flex flex-col justify-center gap-4 rounded-lg py-8  text-xl xl:flex-row">
                  <div className="flex flex-col items-center gap-1 pb-4 ">
                    <input
                      className="w-72 rounded-lg bg-blue-950/60 px-2 py-1 text-center text-white placeholder-white shadow-lg focus:placeholder-transparent"
                      placeholder="Filter by Search Term"
                      type="text"
                      spellCheck="false"
                      onClick={(e) => e.stopPropagation()}
                      onChange={handleSearchInputChange}
                    />
                  </div>
                  <div className="flex flex-col items-center gap-1 pb-4">
                    <input
                      className="w-72 rounded-lg bg-blue-950/60 px-2 py-1 text-center text-white placeholder-white shadow-lg focus:placeholder-transparent"
                      placeholder="Sort by Location"
                      type="text"
                      spellCheck="false"
                      onClick={(e) => e.stopPropagation()}
                      onChange={handleLocationInputChange}
                    />
                  </div>
                </div>
              </Disclosure.Panel>
            </Disclosure.Button>
          </div>
        </>
      )}
    </Disclosure>
  );
}
