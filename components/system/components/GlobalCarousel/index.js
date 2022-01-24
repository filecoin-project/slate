import * as React from "react";
import * as Constants from "~/common/constants";
import * as SVG from "~/common/svg";
import * as System from "~/components/system";
import * as Styles from "~/common/styles";
import * as Jumpers from "~/components/system/components/GlobalCarousel/jumpers";
import * as Utilities from "~/common/utilities";
import * as UploadUtilities from "~/common/upload-utilities";
import * as Validations from "~/common/validations";
import * as Tooltip from "~/components/system/components/fragments/Tooltip";
import * as Events from "~/common/custom-events";

import { css } from "@emotion/react";
import { Alert } from "~/components/core/Alert";
import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";
import {
  useDetectTextOverflow,
  useEscapeKey,
  useEventListener,
  useLockScroll,
} from "~/common/hooks";
import { Show } from "~/components/utility/Show";
import { ModalPortal } from "~/components/core/ModalPortal";
import { FullHeightLayout } from "~/components/system/components/FullHeightLayout";
import { LoaderSpinner } from "~/components/system/components/Loaders";
import { useUploadStore } from "~/components/core/Upload/store";
import { useRestoreFocus, useTrapFocus } from "~/common/hooks/a11y";

import SlateMediaObject from "~/components/core/SlateMediaObject";
import LinkIcon from "~/components/core/LinkIcon";
import ProfilePhoto from "~/components/core/ProfilePhoto";

/* -------------------------------------------------------------------------------------------------
 *  Carousel Header
 * -----------------------------------------------------------------------------------------------*/

const VisitLinkButton = ({ file }) => {
  return (
    <System.ButtonTertiary
      onClick={(e) => e.stopPropagation()}
      style={{
        color: Constants.semantic.textGrayDark,
        padding: "4px 8px 7px",
        marginLeft: 16,
        minHeight: 30,
      }}
      href={file.url}
      target="_blank"
      rel="noreferrer"
      type="link"
    >
      <LinkIcon file={file} width={16} height={16} style={{ marginRight: 4 }} key={file.id} />
      <span style={{ whiteSpace: "nowrap" }}>Visit site</span>
    </System.ButtonTertiary>
  );
};

/* -----------------------------------------------------------------------------------------------*/

// NOTE(amine): manage file saving state
export const useSaveHandler = ({ file, viewer, onAction }) => {
  const { saveCopy, isSaving } = useUploadStore((store) => {
    const selectedFile = store.state.fileLoading[UploadUtilities.getFileKey(file)];

    return { isSaving: selectedFile?.status === "uploading", saveCopy: store.handlers.saveCopy };
  });

  const isSaved = React.useMemo(
    () => viewer?.libraryCids[file.cid],
    [viewer?.libraryCids, file.cid]
  );

  const handleSave = async () => {
    if (!viewer) {
      Events.dispatchCustomEvent({ name: "slate-global-open-cta", detail: {} });
      return;
    }

    if (isSaved) {
      const fileLibraryURL = `/_/data?id=${file.id}`;
      onAction({
        type: "NAVIGATE",
        href: fileLibraryURL,
        redirect: false,
      });

      return;
    }

    saveCopy(file);
  };

  return { handleSave, isSaved, isSaving: isSaving };
};

const SaveFileButton = ({ file, viewer, onAction, ...props }) => {
  const { handleSave, isSaved, isSaving } = useSaveHandler({ file, viewer, onAction });

  return (
    <System.ButtonPrimitive onClick={handleSave} disabled={isSaving} {...props}>
      {isSaving ? (
        <LoaderSpinner style={{ height: 16, width: 16 }} />
      ) : isSaved ? (
        <SVG.CheckCircle
          height={16}
          style={{ pointerEvents: "none", color: Constants.system.green }}
        />
      ) : (
        <SVG.FilePlus height={16} style={{ pointerEvents: "none" }} />
      )}
    </System.ButtonPrimitive>
  );
};

/* -----------------------------------------------------------------------------------------------*/

const ActionButtonTooltip = ({ label, keyTrigger, id, children }) => {
  return (
    <Tooltip.Root vertical="below" horizontal="center">
      <Tooltip.Trigger aria-labelledby={id}>{children}</Tooltip.Trigger>
      <Tooltip.Content css={Styles.HORIZONTAL_CONTAINER_CENTERED} style={{ marginTop: 4.5 }}>
        <System.H6 id={id} as="p" color="textGrayDark">
          {label}
        </System.H6>
        <System.H6 as="p" color="textGray" style={{ marginLeft: 16 }}>
          {keyTrigger}
        </System.H6>
      </Tooltip.Content>
    </Tooltip.Root>
  );
};

