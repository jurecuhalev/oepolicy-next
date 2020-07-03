import React, { FunctionComponent } from "react";

const PoliciesWithoutPublisher: FunctionComponent<{
  items: any[];
}> = ({ items }) => {
  const noPublisher = items.filter((item) => {
    if (!item.about?.publisher) {
      return item;
    }

    if (item.about?.publisher && !item.about.publisher[0].location) {
      return item;
    }
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        {noPublisher.map((item) => (
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
  );
};

export default PoliciesWithoutPublisher;
