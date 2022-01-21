import * as React from "react";
import * as System from "~/components/system";
import * as Styles from "~/common/styles";
import * as SVG from "~/common/svg";
import * as Tooltip from "~/components/system/components/fragments/Tooltip";

import { ModalPortal } from "~/components/core/ModalPortal";
import { css } from "@emotion/react";
import { AnimatePresence as FramerAnimatePresence, motion } from "framer-motion";
import { useEscapeKey, useLockScroll } from "~/common/hooks";
import { Show } from "~/components/utility/Show";
import { useRestoreFocus, useTrapFocus } from "~/common/hooks/a11y";

import ObjectBoxPreview from "~/components/core/ObjectBoxPreview";

/* -------------------------------------------------------------------------------------------------
 *  Root
 * -----------------------------------------------------------------------------------------------*/

const JUMPER_WIDTH = 640;
const JUMPER_HEIGHT = 400;

const STYLES_JUMPER_ROOT = (theme) => css`
  ${Styles.VERTICAL_CONTAINER};
  position: fixed;
  top: calc(50% - ${JUMPER_HEIGHT / 2}px);
  left: calc(50% - ${JUMPER_WIDTH / 2}px);
  width: ${JUMPER_WIDTH}px;
  min-height: ${JUMPER_HEIGHT}px;
  z-index: ${theme.zindex.jumper};
  border-radius: 16px;
  border: 1px solid ${theme.semantic.borderGrayLight4};
  overflow: hidden;
  box-shadow: ${theme.shadow.jumperLight};

  background-color: ${theme.semantic.bgWhite};
  @supports ((-webkit-backdrop-filter: blur(75px)) or (backdrop-filter: blur(75px))) {
    -webkit-backdrop-filter: blur(75px);
    backdrop-filter: blur(75px);
    background-color: ${theme.semantic.bgBlurWhiteOP};
  }

  @media (max-width: ${theme.sizes.mobile}px) {
    width: 100%;
    border-radius: 0;
    min-height: 100vh;
    top: 0;
    left: 0;
  }
`;

const JumperContext = React.createContext({});
const useJumperContext = () => React.useContext(JumperContext);

function AnimatePresence({ children, ...props }) {
  return <FramerAnimatePresence {...props}>{children}</FramerAnimatePresence>;
}

function Root({ children, onClose, ...props }) {
  useEscapeKey(onClose);
  useLockScroll();

  const wrapperRef = React.useRef();
  useTrapFocus({ ref: wrapperRef });
  useRestoreFocus();

  return (
    <ModalPortal>
      <div ref={wrapperRef}>
        <System.Boundary enabled={true} onOutsideRectEvent={onClose} onMouseDown>
          <JumperContext.Provider value={{ onClose }}>
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 10, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              css={STYLES_JUMPER_ROOT}
              {...props}
            >
              {children}
            </motion.div>
          </JumperContext.Provider>
        </System.Boundary>
      </div>
    </ModalPortal>
  );
}

/* -------------------------------------------------------------------------------------------------
 *  Header
 * -----------------------------------------------------------------------------------------------*/

const STYLES_JUMPER_HEADER = css`
  ${Styles.HORIZONTAL_CONTAINER_CENTERED};
  justify-content: space-between;
  padding: 17px 20px 15px;
`;

function Header({ children, style, ...props }) {
  return (
    <div css={STYLES_JUMPER_HEADER} style={style} {...props}>
      {children}
    </div>
  );
}

/* -------------------------------------------------------------------------------------------------
 *  Dismiss
 * -----------------------------------------------------------------------------------------------*/

const STYLES_DISMISS_BUTTON = css`
  width: 24px;
  height: 24px;
  margin-left: 12px;
`;

const Dismiss = React.forwardRef(({ css, ...props }, ref) => {
  const { onClose } = useJumperContext();

  return (
    <Tooltip.Root vertical="below" horizontal="center">
      <Tooltip.Trigger aria-describedby="jumper-dismiss-trigger-tooltip">
        <System.ButtonPrimitive
          ref={ref}
          css={[STYLES_DISMISS_BUTTON, css]}
          onClick={onClose}
          {...props}
        >
          <SVG.Dismiss width={20} height={20} style={{ display: "block" }} />
        </System.ButtonPrimitive>
      </Tooltip.Trigger>
      <Tooltip.Content
        style={{ marginTop: 4.5, marginLeft: -8 }}
        css={Styles.HORIZONTAL_CONTAINER_CENTERED}
      >
        <System.H6 id="jumper-dismiss-trigger-tooltip" as="p" color="textGrayDark">
          Close jumper
        </System.H6>
        <System.H6 as="p" color="textGray" style={{ marginLeft: 16 }}>
          Esc
        </System.H6>
      </Tooltip.Content>
    </Tooltip.Root>
  );
});

/* -------------------------------------------------------------------------------------------------
 *  Item
 * -----------------------------------------------------------------------------------------------*/

const STYLES_JUMPER_ITEM_PADDING = css`
  padding: 13px 20px 12px;
`;

function Item({ children, ...props }) {
  return (
    <div css={[STYLES_JUMPER_ITEM_PADDING, css]} {...props}>
      {children}
    </div>
  );
}

/* -------------------------------------------------------------------------------------------------
 *  Divider
 * -----------------------------------------------------------------------------------------------*/
function Divider({ children, color = "borderGrayLight4", ...props }) {
  return (
    <System.Divider height={1} color={color} {...props}>
      {children}
    </System.Divider>
  );
}

/* -------------------------------------------------------------------------------------------------
 *  ObjectInfo
 * -----------------------------------------------------------------------------------------------*/

function ObjectInfo({ file, css, style, ...props }) {
  return (
    <div
      {...props}
      css={[Styles.HORIZONTAL_CONTAINER_CENTERED, STYLES_JUMPER_ITEM_PADDING, css]}
      style={{ width: "100%", ...style }}
    >
      <div>
        <ObjectBoxPreview
          file={file}
          placeholderRatio={2}
          style={{ width: 20, height: 20, borderRadius: 4 }}
        />
      </div>
      <div style={{ marginLeft: 12, marginRight: 12 }}>
        <div key={`${file.id}-title`}>
          <System.H5 nbrOflines={1} as="h1" style={{ wordBreak: "break-all" }} color="textBlack">
            {file?.name || file?.filename}
          </System.H5>
        </div>
        <Show when={file?.linkSource}>
          <System.P3 nbrOflines={1} color="textBlack" style={{ marginTop: 3 }}>
            {file?.linkSource}
          </System.P3>
        </Show>
      </div>
    </div>
  );
}

export { AnimatePresence, Root, Header, Dismiss, Item, Divider, ObjectInfo };
