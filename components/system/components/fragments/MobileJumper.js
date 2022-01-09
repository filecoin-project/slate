import * as React from "react";
import * as System from "~/components/system";
import * as Styles from "~/common/styles";
import * as SVG from "~/common/svg";

import { css } from "@emotion/react";
import { FullHeightLayout } from "~/components/system/components/FullHeightLayout";
import { motion, AnimatePresence as FramerAnimatePresence } from "framer-motion";
import { ModalPortal } from "~/components/core/ModalPortal";
import { useLockScroll } from "~/common/hooks";
import { useRestoreFocus, useTrapFocus } from "~/common/hooks/a11y";
import { ObjectInfo as ObjectInfoPrimitive } from "~/components/system/components/fragments/Jumper";

/* -------------------------------------------------------------------------------------------------
 *  AnimatePresence
 * -----------------------------------------------------------------------------------------------*/

function AnimatePresence({ children, ...props }) {
  return <FramerAnimatePresence {...props}>{children}</FramerAnimatePresence>;
}

/* -------------------------------------------------------------------------------------------------
 *  Root
 * -----------------------------------------------------------------------------------------------*/

const STYLES_JUMPER_MOBILE_WRAPPER = (theme) => css`
  ${Styles.VERTICAL_CONTAINER};
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: ${theme.zindex.jumper};

  background-color: ${theme.semantic.bgWhite};

  @supports ((-webkit-backdrop-filter: blur(75px)) or (backdrop-filter: blur(75px))) {
    background-color: ${theme.semantic.bgBlurWhiteOP};
    -webkit-backdrop-filter: blur(75px);
    backdrop-filter: blur(75px);
  }
`;

const JumperContext = React.createContext({});
const useJumperContext = () => React.useContext(JumperContext);

function Root({ children, onClose, ...props }) {
  useLockScroll();

  const wrapperRef = React.useRef();
  useTrapFocus({ ref: wrapperRef });
  useRestoreFocus();

  return (
    <ModalPortal>
      <FullHeightLayout
        as={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        css={[STYLES_JUMPER_MOBILE_WRAPPER, css]}
        ref={wrapperRef}
        {...props}
      >
        <JumperContext.Provider value={{ onClose }}>{children}</JumperContext.Provider>
      </FullHeightLayout>
    </ModalPortal>
  );
}

/* -------------------------------------------------------------------------------------------------
 *  Header
 * -----------------------------------------------------------------------------------------------*/

const STYLES_JUMPER_MOBILE_HEADER = css`
  ${Styles.HORIZONTAL_CONTAINER_CENTERED};
  justify-content: space-between;
  padding: 14px 16px;
`;

function Header({ children, ...props }) {
  return (
    <div css={[STYLES_JUMPER_MOBILE_HEADER, css]} {...props}>
      {children}
    </div>
  );
}

/* -------------------------------------------------------------------------------------------------
 *  Dismiss
 * -----------------------------------------------------------------------------------------------*/

const STYLES_DISMISS_BUTTON = (theme) => css`
  ${Styles.CONTAINER_CENTERED};
  width: 32px;
  height: 32px;
  color: ${theme.semantic.textGray};
`;

const Dismiss = React.forwardRef(({ css, ...props }, ref) => {
  const { onClose } = useJumperContext();

  return (
    <System.ButtonPrimitive
      ref={ref}
      css={[STYLES_DISMISS_BUTTON, css]}
      onClick={onClose}
      {...props}
    >
      <SVG.Dismiss width={16} height={16} />
    </System.ButtonPrimitive>
  );
});

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
 *  Content
 * -----------------------------------------------------------------------------------------------*/

const STYLES_JUMPER_MOBILE_CONTENT = css`
  flex-grow: 1;
  overflow-y: auto;
  padding: 12px 16px;
`;

function Content({ children, ...props }) {
  return (
    <div css={[STYLES_JUMPER_MOBILE_CONTENT, css]} {...props}>
      {children}
    </div>
  );
}

const STYLES_JUMPER_MOBILE_FOOTER = (theme) => css`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 8px 16px;
  min-height: 48px;

  border-top: 1px solid ${theme.semantic.borderGrayLight4};
  background-color: ${theme.semantic.bgWhite};
  @supports ((-webkit-backdrop-filter: blur(75px)) or (backdrop-filter: blur(75px))) {
    background-color: ${theme.semantic.bgBlurWhite};
    -webkit-backdrop-filter: blur(75px);
    backdrop-filter: blur(75px);
  }
`;

/* -------------------------------------------------------------------------------------------------
 *  ObjectInfo
 * -----------------------------------------------------------------------------------------------*/

const STYLES_OBJECTINFO_PADDING = css`
  padding: 13px 16px 11px;
`;

function ObjectInfo({ css, ...props }) {
  return <ObjectInfoPrimitive {...props} css={[STYLES_OBJECTINFO_PADDING, css]} />;
}

/* -------------------------------------------------------------------------------------------------
 *  Footer
 * -----------------------------------------------------------------------------------------------*/

function Footer({ children, css, ...props }) {
  return (
    <div css={[STYLES_JUMPER_MOBILE_FOOTER, css]} {...props}>
      {children}
    </div>
  );
}

export { AnimatePresence, Root, Header, ObjectInfo, Dismiss, Divider, Content, Footer };
