import * as React from "react";
import * as Constants from "~/common/constants";
import * as Actions from "~/common/actions";

import WebsitePrototypeWrapper from "~/components/core/WebsitePrototypeWrapper";
import WebsitePrototypeHeader from "~/components/core/NewWebsitePrototypeHeader";
import WebsitePrototypeFooter from "~/components/core/NewWebsitePrototypeFooter";

import TextLoop from "react-text-loop";
import { css } from "@emotion/react";

const STYLES_ROOT = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 1440px;
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
  font-size: 3.815rem;
  line-height: 1.25;
  padding: 0px 0px 32px 0px;
  width: 100%;
  color: ${Constants.system.white};

  @media (max-width: ${Constants.sizes.tablet}px) {
    font-size: 3.052rem;
    padding: 0px 0px 24px 0px;
  }

  @media (max-width: ${Constants.sizes.mobile}px) {
    font-size: 1.953rem;
    padding: 0px 0px 8px 0px;
  }
`;

const STYLES_H2 = css`
  font-size: 2.441em;
  line-height: 1.25;
  padding: 16px 0px 0 0px;
  width: 100%;
  color: ${Constants.system.darkGray};

  @media (max-width: ${Constants.sizes.tablet}px) {
    font-size: 1.563rem;
    padding: 8px 0px 0px 0px;
  }

  @media (max-width: ${Constants.sizes.mobile}px) {
    font-size: 1.25rem;
    padding: 8px 0px 0 0px;
    line-height: 1.5;
  }
`;

const STYLES_H3 = css`
  font-size: 1.563rem;
  line-height: 1.5;
  padding: 16px 0px 0px 0px;
  color: ${Constants.system.darkGray};

  @media (max-width: ${Constants.sizes.tablet}px) {
    font-size: 1.25rem;
    padding: 8px 0px 0px 0px;
  }

  @media (max-width: ${Constants.sizes.mobile}px) {
    font-size: 1rem;
    padding: 8px 0px 0px 0px;
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
  background: ${Constants.system.black};

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
  background: ${Constants.system.wall};

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
  background: ${Constants.system.slate};

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
    display: block;
  }
`;

const STYLES_FILETYPE_GRID_ITEM = css`
  padding: 0 48px 48px 0;
  width: 50%;

  @media (max-width: ${Constants.sizes.mobile}px) {
    width: 100%;
    padding: 0 0 24px 0;
  }
