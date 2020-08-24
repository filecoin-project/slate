import * as React from "react";
import * as Constants from "~/common/constants";
import * as SVG from "~/common/svg";
import * as Strings from "~/common/strings";

import MiniSearch from "minisearch";
import Slate from "~/components/core/Slate";

import { css } from "@emotion/react";
import { InputMenu } from "~/components/system/components/InputMenu";
import { dispatchCustomEvent } from "~/common/custom-events";

const fileImg =
  "https://hub.textile.io/ipfs/bafkreihoi5c3tt4h3qx3gorbi7rrtekgactkpc2tfewwkahxqrxj2elvse";

let items = [
  {
    id: "0cc3732d-d572-4ddd-900e-483dd1f4cbfb",
    type: "user",
    name: "Haris Butt",
    username: "haris",
    url:
      "https://hub.textile.io/ipfs/bafybeiguo2uhd63reslbqkkgsqedgeikhtuwn5lzqpnqzluoaa3rnkfcvi",
  },
  {
    id: "c32b95ed-9472-4b01-acc2-0fb8303dc140",
    type: "slate",
    name: "Doggos",
    username: "martinalong",
    url: [
      {
        type: "image",
        name: "tuna.png",
        url:
          "https://hub.textile.io/ipfs/bafybeicuz5wrxonu7ud6eskrnshxb66ksg3ncu3ie776xuiydlxrkfuvmu",
      },
      {
        type: "image",
        name: "khaleesi.jpg",
        url:
          "https://hub.textile.io/ipfs/bafkreicb2lookm56omsfjwuwuziwftizmdsj4oneveuqiqlu6k5hc7j5nq",
      },
      {
        type: "file",
        name:
          "Seneca - On the Shortness of Life and other things relating to philosophy and culture of the greeks",
        url:
          "https://hub.textile.io/ipfs/bafkreic3w24qwy6nxvwzidwvdvmyfeyha5w2uyk6rycli5utdquvafgosq",
      },
    ],
  },
  {
    id: "data-75384245-0a6e-4e53-938e-781895556265",
    type: "image",
    name: "butter.jpg",
    username: "jim",
    url:
      "https://hub.textile.io/ipfs/bafybeidcn5ucp3mt5bl7vllkeo7uai24ja4ra5i7wctl22ffq2rev7z7au",
  },
  {
    id: "data-bc1bd1c8-5db4-448d-ab35-f4d4866b9fa2",
    type: "file",
    name: "seneca-on-the-shortness-of-life.pdf",
    username: "colin",
    url:
      "https://hub.textile.io/ipfs/bafkreic3w24qwy6nxvwzidwvdvmyfeyha5w2uyk6rycli5utdquvafgosq",
  },
  {
    id: "0ba6d7ab-7b1c-4420-bb42-4e66b82df099",
    type: "slate",
    name: "Meta",
    username: "haris",
    url: [
      {
        type: "image",
        name: "landscape1",
        url:
          "https://hub.textile.io/ipfs/bafybeihxn5non5wtt63e2vhk7am4xpmdh3fnmya2vx4jfk52t2jdqudztq",
      },
      {
        type: "image",
        name: "landscape2",
        url:
          "https://hub.textile.io/ipfs/bafybeiddiv44vobree4in7n6gawqzlelpyqwoji6appb6dzpgxzrdonepq",
      },
      {
        type: "image",
        name: "landscape3",
        url:
          "https://hub.textile.io/ipfs/bafkreih2mw66pmi4mvcxb32rhiyas7tohafaiez54lxvy652pdcfmgxrba",
      },
      {
        type: "image",
        name: "landscape4",
        url:
          "https://hub.textile.io/ipfs/bafybeihxn5non5wtt63e2vhk7am4xpmdh3fnmya2vx4jfk52t2jdqudztq",
      },
    ],
  },
];

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
            style={{ backgroundImage: `url(${item.url})` }}
            css={STYLES_PROFILE_IMAGE}
          />
          <strong>{item.name}</strong>
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
  background-size: cover;
  background-position: 50% 50%;
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

const STYLES_FILE_ALTERNATE = css`
  display: flex;
  justify-content: center;
  background-color: ${Constants.system.foreground};
  height: 72px;
  width: 72px;
  padding: 4px;
  text-overflow: ellipsis;
  word-break: break-word;
  font-size: 0.7em;
  overflow: hidden;
  line-height: 17px;
`;

const SlateEntry = ({ item, onAction }) => {
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
          <strong>{item.name}</strong>
          <div>
            <a css={STYLES_LINK_HOVER} href={`/${item.username}`}>
              @{item.username}
            </a>
          </div>
        </div>
        <div css={STYLES_SLATE_IMAGES_CONTAINER}>
          {item.url.map((each) =>
            each.type === "image" ? (
              <div
                style={{
                  backgroundImage: `url(${
                    each.type === "image" ? each.url : fileImg
                  })`,
                }}
                css={STYLES_SLATE_IMAGE}
              />
            ) : (
              <div css={STYLES_FILE_ALTERNATE}>{each.name}</div>
            )
          )}
        </div>
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
    //let documents = await getDocuments();
    this.miniSearch = new MiniSearch({
      fields: ["name", "username"], // fields to index for full-text search
      storeFields: ["type", "name", "username", "url"], // fields to return with search results
      searchOptions: {
        boost: { name: 2 },
        fuzzy: 0.2,
      },
    });
    //this.miniSearch.addAll(documents);
    this.miniSearch.addAll(items);
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
        if (item.type === "user") {
          options.push({
            value: `/${item.username}`,
            name: <UserEntry item={item} onAction={this.props.onAction} />,
          });
        } else if (item.type === "slate") {
          let slug = item.name.toLowerCase().split(" ").join("-");
          options.push({
            value: `/${item.username}/${slug}`,
            name: <SlateEntry item={item} onAction={this.props.onAction} />,
          });
        } else if (item.type === "image" || item.type == "file") {
          options.push({
            value: `${item.url}`,
            name: <FileEntry item={item} onAction={this.props.onAction} />,
          });
        }
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

const STYLES_ANCHOR_ICON = css`
  height: 16px;
  color: ${Constants.system.black};
`;

const STYLES_ANCHOR_BOX = css`
  height: 20px;
  width: 20px;
  cursor: pointer;
`;

export class SpotlightSearchAnchor extends React.Component {
  _handleCreate = (e) => {
    dispatchCustomEvent({
      name: "create-modal",
      detail: { modal: <SpotlightSearch /> },
    });
  };

  render() {
    return (
      <div css={STYLES_ANCHOR_BOX} onClick={this._handleCreate}>
        <SVG.Search css={STYLES_ANCHOR_ICON} />
      </div>
    );
  }
}
