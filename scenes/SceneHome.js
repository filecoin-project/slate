import * as React from "react";
import * as Constants from "~/common/constants";
import * as Validations from "~/common/validations";
import * as Window from "~/common/window";
import * as SVG from "~/common/svg";
import * as Actions from "~/common/actions";
import * as Events from "~/common/custom-events";
import * as System from "~/components/system";

import { css } from "@emotion/react";

import ScenePage from "~/components/core/ScenePage";
import SlateMediaObjectPreview from "~/components/core/SlateMediaObjectPreview";
import DataView from "~/components/core/DataView";
import ScenePageHeader from "~/components/core/ScenePageHeader";

const STYLES_VIDEO_BIG = css`
  display: block;
  background-color: ${Constants.system.moonstone};
  padding: 0;
  outline: 0;
  margin: 48px auto 88px auto;
  border-radius: 4px;
  width: 100%;
  box-shadow: 0px 10px 50px 20px rgba(0, 0, 0, 0.1);

  @media (max-width: ${Constants.sizes.tablet}px) {
    margin: 32px auto 64px auto;
  }

  @media (max-width: ${Constants.sizes.mobile}px) {
    margin: 24px auto 48px auto;
  }
`;

const STYLES_IMAGE_BOX = css`
  cursor: pointer;
  ${"" /* background-size: cover;
  background-position: 50% 50%; */}
  position: relative;
  box-shadow: ${Constants.shadow.light};
  margin: 10px;

  :hover {
    box-shadow: ${Constants.shadow.medium};
  }
`;

const STYLES_PROFILE_IMAGE_BOX = css`
  background-size: cover;
  background-position: 50% 50%;
  position: relative;
  border-radius: 4px;
  position: absolute;
  top: 16px;
  left: 16px;
  width: 24px;
  height: 24px;
`;

const STYLES_SLATE_NAME = css`
  position: absolute;
  bottom: 16px;
  left: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-family: ${Constants.font.medium};
  font-size: ${Constants.typescale.lvlN1};
  color: ${Constants.system.white};
  ${"" /* text-shadow: 0px 0px 7px rgba(0, 0, 0, 0.5), 1px 1px 4px rgba(0, 0, 0, 0.1),
    -1px -1px 4px rgba(0, 0, 0, 0.1); */}
`;

const STYLES_TITLE = css`
  position: absolute;
  bottom: 16px;
  left: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${Constants.system.white};
  ${"" /* text-shadow: 0px 0px 7px rgba(0, 0, 0, 0.5), 0px 0px 1px rgba(0, 0, 0, 0.3); */}
`;

const STYLES_GRADIENT = css`
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.2) 26.56%,
    rgba(0, 0, 0, 0.3) 100%
  );
  backdrop-filter: blur(2px);
  width: 100%;
  height: 72px;
  position: absolute;
  bottom: 0px;
  left: 0px;
`;

const ActivitySquare = ({ item, size }) => {
  console.log(item);
  return (
    <div css={STYLES_IMAGE_BOX} style={{ width: size, height: size }}>
      <SlateMediaObjectPreview
        centeredImage
        iconOnly
        blurhash={item.file.blurhash}
        url={item.file.url}
        title={item.file.title || item.file.name}
        type={item.file.type}
        style={{ border: "none" }}
        imageStyle={{ border: "none" }}
      />
      <div css={STYLES_GRADIENT} />
      {/* <div css={STYLES_PROFILE_IMAGE_BOX} style={{ backgroundImage: `url(${item.user.photo})` }} /> */}
      <div css={STYLES_SLATE_NAME} style={{ width: size }}>
        <div
          style={{
            lineHeight: "12px",
          }}
        >
          {item.slate.data.name || item.slate.slatename}
        </div>
      </div>
    </div>
  );
};

