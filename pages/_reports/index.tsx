import React, { FunctionComponent } from "react";
import Layout from "../../components/Layout";
import useSWR from "swr";
import fetcher from "../../utils/fetcher";
import ServicesWithoutLocation from "../../components/reports/ServicesWithoutLocation";
import PoliciesWithoutAttribute from "../../components/reports/PoliciesWithoutAttribute";

const ReportsPage: FunctionComponent = () => {
  const url =
    "https://oerworldmap.org/resource.json?q=about.@type:Policy&sort=dateCreated:DESC&size=500";

  const servicesUrl =
    "https://oerworldmap.org/resource.json?field=feature.properties.location.address.addressRegion&filter.about.@type=%22Service%22&filter.about.additionalType.@id=%5B%22https%3A%2F%2Foerworldmap.org%2Fassets%2Fjson%2Fservices.json%23referatory%22%2C%22https%3A%2F%2Foerworldmap.org%2Fassets%2Fjson%2Fservices.json%23repository%22%5D&sort=dateCreated:DESC&size=500";

  const { data } = useSWR(url, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const { data: services } = useSWR(servicesUrl, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const policiesWithoutPublisher = (item) => {
    if (!item.about?.publisher) {
      return item;
    }

    if (item.about?.publisher && !item.about.publisher[0].location) {
      return item;
    }
  };

  const policiesWithoutLevel = (item) => {
    if (!item.about?.spatialCoverage) {
      return item;
    }
  };

  const policiesWithoutScope = (item) => {
    if (!item.about?.scope) {
      return item;
    }
  };

  const policiesWithoutEduSector = (item) => {
    if (!item?.about?.primarySector) {
      return item;
    }
  };

  const policiesWithoutFocus = (item) => {
    if (!item?.about?.focus) {
      return item;
    }
  };

  return (
    <Layout title="Internal data reports" hero={<></>}>
      <div className="container content py-30">
        {data && (
          <PoliciesWithoutAttribute
            title="Policies without Publisher or Publisher doesn't have location"
            items={data.member}
            lookupAttr={policiesWithoutPublisher}
          />
        )}
      </div>

      <div className="bg-gray">
        <div className="container content py-30">
          {services && <ServicesWithoutLocation services={services.member} />}
        </div>
      </div>

      <div className="container content py-30">
        {data && (
          <PoliciesWithoutAttribute
            title="Policies without defined Level"
            items={data.member}
            lookupAttr={policiesWithoutLevel}
          />
        )}
      </div>

      <div className="bg-gray">
        <div className="container content py-30">
          {data && (
            <PoliciesWithoutAttribute
              title="Policies without defined Scope"
              items={data.member}
              lookupAttr={policiesWithoutScope}
            />
          )}
        </div>
      </div>

      <div className="container content py-30">
        {data && (
          <PoliciesWithoutAttribute
            title="Policies without defined Educational Sector"
            items={data.member}
            lookupAttr={policiesWithoutEduSector}
          />
        )}
      </div>

      <div className="bg-gray">
        <div className="container content py-30">
          {data && (
            <PoliciesWithoutAttribute
              title="Policies without defined Focus / Policy Dimension"
              items={data.member}
              lookupAttr={policiesWithoutFocus}
            />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ReportsPage;
