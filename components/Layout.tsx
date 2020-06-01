import React, { FunctionComponent } from "react";
import Head from "next/head";
import Link from "next/link";

import LogoWhite from "../assets/svg/logo-white.svg";
import LogoLarge from "../assets/svg/logo-large.svg";

type Props = {
  title: string;
  hero?: any;
};

const Layout: FunctionComponent<Props> = ({ children, title, hero }) => (
  <>
    <Head>
      <title>{title} | OE Policy Hub</title>
      <link rel="shortcut icon" href="/favicon.png" />
      <meta property="og:title" content={title} />
      <meta property="og:site_name" content="OE Policy Hub" />
      <meta property="og:url" content="https://oepolicy.netlify.app/" />
      <meta
        property="og:description"
        content="Shaping Open Futures in Education Together"
      />
      <meta property="og:type" content="website" />
      <meta
        property="og:image"
        content="https://oepolicy.netlify.app/facebook.png"
      />
    </Head>
    <header className="bg-blue text-lg py-4 text-white">
      <div className="container mx-auto flex justify-between flex-col md:flex-row">
        <div className="flex-grow md:flex-shrink self-start mb-6 md:mb-0">
          <Link href="/">
            <a className="hover:no-underline text-white hover:text-orange">
              <LogoWhite
                className="header__logo fill-current"
                alt="OE Policy Hub"
              />
            </a>
          </Link>
        </div>
        <div className="flex justify-end flex-col md:flex-row">
          <div className="flex-shrink mb-2 md:mb-0">
            <Link href="/explore">
              <a>Collection &amp; Statistics</a>
            </Link>
          </div>
          <div className="flex-shrink md:ml-8">
            <Link href="/tools">
              <a>Tools &amp; Resources</a>
            </Link>
          </div>
        </div>
      </div>
    </header>
    {hero}
    {children}
    <footer className="bg-white py-16">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-2">
        <div className="order-2 md:order-1">
          <ul className="font-bold">
            <li className="mb-4">Open Education Policy Hub</li>
            <li>
              <Link href="/explore">
                <a>Collection &amp; Statistics</a>
              </Link>
            </li>
            <li>
              <Link href="/tools">
                <a>Tools &amp; Resources</a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a>About &amp; Team</a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a>Help</a>
              </Link>
            </li>

            <li className="mt-8 font-normal">
              <Link href="/imprint">
                <a>Imprint &amp; Privacy</a>
              </Link>
            </li>
          </ul>
        </div>
        <div className="order-1 md:order-2 mb-12 md:mb-0">
          <LogoLarge className="h-15 mb-12" />
          <Link href="/">
            <a className="font-bold">OE Policy Hub</a>
          </Link>{" "}
          is a project by{" "}
          <a className="font-bold" href="https://oerworldmap.org/">
            OER World Map
          </a>
        </div>
      </div>
    </footer>
  </>
);

export default Layout;
