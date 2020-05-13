import Head from "next/head";
import React, { FunctionComponent } from "react";
import Layout from "../components/Layout";
import ContentBlock from "../components/ContentBlock";

import ContentMd, { meta } from "../docs/01-01-about.mdx";

const HomePage: FunctionComponent = () => (
  <Layout title="Home">
    <div className="container">
      <ContentBlock
        title={meta.title}
        subtitle={meta.subtitle}
        background="white"
      >
        <ContentMd />
      </ContentBlock>
    </div>
  </Layout>
);

export default HomePage;
