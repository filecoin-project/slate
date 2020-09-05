import * as React from "react";
import * as Constants from "~/common/constants";
import * as Actions from "~/common/actions";
import * as System from "~/components/system";
import CodeBlock from "~/components/system/CodeBlock";
import ReactDOM from "react-dom";

import { css } from "@emotion/react";

import WebsitePrototypeWrapper from "~/components/core/WebsitePrototypeWrapper";
import WebsitePrototypeHeader from "~/components/core/NewWebsitePrototypeHeader";
import WebsitePrototypeFooter from "~/components/core/NewWebsitePrototypeFooter";

const STYLES_ROOT = css`
  padding: 16px 88px;
  section {
    width: 1140px;
    margin: auto;
    padding: 15vh 0;
  }
  h1 {
    font-size: 46px;
    line-height: 100%;
  }
  button {
    background: #36383d;
    color: white;
    width: 300px;
    height: 60px;
    border-radius: 5px;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    align-items: center;
    text-align: center;
    margin: auto;
  }

  @media (max-width: ${Constants.sizes.mobile}px) {
  }
`;

const STYLES_SECTION = css`
  width: 100%;
`;
const STYLES_HERO = css`
  display: flex;
  flex-direction: row;
  align-self: center;
`;
const STYLES_TEAM = css`
  flex-wrap: wrap;
`;

const STYLES_CARD = css``;

const STYLES_CONTRIBUTOR_CARD = css`
  height: 200px;
  width: 150px;
  background-color: ${Constants.system.white};
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
const STYLES_IMAGE_CONTAINER = css`
  height: 150px;
  width: 150px;
`;

const STYLES_CARD_IMAGE = css`
  width: 100%;
  height: auto;
`;
const STYLES_CARD_TEXT = css`
  margin: auto;
  width: 100%;
  padding: 10px 5px;
  text-align: center;
  @media (max-width: ${Constants.sizes.mobile}px) {
    font-size: 0.78rem;
  }
`;
const STYLES_TEAM_GALLERY = css`
  display: grid;
  padding-top: 20px;
  column-gap: 20px;
  row-gap: 20px;
  justify-items: center;
  align-item: center;
  grid-template-columns: repeat(auto-fit, 150px);
  overflow: hidden;
`;

const STYLES_TEAM_CARD = css`
  width: 250px;
  height: 250px;
  background-color: black;
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

const STYLES_GET_INVOLVED_WRAPPER = css`
height: 100%;
  padding: 10px;
  display: flex;
  flex-wrap:wrap;
  const STYLES_GET_IN

  `;
