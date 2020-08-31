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
import { LoaderSpinner } from "~/components/system/components/Loaders";

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
  :hover {
    color: ${Constants.system.brand};
  }
`;

const STYLES_TITLE = css`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const SlateEntry = ({ item }) => {
  return (
    <div css={STYLES_ENTRY}>
      <div css={STYLES_SLATE_ENTRY_CONTAINER}>
        <div css={STYLES_ICON_CIRCLE}>
          <SVG.Slate2 height="16px" />
        </div>
        <div css={STYLES_TITLE}>{item.data.name}</div>
        {item.owner && item.owner.username ? (
          <div>@{item.owner.username}</div>
        ) : null}
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
            previewStyle={{ fontSize: "12px", padding: "4px" }}
            slate={item}
            small
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
        <div css={STYLES_TITLE}>
          {item.data.file.title || item.data.file.name}
        </div>
        {item.data.slate.owner && item.data.slate.owner.username ? (
          <div>@{item.data.slate.owner.username}</div>
        ) : null}
      </div>
      <div css={STYLES_SLATE_IMAGE}>
        <SlateMediaObjectPreview
          style={{ fontSize: "12px", padding: "4px" }}
          url={item.data.file.url}
          type={item.data.file.type}
        />
      </div>
    </div>
  );
};

const STYLES_LOADER = css`
  position: absolute;
  top: calc(50% - 22px);
  left: calc(50% - 22px);
`;

export class SearchModal extends React.Component {
  state = {
    loading: true,
    results: [],
    inputValue: "",
  };

  componentDidMount = async () => {
    await this.fillDirectory();
    this.setState({ loading: false });
  };

  fillDirectory = async () => {
    const response = await Actions.getNetworkDirectory();
    this.miniSearch = new MiniSearch({
      fields: ["slatename", "data.name", "username", "filename"],
      storeFields: [
        "type",
        "slatename",
        "username",
        "data",
        "id",
        "slates",
        "owner",
      ],
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
                data: { file, index: i, slate },
              };
            })
          );
        }
      }
      this.users = response.data.users;
      this.slates = response.data.slates;
      this.miniSearch.addAll(response.data.users);
      this.miniSearch.addAll(response.data.slates);
      this.miniSearch.addAll(files);
      console.log(response.data.slates);
      console.log(files);
    }
  };

  _handleChange = (e) => {
    if (!this.state.loading) {
      this.setState({ inputValue: e.target.value }, () => {
        let searchResults = this.miniSearch.search(this.state.inputValue);
        let results = [];
        for (let item of searchResults) {
          if (item.type === "USER") {
            results.push({
              value: {
                type: "USER",
                data: item,
              },
              component: <UserEntry item={item} />,
            });
          } else if (item.type === "SLATE") {
            results.push({
              value: {
                type: "SLATE",
                data: item,
              },
              component: (
                <SlateEntry item={item} onAction={this.props.onAction} />
              ),
            });
          } else if (item.type === "FILE") {
            results.push({
              value: {
                type: "FILE",
                data: item,
              },
              component: <FileEntry item={item} />,
            });
          }
          this.setState({ results });
        }
      });
    }
  };

  _handleSelect = async (value) => {
    if (value.type === "SLATE") {
      if (value.data.owner && value.data.owner.username) {
        value.data.owner = this.users.filter((user) => {
          return user.username === value.data.owner.username;
        })[0];
      } //TODO: slightly hacky way of getting the data. May want to serialize later?
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
      let slate = value.data.data.slate;
      if (slate.owner && slate.owner.username) {
        slate.owner = this.users.filter((user) => {
          return user.username === slate.owner.username;
        })[0];
      } //TODO: slightly hacky way of getting the data. May want to serialize later?
      this.props.onAction({
        type: "NAVIGATE",
        value: "V1_NAVIGATION_SLATE",
        data: slate,
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
          placeholder="Search..."
          results={this.state.results}
          onSelect={this._handleSelect}
          onChange={this._handleChange}
          inputValue={this.state.inputValue}
          style={STYLES_SEARCH_DROPDOWN}
        />
        {this.state.loading ? <LoaderSpinner css={STYLES_LOADER} /> : null}
      </div>
    );
  }
}
