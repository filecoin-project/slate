import * as React from "react";
import * as Constants from "~/common/constants";

import { css } from "@emotion/react";

import WebsitePrototypeWrapper from "~/components/core/WebsitePrototypeWrapper";

export const getServerSideProps = async (context) => {
  return {
    props: { ...context.query },
  };
};

const STYLES_ROOT = css`
  padding: 128px 88px 256px 88px;

  @media (max-width: 768px) {
    padding: 128px 24px 128px 24px;
  }
`;

const STYLES_HEADING = css`
  font-weight: 400;
  font-size: 2.88rem;
  line-height: 1.5;
  color: ${Constants.system.black};

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const STYLES_PARAGRAPH = css`
  font-weight: 400;
  font-size: 2.88rem;
  line-height: 1.5;
  color: ${Constants.system.pitchBlack};

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const STYLES_IMAGE = css`
  display: inline-flex;
  border-radius: 4px;
  background-size: cover;
  background-position: 50% 50%;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.09);
  height: 288px;
  width: 288px;
  margin: 0 24px 24px 0;
`;

export default class SlatePage extends React.Component {
  render() {
    console.log(this.props);

    const title = this.props.slate
      ? `@${this.props.slate.ownername}/${this.props.slate.slatename}`
      : "404";
    const url = `https://slate.host/${title}`;

    if (!this.props.slate) {
      return (
        <WebsitePrototypeWrapper
          title={title}
          description="This Slate can not be found."
          url={url}
        >
          <div css={STYLES_ROOT}>
            <h1 css={STYLES_HEADING}>404</h1>
            <p css={STYLES_PARAGRAPH}>
              This slate is not found.
              <br />
              <br />
              <a href="/application">Run Slate {Constants.values.version}</a>
              <br />
              <a href="/system">Use Slate's Design System</a>
            </p>
          </div>
        </WebsitePrototypeWrapper>
      );
    }

    const description = "A slate.";

    return (
      <WebsitePrototypeWrapper
        title={title}
        description={description}
        url={url}
      >
        <div css={STYLES_ROOT}>
          {this.props.slate.data.objects.map((each) => {
            console.log(each);
            return (
              <div
                css={STYLES_IMAGE}
                key={each.url}
                style={{ backgroundImage: `url("${each.url}")` }}
              />
            );
          })}
          <h1 css={STYLES_HEADING} style={{ marginTop: 64 }}>
            {title}
          </h1>
          <p css={STYLES_PARAGRAPH}>
            This is a Slate page on Slate. It will be cool some day.
            <br />
            <a href="/application">Run Slate {Constants.values.version}</a>
            <br />
            <a href="/system">Use Slate's Design System</a>
            <br />
            <a href="https://github.com/filecoin-project/slate">
              View Source ☺
            </a>
          </p>
        </div>
      </WebsitePrototypeWrapper>
    );
  }
}
