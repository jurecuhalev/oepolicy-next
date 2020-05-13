const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");
module.exports = (phase, { defaultConfig }) => {
  const sharedConf = {
    exportTrailingSlash: true,
    env: {
      // api: "https://prevoz.org/api",
      api: "http://localhost:8000/api",
    },
  };

  if (phase === PHASE_DEVELOPMENT_SERVER) {
    const conf = {
      env: {
        api: "http://localhost:8000/api",
      },
    };

    return { ...defaultConfig, ...sharedConf, ...conf };
  }

  return { ...defaultConfig, ...sharedConf };
};
