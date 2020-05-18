import React, { FunctionComponent } from "react";
import Layout from "../../components/Layout";
import useSWR from "swr";
import fetcher from "../../utils/fetcher";

import IntroPageMd, {
  frontMatter as introPage,
} from "../../docs/201-intro-explore.mdx";
import ContentBlock from "../../components/ContentBlock";
import dynamic from "next/dynamic";
import Hero from "../../components/Hero";
import LoaderPie from "../../components/LoaderPie";

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
    <Layout
      title="Explore OE Policies"
      hero={
        <Hero background="orange">
          <h1 className="text-5xl font-sans">
            Explore our collection of <br className="hidden md:block" />
            <b>Open Education Policies</b>
          </h1>
        </Hero>
      }
    >
      <ContentBlock {...introPage}>
        <IntroPageMd />
      </ContentBlock>
      <div className="bg-gray">
        {!data ? (
          <LoaderPie />
        ) : (
          <PieChartPoliciesByFocus items={data.member} />
        )}
      </div>
    </Layout>
  );
};

export default ExplorePage;
