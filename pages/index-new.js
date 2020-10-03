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
    username: "@gndclouds",
    preview: "https://slate.textile.io/ipfs/bafybeiff7y4kz4e2z4nfso4nsgdbkfsyroa62jvvldoxafuaf34m7lticu",
  },
  {
    name: "Shapes and Letters",
    url: "https://slate.host/haris/shapes-and-letters",
    username: "@haris",
    preview: "https://slate.textile.io/ipfs/bafybeifgxtl7mq5djnorxedzi35hkizjmbjvdy3nnoitd3xvdnqpmruxbm",
  },
  {
    name: "Cartography",
    url: "https://slate.host/atlas/cartography",
    username: "@atlas",
    preview: "https://slate.textile.io/ipfs/bafybeihfrqvfcetmeimpfbacf2tntlgg3xbvgxekoti4tdz2ketczlqp2a",
  },
  {
    name: "September",
    url: "https://slate.host/bitgraves/september",
    username: "@bitgraves",
    preview: "https://slate.textile.io/ipfs/bafybeiclkru6hwzw2ghvsyrbnaf67taxxhq2hbpcia2oqj5ufdggwhcbti",
  },
  {
    name: "Get started with Slate",
    url: "/_",
    username: "",
    preview: "",
    style: { backgroundColor: Constants.system.newBlue, color: Constants.system.white },
  },
  {
    name: "Montreal underground",
    url: "https://slate.host/tcosta/montreal-underground",
    username: "@tcosta",
    preview: "https://slate.textile.io/ipfs/bafybeieblkyt6d7wg4xmltshvxm6w7tz4c3zjpjuu4yfhiak36debqccda",
  },
  {
    name: "American currency",
    url: "https://slate.host/harvardmuseum/american-currency",
    username: "@harvardmuseum",
    preview: "https://slate.textile.io/ipfs/bafybeifmf4ibwik5fepgjodfzalzfdgjgvgevmn5av3xbwhoj64kvnu5te",
  },
  {
    name: "Andrew Garrett's Fish of the South Seas 1909-1910",
    url: "https://slate.host/biodivlibrary/andrew-garrett-s-fische-der-suedsee-bd-3",
    username: "@biodiversity",
    preview: "https://slate.textile.io/ipfs/bafybeicckw3yjfidmihhzkzmwyqcjius54rt2swtala24taizwznqnx3mu",
  },
  {
    name: "Papers",
    url: "https://slate.host/slate/papers",
    username: "@slate",
    preview: "https://slate.textile.io/ipfs/bafkreif7l2vxkvdyrydcjwjjrrmqq73id3tdrdkf3z54tp2fotc75wkdwm",
  },
];

const STYLES_ROOT = css`
  padding: 0 88px;
  margin: -88px auto 0 auto;
  width: 100%;
  background-color: ${Constants.system.wallLight};

  @media (max-width: ${Constants.sizes.mobile}px) {
    padding: 48px 24px 0 24px;
  }
`;

const STYLES_CONTAINER = css`
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
`;

const STYLES_H1 = css`
  font-family: ${Constants.font.medium};
  font-weight: 400;
  font-size: ${Constants.typescale.lvl4};
  letter-spacing: -0.022rem;
  line-height: 1.3;
  color: ${Constants.system.slate};
  margin-bottom: 16px;

  @media (max-width: ${Constants.sizes.tablet}px) {
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
  width: 64%;

  @media (max-width: ${Constants.sizes.tablet}px) {
    width: 100%;
  }
`;

const STYLES_TEXT_BLOCK = css`
  display: block;
  width: 50%;

  @media (max-width: ${Constants.sizes.mobile}px) {
    width: 100%;
  }
`;

const STYLES_TEXT_BLOCK_CENTER = css`
  display: block;
  margin: 0 auto;
  width: 50%;
  text-align: center;

  @media (max-width: ${Constants.sizes.mobile}px) {
    margin-top: 48px;
    width: 100%;
  }
`;

const STYLES_SECTION_WRAPPER = css`
  max-width: 1440px;
  width: 100%;
  height: 100%;
  padding: 120px 0;
  display: flex;
  align-items: flex-start;

  @media (max-width: ${Constants.sizes.tablet}px) {
    padding: 88px 0;
  }

  @media (max-width: ${Constants.sizes.mobile}px) {
    padding: 48px 0;
    display: block;
  }
`;

