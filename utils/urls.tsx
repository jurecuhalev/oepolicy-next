/* modified from https://github.com/hbz/oerworldmap-ui/blob/2516ed3c3396af92c9e9f07e931a7aa5c276276c/src/common.js#L51
 to support enforced quoting of query params, e.g.
 https://oerworldmap.org/resource/?filter.about.@type=%22Policy%22 vs.
 https://oerworldmap.org/resource/?filter.about.@type=Policy

 (Policy needs to be quoted, otherwise oerworldmap-ui won't parse querystring correctly)
 */

export const getURL = (route: { path: string; params: object }) => {
  let url = route.path;
  let params = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const param in route.params) {
    const value = route.params[param];
    if (Array.isArray(value)) {
      value &&
        (params = params.concat(
          value.map((value) => `${param}=["${encodeURIComponent(value)}"]`)
        ));
    } else {
      value && params.push(`${param}="${encodeURIComponent(value)}"`);
    }
  }
  if (params) {
    url += `?${params.join("&")}`;
  }
  return url;
};

export const buildFinalUrl = (
  filterName: string,
  label: string,
  urlMapping?: { name: string; id: string }
): string => {
  return getURL({
    path: process.env.NEXT_PUBLIC_RESOURCE_URL,
    params: {
      "filter.about.@type": "Policy",
      [filterName]: [urlMapping ? urlMapping[label] : label],
    },
  });
};
