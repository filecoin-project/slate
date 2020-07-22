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

const STYLES_USER = css`
  background-position: 50% 50%;
  background-size: cover;
  height: 88px;
  width: 88px;
  border-radius: 4px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.07);
`;

export default class ProfilePage extends React.Component {
  render() {
    console.log(this.props);

    if (!this.props.creator) {
      return null;
    }

    const title = `@${this.props.creator.username}`;
    const description = "A user on Slate.";
    const url = `https://slate.host/${title}`;

    return (
      <WebsitePrototypeWrapper
        title={title}
        description={description}
        url={url}
      >
        <div css={STYLES_ROOT}>
          <div
            css={STYLES_USER}
            style={{ backgroundImage: `url(${this.props.creator.data.photo})` }}
          />
          <h1 css={STYLES_HEADING}>{title}</h1>
          <p css={STYLES_PARAGRAPH}>
            This is an example of a profile page on Slate.
            <br />
            <br />
            <a href="/application">Run Slate</a>
            <br />
            <a href="/system">Use Slate's Design System</a>
          </p>
        </div>
      </WebsitePrototypeWrapper>
    );
  }
}
