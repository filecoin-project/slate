import * as React from "react";
import * as Styles from "~/common/styles";
import * as System from "~/components/system";
import * as Jumper from "~/components/system/components/fragments/Jumper";
import * as SVG from "~/common/svg";
import * as Utilities from "~/common/utilities";
import * as Constants from "~/common/constants";
import * as Events from "~/common/custom-events";
import * as UserBehaviors from "~/common/user-behaviors";
import * as MobileJumper from "~/components/system/components/fragments/MobileJumper";

import { css } from "@emotion/react";
import { LoaderSpinner } from "~/components/system/components/Loaders";

/* -----------------------------------------------------------------------------------------------*/

const STYLES_SHARING_BUTTON = (theme) => css`
  ${Styles.HORIZONTAL_CONTAINER_CENTERED};
  padding: 9px 8px 11px;
  border-radius: 12px;
  width: 100%;
  :hover,
  :active {
    background-color: ${theme.semantic.bgGrayLight};
  }
  :hover {
    color: ${theme.semantic.textBlack};
  }

  @media (max-width: ${theme.sizes.mobile}px) {
    padding: 9px 0px 11px;
  }
`;
const getFileURL = ({ file }) => {
  const rootUrl = window?.location?.origin;

  return `${rootUrl}/_/view/${file.id}`;
};

function FileSharingButtons({ file, data, viewer }) {
  const fileName = file?.name || file?.filename;
  const username = data?.user?.username || viewer?.username;
  const fileLink = getFileURL({ file });
  const [copyState, setCopyState] = React.useState({ isCidCopied: false, isLinkCopied: false });

  const handleTwitterSharing = () =>
    window.open(
      `https://twitter.com/intent/tweet?text=${fileName} by ${username} on Slate%0D&url=${fileLink}`,
      "_blank"
    );

  const handleEmailSharing = () => {
    window.open(`mailto: ?subject=${fileName} by ${username} on Slate&body=${fileLink}`, "_b");
  };

  const handleLinkCopy = () => (
    Utilities.copyToClipboard(fileLink), setCopyState({ isLinkCopied: true })
  );
  const handleCidCopy = () => (
    Utilities.copyToClipboard(file.cid), setCopyState({ isCidCopied: true })
  );

  return (
    <>
      <System.ButtonPrimitive css={STYLES_SHARING_BUTTON} onClick={handleTwitterSharing} autoFocus>
        <SVG.Twitter width={20} />
        <System.P2 style={{ marginLeft: 12 }}>Share via Twitter</System.P2>
      </System.ButtonPrimitive>
      <System.ButtonPrimitive css={STYLES_SHARING_BUTTON} onClick={handleEmailSharing}>
        <SVG.Mail width={20} />
        <System.P2 style={{ marginLeft: 12 }}>Share via email </System.P2>
      </System.ButtonPrimitive>
      <System.ButtonPrimitive css={STYLES_SHARING_BUTTON} onClick={handleLinkCopy}>
        <SVG.Link width={20} />
        <System.P2 style={{ marginLeft: 12 }}>
          {copyState.isLinkCopied ? "Copied" : "Copy public link"}
        </System.P2>
      </System.ButtonPrimitive>
      <System.ButtonPrimitive css={STYLES_SHARING_BUTTON} onClick={handleCidCopy}>
        <SVG.Hexagon width={20} />
        <System.P2 style={{ marginLeft: 12 }}>
          {copyState.isCidCopied ? "Copied" : "Copy CID "}
        </System.P2>
      </System.ButtonPrimitive>
      <DownloadButton file={file} viewer={viewer} />
    </>
  );
}

/* -----------------------------------------------------------------------------------------------*/

const useFileDownload = ({ file, viewer, downloadRef }) => {
  const [isDownloading, setDownloadingState] = React.useState(false);
  const handleDownload = async () => {
    if (!viewer) {
      Events.dispatchCustomEvent({ name: "slate-global-open-cta", detail: {} });
      return;
    }
    setDownloadingState(true);
    const response = await UserBehaviors.download(file, downloadRef);
    setDownloadingState(false);
    Events.hasError(response);
  };

  return [isDownloading, handleDownload];
};

