import * as React from "react";
import * as Constants from "~/common/constants";
import * as Actions from "~/common/actions";
import * as System from "~/components/system";

import WebsitePrototypeWrapper from "~/components/core/WebsitePrototypeWrapper";
import WebsitePrototypeHeader from "~/components/core/NewWebsitePrototypeHeader";
import WebsitePrototypeFooter from "~/components/core/NewWebsitePrototypeFooter";

import TextLoop from "react-text-loop";
import { Fade } from "react-slideshow-image";
import { motion, useViewportScroll, useTransform } from "framer-motion";
import { css, keyframes } from "@emotion/react";

const STYLES_ROOT = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  h1 {
    font-size: 3.052rem;
    padding: 0px 0px 64px 0px;
    width: 100%;
  }
  h2 {
    font-size: 1.953rem;
    width: 100%;
  }
  h3 {
    font-size: 1.25rem;
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
    color: ${Constants.system.brand};
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
      padding: 0px 0px 32px 0px;
    }
    h2 {
      font-size: 1.25rem;
      padding: 0px 0px 16px 0px;
    }
    p {
      font-size: 0.78rem;
    }
  }
`;

const STYLES_SECTION_HERO = css`
  width: 100vw;
  height: 100vh;
  padding: 88px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background-image: url("/static/slate.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  transition: width 2s, height 4s;
  margin: -88px 0px 0px 0px;
  color: #646464;

  @media (max-width: ${Constants.sizes.mobile}px) {
    padding: 64px 24px;
    h1 {
      width: 80vw;
    }
    h2 {
      width: 80vw;
    }
  }
`;

const STYLES_SECTION_SLATE_WALL = css`
  width: 100vw;
  height: 120vh;
  padding: 88px;
  background: ${Constants.system.white};

  @media (max-width: ${Constants.sizes.mobile}px) {
    padding: 64px 24px;
  }
`;

const STYLES_SECTION_WHITE = css`
  display: flex;
  justify-content: space-between;
  padding: 88px;
  width: 100vw;
  height: 100vh;
  background: ${Constants.system.white};

  @media (max-width: ${Constants.sizes.mobile}px) {
    padding: 64px 24px;
    display: block;
  }
`;

const STYLES_SECTION_FOREGROUND = css`
  display: flex;
  justify-content: space-between;
  padding: 88px;
  width: 100vw;
  height: 100vh;
  background: ${Constants.system.foreground};
  position: relative;

  @media (max-width: ${Constants.sizes.mobile}px) {
    padding: 64px 24px;
    display: block;
  }
`;

const STYLES_SECTION_DARKGRAY = css`
  display: flex;
  justify-content: space-between;
  padding: 88px;
  width: 100vw;
  height: 100vh;
  background: ${Constants.system.darkGray};
  position: relative;

  @media (max-width: ${Constants.sizes.mobile}px) {
    padding: 64px 24px;
    display: block;
  }
`;

const STYLES_SECTION_PITCHBLACK = css`
  display: flex;
  justify-content: space-between;
  padding: 88px;
  width: 100vw;
  height: 100vh;
  background: ${Constants.system.pitchBlack};
  position: relative;

  @media (max-width: ${Constants.sizes.mobile}px) {
    padding: 64px 24px;
    display: block;
  }
`;

const STYLES_MEDIA_RIGHT = css`
  img {
    margin: 64px 0 0 0;
    max-width: 40vw;
    max-height: 64vh;
  }

  @media (max-width: ${Constants.sizes.mobile}px) {
    img {
      position: absolute;
      z-index: 0;
      margin: 16px 0 0 30vw;
      max-width: 56vw;
      max-height: 56vh;
    }
  }
`;

const STYLES_TEXT_LEFT = css`
  display: flex;
  flex-direction: column;
  width: 40vw;
  position: relative;
  z-index: 1;

  @media (max-width: ${Constants.sizes.mobile}px) {
    h1 {
      width: 72vw;
    }
    h2 {
      width: 72vw;
    }
  }
`;

const STYLES_TEXT_BLOCK = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 40vw;

  @media (max-width: ${Constants.sizes.mobile}px) {
    width: 80vw;
  }
`;

const STYLES_TEXT_LEFT_WHITE = css`
  display: flex;
  flex-direction: column;
  width: 40vw;
  color: ${Constants.system.white};

  @media (max-width: ${Constants.sizes.mobile}px) {
    width: 80vw;
  }
`;

const STYLES_ACTIONS_RIGHT = css`
  padding: 48px 0 16px 0;

  @media (max-width: ${Constants.sizes.mobile}px) {
    display: block;
    padding: 16px 0 8px 0;
  }
`;

const STYLES_LINK_WHITE = css`
  color: ${Constants.system.white};
  text-decoration: none;
  transition: 200ms ease color;
  font-size: 1.25rem;

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

const STYLES_LINK_BLACK = css`
  color: ${Constants.system.black};
  text-decoration: none;
  transition: 200ms ease color;
  font-size: 1.25rem;

  :visited {
    color: ${Constants.system.black};
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
  border-style: solid;
  border-width: 1px;
  margin-left: -1px;
  a {
    color: ${Constants.system.gray};
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
  width: calc(100% / 3 + 1px);
  height: calc(100vh / 4);
  border-style: solid;
  border-width: 1px;
  margin-left: -1px;
  background-color: ${Constants.system.foreground};
  a {
    color: ${Constants.system.gray};
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
  font-size: 1.25rem;
  text-align: left;
  width: 100%;
  color: ${Constants.system.black};
  text-decoration: none;
  transition: 200ms ease color;

  @media (max-width: ${Constants.sizes.mobile}px) {
    font-size: 1rem;
  }
`;

const STYLES_SLATE_CARD_EXPLAINER = css`
  display: flex;
  justify-content: space-between;
  width: 100%;

  @media (max-width: ${Constants.sizes.mobile}px) {
    font-size: 0.78rem;
  }
`;

const STYLES_SLATE_CARD_PARAGRAPH = css`
  font-size: 12px;
  text-align: left;

  color: ${Constants.system.black};
  text-decoration: none;
  transition: 200ms ease color;
`;

const STYLES_SECTION_MEDIA = css`
  width: 100vw;
  height: 100vh;
`;

const STYLES_SECTION_FRONT = css`
  padding: 88px 88px 24px 88px;
  width: 40vw;
  position: relative;
  z-index : 2;
  color: ${Constants.system.white};

  @media (max-width: ${Constants.sizes.mobile}px) {
    padding: 64px 24px;
  }
}
`;

const STYLES_SECTION_BACK = css`
  width: 100vw;
  height: 100vh;
  padding: 0px;
  position: absolute;
`;

const STYLES_MEDIA = css`
  max-width: 100%;
  max-height: 100vh;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const fadeImages = [
  "/static/landing/image.jpg",
  "/static/landing/video.jpg",
  "/static/landing/code.jpg",
  "/static/landing/text.jpg",
  "/static/landing/url.jpg",
];

const viewsImages = [
  "/static/landing/slate-views-moodboard.png",
  "/static/landing/slate-views-canvas.png",
  "/static/landing/slate-views-presentation.png",
  "/static/landing/slate-views-blog.png",
];

export const getServerSideProps = async (context) => {
  return {
    props: { ...context.query },
  };
};

export const MyComponent = () => (
  <motion.div animate={{ rotate: 360 }} transition={{ duration: 2 }} />
);
export const MyMotion = () => {
  const { scrollYProgress } = useViewportScroll();
  return <motion.div style={{ scaleX: scrollYProgress }} />;
};

export default class IndexPage extends React.Component {
  async componentDidMount() {
    const response = await Actions.health();
    console.log("HEALTH_CHECK", response);
  }

  render() {
    const title = `Slate`;
    const description =
      "The place for all of your assets. Powered by Textile and Filecoin.";
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
              <h1>
                Welcome to <br />
                the future of file sharing
              </h1>
              <h2>
                Slate is a fully open-source file sharing network designed for
                research and collaboration. Store your data, organize it any way
                you like, and share it with the world securely.
              </h2>
            </div>
          </section>

          <section css={STYLES_SECTION_MEDIA}>
            <div css={STYLES_SECTION_BACK}>
              <Fade
                arrows={false}
                duration={2400}
                transitionDuration={800}
                pauseOnHover={false}
              >
                <div className="each-fade" css={STYLES_MEDIA}>
                  <img src={fadeImages[0]} />
                </div>
                <div className="each-fade" css={STYLES_MEDIA}>
                  <img src={fadeImages[1]} />
                </div>
                <div className="each-fade" css={STYLES_MEDIA}>
                  <img src={fadeImages[2]} />
                </div>
                <div className="each-fade" css={STYLES_MEDIA}>
                  <img src={fadeImages[3]} />
                </div>
                <div className="each-fade" css={STYLES_MEDIA}>
                  <img src={fadeImages[4]} />
                </div>
              </Fade>
            </div>

            <div css={STYLES_SECTION_FRONT}>
              <div css={STYLES_TEXT_LEFT}>
                <h1>
                  A new home for your{" "}
                  <TextLoop interval={3200}>
                    <span>image</span>
                    <span>video</span>
                    <span>code</span>
                    <span>text</span>
                    <span>URL</span>
                  </TextLoop>
                </h1>
                <h2>
                  Easily upload any kind of file to your storage system and
                  organize them any way you like with Slates.
                </h2>
              </div>
            </div>
          </section>

          <section css={STYLES_SECTION_WHITE}>
            <div css={STYLES_TEXT_LEFT}>
              <h1>Upload from anywhere</h1>
              <h2>
                The Slate Chrome extension lets you seamlessly upload files to
                your Slates from anywhere on the web.
              </h2>
            </div>
            <div css={STYLES_MEDIA_RIGHT}>
              <img src="/static/landing/slate-chrome-extension.png" />
            </div>
          </section>

          <section css={STYLES_SECTION_FOREGROUND}>
            <div css={STYLES_TEXT_BLOCK}>
              <div css={STYLES_TEXT_LEFT}>
                <h1>Organize and publish</h1>
                <h2>
                  Slates are a completely modular interface for your files,
                  giving you complete flexibility.
                </h2>
              </div>
              <div>
                <a css={STYLES_LINK_BLACK} href="https://filecoin.io">
                  create moodboard
                </a>
                <br />
                <a css={STYLES_LINK_BLACK} href="https://filecoin.io">
                  organize research
                </a>
                <br />
                <a css={STYLES_LINK_BLACK} href="https://filecoin.io">
                  share presentation
                </a>
                <br />
                <a css={STYLES_LINK_BLACK} href="https://filecoin.io">
                  build a blog
                </a>
                <br />
                <br />
                <a css={STYLES_LINK_BLACK} href="https://filecoin.io">
                  @harisbutt: Lets make sure we have some really great looking
                  Slates created for each of these demos. I think each of us
                  should make one and they should linnk to them <br />
                  @tara: great idea
                </a>
              </div>
            </div>
            <div css={STYLES_MEDIA_RIGHT}>
              <img src="/static/landing/slate-views-moodboard.png" />
            </div>
          </section>

          <section css={STYLES_SECTION_DARKGRAY}>
            <div css={STYLES_TEXT_BLOCK}>
              <div css={STYLES_TEXT_LEFT_WHITE}>
                <h1>Collaborate and share</h1>
                <h2>
                  Slate is a file sharing network built on top of a storage
                  system making it possible to connect.
                </h2>
              </div>
            </div>
            <div css={STYLES_MEDIA_RIGHT}>
              <img src="/static/landing/file-storage-network.png" />
            </div>
          </section>

          <section css={STYLES_SECTION_PITCHBLACK}>
            <div css={STYLES_TEXT_BLOCK}>
              <div css={STYLES_TEXT_LEFT_WHITE}>
                <h1>Built on trust, privacy, and security</h1>
                <h2>
                  Slate is built on Filecoin and IPFS — technologies built for
                  ownership and transparency for the future of the web.
                </h2>
              </div>
              <div>
                <a css={STYLES_LINK_WHITE} href="https://filecoin.io">
                  Learn more about Filecoin -&gt;
                </a>
              </div>
            </div>
            <div css={STYLES_MEDIA_RIGHT}>
              <img src="/static/landing/decentralized.png" />
            </div>
          </section>

          {/* <section css={STYLES_SECTION_FOREGROUND}>
            <div css={STYLES_TEXT_LEFT}>
              <h1>Start your first Slate</h1>
              <h2>
                Sign up and create your very first Slate in the new, open
                network.
              </h2>
              <div css={STYLES_ACTIONS_RIGHT}>
                <System.ButtonPrimary
                  onClick={() => window.open("/_")}
                  style={{ marginRight: 24 }}
                >
                  Use Slate
                </System.ButtonPrimary>
              </div>
              <div>
                <System.ButtonSecondary onClick={() => window.open("/_")}>
                  Try Slate Chrome extension
                </System.ButtonSecondary>
              </div>
            </div>
            <div css={STYLES_MEDIA_RIGHT}>
              <img src="/static/landing/slate-views-moodboard.png" />
            </div>
          </section> */}

          <section css={STYLES_SECTION_SLATE_WALL}>
            <div css={STYLES_TEXT_LEFT}>
              <h1>Start your first Slate in the new, open network</h1>
            </div>
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
              <div css={STYLES_SLATE_CARD_GRAY}>
                <a
                  css={STYLES_SLATE_CARD_PARAGRAPH}
                  href="https://slate.host/_"
                  target="_blank"
                >
                  <div css={STYLES_SLATE_CARD_TEXT}>
                    <div css={STYLES_SLATE_CARD_TITLE}>Your Blank Slate</div>
                    <div css={STYLES_SLATE_CARD_EXPLAINER}>
                      <div css={STYLES_SLATE_CARD_PARAGRAPH}>Start Slate</div>
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
