import * as React from "react";
import * as Constants from "~/common/constants";

import WebsitePrototypeWrapper from "~/components/core/WebsitePrototypeWrapper";
import WebsitePrototypeHeader from "~/components/core/NewWebsitePrototypeHeader";
import WebsitePrototypeFooter from "~/components/core/NewWebsitePrototypeFooter";

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

const STYLES_ROOT = css`
  max-width: 1440px;
  margin: -88px auto 0 auto;
  background-color: ${Constants.system.wallLight};
`;

const STYLES_H1 = css`
  font-family: ${Constants.font.medium};
  font-weight: 400;
  font-size: ${Constants.typescale.lvl4};
  letter-spacing: -0.022rem;
  line-height: 1.3;
  color: ${Constants.system.slate};
  margin-bottom: 1rem;
  width: 95%;

  @media (max-width: ${Constants.sizes.mobile}px) {
    font-size: ${Constants.typescale.lvl3};
  }
`;

const STYLES_P = css`
  font-family: ${Constants.font.text};
  font-weight: 400;
  font-size: ${Constants.typescale.lvl1};
  letter-spacing: -0.011rem;
  line-height: 1.5;
  margin: 4px 0 0 0;
  color: ${Constants.system.slate};
  width: 90%;

  @media (max-width: ${Constants.sizes.mobile}px) {
    width: 100%;
  }
`;

const STYLES_TEXT_BLOCK = css`
  width: 33.3%;

  @media (max-width: ${Constants.sizes.mobile}px) {
    display: block;
    width: 100%;
  }
`;

const STYLES_SECTION_WRAPPER = css`
  width: 100%;
  height: 100%;
  padding: 120px 88px;

  @media (max-width: ${Constants.sizes.mobile}px) {
    padding: 48px;
  }
`;

const STYLES_BUTTON_PRIMARY = css`
  margin: 32px 0 16px 0;
  min-height: 48px;
  box-sizing: border-box;
  border: 0;
  border-radius: 4px;
  padding: 0 32px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  background-color: ${Constants.system.newBlue};
  color: ${Constants.system.white};
  font-family: ${Constants.font.semiBold};
  font-weight: 400;
  font-size: ${Constants.typescale.lvl1};
  letter-spacing: -0.011rem;

  transition: 200ms ease all;
  cursor: pointer;

  :hover {
    opacity: 0.9;
  }
`;

const STYLES_BUTTON_SECONDARY = css`
  margin: 32px 0 16px 0;
  min-height: 48px;
  box-sizing: border-box;
  border: 0;
  border-radius: 4px;
  padding: 0 32px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  background-color: ${Constants.system.white};
  color: ${Constants.system.newBlue};
  font-family: ${Constants.font.semiBold};
  font-weight: 400;
  font-size: ${Constants.typescale.lvl1};
  letter-spacing: -0.011rem;

  transition: 200ms ease all;
  cursor: pointer;

  :hover {
    opacity: 0.9;
  }
`;

const STYLES_LINK_WHITE = css`
  color: ${Constants.system.white};
  text-decoration: none;
  transition: 200ms ease none;
  font-family: ${Constants.font.medium};
  font-weight: 400;
  font-size: ${Constants.typescale.lvl1};
  letter-spacing: -0.011rem;
  line-height: 1.5;
  margin: 4px 0 0 0;

  :hover {
    opacity: 0.9;
  }
`;

const STYLES_LIST = css`
  list-style-type: none;
  font-family: ${Constants.font.medium};
  font-weight: 400;
  font-size: ${Constants.typescale.lvl1};
  letter-spacing: -0.011rem;
  line-height: 1.5;
  margin: 4px 0 0 0;
  color: ${Constants.system.slate};
  padding: 0;
`;

const STYLES_HIGHLIGHT_GREEN = css`
  color: ${Constants.system.newGreen};
`;

const STYLES_HIGHLIGHT_YELLOW = css`
  color: ${Constants.system.newYellow};
`;

