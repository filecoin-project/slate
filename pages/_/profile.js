import * as React from "react";
import * as Constants from "~/common/constants";

import { css } from "@emotion/react";

import WebsitePrototypeWrapper from "~/components/core/WebsitePrototypeWrapper";
import WebsitePrototypeHeader from "~/components/core/WebsitePrototypeHeader";
import WebsitePrototypeFooter from "~/components/core/WebsitePrototypeFooter";

export const getServerSideProps = async (context) => {
  return {
    props: { ...context.query },
  };
};

const STYLES_ROOT = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100vh;
  text-align: center;
  font-size: 1rem;
`;

const STYLES_MIDDLE = css`
  position: relative;
  min-height: 10%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 24px;
`;

const STYLES_CARD = css`
  margin: 0 auto 0 auto;
  max-width: 360px;
  width: 100%;
  background: ${Constants.system.pitchBlack};
  border-radius: 8px;
  padding: 0;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.7);
`;

const STYLES_CARD_IMAGE = css`
  display: block;
  width: 100%;
  border-radius: 8px 8px 8px 8px;
  margin: 0;
  padding: 0;
`;

const STYLES_CARD_PARAGRAPH = css`
  font-family: ${Constants.font.code};
  padding: 24px;
  font-size: 12px;
  text-transform: uppercase;
  text-align: left;
  color: ${Constants.system.white};
`;

const STYLES_LINK = css`
  color: ${Constants.system.white};
  text-decoration: none;
  transition: 200ms ease color;
  display: block;
  margin-top: 4px;

  :visited {
    color: ${Constants.system.white};
  }

  :hover {
    color: ${Constants.system.brand};
  }
`;

export default class ProfilePage extends React.Component {
  render() {
    const title = this.props.creator ? `${this.props.creator.username}` : "404";
    const url = `https://slate.host/${title}`;
    const description = "A user on Slate.";

    return (
      <WebsitePrototypeWrapper
        title={title}
        description={description}
        url={url}
        image={this.props.creator.data.photo}
      >
        <div css={STYLES_ROOT}>
          <WebsitePrototypeHeader />

          <div css={STYLES_CARD}>
            <img css={STYLES_CARD_IMAGE} src={this.props.creator.data.photo} />
            {this.props.creator.slates && this.props.creator.slates.length ? (
              <p css={STYLES_CARD_PARAGRAPH}>
                {this.props.creator.slates.map((row) => {
                  const url = `/${this.props.creator.username}/${
                    row.slatename
                  }`;

                  return (
                    <a key={url} css={STYLES_LINK} href={url}>
                      {url}
                    </a>
                  );
                })}
              </p>
            ) : null}
          </div>

          <WebsitePrototypeFooter />
        </div>
      </WebsitePrototypeWrapper>
    );
  }
}
