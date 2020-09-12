import * as React from "react";
import * as Constants from "~/common/constants";
import * as Actions from "~/common/actions";

import WebsitePrototypeWrapper from "~/components/core/WebsitePrototypeWrapper";
import WebsitePrototypeHeader from "~/components/core/NewWebsitePrototypeHeader";
import WebsitePrototypeFooter from "~/components/core/NewWebsitePrototypeFooter";
import TextLoop from "react-text-loop";

import { css } from "@emotion/react";

const USER_SLATES = [
  {
    name: "Urban gardens",
    url: "https://slate.host/gndclouds/urban-gardens",
    username: "gndclouds",
    preview: "https://slate.textile.io/ipfs/bafybeiff7y4kz4e2z4nfso4nsgdbkfsyroa62jvvldoxafuaf34m7lticu",
  },
  {
    name: "Shapes and Letters",
    url: "https://slate.host/haris/shapes-and-letters",
    username: "haris",
    preview: "https://slate.textile.io/ipfs/bafybeifgxtl7mq5djnorxedzi35hkizjmbjvdy3nnoitd3xvdnqpmruxbm",
  },
  {
    name: "Mountains",
    url: "https://slate.host/jason/mountains",
    username: "jason",
    preview: "https://slate.textile.io/ipfs/bafkreies6uykgocrkunrsndxfubntyqvfqzo5wuwyos42vak6d4qnvtdn4",
  },
  {
    name: "Loom",
    url: "https://slate.host/tara/loom",
    username: "tara",
    preview: "https://slate.textile.io/ipfs/bafybeifl5xzy4vjctrsr3jywdlv5ceq3hpaadhcii2ekjx2gljyagveqna",
  },
  {
    name: "Brand",
    url: "https://slate.host/slate/brand",
    username: "slate",
    preview: "https://slate.textile.io/ipfs/bafybeiaerbu2nivrgncqtwgwom27caji25netswvjbo6tcmbka47ucmupa",
  },
  {
    name: "Montreal underground",
    url: "https://slate.host/tcosta/montreal-underground",
    username: "tcosta",
    preview: "https://slate.textile.io/ipfs/bafybeieblkyt6d7wg4xmltshvxm6w7tz4c3zjpjuu4yfhiak36debqccda",
  },
  {
    name: "Monet",
    url: "https://slate.host/slate/monet",
    username: "slate",
    preview: "https://slate.textile.io/ipfs/bafkreieb4yfiamtipapmhoihl547lxeod2vfku67dimrhmab5tcglr5bli",
  },
  {
    name: "Books",
    url: "https://slate.host/haris/books",
    username: "haris",
    preview: "https://slate.textile.io/ipfs/bafkreihe7ismqfyytekj6yvbv6mpbc5de3gozk6n7a47smodbcsnrhbpri",
  },
  {
    name: "Papers",
    url: "https://slate.host/slate/papers",
    username: "slate",
    preview: "https://slate.textile.io/ipfs/bafkreif7l2vxkvdyrydcjwjjrrmqq73id3tdrdkf3z54tp2fotc75wkdwm",
  },
];

const ASSET_HERO = {
  src: "https://slate.textile.io/ipfs/bafybeidfr2x5ftxzixjxtrgiqm6iuotzip25tlrpase226jog3tqenqd4a",
  backgroundImage: `https://slate.textile.io/ipfs/bafybeict43te7wcy7pdw3v45dwwedwxw7yjthbytdsja6dpsiqkgil7iey`,
};

const ASSET_HERO_COLLABORATE = {
  src: "https://slate.textile.io/ipfs/bafybeih63zq5f7htbhkmrog447ybytyid2yi6fix4k6z3pbegxpcq2r2qa",
  backgroundImage: "https://slate.textile.io/ipfs/bafkreiagwjqvmisseb6voj7cwd3lhjudigkel63hqg6efpqjmhlfv5ucj4",
};

