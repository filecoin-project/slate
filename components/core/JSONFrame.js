import React, { useEffect, useState } from "react";
import fetch from "isomorphic-fetch";
import { css } from "@emotion/react";

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
  const { name, url } = item;
  const [data, setData] = useState({});

  useEffect(() => {
    if (name?.includes(".link")) {
      const fetchData = async () => {
        try {
          const res = await fetch(url);
          const data = await res.json();
          setData(data);
        } catch (e) {
          console.error(e);
        }
      };
      fetchData();
    }
  }, [url]);

  console.log({ data, url, item });

  return (
    <div css={STYLES_FRAME}>
      {Object.entries(data).length > 0 ? <LinkPreview data={data} /> : "Loading..."}
    </div>
  );
};

const LinkPreview = ({ data, data: { screenshot } }) => (
  <div>{screenshot ? <img src={screenshot.url} /> : <LinkCard {...data} />}</div>
);

const LinkCard = ({ url, description, image }) => (
  <div>
    {url}
    {description}
  </div>
);

export default JSONFrame;
