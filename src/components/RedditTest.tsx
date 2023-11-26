/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* Requirements:
1) When you select the first checkbox having label 'Select All', all the checkbox should get checked and when you uncheck 'Select All', each of the checkbox should be unchecked.
2) If all checkbox is checked and you uncheck any checkbox having label of any country name, Checkbox for Select All should also be unchecked.
3) On checking all the countries, Select All checkbox should be checked automatically. 
*/

import { useState } from "react";
import { countriesList } from "./RedditCountries";

interface Country {
  id: number;
  countryName: string;
  checked: boolean;
}

function RedditTest() {
  const [countries, setCountries] = useState<Country[]>(countriesList);
  const [selectAll, setSelectAll] = useState(false);

  const handleCountryChange = (id: number) => {
    const newCountries = countries.map((country) => {
      if (country.id === id) {
        return { ...country, checked: !country.checked };
      }
      return country;
    });

    setCountries(newCountries);
    setSelectAll(newCountries.every((country) => country.checked));
  };

  const handleSelectAllChange = () => {
    const newCheckState = !selectAll;
    setSelectAll(newCheckState);
    setCountries(
      countries.map((country) => ({ ...country, checked: newCheckState }))
    );
  };

  return (
    <div className="h-screen">
      <div className=" my-60 bg-slate-200 px-10 text-2xl first:py-10">
        <h1 className="py-2 font-bold">Here are a list of countries</h1>{" "}
        <div className="flex flex-row">
          <input
            type="checkbox"
            id="checkAll"
            name="checkAll"
            onChange={handleSelectAllChange}
            checked={selectAll}
          ></input>
          <label className="px-2">Check All</label>
        </div>
        <div className="flex flex-col ">
          {countries.map((country) => (
            <div key={country.id} className="flex flex-row">
              <input
                type="checkbox"
                id={country.countryName}
                name={country.countryName}
                onChange={() => handleCountryChange(country.id)}
                checked={country.checked}
              ></input>
              <label className="px-2">{country.countryName}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RedditTest;
