import * as React from "react";
import * as Constants from "~/common/constants";
import * as System from "~/components/system";

import { css } from "@emotion/react";

import WebsitePrototypeWrapper from "~/components/core/WebsitePrototypeWrapper";
import Slate from "~/components/core/Slate";

export const getServerSideProps = async (context) => {
  return {
    props: { ...context.query },
  };
};

const STYLES_ROOT = css`
  padding: 128px 88px 256px 88px;
  max-width: 1328px;
  display: block;
  width: 100%;
  margin: 0 auto 0 auto;

  @media (max-width: 768px) {
    padding: 128px 24px 128px 24px;
  }
`;

export default class SlatePage extends React.Component {
  render() {
    const title = this.props.slate ? `@${this.props.slate.ownername}/${this.props.slate.slatename}` : "404";
    const url = `https://slate.host/${title}`;

    if (!this.props.slate) {
      return (
        <WebsitePrototypeWrapper title={title} description="This Slate can not be found." url={url}>
          <div css={STYLES_ROOT}>
            <System.H1>404</System.H1>
            <System.P>
              This slate is not found.
              <br />
              <br />
              <a href="/application">Run Slate {Constants.values.version}</a>
              <br />
              <a href="/system">Use Slate's Design System</a>
            </System.P>
          </div>
        </WebsitePrototypeWrapper>
      );
    }

    const description = "A slate.";

    let image;
    if (this.props.slate.data.objects.length) {
      image = this.props.slate.data.objects[0].url;
    }

    return (
      <WebsitePrototypeWrapper title={title} description={description} url={url} image={image}>
        <div css={STYLES_ROOT}>
          <Slate items={this.props.slate.data.objects} />
        </div>
      </WebsitePrototypeWrapper>
    );
  }
}
