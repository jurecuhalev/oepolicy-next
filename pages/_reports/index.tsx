import React, { FunctionComponent } from "react";
import Layout from "../../components/Layout";
import useSWR from "swr";
import fetcher from "../../utils/fetcher";
import ContentBlock from "../../components/ContentBlock";
import PoliciesWithoutPublisher from "../../components/reports/PoliciesWithoutProvide";

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

  return (
    <Layout title="Internal data reports" hero={<></>}>
      <div className="container content py-30">
        <h1 className="bold mb-6">
          Policies without Publisher or Publisher doesn't have location
        </h1>

        {data && <PoliciesWithoutPublisher items={data.member} />}
      </div>
    </Layout>
  );
};

export default ReportsPage;
