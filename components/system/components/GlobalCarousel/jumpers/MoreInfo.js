/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import * as React from "react";
import * as Styles from "~/common/styles";
import * as System from "~/components/system";
import * as Jumper from "~/components/system/components/fragments/Jumper";
import * as SVG from "~/common/svg";
import * as Strings from "~/common/strings";
import * as Utilities from "~/common/utilities";
import * as Actions from "~/common/actions";
import * as Events from "~/common/custom-events";
import * as UserBehaviors from "~/common/user-behaviors";
import * as Constants from "~/common/constants";
import * as FileUtilities from "~/common/file-utilities";
import * as Validations from "~/common/validations";
import * as MobileJumper from "~/components/system/components/fragments/MobileJumper";

import { LoaderSpinner } from "~/components/system/components/Loaders";
import { Show } from "~/components/utility/Show";
import { css } from "@emotion/react";
import { useEventListener } from "~/common/hooks";
import { AnimatePresence, motion } from "framer-motion";
import { FocusRing } from "~/components/core/FocusRing";

const useCoverImgDrop = ({ onUpload, enabled, ref }) => {
  const [isDropping, setDroppingState] = React.useState(false);

  const handleDragEnter = (e) => (e.preventDefault(), e.stopPropagation(), setDroppingState(true));
  const handleDragLeave = (e) => (e.preventDefault(), e.stopPropagation());

  const timerRef = React.useRef();
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // NOTE(amine): Hack to hide the indicator if the user drags files outside of the drop zone
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setDroppingState(false);
    }, 100);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const { files, error } = await FileUtilities.formatDroppedFiles({
      dataTransfer: e.dataTransfer,
    });

    if (error) return null;

    const coverImg = files[0];
    onUpload(coverImg);
  };

  useEventListener({ type: "dragenter", handler: handleDragEnter, enabled, ref }, []);
  useEventListener({ type: "dragleave", handler: handleDragLeave, enabled, ref }, []);
  useEventListener({ type: "dragover", handler: handleDragOver, enabled, ref }, []);
  useEventListener({ type: "drop", handler: handleDrop, enabled, ref }, []);
  return { isDroppingCoverImg: isDropping };
};

const useCoverImgUpload = ({ file, viewer }) => {
  const [isUploading, setUploadingState] = React.useState(false);

  const handleCoverImgUpload = async (coverImg) => {
    let previousCoverId = file.coverImage?.id;
    setUploadingState(true);
    let coverImage = await UserBehaviors.uploadImage(coverImg);
    if (!coverImage) {
      setUploadingState(false);
      return;
    }

    //TODO(martina): create an endpoint specifically for cover images instead of this, which will delete original cover image etc
    let updateReponse = await Actions.updateFile({
      id: file.id,
      coverImage,
    });

    setUploadingState(false);
    if (Events.hasError(updateReponse)) return;

    if (previousCoverId) {
      if (!viewer.library.some((obj) => obj.id === previousCoverId)) {
        await UserBehaviors.deleteFiles(previousCoverId, true);
      }
    }
  };

  return [{ isUploadingCoverImg: isUploading }, { handleCoverImgUpload: handleCoverImgUpload }];
};

const STYLES_FILE_HIDDEN = css`
  height: 1px;
  width: 1px;
  opacity: 0;
  visibility: hidden;
  position: fixed;
  top: -1px;
  left: -1px;
`;

const STYLES_IMAGE_PREVIEW = (theme) => css`
  width: 200px;
  height: 200px;
  border-radius: 16px;
  margin-top: 8px;
  box-shadow: ${theme.shadow.lightSmall};
  border: 1px solid ${theme.semantic.borderGrayLight4};
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: ${theme.sizes.mobile}px) {
    width: 100%;
  }
`;

const STYLES_COVER_IMG_DROP = (theme) => css`
  ${Styles.CONTAINER_CENTERED};
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 16px;
  background-color: ${theme.semantic.bgWhite};
  border: 1px solid ${theme.semantic.borderGrayLight4};
  @supports ((-webkit-backdrop-filter: blur(75px)) or (backdrop-filter: blur(75px))) {
    -webkit-backdrop-filter: blur(75px);
    backdrop-filter: blur(75px);
    background-color: ${theme.semantic.bgBlurWhiteTRN};
  }
`;

