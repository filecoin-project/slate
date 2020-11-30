import * as React from "react";

import { css } from "@emotion/react";

const STYLES_CONTAINER = css`
  height: 100%;
  width: 100%;
`;

const _loadScript = (url) =>
  new Promise((res, rej) => {
    // NOTE (Amine): Create script
    const script = document.createElement("script");
    script.src = url;
    document.body.appendChild(script);
    script.onload = () => res(script);
  });

const _cleanScripts = () => {
  const scripts = document.getElementsByTagName("script");
  const unityLoaderRegex = new RegExp(/UnityLoader.js/);
  Array.from(scripts).forEach((script) => {
    if (unityLoaderRegex.test(script.src)) {
      script.remove();
    }
  });
};

const UnityFrame = ({ url }) => {
  // NOTE (daniel): url to unity game root
  const gameRootUrl = url.split("/index.html")[0];

  React.useEffect(() => {
    let unityInstance;
    _loadScript(`${gameRootUrl}/Build/UnityLoader.js`).then(() => {
      if (window) {
        unityInstance = window.UnityLoader.instantiate(
          "unityContainer",
          `${gameRootUrl}/Build/WebGL%20Repo.json`
        );
      }
    });
    return () => {
      // NOTE (Amine):   clean up Unity events on unmout
      if (unityInstance) {
        unityInstance.Quit();
      }
      _cleanScripts();
    };
  }, []);

  return <div id="unityContainer" css={STYLES_CONTAINER} />;
};

export default UnityFrame;
