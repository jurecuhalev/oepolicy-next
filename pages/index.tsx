import Head from "next/head";
import React, { FunctionComponent } from "react";
import Layout from "../components/Layout";
import ContentBlock from "../components/ContentBlock";

// @ts-ignore
import IntroPageMd, { frontMatter as introPage } from "../docs/101-intro.mdx";

const HomePage: FunctionComponent = () => (
  <Layout title="Home">
    <ContentBlock {...introPage}>
      <IntroPageMd />
    </ContentBlock>
  </Layout>
);

export default HomePage;
