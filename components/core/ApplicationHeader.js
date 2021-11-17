import * as React from "react";
import * as Constants from "~/common/constants";
import * as SVG from "~/common/svg";
import * as Styles from "~/common/styles";
import * as Upload from "~/components/core/Upload";
import * as Filter from "~/components/core/Filter";
import * as Actions from "~/common/actions";

import {
  ApplicationUserControls,
  ApplicationUserControlsPopup,
} from "~/components/core/ApplicationUserControls";

import { css } from "@emotion/react";
import { DarkSymbol } from "~/common/logo";
import { Link } from "~/components/core/Link";
import { ButtonPrimary, ButtonTertiary } from "~/components/system/components/Buttons";
import { Match, Switch } from "~/components/utility/Switch";
import { Show } from "~/components/utility/Show";
import { useField, useMediaQuery } from "~/common/hooks";
import { Input } from "~/components/system/components/Input";
import { AnimatePresence, motion } from "framer-motion";
import { UploadOnboarding } from "~/components/core/Onboarding/Upload";

const STYLES_SEARCH_COMPONENT = (theme) => css`
  background-color: transparent;
  box-shadow: none;
  height: 100%;
  input {
    height: 100%;
    padding: 0px 4px;
    border-radius: 0px;
  }
  &::placeholder {
    color: ${theme.semantic.textGray};
  }
`;

const STYLES_DISMISS_BUTTON = (theme) => css`
  display: block;
  ${Styles.BUTTON_RESET};
  color: ${theme.semantic.textGray};
`;

const STYLES_APPLICATION_HEADER_BACKGROUND = (theme) => css`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: -1;
  background-color: ${theme.system.white};
  box-shadow: 0 0 0 1px ${theme.semantic.bgGrayLight};
  @supports ((-webkit-backdrop-filter: blur(75px)) or (backdrop-filter: blur(75px))) {
    -webkit-backdrop-filter: blur(75px);
    backdrop-filter: blur(75px);
    background-color: rgba(255, 255, 255, 0.7);
  }
`;

const STYLES_APPLICATION_HEADER = css`
  ${Styles.HORIZONTAL_CONTAINER_CENTERED};
  padding: 14px 24px;
  @media (max-width: ${Constants.sizes.mobile}px) {
    padding: 16px 16px 12px;
    width: 100%;
  }
`;

const STYLES_LEFT = css`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const STYLES_MIDDLE = css`
  flex-grow: 1;
  height: 100%;
  padding: 0 12px;
`;

const STYLES_RIGHT = css`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const STYLES_BACKGROUND = css`
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-color: ${Constants.semantic.bgBlurDark};
  pointer-events: auto;
  @keyframes fade-in {
    from {
      opacity: 50%;
    }
    to {
      opacity: 100%;
    }
  }
  animation: fade-in 200ms ease-out;
`;

const STYLES_HEADER = css`
  z-index: ${Constants.zindex.header};
  width: 100vw;
  position: fixed;
  right: 0;
  top: 0;
`;

const STYLES_FILTER_NAVBAR = (theme) => css`
  z-index: ${theme.zindex.body};
  width: 100vw;
  position: fixed;
  right: 0;
  top: ${theme.sizes.header};
`;

const STYLES_UPLOAD_BUTTON = css`
  position: relative;
  ${Styles.CONTAINER_CENTERED};
  background-color: ${Constants.semantic.bgGrayLight};
  border-radius: 8px;
  width: 24px;
  height: 24px;
  cursor: pointer;
  pointer-events: auto;
`;

