import * as React from "react";
import * as Constants from "~/common/constants";
import * as SVG from "~/common/svg";
import * as Strings from "~/common/strings";
import * as Actions from "~/common/actions";

import MiniSearch from "minisearch";
import SlateMediaObjectPreview from "~/components/core/SlateMediaObjectPreview";

import { css } from "@emotion/react";
import { InputMenu } from "~/components/system/components/InputMenu";
import { dispatchCustomEvent } from "~/common/custom-events";

const STYLES_ICON_CIRCLE = css`
  height: 24px;
  width: 24px;
  border-radius: 50%;
  background-color: ${Constants.system.foreground};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const STYLES_MODAL = css`
  width: 95vw;
  max-width: 600px;
  height: 60vh;
  padding: 24px;
`;

const STYLES_INPUT_MENU = {
  height: "calc(100% - 80px)",
  width: "calc(100% - 48px)",
  overflowY: "scroll",
};

const STYLES_USER_ENTRY_CONTAINER = css`
  display: grid;
  grid-template-columns: repeat(3, auto) 1fr;
  grid-column-gap: 16px;
  align-items: center;
`;

const STYLES_PROFILE_IMAGE = css`
  background-size: cover;
  background-position: 50% 50%;
  height: 24px;
  width: 24px;
  border-radius: 50%;
`;

const UserEntry = ({ item }) => {
  //TODO: change from link to onAction once profiles are supported in-client
  return (
    <a css={STYLES_LINK} href={`/${item.username}`}>
      <div css={STYLES_ENTRY}>
        <div css={STYLES_USER_ENTRY_CONTAINER}>
          <div
            style={{ backgroundImage: `url(${item.data.photo})` }}
            css={STYLES_PROFILE_IMAGE}
          />
          {item.data.name ? <strong>{item.data.name}</strong> : null}
          <a css={STYLES_LINK_HOVER} href={`/${item.username}`}>
            @{item.username}
          </a>
        </div>
      </div>
    </a>
  );
};

const STYLES_ENTRY = css`
  padding: 8px 0px;
`;

const STYLES_SLATE_ENTRY_CONTAINER = css`
  display: grid;
  grid-template-columns: repeat(3, auto) 1fr;
  grid-column-gap: 16px;
  align-items: center;
`;

const STYLES_SLATE_IMAGES_CONTAINER = css`
  display: grid;
  grid-template-columns: repeat(3, auto) 1fr;
  grid-column-gap: 16px;
  margin: 8px 0px;
  margin-left: 40px;
`;

const STYLES_SLATE_IMAGE = css`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 72px;
  width: 72px;
`;

const STYLES_LINK = css`
  color: ${Constants.system.black};
  text-decoration: none;
`;

const STYLES_LINK_HOVER = css`
  color: ${Constants.system.black};
  text-decoration: none;
  :hover {
    color: ${Constants.system.brand};
  }
`;

const SlateEntry = ({ item, onAction }) => {
  //TODO: utilize auto suggest feature of minisearch
  return (
    <div
      onClick={() => {
        onAction({ type: "NAVIGATE", value: 17, data: item });
      }}
    >
      <div css={STYLES_ENTRY}>
        <div css={STYLES_SLATE_ENTRY_CONTAINER}>
          <div css={STYLES_ICON_CIRCLE}>
            <SVG.Slate2 height="16px" />
          </div>
          <strong>{item.data.name}</strong>
          {/* <div>
            <a css={STYLES_LINK_HOVER} href={`/${item.username}`}>
              @{item.data.username} TODO: add the owner to the slate entries 
            </a>
          </div> */}
        </div>
        {item.data.objects.length ? (
          <div css={STYLES_SLATE_IMAGES_CONTAINER}>
            {item.data.objects.slice(0, 4).map((each) => (
              <div css={STYLES_SLATE_IMAGE}>
                <SlateMediaObjectPreview type={each.type} url={each.url} />
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

const FileEntry = ({ item, onAction }) => {
  return (
    <div
      css={STYLES_LINK}
      onClick={() => {
        onAction({ type: "NAVIGATE", value: 15, data: { url: item.url } });
      }}
    >
      <div css={STYLES_ENTRY}>
        <div css={STYLES_USER_ENTRY_CONTAINER}>
          <div css={STYLES_ICON_CIRCLE}>
            <SVG.Folder2 height="16px" />
          </div>
          <strong>{item.name}</strong>
          <a href={`/${item.username}`} css={STYLES_LINK_HOVER}>
            @{item.username}
          </a>
        </div>
        <div
          style={{
            backgroundImage: `url(${
              item.type === "image" ? item.url : fileImg
            })`,
            margin: "8px 0px 8px 40px",
          }}
          css={STYLES_SLATE_IMAGE}
        />
      </div>
    </div>
  );
};

const STYLES_DROPDOWN_ITEM = css`
  display: grid;
  grid-template-columns: 56px 1fr;
  align-items: center;
  cursor: pointer;
