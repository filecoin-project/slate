import * as React from "react";
import * as Constants from "~/common/constants";
import * as SVG from "~/common/svg";
import * as Strings from "~/common/strings";
import * as Actions from "~/common/actions";

import MiniSearch from "minisearch";
import SlateMediaObjectPreview from "~/components/core/SlateMediaObjectPreview";

import { css } from "@emotion/react";
import { SearchDropdown } from "~/components/core/SearchDropdown";
import { dispatchCustomEvent } from "~/common/custom-events";
import { SlatePreviewRow } from "~/components/core/SlatePreviewBlock";

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
  max-height: 500px;
  padding: 24px;
`;

const STYLES_SEARCH_DROPDOWN = {
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
  return (
    <div css={STYLES_ENTRY}>
      <div css={STYLES_USER_ENTRY_CONTAINER}>
        <div
          style={{ backgroundImage: `url(${item.data.photo})` }}
          css={STYLES_PROFILE_IMAGE}
        />
        {item.data.name ? <strong>{item.data.name}</strong> : null}
        <div>@{item.username}</div>
      </div>
    </div>
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
  margin-left: 32px;
`;

const STYLES_SLATE_IMAGE = css`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 72px;
  width: 72px;
  padding: 8px;
  box-sizing: border-box;
  margin-left: 32px;
`;

const STYLES_LINK_HOVER = css`
  color: ${Constants.system.black};
  text-decoration: none;
  :hover {
    color: ${Constants.system.brand};
  }
`;

const SlateEntry = ({ item }) => {
  return (
    <div css={STYLES_ENTRY}>
      <div css={STYLES_SLATE_ENTRY_CONTAINER}>
        <div css={STYLES_ICON_CIRCLE}>
          <SVG.Slate2 height="16px" />
        </div>
        <strong>{item.data.name}</strong>
        {/* <div>
            <a css={STYLES_LINK_HOVER} href={`/${item.username}`}>   TODO: add the owner to the slate entries 
              @{item.data.username} 
            </a>
          </div> */}
      </div>
      {item.data.objects.length ? (
        <div css={STYLES_SLATE_IMAGES_CONTAINER}>
          <SlatePreviewRow
            numItems={4}
            style={{ width: "72px", height: "72px", padding: "8px" }}
            containerStyle={{
              maxHeight: "72px",
              justifyContent: "flex-start",
            }}
            slate={item}
          />
        </div>
      ) : null}
    </div>
  );
};

const FileEntry = ({ item }) => {
  return (
    <div css={STYLES_ENTRY}>
      <div css={STYLES_USER_ENTRY_CONTAINER}>
        <div css={STYLES_ICON_CIRCLE}>
          <SVG.Folder2 height="16px" />
        </div>
        <strong>{item.data.file.title || item.data.file.name}</strong>
        {/* <a href={`/${file.username}`} css={STYLES_LINK_HOVER}>  TODO: add back in when owner is added to slates
          @{file.username} 
        </a> */}
      </div>
      <div css={STYLES_SLATE_IMAGE}>
        <SlateMediaObjectPreview url={item.data.file.url} type={item.type} />
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

export class SearchModal extends React.Component {
  state = {
    options: [],
    value: null,
    inputValue: "",
  };

  componentDidMount = async () => {
    const response = await Actions.getNetworkDirectory();
    console.log(response);
    this.miniSearch = new MiniSearch({
      fields: ["slatename", "data.name", "username", "filename"],
      storeFields: ["type", "slatename", "username", "data", "id"],
      extractField: (entry, fieldName) => {
        return fieldName
          .split(".")
          .reduce((doc, key) => doc && doc[key], entry);
      },
      searchOptions: {
        fuzzy: 0.2,
      },
    });
    let files = [];
    if (response.data) {
      for (let slate of response.data.slates) {
        if (slate.data.objects.length) {
          files.push(
            ...slate.data.objects.map((file, i) => {
              return {
                type: "FILE",
                id: file.id,
                filename: file.title,
                data: { file, index: i, slate }, //{ ...file.data, index: i, slate },
              };
            })
          );
        }
      }
      this.miniSearch.addAll(response.data.users);
      this.miniSearch.addAll(response.data.slates);
      this.miniSearch.addAll(files);
    }
  };

  _handleChange = (e) => {
    if (this.miniSearch) {
      this.setState({ inputValue: e.target.value }, () => {
        let results = this.miniSearch.search(this.state.inputValue);
        let options = [];
        for (let item of results) {
          if (item.type === "USER") {
            options.push({
              value: {
                type: "USER",
                data: { ...item, slates: [] },
              },
              component: <UserEntry item={item} />,
            });
          } else if (item.type === "SLATE") {
            options.push({
              value: {
                type: "SLATE",
                data: item,
              },
              component: <SlateEntry item={item} />,
            });
          } else if (item.type === "FILE") {
            options.push({
              value: {
                type: "FILE",
                data: item,
              },
              component: <FileEntry item={item} />,
            });
          }
          this.setState({ options });
        }
      });
    }
  };

  _handleSelect = async (value) => {
    if (value.type === "SLATE") {
      this.props.onAction({
        type: "NAVIGATE",
        value: "V1_NAVIGATION_SLATE",
        data: value.data,
      });
    }
    if (value.type === "USER") {
      this.props.onAction({
        type: "NAVIGATE",
        value: "V1_NAVIGATION_PROFILE",
        data: value.data,
      });
    }
    if (value.type === "FILE") {
      this.props.onAction({
        type: "NAVIGATE",
        value: "V1_NAVIGATION_SLATE",
        data: value.data.data.slate,
      });
      dispatchCustomEvent({
        name: "slate-global-open-carousel",
        detail: { index: value.data.data.index },
      });
    }
    dispatchCustomEvent({
      name: "delete-modal",
      detail: {},
    });
  };

  render() {
    return (
      <div css={STYLES_MODAL}>
        <SearchDropdown
          show
          search
          name="exampleThree"
          placeholder="Search..."
          options={this.state.options}
          onSelect={this._handleSelect}
          value={this.state.value}
          onChange={this._handleChange}
          inputValue={this.state.inputValue}
          style={STYLES_SEARCH_DROPDOWN}
          defaultOptions={[]}
          // defaultOptions={options.map((option) => {
          //   return {
          //     name: (
          //       <div
          //         css={STYLES_DROPDOWN_ITEM}
          //         onClick={() => this._handleAction(option.action)}
          //       >
          //         <div
          //           css={STYLES_ICON_CIRCLE}
          //           style={{ height: "40px", width: "40px" }}
          //         >
          //           {option.icon}
          //         </div>
          //         <div>{option.name}</div>
          //       </div>
          //     ),
          //     value: option.name,
          //   };
          // })}
        />
      </div>
    );
  }
}
