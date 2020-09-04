import * as React from "react";
import * as Constants from "~/common/constants";
import * as Actions from "~/common/actions";

import WebsitePrototypeWrapper from "~/components/core/WebsitePrototypeWrapper";
import WebsitePrototypeHeader from "~/components/core/NewWebsitePrototypeHeader";
import WebsitePrototypeFooter from "~/components/core/NewWebsitePrototypeFooter";

import TextLoop from "react-text-loop";
// import { motion, useViewportScroll, useTransform } from "framer-motion";
import { css, keyframes } from "@emotion/react";

const STYLES_ROOT = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  h1 {
    font-size: 3.815rem;
    line-height: 1.25;
    padding: 0px 0px 32px 0px;
    width: 100%;
    color: ${Constants.system.darkGray};
  }
  h2 {
    font-size: 2.441em;
    line-height: 1.25;
    padding: 0px 0px 32px 0px;
    width: 100%;
    color: ${Constants.system.darkGray};
  }
  h3 {
    font-size: 1.563em;
    line-height: 1.5;
    padding: 0px 0px 16px 0px;
    color: ${Constants.system.darkGray};
  }
  p {
    font-size: 1rem;
    color: ${Constants.system.black};
  }

  a:link {
    color: ${Constants.system.darkGray};
    background-color: transparent;
    text-decoration: none;
  }

  a:hover {
    color: ${Constants.system.pitchBlack};
    background-color: transparent;
    text-decoration: none;
  }

  a:active {
    color: yellow;
    background-color: transparent;
    text-decoration: none;
  }

  @media (max-width: ${Constants.sizes.mobile}px) {
    h1 {
      font-size: 1.953rem;
      padding: 0px 0px 16px 0px;
      line-height: 1.25;
    }
    h2 {
      font-size: 1.25rem;
      padding: 0px 0px 8px 0px;
      line-height: 1.5;
    }
    h3 {
      font-size: 1rem;
      padding: 0px 0px 8px 0px;
      line-height: 1.5;
      color: ${Constants.system.moonstone};
    }
    p {
      font-size: 0.78rem;
    }
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

const STYLES_SECTION_PITCHBLACK = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 88px;
  width: 100vw;
  background: ${Constants.system.pitchBlack};

  @media (max-width: ${Constants.sizes.mobile}px) {
    padding: 64px 24px;
    display: block;
  }
`;

const STYLES_IMAGE = css`
  img {
    margin: 32px auto;
    border-radius: 8px;
    width: 100%;
    height: auto;
    box-shadow: 0px 10px 50px 20px rgba(0, 0, 0, 0.1);
  }
  video {
    margin: 32px auto 88px auto;
    border-radius: 8px;
    width: 100%;
    height: auto;
    box-shadow: 0px 10px 50px 20px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: ${Constants.sizes.mobile}px) {
    img {
      margin: 24px auto 32px auto;
      border-radius: 4px;
      width: 100%;
      height: auto;
      box-shadow: 0px 10px 50px 20px rgba(0, 0, 0, 0.1);
    }
    video {
      margin: 24px auto 64px auto;
      border-radius: 4px;
      width: 100%;
      height: auto;
      box-shadow: 0px 10px 50px 20px rgba(0, 0, 0, 0.1);
    }
  }
`;

const STYLES_IMAGE_SMALL = css`
  img {
    margin: 32px auto;
    width: 32vw;
    height: auto;
    display: block;
  }
  @media (max-width: ${Constants.sizes.mobile}px) {
    img {
      margin: 24px auto;
      border-radius: 4px;
      width: 70%;
      height: auto;
    }
  }
`;

const STYLES_MEDIA_LEFT = css`
  img {
    margin: 64px 0 0 -240px;
    width: 80vw;
    border-radius: 4px;
    box-shadow: 0px 10px 50px 20px rgba(0, 0, 0, 0.2);
  }
  video {
    margin: 64px 0 0 -240px;
    border-radius: 4px;
    width: 80vw;
    box-shadow: 0px 10px 50px 20px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: ${Constants.sizes.mobile}px) {
    img {
      margin: 24px 0 0 -80px;
      width: 80vw;
      border-radius: 4px;
      box-shadow: 0px 10px 50px 20px rgba(0, 0, 0, 0.2);
    }
  }
`;

const STYLES_MEDIA_LEFT_OVERLAP = css`
  img {
    margin: -320px 0 0 -48px;
    width: 60vw;
  }

  @media (max-width: ${Constants.sizes.mobile}px) {
    img {
      margin: 24px 0 0 -80px;
      width: 100vw;
    }
  }
`;

const STYLES_MEDIA_RIGHT_OVERLAP = css`
  img {
    float: right;
    margin-right: 240px;
    margin-top: -80px;
    width: 24vw;
  }

  @media (max-width: ${Constants.sizes.mobile}px) {
    img {
      margin: 24px 0 0 80px;
      width: 50vw;
    }
  }
`;

const STYLES_TEXT_BLOCK = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 56vw;
  align-self: center;
  z-index: 10;

  @media (max-width: ${Constants.sizes.mobile}px) {
    width: 88%;
    right: 24px;
    z-index: 10;
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
  min-height: 40px;
  padding: 6px 24px 6px 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  letter-spacing: 0.2px;
  font-family: ${Constants.font.semiBold};
  transition: 200ms ease all;
  user-select: none;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
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
  margin: 16px 0;

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
  }

  a:hover {
    color: ${Constants.system.pitchBlack};
    font-color: ${Constants.system.pitchBlack};
    background-color: transparent;
    text-decoration: none;
  }

  a:active {
    color: ${Constants.system.pitchBlack};
    background-color: transparent;
    text-decoration: none;
  }
`;

const STYLES_SLATE_CARD_GRAY = css`
  width: 100%;
  height: calc(100vh / 2);
  margin-left: -1px;
  box-shadow: 0px 4px 80px 4px rgba(0, 0, 0, 0.1);
  text-decoration: none;
  transition: 200ms ease box-shadow;
  a {
    color: ${Constants.system.pitchBlack};
  }

  a:hover {
    color: ${Constants.system.pitchBlack};
    font-color: ${Constants.system.pitchBlack};
    background-color: transparent;
    text-decoration: none;
  }

  :hover {
    transition: 200ms ease box-shadow;
    box-shadow: 0px 10px 120px 20px rgba(0, 0, 0, 0.3);
    color: ${Constants.system.pitchBlack};

    background-color: transparent;
    text-decoration: none;
  }

  a:active {
    color: ${Constants.system.pitchBlack};
    background-color: transparent;
    text-decoration: none;
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
  font-weight: 700;
  text-align: left;
  width: 100%;
  padding: 12px;
  color: ${Constants.system.moonstone};
  @media (max-width: ${Constants.sizes.mobile}px) {
    padding: 0px;
    font-size: 1.953rem;
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

export const getServerSideProps = async (context) => {
  return {
    props: { ...context.query },
  };
};

// export const MyComponent = () => <motion.div animate={{ rotate: 360 }} transition={{ duration: 2 }} />;
// export const MyMotion = () => {
//   const { scrollYProgress } = useViewportScroll();
//   return <motion.div style={{ scaleX: scrollYProgress }} />;
// };

export default class IndexPage extends React.Component {
  async componentDidMount() {
    const response = await Actions.health();
    console.log("HEALTH_CHECK", response);
  }

  render() {
    const title = `Slate`;
    const description =
      "Welcome to the future of file sharing. Powered by Textile, Filecoin, IPFS.";
    const url = "https://slate.host";
    const image =
      "https://bafybeifedze7dm4zesvgekukziw23gbtfodxiz63nxgybbyo2koxeybmla.ipfs.slate.textile.io/";
    return (
      <WebsitePrototypeWrapper
        title={title}
        description={description}
        url={url}
        image={image}
      >
        <WebsitePrototypeHeader />
        <div css={STYLES_ROOT}>
          <section css={STYLES_SECTION_HERO}>
            <div css={STYLES_TEXT_BLOCK}>
              <h1>
                A file storage network
                <br />
                <span css={STYLES_HIGHLIGHT}>
                  for you, your files, <br />
                  and your friends
                </span>
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

            <div css={STYLES_IMAGE}>
              <video
                Autoplay="autoplay"
                Loop="loop"
                src="/static/landing/marketing-hero.mov"
                type="video/mov"
              />
            </div>
            <div css={STYLES_TEXT_BLOCK}>
              <h2>
                Slate{" "}
                <span css={STYLES_HIGHLIGHT}>
                  is a fully open-source file sharing network designed for
                  research and collaboration.
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
              <h3>Powered by</h3>
              <h2>
                <span css={STYLES_HIGHLIGHT}>
                  Textile <br />
                  Filecoin <br />
                  IPFS
                </span>
              </h2>
            </div>
          </section>
          <section css={STYLES_SECTION_SLATE}>
            <div css={STYLES_TEXT_BLOCK}>
              <h1>
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
              <h3>
                <span css={STYLES_HIGHLIGHT}>Easily upload </span>any kind of
                file to your storage system. <br />
                <span css={STYLES_HIGHLIGHT}>Organize</span> them any way you
                like with slates.
              </h3>
            </div>
            <div css={STYLES_IMAGE}>
              <img src="/static/landing/marketing-image.png" />
            </div>
          </section>

          <section css={STYLES_SECTION_SLATE}>
            <div css={STYLES_TEXT_BLOCK}>
              <h1>
                Upload from <br />
                <span css={STYLES_HIGHLIGHT}>anywhere</span>
              </h1>
              <h3>
                <span css={STYLES_HIGHLIGHT}>The Slate Chrome extension</span>{" "}
                lets you seamlessly upload files to your slates from anywhere on
                the web.
              </h3>
            </div>
            <div css={STYLES_MEDIA_LEFT}>
              <img src="https://bafybeiefyhindtituzzcncmdihxag6ypfqofpljqpp52ulcg5mjrepk6va.ipfs.slate.textile.io/" />
            </div>
          </section>

          <section css={STYLES_SECTION_SLATE}>
            <div css={STYLES_TEXT_BLOCK}>
              <h1>
                <span css={STYLES_HIGHLIGHT}>Organize and publish</span>
              </h1>
              <h3>
                <span css={STYLES_HIGHLIGHT}>A modular interface</span> for your
                files, giving you complete flexibility.
              </h3>
            </div>
            <br />
            <br />
            <br />

            <div css={STYLES_TEXT_BLOCK}>
              <h2>
                <span css={STYLES_HIGHLIGHT}>Create moodboards</span>
              </h2>
            </div>
            <div css={STYLES_IMAGE}>
              <img src="/static/landing/marketing-moodboard.png" />
            </div>
            <br />
            <br />
            <br />

            <div css={STYLES_TEXT_BLOCK}>
              <h2>
                <span css={STYLES_HIGHLIGHT}>Organize research</span>
              </h2>
            </div>
            <div css={STYLES_IMAGE}>
              <video
                Autoplay="autoplay"
                Loop="loop"
                src="/static/landing/marketing-research.mov"
                type="video/mov"
              />
            </div>
            <br />
            <br />
            <br />

            <div css={STYLES_TEXT_BLOCK}>
              <h2>
                <span css={STYLES_HIGHLIGHT}>Share presentations</span>
              </h2>
            </div>
            <div css={STYLES_IMAGE}>
              <img src="/static/landing/marketing-presentation.png" />
            </div>
          </section>

          <section css={STYLES_SECTION_SLATE}>
            <div css={STYLES_TEXT_BLOCK}>
              <h1>
                <span css={STYLES_HIGHLIGHT}>Collaborate and share</span>
              </h1>
              <h3>
                <span css={STYLES_HIGHLIGHT}>A file sharing network</span> built
                on top of a storage system making it possible to connect with
                other people on the Filecoin network.
              </h3>
            </div>

            <div css={STYLES_MEDIA_LEFT_OVERLAP}>
              <img src="https://bafybeifo7djff5cyfdedhnbnw6bdtdmkswlwtizyzrfri4v3sebuavrqu4.ipfs.slate.textile.io/" />
            </div>
          </section>

          <section css={STYLES_SECTION_SLATE}>
            <div css={STYLES_TEXT_BLOCK}>
              <h1>
                Built on <br />
                <span css={STYLES_HIGHLIGHT}>trust, privacy, and security</span>
              </h1>
              <h3>
                <span css={STYLES_HIGHLIGHT}>
                  Slate is built on Filecoin and IPFS
                </span>{" "}
                — technologies built around ownership and transparency for the
                future of the web.
              </h3>
              <div>
                <a css={STYLES_LINK_WHITE} href="https://filecoin.io">
                  Learn more about Filecoin -&gt;
                </a>
              </div>
            </div>

            <div css={STYLES_MEDIA_RIGHT_OVERLAP}>
              <img src="/static/landing/marketing-slate-cube.png" />
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
                  <div css={STYLES_SLATE_CARD_CTA_TITLE}>
                    Join us <br />
                    <span css={STYLES_HIGHLIGHT_BLACK}>
                      in the open, secure network
                    </span>
                  </div>
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
                <a
                  css={STYLES_SLATE_CARD_PARAGRAPH}
                  href="https://github.com/filecoin-project/slate"
                  target="_blank"
                >
                  <div css={STYLES_SLATE_CARD_TEXT}>
                    <div css={STYLES_SLATE_CARD_TITLE}>
                      Dogs of Marcus Aurelius
                    </div>
                    <div css={STYLES_SLATE_CARD_EXPLAINER}>
                      <div css={STYLES_SLATE_CARD_PARAGRAPH}>@internetjim</div>
                      <div css={STYLES_SLATE_CARD_PARAGRAPH}>-&gt;</div>
                    </div>
                  </div>
                </a>
              </div>
              <div css={STYLES_SLATE_CARD}>
                <a
                  css={STYLES_SLATE_CARD_PARAGRAPH}
                  href="https://github.com/filecoin-project/slate"
                  target="_blank"
                >
                  <div css={STYLES_SLATE_CARD_TEXT}>
                    <div css={STYLES_SLATE_CARD_TITLE}>Globe</div>
                    <div css={STYLES_SLATE_CARD_EXPLAINER}>
                      <div css={STYLES_SLATE_CARD_PARAGRAPH}>@martinalong</div>
                      <div css={STYLES_SLATE_CARD_PARAGRAPH}>-&gt;</div>
                    </div>
                  </div>
                </a>
              </div>
              <div css={STYLES_SLATE_CARD}>
                <a
                  css={STYLES_SLATE_CARD_PARAGRAPH}
                  href="https://github.com/filecoin-project/slate"
                  target="_blank"
                >
                  <div css={STYLES_SLATE_CARD_TEXT}>
                    <div css={STYLES_SLATE_CARD_TITLE}>Digital Renaissance</div>
                    <div css={STYLES_SLATE_CARD_EXPLAINER}>
                      <div css={STYLES_SLATE_CARD_PARAGRAPH}>@harisbutt</div>
                      <div css={STYLES_SLATE_CARD_PARAGRAPH}>-&gt;</div>
                    </div>
                  </div>
                </a>
              </div>
            </div>
            <div css={STYLES_SLATE_CARD_GROUP}>
              <div css={STYLES_SLATE_CARD}>
                <a
                  css={STYLES_SLATE_CARD_PARAGRAPH}
                  href="https://github.com/filecoin-project/slate"
                  target="_blank"
                >
                  <div css={STYLES_SLATE_CARD_TEXT}>
                    <div css={STYLES_SLATE_CARD_TITLE}>42</div>
                    <div css={STYLES_SLATE_CARD_EXPLAINER}>
                      <div css={STYLES_SLATE_CARD_PARAGRAPH}>@tara</div>
                      <div css={STYLES_SLATE_CARD_PARAGRAPH}>-&gt;</div>
                    </div>
                  </div>
                </a>
              </div>
              <div css={STYLES_SLATE_CARD}>
                <a
                  css={STYLES_SLATE_CARD_PARAGRAPH}
                  href="https://github.com/filecoin-project/slate"
                  target="_blank"
                >
                  <div css={STYLES_SLATE_CARD_TEXT}>
                    <div css={STYLES_SLATE_CARD_TITLE}>Slate</div>
                    <div css={STYLES_SLATE_CARD_EXPLAINER}>
                      <div css={STYLES_SLATE_CARD_PARAGRAPH}>@slate</div>
                      <div css={STYLES_SLATE_CARD_PARAGRAPH}>-&gt;</div>
                    </div>
                  </div>
                </a>
              </div>
              <div css={STYLES_SLATE_CARD}>
                <a
                  css={STYLES_SLATE_CARD_PARAGRAPH}
                  href="https://github.com/filecoin-project/slate"
                  target="_blank"
                >
                  <div css={STYLES_SLATE_CARD_TEXT}>
                    <div css={STYLES_SLATE_CARD_TITLE}>Clouds</div>
                    <div css={STYLES_SLATE_CARD_EXPLAINER}>
                      <div css={STYLES_SLATE_CARD_PARAGRAPH}>@gndcloud</div>
                      <div css={STYLES_SLATE_CARD_PARAGRAPH}>-&gt;</div>
                    </div>
                  </div>
                </a>
              </div>
            </div>
            <div css={STYLES_SLATE_CARD_GROUP}>
              <div css={STYLES_SLATE_CARD}>
                <a
                  css={STYLES_SLATE_CARD_PARAGRAPH}
                  href="https://github.com/filecoin-project/slate"
                  target="_blank"
                >
                  <div css={STYLES_SLATE_CARD_TEXT}>
                    <div css={STYLES_SLATE_CARD_TITLE}>Honeycomb</div>
                    <div css={STYLES_SLATE_CARD_EXPLAINER}>
                      <div css={STYLES_SLATE_CARD_PARAGRAPH}>@Thiago</div>
                      <div css={STYLES_SLATE_CARD_PARAGRAPH}>-&gt;</div>
                    </div>
                  </div>
                </a>
              </div>
              <div css={STYLES_SLATE_CARD}>
                <a
                  css={STYLES_SLATE_CARD_PARAGRAPH}
                  href="https://github.com/filecoin-project/slate"
                  target="_blank"
                >
                  <div css={STYLES_SLATE_CARD_TEXT}>
                    <div css={STYLES_SLATE_CARD_TITLE}>Extension</div>
                    <div css={STYLES_SLATE_CARD_EXPLAINER}>
                      <div css={STYLES_SLATE_CARD_PARAGRAPH}>@jason</div>
                      <div css={STYLES_SLATE_CARD_PARAGRAPH}>-&gt;</div>
                    </div>
                  </div>
                </a>
              </div>
              <div css={STYLES_SLATE_CARD}>
                <a
                  css={STYLES_SLATE_CARD_PARAGRAPH}
                  href="https://github.com/filecoin-project/slate"
                  target="_blank"
                >
                  <div css={STYLES_SLATE_CARD_TEXT}>
                    <div css={STYLES_SLATE_CARD_TITLE}>More</div>
                    <div css={STYLES_SLATE_CARD_EXPLAINER}>
                      <div css={STYLES_SLATE_CARD_PARAGRAPH}>
                        Explore Slates
                      </div>
                      <div css={STYLES_SLATE_CARD_PARAGRAPH}>-&gt;</div>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </section>
        </div>
        <WebsitePrototypeFooter />
      </WebsitePrototypeWrapper>
    );
  }
}
