import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import MapGL from "react-map-gl";
import Pins from "./MapPin";

const countriesCoordinates = {
  DE: {
    latitude: 51.1657,
    longitude: 10.4515,
  },
  GB: {
    latitude: 51.5074,
    longitude: 0.1278,
  },
  IT: {
    latitude: 41.9028,
    longitude: 12.4964,
  },
  CA: {
    latitude: 45.4215,
    longitude: 75.6972,
  },
  US: {
    latitude: 47.6062,
    longitude: -122.3321,
  },
  CL: {
    latitude: 70.6693,
    longitude: 33.4489,
  },
  MT: {
    latitude: 35.9375,
    longitude: 14.3754,
  },
  LT: {
    latitude: 55.1694,
    longitude: 23.8813,
  },
  GR: {
    latitude: 39.0742,
    longitude: 21.8243,
  },
  EE: {
    latitude: 58.5953,
    longitude: 25.0136,
  },
  CZ: {
    latitude: 49.75,
    longitude: 15.5,
  },
  CY: {
    latitude: 35,
    longitude: 33,
  },
  HR: {
    latitude: 45.1667,
    longitude: 15.5,
  },
  ZA: { latitude: -29, longitude: 24 },
  BR: { latitude: -10, longitude: -55 },
  TZ: {
    latitude: -6,
    longitude: 35,
  },
  RO: {
    latitude: 46,
    longitude: 25,
  },
  PL: {
    latitude: 52,
    longitude: 20,
  },
  FJ: {
    latitude: -18,
    longitude: 175,
  },
  MA: {
    latitude: 32,
    longitude: -5,
  },
  IN: {
    latitude: 20,
    longitude: 77,
  },
  SK: {
    latitude: 48.6667,
    longitude: 19.5,
  },
  MX: {
    latitude: 23,
    longitude: -102,
  },
};

const manualMapping = {
  "urn:uuid:f81ee4cf-aa5c-4834-85fb-0c5e6a0cfc6d": {
    // Peru
    latitude: -10,
    longitude: -76,
  },
  "urn:uuid:adf5ac9d-0caa-4570-bb43-ea11aa17943f": {
    // Paris
    latitude: 48.8566,
    longitude: 2.3522,
  },
  "urn:uuid:738088ec-bdf4-4bab-9cb7-4477048b7b78.about": {
    // Cape Town
    latitude: 33.9249,
    longitude: 18.4241,
  },
};

const MapDisplay: FunctionComponent<{ items: any[] }> = ({ items }) => {
  const [state, setState] = useState({
    viewport: {
      width: "100%",
      height: "60vh",
      center: [0, 42],
      zoom: 1,
    },
  });
  const [pins, setPins] = useState([]);

  useEffect(() => {
    const pins = items
      .filter(
        (i) =>
          i?.feature?.geometry ||
          i?.feature?.properties?.location ||
          i?.about?.location
      )
      .map((i) => {
        const defaults = { id: i["@id"] };
        if (i?.feature?.geometry?.coordinates) {
          const [long, lat] = i.feature.geometry.coordinates;
          return {
            longitude: Array.isArray(long) ? long[0] : long,
            latitude: Array.isArray(lat) ? lat[0] : lat,
            ...defaults,
          };
        } else if (i.feature?.properties?.location) {
          if (i.feature.properties.location?.geo) {
            const { lat, lon } = i.feature.properties.location.geo;
            return {
              longitude: lon,
              latitude: lat,
              ...defaults,
            };
          }

          const country = i.feature.properties.location.address.addressCountry;
          return { ...countriesCoordinates[country], ...defaults };
        } else if (i.about?.location) {
          const country = i.about.location[0].address.addressCountry;
          return { ...countriesCoordinates[country], ...defaults };
        } else {
          return { ...manualMapping[i["@id"]], ...defaults };
        }
      });
    setPins(pins);
  }, [items]);

  return (
    <MapGL
      {...state.viewport}
      mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_KEY}
      renderWorldCopies={false}
      onViewportChange={(viewport) => setState({ viewport })}
    >
      <Pins
        data={pins}
        onClick={(id) => {
          window.open(
            `https://oerworldmap.org/resource/${id}`.replace(".about", "")
          );
          return false;
        }}
      />
    </MapGL>
  );
};

export default MapDisplay;
