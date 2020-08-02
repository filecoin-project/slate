import * as React from "react";
import * as Constants from "~/common/constants";
import * as System from "~/components/system";

import { css } from "@emotion/react";

import WebsitePrototypeWrapper from "~/components/core/WebsitePrototypeWrapper";
import Slate from "~/components/core/Slate";

import MediaObject from "~/components/core/MediaObject";

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

export const getServerSideProps = async (context) => {
  return {
    props: { ...context.query },
  };
};

export default class SlatePage extends React.Component {
  componentDidMount() {
    if (!this.props.slate) {
      return null;
    }

    System.dispatchCustomEvent({
      name: "slate-global-create-carousel",
      detail: {
        slides: this.props.slate.data.objects.map((each) => {
          return <MediaObject useImageFallback data={each} />;
        }),
      },
    });
  }

  _handleSelect = (index) =>
    System.dispatchCustomEvent({
      name: "slate-global-open-carousel",
      detail: { index },
    });

  render() {
    const title = this.props.slate ? `@${this.props.slate.ownername}/${this.props.slate.slatename}` : "404";
    const url = `https://slate.host/${title}`;
    const description = "A slate.";

    let image;
    if (this.props.slate.data.objects.length) {
      image = this.props.slate.data.objects[0].url;
    }

    return (
      <WebsitePrototypeWrapper title={title} description={description} url={url} image={image}>
        <div css={STYLES_ROOT}>
          <Slate items={this.props.slate.data.objects} onSelect={this._handleSelect} />
        </div>
        <System.GlobalCarousel />
      </WebsitePrototypeWrapper>
    );
  }
}
