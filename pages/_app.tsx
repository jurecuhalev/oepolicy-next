import { AppProps } from "next/app";
import React from "react";

import "../styles/style.scss";

function OEPolicyHubApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default OEPolicyHubApp;