export default function ApplicationHeader({ viewer, page, data, onAction, isMobile }) {
  const [state, setState] = React.useState({
    showDropdown: false,
    popup: null,
    isRefreshing: false,
    query: "",
  });

  const _handleTogglePopup = (value) => {
    if (!value || state.popup === value) {
      setState((prev) => ({ ...prev, popup: null }));
    } else {
      setState((prev) => ({ ...prev, popup: value, showDropdown: false }));
    }
  };

  const _handleInputChange = (e) => {
    setState((prev) => ({ ...prev, query: e.target.value }));
  };

  //TODO(amine): plug in the right values
  //for more context, look at node_common/managers/search/search.js
  //userId: (optional) the id of the user whose stuff we are searching through. If specified, globalSearch is disregarded since the search will be limited to that user's public items. Does not apply when searching for type USER
  //types: leaving it null searches everything. Doing ["SLATE"] searches just slates, doing ["USER", "FILE"] searches users and files.
  //globalSearch: whether you are just searching the user's files/slates or global files/slates. This option doesn't exist for searching users since there is no notion of public or private users
  //tagIds: only applies when searching files. the ids of the tags (aka collections) you are searching within. aka if you only want to search for files in a given slate, provide that slate's id. If no tag ids are provided, it searches all files
  //grouped: whether to group the results by type (slate, user, file) when searching multiple types. Doesn't apply when searching only one type e.g. types: ["SLATE"]
  const handleSearch = async () => {
    const response = await Actions.search({
      types: null,
      query: state.query,
      globalSearch: true,
      tagIds: null,
      grouped: true,
    });
    console.log(response);
  };

  const {
    getFieldProps,
    value: searchQuery,
    setFieldValue,
  } = useField({
    initialValue: "",
    onSubmit: handleSearch,
  });

  const handleDismissSearch = () => setFieldValue("");

  const { mobile } = useMediaQuery();
  const isSignedOut = !viewer;
  const isSearching = searchQuery.length !== 0;

  return (
    <>
      <div css={STYLES_HEADER}>
        <header style={{ position: "relative" }}>
          <div css={STYLES_APPLICATION_HEADER}>
            <div css={STYLES_LEFT}>
              <Show
                when={viewer}
                fallback={
                  <Link onAction={onAction} href="/_/data" style={{ pointerEvents: "auto" }}>
                    <DarkSymbol style={{ height: 24, display: "block" }} />
                  </Link>
                }
              >
                <ApplicationUserControls
                  popup={mobile ? false : state.popup}
                  onTogglePopup={_handleTogglePopup}
                  viewer={viewer}
                  onAction={onAction}
                />
              </Show>
            </div>
            <div css={STYLES_MIDDLE}>
              {/**TODO: update Search component */}
              <Input
                containerStyle={{ height: "100%" }}
                full
                placeholder={`Search ${!viewer ? "slate.host" : ""}`}
                inputCss={STYLES_SEARCH_COMPONENT}
                onSubmit={handleSearch}
                name="search"
                {...getFieldProps()}
                onChange={_handleInputChange}
                value={state.query}
              />
            </div>
            <UploadOnboarding onAction={onAction} viewer={viewer} isMobile={isMobile}>
              <Upload.Provider page={page} data={data} viewer={viewer}>
                <Upload.Root data={data}>
                  <div css={STYLES_RIGHT}>
                    <UserActions
                      uploadAction={
                        <Upload.Trigger
                          viewer={viewer}
                          aria-label="Upload"
                          css={STYLES_UPLOAD_BUTTON}
                        >
                          <SVG.Plus height="16px" />
                        </Upload.Trigger>
                      }
                      isSearching={isSearching}
                      isSignedOut={isSignedOut}
                      onAction={onAction}
                      onDismissSearch={handleDismissSearch}
                    />
                  </div>
                </Upload.Root>
              </Upload.Provider>
            </UploadOnboarding>
          </div>
          <Show when={mobile && state.popup === "profile"}>
            <ApplicationUserControlsPopup
              popup={state.popup}
              onTogglePopup={_handleTogglePopup}
              viewer={viewer}
              onAction={onAction}
              style={{ pointerEvents: "auto" }}
            />
            <div css={STYLES_BACKGROUND} />
          </Show>
          {/** NOTE(amine): a fix for a backdrop-filter bug where the filter doesn't take any effects.
           *   It happens when we have two elements using backdrop-filter with a parent-child relationship */}
          <div css={STYLES_APPLICATION_HEADER_BACKGROUND} />
        </header>
      </div>
      <div css={STYLES_FILTER_NAVBAR}>
        <Show when={!!viewer}>
          <Filter.Navbar />
        </Show>
      </div>
    </>
  );
}

const UserActions = ({ uploadAction, isSignedOut, isSearching, onAction, onDismissSearch }) => {
  const authActions = React.useMemo(
    () => (
      <>
        <Link href="/_/auth?tab=signin" onAction={onAction} style={{ pointerEvents: "auto" }}>
          <span css={Styles.MOBILE_HIDDEN}>
            <ButtonTertiary
              style={{
                padding: "0px 12px",
                minHeight: "30px",
                fontFamily: Constants.font.text,
                marginRight: 8,
              }}
            >
              Sign in
            </ButtonTertiary>
          </span>
        </Link>
        <Link href="/_/auth?tab=signup" onAction={onAction} style={{ pointerEvents: "auto" }}>
          <ButtonPrimary
            style={{ padding: "0px 12px", minHeight: "30px", fontFamily: Constants.font.text }}
          >
            Sign up
          </ButtonPrimary>
        </Link>
      </>
    ),
    [onAction]
  );

  return (
    <AnimatePresence>
      <Switch fallback={uploadAction}>
        <Match when={isSignedOut}>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ y: 10, opacity: 0 }}
          >
            {authActions}
          </motion.div>
        </Match>
        <Match when={isSearching}>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ y: -10, opacity: 0 }}
          >
            <button
              onClick={onDismissSearch}
              style={{ marginRight: 4 }}
              css={STYLES_DISMISS_BUTTON}
            >
              <SVG.Dismiss style={{ display: "block" }} height={16} width={16} />
            </button>
          </motion.div>
        </Match>
      </Switch>
    </AnimatePresence>
  );
};
