import React, { useEffect, useState } from "react";
import fetch from "isomorphic-fetch";
import { css } from "@emotion/react";

import Microlink from "@microlink/react";

const STYLES_FRAME = css`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    max-width: 100%;
  }
`;

const JSONFrame = ({ item }) => {
  const { file, url } = item;
  const [data, setData] = useState({});

  useEffect(() => {
    if (file?.includes(".link")) {
      const fetchData = async () => {
        const resp = await fetch(url);
        const data = await resp.json();
        setData(data);
      };
      fetchData();
    }
  }, [file, url]);

  console.log({ data, file, url });

  return (
    <div css={STYLES_FRAME}>
      {Object.entries(data).length > 0 ? <LinkPreview url={data.url} data={data} /> : "Loading..."}
    </div>
  );
};

const LinkPreview = ({ data, url }) => (
  <div>
    {data.screenshot ? (
      <img src={data.screenshot.url} />
    ) : (
      <Microlink url={url} setData={data} fetchData={false} />
    )}
  </div>
);

export default JSONFrame;
