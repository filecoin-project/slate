import * as React from "react";
import * as Jumper from "~/components/system/components/fragments/Jumper";
import * as MobileJumper from "~/components/system/components/fragments/MobileJumper";
import * as System from "~/components/system";
import * as FileUtilities from "~/common/file-utilities";
import * as Logging from "~/common/logging";
import * as Strings from "~/common/strings";
import * as Styles from "~/common/styles";
import * as Constants from "~/common/constants";
import * as SVG from "~/common/svg";

import { css } from "@emotion/react";
import { useUploadContext } from "~/components/core/Upload/Provider";
import { useUploadStore } from "~/components/core/Upload/store";
import { useUploadOnboardingContext } from "~/components/core/Onboarding/Upload";
import { useCheckIfExtensionIsInstalled, useLocalStorage } from "~/common/hooks";

import DownloadExtensionButton from "~/components/core/Extension/DownloadExtensionButton";

const STYLES_EXTENSION_BAR = (theme) => css`
  ${Styles.HORIZONTAL_CONTAINER_CENTERED};
  justify-content: space-between;

  background-color: ${theme.semantic.bgWhite};
  @supports ((-webkit-backdrop-filter: blur(75px)) or (backdrop-filter: blur(75px))) {
    -webkit-backdrop-filter: blur(75px);
    backdrop-filter: blur(75px);
    background-color: ${theme.semantic.bgBlurLight};
  }
`;

function ExtensionBar() {
  const localStorage = useLocalStorage("upload-jumper-extension-bar");

  const [isVisible, setVisibility] = React.useState(JSON.parse(localStorage.getItem() || true));
  const hideExtensionBar = () => (setVisibility(false), localStorage.setItem(false));

  const { isExtensionDownloaded } = useCheckIfExtensionIsInstalled();
  if (isExtensionDownloaded || !isVisible) return null;

  return (
    <Jumper.Item css={STYLES_EXTENSION_BAR}>
      <System.P2 color="textBlack">Save from anywhere on the Web</System.P2>
      <div css={Styles.HORIZONTAL_CONTAINER_CENTERED}>
        <DownloadExtensionButton style={{ minHeight: 24, borderRadius: "8px" }} />
        <System.ButtonPrimitive
          style={{ marginLeft: 16, color: Constants.semantic.textGray }}
          onClick={hideExtensionBar}
        >
          <SVG.Dismiss width={16} style={{ display: "block" }} />
        </System.ButtonPrimitive>
      </div>
    </Jumper.Item>
  );
}

/* -----------------------------------------------------------------------------------------------*/

const STYLES_LINK_INPUT = (theme) => css`
  background-color: ${theme.semantic.bgWhite};
  width: calc(100% - 8px);
  margin-right: 8px;
`;

const STYLES_FILES_UPLOAD_WRAPPER = css`
  ${Styles.VERTICAL_CONTAINER_CENTERED};
  padding-top: 55px;
  padding-bottom: 55px;
`;

function LinkForm({ data }) {
  const { uploadLink } = useUploadStore((store) => store.handlers);
  const [, { hideUploadJumper }] = useUploadContext();
  const onboardingContext = useUploadOnboardingContext();

  const [state, setState] = React.useState({
    url: "",
    urlError: false,
  });
  const handleChange = (e) =>
    setState((prev) => ({ ...prev, [e.target.name]: e.target.value, urlError: false }));

  const handleUploadLink = () => {
    if (Strings.isEmpty(state.url)) {
      setState((prev) => ({ ...prev, urlError: true }));
      return;
    }
    try {
      new URL(state.url);
    } catch (e) {
      Logging.error(e);
      setState((prev) => ({ ...prev, urlError: true }));
      return;
    }

    uploadLink({ url: state.url, slate: data });
    setState({ url: "", urlError: false });
    onboardingContext?.goToNextStep?.();
    hideUploadJumper();
  };

  return (
    <div css={Styles.HORIZONTAL_CONTAINER}>
      <System.Input
        placeholder="Paste a link to save"
        value={state.url}
        inputCss={STYLES_LINK_INPUT}
        style={{
          boxShadow: state.urlError
            ? `0 0 0 1px ${Constants.system.red} inset`
            : `${Constants.shadow.lightSmall}, 0 0 0 1px ${Constants.semantic.bgGrayLight} inset`,
        }}
        name="url"
        type="url"
        onChange={handleChange}
        onSubmit={handleUploadLink}
        full
        autoFocus
      />
      <System.ButtonPrimary onClick={handleUploadLink}>Save</System.ButtonPrimary>
    </div>
  );
}

