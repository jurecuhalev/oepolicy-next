import React, { FunctionComponent } from "react";

const ServicesWithoutLocation: FunctionComponent<{
  services: any[];
}> = ({ services }) => {
  const noLocation = services.filter((item) => {
    if (!item?.feature?.properties?.location) {
      return item;
    }
  });

  return (
    <>
      <h1 className="bold mb-6">Services without location or a Publisher</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {noLocation.map((item) => (
            <tr>
              <td>
                <a
                  href={`https://oerworldmap.org/resource/${encodeURIComponent(
                    item.about["@id"]
                  )}`}
                  target="_blank"
                >
                  {item.about.name?.en || item.about.name?.de}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ServicesWithoutLocation;