function DownloadButton({ file, viewer, ...props }) {
  /**NOTE(amine):  UserBehaviors.download creates a link and clicks it to trigger a download,
                   which triggers the Boundary component and closes the jumper. 
                   To fix this we create the link inside the downloadRef element */
  const downloadRef = React.useRef();
  const [isDownloading, handleDownload] = useFileDownload({ file, viewer, downloadRef });

  return !file.isLink ? (
    <div ref={downloadRef}>
      <System.ButtonPrimitive css={STYLES_SHARING_BUTTON} onClick={handleDownload} {...props}>
        {isDownloading ? (
          <LoaderSpinner style={{ height: 16, width: 16 }} />
        ) : (
          <SVG.Download width={16} />
        )}
        <System.P2 style={{ marginLeft: 12 }}>Download file</System.P2>
      </System.ButtonPrimitive>
    </div>
  ) : null;
}

/* -----------------------------------------------------------------------------------------------*/

const STYLES_SHARE_FILE_FOOTER = (theme) => css`
  ${Styles.HORIZONTAL_CONTAINER_CENTERED};
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  color: ${theme.semantic.textGrayDark};
  background-color: ${theme.semantic.bgWhite};
`;

const PROTO_SCHOOL_CID = "https://proto.school/anatomy-of-a-cid/01";

export function Share({ file, data, viewer, isOpen, onClose }) {
  return (
    <Jumper.AnimatePresence>
      {isOpen ? (
        <Jumper.Root onClose={onClose}>
          <Jumper.Header>
            <System.H5 color="textBlack">Share</System.H5>
            <Jumper.Dismiss />
          </Jumper.Header>
          <Jumper.Divider />
          <Jumper.ObjectInfo file={file} />
          <Jumper.Divider />
          <Jumper.Item style={{ padding: 12 }}>
            <FileSharingButtons file={file} data={data} viewer={viewer} />
          </Jumper.Item>
          <Jumper.Item css={STYLES_SHARE_FILE_FOOTER}>
            <a
              css={[Styles.LINK, Styles.HORIZONTAL_CONTAINER_CENTERED]}
              style={{ marginLeft: "auto", color: Constants.semantic.textGrayDark }}
              href={PROTO_SCHOOL_CID}
              target="_blank"
              rel="noreferrer"
            >
              <SVG.InfoCircle width={16} />
              <System.P2 style={{ marginLeft: 4 }}>What is a CID?</System.P2>
            </a>
          </Jumper.Item>
        </Jumper.Root>
      ) : null}
    </Jumper.AnimatePresence>
  );
}

export function ShareMobile({ file, data, viewer, isOpen, onClose }) {
  return (
    <MobileJumper.AnimatePresence>
      {isOpen ? (
        <MobileJumper.Root onClose={onClose}>
          <System.Divider height={1} color="borderGrayLight" />
          <MobileJumper.ObjectInfo file={file} />
          <System.Divider height={1} color="borderGrayLight" />
          <MobileJumper.Header>
            <System.H5 as="p" color="textBlack">
              Share
            </System.H5>
          </MobileJumper.Header>
          <System.Divider height={1} color="borderGrayLight" />
          <MobileJumper.Content>
            <FileSharingButtons file={file} data={data} viewer={viewer} />
          </MobileJumper.Content>
          <MobileJumper.Footer css={Styles.HORIZONTAL_CONTAINER_CENTERED}>
            <System.ButtonPrimitive
              type="button"
              style={{ width: 32, height: 32 }}
              onClick={onClose}
            >
              <SVG.Share width={16} height={16} style={{ color: Constants.system.blue }} />
            </System.ButtonPrimitive>
            <a
              css={[Styles.LINK, Styles.HORIZONTAL_CONTAINER_CENTERED]}
              style={{ marginLeft: "auto", color: Constants.semantic.textGrayDark }}
              href={PROTO_SCHOOL_CID}
              target="_blank"
              rel="noreferrer"
            >
              <SVG.InfoCircle width={16} />
              <System.P2 style={{ marginLeft: 4 }}>What is CID?</System.P2>
            </a>
          </MobileJumper.Footer>
        </MobileJumper.Root>
      ) : null}
    </MobileJumper.AnimatePresence>
  );
}