const STYLES_HIGHLIGHT_BLUE = css`
  color: ${Constants.system.newBlue};
  font-family: ${Constants.font.medium};
  font-weight: 400;
`;

const STYLES_HR_GREEN = css`
  border: 0;
  border-top: 1px solid ${Constants.system.newGreen};
`;

const STYLES_HR_BLUE = css`
  border: 0;
  border-top: 1px solid ${Constants.system.newBlue};
`;

const STYLES_VR = css`
  width: 0.5px;
  height: 50px;
  opacity: 0.5;
  margin: 0 auto;
`;

const STYLES_IMG = css`
  width: 66.6%;
  height: auto;
  margin: 48px -88px 0 0;
  box-shadow: 0px 10px 50px 20px rgba(0, 0, 0, 0.2);
`;

const styleWhite = {
  color: `${Constants.system.white}`,
};

const stylePWhite = {
  color: `${Constants.system.white}`,
  opacity: `0.7`,
};

const styleWall = {
  backgroundColor: `${Constants.system.wall}`,
  boxShadow: `-6px -6px 10px #ffffff, 4px 4px 10px #d4d4d4`,
  display: `flex`,
};

const styleWallVert = {
  backgroundColor: `${Constants.system.wall}`,
  boxShadow: `-6px -6px 10px #ffffff, 4px 4px 10px #d4d4d4`,
};

const styleSlate = {
  backgroundColor: `${Constants.system.slate}`,
  boxShadow: `-6px -6px 10px #ffffff, 4px 4px 10px #d4d4d4`,
  display: `flex`,
};

const styleCenter = {
  width: `33.3%`,
  margin: `auto`,
};

const styleCenterAlign = {
  width: `33.3%`,
  margin: `auto`,
  textAlign: `center`,
};

const STYLES_SLATE_CARD_GROUP = css`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-top: 48px;

  @media (max-width: ${Constants.sizes.mobile}px) {
    display: block;
  }
`;

const STYLES_SLATE_CARD = css`
  width: calc(33.33% - 16px);
  height: 25vh;
  margin: 16px 16px 0 0;
  border-radius: 4px;
  transition: 200ms ease box-shadow;
  border: 1px solid ${Constants.system.darkGray};

  :hover {
    transition: 200ms ease box-shadow;
    box-shadow: 0px 10px 40px 20px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: ${Constants.sizes.mobile}px) {
    width: 100%;
    margin-bottom: 16px;
  }
`;

const STYLES_CLEAN_SLATE = css`
  width: 100%;
  height: 25vh;
  margin: 16px 16px 0 0;
  border-radius: 4px;
  transition: 200ms ease box-shadow;
  border: 1px solid ${Constants.system.darkGray};
  opacity: 0.5;

  @media (max-width: ${Constants.sizes.mobile}px) {
    width: 100%;
    margin-bottom: 16px;
  }
`;

const STYLES_SLATE_CARD_LINK = css`
  text-decoration: none;
`;

const STYLES_SLATE_CARD_TEXT = css`
  display: flex;
  justify-content: space-between;
  padding: 8px 16px;
`;

const STYLES_CARDP = css`
  font-family: ${Constants.font.text};
  font-weight: 400;
  font-size: ${Constants.typescale.lvl1};
  letter-spacing: -0.011rem;
  line-height: 1.5;
  margin: 4px 0 0 0;
  color: ${Constants.system.slate};

  @media (max-width: ${Constants.sizes.mobile}px) {
    width: 100%;
  }
`;