const STYLES_GET_INVOLVED = css`
  width: 50%;
  padding-top: 100px;
  padding-right: 50px;
  @media (max-width: ${Constants.sizes.mobile}px) {
    width: 100%;
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
      "The place for all of your assets. Powered by Textile and Filecoin.";
    const url = "https://slate.host/community";

    return (
      <WebsitePrototypeWrapper
        title={title}
        description={description}
        url={url}
      >
        <WebsitePrototypeHeader />
        <div css={STYLES_ROOT}>
          <section css={STYLES_SECTION}>
            <div>
              <System.H1>
                Slate is designed and built by a growing community of hackers,
                artists, and creatives on the web.
              </System.H1>
            </div>
            <br />
            <br />
            <br />
            <System.H2>Core Team</System.H2>
            <div css={STYLES_TEAM_GALLERY}>
              <div css={STYLES_CONTRIBUTOR_CARD}>
                <div css={STYLES_IMAGE_CONTAINER}>
                  <img
                    css={STYLES_CARD_IMAGE}
                    alt="Github Profile Photo for Jason Leyser"
                    src="https://avatars3.githubusercontent.com/u/60402678?s=400&u=b7d840718b781d4266fff7fb59e688d369ec1e6b&v=4"
                  />
                </div>
                <System.P css={STYLES_CARD_TEXT}>
                  <a href="https://github.com/jasonleyser">Jason Leyser</a>
                </System.P>
              </div>
              <div css={STYLES_CONTRIBUTOR_CARD}>
                <div css={STYLES_IMAGE_CONTAINER}>
                  <img
                    css={STYLES_CARD_IMAGE}
                    alt="Github Profile Photo for Cake"
                    src="https://avatars0.githubusercontent.com/u/310223?s=400&u=62a15c1b5791b953fc5153a4b3f491f4b0bf2ae5&v=4"
                  />
                </div>
                <System.P css={STYLES_CARD_TEXT}>
                  <a href="https://github.com/jimmylee">Cake</a>
                </System.P>
              </div>
              <div css={STYLES_CONTRIBUTOR_CARD}>
                <div css={STYLES_IMAGE_CONTAINER}>
                  <img
                    css={STYLES_CARD_IMAGE}
                    alt="Github Profile Photo for Martina Long"
                    src="https://avatars2.githubusercontent.com/u/33686587?s=400&u=d1841da2872f30f7f8cb80e67cdc9b385d0f50e1&v=4"
                  />
                </div>
                <System.P css={STYLES_CARD_TEXT}>
                  <a href="https://github.com/martinalong">Martina Long</a>
                </System.P>
              </div>
              <div css={STYLES_CONTRIBUTOR_CARD}>
                <div css={STYLES_IMAGE_CONTAINER}>
                  <img
                    css={STYLES_CARD_IMAGE}
                    alt="Github Profile Photo for Haris Butt"
                    src="https://avatars2.githubusercontent.com/u/13544493?s=400&u=264f4b9241b2520ba13e4eb4d71042b05adc5f74&v=4"
                  />
                </div>
                <System.P css={STYLES_CARD_TEXT}>
                  <a href="https://github.com/harisbutt">Haris Butt</a>
                </System.P>
              </div>
              <div css={STYLES_CONTRIBUTOR_CARD}>
                <div css={STYLES_IMAGE_CONTAINER}>
                  <img
                    css={STYLES_CARD_IMAGE}
                    alt="Github Profile Photo for Tara Lin"
                    src="https://avatars2.githubusercontent.com/u/35607644?s=400&u=48483bdf251e5293fefb30ae993bfa04d06601a6&v=4"
                  />
                </div>
                <System.P css={STYLES_CARD_TEXT}>
                  <a href="https://github.com/tarafanlin">Tara Lin</a>
                </System.P>
              </div>
              <div css={STYLES_CONTRIBUTOR_CARD}>
                <div css={STYLES_IMAGE_CONTAINER}>
                  <img
                    css={STYLES_CARD_IMAGE}
                    alt="Github Profile Photo for William Felker"
                    src="https://avatars0.githubusercontent.com/u/1757261?s=400&u=b7136d82bfacac3002b3b08980ac611ca7f34b7b&v=4"
                  />
                </div>
                <System.P css={STYLES_CARD_TEXT}>
                  <a href="https://github.com/gndclouds">William Felker</a>
                </System.P>
              </div>
            </div>
            <System.H2>Contributors</System.H2>
            <div css={STYLES_TEAM_GALLERY}>
              <div css={STYLES_CONTRIBUTOR_CARD}>
                <div css={STYLES_IMAGE_CONTAINER}>
                  <img
                    css={STYLES_CARD_IMAGE}
                    alt="Github Profile Photo for Pooja Shah"
                    src="https://avatars0.githubusercontent.com/u/5668171?s=400&u=68f1223a7b241c0b8622b921805a0d9cb816a679&v=4"
                  />
                </div>
                <System.P css={STYLES_CARD_TEXT}>
                  <a href="https://github.com/pooja">Pooja Shah</a>
                </System.P>
              </div>
              <div css={STYLES_CONTRIBUTOR_CARD}>
                <div css={STYLES_IMAGE_CONTAINER}>
                  <img
                    css={STYLES_CARD_IMAGE}
                    alt="Github Profile Photo for Why"
                    src="https://avatars2.githubusercontent.com/u/1243164?s=400&u=04070140d22a204d2510a3b115943583b4e28df9&v=4"
                  />
                </div>
                <System.P css={STYLES_CARD_TEXT}>
                  <a href="https://github.com/whyrusleeping">Why</a>
                </System.P>
              </div>
              <div css={STYLES_CONTRIBUTOR_CARD}>
                <div css={STYLES_IMAGE_CONTAINER}>
                  <img
                    css={STYLES_CARD_IMAGE}
                    alt="Github Profile Photo for Aaron Sutula"
                    src="https://avatars0.githubusercontent.com/u/528969?s=400&v=4"
                  />
                </div>
                <System.P css={STYLES_CARD_TEXT}>
                  <a href="https://github.com/asutula">Aaron Sutula</a>
                </System.P>
              </div>
              <div css={STYLES_CONTRIBUTOR_CARD}>
                <div css={STYLES_IMAGE_CONTAINER}>
                  <img
                    css={STYLES_CARD_IMAGE}
                    alt="Github Profile Photo for Ignacio Hagopian"
                    src="https://avatars3.githubusercontent.com/u/6136245?s=400&u=50177a94e7b3be5fcfcede6d8f1f641c16568ebe&v=4"
                  />
                </div>
                <System.P css={STYLES_CARD_TEXT}>
                  <a href="https://github.com/jsign">Ignacio Hagopian</a>
                </System.P>
              </div>
              <div css={STYLES_CONTRIBUTOR_CARD}>
                <div css={STYLES_IMAGE_CONTAINER}>
                  <img
                    css={STYLES_CARD_IMAGE}
                    alt="Github Profile Photo for Sander Pick"
                    src="https://avatars1.githubusercontent.com/u/361000?s=400&u=d95539a31bca0d2e5be3cfc366321f17aa755ebd&v=4"
                  />
                </div>
                <System.P css={STYLES_CARD_TEXT}>
                  <a href="https://github.com/sanderpick">Sander Pick</a>
                </System.P>
              </div>
              <div css={STYLES_CONTRIBUTOR_CARD}>
                <div css={STYLES_IMAGE_CONTAINER}>
                  <img
                    css={STYLES_CARD_IMAGE}
                    alt="Github Profile Photo for Andrew Hill"
                    src="https://avatars2.githubusercontent.com/u/370259?s=400&u=76ac510ace513bd7fb04ef7011d8402a6b3a3043&v=4"
                  />
                </div>
                <System.P css={STYLES_CARD_TEXT}>
                  <a href="https://github.com/andrewxhill">Andrew Hill</a>
                </System.P>
              </div>
              <div css={STYLES_CONTRIBUTOR_CARD}>
                <div css={STYLES_IMAGE_CONTAINER}>
                  <img
                    css={STYLES_CARD_IMAGE}
                    alt="Github Profile Photo for Narative"
                    src="https://avatars0.githubusercontent.com/u/38549791?s=200&v=4"
                  />
                </div>
                <System.P css={STYLES_CARD_TEXT}>
                  <a href="https://github.com/Narative">Narative</a>
                </System.P>
              </div>
              <div css={STYLES_CONTRIBUTOR_CARD}>
                <div css={STYLES_IMAGE_CONTAINER}>
                  <img
                    css={STYLES_CARD_IMAGE}
                    src="https://avatars2.githubusercontent.com/u/7935491?s=400&u=8d91d58215c8df440eacf37d6291d912252685c3&v=4"
                  />
                </div>
                <System.P css={STYLES_CARD_TEXT}>
                  <a href="https://github.com/uonai">Colin S. Mccaleb</a>
                </System.P>
              </div>
              <div css={STYLES_CONTRIBUTOR_CARD}>
                <div css={STYLES_IMAGE_CONTAINER}>
                  <img
                    css={STYLES_CARD_IMAGE}
                    alt="Github Profile Photo for Akuoko Daniel Jnr"
                    src="https://avatars2.githubusercontent.com/u/31008944?s=400&u=340814cc84eac860654a072781661e58aadaf560&v=4"
                  />
                </div>
                <System.P css={STYLES_CARD_TEXT}>
                  <a href="https://github.com/akuokojnr">Akuoko Daniel Jnr</a>
                </System.P>
              </div>
            </div>
          </section>
          <section>
            <div>
              <System.H1>Get Involved</System.H1>
              <br />
              <System.P>
                Slate is a fully open-source file sharing network designed for
                research and collaboration.
              </System.P>
            </div>

            <div css={STYLES_GET_INVOLVED_WRAPPER}>
              <div css={STYLES_GET_INVOLVED}>
                <System.H2>Contribute</System.H2>
                <br />
                <System.P>
                  Get involved with the project and contribute
                </System.P>
                <System.P>WIP ASSET</System.P>
              </div>
              <div css={STYLES_GET_INVOLVED}>
                <System.H2>Contact</System.H2>
                <br />
                <System.P>
                  Reach out to any of the core contributors, reach us on
                  Twitter, or join our Slack.
                </System.P>
                <div>
                  <button>
                    <a>Twitter</a>
                  </button>
                  <button>
                    <a>Join Slack</a>
                  </button>
                </div>
              </div>
              <div css={STYLES_GET_INVOLVED}>
                <System.H2>Integrate</System.H2>
                <br />
                <System.P>
                  Explore our API and SDK and build on top of Slate
                </System.P>
                <br />
                <CodeBlock>npm install --save slate-react-system</CodeBlock>
              </div>
              <div css={STYLES_GET_INVOLVED}>
                <System.H2>Design System</System.H2>
                <br />
                <System.P>
                  Check out our open source design system for your projects
                </System.P>
                <br />
                <CodeBlock>npm install --save slate-react-system</CodeBlock>
              </div>
            </div>
          </section>
        </div>
        <WebsitePrototypeFooter />
      </WebsitePrototypeWrapper>
    );
  }
}
