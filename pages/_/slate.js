import * as React from "react";
import * as Constants from "~/common/constants";
import * as System from "~/components/system";
import * as SVG from "~/common/svg";
import * as Strings from "~/common/strings";
import * as Actions from "~/common/actions";
import * as Validations from "~/common/validations";
import * as Events from "~/common/custom-events";

import { ButtonSecondary } from "~/components/system/components/Buttons";
import { css } from "@emotion/react";
import { ViewAllButton } from "~/components/core/ViewAll";
import { SlateLayout } from "~/components/core/SlateLayout";
import { SlateLayoutMobile } from "~/components/core/SlateLayoutMobile";
import { GlobalModal } from "~/components/system/components/GlobalModal";
import { GlobalCarousel } from "~/components/system/components/GlobalCarousel";

import ProcessedText from "~/components/core/ProcessedText";
import WebsitePrototypeWrapper from "~/components/core/WebsitePrototypeWrapper";
import WebsitePrototypeHeader from "~/components/core/WebsitePrototypeHeader";
import WebsitePrototypeFooter from "~/components/core/WebsitePrototypeFooter";
import SlateMediaObject from "~/components/core/SlateMediaObject";
import CTATransition from "~/components/core/CTATransition";

const SIZE_LIMIT = 1000000; //NOTE(martina): 1mb limit for twitter preview images
const DEFAULT_IMAGE =
  "https://slate.textile.io/ipfs/bafkreiaow45dlq5xaydaeqocdxvffudibrzh2c6qandpqkb6t3ahbvh6re";
const DEFAULT_BOOK =
  "https://slate.textile.io/ipfs/bafkreibk32sw7arspy5kw3p5gkuidfcwjbwqyjdktd5wkqqxahvkm2qlyi";
const DEFAULT_DATA =
  "https://slate.textile.io/ipfs/bafkreid6bnjxz6fq2deuhehtxkcesjnjsa2itcdgyn754fddc7u72oks2m";
const DEFAULT_DOCUMENT =
  "https://slate.textile.io/ipfs/bafkreiecdiepww52i5q3luvp4ki2n34o6z3qkjmbk7pfhx4q654a4wxeam";
const DEFAULT_VIDEO =
  "https://slate.textile.io/ipfs/bafkreibesdtut4j5arclrxd2hmkfrv4js4cile7ajnndn3dcn5va6wzoaa";
const DEFAULT_AUDIO =
  "https://slate.textile.io/ipfs/bafkreig2hijckpamesp4nawrhd6vlfvrtzt7yau5wad4mzpm3kie5omv4e";

const STYLES_ROOT = css`
  display: block;
  min-height: 100vh;
  background-color: ${Constants.system.foreground};
`;

const STYLES_SLATE_INTRO = css`
  width: 100%;
  padding: 16px 32px 0px 32px;
  overflow-wrap: break-word;
  white-space: pre-wrap;
  flex-shrink: 0;
  display: block;
  width: 50%;

  @media (max-width: ${Constants.sizes.mobile}px) {
    padding: 24px 24px 0px 24px;
    width: 100%;
  }
`;

const STYLES_TITLELINE = css`
  display: flex;
  align-items: flex-end;
  line-height: 1.3;
  word-wrap: break-word;

  @media (max-width: ${Constants.sizes.mobile}px) {
    display: block;
    font-size: 14px;
  }
`;

const STYLES_CREATOR = css`
  flex-shrink: 0;
  margin-right: 4px;
  text-decoration: none;
  font-size: ${Constants.typescale.lvl3};
  color: ${Constants.system.black};
  font-family: ${Constants.font.medium};
  :hover {
    color: ${Constants.system.brand};
  }
`;

const STYLES_TITLE = css`
  font-size: ${Constants.typescale.lvl3};
  font-family: ${Constants.font.medium};
  font-weight: 400;
  color: ${Constants.system.black};
  width: auto;
  max-width: 100%;
  margin-right: 24px;
  word-wrap: break-word;

  @media (max-width: ${Constants.sizes.mobile}px) {
    font-size: ${Constants.typescale.lvl3};
  }
`;

const STYLES_DESCRIPTION = css`
  font-size: ${Constants.typescale.lvl0};
  color: ${Constants.system.darkGray};
  width: 100%;
  overflow-wrap: break-word;
  white-space: pre-wrap;
  margin-top: 16px;

  @media (max-width: ${Constants.sizes.mobile}px) {
    margin-top: 24px;
  }
`;

const STYLES_STATS = css`
  font-size: ${Constants.typescale.lvl0};
  margin: 16px 0;
  display: flex;
  width: 100%;
  color: ${Constants.system.grayBlack};
`;