`;

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

const STYLES_VIDEO_SMALL = css`
  display: block;
  background-color: ${Constants.system.moonstone};
  padding: 0;
  outline: 0;
  border-radius: 4px;
  width: 100%;
  box-shadow: 0px 10px 50px 20px rgba(0, 0, 0, 0.1);
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
  width: 56vw;
  align-self: center;

  @media (max-width: ${Constants.sizes.mobile}px) {
    width: 88%;
    right: 24px;
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
  background-color: ${Constants.system.wall};
  color: ${Constants.system.slate};
  box-shadow: 0px 10px 50px 20px rgba(0, 0, 0, 0.1);

  :hover {
    background-color: ${Constants.system.pitchBlack};
    box-shadow: 0px 10px 90px 20px rgba(207, 206, 211, 0.3);
    color: ${Constants.system.wall};
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
  color: ${Constants.system.white};
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
  margin-bottom: -1px;
`;

const STYLES_SLATE_CARD = css`
  width: calc(100% / 3 + 1px);
  height: calc(100vh / 4);
  margin-left: -1px;
  border-radius: 4px;
  transition: 200ms ease box-shadow;
  box-shadow: 0px 4px 8px 4px rgba(0, 0, 0, 0.02);
  :hover {
    transition: 200ms ease box-shadow;
    box-shadow: 0px 10px 40px 20px rgba(0, 0, 0, 0.1);
  }

  a {
    color: ${Constants.system.moonstone};

    :hover {
      color: ${Constants.system.pitchBlack};
      font-color: ${Constants.system.pitchBlack};
      background-color: transparent;
      text-decoration: none;
    }

    :active {
      color: ${Constants.system.pitchBlack};
      background-color: transparent;
      text-decoration: none;
    }
  }
`;

const STYLES_SLATE_CARD_GRAY = css`
  width: 100%;
  height: calc(100vh / 2);
  margin-left: -1px;
  box-shadow: 0px 4px 80px 4px rgba(0, 0, 0, 0.1);
  text-decoration: none;
  transition: 200ms ease box-shadow;
  border-radius: 4px;

  a {
    color: ${Constants.system.pitchBlack};
    transition: 200ms ease all;

    :hover,
    :active {
      color: ${Constants.system.pitchBlack};
      background-color: transparent;
      text-decoration: none;
    }
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
  font-size: 1.25rem;
  text-align: left;
  width: 100%;

  @media (max-width: ${Constants.sizes.mobile}px) {
    padding: 0px;
    font-size: 1rem;
  }
`;

const STYLES_SLATE_CARD_CTA_TITLE = css`
  font-size: 3.815rem;
  text-align: left;
  line-height: 1.25;
  padding: 12px;
  overflow-wrap: break-word;
  width: 100%;
  color: ${Constants.system.darkGray};

  @media (max-width: ${Constants.sizes.tablet}px) {
    font-size: 3.052rem;
  }
  @media (max-width: ${Constants.sizes.mobile}px) {
    font-size: 1.953rem;
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
    font-size: 1rem;
  }
`;

const STYLES_SLATE_CARD_PARAGRAPH = css`
  font-size: 12px;
  text-align: left;
  text-decoration: none;

  @media (max-width: ${Constants.sizes.mobile}px) {
    font-size: 0.78rem;
  }
`;

const STYLES_SLATE_CARD_CTA_PARAGRAPH = css`
  font-size: 1.25rem;
  text-align: left;

  @media (max-width: ${Constants.sizes.mobile}px) {
    font-size: 1rem;
  }
`;
const STYLES_SLATE_CARD_URBAN_GARDENS = css`
  border-radius: 4px;
  height: 100%;
  :hover {
    background-image: url(https://bafybeiff7y4kz4e2z4nfso4nsgdbkfsyroa62jvvldoxafuaf34m7lticu.ipfs.slate.textile.io/);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    opacity: 0.5;
  }
`;
const STYLES_SLATE_CARD_SHAPES_LETTERS = css`
  borderradius: 4px;
  height: 100%;
  :hover {
    background-image: url(https://bafybeifgxtl7mq5djnorxedzi35hkizjmbjvdy3nnoitd3xvdnqpmruxbm.ipfs.slate.textile.io/);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    opacity: 0.5;
  }
`;
const STYLES_SLATE_CARD_MOUNTIANS = css`
  border-radius: 4px;
  height: 100%;
  :hover {
    background-image: url(https://bafkreies6uykgocrkunrsndxfubntyqvfqzo5wuwyos42vak6d4qnvtdn4.ipfs.slate.textile.io/);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    opacity: 0.5;
  }
`;
const STYLES_SLATE_CARD_LOOM = css`
  border-radius: 4px;
  height: 100%;
  :hover {
    background-image: url(https://bafybeifl5xzy4vjctrsr3jywdlv5ceq3hpaadhcii2ekjx2gljyagveqna.ipfs.slate.textile.io/);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    opacity: 0.5;
  }
`;
const STYLES_SLATE_CARD_BRAND = css`
  border-radius: 4px;
  height: 100%;
  :hover {
    background-image: url(https://bafybeiaerbu2nivrgncqtwgwom27caji25netswvjbo6tcmbka47ucmupa.ipfs.slate.textile.io/);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    opacity: 0.5;
  }
`;
const STYLES_SLATE_CARD_UNDERGROUND = css`
  border-radius: 4px;
  height: 100%;
  :hover {
    background-image: url(https://bafybeieblkyt6d7wg4xmltshvxm6w7tz4c3zjpjuu4yfhiak36debqccda.ipfs.slate.textile.io/);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    opacity: 0.5;
  }
`;
const STYLES_SLATE_CARD_MONET = css`
  border-radius: 4px;
  height: 100%;
  :hover {
    background-image: url(https://bafkreieb4yfiamtipapmhoihl547lxeod2vfku67dimrhmab5tcglr5bli.ipfs.slate.textile.io/);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    opacity: 0.5;
  }
`;
const STYLES_SLATE_CARD_BOOK_SHELF = css`
  border-radius: 4px;
  height: 100%;
  :hover {
    background-image: url(https://bafkreihe7ismqfyytekj6yvbv6mpbc5de3gozk6n7a47smodbcsnrhbpri.ipfs.slate.textile.io/);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    opacity: 0.5;
  }
`;
const STYLES_SLATE_CARD_PAPERS = css`
  border-radius: 4px;
  height: 100%;
  :hover {
    background-image: url(https://bafkreif7l2vxkvdyrydcjwjjrrmqq73id3tdrdkf3z54tp2fotc75wkdwm.ipfs.slate.textile.io/);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    opacity: 0.5;
  }
`;

export const getServerSideProps = async context => {
  return {
    props: { ...context.query }
  };
};

export default class IndexPage extends React.Component {
  async componentDidMount() {
    const response = await Actions.health();
    console.log("HEALTH_CHECK", response);
  }

  render() {
    const title = `Slate`;
    const description =
      "Welcome to the future of file sharing. Powered by Textile, Filecoin, and IPFS.";
    const url = "https://slate.host";
    return (
      <WebsitePrototypeWrapper
        title={title}
        description={description}
        url={url}
      >
        <WebsitePrototypeHeader />
        <div css={STYLES_ROOT}>
          <section css={STYLES_SECTION_HERO}>
            <div css={STYLES_TEXT_BLOCK}>
              <h1 css={STYLES_H1}>
                A file storage network <br />
                for you, your files, <br />
                and your friends.
              </h1>

              <div css={STYLES_ACTIONS_RIGHT}>
                <div
                  css={STYLES_BUTTON_PRIMARY}
                  onClick={() => window.open("/_")}
                >
                  Use Slate
                </div>
              </div>
            </div>
            <br />
            <video
              css={STYLES_VIDEO_BIG}
              autoPlay
              loop
              muted
              src="https://bafybeidfr2x5ftxzixjxtrgiqm6iuotzip25tlrpase226jog3tqenqd4a.ipfs.slate.textile.io/"
              type="video/m4v"
              playsInline
              style={{
                backgroundImage: `url('https://bafybeict43te7wcy7pdw3v45dwwedwxw7yjthbytdsja6dpsiqkgil7iey.ipfs.slate.textile.io/')`,
                borderRadius: `4px`,
                width: `100%`,
                boxShadow: `0px 10px 50px 20px rgba(0, 0, 0, 0.1)`,
                backgroundSize: `cover`
              }}
            />
            <div css={STYLES_TEXT_BLOCK}>
              <h2 css={STYLES_H2}>
                Slate{" "}
                <span css={STYLES_HIGHLIGHT}>
                  is a{" "}
                  <a
                    css={STYLES_LINK}
                    href={"https://github.com/filecoin-project/slate"}
                    target="_blank"
                  >
                    fully open-source
                  </a>{" "}
                  file sharing network designed for research and collaboration.
                </span>
                <br />
                <br />
                <span css={STYLES_HIGHLIGHT}>Store</span> your data,
                <br />
                <span css={STYLES_HIGHLIGHT}>organize</span> it any way you
                like, <br />
                <span css={STYLES_HIGHLIGHT}>and share</span> it with the world
                securely.
                <br />
                <br />
              </h2>
              <h3 css={STYLES_H3}>Powered by</h3>
              <h2 css={STYLES_H2}>
                <span css={STYLES_HIGHLIGHT}>
                  <a
                    href="https://textile.io"
                    css={STYLES_LINK}
                    target="_blank"
                  >
                    Textile
                  </a>{" "}
                  <br />
                  <a
                    href="https://filecoin.io"
                    css={STYLES_LINK}
                    target="_blank"
                  >
                    Filecoin
                  </a>
                  <br />
                  <a href="https://ipfs.io" css={STYLES_LINK} target="_blank">
                    IPFS
                  </a>
                </span>
              </h2>
            </div>
          </section>
          <section css={STYLES_SECTION_SLATE}>
            <div css={STYLES_TEXT_BLOCK}>
              <h1 css={STYLES_H1}>
                A new home
                <br />{" "}
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
                <span css={STYLES_HIGHLIGHT}>Easily upload </span>any kind of
                media file to your storage system.
                <br />
              </h3>
              <div css={STYLES_FILETYPE}>
                <div css={STYLES_FILETYPE_GRID_ITEM}>
                  <video
                    autoPlay
                    loop
                    muted
                    css={STYLES_VIDEO_SMALL}
                    src="https://bafybeiawzns4vxqp3llkzmc4shvytzpurysh26yj3aljde4d4fsgf7wlze.ipfs.slate.textile.io/"
                    type="video/mp4"
                    playsInline
                    style={{
                      backgroundImage: `url('https://bafybeihez3rtyqqftx7mkyktwozyqjkwdtk2kglxqjc4zspah26bva3yk4.ipfs.slate.textile.io/')`,
                      backgroundSize: `cover`,
                      borderRadius: `4px`,
                      boxShadow: `0px 10px 50px 20px rgba(0, 0, 0, 0.1)`
                    }}
                  />
                </div>
                <div css={STYLES_FILETYPE_GRID_ITEM}>
                  <video
                    autoPlay
                    loop
                    muted
                    css={STYLES_VIDEO_SMALL}
                    src="https://bafybeiczug4d6uyr4pkejdwirkeffbzkkzrbaprxvreid6iitw3pmjzq3q.ipfs.slate.textile.io/"
                    type="video/mp4"
                    playsInline
                    style={{
                      backgroundImage: `url('https://bafybeidnt2l3lslxi7ofkxs5ffncsh4fw5h2ohbukxumngrqj5pdrooaou.ipfs.slate.textile.io/')`,
                      backgroundSize: `cover`,
                      borderRadius: `4px`,
                      boxShadow: `0px 10px 50px 20px rgba(0, 0, 0, 0.1)`
                    }}
                  />
                </div>
              </div>
              <div css={STYLES_FILETYPE}>
                <div css={STYLES_FILETYPE_GRID_ITEM}>
                  <video
                    autoPlay
                    loop
                    muted
                    css={STYLES_VIDEO_SMALL}
                    src="https://bafkreid7wl4443p764ozdlqtodh7dmsej6ffayp4tc3lr3hil2qkclrohi.ipfs.slate.textile.io/"
                    type="video/mp4"
                    playsInline
                    style={{
                      backgroundImage: `url('https://bafkreibb3onijljnmonrbs7qguimjf5qwbnkx3m33pouxbtar2yb7hupti.ipfs.slate.textile.io/')`,
                      backgroundSize: `cover`,
                      borderRadius: `4px`,
                      boxShadow: `0px 10px 50px 20px rgba(0, 0, 0, 0.1)`
                    }}
                  />
                </div>
                <div css={STYLES_FILETYPE_GRID_ITEM}>
                  <video
                    autoPlay
                    loop
                    muted
                    css={STYLES_VIDEO_SMALL}
                    src="https://bafybeicjovnsnhvt7xwjw3igdwwpb4ms2m23fayoydj3oevrwyi7dzjtga.ipfs.slate.textile.io/"
                    type="video/mp4"
                    playsInline
                    style={{
                      backgroundImage: `url('https://bafkreihu7k46n6eixx6sxjv7aolou5bgvksvb7ryju3gbwie22t6r2dhli.ipfs.slate.textile.io/')`,
                      backgroundSize: `cover`,
                      borderRadius: `4px`,
                      boxShadow: `0px 10px 50px 20px rgba(0, 0, 0, 0.1)`
                    }}
                  />
                </div>
              </div>
            </div>
          </section>

          <section css={STYLES_SECTION_SLATE}>
            <div css={STYLES_TEXT_BLOCK}>
              <h1 css={STYLES_H1}>
                Upload from <br />
                <span css={STYLES_HIGHLIGHT}>anywhere</span>
              </h1>
              <h3 css={STYLES_H3}>
                <span css={STYLES_HIGHLIGHT}>The Slate Chrome extension</span>{" "}
                lets you seamlessly upload files to your slates from anywhere on
                the web.
              </h3>
            </div>
            <div>
              <img
                css={STYLES_MEDIA_LEFT}
                src="https://bafybeig46uuyp3fkjpk2edeqlmt26r3rxdola52dy7kbgvjms6olyucjdu.ipfs.slate.textile.io/"
                alt="Slate Web Clipper being used in chrome dropdown menu"
              />
            </div>
          </section>

          <section css={STYLES_SECTION_SLATE}>
            <div css={STYLES_TEXT_BLOCK}>
              <h1 css={STYLES_H1}>
                <span css={STYLES_HIGHLIGHT}>
                  Organize <br />
                  and publish
                </span>
              </h1>
              <h3 css={STYLES_H3}>
                <span css={STYLES_HIGHLIGHT}>A modular interface</span> for your
                files, giving you complete flexibility.
              </h3>
              <br />
              <br />
              <br />
              <h2 css={STYLES_H2}>Create moodboards</h2>

              <video
                css={STYLES_VIDEO_BIG}
                autoPlay
                loop
                muted
                src="https://bafybeiagnzwfvdsqqxamlpru2fulmwzlgaqtg4ys4gs4wfnm5rq75c2cs4.ipfs.slate.textile.io/"
                type="video/mp4"
                playsInline
                style={{
                  backgroundImage: `url('https://bafybeicoaponp2nv3ikpsjgcgu7pio6aercflsvsiyxrpaonza7ncg73dq.ipfs.slate.textile.io/')`,
                  backgroundSize: `cover`,
                  borderRadius: `4px`,
                  boxShadow: `0px 10px 50px 20px rgba(0, 0, 0, 0.1)`
                }}
              />

              <h2 css={STYLES_H2}>Organize research</h2>

              <video
                css={STYLES_VIDEO_BIG}
                autoPlay
                loop
                muted
                src="https://bafybeigstyjfpzazdlmgkfuhw4yxrneux3opvbls7nmv6gq7dbnhmy6xwy.ipfs.slate.textile.io/"
                type="video/mp4"
                playsInline
                style={{
                  backgroundImage: `url('https://bafybeie4p45yfvbjdzc2rgw67e7crcltpu7o544xtugs3wyv3qh3t3oegi.ipfs.slate.textile.io/')`,
                  backgroundSize: `cover`,
                  borderRadius: `4px`,
                  boxShadow: `0px 10px 50px 20px rgba(0, 0, 0, 0.1)`
                }}
              />

              <h2 css={STYLES_H2}>Share presentations</h2>

              <video
                css={STYLES_VIDEO_BIG}
                autoPlay
                loop
                muted
                src="https://bafybeiampkmsxeihxnuz2hkgbhtzosgkwghslpwm7dsrxrzlqwa7tvzreq.ipfs.slate.textile.io/"
                type="video/mp4"
                playsInline
                style={{
                  backgroundImage: `url('https://bafkreiglefskwq7bpa3aazihegawd4qwxockl6shipnps7zlokrbnu4f7u.ipfs.slate.textile.io/')`,
                  backgroundSize: `cover`,
                  borderRadius: `4px`,
                  boxShadow: `0px 10px 50px 20px rgba(0, 0, 0, 0.1)`
                }}
              />
            </div>
          </section>

          <section css={STYLES_SECTION_SLATE}>
            <div css={STYLES_TEXT_BLOCK}>
              <h1 css={STYLES_H1}>
                <span css={STYLES_HIGHLIGHT}>
                  Collaborate <br />
                  and connect
                </span>
              </h1>
              <h3 css={STYLES_H3}>
                <span css={STYLES_HIGHLIGHT}>A file sharing network</span> built
                on top of a storage system making it possible to connect with
                other people on the Filecoin network.
              </h3>
            </div>

            <div>
              <video
                css={STYLES_VIDEO_BIG}
                autoPlay
                loop
                muted
                src="https://bafybeih63zq5f7htbhkmrog447ybytyid2yi6fix4k6z3pbegxpcq2r2qa.ipfs.slate.textile.io/"
                type="video/mp4"
                playsInline
                style={{
                  backgroundImage: `url('https://bafkreiagwjqvmisseb6voj7cwd3lhjudigkel63hqg6efpqjmhlfv5ucj4.ipfs.slate.textile.io/')`,
                  backgroundSize: `cover`,
                  borderRadius: `4px`,
                  boxShadow: `0px 10px 50px 20px rgba(0, 0, 0, 0.1)`
                }}
              />
            </div>
          </section>

          <section css={STYLES_SECTION_SLATE}>
            <div css={STYLES_TEXT_BLOCK}>
              <h1 css={STYLES_H1}>
                Built on <br />
                <span css={STYLES_HIGHLIGHT}>
                  trust, privacy, <br />
                  and security
                </span>
              </h1>
              <h3 css={STYLES_H3}>
                <span css={STYLES_HIGHLIGHT}>
                  Slate is built on Filecoin and IPFS
                </span>{" "}
                — technologies built around ownership and transparency for the
                future of the web.
              </h3>
              <a
                css={STYLES_LINK_WHITE}
                href="https://filecoin.io"
                target="_blank"
              >
                Learn more about Filecoin -&gt;
              </a>
            </div>
            z
            <div>
              <img
                css={STYLES_MEDIA_RIGHT_OVERLAP}
                src="https://bafybeiaex6rorqtumulc4x3u4sbl5pdbn5sx45mvm6uvbebu4cxgk3okjy.ipfs.slate.textile.io/"
                alt="Slate logo in frosted cube"
              />
            </div>
          </section>

          <section css={STYLES_SECTION_SLATE_WALL}>
            <div css={STYLES_SLATE_CARD_GRAY}>
              <a
                css={STYLES_SLATE_CARD_PARAGRAPH}
                href="https://slate.host/_"
                target="_blank"
              >
                <div css={STYLES_SLATE_CARD_TEXT}>
                  <h1 css={STYLES_SLATE_CARD_CTA_TITLE}>
                    Join us <br />
                    <span css={STYLES_HIGHLIGHT_BLACK}>
                      in our open & secure network
                    </span>
                  </h1>
                  <div css={STYLES_SLATE_CARD_EXPLAINER}>
                    <div css={STYLES_SLATE_CARD_CTA_PARAGRAPH}>
                      Create your first slate
                    </div>
                    <div css={STYLES_SLATE_CARD_CTA_PARAGRAPH}>-&gt;</div>
                  </div>
                </div>
              </a>
            </div>
            <br />
            <br />
            <div css={STYLES_SLATE_CARD_GROUP}>
              <div css={STYLES_SLATE_CARD}>
                <div css={STYLES_SLATE_CARD_URBAN_GARDENS}>
                  <a
                    css={STYLES_SLATE_CARD_PARAGRAPH}
                    href="https://slate.host/gndclouds/urban-gardens"
                    target="_blank"
                  >
                    <div css={STYLES_SLATE_CARD_TEXT}>
                      <div css={STYLES_SLATE_CARD_TITLE}>Urban gardens</div>
                      <div css={STYLES_SLATE_CARD_EXPLAINER}>
                        <div css={STYLES_SLATE_CARD_PARAGRAPH}>@gndclouds</div>
                        <div css={STYLES_SLATE_CARD_PARAGRAPH}>-&gt;</div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>

              <div css={STYLES_SLATE_CARD}>
                <div css={STYLES_SLATE_CARD_SHAPES_LETTERS}>
                  <a
                    css={STYLES_SLATE_CARD_PARAGRAPH}
                    href="https://slate.host/haris/shapes-and-letters"
                    target="_blank"
                  >
                    <div css={STYLES_SLATE_CARD_TEXT}>
                      <div css={STYLES_SLATE_CARD_TITLE}>
                        Shapes and letters
                      </div>
                      <div css={STYLES_SLATE_CARD_EXPLAINER}>
                        <div css={STYLES_SLATE_CARD_PARAGRAPH}>@haris</div>
                        <div css={STYLES_SLATE_CARD_PARAGRAPH}>-&gt;</div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
              <div css={STYLES_SLATE_CARD}>
                <div css={STYLES_SLATE_CARD_MOUNTIANS}>
                  <a
                    css={STYLES_SLATE_CARD_PARAGRAPH}
                    href="https://slate.host/jason/mountains"
                    target="_blank"
                  >
                    <div css={STYLES_SLATE_CARD_TEXT}>
                      <div css={STYLES_SLATE_CARD_TITLE}>Mountains</div>
                      <div css={STYLES_SLATE_CARD_EXPLAINER}>
                        <div css={STYLES_SLATE_CARD_PARAGRAPH}>@jason</div>
                        <div css={STYLES_SLATE_CARD_PARAGRAPH}>-&gt;</div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            <div css={STYLES_SLATE_CARD_GROUP}>
              <div css={STYLES_SLATE_CARD}>
                <div css={STYLES_SLATE_CARD_LOOM}>
                  <a
                    css={STYLES_SLATE_CARD_PARAGRAPH}
                    href="https://slate.host/tara/loom"
                    target="_blank"
                  >
                    <div css={STYLES_SLATE_CARD_TEXT}>
                      <div css={STYLES_SLATE_CARD_TITLE}>Loom</div>
                      <div css={STYLES_SLATE_CARD_EXPLAINER}>
                        <div css={STYLES_SLATE_CARD_PARAGRAPH}>@tara</div>
                        <div css={STYLES_SLATE_CARD_PARAGRAPH}>-&gt;</div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
              <div css={STYLES_SLATE_CARD}>
                <div css={STYLES_SLATE_CARD_BRAND}>
                  <a
                    css={STYLES_SLATE_CARD_PARAGRAPH}
                    href="https://slate.host/slate/brand"
                    target="_blank"
                  >
                    <div css={STYLES_SLATE_CARD_TEXT}>
                      <div css={STYLES_SLATE_CARD_TITLE}>Brand</div>
                      <div css={STYLES_SLATE_CARD_EXPLAINER}>
                        <div css={STYLES_SLATE_CARD_PARAGRAPH}>@slate</div>
                        <div css={STYLES_SLATE_CARD_PARAGRAPH}>-&gt;</div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
              <div css={STYLES_SLATE_CARD}>
                <div css={STYLES_SLATE_CARD_UNDERGROUND}>
                  <a
                    css={STYLES_SLATE_CARD_PARAGRAPH}
                    href="https://slate.host/tcosta/montreal-underground"
                    target="_blank"
                  >
                    <div css={STYLES_SLATE_CARD_TEXT}>
                      <div css={STYLES_SLATE_CARD_TITLE}>
                        Montreal underground
                      </div>
                      <div css={STYLES_SLATE_CARD_EXPLAINER}>
                        <div css={STYLES_SLATE_CARD_PARAGRAPH}>@tcosta</div>
                        <div css={STYLES_SLATE_CARD_PARAGRAPH}>-&gt;</div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            <div css={STYLES_SLATE_CARD_GROUP}>
              <div css={STYLES_SLATE_CARD}>
                <div css={STYLES_SLATE_CARD_MONET}>
                  <a
                    css={STYLES_SLATE_CARD_PARAGRAPH}
                    href="https://slate.host/slate/monet"
                    target="_blank"
                  >
                    <div css={STYLES_SLATE_CARD_TEXT}>
                      <div css={STYLES_SLATE_CARD_TITLE}>Monet</div>
                      <div css={STYLES_SLATE_CARD_EXPLAINER}>
                        <div css={STYLES_SLATE_CARD_PARAGRAPH}>@slate</div>
                        <div css={STYLES_SLATE_CARD_PARAGRAPH}>-&gt;</div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
              <div css={STYLES_SLATE_CARD}>
                <div css={STYLES_SLATE_CARD_BOOK_SHELF}>
                  <a
                    css={STYLES_SLATE_CARD_PARAGRAPH}
                    href="https://slate.host/haris/book-shelf"
                    target="_blank"
                  >
                    <div css={STYLES_SLATE_CARD_TEXT}>
                      <div css={STYLES_SLATE_CARD_TITLE}>Book shelf</div>
                      <div css={STYLES_SLATE_CARD_EXPLAINER}>
                        <div css={STYLES_SLATE_CARD_PARAGRAPH}>@haris</div>
                        <div css={STYLES_SLATE_CARD_PARAGRAPH}>-&gt;</div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
              <div css={STYLES_SLATE_CARD}>
                <div css={STYLES_SLATE_CARD_PAPERS}>
                  <a
                    css={STYLES_SLATE_CARD_PARAGRAPH}
                    href="https://slate.host/slate/papers"
                    target="_blank"
                  >
                    <div css={STYLES_SLATE_CARD_TEXT}>
                      <div css={STYLES_SLATE_CARD_TITLE}>Papers</div>
                      <div css={STYLES_SLATE_CARD_EXPLAINER}>
                        <div css={STYLES_SLATE_CARD_PARAGRAPH}>@slate</div>
                        <div css={STYLES_SLATE_CARD_PARAGRAPH}>-&gt;</div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>
        <WebsitePrototypeFooter />
      </WebsitePrototypeWrapper>
    );
  }
}
