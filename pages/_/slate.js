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
import WebsitePrototypeHeader from "~/components/core/WebsitePrototypeHeader";
import WebsitePrototypeFooter from "~/components/core/WebsitePrototypeFooter";
import { SlateLayout } from "~/components/core/SlateLayout";
import { SlateLayoutMobile } from "~/components/core/SlateLayoutMobile";
import SlateMediaObject from "~/components/core/SlateMediaObject";

const SIZE_LIMIT = 1000000; //NOTE(martina): 1mb limit for twitter preview images
const DEFAULT_IMAGE = "";

const STYLES_ROOT = css`
  display: block;
  min-height: 100vh;
  background-color: ${Constants.system.white};
`;

const STYLES_SLATE_INTRO = css`
  display: flex;
  margin: 0 64px;
  align-items: baseline;
  line-height: 1.3;

  @media (max-width: ${Constants.sizes.mobile}px) {
    margin: 0 24px;
    display: block;
    font-size: 14px;
  }
`;

const STYLES_CREATOR = css`
  flex-shrink: 0;
  margin-right: 4px;
  text-decoration: none;

  :hover {
    color: ${Constants.system.brand};
  }

  :visited {
    color: ${Constants.system.black};
  }
`;

const STYLES_DESCTIPTION = css`
  font-size: ${Constants.typescale.lvl1};
  font-family: ${Constants.font.text};
  width: 50%;
  color: ${Constants.system.black};

  @media (max-width: ${Constants.sizes.tablet}px) {
    width: 100%;
  }

  @media (max-width: ${Constants.sizes.mobile}px) {
    font-size: 14px;
    margin-top: 4px;
  }
`;

const STYLES_TITLE = css`
  font-size: ${Constants.typescale.lvl3};
  font-family: ${Constants.font.medium};
  font-weight: 400;
  color: ${Constants.system.black};
  width: 70%;

  @media (max-width: ${Constants.sizes.mobile}px) {
    font-size: ${Constants.typescale.lvl2};
  }
`;

const STYLES_FLEX = css`
  display: flex;
  margin-bottom: 8px;

  @media (max-width: ${Constants.sizes.mobile}px) {
    display: block;
  }
`;

const STYLES_STATS = css`
  font-size: ${Constants.typescale.lvl0};
  margin-top: 32px;
  display: flex;
`;

const STYLES_STAT = css`
  margin-right: 48px;
  width: 80px;
  ${"" /* border-left: 1px solid ${Constants.system.darkGray};
padding-left: 12px; */};
`;

const STYLES_BUTTONS = css`
  display: flex;
  width: 240px;
  height: 40px;
  border-radius: 4px;
  border: 1px solid ${Constants.system.gray};

  @media (max-width: ${Constants.sizes.mobile}px) {
    margin: 12px 0;
  }
`;

const STYLES_BUTTON = css`
  border-right: 1px solid ${Constants.system.gray};
  padding: 10px 24px;
  cursor: pointer;
  width: 50%;
  font-family: ${Constants.font.medium};
  font-weight: 400;
  font-size: 14px;
  text-align: center;
  text-decoration: none;
  color: ${Constants.system.black};

  :last-child {
    border-right: none;
  }

  :hover {
    background-color: ${Constants.system.gray};
    transition: 200ms background-color linear;
  }

  :visited {
    color: ${Constants.system.black};
  }
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

    const slateCreator = `${this.props.creator.username} / `;
    const slateTitle = `${this.props.slate.slatename}`;

    const counts = objects.reduce((counts, { ownerId }) => {
      counts[ownerId] = (counts[ownerId] || 0) + 1;
      return counts;
    }, {});

    const contributorsCount = Object.keys(counts).length;

    return (
      <WebsitePrototypeWrapper title={title} description={body} url={url} image={image}>
        <div css={STYLES_ROOT}>
          <WebsitePrototypeHeader />
          <div css={STYLES_SLATE_INTRO}>
            <a css={STYLES_CREATOR} href={headerURL}>
              {slateCreator}
            </a>
            <div css={STYLES_DESCTIPTION}>
              <div css={STYLES_FLEX}>
                <div css={STYLES_TITLE}>{slateTitle} </div>
                <div css={STYLES_BUTTONS}>
                  <a css={STYLES_BUTTON} href={"http://slate.host/_"}>
                    Follow
                  </a>
                  <a css={STYLES_BUTTON} href={"http://slate.host/_"}>
                    Download
                  </a>
                </div>
              </div>
              <ViewAllButton fullText={this.props.slate.data.body} maxCharacter={208}>
                <ProcessedText text={this.props.slate.data.body} />
              </ViewAllButton>
              <div css={STYLES_STATS}>
                <div css={STYLES_STAT}>
                  <div style={{ color: `${Constants.system.grayBlack}` }}>Data</div>
                  <div style={{ fontFamily: `${Constants.font.semiBold}` }}>
                    {this.props.slate.data.objects.length}
                  </div>
                </div>
                <div css={STYLES_STAT}>
                  <div style={{ color: `${Constants.system.grayBlack}` }}>Contributors</div>
                  <div style={{ fontFamily: `${Constants.font.semiBold}` }}>
                    {contributorsCount}
                  </div>
                </div>
                {/* <div css={STYLES_STAT}>
                  <div style={{ color: `${Constants.system.grayBlack}` }}>Followers</div>
                  <div style={{ fontFamily: `${Constants.font.semiBold}` }}>0</div>
                </div> */}
              </div>
            </div>
          </div>
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
        </div>
        <System.GlobalCarousel external current={this.props.slate} viewer={this.props.creator} />
        <System.GlobalModal />
        <WebsitePrototypeFooter />
      </WebsitePrototypeWrapper>
    );
  }
}