/* -----------------------------------------------------------------------------------------------*/

const useCarouselJumperControls = () => {
  const [isControlVisible, setControlVisibility] = React.useState(false);
  const showControl = () => setControlVisibility(true);
  const hideControl = () => setControlVisibility(false);
  return [isControlVisible, { showControl, hideControl }];
};

const STYLES_HEADER_WRAPPER = (theme) => css`
  ${Styles.HORIZONTAL_CONTAINER_CENTERED};
  width: 100%;
  min-height: 64px;
  padding: 13px 24px 10px;
  color: ${theme.semantic.textGrayDark};
  border-bottom: 1px solid ${theme.semantic.borderGrayLight};
  box-shadow: ${theme.shadow.lightSmall};
  z-index: 1;

  background-color: ${theme.semantic.bgWhite};
  @supports ((-webkit-backdrop-filter: blur(15px)) or (backdrop-filter: blur(15px))) {
    background-color: ${theme.semantic.bgBlurWhiteOP};
    -webkit-backdrop-filter: blur(15px);
    backdrop-filter: blur(15px);
  }
`;

const STYLES_ACTION_BUTTON = (theme) => css`
  padding: 8px;
  border-radius: 8px;
  @media (hover: hover) and (pointer: fine) {
    &:hover {
      background-color: ${theme.semantic.bgGrayLight};
      box-shadow: ${theme.shadow.lightSmall};
    }
  }
`;