const ASSETS_SMALL = [
  {
    src: "https://slate.textile.io/ipfs/bafybeiawzns4vxqp3llkzmc4shvytzpurysh26yj3aljde4d4fsgf7wlze",
    backgroundImage: "https://slate.textile.io/ipfs/bafybeihez3rtyqqftx7mkyktwozyqjkwdtk2kglxqjc4zspah26bva3yk4",
  },
  {
    src: "https://slate.textile.io/ipfs/bafybeiczug4d6uyr4pkejdwirkeffbzkkzrbaprxvreid6iitw3pmjzq3q",
    backgroundImage: "https://slate.textile.io/ipfs/bafybeidnt2l3lslxi7ofkxs5ffncsh4fw5h2ohbukxumngrqj5pdrooaou",
  },
  {
    src: "https://slate.textile.io/ipfs/bafkreid7wl4443p764ozdlqtodh7dmsej6ffayp4tc3lr3hil2qkclrohi",
    backgroundImage: "https://slate.textile.io/ipfs/bafkreibb3onijljnmonrbs7qguimjf5qwbnkx3m33pouxbtar2yb7hupti",
  },
  {
    src: "https://slate.textile.io/ipfs/bafybeicjovnsnhvt7xwjw3igdwwpb4ms2m23fayoydj3oevrwyi7dzjtga",
    backgroundImage: "https://slate.textile.io/ipfs/bafkreiefuyyk6dcjhyk3hl2httqvdlnl3mo6wrfzgmponexrc75jop757y",
  },
];

const ASSETS_MEDIUM = [
  {
    title: "Create moodboards",
    src: "https://slate.textile.io/ipfs/bafybeib46kplzcylnzviaojgbogua52wyrzbvnj6uulvo4zwrxm4hnxeqe",
    backgroundImage: "https://slate.textile.io/ipfs/bafybeicoaponp2nv3ikpsjgcgu7pio6aercflsvsiyxrpaonza7ncg73dq",
  },

  {
    title: "Organize research",
    src: "https://slate.textile.io/ipfs/bafybeigstyjfpzazdlmgkfuhw4yxrneux3opvbls7nmv6gq7dbnhmy6xwy",
    backgroundImage: "https://slate.textile.io/ipfs/bafybeie4p45yfvbjdzc2rgw67e7crcltpu7o544xtugs3wyv3qh3t3oegi",
  },

  {
    title: "Share presentations",
    src: "https://slate.textile.io/ipfs/bafybeiampkmsxeihxnuz2hkgbhtzosgkwghslpwm7dsrxrzlqwa7tvzreq",
    backgroundImage: "https://slate.textile.io/ipfs/bafkreiglefskwq7bpa3aazihegawd4qwxockl6shipnps7zlokrbnu4f7u",
  },
];

const ASSET_CHROME_EXTENSION =
  "https://slate.textile.io/ipfs/bafybeibwppu23j5wgshqvm5qyqv3c6pmhp3y5irdwn3ivvnnrpexiguzbi";

const ASSET_SLATE_CUBE = "https://slate.textile.io/ipfs/bafybeiaex6rorqtumulc4x3u4sbl5pdbn5sx45mvm6uvbebu4cxgk3okjy";

const STYLES_ROOT = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const STYLES_LINK = css`
  text-decoration: none;
  color: ${Constants.system.white};
  transition: 200ms ease all;

  :hover {
    color: ${Constants.system.blue};
  }
`;

const STYLES_H1 = css`
  font-size: ${Constants.typescale.lvl5};
  font-weight: 700;
  line-height: 1.3;
  padding: 0px 0px 24px 0px;
  letter-spacing: -0.021rem;
  width: 100%;
  color: ${Constants.system.white};

  @media (max-width: ${Constants.sizes.tablet}px) {
    font-size: ${Constants.typescale.lvl5};
    padding: 0px 0px 16px 0px;
  }

  @media (max-width: ${Constants.sizes.mobile}px) {
    font-size: ${Constants.typescale.lvl3};
  }
`;