const SlateCard = (props) => {
  return (
    <div css={STYLES_SLATE_CARD}>
      <a css={STYLES_SLATE_CARD_LINK} href={props.url} target="_blank">
        <div
          css={css`
            transition: 200ms ease all;
            height: 100%;
            background-color: transparent;
            background-position: 50% 50%;
            background-size: cover;
            border-radius: 4px;

            :hover {
              background-color: ${Constants.system.pitchBlack};
              background-image: url("${props.preview}");
            }
          `}
        >
          <div css={STYLES_SLATE_CARD_TEXT}>
            <p css={STYLES_CARDP}>{props.name}</p>
            <p css={STYLES_CARDP} style={{ opacity: 0.7 }}>
              {`@${props.username}`}
            </p>
          </div>
        </div>
      </a>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  return {
    props: { ...context.query },
  };
};

export default class IndexPage extends React.Component {
  render() {
    const title = `Slate`;
    const description = "Welcome to the future of file sharing. Powered by Textile, Filecoin, and IPFS.";
    const url = "https://slate.host";

    return (
      <WebsitePrototypeWrapper title={title} description={description} url={url}>
        <WebsitePrototypeHeader />
        <div css={STYLES_ROOT}>
          <div css={STYLES_SECTION_WRAPPER}>
            <img
              style={{ width: `100%`, marginBottom: -64 }}
              src="https://slate.textile.io/ipfs/bafkreigowyoo25djd5qrbemkyelm5g2ptc5rc2vzyynwzgxfy4kmhbaumy"
            />
            <div css={STYLES_TEXT_BLOCK} style={styleCenter}>
              <h1 css={STYLES_H1}>
                Public file sharing network <span style={{ opacity: 0.7 }}>for you, your files, and your friends.</span>
              </h1>
              <button css={STYLES_BUTTON_PRIMARY} onClick={() => window.open("/_")}>
                Use Slate
              </button>
              <p css={STYLES_P}>
                <span css={STYLES_HIGHLIGHT_BLUE}>Enjoy 50GB free storage with early sign up.</span>
              </p>
              <br />
              <p css={STYLES_P} style={{ opacity: 0.7 }}>
                Slate is a fully open-source file sharing network designed for research and collaboration. <br />
                Store your data, <br />
                organize it any way you like, <br />
                and share it publicly with the world.
              </p>
              <br />
              <p css={STYLES_P}>Powered by Textile, Filecoin and IPFS.</p>
            </div>
          </div>
          <div css={STYLES_SECTION_WRAPPER} style={styleWall}>
            <div css={STYLES_TEXT_BLOCK}>
              <h1 css={STYLES_H1}>
                <span css={STYLES_HIGHLIGHT_GREEN}>Store, annotate, cite, link</span> your files
              </h1>
              <p css={STYLES_P} style={{ opacity: 0.7 }}>
                Slate is the new home for your valuable information.
              </p>
              <br />
              <hr css={STYLES_HR_GREEN} />
              <ul css={STYLES_LIST}>
                <li>Books</li>
                <li>White papers</li>
                <li>Writing notes</li>
                <li>Films</li>
                <li>Videos</li>
                <li>Photographs</li>
                <li>Illustrations</li>
                <li>Data graphs</li>
                <li>Maps</li>
                <li>Designs</li>
                <li>Music albums</li>
                <li>Podcasts</li>
                <li>Games</li>
                <li>Code</li>
                <li style={{ opacity: 0.7 }}>And more</li>
              </ul>
            </div>
            <img
              css={STYLES_IMG}
              src="https://slate.textile.io/ipfs/bafybeidagkcnwti4ndspssvfzquuqfdib5ak2yq4kghdfcsybahm2v64me"
            />
          </div>

          <div css={STYLES_SECTION_WRAPPER} style={styleSlate}>
            <div css={STYLES_TEXT_BLOCK}>
              <h1 css={STYLES_H1}>
                <span css={STYLES_HIGHLIGHT_YELLOW}>Upload images</span>{" "}
                <span style={styleWhite}>
                  <br />
                  from anywhere
                </span>
              </h1>
              <p css={STYLES_P} style={stylePWhite}>
                The Slate Chrome extension lets you seamlessly upload files to your slates from anywhere on the web.
              </p>
              <button
                css={STYLES_BUTTON_SECONDARY}
                onClick={() =>
                  window.open("https://chrome.google.com/webstore/detail/slate/gloembacbehhbfbkcfjmloikeeaebnoc")
                }
              >
                Add Slate to Chrome
              </button>
            </div>
            <img
              css={STYLES_IMG}
              style={{ boxShadow: `none` }}
              src="https://slate.textile.io/ipfs/bafybeidlg6opyuq6hjli5glyfczrfxaqoftidcllhsd65vofyrbv5k56c4"
            />
          </div>
          <div css={STYLES_SECTION_WRAPPER} style={{ display: `flex` }}>
            <div css={STYLES_TEXT_BLOCK}>
              <h1 css={STYLES_H1}>
                <span css={STYLES_HIGHLIGHT_BLUE}>Organize your mind</span> <br />
                with drag and drop
              </h1>
              <p css={STYLES_P} style={{ opacity: 0.7 }}>
                A modular interface for your files, giving you complete flexibility.
              </p>
              <br />
              <hr css={STYLES_HR_BLUE} />
              <ul css={STYLES_LIST}>
                <li>Arrange moodboard</li>
                <li>Organize research</li>
                <li>Share presentation</li>
                <li style={{ opacity: 0.7 }}>And more</li>
              </ul>
            </div>
            <img
              css={STYLES_IMG}
              style={{ boxShadow: `0px 4px 100px 10px rgba(0, 0, 0, 0.1)` }}
              src="https://slate.textile.io/ipfs/bafybeih5ndej2zhjxqewbqxqtf34su57lhdlxbeetv2xaokpvmo35exjry"
            />
          </div>
          <div css={STYLES_SECTION_WRAPPER} style={styleWallVert}>
            <div css={STYLES_TEXT_BLOCK}>
              <h1 css={STYLES_H1}>
                <span css={STYLES_HIGHLIGHT_GREEN}>Connect with people</span> <br />
                to learn, think, and discuss
              </h1>
              <p css={STYLES_P} style={{ opacity: 0.7 }}>
                A file sharing network built on top of a storage system making it possible to connect with other people.
              </p>
            </div>
            <img
              css={STYLES_IMG}
              style={{ width: `100%`, boxShadow: `none` }}
              src="https://slate.textile.io/ipfs/bafybeigscozubtk6szip7yeaukqnzbxqhladxu5fyu5mghi32sdpzyzlxm"
            />
          </div>
          <div css={STYLES_SECTION_WRAPPER} style={styleSlate}>
            <div css={STYLES_TEXT_BLOCK}>
              <h1 css={STYLES_H1}>
                <span css={STYLES_HIGHLIGHT_YELLOW}>Privacy feature</span>{" "}
                <span style={styleWhite}>
                  {" "}
                  <br />
                  coming soon
                </span>
              </h1>
              <p css={STYLES_P} style={stylePWhite}>
                Building on top of Filecoin, Textile and IPFS — technologies built around ownership and transparency for
                the future of the web, Slate will soon support people who want to provide key-only-access to data. This
                will allow you to send data privately to people you trust.
              </p>
              <br />
              <a css={STYLES_LINK_WHITE} href="https://filecoin.io" target="_blank">
                Learn more about Filecoin -&gt;
              </a>
            </div>
            <img
              css={STYLES_IMG}
              style={{ boxShadow: `none` }}
              src="https://slate.textile.io/ipfs/bafybeigp65g7y5pdor5gkvm3f43m35n4dr2rq62hdltfe7iwbiltdoj7yy"
            />
          </div>
          <div css={STYLES_SECTION_WRAPPER}>
            <div css={STYLES_TEXT_BLOCK} style={styleCenterAlign}>
              <h1 css={STYLES_H1}>
                <span css={STYLES_HIGHLIGHT_BLUE}>Join us</span> <br />
                in the file sharing network
              </h1>
              <br />
              <div css={STYLES_CLEAN_SLATE}>
                <div css={STYLES_SLATE_CARD_TEXT}>
                  <p css={STYLES_CARDP}>A clean slate</p>
                </div>
              </div>
              <hr css={STYLES_VR} />
              <button css={STYLES_BUTTON_PRIMARY} style={{ margin: 0 }} onClick={() => window.open("/_")}>
                Use Slate
              </button>
            </div>
            <div css={STYLES_SLATE_CARD_GROUP}>
              {USER_SLATES.map((each) => (
                <SlateCard
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
