import * as React from "react";
import * as Constants from "~/common/constants";
import * as Styles from "~/common/styles";
import * as UserBehaviors from "~/common/user-behaviors";
import * as Strings from "~/common/strings";
import * as Environment from "~/common/environment";
import * as Utilities from "~/common/utilities";

import { ButtonPrimaryFull, PopoverNavigation } from "~/components/system";
import { css } from "@emotion/react";
import { Link } from "~/components/core/Link";
import { Boundary } from "~/components/system/components/fragments/Boundary";
import { H4, P3 } from "~/components/system/components/Typography";

import ProfilePhoto from "~/components/core/ProfilePhoto";
import DataMeter from "~/components/core/DataMeter";
import * as Settings from "~/components/core/Settings";

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
  padding: 20px;
  border-radius: 16px;
  border: 1px solid ${theme.semantic.borderGrayLight};
  box-shadow: ${theme.shadow.lightLarge};

  @supports ((-webkit-backdrop-filter: blur(75px)) or (backdrop-filter: blur(75px))) {
    background-color: ${theme.semantic.bgBlurWhite};
    -webkit-backdrop-filter: blur(75px);
    backdrop-filter: blur(75px);
  }

  @media (max-width: ${theme.sizes.mobile}px) {
    padding: 16px;
  }
`;

const STYLES_POPOVER_SECTION = (theme) => css`
  border-top: 1px solid ${theme.semantic.borderGrayLight4};
  border-bottom: none;
  padding: 8px 0;
  margin: 0;

  p {
    display: block;
    width: 100%;
  }

  :last-child {
    padding-bottom: 0px;
  }
`;

const STYLES_POPOVER_SECTION_ITEM = (theme) => css`
  position: relative;
  width: calc(100% + 16px);
  left: -8px;
  a {
    display: block;
  }

  @media (max-width: ${Constants.sizes.mobile}px) {
    margin: 8px 0;
  }
`;

const STYLES_SECTION_ITEM_HOVER = (theme) => css`
  padding: 5px 8px 7px;
  border-radius: 8px;
  &:hover {
    background-color: ${theme.semantic.bgGrayLight};
  }
`;

export class ApplicationUserControlsPopup extends React.Component {
  state = {
    isExtensionDownloaded: false,
  };

  componentDidMount() {
    if (document) {
      const isExtensionDownloaded = this._checkIfExtensionIsDownloaded();
      this.setState({ isExtensionDownloaded });
    }
  }

  _checkIfExtensionIsDownloaded = () => {
    const extensionElement = document.getElementById("browser_extension");
    if (!extensionElement) return false;
    return extensionElement.className.includes("isDownloaded");
  };

  _handleExtensionDownloadLink = () => {
    const testUserAgent = (regex) => regex.test(window.navigator.userAgent);

    const isFirefox = testUserAgent(/firefox/i);
    const firefoxLink = Environment.EXTENSION_FIREFOX;
    if (isFirefox && firefoxLink) return window.open(firefoxLink, "_blank");

    const isSafari = testUserAgent(/safari/i);
    const safariLink = Environment.EXTENSION_SAFARI;
    if (isSafari && safariLink) return window.open(safariLink, "_blank");

    window.open(Environment.EXTENSION_CHROME, "_blank");
  };

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

    const username = Utilities.getUserDisplayName(this.props.viewer);
    const objectsLength = this.props.viewer.library.length;
    const { stats } = this.props.viewer;

    const topSection = (
      <Link href="/_/data" onAction={this._handleAction}>
        <div
          css={Styles.VERTICAL_CONTAINER_CENTERED}
          style={{ marginBottom: 16, ...this.props.style }}
        >
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

    const ExtensionButton = (
      <div css={Styles.MOBILE_HIDDEN}>
        <ButtonPrimaryFull
          style={{
            padding: "5px 24px 7px",
            marginTop: "8px",
          }}
          onClick={this._handleExtensionDownloadLink}
        >
          Install Slate browser extension
        </ButtonPrimaryFull>
      </div>
    );

    const navigation = [
      [
        {
          text: (
            <div css={STYLES_SECTION_ITEM_HOVER}>
              <Link href={`/$/user/${this.props.viewer.id}`} onAction={this._handleAction}>
                Home
              </Link>
            </div>
          ),
        },
        // {
        //   text: (
        //     <div css={STYLES_SECTION_ITEM_HOVER}>
        //       <Link href={"/_/directory"} onAction={this._handleAction}>
        //         Directory
        //       </Link>
        //     </div>
        //   ),
        // },
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
        {
          text: (
            <div css={STYLES_SECTION_ITEM_HOVER}>
              <Settings.Provider>
                <Settings.Root viewer={this.props.viewer}>
                  <Settings.Trigger>
                    Settings
                  </Settings.Trigger>
                </Settings.Root>
              </Settings.Provider> 
            </div>
          ),
        },
        {
          text: <div css={STYLES_SECTION_ITEM_HOVER}> Sign out</div>,
          onClick: (e) => {
            this._handleSignOut(e);
          },
        },
        ...(!this.state.isExtensionDownloaded ? [{ text: ExtensionButton }] : []),
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
