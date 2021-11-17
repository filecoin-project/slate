import * as React from "react";
import * as System from "~/components/system";
import * as Styles from "~/common/styles";

import { motion } from "framer-motion";
import { css } from "@emotion/react";
import { ModalPortal } from "../ModalPortal";

const STYLES_ONBOARDING_POPUP = (theme) => css`
  ${Styles.VERTICAL_CONTAINER};
  position: fixed;
  left: 24px;
  bottom: 28px;
  width: 320px;
  border-radius: 16px;
  box-shadow: ${theme.shadow.lightLarge};
  border: 1px solid ${theme.semantic.borderGrayLight};
  z-index: ${theme.zindex.tooltip};

  background-color: ${theme.semantic.bgWhite};
  @supports ((-webkit-backdrop-filter: blur(75px)) or (backdrop-filter: blur(75px))) {
    -webkit-backdrop-filter: blur(75px);
    backdrop-filter: blur(75px);
    background-color: ${theme.semantic.bgBlurWhiteOp};
  }

  @media (max-width: ${theme.sizes.mobile}px) {
    left: 17px;
    bottom: 16px;
  }
`;

const STYLES_POPUP_HEADER = css`
  padding: 13px 16px 8px;
`;

const STYLES_POPUP_CONTENT = css`
  padding: 16px;
`;

export default function Popup({ children, header, css, ...props }) {
  return (
    <ModalPortal>
      <motion.div css={[STYLES_ONBOARDING_POPUP, css]} {...props}>
        <System.H5 as="h1" color="textBlack" css={STYLES_POPUP_HEADER}>
          {header}
        </System.H5>
        <System.Divider color="borderGrayLight" />
        <div css={STYLES_POPUP_CONTENT}>{children}</div>
      </motion.div>
    </ModalPortal>
  );
}
