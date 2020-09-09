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
  border-bottom: 1px solid #222222;
`;

const STYLES_META_TITLE = css`
  font-family: ${Constants.font.code};
  font-size: 14px;
`;

const STYLES_META_ITEM = css`
  display: inline-flex;
  margin-right: 24px;
  margin-bottom: 16px;
`;

const STYLES_META_DETAILS = css`
  font-size: 12px;
  text-transform: uppercase;
  font-family: ${Constants.font.code};
  color: #777;
  margin-top: 24px;
`;

const STYLES_ITEM = css`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

const STYLES_LEFT = css`
  flex-shrink: 0;
  padding: 24px;
  color: ${Constants.system.darkGray};
`;

const STYLES_RIGHT = css`
  min-width: 10%;
  width: 100%;
  padding: 24px 24px 0 0px;
  overflow-wrap: break-word;
`;

const STYLES_NAME = css`
  color: ${Constants.system.darkGray};
`;

const STYLES_DESCRIPTION = css`
  font-family: ${Constants.font.code};
  color: ${Constants.system.darkGray};
  font-size: 12px;
  text-transform: uppercase;
  margin-top: 8px;
  display: inline-block;
`;

const STYLES_ACTION = css`
  color: ${Constants.system.white};
  font-family: ${Constants.font.codeBold};
  cursor: pointer;
  margin-left: 24px;
  display: inline-block;

  :hover {
    color: ${Constants.system.brand};
  }
`;

const SlateItem = (props) => {
  return (
    <div css={STYLES_ITEM}>
      <div
        css={STYLES_LEFT}
        style={{
          color: props.member ? Constants.system.white : null,
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
            color: props.member ? Constants.system.white : null,
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

export default class SlateMediaObjectSidebarDataManager extends React.Component {
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
          <div css={STYLES_META_TITLE}>{cid}</div>
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