const STYLES_H2 = css`
  font-size: ${Constants.typescale.lvl3};
  font-weight: 500;
  line-height: 1.3;
  letter-spacing: -0.019rem;
  padding: 0 0 24px 0;
  width: 100%;
  color: ${Constants.system.darkGray};

  @media (max-width: ${Constants.sizes.tablet}px) {
    font-size: ${Constants.typescale.lvl3};
    line-height: 1.5;
  }

  @media (max-width: ${Constants.sizes.mobile}px) {
    font-size: ${Constants.typescale.lvl2};
  }
`;

const STYLES_H3 = css`
  font-size: ${Constants.typescale.lvl2};
  font-weight: 500;
  line-height: 1.5;
  letter-spacing: -0.014rem;
  padding: 0 0 8px 0;
  color: ${Constants.system.darkGray};

  @media (max-width: ${Constants.sizes.tablet}px) {
    font-size: ${Constants.typescale.lvl2};
  }

  @media (max-width: ${Constants.sizes.mobile}px) {
    font-size: ${Constants.typescale.lvl1};
  }
`;

const STYLES_HIGHLIGHT = css`
  color: ${Constants.system.white};
`;

const STYLES_HIGHLIGHT_BLACK = css`
  color: ${Constants.system.slate};
`;

const STYLES_SECTION_HERO = css`
  width: 100vw;
  padding: 30vh 88px 88px 88px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: -88px 0px 0px 0px;
  background: ${Constants.system.pitchBlack};

  @media (max-width: ${Constants.sizes.mobile}px) {
    padding: 40vh 24px 48px 24px;
    display: block;
  }
`;

const STYLES_SECTION_SLATE_WALL = css`
  display: flex;
  flex-direction: column;
  width: 100vw;
  padding: 88px;
  background: ${Constants.system.foreground};

  @media (max-width: ${Constants.sizes.mobile}px) {
    padding: 64px 24px;
    display: block;
  }
`;

const STYLES_SECTION_SLATE = css`
  display: flex;
  flex-direction: column;
  padding: 88px;
  width: 100vw;
  background: ${Constants.system.pitchBlack};

  @media (max-width: ${Constants.sizes.mobile}px) {
    padding: 64px 24px;
    display: block;
  }
`;

const STYLES_FILETYPE = css`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  @media (max-width: ${Constants.sizes.mobile}px) {
    display: flex;
    flex-wrap: wrap;
  }
`;

const STYLES_FILETYPE_GRID_ITEM = css`
  padding: 0 24px 24px 0;
  width: 25%;

  @media (max-width: ${Constants.sizes.mobile}px) {
    width: 50%;
    padding: 0 0 24px 0;
  }
`;

const STYLES_VIDEO_BIG = css`
  display: block;
  background-size: cover;
  background-position: 50% 50%;
  background-color: ${Constants.system.moonstone};
  padding: 0;
  outline: 0;
  margin: 40px auto 80px auto;
  border-radius: 4px;
  width: 100%;
  box-shadow: 0px 10px 50px 20px rgba(0, 0, 0, 0.1);

  @media (max-width: ${Constants.sizes.tablet}px) {
    margin: 32px auto 64px auto;
  }

  @media (max-width: ${Constants.sizes.mobile}px) {
    margin: 16px auto 48px auto;
  }
`;

const STYLES_VIDEO_MEDIUM = css`
  display: block;
  background-size: cover;
  background-position: 50% 50%;
  background-color: ${Constants.system.moonstone};
  padding: 0;
  outline: 0;
  margin: 24px auto 96px auto;
  border-radius: 4px;
  width: 100%;
  max-width: 56vw;
  box-shadow: 0px 10px 50px 20px rgba(0, 0, 0, 0.1);

  @media (max-width: ${Constants.sizes.tablet}px) {
    margin: 16px auto 64px auto;
    width: 100%;
    max-width: 100vw;
  }

  @media (max-width: ${Constants.sizes.mobile}px) {
    margin: 8px auto 48px auto;
  }
`;

const STYLES_VIDEO_SMALL = css`
  display: block;
  width: 100%;
  background-size: cover;
  background-position: 50% 50%;
  background-color: ${Constants.system.moonstone};
  padding: 0;
  outline: 0;
`;

