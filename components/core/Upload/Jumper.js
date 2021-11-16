import * as React from "react";
import * as Jumper from "~/components/system/components/fragments/Jumper";
import * as System from "~/components/system";
import * as FileUtilities from "~/common/file-utilities";
import * as Logging from "~/common/logging";
import * as Strings from "~/common/strings";
import * as Styles from "~/common/styles";
import * as Constants from "~/common/constants";
import * as SVG from "~/common/svg";

import { css } from "@emotion/react";
import { useUploadContext } from "~/components/core/Upload/Provider";
import { useUploadOnboardingContext } from "~/components/core/Onboarding/Upload";

import DownloadExtensionButton from "~/components/core/Extension/DownloadExtensionButton";
import { useCheckIfExtensionIsInstalled } from "~/common/hooks";

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
  const { isExtensionDownloaded } = useCheckIfExtensionIsInstalled();

  const [isVisible, setVisibility] = React.useState(true);
  const hideExtensionBar = () => setVisibility(false);

  if (isExtensionDownloaded || !isVisible) return null;

  return (
    <Jumper.Item css={STYLES_EXTENSION_BAR}>
      <System.P2 color="textBlack">Save from anywhere on the Web</System.P2>
      <div css={Styles.HORIZONTAL_CONTAINER_CENTERED}>
        <DownloadExtensionButton style={{ minHeight: 24 }} />
        <button
          css={Styles.BUTTON_RESET}
          style={{ marginLeft: 16, color: Constants.semantic.textGray }}
          onClick={hideExtensionBar}
        >
          <SVG.Dismiss width={16} style={{ display: "block" }} />
        </button>
      </div>
    </Jumper.Item>
  );
}

const STYLES_LINK_INPUT = (theme) => css`
  width: 392px;
  border-radius: 12;
  background-color: ${theme.semantic.bgWhite};

  @media (max-width: ${theme.sizes.mobile}px) {
    width: 100%;
  }
`;

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

const STYLES_FILES_UPLOAD_WRAPPER = css`
  ${Styles.VERTICAL_CONTAINER_CENTERED};
  padding-top: 55px;
  padding-bottom: 55px;
`;

export function UploadJumper({ data }) {
  const onboardingContext = useUploadOnboardingContext();

  const [{ isUploadJumperVisible }, { upload, uploadLink, hideUploadJumper }] = useUploadContext();

  const [state, setState] = React.useState({
    url: "",
    urlError: false,
  });

  const handleUpload = (e) => {
    const { files } = FileUtilities.formatUploadedFiles({ files: e.target.files });
    upload({ files, slate: data });
    onboardingContext.goToNextStep();
    hideUploadJumper();
  };

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
    onboardingContext.goToNextStep();
    hideUploadJumper();
  };

  const handleChange = (e) => {
    setState((prev) => ({ ...prev, [e.target.name]: e.target.value, urlError: false }));
  };

  const isOnboarding = onboardingContext.currentStep === onboardingContext.steps.jumper;

  return (
    <Jumper.AnimatePresence>
      {isUploadJumperVisible ? (
        <Jumper.Root onClose={() => (onboardingContext.goToNextStep(), hideUploadJumper())}>
          <Jumper.Header>
            <System.H5 color="textBlack">Upload</System.H5>
          </Jumper.Header>
          <Jumper.Divider />
          {isOnboarding && <ExtensionBar />}
          <Jumper.Item css={STYLES_LINK_UPLOAD_WRAPPER}>
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
                containerStyle={{ maxWidth: 600 }}
                name="url"
                type="url"
                onChange={handleChange}
                onSubmit={handleUploadLink}
                autoFocus
              />
              <System.ButtonPrimary style={{ marginLeft: 8, width: 96 }} onClick={handleUploadLink}>
                Save
              </System.ButtonPrimary>
            </div>
          </Jumper.Item>
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
              style={{
                marginTop: 23,
                maxWidth: 122,
              }}
            >
              Select files
            </System.ButtonTertiary>
          </Jumper.Item>
        </Jumper.Root>
      ) : null}
    </Jumper.AnimatePresence>
  );
}
