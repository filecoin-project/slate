import * as React from "react";
import * as Constants from "~/common/constants";
import * as Styles from "~/common/styles";
import * as UserBehaviors from "~/common/user-behaviors";
import * as Strings from "~/common/strings";

import { PopoverNavigation } from "~/components/system";
import { css } from "@emotion/react";
import { Link } from "~/components/core/Link";
import { Boundary } from "~/components/system/components/fragments/Boundary";
import { H4, P3 } from "~/components/system/components/Typography";

import ProfilePhoto from "~/components/core/ProfilePhoto";
import DataMeter from "~/components/core/DataMeter";
import DownloadExtensionButton from "~/components/core/Extension/DownloadExtensionButton";

const STYLES_HEADER = css`
  position: relative;

  @media (max-width: ${Constants.sizes.mobile}px) {
    padding: 0px;
    width: auto;
  }
`;

const STYLES_PROFILE_MOBILE = css`
  display: flex;
  align-items: center;
`;

const STYLES_POPOVER_CONTANIER = (theme) => css`
  padding: 16px 20px;
  border-radius: 16px;
  border: 1px solid ${theme.semantic.borderGrayLight4};
  box-shadow: ${theme.shadow.lightLarge};

  @supports ((-webkit-backdrop-filter: blur(75px)) or (backdrop-filter: blur(75px))) {
    background-color: ${theme.semantic.bgBlurWhite};
    -webkit-backdrop-filter: blur(75px);
    backdrop-filter: blur(75px);
  }
`;

const STYLES_POPOVER_SECTION = (theme) => css`
  border-top: 1px solid ${theme.semantic.borderGrayLight4};
  border-bottom: none;
  padding: 0;
  margin: 0;
  padding-top: 8px;
  padding-bottom: 8px;

  p {
    display: block;
    width: 100%;
  }

  :last-child {
    padding-bottom: 0px;
  }

  * + * {
    margin-top: 4px;
  }
`;

const STYLES_POPOVER_SECTION_ITEM = (theme) => css`
  position: relative;
  padding: 0px;
  width: calc(100% + 16px);
  left: -8px;
  a {
    display: block;
  }
`;

const STYLES_SECTION_ITEM_HOVER = (theme) => css`
  padding: 1px 8px 3px;
  border-radius: 8px;
  &:hover {
    background-color: ${theme.system.grayLight4};
  }
`;

export class ApplicationUserControlsPopup extends React.Component {
  _handleAction = (props) => {
    this.props.onTogglePopup();
    this.props.onAction(props);
  };

  _handleSignOut = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.props.onTogglePopup();
    UserBehaviors.signOut({ viewer: this.props.viewer });
  };

  render() {
    if (this.props.popup !== "profile") return null;

    const username = this.props.viewer.name || `@${this.props.viewer.username}`;
    const objectsLength = this.props.viewer.library.length;
    const { stats } = this.props.viewer;

    const topSection = (
      <Link href="/_/data" onAction={this._handleAction}>
        <div style={{ marginBottom: 16 }} css={Styles.VERTICAL_CONTAINER_CENTERED}>
          <ProfilePhoto user={this.props.viewer} style={{ borderRadius: "12px" }} size={48} />
          <H4 color="textBlack" style={{ marginTop: 10 }}>
            {username}
          </H4>
          <div style={{ marginTop: 6 }} css={Styles.HORIZONTAL_CONTAINER}>
            <P3 color="textBlack" style={{ marginRight: 8 }}>
              {objectsLength} {Strings.pluralize("Object", objectsLength)}
            </P3>
            <P3 color="textBlack" style={{ marginLeft: 8 }}>
              {Strings.bytesToSize(stats.bytes, 0)} of {Strings.bytesToSize(stats.maximumBytes, 0)}{" "}
              Stored
            </P3>
          </div>
          <DataMeter
            bytes={stats.bytes}
            maximumBytes={stats.maximumBytes}
            style={{ minWidth: "240px", marginTop: 8 }}
          />
        </div>
      </Link>
    );

    const navigation = [
      [
        {
          text: (
            <div css={STYLES_SECTION_ITEM_HOVER}>
              <Link href={`/$/user/${this.props.viewer.id}`} onAction={this._handleAction}>
                Profile
              </Link>
            </div>
          ),
        },
        {
          text: (
            <div css={STYLES_SECTION_ITEM_HOVER}>
              <Link href={"/_/directory"} onAction={this._handleAction}>
                Directory
              </Link>
            </div>
          ),
        },
      ],
      [
        {
          text: (
            <div css={STYLES_SECTION_ITEM_HOVER}>
              <Link href={"/_/api"} onAction={this._handleAction}>
                API
              </Link>
            </div>
          ),
        },
      ],
      [
        {
          text: (
            <div css={STYLES_SECTION_ITEM_HOVER}>
              <Link href={"/_/settings"} onAction={this._handleAction}>
                Settings
              </Link>
            </div>
          ),
        },
        {
          text: <div css={STYLES_SECTION_ITEM_HOVER}> Sign out</div>,
          onClick: (e) => {
            this._handleSignOut(e);
          },
        },
        {
          text: (
            <div css={Styles.MOBILE_HIDDEN}>
              <DownloadExtensionButton full style={{ marginTop: "4px", marginBottom: "28px" }} />
            </div>
          ),
        },
      ],
    ];

    return (
      <>
        <div css={Styles.MOBILE_ONLY}>
          <Boundary
            captureResize={true}
            captureScroll={false}
            enabled={this.props.popup === "profile"}
            onOutsideRectEvent={() => this.props.onTogglePopup()}
          >
            <PopoverNavigation
              style={{
                position: "relative",
                border: "none",
                boxShadow: "none",
                background: "none",
                pointerEvents: "auto",
              }}
              containerCss={STYLES_POPOVER_CONTANIER}
              sectionCss={STYLES_POPOVER_SECTION}
              sectionItemCss={STYLES_POPOVER_SECTION_ITEM}
              css={Styles.H4}
              itemStyle={{ fontSize: Constants.typescale.lvl0 }}
              topSection={topSection}
              navigation={navigation}
            />
          </Boundary>
        </div>
        <div css={Styles.MOBILE_HIDDEN}>
          <Boundary
            captureResize={true}
            captureScroll={false}
            enabled={this.props.popup === "profile"}
            onOutsideRectEvent={() => this.props.onTogglePopup()}
          >
            <PopoverNavigation
              style={{
                top: 34,
                left: "-12px",
                width: "max-content",
              }}
              containerCss={STYLES_POPOVER_CONTANIER}
              sectionCss={STYLES_POPOVER_SECTION}
              sectionItemCss={STYLES_POPOVER_SECTION_ITEM}
              css={Styles.H4}
              itemStyle={{ fontSize: Constants.typescale.lvl0 }}
              topSection={topSection}
              navigation={navigation}
            />
          </Boundary>
        </div>
      </>
    );
  }
}

export class ApplicationUserControls extends React.Component {
  render() {
    let tooltip = <ApplicationUserControlsPopup {...this.props} />;
    return (
      <div css={STYLES_HEADER}>
        <button
          css={[Styles.BUTTON_RESET, STYLES_PROFILE_MOBILE]}
          onClick={() => this.props.onTogglePopup("profile")}
          style={{ position: "relative", cursor: "pointer" }}
        >
          <ProfilePhoto user={this.props.viewer} style={{ borderRadius: "8px" }} size={24} />
        </button>
        {this.props.popup === "profile" ? tooltip : null}
      </div>
    );
  }
}
