import * as React from "react";
import * as Constants from "~/common/constants";
import * as System from "~/components/system";

import { css } from "@emotion/react";

import WebsitePrototypeWrapper from "~/components/core/WebsitePrototypeWrapper";
import WebsitePrototypeHeaderGeneric from "~/components/core/WebsitePrototypeHeaderGeneric";
import WebsitePrototypeFooter from "~/components/core/WebsitePrototypeFooter";
import Slate from "~/components/core/Slate";
import SlateMediaObject from "~/components/core/SlateMediaObject";

const STYLES_ROOT = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  min-height: 100vh;
  text-align: center;
  font-size: 1rem;
`;

const STYLES_SLATE = css`
  padding: 0 88px 0 88px;
  max-width: 1328px;
  display: block;
  width: 100%;
  margin: 0 auto 0 auto;
  min-height: 10%;
  height: 100%;

  @media (max-width: ${Constants.sizes.mobile}px) {
    padding: 0 24px 0 24px;
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
          return {
            id: each.id,
            data: each,
            component: (
              <SlateMediaObject key={each.id} useImageFallback data={each} />
            ),
          };
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
    const title = `${this.props.slate.ownername}/${this.props.slate.slatename}`;
    const url = `https://slate.host/${title}`;
    const description = this.props.slate.data.body;

    let image;
    this.props.slate.data.objects.forEach((o) => {
      if (o.type && o.type.startsWith("image/")) {
        image = o.url;
      }
    });

    return (
      <WebsitePrototypeWrapper
        title={title}
        description={description}
        url={url}
        image={image}
      >
        <div css={STYLES_ROOT}>
          <WebsitePrototypeHeaderGeneric>
            {this.props.slate.ownername}
          </WebsitePrototypeHeaderGeneric>
          <div css={STYLES_SLATE}>
            <Slate
              items={this.props.slate.data.objects}
              onSelect={this._handleSelect}
            />
          </div>
          <WebsitePrototypeFooter style={{ marginTop: 88 }} />
        </div>
        <System.GlobalCarousel />
      </WebsitePrototypeWrapper>
    );
  }
}
