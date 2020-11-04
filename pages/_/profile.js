import * as React from "react";
import * as Constants from "~/common/constants";

import { css } from "@emotion/core";
import { Alert } from "~/components/core/Alert";

import Profile from "~/components/core/Profile";
import WebsitePrototypeWrapper from "~/components/core/WebsitePrototypeWrapper";
import WebsitePrototypeHeader from "~/components/core/WebsitePrototypeHeader";
import WebsitePrototypeFooter from "~/components/core/WebsitePrototypeFooter";

export const getServerSideProps = async (context) => {
  return {
    props: { ...context.query },
  };
};

const STYLES_ROOT = css`
  display: block;
  grid-template-rows: auto 1fr auto;
  text-align: center;
  font-size: 1rem;
  min-height: 100vh;
  background-color: ${Constants.system.white};
`;

export default class ProfilePage extends React.Component {
  render() {
    const title = this.props.creator ? `${this.props.creator.username}` : "404";
    const url = `https://slate.host/${title}`;
    const description = this.props.creator.data.body;

    return (
      <WebsitePrototypeWrapper
        title={title}
        description={description}
        url={url}
        image={this.props.creator.data.photo}
      >
        <div css={STYLES_ROOT}>
          <WebsitePrototypeHeader />
          <Profile {...this.props} />
          <WebsitePrototypeFooter />
        </div>
      </WebsitePrototypeWrapper>
    );
  }
}
