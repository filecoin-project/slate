import * as React from "react";
import * as Constants from "~/common/constants";
import * as System from "~/components/system";
import * as Strings from "~/common/strings";
import * as Actions from "~/common/actions";

import { css } from "@emotion/react";
import { ProcessedText } from "~/components/system/components/Typography";
import { Alert } from "~/components/core/Alert";
import { ViewAllButton } from "~/components/core/ViewAll";

import WebsitePrototypeWrapper from "~/components/core/WebsitePrototypeWrapper";
import WebsitePrototypeHeaderGeneric from "~/components/core/WebsitePrototypeHeaderGeneric";
import WebsitePrototypeFooter from "~/components/core/WebsitePrototypeFooter";
import { SlateLayout } from "~/components/core/SlateLayout";
import { SlateLayoutMobile } from "~/components/core/SlateLayoutMobile";
import SlateMediaObject from "~/components/core/SlateMediaObject";

const SIZE_LIMIT = 1000000; //NOTE(martina): 1mb limit for twitter preview images
const DEFAULT_IMAGE = "";

const STYLES_ROOT = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  min-height: 100vh;
  text-align: center;
  font-size: 1rem;
  background-color: ${Constants.system.white};
`;

const STYLES_SLATE = css`
  padding: 0 64px 0 64px;
  ${"" /* max-width: 1660px; */}
  display: block;
  width: 100%;
  margin: 48px auto 0 auto;
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

    let CIDMap = {};
    System.dispatchCustomEvent({
      name: "slate-global-create-carousel",
      detail: {
        carouselType: "slate",
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
            isOwner: false,
            component: <SlateMediaObject key={each.id} useImageFallback data={each} />,
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
            baseURL: `${this.props.creator.username}/${this.props.slate.slatename}`,
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

  _handleSave = async (layouts) => {
    await Actions.updateSlate({
      id: this.props.slate.id,
      layoutOnly: true,
      data: { layouts },
    });
  };

  render() {
    let title = `${this.props.creator.username}/${this.props.slate.slatename}`;
    let url = `https://slate.host/${this.props.creator.username}/${this.props.slate.slatename}`;
    let headerURL = `https://slate.host/${this.props.creator.username}`;

    let { objects, layouts, body, preview } = this.props.slate.data;

    let image = preview;
    if (!image) {
      for (let i = 0; i < objects.length; i++) {
        if (
          objects[i].type &&
          objects[i].type.startsWith("image/") &&
          (!objects[i].size || objects[i].size < SIZE_LIMIT)
        ) {
          image = objects[i].url.replace("https://undefined", "https://");
          break;
        }
      }
    }
    if (!image) {
      image = DEFAULT_IMAGE;
    }

    if (!Strings.isEmpty(this.props.cid)) {
      let object = objects.find((each) => {
        const url = each.url.replace("https://undefined", "https://");
        const cid = Strings.getCIDFromIPFS(url);
        return cid === this.props.cid;
      });

      if (object) {
        title = !Strings.isEmpty(object.title) ? object.title : this.props.cid;
        body = !Strings.isEmpty(object.body) ? Strings.elide(object.body) : `An object on ${url}`;
        image = object.type.includes("image/") ? object.url : image;
        url = `${url}/cid:${this.props.cid}`;
      }
    }

    const headerTitle = `${this.props.creator.username} / ${this.props.slate.slatename}`;

    return (
      <WebsitePrototypeWrapper title={title} description={body} url={url} image={image}>
        <div css={STYLES_ROOT}>
          <WebsitePrototypeHeaderGeneric href={headerURL} title={headerTitle}>
            <ViewAllButton fullText={this.props.slate.data.body} maxCharacter={208}>
              <ProcessedText text={this.props.slate.data.body} />
            </ViewAllButton>
          </WebsitePrototypeHeaderGeneric>
          <div css={STYLES_SLATE}>
            {this.props.mobile ? (
              <SlateLayoutMobile
                isOwner={false}
                items={objects}
                fileNames={layouts && layouts.ver === "2.0" ? layouts.fileNames : false}
                onSelect={this._handleSelect}
              />
            ) : (
              <SlateLayout
                external
                slateId={this.props.slate.id}
                layout={layouts && layouts.ver === "2.0" ? layouts.layout : null}
                onSaveLayout={this._handleSave}
                isOwner={false}
                fileNames={layouts && layouts.ver === "2.0" ? layouts.fileNames : false}
                items={objects}
                onSelect={this._handleSelect}
                defaultLayout={layouts && layouts.ver === "2.0" ? layouts.defaultLayout : true}
              />
            )}
          </div>
          <WebsitePrototypeFooter />
        </div>
        <System.GlobalCarousel external current={this.props.slate} viewer={this.props.creator} />
        <System.GlobalModal />
      </WebsitePrototypeWrapper>
    );
  }
}
