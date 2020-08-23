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
      font-size: 2.441rem;
    }
    h2 {
      font-size: 1.25rem;
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

  h1 {
    width: 48vw;
    color: #646464;
  }
  h2 {
    width: 48vw;
    color: #646464;
  }
`;

const STYLES_SECTION_WHITE = css`
  display: flex;
  justify-content: space-between;
  padding: 88px;
  width: 100vw;
  height: 100vh;
  background: ${Constants.system.white};
`;

const STYLES_SECTION_SLATE_WALL = css`
  width: 100vw;
  height: 100vh;
  padding: 88px;
  background: ${Constants.system.white};
`;

const STYLES_SECTION_FOREGROUND = css`
  display: flex;
  justify-content: space-between;
  padding: 88px 88px;
  width: 100vw;
  height: 100vh;
  background: ${Constants.system.foreground};
  position: relative;
`;

const STYLES_SECTION_DARKGRAY = css`
  display: flex;
  justify-content: space-between;
  padding: 88px 88px;
  width: 100vw;
  height: 100vh;
  background: ${Constants.system.darkGray};
  position: relative;
`;

const STYLES_SECTION_PITCHBLACK = css`
  display: flex;
  justify-content: space-between;
  padding: 88px 88px;
  width: 100vw;
  height: 100vh;
  background: ${Constants.system.pitchBlack};
  position: relative;
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
`;

const STYLES_SLATE_CARD_EXPLAINER = css`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const STYLES_SLATE_CARD_PARAGRAPH = css`
  font-size: 12px;
  text-align: left;

  color: ${Constants.system.black};
  text-decoration: none;
  transition: 200ms ease color;
`;

const STYLES_SECTION_FRONT = css`
  padding: 88px 88px 24px 88px;
  width: 64vw;
  position: relative;
  z-index : 2;
  color: ${Constants.system.white};
}
`;

const STYLES_SECTION_BACK = css`
  width: 100vw;
  height: 100vh;
  padding: 0px;
  position: absolute;
`;

const STYLES_SECTION_MEDIA = css`
  width: 100%;
  height: 100vh;
  padding: 0px;
  margin: 0px;
`;

const STYLES_MEDIA = css`
  max-width: 100%;
  max-height: 100vh;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const STYLES_MEDIA_RIGHT = css`
  margin: 88px;
  img {
    max-width: 40vw;
    max-height: 72vh;
  }
`;

const STYLES_TEXT_LEFT = css`
  display: flex;
  flex-direction: column;
  width: 40vw;
`;

const STYLES_TEXT_BLOCK = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 40vw;
`;

const STYLES_TEXT_LEFT_WHITE = css`
  display: flex;
  flex-direction: column;
  width: 40vw;
  color: ${Constants.system.white};
`;

const fadeImages = [
  "/static/landing/image.jpg",
  "/static/landing/sound.jpg",
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

const STYLES_ACTIONS_RIGHT = css`
  padding: 48px 0;
  flex-shrink: 0;
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
`;

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
            <h1>Slate is a file storage network for you and your friends.</h1>
            <h2>
              It is the first file storage network for research and
              collaboration.
            </h2>
            <div css={STYLES_ACTIONS_RIGHT}>
              <System.ButtonPrimary onClick={() => window.open("/_")}>
                Use Slate
              </System.ButtonPrimary>
            </div>
          </section>

          <section css={STYLES_SECTION_SLATE_WALL}>
            <div css={STYLES_SLATE_CARD_GROUP}>
              <div css={STYLES_SLATE_CARD}>
                <a
                  css={STYLES_SLATE_CARD_PARAGRAPH}
                  href="https://github.com/filecoin-project/slate"
                  target="_blank"
                >
                  <div css={STYLES_SLATE_CARD_TEXT}>
                    <div css={STYLES_SLATE_CARD_TITLE}>Green</div>
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
                    <div css={STYLES_SLATE_CARD_TITLE}>Green</div>
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
                    <div css={STYLES_SLATE_CARD_TITLE}>Green</div>
                    <div css={STYLES_SLATE_CARD_EXPLAINER}>
                      <div css={STYLES_SLATE_CARD_PARAGRAPH}>@internetjim</div>
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
                    <div css={STYLES_SLATE_CARD_TITLE}>Green</div>
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
                    <div css={STYLES_SLATE_CARD_TITLE}>Green</div>
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
                    <div css={STYLES_SLATE_CARD_TITLE}>Green</div>
                    <div css={STYLES_SLATE_CARD_EXPLAINER}>
                      <div css={STYLES_SLATE_CARD_PARAGRAPH}>@internetjim</div>
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
                    <div css={STYLES_SLATE_CARD_TITLE}>Green</div>
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
                    <div css={STYLES_SLATE_CARD_TITLE}>Green</div>
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
                    <div css={STYLES_SLATE_CARD_TITLE}>Green</div>
                    <div css={STYLES_SLATE_CARD_EXPLAINER}>
                      <div css={STYLES_SLATE_CARD_PARAGRAPH}>@internetjim</div>
                      <div css={STYLES_SLATE_CARD_PARAGRAPH}>-&gt;</div>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </section>

          <section css={STYLES_SECTION_FOREGROUND}>
            <div css={STYLES_TEXT_LEFT}>
              <h1>The file storage network</h1>
              <h2>
                Slate makes it easy to store your files private and publicly.
              </h2>
            </div>
            <div css={STYLES_MEDIA_RIGHT}>
              <img src="/static/landing/file-storage-network.png" />
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
                  Easily collect any{" "}
                  <TextLoop interval={3200}>
                    <span>image</span>
                    <span>sound</span>
                    <span>code</span>
                    <span>text</span>
                    <span>URL</span>
                  </TextLoop>
                </h1>
                <h2>
                  Slate is the first decentralized storage system made for
                  everyone. You can store any form of information on Slate.
                </h2>
              </div>
            </div>
          </section>

          <section css={STYLES_SECTION_WHITE}>
            <div css={STYLES_TEXT_LEFT}>
              <h1>Capture images with Slate Chrome extension</h1>
              <h2>
                Take any image on the web and save it to Slate right from your
                browser tab
              </h2>
              <div css={STYLES_ACTIONS_RIGHT}>
                <System.ButtonPrimary onClick={() => window.open("/_")}>
                  Download chrome extension
                </System.ButtonPrimary>
              </div>
            </div>
            <div css={STYLES_MEDIA_RIGHT}>
              <img src="/static/landing/slate-views-moodboard.png" />
            </div>
          </section>

          <section css={STYLES_SECTION_FOREGROUND}>
            <div css={STYLES_TEXT_LEFT}>
              <h1>Organizing a Slate</h1>
              <h2>
                Create Slates for anything: research, inspo, projects, etc.
              </h2>
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
                  Slate is designed to help you collaborate and share your
                  projects, files, and research with anyone on the web
                </h2>
              </div>
              <div>
                <a css={STYLES_LINK_WHITE} href="https://filecoin.io">
                  View public profiles ->
                </a>
              </div>
            </div>
            <div css={STYLES_MEDIA_RIGHT}>
              <img src="/static/landing/slate-views-moodboard.png" />
            </div>
          </section>

          <section css={STYLES_SECTION_FOREGROUND}>
            <div css={STYLES_TEXT_BLOCK}>
              <div css={STYLES_TEXT_LEFT}>
                <h1>You own your data</h1>
                <h2>
                  All your files are encryped. Only accessible by you and the
                  people you choose to share.
                </h2>
              </div>
              <div>
                <a css={STYLES_LINK_BLACK} href="https://filecoin.io">
                  Learn more about Cryptography ->
                </a>
              </div>
            </div>
            <div css={STYLES_MEDIA_RIGHT}>
              <img src="/static/landing/privacy.png" />
            </div>
          </section>

          <section css={STYLES_SECTION_PITCHBLACK}>
            <div css={STYLES_TEXT_BLOCK}>
              <div css={STYLES_TEXT_LEFT_WHITE}>
                <h1>Powered by Filecoin</h1>
                <h2>
                  Slate is built on Filecoin and Textile. Completely
                  decentralized and open source.
                </h2>
              </div>
              <div>
                <a css={STYLES_LINK_WHITE} href="https://filecoin.io">
                  Learn more about Filecoin ->
                </a>
              </div>
            </div>
            <div css={STYLES_MEDIA_RIGHT}>
              <img src="/static/landing/decentralized.png" />
            </div>
          </section>

          <section css={STYLES_SECTION_FOREGROUND}>
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
                  Use slate
                </System.ButtonPrimary>
                <System.ButtonSecondary onClick={() => window.open("/_")}>
                  Try Slate Chrome Extension
                </System.ButtonSecondary>
              </div>
            </div>
            <div css={STYLES_MEDIA_RIGHT}>
              <img src="/static/landing/slate-views-moodboard.png" />
            </div>
          </section>
        </div>
        <WebsitePrototypeFooter />
      </WebsitePrototypeWrapper>
    );
  }
}
