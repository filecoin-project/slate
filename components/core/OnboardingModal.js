import * as React from "react";
import * as Constants from "~/common/constants";
import * as Actions from "~/common/actions";
import * as Events from "~/common/custom-events";

import { css } from "@emotion/react";
import { ButtonPrimary } from "~/components/system/components/Buttons";

const STYLES_MODAL = css`
  text-align: center;
  padding-bottom: 64px;
  box-sizing: border-box;
  max-width: 680px;
  width: 95vw;
  min-height: 630px;
  border-radius: 4px;
  background-color: ${Constants.system.white};
  overflow: hidden;
  box-shadow: 0 0 60px 8px rgba(0, 0, 0, 0.03);
`;

const STYLES_BUTTON_SECONDARY = {
  backgroundColor: Constants.system.white,
  boxShadow: `0 0 0 1px ${Constants.system.brand} inset`,
  color: Constants.system.brand,
  marginRight: 16,
  width: 160,
  textDecoration: `none`,
};

const STYLES_IMAGE = css`
  width: 100%;
  background-color: ${Constants.system.black};
`;

const STYLES_TITLE = css`
  font-family: ${Constants.font.semiBold};
  font-size: 32px;
  padding-top: 40px;
  margin-bottom: 16px;
`;

const STYLES_TEXT = css`
  font-family: ${Constants.font.text};
  font-size: 18px;
  margin-bottom: 24px;
  padding: 0 64px;
`;

const STYLES_LINK = css`
  text-decoration: none;
  color: ${Constants.system.white};

  :visited {
    color: ${Constants.system.white};
  }
`;

export const announcements = ["New On Slate: Grid System 2.0"];

export class OnboardingModal extends React.Component {
  state = {
    step: 0,
    slides: [],
  };

  componentDidMount = () => {
    Actions.updateStatus({ onboarding: this.props.unseenAnnouncements });
    let slides = [];
    if (this.props.newAccount) {
      slides = this.onboardingCopy;
    }
    for (let feature of this.announcements) {
      if (this.props.unseenAnnouncements.includes(feature.title)) {
        slides.push(feature);
      }
    }
    if (!slides.length) {
      Events.dispatchCustomEvent({
        name: "delete-modal",
        detail: {},
      });
    }
    this.setState({ slides });
  };

  announcements = [
    {
      title: "New On Slate: Grid System 2.0",
      text:
        "We just introduced a completely new layout engine that gives you total control over the way you can organize and display your slates.",
      image: (
        <img
          src="https://slate.textile.io/ipfs/bafybeigb7pd2dh64ty7l2yhnzu5kjupgxbfzqzjjb2gtprexfxzkwx4nle"
          alt="grid layout"
          css={STYLES_IMAGE}
        />
      ),
      button: (
        <ButtonPrimary style={{ width: 160 }} onClick={() => this._handleClick(1)}>
          Try it out
        </ButtonPrimary>
      ),
    },
  ];

  onboardingCopy = [
    {
      title: "Welcome to Slate",
      text:
        "Slate is a distributed file-sharing network designed for private and public storage. Drag and drop your files into the app to easily start uploading your books, images, and documents.",
      image: (
        <img
          src="https://slate.textile.io/ipfs/bafybeih4yqlefcbvuuhuyddg5vyfcm7latyifexzynmnbep4dx5hapbbjq"
          alt=""
          css={STYLES_IMAGE}
        />
      ),
      button: (
        <ButtonPrimary style={{ width: 160 }} onClick={() => this._handleClick(1)}>
          Got it
        </ButtonPrimary>
      ),
    },
    {
      title: "Upload from Anywhere",
      text:
        "Use the Slate Chrome extension to upload images and screenshots to your account from anywhere on the web.",
      image: (
        <img
          src="https://slate.textile.io/ipfs/bafybeifchvk6cxi4yl3twlontxlpkff623pcz2lhukrlzwor5rioviqsea"
          alt=""
          css={STYLES_IMAGE}
        />
      ),
      button: (
        <React.Fragment>
          <a
            href="https://chrome.google.com/webstore/detail/slate/gloembacbehhbfbkcfjmloikeeaebnoc"
            target="_blank"
            style={{ textDecoration: `none` }}
          >
            <ButtonPrimary style={STYLES_BUTTON_SECONDARY}>Get extension</ButtonPrimary>
          </a>
          <ButtonPrimary style={{ width: 160 }} onClick={() => this._handleClick(1)}>
            Next
          </ButtonPrimary>
        </React.Fragment>
      ),
    },
    {
      title: "Organize and share",
      text:
        "Organize your files into slates to organize research, create mood boards, and collect your thoughts to share with other people.",
      image: (
        <img
          src="https://slate.textile.io/ipfs/bafybeiaiy3c72sdirjj24vvev7xpuvvqckwip3ot7l4u4iaxdlnbp4hqae"
          alt=""
          css={STYLES_IMAGE}
        />
      ),
      button: (
        <ButtonPrimary style={{ width: 160 }} onClick={() => this._handleClick(1)}>
          Start using Slate
        </ButtonPrimary>
      ),
    },
  ];

  _handleClick = (i) => {
    if (this.state.step + i >= this.state.slides.length) {
      Events.dispatchCustomEvent({
        name: "delete-modal",
        detail: {},
      });
    } else {
      this.setState({ step: this.state.step + i });
    }
  };

  render() {
    if (!this.state.slides || !this.state.slides.length) {
      return null;
    }

    return (
      <div>
        <div css={STYLES_MODAL}>
          <div>
            {this.state.slides[this.state.step].image}
            <div css={STYLES_TITLE}>{this.state.slides[this.state.step].title}</div>
            <div css={STYLES_TEXT}>{this.state.slides[this.state.step].text}</div>
            {this.state.slides[this.state.step].button}
          </div>
        </div>
      </div>
    );
  }
}
