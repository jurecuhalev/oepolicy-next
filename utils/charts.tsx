import { countBy, uniqBy, uniq } from "lodash";
import countries from "../json/iso3166-1-alpha-2.json";

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
