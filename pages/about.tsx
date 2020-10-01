import React, { FunctionComponent } from "react";
import Layout from "../components/Layout";
import ContentBlock from "../components/ContentBlock";

import AboutPageMd, { frontMatter as aboutPage } from "../docs/501-about.mdx";
import TeamPageMd, { frontMatter as teamPage } from "../docs/502-team.mdx";
import Hero from "../components/Hero";

const ImprintPage: FunctionComponent = () => (
  <Layout
    title="Who we are & What we do"
    hero={
      <Hero background="orange">
        <h1 className="text-4xl font-sans">
          <b>What</b> we do &amp; <b>Who</b> we are
        </h1>
      </Hero>
    }
  >
    <ContentBlock {...aboutPage}>
      <AboutPageMd />
    </ContentBlock>
    <ContentBlock {...teamPage}>
      <TeamPageMd />
    </ContentBlock>
  </Layout>
);

export default ImprintPage;