const STYLES_SECTIONCTA_WRAPPER = css`
  padding: 88px 0 240px 0;
  width: 100%;
  height: 100%;

  @media (max-width: ${Constants.sizes.tablet}px) {
    padding: 48px 0 160px 0;
  }

  @media (max-width: ${Constants.sizes.mobile}px) {
    padding: 0 0px 88px 0px;
  }
`;

const STYLES_LINK = css`
  color: ${Constants.system.newBlue};
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
`;

const STYLES_HIGHLIGHT_RED = css`
  color: ${Constants.system.newRed};
`;

const STYLES_HR_GREEN = css`
  border: 0;
  border-top: 1px solid ${Constants.system.newGreen};

  @media (max-width: ${Constants.sizes.mobile}px) {
    margin-left: 0;
    width: 10%;
    border-top: 2px solid ${Constants.system.newGreen};
  }
`;

const STYLES_HR_YELLOW = css`
  border: 0;
  border-top: 1px solid ${Constants.system.newYellow};

  @media (max-width: ${Constants.sizes.mobile}px) {
    margin-left: 0;
    width: 10%;
    border-top: 2px solid ${Constants.system.newYellow};
  }
`;

const STYLES_IMG = css`
  width: 100%;
  margin: 48px -88px 0 0;
  overflow: hidden;
  box-shadow: 0px 10px 50px 20px rgba(0, 0, 0, 0.2);
`;

const STYLES_SLATE_CARD_GROUP = css`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-top: 48px;
`;

const STYLES_SLATE_CARD = css`
  width: calc(33.33% - 1px);
  height: 20vh;
  margin: -1px -1px 0 0;
  transition: 200ms ease box-shadow;
  border: 1px solid ${Constants.system.darkGray};

  :hover {
    transition: 200ms ease box-shadow;
    box-shadow: 0px 10px 40px 20px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: ${Constants.sizes.mobile}px) {
    width: 100%;
    height: 10vh;
  }
`;

const STYLES_CLEAN_SLATE = css`
  width: calc(33.33% - 1px);
  margin: 0 auto;
  height: 20vh;
  transition: 200ms ease box-shadow;
  background-color: ${Constants.system.newBlue};

  :hover {
    transition: 200ms ease box-shadow;
    box-shadow: 0px 10px 40px 20px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: ${Constants.sizes.mobile}px) {
    width: 100%;
    height: 10vh;
  }
`;

const STYLES_SLATE_CARD_LINK = css`
  text-decoration: none;
`;

const STYLES_SLATE_CARD_TEXT = css`
  display: flex;
  justify-content: space-between;
  padding: 8px 16px;
  width: 100%;
  height: 100%;
`;

const STYLES_CARDP = css`
  font-family: ${Constants.font.text};
  font-weight: 400;
  font-size: ${Constants.typescale.lvl1};
  letter-spacing: -0.011rem;
  line-height: 1.5;
  margin: 4px 0 0 0;
  color: ${Constants.system.slate};

  @media (max-width: ${Constants.sizes.tablet}px) {
    font-size: ${Constants.typescale.lvl0};
  }
`;

