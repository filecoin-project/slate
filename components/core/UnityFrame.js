import * as React from "react";

import { css } from "@emotion/core";

const STYLES_CONTAINER = css`
  height: 100%;
  width: 100%;
`;

const loadScript = (url) =>
  new Promise((res, rej) => {
    // NOTE (Amine): Create script
    const script = document.createElement("script");
    script.src = url;
    document.body.appendChild(script);
    script.onload = () => res(script);
  });

const UnityFrame = ({ url }) => {
  const unityInstance = React.useRef();
  const [isLoading, setLoadingStatus] = React.useState(true);

  // NOTE (daniel): url to unity game root
  const gameRootUrl = url.split("/index.html")[0];
  const _loadScripts = async () => Promise.all([loadScript(`${gameRootUrl}/Build/UnityLoader.js`)]);

  const _cleanScripts = () => {
    const scripts = document.getElementsByTagName("script");
    const unityLoaderRegex = new RegExp(/UnityLoader.js/);
    Array.from(scripts).forEach((script) => {
      if (unityLoaderRegex.test(script.src)) {
        script.remove();
      }
    });
  };

  React.useEffect(() => {
    _loadScripts().then(() => {
      if (window) {
        unityInstance.current = window.UnityLoader.instantiate(
          "unityContainer",
          `${gameRootUrl}/Build/WebGL%20Repo.json`
        );

        setLoadingStatus(false);
      }
    });
    return _cleanScripts;
  }, []);

  return <div id="unityContainer" css={STYLES_CONTAINER} />;
};

export default UnityFrame;
