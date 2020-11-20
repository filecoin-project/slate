import * as React from "react";

import unified from "unified";
import parse from "remark-parse";
import remark2react from "remark-react";
import gfm from "remark-gfm";
import emoji from "remark-emoji";
import linkifyRegex from "remark-linkify-regex";

export const Markdown = ({ md, options }) => {
  return (
    <React.Fragment>
      {
        unified()
          .use(parse)
          .use(gfm)
          .use(emoji)
          .use(linkifyRegex(/@(\w*[0-9a-zA-Z-_]+\w*[0-9a-zA-Z-_])/g)) // @user
          .use(linkifyRegex(/^(https?):\/\/[^\s$.?#].[^\s]*$/gm)) // http(s) links
          .use(remark2react, options)
          .processSync(md).result
      }
    </React.Fragment>
  );
};
