import * as React from "react";
import * as Constants from "~/common/constants";
import * as System from "~/components/system";
import * as Strings from "~/common/strings";
import * as Window from "~/common/window";

import { css } from "@emotion/react";
import { ProcessedText } from "~/components/system/components/Typography";
import { Alert } from "~/components/core/Alert";

import WebsitePrototypeWrapper from "~/components/core/WebsitePrototypeWrapper";
import WebsitePrototypeHeaderGeneric from "~/components/core/WebsitePrototypeHeaderGeneric";
import WebsitePrototypeFooter from "~/components/core/WebsitePrototypeFooter";
import Slate, { generateLayout } from "~/components/core/Slate";
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
  max-width: 1660px;
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
  state = {
    layouts: this.props.slate.data.layouts
      ? this.props.slate.data.layouts
      : { lg: generateLayout(this.props.slate.data.objects) },
  };

  componentDidMount() {
    if (!this.props.slate) {
      return null;
    }

    let CIDMap = {};
    System.dispatchCustomEvent({
      name: "slate-global-create-carousel",
      detail: {
        slides: this.props.slate.data.objects.map((each, index) => {
          // NOTE(jim):
          // This is a hack to catch this undefined case I don't want to track down yet.
          const url = each.url.replace("https://undefined", "https://");
          const cid = Strings.getCIDFromIPFS(url);
          CIDMap[cid] = index;

          return {
            cid,
            id: each.id,
            data: each,
            editing: false,
            component: (
              <SlateMediaObject key={each.id} useImageFallback data={each} />
            ),
          };
        }),
      },
    });

    if (!Strings.isEmpty(this.props.cid)) {
      const index = CIDMap[this.props.cid];

      if (index || index === 0) {
        System.dispatchCustomEvent({
          name: "slate-global-open-carousel",
          detail: {
            index,
            baseURL: `${this.props.creator.username}/${
              this.props.slate.slatename
            }`,
          },
        });
      }
    }
  }

  _handleSelect = (index) =>
    System.dispatchCustomEvent({
      name: "slate-global-open-carousel",
      detail: {
        index,
        baseURL: `${this.props.creator.username}/${this.props.slate.slatename}`,
      },
    });

  render() {
    let title = `${this.props.creator.username}/${this.props.slate.slatename}`;
    let url = `https://slate.host/${this.props.creator.username}/${
      this.props.slate.slatename
    }`;
    let headerURL = `https://slate.host/${this.props.creator.username}`;
    let description = this.props.slate.data.body;

    const { objects } = this.props.slate.data;

    // TODO(jim): Takes the first image found
    // but we want this to be a user choice.
    let image;
    for (let i = 0; i < objects.length; i++) {
      if (objects[i].type && objects[i].type.startsWith("image/")) {
        image = objects[i].url;
        break;
      }
    }

    if (!Strings.isEmpty(this.props.cid)) {
      let object = objects.find((each) => {
        const url = each.url.replace("https://undefined", "https://");
        const cid = Strings.getCIDFromIPFS(url);
        return cid === this.props.cid;
      });

      if (object) {
        title = !Strings.isEmpty(object.title) ? object.title : this.props.cid;
        description = !Strings.isEmpty(object.body)
          ? Strings.elide(object.body)
          : `An object on ${url}`;
        image = object.type.includes("image/") ? object.url : image;
        url = `${url}/cid:${this.props.cid}`;
      }
    }

    const headerTitle = `${this.props.creator.username} / ${
      this.props.slate.slatename
    }`;

    return (
      <WebsitePrototypeWrapper
        title={title}
        description={description}
        url={url}
        image={image}
      >
        <div css={STYLES_ROOT}>
          <WebsitePrototypeHeaderGeneric href={headerURL} title={headerTitle}>
            <ProcessedText text={this.props.slate.data.body} />
          </WebsitePrototypeHeaderGeneric>
          <Alert style={{ top: 0, width: "100%" }} />
          <div css={STYLES_SLATE}>
            <Slate
              editing={false}
              layouts={this.state.layouts}
              items={objects}
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
