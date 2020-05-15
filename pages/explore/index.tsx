import React, { FunctionComponent } from "react";
import Layout from "../../components/Layout";
import useSWR from "swr";
import fetcher from "../../utils/fetcher";

import IntroPageMd, {
  frontMatter as introPage,
} from "../../docs/201-intro-explore.mdx";
import ContentBlock from "../../components/ContentBlock";
import dynamic from "next/dynamic";

const PieChartPoliciesByFocus = dynamic(
  // @ts-ignore
  import("../../components/PieChart-ByFocus"),
  {
    ssr: false,
  }
);

const ExplorePage: FunctionComponent = () => {
  const url =
    "https://oerworldmap.org/resource.json?q=about.@type:Policy&sort=dateCreated:DESC&size=500";

  const { data, error, isValidating, mutate } = useSWR(url, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return (
    <Layout title="Explore OE Policies">
      <ContentBlock {...introPage}>
        <IntroPageMd />
      </ContentBlock>
      {!data ? (
        <p>Loading data ...</p>
      ) : (
        <PieChartPoliciesByFocus items={data.member} />
      )}
    </Layout>
  );
};

export default ExplorePage;