function CoverImageUpload({ file, viewer, isMobile, isFileOwner }) {
  const { coverImage } = file;

  const [{ isUploadingCoverImg }, { handleCoverImgUpload }] = useCoverImgUpload({
    file,
    viewer,
  });

  const coverImgDropzoneRef = React.useRef();
  const { isDroppingCoverImg } = useCoverImgDrop({
    onUpload: handleCoverImgUpload,
    enabled: isFileOwner && !isMobile,
    ref: coverImgDropzoneRef,
  });

  if (Validations.isImageType(file?.type)) {
    return (
      <div style={{ marginTop: 14 }}>
        <System.H6 color="textGray">Preview image</System.H6>
        <div css={STYLES_IMAGE_PREVIEW}>
          <img src={Strings.getURLfromCID(file.cid)} alt="file preview" />
        </div>
      </div>
    );
  }

  const handleInputChange = (e) => {
    e.persist();
    if (!e || !e.target) return;

    handleCoverImgUpload(e.target.files[0]);
  };

  return (
    <FocusRing within>
      <label
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={isFileOwner || isUploadingCoverImg ? 0 : -1}
        ref={coverImgDropzoneRef}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.target.click();
            e.preventDefault();
          }
        }}
        style={{
          marginTop: 14,
          height: "max-content",
          cursor: !isUploadingCoverImg && isFileOwner ? "pointer" : "unset",
        }}
      >
        <div css={Styles.HORIZONTAL_CONTAINER_CENTERED} style={{ justifyContent: "space-between" }}>
          <System.H6 color="textGray">Preview image</System.H6>
          <Show when={isFileOwner}>
            {isUploadingCoverImg ? (
              <LoaderSpinner style={{ height: 16, width: 16 }} />
            ) : (
              <div>
                <div
                  style={{
                    display: "block",
                    color: System.Constants.semantic.textBlack,
                  }}
                >
                  <SVG.UploadCloud style={{ display: "block" }} width={16} height={16} />
                </div>
              </div>
            )}
          </Show>
        </div>
        <div style={{ position: "relative" }}>
          {coverImage ? (
            <>
              <div css={STYLES_IMAGE_PREVIEW}>
                <img src={Strings.getURLfromCID(coverImage.cid)} alt="" />
              </div>
            </>
          ) : (
            <div
              css={[STYLES_IMAGE_PREVIEW, Styles.CONTAINER_CENTERED]}
              style={{ flexDirection: "column" }}
            >
              {isFileOwner ? (
                <>
                  <input
                    css={STYLES_FILE_HIDDEN}
                    type="file"
                    id="file"
                    disabled={isUploadingCoverImg}
                    onChange={handleInputChange}
                    tabIndex="-1"
                  />
                  <SVG.UploadCloud width={16} />
                  <System.P3 style={{ maxWidth: 140, textAlign: "center", marginTop: 8 }}>
                    {isMobile
                      ? "Select an image as object preview"
                      : "Drop or select an image as object preview"}
                  </System.P3>
                </>
              ) : (
                <System.P3 style={{ maxWidth: 140, textAlign: "center", marginTop: 8 }}>
                  No preview image
                </System.P3>
              )}
            </div>
          )}

          <AnimatePresence>
            {isDroppingCoverImg ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                css={STYLES_COVER_IMG_DROP}
              >
                <System.P3 color="textGrayDark">Drop the image to upload</System.P3>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </label>
    </FocusRing>
  );
}

/* -----------------------------------------------------------------------------------------------*/

function ImageDimension({ file }) {
  const [dimensions, setDimensions] = React.useState();
  const url = Strings.getURLfromCID(file.cid);

  React.useEffect(() => {
    const img = new Image();
    img.src = url;
    img.onload = () => {
      setDimensions({ width: img.naturalWidth, height: img.naturalHeight });
    };
  }, [url]);

  return dimensions ? dimensions.width + " x " + dimensions.height : null;
}