`;

const options = [
  {
    name: "Send money",
    link: null,
    icon: <SVG.Wallet2 height="16px" />,
    action: { type: "NAVIGATE", value: 2 },
  },
  {
    name: "New slate",
    link: null,
    icon: <SVG.Slate2 height="16px" />,
    action: { type: "NAVIGATE", value: 3 },
  },
  {
    name: "Upload file",
    link: null,
    icon: <SVG.Folder2 height="16px" />,
    action: { type: "NAVIGATE", value: "data" },
  },
  {
    name: "Account settings",
    link: null,
    icon: <SVG.Tool2 height="16px" />,
    action: { type: "NAVIGATE", value: 13 },
  },
  {
    name: "Filecoin settings",
    link: null,
    icon: <SVG.Tool2 height="16px" />,
    action: { type: "NAVIGATE", value: 14 },
  },
];

export class SpotlightSearch extends React.Component {
  state = {
    options: [],
    value: null,
    inputValue: "",
  };

  componentDidMount = async () => {
    const response = await Actions.getNetworkDirectory();
    console.log(response.data);
    this.miniSearch = new MiniSearch({
      fields: ["slatename", "data.name", "data.body", "username"], // fields to index for full-text search
      storeFields: ["type", "slatename", "username", "data", "id"], // fields to return with search results
      searchOptions: {
        // boost: { "data.name": 2 },
        fuzzy: 0.2,
      },
    });
    this.miniSearch.addAll(response.data.users);
    this.miniSearch.addAll(response.data.slates);
    //TODO: unpack slates => slate object files and add those too
  };

  _handleChange = (e) => {
    if (e.target.value !== null) {
      if (e.target.value.substring(0, 1) === "/") {
        window.location.pathname = e.target.value;
      } else {
        window.location.href = e.target.value;
      }
    }
  };

  _handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value }, () => {
      let results = this.miniSearch.search(this.state.inputValue);
      let options = [];
      for (let item of results) {
        if (item.type === "USER") {
          options.push({
            value: `/${item.username}`,
            name: <UserEntry item={item} onAction={this.props.onAction} />,
          });
        } else if (item.type === "SLATE") {
          options.push({
            value: `/${item.slatename}`, //change this format for input menu to something more appropriate
            name: <SlateEntry item={item} onAction={this.props.onAction} />,
          });
        }
        // else if (item.type === "image" || item.type == "file") {
        //   options.push({
        //     value: `${item.url}`,
        //     name: <FileEntry item={item} onAction={this.props.onAction} />,
        //   });
        // }
      }
      this.setState({ options });
    });
  };

  _handleAction = (action) => {
    this.props.onAction(action);
    dispatchCustomEvent({
      name: "delete-modal",
      detail: {},
    });
  };

  render() {
    return (
      <div css={STYLES_MODAL}>
        <InputMenu
          show
          search
          name="exampleThree"
          placeholder="Search..."
          options={this.state.options}
          onChange={this._handleChange}
          value={this.state.value}
          onInputChange={this._handleInputChange}
          inputValue={this.state.inputValue}
          style={STYLES_INPUT_MENU}
          defaultOptions={options.map((option) => {
            return {
              name: (
                <div
                  css={STYLES_DROPDOWN_ITEM}
                  onClick={() => this._handleAction(option.action)}
                >
                  <div
                    css={STYLES_ICON_CIRCLE}
                    style={{ height: "40px", width: "40px" }}
                  >
                    {option.icon}
                  </div>
                  <div>{option.name}</div>
                </div>
              ),
              value: option.name,
            };
          })}
        />
      </div>
    );
  }
}