function CarouselHeader({
  isStandalone,
  viewer,
  onAction,
  data,
  external,
  isOwner,
  file,
  current,
  total,

  onClose,
  enableNextSlide,
  enablePreviousSlide,
  onNextSlide,
  onPreviousSlide,
  ...props
}) {
  // NOTE(amine): Detect if the text is overflowing to show the MORE button
  const elementRef = React.useRef();
  const isBodyOverflowing = useDetectTextOverflow({ ref: elementRef }, [file]);

  // NOTE(amine): jumpers handlers
  const [
    isFileDescriptionVisible,
    { showControl: showFileDescription, hideControl: hideFileDescription },
  ] = useCarouselJumperControls();

  const [isMoreInfoVisible, { showControl: showMoreInfo, hideControl: hideMoreInfo }] =
    useCarouselJumperControls();

  const [isEditInfoVisible, { showControl: showEditInfo, hideControl: hideEditInfo }] =
    useCarouselJumperControls();

  const [isShareFileVisible, { showControl: showShareFile, hideControl: hideShareFile }] =
    useCarouselJumperControls();

  const [isEditSlatesVisible, { showControl: showEditSlates, hideControl: hideEditSlates }] =
    useCarouselJumperControls();

  const hideOpenJumpers = () => {
    if (isMoreInfoVisible) hideMoreInfo();
    if (isEditInfoVisible) hideEditInfo();
    if (isShareFileVisible) hideShareFile();
    if (isEditSlatesVisible) hideEditSlates();
  };

  const moreInfoTriggerRef = React.useRef();
  const editInfoTriggerRef = React.useRef();
  const shareTriggerRef = React.useRef();
  const editSlatesTriggerRef = React.useRef();

  const handleKeyUp = (e) => {
    const targetTagName = e.target.tagName;
    if (targetTagName === "INPUT" || targetTagName === "TEXTAREA" || targetTagName === "SELECT")
      return;

    switch (e.key) {
      case "e":
      case "E":
        editInfoTriggerRef.current.focus();
        hideOpenJumpers();
        showEditInfo();
        break;
      case "t":
      case "T":
        editSlatesTriggerRef.current.focus();
        hideOpenJumpers();
        showEditSlates();
        break;
      case "s":
      case "S":
        shareTriggerRef.current.focus();
        hideOpenJumpers();
        showShareFile();
        break;
      case "i":
      case "I":
        moreInfoTriggerRef.current.focus();
        hideOpenJumpers();
        showMoreInfo();
        break;
    }
  };
  useEventListener({ type: "keyup", handler: handleKeyUp });

  const headerRef = React.useRef();
  React.useEffect(() => {
    if (headerRef.current) headerRef.current.focus();
  }, []);

  return (
    <>
      <ModalPortal>
        {isOwner && (
          <AnimatePresence>
            {isEditInfoVisible && <Jumpers.EditInfo file={file} onClose={hideEditInfo} />}
          </AnimatePresence>
        )}
        {isOwner && (
          <AnimatePresence>
            {isEditSlatesVisible && (
              <Jumpers.EditSlates viewer={viewer} file={file} onClose={hideEditSlates} />
            )}
          </AnimatePresence>
        )}
        <AnimatePresence>
          {isFileDescriptionVisible && (
            <Jumpers.FileDescription file={file} onClose={hideFileDescription} />
          )}
        </AnimatePresence>
        <AnimatePresence>
          {isMoreInfoVisible && (
            <Jumpers.MoreInfo
              viewer={viewer}
              external={external}
              isOwner={isOwner}
              file={file}
              onClose={hideMoreInfo}
            />
          )}
        </AnimatePresence>
        <AnimatePresence>
          {isShareFileVisible && (
            <Jumpers.Share file={file} data={data} viewer={viewer} onClose={hideShareFile} />
          )}
        </AnimatePresence>
      </ModalPortal>

      <nav css={STYLES_HEADER_WRAPPER} {...props}>
        <div>
          <div css={Styles.HORIZONTAL_CONTAINER}>
            <System.H5
              color="textBlack"
              as="h1"
              style={{ outline: 0 }}
              tabindex={-1}
              ref={headerRef}
            >
              {file?.name || file?.filename}
            </System.H5>
            <System.H5 color="textGray" as="p" style={{ marginLeft: 32 }}>
              {current} / {total}
            </System.H5>
          </div>

          <div css={Styles.HORIZONTAL_CONTAINER_CENTERED} style={{ marginRight: 150 }}>
            <System.P3
              ref={elementRef}
              style={{ marginTop: 1, wordBreak: "break-all" }}
              nbrOflines={1}
              color="textBlack"
            >
              {file.body}
            </System.P3>
            <Show when={isBodyOverflowing}>
              <System.ButtonPrimitive style={{ marginTop: 1 }} onClick={showFileDescription}>
                <System.H6 color="blue" as="span">
                  MORE
                </System.H6>
              </System.ButtonPrimitive>
            </Show>
          </div>
        </div>
        <div css={Styles.HORIZONTAL_CONTAINER_CENTERED} style={{ marginLeft: "auto" }}>
          <AnimateSharedLayout>
            <div css={Styles.HORIZONTAL_CONTAINER_CENTERED}>
              {isOwner && (
                <ActionButtonTooltip
                  label="Edit Info"
                  keyTrigger="E"
                  id="globalcarousel-editinfo-trigger-tooltip"
                >
                  <System.ButtonPrimitive
                    as={motion.button}
                    ref={editInfoTriggerRef}
                    layoutId="jumper-desktop-edit"
                    onClick={showEditInfo}
                    aria-label="Edit Info"
                    css={STYLES_ACTION_BUTTON}
                  >
                    <SVG.Edit style={{ pointerEvents: "none" }} />
                  </System.ButtonPrimitive>
                </ActionButtonTooltip>
              )}

              {isOwner && (
                <ActionButtonTooltip
                  label="Tag"
                  keyTrigger="T"
                  id="globalcarousel-tag-trigger-tooltip"
                >
                  <System.ButtonPrimitive
                    as={motion.button}
                    ref={editSlatesTriggerRef}
                    layoutId="jumper-desktop-slates"
                    onClick={showEditSlates}
                    style={{ marginLeft: 4 }}
                    aria-label="Tag"
                    css={STYLES_ACTION_BUTTON}
                  >
                    <SVG.Hash style={{ pointerEvents: "none" }} />
                  </System.ButtonPrimitive>
                </ActionButtonTooltip>
              )}

              {!isOwner && (
                <SaveFileButton
                  style={{ marginLeft: 4 }}
                  css={STYLES_ACTION_BUTTON}
                  file={file}
                  viewer={viewer}
                  onAction={onAction}
                />
              )}

              <ActionButtonTooltip
                label="Share"
                keyTrigger="S"
                id="globalcarousel-share-trigger-tooltip"
              >
                <System.ButtonPrimitive
                  as={motion.button}
                  ref={shareTriggerRef}
                  layoutId="jumper-desktop-share"
                  onClick={showShareFile}
                  style={{ marginLeft: 4 }}
                  aria-label="Share"
                  css={STYLES_ACTION_BUTTON}
                >
                  <SVG.Share style={{ pointerEvents: "none" }} />
                </System.ButtonPrimitive>
              </ActionButtonTooltip>

              <ActionButtonTooltip
                label="More info"
                keyTrigger="I"
                id="globalcarousel-info-trigger-tooltip"
              >
                <System.ButtonPrimitive
                  as={motion.button}
                  ref={moreInfoTriggerRef}
                  layoutId="jumper-desktop-info"
                  onClick={showMoreInfo}
                  style={{ marginLeft: 4 }}
                  aria-label="More info"
                  css={STYLES_ACTION_BUTTON}
                >
                  <SVG.InfoCircle style={{ pointerEvents: "none" }} />
                </System.ButtonPrimitive>
              </ActionButtonTooltip>

              {file.isLink ? <VisitLinkButton file={file} /> : null}
            </div>
          </AnimateSharedLayout>
          {isStandalone ? (
            <a href={`/${file.owner.username}`} css={Styles.LINK} style={{ marginLeft: 80 }}>
              <div
                style={{ gap: 8, maxWidth: "138px", justifyContent: "flex-end" }}
                css={Styles.HORIZONTAL_CONTAINER_CENTERED}
              >
                <div>
                  <ProfilePhoto user={file.owner} style={{ borderRadius: "8px" }} size={20} />
                </div>
                <p css={[Styles.H5, Styles.OVERFLOW_ELLIPSIS]}>
                  {Utilities.getUserDisplayName(file.owner)}
                </p>
              </div>
            </a>
          ) : (
            <div style={{ marginLeft: 80 }}>
              <System.ButtonPrimitive
                onClick={onClose}
                css={STYLES_ACTION_BUTTON}
                aria-label="close object preview"
              >
                <SVG.Dismiss />
              </System.ButtonPrimitive>
            </div>
          )}
        </div>
      </nav>

      <CarouselControls
        enableNextSlide={enableNextSlide}
        enablePreviousSlide={enablePreviousSlide}
        onNextSlide={() => (hideOpenJumpers(), onNextSlide())}
        onPreviousSlide={() => (hideOpenJumpers(), onPreviousSlide())}
        onClose={onClose}
      />
    </>
  );
}