const STYLES_STAT = css`
  margin-right: 16px;
  flex-shrink: 0;
`;

const STYLES_SLATE = css`
  padding: 0 32px;
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

export const FileTypeDefaultPreview = () => {
  if (props.type && props.type.startsWith("video/")) {
    return DEFAULT_VIDEO;
  }
  if (props.type && props.type.startsWith("audio/")) {
    return DEFAULT_AUDIO;
  }
  if (props.type && props.type.startsWith("application/epub")) {
    return DEFAULT_BOOK;
  }
  if (props.type && props.type.startsWith("application/pdf")) {
    return DEFAULT_DOCUMENT;
  }
  return DEFAULT_DATA;
};

export default class SlatePage extends React.Component {
  state = {
    visible: false,
  };

  componentDidMount() {
    if (!this.props.slate) {
      return null;
    }

    let CIDMap = {};
    Events.dispatchCustomEvent({
      name: "slate-global-create-carousel",
      detail: {
        carouselType: "slate",
        slides: this.props.slate.data.objects.map((each, index) => {
          const url = each.url;
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
        Events.dispatchCustomEvent({
          name: "slate-global-open-carousel",
          detail: {
            index,
            baseURL: `${this.props.creator.username}/${this.props.slate.slatename}`,
          },
        });
      }
    }
  }

  _handleSelect = (index) => {
    Events.dispatchCustomEvent({
      name: "slate-global-open-carousel",
      detail: {
        index,
        baseURL: `${this.props.creator.username}/${this.props.slate.slatename}`,
      },
    });
  };

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

    let image;
    if (Strings.isEmpty(this.props.cid)) {
      image = preview;
      if (Strings.isEmpty(image)) {
        for (let i = 0; i < objects.length; i++) {
          if (
            objects[i].type &&
            Validations.isPreviewableImage(objects[i].type) &&
            objects[i].size &&
            objects[i].size < SIZE_LIMIT
          ) {
            image = objects[i].url;
            break;
          }
        }
      }
    } else {
      let object = objects.find((each) => {
        const url = each.url;
        const cid = Strings.getCIDFromIPFS(url);
        return cid === this.props.cid;
      });

      if (object) {
        title = !Strings.isEmpty(object.title) ? object.title : this.props.cid;
        body = !Strings.isEmpty(object.body) ? Strings.elide(object.body) : `An object on ${url}`;
        image = object.type.includes("image/") ? (
          object.url
        ) : (
          <FileTypeDefaultPreview type={object.type} />
        );
        url = `${url}/cid:${this.props.cid}`;
      }
    }
    if (Strings.isEmpty(image)) {
      image = DEFAULT_IMAGE;
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
            <div css={STYLES_TITLELINE}>
              <a css={STYLES_CREATOR} href={`/${this.props.creator.username}`}>
                {slateCreator}
              </a>
              <div css={STYLES_TITLE}>{slateTitle} </div>
              <ButtonSecondary onClick={() => this.setState({ visible: true })}>
                Follow
              </ButtonSecondary>
            </div>
            <div css={STYLES_DESCRIPTION}>
              <ViewAllButton fullText={this.props.slate.data.body} maxCharacter={208}>
                <ProcessedText text={this.props.slate.data.body} />
              </ViewAllButton>
            </div>
            <div css={STYLES_STATS}>
              <div css={STYLES_STAT}>
                <div style={{ fontFamily: `${Constants.font.medium}` }}>
                  {this.props.slate.data.objects.length}{" "}
                  <span style={{ color: `${Constants.system.darkGray}` }}>Data</span>
                </div>
              </div>
              <div css={STYLES_STAT}>
                <div style={{ fontFamily: `${Constants.font.medium}` }}>
                  {contributorsCount}{" "}
                  <span style={{ color: `${Constants.system.darkGray}` }}>Contributors</span>
                </div>
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
                creator={this.props.creator}
                slate={this.props.slate}
              />
            )}
          </div>
        </div>
        <GlobalCarousel external current={this.props.slate} mobile={this.props.mobile} />
        <GlobalModal />
        {this.state.visible && (
          <div>
            <CTATransition
              onClose={() => this.setState({ visible: false })}
              viewer={this.props.viewer}
              open={this.state.visible}
              redirectURL={`/_${Strings.createQueryParams({
                scene: "V1_NAVIGATION_SLATE",
                user: this.props.creator.username,
                slate: this.props.slate.slatename,
              })}`}
            />
          </div>
        )}
        <WebsitePrototypeFooter />
      </WebsitePrototypeWrapper>
    );
  }
}
