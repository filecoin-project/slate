import * as React from "react";
import * as Strings from "~/common/strings";
import * as Styles from "~/common/styles";
import * as Actions from "~/common/actions";
import * as Events from "~/common/custom-events";

import WebsitePrototypeWrapper from "~/components/core/WebsitePrototypeWrapper";

import { SignUpPopover } from "~/components/core/Auth/components";
import { H5, P3 } from "~/components/system/components/Typography";
import { css } from "@emotion/react";
import { ButtonPrimary } from "~/components/system/components/Buttons";
import { useForm } from "~/common/hooks";
import { Input } from "~/components/system";
import { AuthWrapper } from "~/components/core/Auth/components";

const TOOLS_OPTIONS = {
  "Browser Bookmarks": "prevToolsBrowserBookmarks",
  Pinterest: "prevToolsPinterest",
  "Are.na": "prevToolsArena",
  "Notes platform (Notion, Evernote, etc.)": "prevToolsNotesPlatform",
};
const SLATE_USECASES_OPTIONS = {
  "Bookmarking important pages": "useCasesBookmarkingImportantPages",
  "Saving links to read later": "useCasesSavingLinksToReadLater",
  "Searching your browsed pages": "useCasesSearchingYourBrowsedPages",
  "Sharing collections of links": "useCasesSharingCollectionsOfLinks",
};

const REFERRAL_OPTIONS = {
  Twitter: "referralTwitter",
  "IPFS/Filecoin Community": "referralIpfsFilecoinCommunity",
  "From a friend": "referralFriend",
};

// NOTE(amine): form styles
const STYLES_FORM_WRAPPER = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

// NOTE(amine): input styles
const STYLES_SURVEY_INPUT = (theme) => css`
  box-sizing: border-box;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 45px;
  border-radius: 8px;
  box-shadow: 0 0 0 1px ${theme.system.gray};
  background-color: transparent;
  & > input::placeholder {
    ${Styles.H5};
    color: ${theme.semantic.textGray};
    text-align: center;
    opacity: 1;
  }
`;

// NOTE(amine): checkbox styles
const STYLES_CHECKBOX_WRAPPER = (theme) => css`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 45px;
  border-radius: 8px;
  border: 1px solid ${theme.system.gray};
  background-color: transparent;
  transition: all 0.3s;
`;

const STYLES_CHECKBOX_SELECTED = (theme) => css`
  border: 1px solid ${theme.system.blue};
  background-color: ${theme.system.grayLight4};
`;

const STYLES_CHECKBOX_INPUT = css`
  position: absolute;
  z-index: 1;
  opacity: 0;
  top: 0%;
  left: 0%;
  width: 100%;
  height: 100%;
  font-size: 16px;
  ${Styles.HOVERABLE};
`;

function SceneSurvey({ onAction }) {
  const [step, setStep] = React.useState(1);
  const defaultTools = Object.entries(TOOLS_OPTIONS).reduce(
    (acc, [, key]) => ({ ...acc, [key]: false }),
    {}
  );
  const defaultUseCases = Object.entries(SLATE_USECASES_OPTIONS).reduce(
    (acc, [, key]) => ({ ...acc, [key]: false }),
    {}
  );
  const defaultReferrals = Object.entries(REFERRAL_OPTIONS).reduce(
    (acc, [, key]) => ({ ...acc, [key]: false }),
    {}
  );

  const surveyResults = React.useRef({ ...defaultTools, ...defaultUseCases, ...defaultReferrals });

  if (step === 1) {
    return (
      <ToolsForm
        onSubmit={(value) => {
          const tools = value.reduce((acc, item) => {
            const key = TOOLS_OPTIONS[item];

            if (key) acc[key] = true;
            else acc["prevToolsOther"] = item;

            return acc;
          }, {});

          surveyResults.current = {
            ...surveyResults.current,
            ...tools,
          };
          setStep(2);
        }}
      />
    );
  }

  if (step === 2) {
    return (
      <UsecasesForm
        onSubmit={(value) => {
          const useCases = value.reduce((acc, item) => {
            const key = SLATE_USECASES_OPTIONS[item];

            if (key) acc[key] = true;
            else acc["useCasesOther"] = item;

            return acc;
          }, {});

          surveyResults.current = {
            ...surveyResults.current,
            ...useCases,
          };
          setStep(3);
        }}
      />
    );
  }

  return (
    <ReferralForm
      onSubmit={async (value) => {
        const referrals = value.reduce((acc, item) => {
          const key = REFERRAL_OPTIONS[item];

          if (key) acc[key] = true;
          else acc["referralOther"] = item;

          return acc;
        }, {});

        const surveyAnswers = { ...surveyResults.current, ...referrals };

        const response = await Actions.createSurvey(surveyAnswers);
        if (Events.hasError(response)) {
          return;
        }
        onAction({
          type: "UPDATE_VIEWER",
          viewer: { hasCompletedSurvey: true },
        });
      }}
    />
  );
}

