import Head from "next/head";
import React, { FunctionComponent } from "react";
import Layout from "../components/Layout";
import ContentBlock from "../components/ContentBlock";

import IntroPageMd, { frontMatter as introPage } from "../docs/101-intro.mdx";
import RegistryPageMd, {
  frontMatter as registryPage,
} from "../docs/102-registry.mdx";
import ExplorePageMd, {
  frontMatter as explorePage,
} from "../docs/103-explore.mdx";
import PartnersPageMd, {
  frontMatter as partnersPage,
} from "../docs/104-partners.mdx";
import SharePageMd, { frontMatter as sharePage } from "../docs/105-share.mdx";
import GraphicOrange from "../components/GraphicOrange";

const HomePage: FunctionComponent = () => (
  <Layout title="Home">
    <ContentBlock {...introPage}>
      <IntroPageMd />
    </ContentBlock>
    <GraphicOrange />
    <ContentBlock {...registryPage}>
      <RegistryPageMd />
    </ContentBlock>
    <ContentBlock {...explorePage}>
      <ExplorePageMd />
    </ContentBlock>
    <ContentBlock {...partnersPage}>
      <PartnersPageMd />
    </ContentBlock>
    <ContentBlock {...sharePage}>
      <SharePageMd />
    </ContentBlock>
  </Layout>
);

export default HomePage;
