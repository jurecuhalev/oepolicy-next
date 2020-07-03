import React, { FunctionComponent, useEffect, useState } from "react";
import { countBy, toPairs, mergeWith, orderBy, fromPairs, map } from "lodash";
import { getCountryCodeFromCountry, getCountryFromItem } from "../utils/charts";
import Dropdown from "react-dropdown-now";

const policiesLink = (country: string): string => {
  const code = getCountryCodeFromCountry(country);
  return `https://oerworldmap.org/resource/?filter.about.%40type=%22Policy%22&filter.feature.properties.location.address.addressCountry=%5B%22${code}%22%5D`;
};

const servicesLink = (country: string): string => {
  const code = getCountryCodeFromCountry(country);
  return `https://oerworldmap.org/resource/?filter.about.%40type=%22Service%22&filter.about.additionalType.%40id=%5B%22https%3A%2F%2Foerworldmap.org%2Fassets%2Fjson%2Fservices.json%23referatory%22%2C%22https%3A%2F%2Foerworldmap.org%2Fassets%2Fjson%2Fservices.json%23repository%22%5D&filter.feature.properties.location.address.addressCountry=%5B%22${code}%22%5D`;
};

const ListingPoliciesByType: FunctionComponent<{
  items: any[];
  services: any[];
}> = ({ items, services }) => {
  const dropdownOptions = ["Country", "Policies", "Repositories"];

  const servicesData = countBy(
    services.flatMap((item) => {
      return getCountryFromItem(item);
    })
  );
  delete servicesData.undefined;

  const data = countBy(
    items.flatMap((item) => {
      return getCountryFromItem(item);
    })
  );
  delete data.undefined;

  // Quick and dirty debug to make it easier to figure out the difference from OER World Map
  // items.forEach((item) => {
  //   let country = getCountryFromItem(item);
  //   if (country == "Fiji") {
  //     console.log(item);
  //   }
  // });

  let list1 = fromPairs(
    toPairs(data).map((i) => {
      return [i[0], { policies: i[1] }];
    })
  );
  let list2 = fromPairs(
    toPairs(servicesData).map((i) => {
      return [i[0], { services: i[1] }];
    })
  );
  const mergedData = mergeWith(list1, list2);

  const [sortedData, setSortedData] = useState();
  const [dropdownValue, setDropdownValue] = useState(dropdownOptions[0]);

  useEffect(() => {
    let internalSorted;
    if (dropdownValue === "Policies") {
      internalSorted = orderBy(
        toPairs(mergedData),
        [
          ([name, { policies, services }]) => policies || 0,
          ([name, { policies, services }]) => services || 0,
          ([name, { policies, services }]) => name,
        ],
        ["desc", "desc", "asc"]
      );
    } else if (dropdownValue === "Repositories") {
      internalSorted = orderBy(
        toPairs(mergedData),
        [
          ([name, { policies, services }]) => services || 0,
          ([name, { policies, services }]) => policies || 0,
          ([name, { policies, services }]) => name,
        ],
        ["desc", "desc", "asc"]
      );
    } else {
      internalSorted = orderBy(
        toPairs(mergedData),
        [
          ([name, { policies, services }]) => name,
          ([name, { policies, services }]) => policies || 0,
          ([name, { policies, services }]) => services || 0,
        ],
        ["asc", "desc", "desc"]
      );
    }
    setSortedData(internalSorted);
  }, [dropdownValue]);

  return (
    <div className="pt-30 container content">
      <h1 className="h2 mb-15">
        OE Policies and Repositories by countries/regions
      </h1>
      <div className="flex md:justify-between flex-col md:flex-row">
        <div className="text-lg left mb-6 leading-none">
          <span className="inline-block w-6 h-6 bg-blue mr-3 -mb-1" />
          <span className="mr-8">Number of OE policies</span>
          <br />
          <span className="inline-block w-6 h-6 bg-orange mr-3 -mb-1" />
          Number of repositories, referatories and related services
        </div>
        <div className="flex md:block mb-4">
          <Dropdown
            className="inline-block text-base leading-tight md:float-right order-2"
            options={dropdownOptions}
            value={dropdownValue}
            onChange={(val) => {
              setDropdownValue(val.value);
            }}
          />
          <span className="text-lg mr-2 md:float-right order-1">Sort by</span>
        </div>
      </div>

      <ul className="sortable-stats">
        {sortedData &&
          map(sortedData, ([name, { policies, services }]) => (
            <StatsItem
              key={name}
              name={name}
              policies={policies}
              services={services}
            ></StatsItem>
          ))}
      </ul>
    </div>
  );
};

const StatsItem: FunctionComponent<{
  name: string;
  policies?: number;
  services?: number;
}> = ({ name, policies, services }) => (
  <li className="flex-inline items-center">
    <div className="flex">
      {policies ? (
        <a
          href={policiesLink(name)}
          className="sortable-stats__number bg-blue"
          target="_blank"
          rel="noopener"
        >
          {policies}
        </a>
      ) : (
        <span className="sortable-stats__number" />
      )}
      {services ? (
        <a
          href={servicesLink(name)}
          className="sortable-stats__number bg-orange"
          target="_blank"
          rel="noopener"
        >
          {services}
        </a>
      ) : (
        <span className="sortable-stats__number" />
      )}
      <span className="ml-4">{name}</span>
    </div>
  </li>
);

export default ListingPoliciesByType;