const STYLES_MEDIA_LEFT = css`
  margin: 64px 0 0 -240px;
  width: 80vw;
  border-radius: 4px;
  box-shadow: 0px 10px 50px 20px rgba(0, 0, 0, 0.1);

  @media (max-width: ${Constants.sizes.mobile}px) {
    margin: 24px 0 0 -80px;
  }
`;

const STYLES_MEDIA_RIGHT_OVERLAP = css`
  float: right;
  margin: -40px 240px 0 0;
  width: 24vw;

  @media (max-width: ${Constants.sizes.tablet}px) {
    margin: 24px 0 0 80px;
    width: 32vw;
  }

  @media (max-width: ${Constants.sizes.mobile}px) {
    margin: 24px 0 0 80px;
    width: 48vw;
  }
`;

const STYLES_TEXT_BLOCK = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 56vw;
  width: 100%;
  align-self: center;
  margin-bottom: 16px;

  @media (max-width: ${Constants.sizes.mobile}px) {
    width: 100%;
    max-width: 64vw;
  }
`;

const STYLES_ACTIONS_RIGHT = css`
  @media (max-width: ${Constants.sizes.mobile}px) {
    display: block;
    padding: 16px 0 8px 0;
  }
`;

const STYLES_BUTTON_PRIMARY = css`
  box-sizing: border-box;
  border-radius: 2px;
  outline: 0;
  border: 0;
  min-height: 48px;
  padding: 0px 24px 0px 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  letter-spacing: 0.2px;
  font-family: ${Constants.font.semiBold};
  transition: 200ms ease all;
  user-select: none;
  cursor: pointer;
  background-color: ${Constants.system.slate};
  color: ${Constants.system.white};
  box-shadow: 0px 10px 50px 20px rgba(0, 0, 0, 0.1);

  :hover {
    background-color: ${Constants.system.white};
    box-shadow: 0px 10px 90px 20px rgba(207, 206, 211, 0.3);
    color: ${Constants.system.slate};
  }

  :focus {
    box-shadow: inset 0 0 5px 2px rgba(0, 0, 0, 0.3);
    background-color: ${Constants.system.pitchBlack};
    color: ${Constants.system.wall};
    outline: 0;
    border: 0;
  }
`;

const STYLES_LINK_WHITE = css`
  color: ${Constants.system.darkGray};
  text-decoration: none;
  transition: 200ms ease color;
  font-size: 1.25rem;
  padding: 24px 0 0 0;

  :visited {
    color: ${Constants.system.white};
  }

  :hover {
    color: ${Constants.system.brand};
  }

  @media (max-width: ${Constants.sizes.mobile}px) {
    font-size: 0.78rem;
  }
`;

const STYLES_SLATE_CARD_GROUP = css`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin-top: 48px;
`;

const STYLES_SLATE_CARD = css`
  width: 33.33%;
  height: calc(100vh / 4);
  margin: -1px 0 0 -1px;
  transition: 200ms ease box-shadow;
  border: 1px solid ${Constants.system.darkGray};

  :hover {
    transition: 200ms ease box-shadow;
    box-shadow: 0px 10px 40px 20px rgba(0, 0, 0, 0.1);
  }
`;

const STYLES_SLATE_CARD_CTA = css`
  width: 100%;
  height: calc(100vh / 2);
  margin-left: -1px;
  box-shadow: 0px 4px 80px 4px rgba(0, 0, 0, 0.1);
  text-decoration: none;
  transition: 200ms ease all;

  :hover {
    box-shadow: 0px 4px 120px 4px rgba(0, 0, 0, 0.1);
    transform: scale(1.01);
  }
`;

const STYLES_SLATE_CARD_TEXT = css`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: left;
  width: 100%;
  height: 100%;
  padding: 12px;
`;

const STYLES_SLATE_CARD_TITLE = css`
  padding: 12px;
  font-size: ${Constants.typescale.lvl1};
  letter-spacing: -0.021rem;
  font-weight: 400;
  text-align: left;
  width: 100%;

  @media (max-width: ${Constants.sizes.mobile}px) {
    padding: 0px;
    font-size: 1rem;
  }
