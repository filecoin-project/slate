import * as React from "react";
import * as Strings from "~/common/strings";
import * as Constants from "~/common/constants";
import * as System from "~/components/system";
import * as Validations from "~/common/validations";
import * as Actions from "~/common/actions";
import * as Events from "~/common/custom-events";

import { css } from "@emotion/react";

const STYLES_HEADER = css`
  font-family: ${Constants.font.semiBold};
  margin-bottom: 8px;
`;

const STYLES_GROUPING = css`
  width: 100%;
  border: 1px solid rgba(196, 196, 196, 0.5);
  background-color: ${Constants.system.white};
  border-radius: 6px;
  padding: 16px;
  margin-bottom: 24px;
`;

const STYLES_TEXT = css`
  line-height: 1.5;
  color: ${Constants.system.textGray};
  font-size: ${Constants.typescale.lvl0};
`;

export default class SidebarFAQ extends React.Component {
  _handleSubmit = async () => {
    this.props.onAction({ type: "SIDEBAR", value: "SIDEBAR_HELP" });
  };

  render() {
    return (
      <div style={{ marginBottom: 64 }}>
        <System.P
          style={{
            fontFamily: Constants.font.semiBold,
            fontSize: Constants.typescale.lvl3,
            marginBottom: 36,
          }}
        >
          FAQ
        </System.P>

        <div css={STYLES_GROUPING}>
          <System.P css={STYLES_HEADER}>What is Slate?</System.P>
          <System.P css={STYLES_TEXT}>
            Slate is the first public file storage network designed for research and collaboration.
            It is an open source alternative to services like Dropbox and Google Drive, and is built
            on IPFS and Textile’s Powergate.
          </System.P>
        </div>
        <div css={STYLES_GROUPING}>
          <System.P css={STYLES_HEADER}>What can I use it for?</System.P>
          <System.P css={STYLES_TEXT}>
            Slate is a modern solution for storing and sharing files on the web. It provides you
            with a suite of tools that allow you to easily create moodboards, organize research, and
            create archives with your files all in one space. Slate supports most file types for
            images, videos, audio, and documents.
          </System.P>
        </div>
        <div css={STYLES_GROUPING}>
          <System.P css={STYLES_HEADER}>What makes Slate different?</System.P>
          <System.P css={STYLES_TEXT}>
            Besides being built with technologies designed around trust and transparency, Slate is
            the first storage application that also works as a social file sharing network. This
            makes it so that you can seamlessly search and access files that are shared publicly on
            the network by other people.
          </System.P>
        </div>

        <div css={STYLES_GROUPING}>
          <System.P css={STYLES_HEADER}>When will more storage be available?</System.P>
          <System.P css={STYLES_TEXT}>
            50GB of storage free will be coming to Slate soon with email verification!
          </System.P>
        </div>

        <div css={STYLES_GROUPING}>
          <System.P css={STYLES_HEADER}>Can I get involved?</System.P>
          <System.P css={STYLES_TEXT}>
            Yes! All of Slate is built out in the open by a community of contributors around the
            world. Join our Slack or head over to our GitHub to get in on the action.
          </System.P>
        </div>

        <div css={STYLES_GROUPING}>
          <System.P
            css={STYLES_TEXT}
            style={{ color: Constants.system.brand, cursor: "pointer" }}
            onClick={() => this.props.onAction({ type: "SIDEBAR", value: "SIDEBAR_HELP" })}
          >
            Still have questions? Send us a message!
          </System.P>
        </div>
      </div>
    );
  }
}
