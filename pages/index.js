import * as React from "react";
import * as Constants from "~/common/constants";
import * as Actions from "~/common/actions";

import { css } from "@emotion/react";

import WebsitePrototypeWrapper from "~/components/core/WebsitePrototypeWrapper";

const STYLES_ROOT = css`
  padding: 128px 88px 256px 88px;

  @media (max-width: 768px) {
    padding: 128px 24px 128px 24px;
  }
`;
const STYLES_NAV = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 88px 0px;
  font-family: ${Constants.font.text};
`;

const STYLES_NAVLINKS = css`
  display: flex;
  a{
    margin-left: 20px;
    text-decoration none;
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

export const getServerSideProps = async (context) => {
  return {
    props: { ...context.query },
  };
};

export default class IndexPage extends React.Component {
  async componentDidMount() {
    const response = await Actions.health();
    console.log("HEALTH_CHECK", response);
  }

  render() {
    const title = `Slate`;
    const description =
      "The place for all of your assets. Powered by Textile and Filecoin.";
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
            One place for all of your assets. Powered by{" "}
            <a href="https://docs.textile.io/">Textile</a> and{" "}
            <a href="https://filecoin.io/">Filecoin</a>.
            <br />
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