const STYLES_CAROUSEL_MOBILE_HEADER = (theme) => css`
  position: relative;
  ${Styles.HORIZONTAL_CONTAINER_CENTERED};
  padding: 7px 8px 3px;
  color: ${theme.semantic.textGrayDark};
  border-bottom: 1px solid ${theme.semantic.borderGrayLight};

  background-color: ${theme.semantic.bgWhite};
  @supports ((-webkit-backdrop-filter: blur(15px)) or (backdrop-filter: blur(15px))) {
    background-color: ${theme.semantic.bgBlurWhiteOP};
    -webkit-backdrop-filter: blur(15px);
    backdrop-filter: blur(15px);
  }
`;

const STYLES_CAROUSEL_MOBILE_SLIDE_COUNT = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

function CarouselHeaderMobile({
  isStandalone,
  file,
  current,
  total,
  onClose,
  onNextSlide,
  onPreviousSlide,
}) {
  const isPreviousButtonDisabled = current === 1;
  const isNextButtonDisabled = current === total;
  return (
    <nav css={STYLES_CAROUSEL_MOBILE_HEADER} style={{ justifyContent: "space-between" }}>
      {!isStandalone && (
        <>
          <div style={{ width: 76 }}>
            <System.ButtonPrimitive
              css={STYLES_ACTION_BUTTON}
              aria-label="previous slide"
              disabled={isPreviousButtonDisabled}
              style={isPreviousButtonDisabled ? { color: Constants.system.grayLight3 } : null}
              onClick={onPreviousSlide}
            >
              <SVG.ChevronLeft width={16} height={16} />
            </System.ButtonPrimitive>
            <System.ButtonPrimitive
              aria-label="next slide"
              style={
                isNextButtonDisabled
                  ? { color: Constants.system.grayLight3, marginLeft: 12 }
                  : { marginLeft: 12 }
              }
              disabled={isNextButtonDisabled}
              css={STYLES_ACTION_BUTTON}
              onClick={onNextSlide}
            >
              <SVG.ChevronRight width={16} height={16} />
            </System.ButtonPrimitive>
          </div>

          <System.H5 color="textGray" as="p" css={STYLES_CAROUSEL_MOBILE_SLIDE_COUNT}>
            {current} / {total}
          </System.H5>
        </>
      )}

      {isStandalone ? (
        <div
          style={{ gap: 8, maxWidth: "138px", justifyContent: "flex-end" }}
          css={Styles.HORIZONTAL_CONTAINER_CENTERED}
        >
          <div>
            <ProfilePhoto user={file.owner} style={{ borderRadius: "8px" }} size={20} />
          </div>
          <p css={[Styles.H5, Styles.OVERFLOW_ELLIPSIS]}>
            {Utilities.getUserDisplayName(file.owner)}
          </p>
        </div>
      ) : (
        <div style={{ textAlign: "right" }}>
          <System.ButtonPrimitive
            onClick={onClose}
            css={STYLES_ACTION_BUTTON}
            aria-label="close object preview"
          >
            <SVG.Dismiss />
          </System.ButtonPrimitive>
        </div>
      )}
    </nav>
  );
}

