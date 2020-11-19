import * as React from "react";

import unified from 'unified'
import parse from 'remark-parse'
import remark2react from 'remark-react'

export const Markdown = ({md, options}) => {
  return <React.Fragment>
    {unified().use(parse).use(remark2react, options).processSync(md).result}
  </React.Fragment>
}