const ActivityRectangle = ({ item, size }) => {
  console.log(item);
  let file;
  for (let obj of item.slate?.data?.objects || []) {
    if (Validations.isPreviewableImage(obj.type) || obj.coverImage) {
      file = obj;
    }
  }
  let numObjects = item.slate?.data?.objects?.length || 0;
  return (
    <div css={STYLES_IMAGE_BOX} style={{ width: size * 2 + 10, height: size }}>
      {file ? (
        <SlateMediaObjectPreview
          centeredImage
          iconOnly
          blurhash={file.blurhash}
          url={file.url}
          title={file.title || file.name}
          type={file.type}
          style={{ border: "none" }}
          imageStyle={{ border: "none" }}
          coverImage={file.coverImage}
        />
      ) : null}
      <div css={STYLES_GRADIENT} />
      {/* <div css={STYLES_PROFILE_IMAGE_BOX} style={{ backgroundImage: `url(${item.user.photo})` }} /> */}
      <div css={STYLES_TITLE} style={{ width: size }}>
        <div
          style={{
            lineHeight: "12px",
            fontFamily: Constants.font.semiBold,
            marginBottom: 8,
          }}
        >
          {item.slate.data.name || item.slate.slatename}
        </div>
        <div
          style={{
            lineHeight: "12px",
            fontFamily: Constants.font.medium,
            fontSize: Constants.typescale.lvlN1,
            color: Constants.system.textGrayLight,
          }}
        >
          {numObjects} File{numObjects == 1 ? "" : "s"}
        </div>
      </div>
    </div>
  );
};

export default class SceneHome extends React.Component {
  state = {
    imageSize: 200,
    activity: [],
  };