const MOBILE_FOOTER_HEIGHT = 52;

const STYLES_CAROUSEL_MOBILE_FOOTER = (theme) => css`
  ${Styles.HORIZONTAL_CONTAINER_CENTERED};
  position: fixed;
  bottom: 0;
  justify-content: space-between;
  z-index: ${theme.zindex.jumper + 1};
  width: 100%;
  padding: 8px 16px;
  border-top: 1px solid ${theme.semantic.borderGrayLight};
  color: ${theme.semantic.textGrayDark};
  height: ${MOBILE_FOOTER_HEIGHT}px;

  background-color: ${theme.semantic.bgWhite};
  @supports ((-webkit-backdrop-filter: blur(15px)) or (backdrop-filter: blur(15px))) {
    background-color: ${theme.semantic.bgBlurWhite};
    -webkit-backdrop-filter: blur(15px);
    backdrop-filter: blur(15px);
  }
`;

const STYLES_ACTION_BUTTON_SELECTED = (theme) => css`
  background-color: ${theme.semantic.bgGrayLight4};
`;

function CarouselFooterMobile({ file, onAction, external, isOwner, data, viewer }) {
  const [isEditInfoVisible, { showControl: showEditInfo, hideControl: hideEditInfo }] =
    useCarouselJumperControls();

  const [isShareFileVisible, { showControl: showShareFile, hideControl: hideShareFile }] =
    useCarouselJumperControls();

  const [isMoreInfoVisible, { showControl: showMoreInfo, hideControl: hideMoreInfo }] =
    useCarouselJumperControls();

  const [isEditSlatesVisible, { showControl: showEditSlates, hideControl: hideEditSlates }] =
    useCarouselJumperControls();

  const hideOpenJumpers = () => {
    if (isMoreInfoVisible) hideMoreInfo();
    if (isEditInfoVisible) hideEditInfo();
    if (isShareFileVisible) hideShareFile();
    if (isEditSlatesVisible) hideEditSlates();
  };

  const toggleEditInfo = () =>
    isEditInfoVisible ? hideEditInfo() : (hideOpenJumpers(), showEditInfo());

  const toggleShareFile = () =>
    isShareFileVisible ? hideShareFile() : (hideOpenJumpers(), showShareFile());

  const toggleMoreInfo = () =>
    isMoreInfoVisible ? hideMoreInfo() : (hideOpenJumpers(), showMoreInfo());

  const toggleEditSlates = () =>
    isEditSlatesVisible ? hideEditSlates() : (hideOpenJumpers(), showEditSlates());

  return (
    <>
      {isOwner && (
        <AnimatePresence>
          {isEditInfoVisible && (
            <Jumpers.EditInfoMobile
              footerStyle={{ bottom: MOBILE_FOOTER_HEIGHT }}
              file={file}
              onClose={hideEditInfo}
            />
          )}
        </AnimatePresence>
      )}
      {isOwner && (
        <AnimatePresence>
          {isEditSlatesVisible && (
            <Jumpers.EditSlatesMobile viewer={viewer} file={file} onClose={hideEditSlates} />
          )}
        </AnimatePresence>
      )}
      <AnimatePresence>
        {isShareFileVisible && (
          <Jumpers.ShareMobile file={file} data={data} viewer={viewer} onClose={hideShareFile} />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isMoreInfoVisible && (
          <Jumpers.MoreInfoMobile
            viewer={viewer}
            external={external}
            isOwner={isOwner}
            file={file}
            onClose={hideMoreInfo}
          />
        )}
      </AnimatePresence>
      <ModalPortal>
        <AnimateSharedLayout>
          <nav css={STYLES_CAROUSEL_MOBILE_FOOTER}>
            {isOwner && (
              <System.ButtonPrimitive
                as={motion.button}
                layoutId="jumper-mobile-edit"
                css={[STYLES_ACTION_BUTTON, isEditInfoVisible && STYLES_ACTION_BUTTON_SELECTED]}
                onClick={toggleEditInfo}
              >
                <SVG.Edit style={{ pointerEvents: "none" }} />
              </System.ButtonPrimitive>
            )}

            {isOwner && (
              <System.ButtonPrimitive
                as={motion.button}
                layoutId="jumper-mobile-slates"
                style={{ marginLeft: 4 }}
                css={[STYLES_ACTION_BUTTON, isEditSlatesVisible && STYLES_ACTION_BUTTON_SELECTED]}
                onClick={toggleEditSlates}
              >
                <SVG.Hash style={{ pointerEvents: "none" }} />
              </System.ButtonPrimitive>
            )}

            {!isOwner && (
              <SaveFileButton
                style={{ marginLeft: 4 }}
                css={STYLES_ACTION_BUTTON}
                file={file}
                viewer={viewer}
                onAction={onAction}
              />
            )}

            <System.ButtonPrimitive
              as={motion.button}
              layoutId="jumper-mobile-share"
              style={{ marginLeft: 4 }}
              css={[STYLES_ACTION_BUTTON, isShareFileVisible && STYLES_ACTION_BUTTON_SELECTED]}
              onClick={toggleShareFile}
            >
              <SVG.Share style={{ pointerEvents: "none" }} />
            </System.ButtonPrimitive>

            <System.ButtonPrimitive
              as={motion.button}
              layoutId="jumper-mobile-info"
              style={{ marginLeft: 4 }}
              css={[STYLES_ACTION_BUTTON, isMoreInfoVisible && STYLES_ACTION_BUTTON_SELECTED]}
              onClick={toggleMoreInfo}
            >
              <SVG.InfoCircle />
            </System.ButtonPrimitive>
            {file.isLink ? <VisitLinkButton file={file} /> : null}
          </nav>
        </AnimateSharedLayout>
      </ModalPortal>
    </>
  );
}

/* -------------------------------------------------------------------------------------------------
 *  Carousel Controls
 * -----------------------------------------------------------------------------------------------*/

const useCarouselKeyCommands = ({ handleNext, handlePrevious, handleClose }) => {
  const handleKeyUp = (e) => {
    const inputs = document.querySelectorAll("input");
    for (let elem of inputs) {
      if (document.activeElement === elem) {
        return;
      }
    }

    const textareas = document.querySelectorAll("textarea");
    for (let elem of textareas) {
      if (document.activeElement === elem) {
        return;
      }
    }

    switch (e.key) {
      case "Right":
      case "ArrowRight":
        handleNext();
        break;
      case "Left":
      case "ArrowLeft":
        handlePrevious();
        break;
    }
  };

  useEscapeKey(handleClose);

  useEventListener({ type: "keyup", handler: handleKeyUp });
};

const STYLES_CONTROLS_BUTTON = (theme) => css`
  background-color: ${theme.semantic.bgGrayLight};
  border-radius: 8px;
  border: 1px solid ${theme.semantic.borderGrayLight};
  padding: 10px;
  box-shadow: ${theme.shadow.lightMedium};
  svg {
    display: block;
  }
`;

const STYLES_CONTROLS_WRAPPER = css`
  ${Styles.CONTAINER_CENTERED};
  position: absolute;
  width: 122px;
  height: 80%;
  z-index: 1;
  top: 50%;
  transform: translateY(-50%);
  padding-left: 24px;
  padding-right: 24px;
`;

function CarouselControls({
  enableNextSlide,
  enablePreviousSlide,
  onNextSlide,
  onPreviousSlide,
  onClose,
}) {
  useCarouselKeyCommands({
    handleNext: onNextSlide,
    handlePrevious: onPreviousSlide,
    handleClose: onClose,
  });

  const [areControlsVisible, setCarouselVisibility] = React.useState(true);
  const timeoutRef = React.useRef();

  const showControls = () => {
    clearTimeout(timeoutRef.current);
    setCarouselVisibility(true);
  };

  const hideControls = (ms = 1000) => {
    timeoutRef.current = setTimeout(() => {
      setCarouselVisibility(false);
    }, ms);
  };

  React.useEffect(() => {
    hideControls(3000);
    return () => clearTimeout(timeoutRef.current);
  }, []);

  return (
    <>
      <div
        css={STYLES_CONTROLS_WRAPPER}
        style={{ left: 0, justifyContent: "flex-start" }}
        onMouseEnter={showControls}
        onMouseLeave={hideControls}
        onFocus={showControls}
        onBlur={hideControls}
      >
        {enablePreviousSlide ? (
          <System.ButtonPrimitive
            as={motion.button}
            onClick={onPreviousSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: areControlsVisible ? 1 : 0 }}
            transition={{ ease: "easeInOut", duration: 0.25 }}
            css={STYLES_CONTROLS_BUTTON}
            aria-label="previous slide"
          >
            <SVG.ChevronLeft width={16} />
          </System.ButtonPrimitive>
        ) : null}
      </div>
      <div
        css={STYLES_CONTROLS_WRAPPER}
        style={{ right: 0, justifyContent: "flex-end" }}
        onMouseEnter={showControls}
        onMouseLeave={hideControls}
        onFocus={showControls}
        onBlur={hideControls}
      >
        {enableNextSlide ? (
          <System.ButtonPrimitive
            as={motion.button}
            onClick={onNextSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: areControlsVisible ? 1 : 0 }}
            css={STYLES_CONTROLS_BUTTON}
            aria-label="next slide"
          >
            <SVG.ChevronRight width={16} />
          </System.ButtonPrimitive>
        ) : null}
      </div>
    </>
  );
}

