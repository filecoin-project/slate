import * as React from "react";
import * as System from "~/components/system";
import * as SVG from "~/common/svg";
import * as Styles from "~/common/styles";

import { FileTypeGroup } from "~/components/core/FileTypeIcon";
import { css } from "@emotion/react";
import { useFilterContext } from "~/components/core/Filter/Provider";
import { TagsOnboarding } from "~/components/core/Onboarding/Tags";

import DataView from "~/components/core/DataView";
import EmptyState from "~/components/core/EmptyState";

const STYLES_DATAVIEWER_WRAPPER = (theme) => css`
  width: 100%;
  min-height: 100vh;
  padding: calc(20px + ${theme.sizes.filterNavbar}px) 24px 44px;
  @media (max-width: ${theme.sizes.mobile}px) {
    padding: 31px 16px 44px;
  }
`;

const STYLES_EMPTY_STATE_WRAPPER = (theme) => css`
  // NOTE(amine): 100vh - headers' height - Dataviewer's bottom padding
  height: calc(100vh - ${theme.sizes.filterNavbar + theme.sizes.header}px - 44px);
  margin-top: 0px;
`;

const STYLES_UPLOAD_BUTTON = (theme) => css`
  ${Styles.CONTAINER_CENTERED};
  background-color: ${theme.semantic.bgGrayLight};
  border-radius: 8px;
  width: 24px;
  height: 24px;
  pointer-events: auto;
  box-shadow: ${theme.shadow.lightSmall};
`;

export function Content({ viewer, onAction, page, ...props }) {
  const [{ filterState }] = useFilterContext();
  const { objects } = filterState;

  const isOnboardingActive =
    viewer?.onboarding?.upload &&
    !viewer?.onboarding?.tags &&
    filterState?.type === "library" &&
    objects.length > 0;

  return (
    <div css={STYLES_DATAVIEWER_WRAPPER} {...props}>
      {objects.length > 0 ? (
        <TagsOnboarding onAction={onAction} viewer={viewer} isActive={isOnboardingActive}>
          <DataView
            key="scene-files-folder"
            /** TODO(amine): when updating filters, update isOwner prop */
            isOwner={true}
            items={objects}
            onAction={onAction}
            viewer={viewer}
            page={page}
            view="grid"
          />
        </TagsOnboarding>
      ) : (
        <EmptyState css={STYLES_EMPTY_STATE_WRAPPER}>
          <FileTypeGroup />
          <div style={{ marginTop: 24 }} css={Styles.HORIZONTAL_CONTAINER_CENTERED}>
            <System.H5>Use</System.H5>
            <span css={STYLES_UPLOAD_BUTTON} style={{ marginLeft: 8 }}>
              <SVG.Plus height="16px" />
            </span>
            <System.H5 style={{ marginLeft: 8 }}>or drop files to save to Slate</System.H5>
          </div>
        </EmptyState>
      )}
    </div>
  );
}
