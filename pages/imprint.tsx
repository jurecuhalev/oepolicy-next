import React, { FunctionComponent } from "react";
import Layout from "../components/Layout";
import ContentBlock from "../components/ContentBlock";

import ImprintPageMd, {
  frontMatter as imprintPage,
} from "../docs/401-imprint.mdx";
import HeroHome from "../components/HeroHome";

const ImprintPage: FunctionComponent = () => (
  <Layout title="Imprint & Privacy" hero={<></>}>
    <ContentBlock {...imprintPage}>
      <ImprintPageMd />
    </ContentBlock>
  </Layout>
);

export default ImprintPage;
