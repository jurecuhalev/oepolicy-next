import React, { FunctionComponent } from "react";
import Head from "next/head";
import Link from "next/link";

import LogoWhite from "../assets/svg/logo-white.svg";
import LogoLarge from "../assets/svg/logo-large.svg";

type Props = {
  title: string;
};

const Layout: FunctionComponent<Props> = ({ children, title }) => (
  <>
    <Head>
      <title>{title}</title>
    </Head>
    <header className="bg-blue text-lg py-4 text-white">
      <div className="container mx-auto flex justify-between">
        <div className="flex-shrink self-start">
          <Link href="/">
            <a className="hover:no-underline text-white hover:text-orange">
              <LogoWhite
                className="header__logo fill-current"
                alt="OE Policy Hub"
              />
            </a>
          </Link>
        </div>
        <div className="flex justify-end">
          <div className="flex-shrink">
            <Link href="/">
              <a>Collection &amp; Statistics</a>
            </Link>
          </div>
          <div className="flex-shrink ml-8">
            <Link href="/">
              <a>Tools &amp; Resources</a>
            </Link>
          </div>
        </div>
      </div>
    </header>
    {children}
    <footer className="bg-white py-16">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-2">
        <div>
          <ul className=" font-bold">
            <li className=" mb-4">Open Education Policy Hub</li>
            <li>
              <Link href="/">
                <a>Collection &amp; Statistics</a>
              </Link>
            </li>
            <li>
              <Link href="/">
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
              <Link href="/">
                <a>Imprint &amp; Privacy</a>
              </Link>
            </li>
          </ul>
        </div>
        <div className="">
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
