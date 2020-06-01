import React, { FunctionComponent } from "react";
import Layout from "../../components/Layout";
import useSWR from "swr";
import fetcher from "../../utils/fetcher";

import IntroPageMd, {
  frontMatter as introPage,
} from "../../docs/201-intro-explore.mdx";
import DataPageMd, { frontMatter as dataPage } from "../../docs/202-data.mdx";

import ContentBlock from "../../components/ContentBlock";
import dynamic from "next/dynamic";
import Hero from "../../components/Hero";
import LoaderPie from "../../components/LoaderPie";
// import MapDisplay from "../../components/MapDisplay";

const PieChartPoliciesByFocus = dynamic(
  // @ts-ignore
  import("../../components/PieChart-ByFocus"),
  {
    ssr: false,
  }
);

const BarChartPoliciesByFocus = dynamic(
  // @ts-ignore
  import("../../components/BarChart-ByFocus"),
  {
    ssr: false,
  }
);

const BarChartPoliciesByLevel = dynamic(
  // @ts-ignore
  import("../../components/BarChart-ByLevel"),
  {
    ssr: false,
  }
);

const MapDisplay = dynamic(
  // @ts-ignore
  import("../../components/MapDisplay"),
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
      <div className="bg-white">
        <div className="containter">
          {!data ? <LoaderPie /> : <MapDisplay items={data.member} />}
        </div>
      </div>
      <ContentBlock {...introPage}>
        <IntroPageMd />
      </ContentBlock>
      <div className="bg-gray">
        {!data ? (
          <LoaderPie />
        ) : (
          <BarChartPoliciesByLevel items={data.member} />
        )}
      </div>
      <div className="bg-gray">
        {!data ? (
          <LoaderPie />
        ) : (
          <PieChartPoliciesByFocus items={data.member} />
        )}
      </div>
      <ContentBlock {...dataPage}>
        <DataPageMd />
      </ContentBlock>
      <div className="bg-gray">
        {!data ? (
          <LoaderPie />
        ) : (
          <BarChartPoliciesByFocus items={data.member} />
        )}

        <div className="container content pb-10">
          <p>
            OER World Map currently tracks 198 policies. This is a short extract
            of a few ways to look at the data so that it can support you in
            creating your policy.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default ExplorePage;
