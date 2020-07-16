import * as React from "react";
import * as Constants from "~/common/constants";

import { css } from "@emotion/react";

import WebsitePrototypeWrapper from "~/components/core/WebsitePrototypeWrapper";

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
`;

const STYLES_PARAGRAPH = css`
  font-weight: 400;
  font-size: 2.88rem;
  line-height: 1.5;
  color: ${Constants.system.pitchBlack};
`;

export const getServerSideProps = async (context) => {
  return {
    props: { ...context.query },
  };
};

export default class IndexPage extends React.Component {
  render() {
    const title = `Slate`;
    const description =
      "Tne place for all of your assets, slates. Powered by Textile and Filecoin.";
    const url = "https://slate.host";

    return (
      <WebsitePrototypeWrapper
        title={title}
        description={description}
        url={url}
      >
        <div css={STYLES_ROOT}>
          <h1 css={STYLES_HEADING}>Slate</h1>
          <p css={STYLES_PARAGRAPH}>
            One place for all of your assets, slates. Powered by{" "}
            <a href="https://docs.textile.io/">Textile</a> and{" "}
            <a href="https://filecoin.io/">Filecoin</a>.
            <br />
            <br />
            {!this.props.hide ? (
              <a href="/application">Test Application</a>
            ) : null}
            <br />
            <a href="/system">View Design System</a>
          </p>
        </div>
      </WebsitePrototypeWrapper>
    );
  }
}
