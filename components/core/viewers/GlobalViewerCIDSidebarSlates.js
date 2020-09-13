import * as React from "react";
import * as SVG from "~/common/svg";
import * as Strings from "~/common/strings";
import * as Constants from "~/common/constants";

import { css } from "@emotion/react";
import { LoaderSpinner } from "~/components/system/components/Loaders";

const STYLES_CONTAINER = css`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: -ms-autohiding-scrollbar;
  padding-bottom: 88px;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const STYLES_META = css`
  padding: 14px 24px 8px 24px;
  overflow-wrap: break-word;
`;

const STYLES_META_TITLE = css`
  font-family: ${Constants.font.code};
  color: ${Constants.system.pitchBlack};
  font-size: 12px;
  text-decoration: none;
  transition: 200ms ease all;

  :visited {
    color: ${Constants.system.pitchBlack};
  }

  :hover {
    color: ${Constants.system.blue};
  }
`;

const STYLES_META_ITEM = css`
  display: inline-flex;
  margin-right: 24px;
  margin-bottom: 16px;
`;

const STYLES_META_DETAILS = css`
  font-family: ${Constants.font.code};
  font-size: 12px;
  text-transform: uppercase;
  margin-top: 24px;
`;

const STYLES_ITEM = css`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding-left: 24px;
  padding-bottom: 16px;
`;

const STYLES_LEFT = css`
  color: ${Constants.system.white};
  flex-shrink: 0;
  height: 36px;
  width: 36px;
  border-radius: 100%;
  background-color: ${Constants.system.pitchBlack};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const STYLES_RIGHT = css`
  min-width: 10%;
  width: 100%;
  padding: 0px 24px 0 16px;
  overflow-wrap: break-word;
`;

const STYLES_NAME = css`
  color: ${Constants.system.black};
`;

const STYLES_DESCRIPTION = css`
  font-family: ${Constants.font.code};
  color: ${Constants.system.black};
  font-size: 12px;
  text-transform: uppercase;
  margin-top: 4px;
  display: inline-block;
`;

const STYLES_ACTION = css`
  font-family: ${Constants.font.codeBold};
  cursor: pointer;
  margin-left: 24px;
  display: inline-block;

  :hover {
    color: ${Constants.system.blue};
  }
`;

const SlateItem = (props) => {
  return (
    <div css={STYLES_ITEM}>
      <div
        css={STYLES_LEFT}
        style={{
          backgroundColor: props.member ? null : Constants.system.gray,
        }}
      >
        {!props.loading ? (
          <SVG.Slate height="20px" />
        ) : (
          <LoaderSpinner style={{ height: 20, width: 20 }} />
        )}
      </div>
      <div css={STYLES_RIGHT}>
        <div
          css={STYLES_NAME}
          style={{
            fontFamily: props.member ? Constants.font.semiBold : null,
          }}
        >
          {Strings.getPresentationSlateName(props.slate)}
        </div>

        <div css={STYLES_DESCRIPTION}>
          {Strings.zeroPad(props.slate.data.objects.length, 4)}{" "}
          {Strings.pluralize("object", props.slate.data.objects.length)}{" "}
          {!props.member ? (
            <span
              css={STYLES_ACTION}
              onClick={() =>
                props.onAddToSlate({
                  id: props.id,
                  slate: props.slate,
                  data: props.data,
                })
              }
            >
              Add
            </span>
          ) : (
            <span
              css={STYLES_ACTION}
              onClick={() =>
                props.onRemoveFromSlate({
                  id: props.id,
                  slate: props.slate,
                  data: props.data,
                })
              }
            >
              Remove
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default class GlobalViewerCIDSidebarSlates extends React.Component {
  render() {
    const { id, cid, file, type, size } = this.props.data;

    const slateElements = this.props.slates.map((s) => {
      const hasElement = s.data.objects.some((o) => o.id === id);
      const loading =
        this.props.loading &&
        this.props.loading.id &&
        this.props.loading.id === s.id;

      return (
        <SlateItem
          key={s.id}
          id={id}
          data={this.props.data}
          slate={s}
          member={hasElement}
          loading={loading}
          onAddToSlate={loading ? () => {} : this.props.onAddToSlate}
          onRemoveFromSlate={loading ? () => {} : this.props.onRemoveFromSlate}
        />
      );
    });

    return (
      <div css={STYLES_CONTAINER}>
        <div css={STYLES_META}>
          <a
            css={STYLES_META_TITLE}
            target="_blank"
            href={Strings.getCIDGatewayURL(cid)}
          >
            {Strings.getCIDGatewayURL(cid)}
          </a>
          <div css={STYLES_META_DETAILS}>
            <span css={STYLES_META_ITEM}>{file}</span>{" "}
            <span css={STYLES_META_ITEM}>{type}</span>{" "}
            <span css={STYLES_META_ITEM}>{Strings.bytesToSize(size)}</span>
          </div>
        </div>
        {slateElements}
      </div>
    );
  }
}
