import * as React from "react";
import * as Jumper from "~/components/core/Jumper";
import * as System from "~/components/system";
import * as Logging from "~/common/logging";
import * as Strings from "~/common/strings";
import * as Styles from "~/common/styles";
import * as Constants from "~/common/constants";
import * as SVG from "~/common/svg";
import * as Validations from "~/common/validations";
import * as Events from "~/common/custom-events";
import * as Actions from "~/common/actions";
import * as UserBehaviors from "~/common/user-behaviors";

import { css } from "@emotion/react";
import { useSettingsContext } from "~/components/core/Settings/Provider";
import { AnimatePresence, motion } from "framer-motion";

import ProfilePhoto from "~/components/core/ProfilePhoto";

import { Input } from "~/components/system/components/Input";
import { Textarea } from "~/components/system/components/Textarea";
import { ButtonPrimary, ButtonSecondary } from "~/components/system/components/Buttons";
import * as Type from "~/components/system/components/Typography";

const STYLES_FLEX_COLUMN = `
  display: flex;
  flex-direction: column;
  position: static;
  align-items: flex-start;
`;

const STYLES_JUMPER_HEADER = css`
  ${Styles.HORIZONTAL_CONTAINER_CENTERED};
  padding: 17px 20px 15px;
`;

const STYLES_JUMPER_OVERLAY = (theme) => css`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: ${theme.zindex.jumper};
  @supports ((-webkit-backdrop-filter: blur(75px)) or (backdrop-filter: blur(75px))) {
    -webkit-backdrop-filter: blur(75px);
    backdrop-filter: blur(75px);
    background-color: ${theme.semantic.bgBlurLightTRN};
  }
`;

const STYLES_JUMPER_DISMISS_BUTTON = (theme) => css`
  ${Styles.BUTTON_RESET};
  color: ${theme.semantic.textGray};
`;

const STYLES_JUMPER_MAIN = css`
  ${Styles.HORIZONTAL_CONTAINER};
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  height: 348px;
  order: 1;
`;

const STYLES_JUMPER_SIDEBAR = css`
  ${Styles.HORIZONTAL_CONTAINER};
  align-items: flex-start;
  width: 190px;
  height: 100%;
  padding: 20px 0px;
  border-right: 1px solid ${Constants.system.grayLight5};
`;

const STYLES_JUMPER_CONTENT = css`
  ${STYLES_FLEX_COLUMN}
  align-items: flex-start;
  width: 100%;
  height: 340px;
  overflow: scroll;
  margin: 0px 20px;
  padding-bottom: 160px;
  padding-top: 20px;
  ::-webkit-scrollbar {
    width: 0;
    background: transparent; 
  }
`;

const STYLES_ACCOUNT = css`
  ${STYLES_FLEX_COLUMN}
  align-items: center;
  width: 100%;
`;

const STYLES_ACCOUNT_USER = css`
  ${STYLES_FLEX_COLUMN}
  align-items: center;
  margin: 10px 0px;
`;

const STYLES_ITEM_CONTAINER = css`
  ${STYLES_FLEX_COLUMN}
  width: 100%;
  height: 76px;
  margin-top: 24px;
`;

const STYLES_ITEM_HEADER = css`
  font-size: 12px;
  margin-bottom: 8px;
  color: ${Constants.system.gray};
`;

const STYLES_AVATAR_BOX = css`
  ${STYLES_FLEX_COLUMN}
  width: 100%;
  height: 76px;
`;

const STYLES_AVATAR_UPLOAD = css`
  ${Styles.HORIZONTAL_CONTAINER};
  align-items: flex-end;
`;

const STYLES_EDIT_INFO_FOOTER = css`
  display: flex;
  position: absolute;
  bottom: 0;
  right: 0;
  width: 448px;
  height: 50px;
  padding: 12px 20px;
  background-color: ${Constants.system.white};
  border-radius: 0px 0px 16px 0px;
  border-top: 1px solid ${Constants.system.grayLight5};
`;

const STYLES_MENU_CONTAINER = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px;
  width: 200px;
  height: auto;
`;

const STYLES_MENU_ITEM = css`
  display: flex;
  font-weight: 400;
  font-size: 14px;
  width: 100%;
  height: 32px;
  border-radius: 12px;
  padding: 8px;
  :hover {
    background-color: ${Constants.system.grayLight5};
    cursor: pointer;
  }
`;

const STYLES_MENU_ITEM_ICON = css`
  display:flex;
  width: 16px;
  height: 16px;
  margin-right: 16px;
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

function truncateString(str, num) {
  if (str.length > num) {
    return str.slice(0, num) + "...";
  } else {
    return str;
  }
}

