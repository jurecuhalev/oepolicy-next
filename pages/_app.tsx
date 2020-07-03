import { AppProps } from "next/app";
import React from "react";

// import "mapbox-gl/dist/mapbox-gl.css";
import "react-dropdown-now/style.css";
import "../styles/style.scss";

function OEPolicyHubApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default OEPolicyHubApp;
