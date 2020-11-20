import * as React from "react";

import unified from "unified";
import parse from "remark-parse";
import remark2react from "remark-react";
import linkifyRegex from "remark-linkify-regex";

export const Markdown = ({ md, options }) => {
  return (
    <React.Fragment>
      {
        unified()
          .use(parse)
          .use(linkifyRegex(/[@#](\w*[0-9a-zA-Z-_]+\w*[0-9a-zA-Z-_])/g))
          .use(remark2react, options)
          .processSync(md).result
      }
    </React.Fragment>
  );
};
