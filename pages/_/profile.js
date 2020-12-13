import * as React from "react";
import * as Constants from "~/common/constants";
import * as Strings from "~/common/strings";

import { css } from "@emotion/react";
import { ButtonSecondary } from "~/components/system/components/Buttons";

import Profile from "~/components/core/Profile";
import WebsitePrototypeWrapper from "~/components/core/WebsitePrototypeWrapper";
import WebsitePrototypeHeader from "~/components/core/WebsitePrototypeHeader";
import WebsitePrototypeFooter from "~/components/core/WebsitePrototypeFooter";
import CTATransition from "~/components/core/CTATransition";

const DEFAULT_IMAGE =
  "https://slate.textile.io/ipfs/bafkreiaow45dlq5xaydaeqocdxvffudibrzh2c6qandpqkb6t3ahbvh6re";

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
  background-color: ${Constants.system.foreground};
`;

export default class ProfilePage extends React.Component {
  state = {
    visible: false,
  };

  render() {
    const title = this.props.creator ? `${this.props.creator.username}` : "404";
    const url = `https://slate.host/${title}`;
    const description = this.props.creator.data.body;
    const image = this.props.creator.data.photo;
    const buttons = (
      <ButtonSecondary onClick={() => this.setState({ visible: true })}>Follow</ButtonSecondary>
    );

    if (Strings.isEmpty(image)) {
      image = DEFAULT_IMAGE;
    }

    return (
      <WebsitePrototypeWrapper title={title} description={description} url={url} image={image}>
        <WebsitePrototypeHeader />
        <div css={STYLES_ROOT}>
          <Profile {...this.props} buttons={buttons} />
        </div>
        {this.state.visible && (
          <div>
            <CTATransition
              onClose={() => this.setState({ visible: false })}
              viewer={this.props.viewer}
              open={this.state.visible}
              redirectURL={`/_${Strings.createQueryParams({
                scene: "V1_NAVIGATION_PROFILE",
                user: this.props.creator.username,
              })}`}
            />
          </div>
        )}
        <WebsitePrototypeFooter />
      </WebsitePrototypeWrapper>
    );
  }
}