const useSurveyValidations = () => {
  const [isSurveyValid, setSurveyValidity] = React.useState(true);
  const checkSurveyValidity = ({ options, other }) => {
    const isValid = options.some((answer) => answer) || !!other;
    setSurveyValidity(isValid);
    return isValid;
  };
  const resetSurveyValidity = () => setSurveyValidity(true);

  return { isSurveyValid, checkSurveyValidity, resetSurveyValidity };
};

const ToolsForm = ({ onSubmit }) => {
  const { isSurveyValid, checkSurveyValidity, resetSurveyValidity } = useSurveyValidations();

  const { getFieldProps, getFormProps, values } = useForm({
    initialValues: { tools: [], other: "" },
    onSubmit: ({ tools, other }) => {
      if (!checkSurveyValidity({ options: tools, other })) return;
      const value = [...tools];
      if (!Strings.isEmpty(other)) {
        value.push(other);
      }
      onSubmit(value);
    },
  });

  React.useEffect(() => {
    resetSurveyValidity();
  }, [values]);

  const isCheckBoxSelected = (fieldValue) => values.tools.some((item) => item === fieldValue);

  return (
    <div>
      <SignUpPopover title="What do you currently use for saving things on the web?">
        <form css={STYLES_FORM_WRAPPER} {...getFormProps()}>
          <H5
            style={{ marginTop: 24 }}
            css={(theme) =>
              css({ color: isSurveyValid ? theme.semantic.textGrayDark : theme.system.red })
            }
          >
            {isSurveyValid ? "Select all that apply" : "Please select at least 1 option"}
          </H5>
          {Object.keys(TOOLS_OPTIONS).map((item, i) => (
            <Checkbox
              key={i}
              style={{ marginTop: 12 }}
              type="checkbox"
              isSelected={isCheckBoxSelected(item)}
              {...getFieldProps("tools", { type: "checkbox" })}
              value={item}
            />
          ))}
          <Input
            inputCss={STYLES_SURVEY_INPUT}
            style={{ marginTop: 12 }}
            placeholder="Others"
            type="text"
            full
            {...getFieldProps("other")}
          />
          <ButtonPrimary type="submit" style={{ marginTop: 24 }} full>
            Next
          </ButtonPrimary>
          <P3 style={{ marginTop: 12 }} color="textBlack">
            1/<div style={{ display: "inline-block" }}>3</div>
          </P3>
        </form>
      </SignUpPopover>
    </div>
  );
};

const UsecasesForm = ({ onSubmit }) => {
  const { isSurveyValid, checkSurveyValidity, resetSurveyValidity } = useSurveyValidations();

  const { getFieldProps, getFormProps, values } = useForm({
    initialValues: { tools: [], other: "" },
    onSubmit: ({ tools, other }) => {
      if (!checkSurveyValidity({ options: tools, other })) return;
      const value = [...tools];
      if (!Strings.isEmpty(other)) {
        value.push(other);
      }
      onSubmit(value);
    },
  });

  React.useEffect(() => {
    resetSurveyValidity();
  }, [values]);

  const isCheckBoxSelected = (fieldValue) => values.tools.some((item) => item === fieldValue);

  return (
    <div>
      <SignUpPopover title="What are you interested in using Slate for?">
        <form css={STYLES_FORM_WRAPPER} {...getFormProps()}>
          <H5
            style={{ marginTop: 24 }}
            css={(theme) =>
              css({ color: isSurveyValid ? theme.semantic.textGrayDark : theme.system.red })
            }
          >
            {isSurveyValid ? "Select all that apply" : "Please select at least 1 option"}
          </H5>
          {Object.keys(SLATE_USECASES_OPTIONS).map((item, i) => (
            <Checkbox
              key={i}
              style={{ marginTop: 12 }}
              type="checkbox"
              isSelected={isCheckBoxSelected(item)}
              {...getFieldProps("tools", { type: "checkbox" })}
              value={item}
            />
          ))}
          <Input
            inputCss={STYLES_SURVEY_INPUT}
            style={{ marginTop: 12 }}
            placeholder="Others"
            type="text"
            full
            {...getFieldProps("other")}
          />
          <ButtonPrimary type="submit" style={{ marginTop: 24 }} full>
            Next
          </ButtonPrimary>
          <P3 style={{ marginTop: 12 }} color="textBlack">
            2/<div style={{ display: "inline-block" }}>3</div>
          </P3>
        </form>
      </SignUpPopover>
    </div>
  );
};

