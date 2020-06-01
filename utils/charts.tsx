import { countBy, uniqBy } from "lodash";

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

export const dataSimple = (items: any[], field: string): any => {
  return countBy(
    items.flatMap((item) => {
      return item.about.spatialCoverage ? item.about.spatialCoverage : [];
    })
  );
};
