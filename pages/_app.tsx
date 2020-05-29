import { AppProps } from "next/app";
import React from "react";

import "../styles/style.scss";
import "mapbox-gl/dist/mapbox-gl.css";

function OEPolicyHubApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default OEPolicyHubApp;
