import React, { useEffect, useState } from "react";
import fetch from "isomorphic-fetch";
import { css } from "@emotion/react";

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

  console.log({ url });

  return <div>{Object.entries(data).length > 0 ? JSON.stringify(data) : "Loading..."}</div>;
};

export default JSONFrame;