const Sidebar = (props) => {
  return (
    <div css={STYLES_JUMPER_SIDEBAR}>
      <div css={STYLES_ACCOUNT}>
        <ProfilePhoto
          user={props.viewer}
          style={{ marginBottom: "4px", borderRadius: '10px' }}
          size={48}
        />
        <div css={STYLES_ACCOUNT_USER}>
          <p style={{ fontWeight: "500", fontSize: "14px" }}>{props.viewer.name}</p>
          <p style={{ fontWeight: "normal", fontSize: "12px" }}>
            {truncateString(props.viewer.email, 20)}
          </p>
        </div>

        <div css={STYLES_MENU_CONTAINER}>
          {props.tabs.map((tab, i) => {     
             return(                 
               <div css={STYLES_MENU_ITEM} key={i}>
                 <div css={STYLES_MENU_ITEM_ICON}>
                  {tab.icon}
                </div>
                {tab.title}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const TabContent = (props) => {
  const [state, setState] = React.useState({
    username: props.viewer.username,
    name: props.viewer.name,
    body: props.viewer.body || "",
    photo: props.viewer.photo,
    changingAvatar: false,
    savingNameBio: false,
    modalShow: false,
  });

  const _handleChange = (e) => {
    setState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const _handleUpload = async (e) => {
    setState((prev) => ({ ...prev, changingAvatar: true }));
    
    let file = await UserBehaviors.uploadImage(e.target.files[0]);
    if (!file) {
      setState((prev) => ({ ...prev, changingAvatar: false }));
      return;
    }

    const cid = file.cid;
    const url = Strings.getURLfromCID(cid);
    
    let updateResponse = await Actions.updateViewer({
      user: {
        photo: url,
      },
    });

    Events.hasError(updateResponse);
    setState((prev) => ({ ...prev, changingAvatar: false, photo: url }));
  };

  const _handleSave = async (e) => {
    if (!Validations.username(state.username)) {
      Events.dispatchMessage({
        message: "Please include only letters and numbers in your username",
      });
      return;
    }
    /*
    props.onAction({
      type: "UPDATE_VIEWER",
      viewer: { username: state.username, name: state.name, body: state.body },
    });
    */
    setState((prev) => ({ ...prev, savingNameBio: true }));

    let response = await Actions.updateViewer({
      user: {
        name: state.name,
        photo: state.photo,
        body: state.body,
      },
    });

    Events.hasError(response);
    setState((prev) => ({ ...prev, savingNameBio: false }));
  };

  return (
    <>
      <div css={STYLES_JUMPER_CONTENT}>
        <div css={STYLES_AVATAR_BOX}>
          <p css={STYLES_ITEM_HEADER}>Avatar</p>
          <div css={STYLES_AVATAR_UPLOAD}>
            <ProfilePhoto
              user={state}
              size={48}
              style={{ borderRadius: '10px' }}
            />

            <input 
              type="file"
              id="file-input-id"
              css={STYLES_FILE_HIDDEN}
              onChange={_handleUpload}
            />

            <ButtonSecondary
              style={{ marginLeft: "8px", minHeight: "24px", borderRadius: '8px' }}
              type="label"
              htmlFor="file-input-id"
              loading={state.changingAvatar}
            >
              Upload
            </ButtonSecondary>

          </div>
        </div>

        <div css={STYLES_ITEM_CONTAINER}>
          <p css={STYLES_ITEM_HEADER}>Display name</p>
          <Input
            name="name"
            value={state.name}
            placeholder="Your name..."
            maxLength="255"
            onChange={_handleChange}
          />
        </div>

        <div css={STYLES_ITEM_CONTAINER}>
          <p css={STYLES_ITEM_HEADER}>Bio</p>
          <Textarea
            name="body"
            value={state.body}
            placeholder="A bit about yourself..."
            maxLength="2000"
            onChange={_handleChange}
          />
        </div>

        <div css={STYLES_EDIT_INFO_FOOTER}>
          <ButtonSecondary 
            style={{ minHeight: "24px", marginLeft: "auto", borderRadius: '8px' }}
          >
            Cancel
          </ButtonSecondary>
          <ButtonPrimary
            style={{ minHeight: "24px", marginLeft: '8px', borderRadius: '8px' }}
            onClick={_handleSave}
            loading={state.savingNameBio}
          >
            Save
          </ButtonPrimary>
        </div>
      </div>
    </>
  );
};

export function SettingsJumper({ data }) {
  const [{ isSettingsJumperVisible }, { hideSettingsJumper }] = useSettingsContext();

  const handleChange = (e) => {
    setState((prev) => ({ ...prev, [e.target.name]: e.target.value, urlError: false }));
  };

  const tabs = [
    {
      title: 'Storage',
      icon: <SVG.HardDrive />
    },
    {
      title: 'Profile',
      icon: <SVG.Users />
    },
    {
      title: 'Account',
      icon: <SVG.Settings />
    },
  ]

  return (
    <>

      <AnimatePresence>
        {isSettingsJumperVisible && (
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 10, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            css={STYLES_JUMPER_OVERLAY}
          />
        )}
      </AnimatePresence>
      
      <Jumper.Root isOpen={isSettingsJumperVisible} onClose={hideSettingsJumper}>
        <Jumper.Item css={STYLES_JUMPER_HEADER}>
          <System.H5 color="textBlack">Settings</System.H5>
          <button
            style={{ marginLeft: "auto" }}
            css={STYLES_JUMPER_DISMISS_BUTTON}
            onClick={hideSettingsJumper}
          >
            <SVG.Dismiss width={20} style={{ display: "block" }} />
          </button>
        </Jumper.Item>

        <Jumper.Divider />

        <Jumper.Item css={STYLES_JUMPER_MAIN}>
          <Sidebar viewer={data} tabs={tabs} />
          <TabContent viewer={data} onClose={hideSettingsJumper} />
        </Jumper.Item>

      </Jumper.Root>
    </>
  );
}