  async componentDidMount() {
    //only fetch the last x days worth of updates maybe? or last x entries of updates?
    //maybe do this when get viewer, not here. So that dont' redo every time you go back to this scene. Or maybe save it to viewer so you don't have to redo it?
    this.calculateWidth();
    this.debounceInstance = Window.debounce(this.calculateWidth, 200);
    window.addEventListener("resize", this.debounceInstance);
    let activity = this.props.viewer.activity;
    let slateIds = [];
    if (activity && activity.length) {
      activity = activity.filter((item) => {
        if (item.data.type === "OTHER_USER_CREATE_SLATE") {
          slateIds.push(item.data.context.slate.id);
        }
        return (
          item.data.type === "OTHER_USER_CREATE_SLATE" ||
          item.data.type === "OTHER_USER_CREATE_SLATE_OBJECT"
        );
      });
    }
    let slates = [];
    if (slateIds && slateIds.length) {
      let response = await Actions.getSlatesByIds({ id: slateIds });
      if (response && response.slate) {
        slates = response.slate;
      }
    }
    let slateTable = {};
    for (let slate of slates) {
      slateTable[slate.id] = slate;
    }

    for (let item of activity) {
      if (item.data.type === "OTHER_USER_CREATE_SLATE") {
        let slate = slateTable[item.data.context.slate.id];
        if (slate) {
          item.data.context.slate = slate;
        }
      }
    }
    console.log(activity);
    this.setState({ activity });
    //filter to remove ones you no longer follow
    //remove ones with no objects
    //reorder to get a nice ordering
    //maybe you try and fill a row. if it fails, you try and remove a "1" square from it and move that down to the next row
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.debounceInstance);
  }

  _handleCreateSlate = () => {
    this.props.onAction({
      type: "NAVIGATE",
      value: "V1_NAVIGATION_SLATES",
      data: null,
    });
  };

  calculateWidth = () => {
    let windowWidth = window.innerWidth;
    let imageSize;
    if (windowWidth < Constants.sizes.mobile) {
      imageSize = (windowWidth - 2 * 24 - 20) / 2;
    } else {
      imageSize = (windowWidth - 2 * 56 - 5 * 10) / 6;
    }
    this.setState({ imageSize });
  };

  render() {
    let squareItem = {
      slate: {
        id: "6fef590d-6347-48bd-a262-d7fd09319c55",
        slatename: "playin-around",
        data: {
          name: "Playin Around",
        },
      },
      user: {
        id: "5172dd8b-6b11-40d3-8c9f-b4cbaa0eb8e7",
        username: "martina",
        data: {
          photo:
            "https://slate.textile.io/ipfs/bafkreib2kqtibn3pt25gdmyufrsg6gnlv5iw5mncbyenfpgfwqgq5xtk3m",
        },
      },
      file: {
        blurhash: null,
        id: "data-adae67cb-4bab-4ade-a136-2512aab47904",
        url:
          "https://slate.textile.io/ipfs/bafkreiajw7ucp354rb4utaryhqde4e6rn3ydyukhnwrom3wuf6hs6m7msu",
        cid: "bafkreiajw7ucp354rb4utaryhqde4e6rn3ydyukhnwrom3wuf6hs6m7msu",
        type: "image/jpeg",
        name: "IMG_299.jpg",
        title: "IMG_299.jpg",
      },
    };
    let rectItem = {
      user: {
        id: "ee4817fb-5b57-4a6c-b762-9127a2cdc04f",
        username: "tuna",
        data: {
          photo:
            "https://bafybeiabcoa7egpafljp6rnfhdbz7ifhnc27hpocu7clgld5oxsbjjimri.ipfs.slate.textile.io",
        },
      },
      slate: {
        slatename: "Ouroboros",
        id: "53548922-ba60-4dd4-8358-4a4aff9ba3f3",
        data: {
          name: "ouroboros",
          objects: [
            {
              id: "data-adae67cb-4bab-4ade-a136-2512aab47904",
              name: "IMG_9173.jpg",
              ownerId: "3cad78ea-01ad-4c92-8983-a97524fb9e35",
              size: 1697947,
              title: "IMG_9173.jpg",
              type: "image/jpeg",
              url:
                "https://slate.textile.io/ipfs/bafybeie5pyqpddco6s6pq2wypkrxfbsqr4vec532tz6kaqwpe5cn3v2bu4",
            },
            {
              id: "data-b114d7e5-1092-4729-86c4-71a94ebe2215",
              name: "IMG_6730.jpg",
              ownerId: "3cad78ea-01ad-4c92-8983-a97524fb9e35",
              size: 2144037,
              title: "IMG_6730.jpg",
              type: "image/jpeg",
              url:
                "https://slate.textile.io/ipfs/bafybeih6ak5oufwhzqb5iuujukvmsnlitrhmhjds6dwkw5x6eqvxs3hke4",
            },
          ],
        },
      },
    };
    let squareItem2 = {
      slate: {
        id: "6fef590d-6347-48bd-a262-d7fd09319c55",
        slatename: "looper",
        data: {
          name: "Looper",
        },
      },
      user: {
        id: "5172dd8b-6b11-40d3-8c9f-b4cbaa0eb8e7",
        username: "martina",
        data: {
          photo:
            "https://slate.textile.io/ipfs/bafkreifqrqyijknvg47uprc3rcjscavgesv6vuo7ypxwj27xqdi5aso6de",
        },
      },
      file: {
        blurhash: null,
        id: "data-adae67cb-4bab-4ade-a136-2512aab47904",
        url:
          "https://slate.textile.io/ipfs/bafkreibh27gx3wmy4dxsl5px46mu4jjbemhlkbfuoszuro44atwznj7jqi",
        cid: "bafkreiajw7ucp354rb4utaryhqde4e6rn3ydyukhnwrom3wuf6hs6m7msu",
        type: "image/jpeg",
        name: "IMG_9173.jpg",
        title: "IMG_9173.jpg",
      },
    };
    let rectItem2 = {
      user: {
        id: "ee4817fb-5b57-4a6c-b762-9127a2cdc04f",
        username: "slate",
        data: {
          photo:
            "https://slate.textile.io/ipfs/bafkreidc5he4qipe4dbentxtle5fao6kmeuwn7tujk5hdm7zqxc2a46uce",
        },
      },
      slate: {
        slatename: "maps-of-the-world",
        id: "53548922-ba60-4dd4-8358-4a4aff9ba3f3",
        data: {
          name: "Maps of the world",
          objects: [
            {
              id: "data-adae67cb-4bab-4ade-a136-2512aab47904",
              name: "IMG_9173.jpg",
              ownerId: "3cad78ea-01ad-4c92-8983-a97524fb9e35",
              size: 1697947,
              title: "IMG_9173.jpg",
              type: "image/jpeg",
              url:
                "https://slate.textile.io/ipfs/bafybeigesvxcebq4b4kggvnpmgdpuxowyackzrcbuujq6t75cy7e3o6u6u",
            },
            {
              id: "data-adae67cb-4bab-4ade-a136-2512aab47904",
              name: "IMG_9173.jpg",
              ownerId: "3cad78ea-01ad-4c92-8983-a97524fb9e35",
              size: 1697947,
              title: "IMG_9173.jpg",
              type: "image/jpeg",
              url:
                "https://slate.textile.io/ipfs/bafybeih6ak5oufwhzqb5iuujukvmsnlitrhmhjds6dwkw5x6eqvxs3hke4",
            },
            {
              id: "data-adae67cb-4bab-4ade-a136-2512aab47904",
              name: "IMG_9173.jpg",
              ownerId: "3cad78ea-01ad-4c92-8983-a97524fb9e35",
              size: 1697947,
              title: "IMG_9173.jpg",
              type: "image/jpeg",
              url:
                "https://slate.textile.io/ipfs/bafybeih6ak5oufwhzqb5iuujukvmsnlitrhmhjds6dwkw5x6eqvxs3hke4",
            },
            {
              id: "data-b114d7e5-1092-4729-86c4-71a94ebe2215",
              name: "IMG_6730.jpg",
              ownerId: "3cad78ea-01ad-4c92-8983-a97524fb9e35",
              size: 2144037,
              title: "IMG_6730.jpg",
              type: "image/jpeg",
              url:
                "https://slate.textile.io/ipfs/bafybeih6ak5oufwhzqb5iuujukvmsnlitrhmhjds6dwkw5x6eqvxs3hke4",
            },
          ],
        },
      },
    };
    console.log(this.state.activity);
    return (
      <ScenePage>
        <ScenePageHeader title="Home">
          {this.props.viewer.activity.length
            ? null
            : "Welcome to Slate! You can share files with anyone in the world. Here is how it works:"}
        </ScenePageHeader>

        {this.state.activity.length ? (
          <div
            style={{ margin: "-10px", marginTop: "38px", display: "flex", flexDirection: "row" }}
          >
            {this.state.activity.map((item) => {
              if (item.data.type === "OTHER_USER_CREATE_SLATE") {
                return (
                  <span
                    onClick={() =>
                      this.props.onAction({
                        type: "NAVIGATE",
                        value: "V1_NAVIGATION_SLATE",
                        data: { decorator: "SLATE", ...item.data.context.slate },
                      })
                    }
                  >
                    <ActivityRectangle
                      key={item.id}
                      size={this.state.imageSize}
                      item={item.data.context}
                    />
                  </span>
                );
              } else if (item.data.type === "OTHER_USER_CREATE_SLATE_OBJECT") {
                return (
                  <ActivitySquare
                    key={item.id}
                    size={this.state.imageSize}
                    item={item.data.context}
                  />
                );
              } else {
                return <div>hello</div>;
              }
            })}
          </div>
        ) : (
          <React.Fragment>
            <System.P>When you're ready, create a slate!</System.P>
            <br />
            <System.ButtonPrimary onClick={this._handleCreateSlate}>
              Create a slate
            </System.ButtonPrimary>
            <video
              css={STYLES_VIDEO_BIG}
              autoPlay
              loop
              muted
              src="https://slate.textile.io/ipfs/bafybeienjmql6lbtsaz3ycon3ttliohcl7qbquwvny43lhcodky54z65cy"
              type="video/m4v"
              playsInline
              style={{
                backgroundImage: `url('https://slate.textile.io/ipfs/bafybeienjmql6lbtsaz3ycon3ttliohcl7qbquwvny43lhcodky54z65cy')`,
                borderRadius: `4px`,
                width: `100%`,
                boxShadow: `0px 10px 50px 20px rgba(0, 0, 0, 0.1)`,
                backgroundSize: `cover`,
              }}
            />
          </React.Fragment>
        )}
      </ScenePage>
    );
  }
}