function FileMetadata({ file, ...props }) {
  return (
    <div {...props}>
      <System.H6 color="textGray">Object info</System.H6>
      <div
        css={Styles.HORIZONTAL_CONTAINER}
        style={{ marginTop: 6, padding: "4px 0px", justifyContent: "space-between" }}
      >
        <System.P3 color="textGray">Type</System.P3>
        <System.P3>{Strings.capitalize(file.type)}</System.P3>
      </div>
      <System.Divider
        color="borderGrayLight4"
        height={1}
        style={{ marginTop: 4, marginBottom: 4 }}
      />
      <div
        css={Styles.HORIZONTAL_CONTAINER}
        style={{ padding: "4px 0px", justifyContent: "space-between" }}
      >
        <System.P3 color="textGray">Size</System.P3>
        <System.P3>{Strings.bytesToSize(file.size, 0)}</System.P3>
      </div>
      {Validations.isPreviewableImage(file?.type || "") ? (
        <>
          <System.Divider
            color="borderGrayLight4"
            height={1}
            style={{ marginTop: 4, marginBottom: 4 }}
          />
          <div
            css={Styles.HORIZONTAL_CONTAINER}
            style={{ padding: "4px 0px", justifyContent: "space-between" }}
          >
            <System.P3 color="textGray">Dimension</System.P3>
            <System.P3>
              <ImageDimension file={file} />
            </System.P3>
          </div>
        </>
      ) : null}
      <System.Divider
        color="borderGrayLight4"
        height={1}
        style={{ marginTop: 4, marginBottom: 4 }}
      />
      <div
        css={Styles.HORIZONTAL_CONTAINER}
        style={{ padding: "4px 0px", justifyContent: "space-between" }}
      >
        <System.P3 color="textGray">Created</System.P3>
        <System.P3>{Utilities.formatDateToString(file.createdAt)}</System.P3>
      </div>
      <System.Divider
        color="borderGrayLight4"
        height={1}
        style={{ marginTop: 4, marginBottom: 4 }}
      />
      <div
        css={Styles.HORIZONTAL_CONTAINER}
        style={{
          padding: "4px 0px",
          justifyContent: "space-between",
        }}
      >
        <System.P3 color="textGray">CID</System.P3>
        <System.P3
          style={{
            wordBreak: "break-all",
            textAlign: "right",
            maxWidth: 249,
          }}
        >
          {file.cid}
        </System.P3>
      </div>
    </div>
  );
}

/* -----------------------------------------------------------------------------------------------*/

export function MoreInfo({ external, viewer, isOwner, file, onClose }) {
  const isFileOwner = !external && isOwner && viewer;

  return (
    <Jumper.Root onClose={onClose}>
      <Jumper.Header>
        <System.H5 color="textBlack">More info</System.H5>
        <Jumper.Dismiss autoFocus />
      </Jumper.Header>
      <Jumper.Divider />
      <Jumper.Item
        css={Styles.HORIZONTAL_CONTAINER}
        style={{ paddingTop: 0, paddingBottom: 0, flexGrow: 1 }}
      >
        <CoverImageUpload file={file} viewer={viewer} isFileOwner={isFileOwner} />
        <System.Divider
          style={{ marginLeft: 20, marginRight: 20 }}
          color="borderGrayLight4"
          width={1}
          height="unset"
        />
        <FileMetadata file={file} style={{ width: "100%", marginTop: 14 }} />
      </Jumper.Item>
    </Jumper.Root>
  );
}

export function MoreInfoMobile({ external, viewer, isOwner, file, onClose }) {
  const isFileOwner = !external && isOwner && viewer;

  return (
    <MobileJumper.Root onClose={onClose}>
      <System.Divider height={1} color="borderGrayLight" />
      <MobileJumper.ObjectInfo file={file} />
      <System.Divider height={1} color="borderGrayLight" />
      <MobileJumper.Header>
        <System.H5 as="p" color="textBlack">
          More Info
        </System.H5>
      </MobileJumper.Header>
      <System.Divider height={1} color="borderGrayLight" />
      <MobileJumper.Content>
        <CoverImageUpload isMobile file={file} viewer={viewer} isFileOwner={isFileOwner} />
        <FileMetadata file={file} style={{ marginTop: 22 }} />
      </MobileJumper.Content>
      <MobileJumper.Footer css={Styles.HORIZONTAL_CONTAINER_CENTERED}>
        <System.ButtonPrimitive type="button" style={{ width: 32, height: 32 }} onClick={onClose}>
          <SVG.InfoCircle width={16} height={16} style={{ color: Constants.system.blue }} />
        </System.ButtonPrimitive>
      </MobileJumper.Footer>
    </MobileJumper.Root>
  );
}
