import React, { FunctionComponent } from "react";

const PoliciesWithoutAttribute: FunctionComponent<{
  title: string;
  items: any[];
  lookupAttr: (item: any[]) => any;
}> = ({ title, items, lookupAttr }) => {
  const noAttr = items.filter(lookupAttr);

  return (
    <>
      <h1 className="bold mb-6">{title}</h1>

      <table>
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {noAttr.map((item) => (
            <tr key={item.about["@id"]}>
              <td className="pb-2">
                <a
                  href={`https://oerworldmap.org/resource/${encodeURIComponent(
                    item.about["@id"]
                  )}`}
                  target="_blank"
                  className="hover:text-pink"
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

export default PoliciesWithoutAttribute;
