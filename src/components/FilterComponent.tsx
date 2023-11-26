/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Disclosure } from "@headlessui/react";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import styles from "./../styles/sparklyGradient.module.css";

interface FilterMeetupsListProps {
  onSearchChange: (searchTerm: string) => void;
}

export default function FilterComponent({
  onSearchChange,
}: FilterMeetupsListProps) {
  const handleInputChange = (e: { currentTarget: { value: string } }) => {
    onSearchChange(e.currentTarget.value);
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
            <div className="shadow- flex justify-center rounded-lg  py-8 text-darktext">
              <div className="flex w-2/3 flex-col items-center gap-1">
                <label
                  htmlFor="FilterSearch"
                  className="text-blue-950/6 text-xl lg:text-2xl"
                >
                  Input your query here
                </label>
                <input
                  type="text"
                  className="w-72 rounded-lg bg-blue-950/60 px-2 text-center text-white shadow-lg"
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