`;

const STYLES_SLATE_CARD_CTA_TITLE = css`
  font-size: ${Constants.typescale.lvl5};
  font-weight: 700;
  text-align: left;
  line-height: 1.25;
  padding: 12px;
  overflow-wrap: break-word;
  width: 100%;
  color: ${Constants.system.darkGray};

  @media (max-width: ${Constants.sizes.tablet}px) {
    font-size: ${Constants.typescale.lvl4};
  }

  @media (max-width: ${Constants.sizes.mobile}px) {
    font-size: ${Constants.typescale.lvl3};
    padding: 0px 0px 8px 0px;
  }
`;

const STYLES_SLATE_CARD_EXPLAINER = css`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 12px;

  @media (max-width: ${Constants.sizes.mobile}px) {
    padding: 0px;
  }
`;

const STYLES_SLATE_CARD_PARAGRAPH = css`
  font-size: ${Constants.typescale.lvl0};
  text-align: left;
  text-decoration: none;
  color: ${Constants.system.pitchBlack};
  transition: 200ms ease all;

  :hover,
  :active {
    color: ${Constants.system.pitchBlack};
    background-color: transparent;
  }

  @media (max-width: ${Constants.sizes.mobile}px) {
    font-size: 0.78rem;
  }
`;

const STYLES_SLATE_CARD_CTA_PARAGRAPH = css`
  font-size: ${Constants.typescale.lvl2};
  text-align: left;

  @media (max-width: ${Constants.sizes.mobile}px) {
    font-size: 1rem;
  }
