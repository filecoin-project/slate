import * as React from "react";
import * as System from "~/components/system";
import * as Actions from "~/common/actions";
import * as SVG from "~/common/svg";

import { ModalPortal } from "~/components/core/ModalPortal";
import { useIsomorphicLayoutEffect } from "~/common/hooks";
import { css } from "@emotion/react";

import OnboardingPopup from "~/components/core/Onboarding/Popup";

/* -------------------------------------------------------------------------------------------------
 * Provider
 * -----------------------------------------------------------------------------------------------*/

const TagsOnboardingContext = React.createContext();
export const useTagsOnboardingContext = () => React.useContext(TagsOnboardingContext);

const steps = {
  trigger: "trigger",
  jumper: "jumper",
  finish: "finish",
};

function Provider({ children, onAction, viewer, ...props }) {
  const [currentStep, setCurrentStep] = React.useState(
    viewer?.onboarding?.tags ? steps.finish : steps.trigger
  );

  useIsomorphicLayoutEffect(() => {
    if (currentStep === steps.finish) {
      onAction({
        type: "UPDATE_VIEWER",
        viewer: { onboarding: { ...viewer.onboarding, tags: true } },
      });
      Actions.updateOnboarding({ tags: true });
    }
  }, [currentStep]);

  const contextValue = React.useMemo(
    () => ({
      currentStep,
      steps,
      goToNextStep() {
        if (currentStep === steps.finish) return;

        const nextStep = { trigger: "jumper", jumper: "finish" };
        setCurrentStep((prev) => nextStep[prev]);
      },
    }),
    [currentStep]
  );

  return (
    <TagsOnboardingContext.Provider value={contextValue} {...props}>
      {children}
    </TagsOnboardingContext.Provider>
  );
}

/* -------------------------------------------------------------------------------------------------
 * TagsWalkthrought
 * -----------------------------------------------------------------------------------------------*/

const STYLES_TAGS_BUTTON = (theme) => css`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background-color: ${theme.semantic.bgGrayLight4};
  border-radius: 8px;
  padding: 2px;
  position: relative;
  top: 3px;
`;

function TagsWalkthrought() {
  const [isOrganizeTagsPopupVisible, setOrganizeTagsPopupVisiblity] = React.useState(true);
  const hideOrganizeTagsPopup = () => setOrganizeTagsPopupVisiblity(false);

  const [isTagsPrivacyPopupVisible, setTagsPrivacyPopupVisibility] = React.useState(true);
  const hideTagsPrivacyPopup = () => setTagsPrivacyPopupVisibility(false);

  const { currentStep, steps } = useTagsOnboardingContext();

  if (
    (currentStep === steps.trigger && isOrganizeTagsPopupVisible) ||
    (currentStep === steps.jumper && isTagsPrivacyPopupVisible)
  ) {
    return (
      <ModalPortal>
        <OnboardingPopup
          header={currentStep === steps.trigger ? "Organize with tags" : "Tag privacy"}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: currentStep === steps.trigger ? 1 : 0, ease: "easeInOut" }}
        >
          {currentStep === steps.trigger ? (
            <>
              <System.P2 color="textBlack">
                Hover over the object, then select
                <span css={STYLES_TAGS_BUTTON} style={{ marginLeft: 8, marginRight: 8 }}>
                  <SVG.Hash width={16} height={16} />
                </span>
                to apply tags to it.
              </System.P2>
              <System.ButtonPrimary
                style={{ display: "block", marginLeft: "auto", marginTop: 14, minHeight: "24px" }}
                onClick={hideOrganizeTagsPopup}
              >
                Got it
              </System.ButtonPrimary>
            </>
          ) : null}
          {currentStep === steps.jumper ? (
            <>
              <System.P2 color="textBlack">
                All your objects are link-access only by default. If you apply public tags on them,
                they will show up on your profile.
              </System.P2>
              <System.ButtonPrimary
                style={{ display: "block", marginLeft: "auto", marginTop: 14, minHeight: "24px" }}
                onClick={hideTagsPrivacyPopup}
              >
                Got it
              </System.ButtonPrimary>
            </>
          ) : null}
        </OnboardingPopup>
      </ModalPortal>
    );
  }

  return null;
}

export function TagsOnboarding({ isActive, onAction, viewer, children }) {
  return (
    <Provider viewer={viewer} onAction={onAction}>
      {isActive ? <TagsWalkthrought /> : null}
      {children}
    </Provider>
  );
}
