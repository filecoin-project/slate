import * as React from "react";
import * as Constants from "~/common/constants";

import { css } from "@emotion/react";
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: ${Constants.system.white};
  text-align: center;
  font-size: 1rem;
`;

export default class ProfilePage extends React.Component {
  state = {
    follow: false, //TODO: get the real trust status from the api
    trust: false,
  };

  _handleFollow = () => {};

  _handleTrust = () => {};

  _handleSendMoney = () => {};

  render() {
    console.log(this.props);
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
          <Profile
            {...this.props}
            onFollow={this._handleFollow}
            onTrust={this._handleTrust}
            onSendMoney={this._handleSendMoney}
          />
          <WebsitePrototypeFooter />
        </div>
      </WebsitePrototypeWrapper>
    );
  }
}