/* -------------------------------------------------------------------------------------------------
 *  UploadJumper
 * -----------------------------------------------------------------------------------------------*/

const STYLES_FILE_HIDDEN = css`
  height: 1px;
  width: 1px;
  opacity: 0;
  visibility: hidden;
  position: fixed;
  top: -1px;
  left: -1px;
`;

const STYLES_LINK_UPLOAD_WRAPPER = css`
  padding: 50px 72px;
`;

const useFileUpload = ({ onUpload, data }) => {
  const { upload } = useUploadStore((store) => store.handlers);
  const [, { hideUploadJumper }] = useUploadContext();

  const handleUpload = (e) => {
    const { files } = FileUtilities.formatUploadedFiles({ files: e.target.files });
    upload({ files, slate: data });
    onUpload?.();
    hideUploadJumper();
  };

  return { handleUpload };
};

export function UploadJumper({ data }) {
  const [{ isUploadJumperVisible }, { hideUploadJumper }] = useUploadContext();

  const onboardingContext = useUploadOnboardingContext();

  const { handleUpload } = useFileUpload({ data, onUpload: onboardingContext?.goToNextStep });
  const handleSelectFileKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.target.click();
      e.preventDefault();
    }
  };

  return (
    <Jumper.AnimatePresence>
      {isUploadJumperVisible ? (
        <Jumper.Root
          role="dialog"
          aria-modal="true"
          aria-labelledby="upload-jumper"
          onClose={() => (onboardingContext.goToNextStep(), hideUploadJumper())}
        >
          <Jumper.Header>
            <System.H5 color="textBlack" id="upload-jumper">
              Upload
            </System.H5>
            <Jumper.Dismiss />
          </Jumper.Header>
          <Jumper.Divider />
          <ExtensionBar />
          <Jumper.Item css={STYLES_LINK_UPLOAD_WRAPPER}>
            <LinkForm data={data} />
          </Jumper.Item>
          <div>
            <Jumper.Divider />
            <Jumper.Item css={STYLES_FILES_UPLOAD_WRAPPER}>
              <input
                css={STYLES_FILE_HIDDEN}
                multiple
                type="file"
                id="file"
                onChange={handleUpload}
              />
              <System.H5 color="textGrayDark" as="p" style={{ textAlign: "center" }}>
                Drop or select files to save to Slate
                <br />
                <System.P3 color="textGrayDark" as="span">
                  (we recommend uploading fewer than 200 files at a time)
                </System.P3>
              </System.H5>
              <System.ButtonTertiary
                type="label"
                htmlFor="file"
                tabindex={0}
                onKeyDown={handleSelectFileKeyDown}
                style={{
                  marginTop: 23,
                  maxWidth: 122,
                }}
              >
                Select files
              </System.ButtonTertiary>
            </Jumper.Item>
          </div>
        </Jumper.Root>
      ) : null}
    </Jumper.AnimatePresence>
  );
}

/* -------------------------------------------------------------------------------------------------
 *  MobileUploadJumper
 * -----------------------------------------------------------------------------------------------*/

export function MobileUploadJumper({ data }) {
  const [{ isUploadJumperVisible }, { hideUploadJumper }] = useUploadContext();

  const onboardingContext = useUploadOnboardingContext();

  return (
    <MobileJumper.AnimatePresence>
      {isUploadJumperVisible ? (
        <MobileJumper.Root onClose={() => (onboardingContext.goToNextStep(), hideUploadJumper())}>
          <MobileJumper.Header>
            <System.H5 color="textBlack">Upload</System.H5>
            <MobileJumper.Dismiss />
          </MobileJumper.Header>
          <MobileJumper.Divider color="borderGrayLight" />
          <MobileJumper.Content style={{ padding: 0 }}>
            <div style={{ padding: "40px 16px" }}>
              <LinkForm data={data} />
            </div>
            <MobileJumper.Divider />
            <div style={{ padding: "40px 16px", textAlign: "center" }}>
              <SVG.Airplay color="textBlack" />
              <System.H5 as="p" color="textGrayDark" style={{ marginTop: 6, textAlign: "center" }}>
                open Slate on desktop to upload files
              </System.H5>
            </div>
          </MobileJumper.Content>
        </MobileJumper.Root>
      ) : null}
    </MobileJumper.AnimatePresence>
  );
}
