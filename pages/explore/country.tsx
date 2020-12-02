import React, { FunctionComponent } from "react";
import Layout from "../../components/Layout";
import useSWR from "swr";
import fetcher from "../../utils/fetcher";
import { useRouter } from "next/router";
import countries from "../../json/iso3166-1-alpha-2.json";

import IntroPageMd, {
  frontMatter as introPage,
} from "../../docs/201-intro-explore.mdx";
import TypePageMd, { frontMatter as typePage } from "../../docs/203-type.mdx";
import PoliciesPageMd, {
  frontMatter as policiesPage,
} from "../../docs/204-policies.mdx";
import ScopePageMd, {
  frontMatter as scopePage,
} from "../../docs/205-scope.mdx";
import LevelPageMd, {
  frontMatter as levelPage,
} from "../../docs/206-level.mdx";
import SectorPageMd, {
  frontMatter as sectorPage,
} from "../../docs/207-sector.mdx";
import FocusPageMd, {
  frontMatter as focusPage,
} from "../../docs/208-focus.mdx";

import ContentBlock from "../../components/ContentBlock";
import dynamic from "next/dynamic";
import Hero from "../../components/Hero";
import LoaderPie from "../../components/LoaderPie";
import ListingPoliciesByType from "../../components/ListingPoliciesRepositories";

const PieChartPoliciesByFocus = dynamic(
  // @ts-ignore
  import("../../components/PieChart-ByFocus"),
  {
    ssr: false,
  }
);

const PieChartPoliciesByType = dynamic(
  // @ts-ignore
  import("../../components/PieChart-ByType"),
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

const BarChartPoliciesBySector = dynamic(
  // @ts-ignore
  import("../../components/BarChart-BySector"),
  {
    ssr: false,
  }
);

const BarChartPoliciesByScope = dynamic(
  // @ts-ignore
  import("../../components/BarChart-ByScope"),
  {
    ssr: false,
  }
);

const ExplorePage: FunctionComponent = () => {
  const router = useRouter();
  const countryCode = router.query["code"]?.toString()?.toUpperCase();
  const countryName = countries[countryCode];

  const url = `https://oerworldmap.org/resource.json?q=about.@type:Policy&sort=dateCreated:DESC&size=500&filter.feature.properties.location.address.addressCountry=%5B"${countryCode}"%5D`;
  const servicesUrl = `https://oerworldmap.org/resource.json?field=feature.properties.location.address.addressRegion&filter.about.@type=%22Service%22&filter.about.additionalType.@id=%5B%22https%3A%2F%2Foerworldmap.org%2Fassets%2Fjson%2Fservices.json%23referatory%22%2C%22https%3A%2F%2Foerworldmap.org%2Fassets%2Fjson%2Fservices.json%23repository%22%5D&sort=dateCreated:DESC&size=500&filter.feature.properties.location.address.addressCountry=%5B"${countryCode}"%5D`;

  const { data } = useSWR(url, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const { data: services } = useSWR(servicesUrl, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return (
    <Layout
      title="Explore OE Policies"
      hero={
        <Hero background="orange">
          <h1 className="text-4xl font-sans">
            Explore our collection of <br className="hidden md:block" />
            <b>
              Open Education Policies in <br />
              {countryName}
            </b>
          </h1>
        </Hero>
      }
    >
      <ContentBlock {...introPage}>
        <IntroPageMd />
      </ContentBlock>

      <div className="bg-gray">
        {!data ? <LoaderPie /> : <PieChartPoliciesByType items={data.member} />}
      </div>
      <ContentBlock noTopPadding={true} {...typePage}>
        <TypePageMd />
      </ContentBlock>

      <div className="bg-white">
        {data && services && (
          <ListingPoliciesByType
            items={data.member}
            services={services.member}
            byRegion={true}
            filterCountry={countryCode}
          />
        )}
      </div>
      <ContentBlock noTopPadding={true} {...policiesPage}>
        <PoliciesPageMd />
      </ContentBlock>

      <div className="bg-gray">
        {!data ? (
          <LoaderPie />
        ) : (
          <BarChartPoliciesByLevel items={data.member} />
        )}
      </div>
      <ContentBlock noTopPadding={true} {...levelPage}>
        <LevelPageMd />
      </ContentBlock>

      <div className="bg-white">
        {!data ? (
          <LoaderPie />
        ) : (
          <BarChartPoliciesByScope items={data.member} />
        )}
      </div>
      <ContentBlock noTopPadding={true} {...scopePage}>
        <ScopePageMd />
      </ContentBlock>

      <div className="bg-gray">
        {!data ? (
          <LoaderPie />
        ) : (
          <BarChartPoliciesBySector items={data.member} />
        )}
      </div>
      <ContentBlock noTopPadding={true} {...sectorPage}>
        <SectorPageMd />
      </ContentBlock>

      <div className="bg-white">
        {!data ? (
          <LoaderPie />
        ) : (
          <PieChartPoliciesByFocus items={data.member} />
        )}
      </div>
      <ContentBlock noTopPadding={true} {...focusPage}>
        <FocusPageMd />
      </ContentBlock>
    </Layout>
  );
};

export default ExplorePage;