/* -------------------------------------------------------------------------------------------------
 *  Carousel Content
 * -----------------------------------------------------------------------------------------------*/

const STYLES_CONTENT = (theme) => css`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: ${theme.sizes.mobile}px) {
    flex-direction: column;
    overflow-y: auto;
    justify-content: flex-start;
  }
`;

const STYLES_PREVIEW_WRAPPER = (theme) => css`
  ${Styles.CONTAINER_CENTERED};
  position: relative;
  width: 100%;
  height: 100%;
  background-color: ${theme.semantic.bgGrayLight4};

  @media (max-width: ${theme.sizes.mobile}px) {
    min-height: 75vh;
    height: 75vh;
    overflow: hidden;
  }
`;

export function CarouselContent({ objects, index, isMobile, viewer, style, onClose }) {
  const file = objects?.[index];

  useLockScroll();

  const { linkHtml, linkIFrameAllowed } = file;
  const isNFTLink = Validations.isNFTLink(file);
  // NOTE(amine): hide the title and description when using LinkCard as SlateMediaObject
  const hideDescription = file.isLink && (!linkHtml || !linkIFrameAllowed || isNFTLink);

  return (
    <>
      <Alert viewer={viewer} noWarning id={isMobile ? "slate-mobile-alert" : null} />
      <div
        css={STYLES_CONTENT}
        style={style}
        onClick={onClose}
        role="group"
        aria-roledescription="slide"
        aria-label={file?.name || file?.filename}
      >
        <div css={STYLES_PREVIEW_WRAPPER}>
          <SlateMediaObject file={file} isMobile={isMobile} />
        </div>

        {!hideDescription && (
          <div css={Styles.MOBILE_ONLY} style={{ padding: "13px 16px 44px", width: "100%" }}>
            <System.H5 color="textBlack" as="h1">
              {file?.name || file?.filename}
            </System.H5>
            <Show when={file?.body}>
              <System.P2 color="textBlack" style={{ marginTop: 4 }}>
                {file?.body}
              </System.P2>
            </Show>
            <Show when={file.isLink}>
              <div style={{ marginTop: 5 }} css={Styles.HORIZONTAL_CONTAINER_CENTERED}>
                <LinkIcon file={file} width={12} height={12} />
                <System.P2
                  as="a"
                  nbrOflines={1}
                  href={file.url}
                  style={{ marginLeft: 5, textDecoration: "none", color: Constants.system.blue }}
                >
                  {file.url}
                </System.P2>
              </div>
            </Show>
          </div>
        )}
      </div>
    </>
  );
}