const ReferralForm = ({ onSubmit }) => {
  const { isSurveyValid, checkSurveyValidity, resetSurveyValidity } = useSurveyValidations();

  const { getFieldProps, getFormProps, isSubmitting, values } = useForm({
    initialValues: { referrals: [], other: "" },
    onSubmit: async ({ referrals, other }) => {
      if (!checkSurveyValidity({ options: referrals, other })) return;
      const value = [...referrals];
      if (!Strings.isEmpty(other)) {
        value.push(other);
      }
      await onSubmit(value);
    },
  });

  React.useEffect(() => {
    resetSurveyValidity();
  }, [values]);

  const isCheckBoxSelected = (fieldValue) => values.referrals.some((item) => item === fieldValue);

  return (
    <div>
      <SignUpPopover title="How did you find out about Slate?">
        <form css={STYLES_FORM_WRAPPER} {...getFormProps()}>
          <H5
            style={{ marginTop: 24 }}
            css={(theme) =>
              css({ color: isSurveyValid ? theme.semantic.textGrayDark : theme.system.red })
            }
          >
            {isSurveyValid ? "Select all that apply" : "Please select at least 1 option"}
          </H5>
          {Object.keys(REFERRAL_OPTIONS).map((item, i) => (
            <Checkbox
              key={i}
              style={{ marginTop: 12 }}
              type="checkbox"
              isSelected={isCheckBoxSelected(item)}
              {...getFieldProps("referrals", { type: "checkbox" })}
              value={item}
            />
          ))}
          <Input
            inputCss={STYLES_SURVEY_INPUT}
            style={{ marginTop: 12 }}
            placeholder="Others"
            type="text"
            full
            {...getFieldProps("other")}
          />
          <ButtonPrimary type="submit" loading={isSubmitting} style={{ marginTop: 24 }} full>
            Submit
          </ButtonPrimary>
          <P3 style={{ marginTop: 12 }} color="textBlack">
            3/<div style={{ display: "inline-block" }}>3</div>
          </P3>
        </form>
      </SignUpPopover>
    </div>
  );
};

// eslint-disable-next-line no-unused-vars
const Checkbox = ({ touched, value, style, isSelected, ...props }) => {
  return (
    <div style={style} css={[STYLES_CHECKBOX_WRAPPER, isSelected && STYLES_CHECKBOX_SELECTED]}>
      <H5 color="textBlack" style={{ fontSize: 16 }}>
        {value}
      </H5>
      <input value={value} css={STYLES_CHECKBOX_INPUT} type="checkbox" {...props} />
    </div>
  );
};

const background_image =
  "https://slate.textile.io/ipfs/bafybeiddgkvf5ta6y5b7wamrxl33mtst4detegleblw4gfduhwm3sdwdra";

const STYLES_ROOT = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  font-size: 1rem;

  min-height: 100vh;
  width: 100vw;
  position: absolute;
  overflow: hidden;
  background-image: url(${background_image});
  background-repeat: no-repeat;
  background-size: cover;
`;

const STYLES_MIDDLE = (theme) => css`
  position: relative;
  min-height: 10%;
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: left;
  padding: 24px;
  @media (max-width: ${theme.sizes.mobile}px) {
    padding: 24px 16px;
    //NOTE(amine): additional scroll space for mobile
    padding-bottom: 64px;
  }
`;

const WithCustomWrapper = (Component) => (props) => {
  return (
    <WebsitePrototypeWrapper>
      <AuthWrapper css={STYLES_ROOT} isMobile={props.isMobile}>
        <div css={STYLES_MIDDLE}>
          <Component {...props} />
        </div>
      </AuthWrapper>
    </WebsitePrototypeWrapper>
  );
};

export default WithCustomWrapper(SceneSurvey);