`;

const SlateCardElement = (props) => {
  return (
    <div css={STYLES_SLATE_CARD}>
      <div
        css={css`
          transition: 200ms ease all;
          height: 100%;
          background-color: transparent;
          background-position: 50% 50%;
          background-size: cover;

          :hover {
            background-color: ${Constants.system.pitchBlack};
            background-image: url("${props.preview}");
          }
        `}
      >
        <a css={STYLES_SLATE_CARD_PARAGRAPH} href={props.url} target="_blank">
          <div css={STYLES_SLATE_CARD_TEXT}>
            <div css={STYLES_SLATE_CARD_TITLE}>{props.name}</div>
            <div css={STYLES_SLATE_CARD_EXPLAINER}>
              <div>{`@${props.username}`}</div>
              <div>-&gt;</div>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  return {
    props: { ...context.query },
  };
};

export default class IndexPage extends React.Component {
  async componentDidMount() {
    const response = await Actions.health();
    console.log("HEALTH_CHECK", response);
  }

  render() {
    const title = `Slate`;
    const description = "Welcome to the future of file sharing. Powered by Textile, Filecoin, and IPFS.";
    const url = "https://slate.host";

    return (
      <WebsitePrototypeWrapper title={title} description={description} url={url}>
        <WebsitePrototypeHeader />
        <div css={STYLES_ROOT}>
          <div css={STYLES_SECTION_HERO}>
            <div css={STYLES_TEXT_BLOCK}>
              <h1 css={STYLES_H1}>
                A file storage network <br />
                for you, your files, and your friends.
              </h1>

              <div css={STYLES_ACTIONS_RIGHT}>
                <div css={STYLES_BUTTON_PRIMARY} onClick={() => window.open("/_")}>
                  Use Slate
                </div>
              </div>
            </div>
            <br />

            <video
              css={STYLES_VIDEO_BIG}
              src={ASSET_HERO.src}
              autoPlay
              loop
              muted
              type="video/m4v"
              playsInline
              style={{
                backgroundImage: `url('${ASSET_HERO.backgroundImage}')`,
              }}
            />

            <div css={STYLES_TEXT_BLOCK}>
              <h2 css={STYLES_H2}>
                Slate{" "}
                <span css={STYLES_HIGHLIGHT}>
                  is a{" "}
                  <a css={STYLES_LINK} href={"https://github.com/filecoin-project/slate"} target="_blank">
                    fully open-source
                  </a>{" "}
                  file sharing network designed for research and collaboration.
                </span>
                <br />
                <br />
                <span css={STYLES_HIGHLIGHT}>Store</span> your data,
                <br />
                <span css={STYLES_HIGHLIGHT}>organize</span> it any way you like, <br />
                <span css={STYLES_HIGHLIGHT}>and share</span> it with the world securely.
                <br />
                <br />
              </h2>
              <h3 css={STYLES_H3}>Powered by</h3>
              <h2 css={STYLES_H2}>
                <span css={STYLES_HIGHLIGHT}>
                  <a href="https://textile.io" css={STYLES_LINK} target="_blank">
                    Textile
                  </a>{" "}
                  <br />
                  <a href="https://filecoin.io" css={STYLES_LINK} target="_blank">
                    Filecoin
                  </a>
                  <br />
                  <a href="https://ipfs.io" css={STYLES_LINK} target="_blank">
                    IPFS
                  </a>
                </span>
              </h2>
            </div>
          </div>
          <div css={STYLES_SECTION_SLATE}>
            <div css={STYLES_TEXT_BLOCK}>
              <h1 css={STYLES_H1}>
                A new home{" "}
                <span css={STYLES_HIGHLIGHT}>
                  for your{" "}
                  <TextLoop interval={1200}>
                    <span>images</span>
                    <span>videos</span>
                    <span>audios</span>
                    <span>ePUBs</span>
                    <span>PDFs</span>
                  </TextLoop>
                </span>
              </h1>
              <h3 css={STYLES_H3} style={{ marginBottom: 48 }}>
                <span css={STYLES_HIGHLIGHT}>Easily upload </span>any kind of media file to your storage system.
                <br />
              </h3>
            </div>
            <div css={STYLES_FILETYPE}>
              <div css={STYLES_FILETYPE_GRID_ITEM}>
                <video
                  css={STYLES_VIDEO_SMALL}
                  src={ASSETS_SMALL[0].src}
                  autoPlay
                  loop
                  muted
                  type="video/mp4"
                  playsInline
                  style={{
                    backgroundImage: `url('${ASSETS_SMALL[0].backgroundImage}')`,
                  }}
                />
              </div>
              <div css={STYLES_FILETYPE_GRID_ITEM}>
                <video
                  css={STYLES_VIDEO_SMALL}
                  src={ASSETS_SMALL[1].src}
                  autoPlay
                  loop
                  muted
                  type="video/mp4"
                  playsInline
                  style={{
                    backgroundImage: `url('${ASSETS_SMALL[1].backgroundImage}')`,
                  }}
                />
              </div>

              <div css={STYLES_FILETYPE_GRID_ITEM}>
                <video
                  css={STYLES_VIDEO_SMALL}
                  src={ASSETS_SMALL[2].src}
                  autoPlay
                  loop
                  muted
                  type="video/mp4"
                  playsInline
                  style={{
                    backgroundImage: `url('${ASSETS_SMALL[2].backgroundImage}')`,
                  }}
                />
              </div>
              <div css={STYLES_FILETYPE_GRID_ITEM}>
                <video
                  css={STYLES_VIDEO_SMALL}
                  src={ASSETS_SMALL[3].src}
                  autoPlay
                  loop
                  muted
                  type="video/mp4"
                  playsInline
                  style={{
                    backgroundImage: `url('${ASSETS_SMALL[3].backgroundImage}')`,
                  }}
                />
              </div>
            </div>
          </div>

          <div css={STYLES_SECTION_SLATE}>
            <div css={STYLES_TEXT_BLOCK}>
              <h1 css={STYLES_H1}>
                Upload from <span css={STYLES_HIGHLIGHT}>anywhere</span>
              </h1>
              <h3 css={STYLES_H3}>
                <span css={STYLES_HIGHLIGHT}>The Slate Chrome extension</span> lets you seamlessly upload files to your
                slates from anywhere on the web.
              </h3>
            </div>
            <div>
              <img
                css={STYLES_MEDIA_LEFT}
                src={ASSET_CHROME_EXTENSION}
                alt="Slate Web Clipper being used in chrome dropdown menu"
              />
            </div>
          </div>

          <div css={STYLES_SECTION_SLATE}>
            <div css={STYLES_TEXT_BLOCK}>
              <h1 css={STYLES_H1}>
                <span css={STYLES_HIGHLIGHT}>Organize and publish</span>
              </h1>
              <h3 css={STYLES_H3}>
                <span css={STYLES_HIGHLIGHT}>A modular interface</span> for your files, giving you complete flexibility.
              </h3>
            </div>

            {ASSETS_MEDIUM.map((each) => {
              return (
                <React.Fragment key={each.title}>
                  <div css={STYLES_TEXT_BLOCK}>
                    <h3 css={STYLES_H3}>
                      <span css={STYLES_HIGHLIGHT}>{each.title}</span>
                    </h3>
                  </div>
                  <video
                    css={STYLES_VIDEO_MEDIUM}
                    autoPlay
                    loop
                    muted
                    src={each.src}
                    type="video/mp4"
                    playsInline
                    style={{
                      backgroundImage: `url('${each.backgroundImage}')`,
                    }}
                  />
                </React.Fragment>
              );
            })}
          </div>

          <div css={STYLES_SECTION_SLATE}>
            <div css={STYLES_TEXT_BLOCK}>
              <h1 css={STYLES_H1}>
                <span css={STYLES_HIGHLIGHT}>Collaborate and connect</span>
              </h1>
              <h3 css={STYLES_H3}>
                <span css={STYLES_HIGHLIGHT}>A file sharing network</span> built on top of a storage system making it
                possible to connect with other people on the Filecoin network.
              </h3>
            </div>

            <video
              css={STYLES_VIDEO_BIG}
              src={ASSET_HERO_COLLABORATE.src}
              autoPlay
              loop
              muted
              type="video/mp4"
              playsInline
              style={{
                backgroundImage: `url('${ASSET_HERO_COLLABORATE.backgroundImage}')`,
              }}
            />
          </div>

          <div css={STYLES_SECTION_SLATE}>
            <div css={STYLES_TEXT_BLOCK}>
              <h1 css={STYLES_H1}>
                Built on <span css={STYLES_HIGHLIGHT}>trust, privacy, and security</span>
              </h1>
              <h3 css={STYLES_H3}>
                <span css={STYLES_HIGHLIGHT}>Slate is built on Filecoin and IPFS</span> — technologies built around
                ownership and transparency for the future of the web.
              </h3>
              <a css={STYLES_LINK_WHITE} href="https://filecoin.io" target="_blank">
                Learn more about Filecoin -&gt;
              </a>
            </div>

            <div>
              <img css={STYLES_MEDIA_RIGHT_OVERLAP} src={ASSET_SLATE_CUBE} />
            </div>
          </div>

          <div css={STYLES_SECTION_SLATE_WALL}>
            <div css={STYLES_SLATE_CARD_CTA}>
              <a css={STYLES_SLATE_CARD_PARAGRAPH} href="https://slate.host/_" target="_blank">
                <div css={STYLES_SLATE_CARD_TEXT}>
                  <h1 css={STYLES_SLATE_CARD_CTA_TITLE}>
                    Join us <br />
                    <span css={STYLES_HIGHLIGHT_BLACK}>in our open & secure network</span>
                  </h1>
                  <div css={STYLES_SLATE_CARD_EXPLAINER}>
                    <div css={STYLES_SLATE_CARD_CTA_PARAGRAPH}>Create your first slate</div>
                    <div css={STYLES_SLATE_CARD_CTA_PARAGRAPH}>-&gt;</div>
                  </div>
                </div>
              </a>
            </div>

            <div css={STYLES_SLATE_CARD_GROUP}>
              {USER_SLATES.map((each) => (
                <SlateCardElement
                  key={each.name}
                  preview={each.preview}
                  url={each.url}
                  name={each.name}
                  username={each.username}
                />
              ))}
            </div>
          </div>
        </div>
        <WebsitePrototypeFooter />
      </WebsitePrototypeWrapper>
    );
  }
}