/* -------------------------------------------------------------------------------------------------
 *  Global Carousel
 * -----------------------------------------------------------------------------------------------*/
const useCarouselViaParams = ({ index, params, objects, onChange }) => {
  const findSelectedIndex = () => {
    const id = params?.id;
    if (!id) return -1;

    let index = objects.findIndex((elem) => elem.id === id);
    return index;
  };

  React.useEffect(() => {
    if (index !== -1) return;

    const selectedIndex = findSelectedIndex();
    if (selectedIndex !== index) onChange(index);
  }, [params?.id]);

  React.useEffect(() => {
    if (params?.id) {
      const index = findSelectedIndex();
      onChange(index);
    }
  }, [params]);
};

const getCarouselHandlers = ({ index, objects, params, onChange, onAction }) => {
  const handleNext = (e) => {
    if (e) e.stopPropagation();

    let nextIndex = index + 1;
    if (nextIndex >= objects.length) return;

    let { id } = objects[nextIndex];
    onChange(nextIndex);
    onAction({ type: "UPDATE_PARAMS", params: { ...params, id }, redirect: true });
  };

  const handlePrevious = (e) => {
    if (e) e.stopPropagation();

    let prevIndex = index - 1;
    if (prevIndex < 0) return;

    let { id } = objects[prevIndex];
    onChange(prevIndex);
    onAction({ type: "UPDATE_PARAMS", params: { ...params, id }, redirect: true });
  };

  const handleClose = (e) => {
    if (e) e.stopPropagation(), e.preventDefault();

    let params = { ...params };
    delete params.id;
    onAction({ type: "UPDATE_PARAMS", params, redirect: true });
    onChange(-1);
  };
  return { handleNext, handlePrevious, handleClose };
};

