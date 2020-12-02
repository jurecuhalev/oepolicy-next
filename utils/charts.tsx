import { countBy, uniqBy, uniq, invert } from "lodash";
import countries from "../json/iso3166-1-alpha-2.json";
import regions from "../json/iso3166-2.json";

export const urlMapping = (items: any[], field: string): any => {
  return uniqBy(
    items.flatMap((item) => {
      if (item.about[field]) {
        const arr = item.about[field];
        return arr.map((i) => {
          return { name: i.name.en, id: i["@id"] };
        });
      }

      return [];
    }),
    "id"
  ).reduce((a, x) => ({ ...a, [x.name]: x.id }), {});
};

export const dataWithMapping = (items: any[], field: string): any => {
  return countBy(
    items.flatMap((item) => {
      if (item.about[field]) {
        const arr = item.about[field];
        return arr.map((i) => i.name.en);
      }
      return [];
    })
  );
};

export const dataSimple = (
  items: any[],
  field: string
): { [key: string]: number } => {
  return countBy(
    items.flatMap((item) => {
      return `item.about.${field}` ? item.about[field] : [];
    })
  );
};

export const getCountryFromItem = (item: any): any => {
  if (item.feature?.properties?.location?.length) {
    return uniq(
      item.feature.properties.location.map(
        (loc) => countries[loc.address.addressCountry]
      )
    );
  }
  if (item?.feature?.properties?.location?.address?.addressCountry) {
    return countries[item.feature.properties.location.address.addressCountry];
  } else if (item.about?.location) {
    return uniq(
      item.about.location
        .map((loc) => countries[loc.address.addressCountry])
        .filter((country) => country !== undefined)
    );
  }
};

export const getRegionFromItem = (item: any, filterCountry: string): any => {
  if (item.feature?.properties?.location?.length) {
    const locations = item.feature.properties.location;
    return uniq(
      locations
        .filter((loc) => loc.address.addressCountry === filterCountry)
        .map((loc) => regions[loc.address.addressRegion])
    );
  }
  if (
    item?.feature?.properties?.location?.address?.addressRegion &&
    item?.feature?.properties?.location?.address?.addressCountry ===
      filterCountry
  ) {
    return regions[item.feature.properties.location.address.addressRegion];
  } else if (item.about?.location) {
    const locations = item.about.location;
    return uniq(
      locations
        .filter((loc) => loc.address.addressCountry === filterCountry)
        .map((loc) => regions[loc.address.addressRegion])
    );
  }
};

const invertedCountries = invert(countries);
export const getCountryCodeFromCountry = (key: string): any => {
  return invertedCountries[key];
};

const invertedRegions = invert(regions);
export const getRegionCodeFromRegion = (key: string): any => {
  return invertedRegions[key];
};
