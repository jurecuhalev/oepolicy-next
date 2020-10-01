import React, { FunctionComponent } from "react";
import Layout from "../components/Layout";
import ContentBlock from "../components/ContentBlock";

import ContributePageMd, {
  frontMatter as contributePage,
} from "../docs/601-contribute.mdx";
import PolicyPageMd, {
  frontMatter as policyPage,
} from "../docs/602-policy.mdx";
import CaseStudyPageMd, {
  frontMatter as caseStudyPage,
} from "../docs/603-casestudy.mdx";

import Hero from "../components/Hero";

const ImprintPage: FunctionComponent = () => (
  <Layout
    title="Who we are & What we do"
    hero={
      <Hero background="orange">
        <h1 className="text-4xl font-sans">
          Help us <b>grow the collective knowledge</b> on how to implement Open
          Education!
        </h1>
      </Hero>
    }
  >
    <ContentBlock {...contributePage}>
      <ContributePageMd />
    </ContentBlock>
    <ContentBlock {...policyPage}>
      <PolicyPageMd />
    </ContentBlock>
    <ContentBlock {...caseStudyPage}>
      <CaseStudyPageMd />
    </ContentBlock>
  </Layout>
);

export default ImprintPage;