const STYLES_ROOT = (theme) => css`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  color: ${Constants.system.white};
  z-index: ${Constants.zindex.modal};
  background-color: rgba(0, 0, 0, 0.8);

  // Note(Amine): we're using the blur filter to fix a weird backdrop-filter's bug in chrome

  filter: blur(0px);
  @supports ((-webkit-backdrop-filter: blur(15px)) or (backdrop-filter: blur(15px))) {
    -webkit-backdrop-filter: blur(15px);
    backdrop-filter: blur(15px);
  }

  @media (max-width: ${Constants.sizes.mobile}px) {
    background-color: ${theme.semantic.bgWhite};
  }

  @keyframes global-carousel-fade-in {
    from {
      transform: translateX(8px);
      opacity: 0;
    }
    to {
      transform: translateX(0px);
      opacity: 1;
    }
  }
  animation: global-carousel-fade-in 400ms ease;
`;

const STYLES_CAROUSEL_WRAPPER = css`
  ${Styles.VERTICAL_CONTAINER};
  height: 100%;
  width: 100%;
`;

export function GlobalCarousel({
  isStandalone,
  objects,
  index,
  params,
  data,
  isMobile,
  onChange,
  onAction,
  viewer,
  external,
  isOwner,
  sidebar,
  style,
}) {
  const file = objects?.[index];
  const isCarouselOpen = (index > 0 || index <= objects.length) && !!file;

  useCarouselViaParams({ index, params, objects, onChange });

  const wrapperRef = React.useRef();
  useTrapFocus({ ref: wrapperRef });
  useRestoreFocus({ isEnabled: isCarouselOpen });

  if (!isCarouselOpen) return null;

  const { handleNext, handlePrevious, handleClose } = getCarouselHandlers({
    index,
    objects,
    params,
    onChange,
    onAction,
  });

  return (
    <FullHeightLayout
      as="section"
      role="dialog"
      aria-label="Object preview"
      aria-modal={true}
      css={STYLES_ROOT}
    >
      <section
        ref={wrapperRef}
        aria-roledescription="carousel"
        aria-atomic={false}
        aria-live="polite"
        css={STYLES_CAROUSEL_WRAPPER}
      >
        {isMobile ? (
          <CarouselHeaderMobile
            isStandalone={isStandalone}
            file={file}
            current={index + 1}
            total={objects.length}
            onPreviousSlide={handlePrevious}
            onNextSlide={handleNext}
            onClose={handleClose}
            enableNextSlide={index < objects.length - 1}
            enablePreviousSlide={index > 0}
          />
        ) : (
          <CarouselHeader
            isStandalone={isStandalone}
            viewer={viewer}
            external={external}
            isOwner={isOwner}
            data={data}
            file={file}
            current={index + 1}
            total={objects.length}
            onAction={onAction}
            enableNextSlide={index < objects.length - 1}
            enablePreviousSlide={index > 0}
            onNextSlide={handleNext}
            onPreviousSlide={handlePrevious}
            onClose={handleClose}
          />
        )}
        <CarouselContent
          objects={objects}
          index={index}
          data={data}
          isMobile={isMobile}
          viewer={viewer}
          sidebar={sidebar}
          style={style}
          onClose={handleClose}
        />

        {isMobile ? (
          <CarouselFooterMobile
            file={file}
            viewer={viewer}
            data={data}
            external={external}
            onAction={onAction}
            isOwner={isOwner}
          />
        ) : null}
      </section>
    </FullHeightLayout>
  );
}