const SlateCard = (props) => {
  return (
    <div css={STYLES_SLATE_CARD} style={props.style}>
      <a css={STYLES_SLATE_CARD_LINK} href={props.url} target="_blank">
        <div
          css={css`
            transition: 200ms ease all;
            height: 100%;
            background-color: transparent;
            background-position: 50% 50%;
            background-size: cover;

            :hover {
              background-image: url("${props.preview}");
              opacity: 0.9;
            }
          `}
        >
          <div css={STYLES_SLATE_CARD_TEXT}>
            <p css={STYLES_CARDP} style={props.style}>
              {props.name}
            </p>
            <p css={STYLES_CARDP} style={{ opacity: 0.7 }}>{`${props.username}`}</p>
          </div>
        </div>
      </a>
    </div>
  );
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
          <div css={STYLES_CONTAINER}>
            <div css={STYLES_SECTION_WRAPPER} style={{ display: `block` }}>
              <div css={STYLES_TEXT_BLOCK_CENTER}>
                <h1 css={STYLES_H1} style={{ width: `100%` }}>
                  Take <span css={STYLES_HIGHLIGHT_BLUE}>the blue pill</span>
                </h1>
                <p css={STYLES_P} style={{ width: `100%` }}>
                  Slate is a new file-sharing network that makes it possible for people to collect, organize, and link
                  files together.
                </p>
              </div>
              <div css={STYLES_SLATE_CARD_GROUP}>
                {USER_SLATES.map((each) => (
                  <SlateCard
                    key={each.name}
                    preview={each.preview}
                    url={each.url}
                    name={each.name}
                    username={each.username}
                    style={each.style}
                  />
                ))}
              </div>
            </div>

            <div css={STYLES_SECTION_WRAPPER} style={{ display: `block` }}>
              <h1 css={STYLES_H1}>
                <span css={STYLES_HIGHLIGHT_BLUE}>Get all the space you need</span> <br />
                for all of your valuable data
              </h1>
              <p css={STYLES_P} style={{ opacity: 0.7 }}>
                Powered by Textile, Filecoin, IPFS*.
              </p>
              <br />
              <img
                style={{ width: `100%` }}
                src="https://slate.textile.io/ipfs/bafkreig5365lqtjs5p3yrwh5p4a66wv372c5eesc2fhbmw3l5btourjo2a"
              />
              <br />
              <a css={STYLES_LINK} href="/_">
                50GB free storage for early sign up ->
              </a>
            </div>

            <div css={STYLES_SECTION_WRAPPER}>
              <div css={STYLES_TEXT_BLOCK}>
                <h1 css={STYLES_H1}>
                  <span css={STYLES_HIGHLIGHT_GREEN}>Store, annotate, cite, link</span> <br />
                  your files
                </h1>
                <p css={STYLES_P} style={{ opacity: 0.7 }}>
                  Slate is the new home for information that matters to you.
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
                </ul>
              </div>
              <img
                css={STYLES_IMG}
                src="https://slate.textile.io/ipfs/bafybeidagkcnwti4ndspssvfzquuqfdib5ak2yq4kghdfcsybahm2v64me"
              />
            </div>
            <div css={STYLES_SECTION_WRAPPER}>
              <div css={STYLES_TEXT_BLOCK}>
                <h1 css={STYLES_H1}>
                  <span css={STYLES_HIGHLIGHT_YELLOW}>Curate, present, share</span> <br />
                  your slates
                </h1>
                <p css={STYLES_P} style={{ opacity: 0.7 }}>
                  A modular interface for your files, giving you complete flexibility.
                </p>
                <br />
                <hr css={STYLES_HR_YELLOW} />
                <ul css={STYLES_LIST}>
                  <li>Arrange moodboard</li>
                  <li>Organize research</li>
                  <li>Share presentation</li>
                </ul>
              </div>
              <img
                css={STYLES_IMG}
                style={{ boxShadow: `0px 4px 100px 10px rgba(0, 0, 0, 0.1)` }}
                src="https://slate.textile.io/ipfs/bafybeihihnvl4gzh6vysjwwhzo2i4f5ed7qrh4e4iwaz7y6b3ua3hb5upm"
              />
            </div>
            <div css={STYLES_SECTION_WRAPPER} style={{ display: `block` }}>
              <h1 css={STYLES_H1}>
                <span css={STYLES_HIGHLIGHT_RED}>Connect to think, learn and discuss </span> <br />
                with others
              </h1>
              <div css={STYLES_TEXT_BLOCK}>
                <p css={STYLES_P} style={{ opacity: 0.7 }}>
                  Connect with trusted peers and use slate as a space to think together.
                </p>
              </div>
              <img
                css={STYLES_IMG}
                style={{ margin: `48px auto`, boxShadow: `none` }}
                src="https://slate.textile.io/ipfs/bafkreihen4fii4jmtbpslpjofujdrgrbmnzr3pittluinvmdvszkhtsw2a"
              />
            </div>
            <div css={STYLES_SECTIONCTA_WRAPPER}>
              <div css={STYLES_TEXT_BLOCK_CENTER}>
                <h1 css={STYLES_H1}>
                  <span css={STYLES_HIGHLIGHT_BLUE}>Take a slate</span> <br />
                  to experience the file sharing network
                </h1>
                <br />
              </div>
              <div css={STYLES_CLEAN_SLATE}>
                <a css={STYLES_SLATE_CARD_LINK} href="/_">
                  <div css={STYLES_SLATE_CARD_TEXT}>
                    <p css={STYLES_CARDP} style={{ color: `${Constants.system.white}` }}>
                      Create your first slate
                    </p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
        <WebsitePrototypeFooter />
      </WebsitePrototypeWrapper>
    );
  }
}
