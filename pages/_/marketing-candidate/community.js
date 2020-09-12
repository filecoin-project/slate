import * as React from "react";
import * as Constants from "~/common/constants";
import * as System from "~/components/system";

import { css } from "@emotion/react";

import WebsitePrototypeWrapper from "~/components/core/WebsitePrototypeWrapper";
import WebsitePrototypeHeader from "~/components/core/NewWebsitePrototypeHeader";
import WebsitePrototypeFooter from "~/components/core/NewWebsitePrototypeFooter";
import CodeBlock from "~/components/system/CodeBlock";

const STYLES_ROOT = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 1440px;
  margin: -88px 0 88px 0;
  background-color: ${Constants.system.foreground};
`;

const STYLES_H1 = css`
  font: ${Constants.font.semiBold};
  font-size: ${Constants.typescale.lvl7};
  line-height: 1.25;
  width: 100%;
  color: ${Constants.system.slate};
  @media (max-width: ${Constants.sizes.tablet}px) {
    font-size: ${Constants.typescale.lvl6};
    padding: 0px 0px 16px 0px;
  }
  @media (max-width: ${Constants.sizes.mobile}px) {
    font-size: ${Constants.typescale.lvl5};
    padding: 0px 0px 8px 0px;
  }
`;

const STYLES_H2 = css`
  font-size: ${Constants.typescale.lvl5};
  line-height: 1.25;
  padding: 16px 0px 0 0px;
  width: 100%;
  color: ${Constants.system.black};
  @media (max-width: ${Constants.sizes.tablet}px) {
    font-size: ${Constants.typescale.lvl4};
    padding: 8px 0px 0px 0px;
  }
  @media (max-width: ${Constants.sizes.mobile}px) {
    font-size: ${Constants.typescale.lvl3};
    padding: 8px 0px 0 0px;
    line-height: 1.5;
  }
`;

const STYLES_H3 = css`
  font-size: ${Constants.typescale.lvl3};
  line-height: 1.5;
  padding: 16px 0px 0px 0px;
  color: ${Constants.system.slate};
  @media (max-width: ${Constants.sizes.tablet}px) {
    font-size: ${Constants.typescale.lvl2};
    padding: 8px 0px 0px 0px;
  }
  @media (max-width: ${Constants.sizes.mobile}px) {
    font-size: ${Constants.typescale.lvl1};
    padding: 8px 0px 0px 0px;
  }
`;

const STYLES_SECTION_HERO = css`
  width: 100vw;
  padding: 8vh 88px 24px 88px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media (max-width: ${Constants.sizes.mobile}px) {
    padding: 16vh 24px 48px 24px;
    display: block;
  }
`;

const STYLES_TEXT_BLOCK = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 56vw;
  align-self: center;
  @media (max-width: ${Constants.sizes.mobile}px) {
    width: 88vw;
    right: 24px;
  }
`;

const STYLES_HEROIMG = css`
  width: 24vw;
  margin-left: auto;
  margin-right: auto;
  @media (max-width: ${Constants.sizes.tablet}px) {
    width: 32vw;
  }
`;

const STYLES_IMG = css`
  width: 100%;
  border-radius: 4px;
  display: block;
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

const STYLES_SECTION_WRAPPER = css`
  display: flex;
  flex-direction: column;
  padding: 88px;
  width: 100vw;
  @media (max-width: ${Constants.sizes.mobile}px) {
    padding: 88px 24px;
    display: block;
  }
`;
const STYLES_SECTION_CHILD_FULL = css`
  margin: 80px 0 0 0;
  display: flex;
  justify-content: space-between;
  @media (max-width: ${Constants.sizes.mobile}px) {
    flex-direction: column;
  }
`;
const STYLES_SECTION_CHILD_SPLIT = css`
  width: 64%;
  height: 40vh;
  @media (max-width: ${Constants.sizes.mobile}px) {
    height: 24vh;
    width: 100%;
    flex-direction: column;
  }
`;

const STYLES_CARD_GROUP = css`
  display: flex;
  margin-top: 48px;
  @media (max-width: ${Constants.sizes.tablet}px) {
    margin-top: 16px;
  }
`;

const STYLES_CARD_NAME = css`
  font-size: ${Constants.typescale.lvl1};
  text-align: left;
`;

const STYLES_CARD_GITHUB = css`
  font-size: ${Constants.typescale.lvl0};
  text-align: left;
`;

const STYLES_CARD_TEXT = css`
  padding: 8px 4px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const STYLES_CARD_WRAPPER = css`
  width: calc(100% / 10 px);
  transition: 200ms ease box-shadow;
  padding: 16px 16px 0 0;
  @media (max-width: ${Constants.sizes.tablet}px) {
    width: 50%;
  }
`;
const STYLES_SLATE_CARD_EFFECTS = css`
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  padding: 8px;
  height: 100%;
  cursor: default;
  border: 1px solid ${Constants.system.gray};
  color: ${Constants.system.slate};
  background-color: ${Constants.system.foreground};
  background-position: center;
  z-index: 2;
  :hover {
    background-image: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/13471/sparkles.gif");
    background-position: center;
    background-size: 100%;
    mix-blend-mode: luminosity;
    color: ${Constants.system.foreground};
    transition: background-image 2s ease-in-out 2s;
    opacity: 1;
    z-index: 2;
  }
  :after {
  }
`;
export const getServerSideProps = async (context) => {
  return {
    props: { ...context.query },
  };
};

export default class CommunityPage extends React.Component {
  render() {
    const title = `Slate`;
    const description =
      "Slate is designed and built by a growing community of hackers, artists, and creatives on the web.";
    const url = "https://slate.host/community";

    return (
      <WebsitePrototypeWrapper title={title} description={description} url={url}>
        <WebsitePrototypeHeader />
        <div css={STYLES_ROOT}>
          <div css={STYLES_SECTION_HERO}>
            <div css={STYLES_TEXT_BLOCK}>
              <img
                css={STYLES_HEROIMG}
                src="https://slate.textile.io/ipfs/bafybeigtl3tjyozxxkabdvfdhopkep62ux4grgritlslwusgww6gdmm5da"
                alt="blocks evolving into different structures"
              />
              <h1 css={STYLES_H1}>Community</h1>
              <h3 css={STYLES_H3} style={{ opacity: 0.7 }}>
                Slate is designed and built by a growing community of hackers, artists, and creatives on the web.
              </h3>
              <br />
              <div>
                <button css={STYLES_BUTTON_PRIMARY} onClick={() => window.open("https://filecoin.io/slack")}>
                  Join our community
                </button>
              </div>
            </div>
          </div>

          <div css={STYLES_SECTION_WRAPPER}>
            <div css={STYLES_TEXT_BLOCK}>
              <h2 css={STYLES_H2}>Core Team</h2>
            </div>
            <div css={STYLES_CARD_GROUP}>
              <div css={STYLES_CARD_WRAPPER}>
                <a href="https://github.com/jasonleyser">
                  <System.HoverTile height={300} width={200} style={{ borderRadius: 4 }}>
                    <div css={STYLES_SLATE_CARD_EFFECTS}>
                      <img
                        css={STYLES_IMG}
                        alt="Github Profile Photo for Jason Leyser"
                        src="https://avatars3.githubusercontent.com/u/60402678?s=400&u=b7d840718b781d4266fff7fb59e688d369ec1e6b&v=4"
                      />
                      <div css={STYLES_CARD_TEXT}>
                        <p css={STYLES_CARD_NAME}>Jason Leyser</p>
                        <p css={STYLES_CARD_GITHUB}>@jasonleyser</p>
                      </div>
                    </div>
                  </System.HoverTile>
                </a>
              </div>
              <div css={STYLES_CARD_WRAPPER}>
                <a href="https://github.com/jimmylee">
                  <System.HoverTile height={300} width={200} style={{ borderRadius: 4 }}>
                    <div css={STYLES_SLATE_CARD_EFFECTS}>
                      <img
                        css={STYLES_IMG}
                        alt="Github Profile Photo for Cake"
                        src="https://avatars0.githubusercontent.com/u/310223?s=400&u=62a15c1b5791b953fc5153a4b3f491f4b0bf2ae5&v=4"
                      />
                      <div css={STYLES_CARD_TEXT}>
                        <p css={STYLES_CARD_NAME}>Cake</p>
                        <p css={STYLES_CARD_GITHUB}>@jimmylee</p>
                      </div>
                    </div>
                  </System.HoverTile>
                </a>
              </div>
              <div css={STYLES_CARD_WRAPPER}>
                <a href="https://github.com/martinalong">
                  <System.HoverTile width={200} style={{ borderRadius: 4 }}>
                    <div css={STYLES_SLATE_CARD_EFFECTS}>
                      <img
                        css={STYLES_IMG}
                        alt="Github Profile Photo for Martina Long"
                        src="https://avatars2.githubusercontent.com/u/33686587?s=400&u=d1841da2872f30f7f8cb80e67cdc9b385d0f50e1&v=4"
                      />
                      <div css={STYLES_CARD_TEXT}>
                        <p css={STYLES_CARD_NAME}>Martina Long</p>
                        <p css={STYLES_CARD_GITHUB}>@martinalong</p>
                      </div>
                    </div>
                  </System.HoverTile>
                </a>
              </div>

              <div css={STYLES_CARD_WRAPPER}>
                <a href="https://github.com/harisbutt">
                  <System.HoverTile height={300} width={200} style={{ borderRadius: 4 }}>
                    <div css={STYLES_SLATE_CARD_EFFECTS}>
                      <img
                        css={STYLES_IMG}
                        alt="Github Profile Photo for Haris Butt"
                        src="https://avatars2.githubusercontent.com/u/13544493?s=400&u=264f4b9241b2520ba13e4eb4d71042b05adc5f74&v=4"
                      />
                      <div css={STYLES_CARD_TEXT}>
                        <p css={STYLES_CARD_NAME}>Haris Butt</p>
                        <p css={STYLES_CARD_GITHUB}>@harisbutt</p>
                      </div>
                    </div>
                  </System.HoverTile>
                </a>
              </div>
              <div css={STYLES_CARD_WRAPPER}>
                <a href="https://github.com/tarafanlin">
                  <System.HoverTile height={300} width={200} style={{ borderRadius: 4 }}>
                    <div css={STYLES_SLATE_CARD_EFFECTS}>
                      <img
                        css={STYLES_IMG}
                        alt="Github Profile Photo for Tara Lin"
                        src="https://avatars2.githubusercontent.com/u/35607644?s=400&u=48483bdf251e5293fefb30ae993bfa04d06601a6&v=4"
                      />
                      <div css={STYLES_CARD_TEXT}>
                        <p css={STYLES_CARD_NAME}>Tara Lin</p>
                        <p css={STYLES_CARD_GITHUB}>@tarafanlin</p>
                      </div>
                    </div>
                  </System.HoverTile>
                </a>
              </div>
              <div css={STYLES_CARD_WRAPPER}>
                <a href="https://github.com/gndclouds">
                  <System.HoverTile height={300} width={200} style={{ borderRadius: 4 }}>
                    <div css={STYLES_SLATE_CARD_EFFECTS}>
                      <img
                        css={STYLES_IMG}
                        alt="Github Profile Photo for William Felker"
                        src="https://avatars0.githubusercontent.com/u/1757261?s=400&u=b7136d82bfacac3002b3b08980ac611ca7f34b7b&v=4"
                      />
                      <div css={STYLES_CARD_TEXT}>
                        <p css={STYLES_CARD_NAME}>William Felker</p>
                        <p css={STYLES_CARD_GITHUB}>@gndclouds</p>
                      </div>
                    </div>
                  </System.HoverTile>
                </a>
              </div>
            </div>
          </div>
          <div css={STYLES_SECTION_WRAPPER}>
            <div css={STYLES_TEXT_BLOCK}>
              <h2 css={STYLES_H2}>Contributors</h2>
            </div>
            <div css={STYLES_CARD_GROUP}>
              <div css={STYLES_CARD_WRAPPER}>
                <a href="https://github.com/pooja">
                  <System.HoverTile height={300} width={200} style={{ borderRadius: 4 }}>
                    <div css={STYLES_SLATE_CARD_EFFECTS}>
                      <img
                        css={STYLES_IMG}
                        alt="Github Profile Photo for Pooja Shah"
                        src="https://slate.textile.io/ipfs/bafkreifqrmwuvlky7urkmkxyswksyjjpxvk62jwqgol35bfdfshgmcjmba"
                      />
                      <div css={STYLES_CARD_TEXT}>
                        <p css={STYLES_CARD_NAME}>Pooja Shah</p>
                        <p css={STYLES_CARD_GITHUB}>@pooja</p>
                      </div>
                    </div>
                  </System.HoverTile>
                </a>
              </div>
              <div css={STYLES_CARD_WRAPPER}>
                <a href="https://github.com/whyrusleeping">
                  <System.HoverTile height={300} width={200} style={{ borderRadius: 4 }}>
                    <div css={STYLES_SLATE_CARD_EFFECTS}>
                      <img
                        css={STYLES_IMG}
                        alt="Github Profile Photo for Why"
                        src="https://slate.textile.io/ipfs/bafkreiczwqnp5c6msa42pihhobagcbq6r5lkxuucmm3rmccb5lh46x3h7u"
                      />
                      <div css={STYLES_CARD_TEXT}>
                        <p css={STYLES_CARD_NAME}>Why</p>
                        <p css={STYLES_CARD_GITHUB}>@whyrusleeping</p>
                      </div>
                    </div>
                  </System.HoverTile>
                </a>
              </div>
              <div css={STYLES_CARD_WRAPPER}>
                <a href="https://github.com/asutula">
                  <System.HoverTile height={300} width={200} style={{ borderRadius: 4 }}>
                    <div css={STYLES_SLATE_CARD_EFFECTS}>
                      <img
                        css={STYLES_IMG}
                        alt="Github Profile Photo for Aaron Sutula"
                        src="https://slate.textile.io/ipfs/bafkreihl4pll4esqivugvam7d7j6oxbms4kz6c3azq77vf2ittwuon2dy4"
                      />
                      <div css={STYLES_CARD_TEXT}>
                        <p css={STYLES_CARD_NAME}>Aaron Sutula</p>
                        <p css={STYLES_CARD_GITHUB}>@asutula</p>
                      </div>
                    </div>
                  </System.HoverTile>
                </a>
              </div>
              <div css={STYLES_CARD_WRAPPER}>
                <a href="https://github.com/jsign">
                  <System.HoverTile height={300} width={200} style={{ borderRadius: 4 }}>
                    <div css={STYLES_SLATE_CARD_EFFECTS}>
                      <img
                        css={STYLES_IMG}
                        alt="Github Profile Photo for Ignacio Hagopian"
                        src="https://slate.textile.io/ipfs/bafkreieqpfn4bpqv3yrdr22surdngc3xyn574miybm3awjosfu6fcmbd6a"
                      />
                      <div css={STYLES_CARD_TEXT}>
                        <p css={STYLES_CARD_NAME}>Ignacio Hagopian</p>
                        <p css={STYLES_CARD_GITHUB}>@jsign</p>
                      </div>
                    </div>
                  </System.HoverTile>
                </a>
              </div>
              <div css={STYLES_CARD_WRAPPER}>
                <a href="https://github.com/sanderpick">
                  <System.HoverTile height={300} width={200} style={{ borderRadius: 4 }}>
                    <div css={STYLES_SLATE_CARD_EFFECTS}>
                      <img
                        css={STYLES_IMG}
                        alt="Github Profile Photo for Sander Pick"
                        src="https://slate.textile.io/ipfs/bafkreial7bum4chyd2rubvxkyufis4qczvb7xerrzis7eg6gyshbf7ltci"
                      />
                      <div css={STYLES_CARD_TEXT}>
                        <p css={STYLES_CARD_NAME}>Sander Pick</p>
                        <p css={STYLES_CARD_GITHUB}>@sanderpick</p>
                      </div>
                    </div>
                  </System.HoverTile>
                </a>
              </div>
              <div css={STYLES_CARD_WRAPPER}>
                <a href="https://github.com/andrewxhill">
                  <System.HoverTile height={300} width={200} style={{ borderRadius: 4 }}>
                    <div css={STYLES_SLATE_CARD_EFFECTS}>
                      <img
                        css={STYLES_IMG}
                        alt="Github Profile Photo for Andrew Hill"
                        src="https://slate.textile.io/ipfs/bafkreighz4m7bqjmt7cidgbbocbzp65f4liuzebwq6d64t27slhpe2cigm"
                      />
                      <div css={STYLES_CARD_TEXT}>
                        <p css={STYLES_CARD_NAME}>Andrew Hill</p>
                        <p css={STYLES_CARD_GITHUB}>@andrewxhill</p>
                      </div>
                    </div>
                  </System.HoverTile>
                </a>
              </div>
            </div>
            <div css={STYLES_CARD_GROUP}>
              <div css={STYLES_CARD_WRAPPER}>
                <a href="https://github.com/akuokojnr">
                  <System.HoverTile height={300} width={200} style={{ borderRadius: 4 }}>
                    <div css={STYLES_SLATE_CARD_EFFECTS}>
                      <img
                        css={STYLES_IMG}
                        alt="Github Profile Photo for Akuoko Daniel Jnr"
                        src="https://slate.textile.io/ipfs/bafkreibpqkmnm6vijyxlkbcjyayoo7b6tnf4tzelzsi4wk3z6o7enhpbrm"
                      />
                      <div css={STYLES_CARD_TEXT}>
                        <p css={STYLES_CARD_NAME}>Akuoko Daniel Jnr</p>
                        <p css={STYLES_CARD_GITHUB}>@akuokojnr</p>
                      </div>
                    </div>
                  </System.HoverTile>
                </a>
              </div>

              <div css={STYLES_CARD_WRAPPER}>
                <a href="https://github.com/narative">
                  <System.HoverTile height={300} width={200} style={{ borderRadius: 4 }}>
                    <div css={STYLES_SLATE_CARD_EFFECTS}>
                      <img
                        css={STYLES_IMG}
                        alt="Github Profile Photo for Narative"
                        src="https://slate.textile.io/ipfs/bafkreihgmyxi2rzp4gtkoxwkrajiwivrbttixfjrdfb6qz5fhpdaofrhoi"
                      />
                      <div css={STYLES_CARD_TEXT}>
                        <p css={STYLES_CARD_NAME}>Narative</p>
                        <p css={STYLES_CARD_GITHUB}>@narative</p>
                      </div>
                    </div>
                  </System.HoverTile>
                </a>
              </div>
              <div css={STYLES_CARD_WRAPPER}>
                <a href="https://github.com/narative">
                  <System.HoverTile height={300} width={200} style={{ borderRadius: 4 }}>
                    <div css={STYLES_SLATE_CARD_EFFECTS}>
                      <img
                        css={STYLES_IMG}
                        alt="Github Profile Photo for Colin S. Mccaleb"
                        src="https://slate.textile.io/ipfs/bafkreigxhplpm7adi3p77eljj3g66lcnnzig7m6ihpervxwqeti3tbqudi"
                      />
                      <div css={STYLES_CARD_TEXT}>
                        <p css={STYLES_CARD_NAME}>Colin S. McCaleb</p>
                        <p css={STYLES_CARD_GITHUB}>@uonai</p>
                      </div>
                    </div>
                  </System.HoverTile>
                </a>
              </div>
            </div>
          </div>
          <div css={STYLES_SECTION_WRAPPER}>
            <div css={STYLES_TEXT_BLOCK}>
              <h1 css={STYLES_H1}>Get involved</h1>
              <h3 css={STYLES_H3} style={{ opacity: 0.7 }}>
                The Slate Project is the byproduct of a growing community of contributors from around the world. We’d
                love for you to join us, get involved in the project and contribute.
              </h3>
              <div css={STYLES_SECTION_CHILD_FULL}>
                <h3 css={STYLES_H3}>Contribute</h3>
                <div css={STYLES_SECTION_CHILD_SPLIT}>
                  <h3 css={STYLES_H3} style={{ opacity: 0.7 }}>
                    Find something you want to work on and file an issue. If you see something you want to fix or
                    change, submit a pull request.
                  </h3>
                  <br />
                  <br />
                  <button
                    css={STYLES_BUTTON_PRIMARY}
                    onClick={() => window.open("https://github.com/filecoin-project/slate")}
                  >
                    Github
                  </button>
                </div>
              </div>
              <div css={STYLES_SECTION_CHILD_FULL}>
                <h3 css={STYLES_H3}>Contact</h3>
                <div css={STYLES_SECTION_CHILD_SPLIT}>
                  <h3 css={STYLES_H3} style={{ opacity: 0.7 }}>
                    {" "}
                    Reach out to any of the core contributors, reach us on Twitter, or join our Slack.
                  </h3>
                  <br />
                  <br />
                  <button
                    css={STYLES_BUTTON_PRIMARY}
                    style={{ marginRight: 24 }}
                    onClick={() => window.open("https://twitter.com/_slate")}
                  >
                    Twitter
                  </button>
                  <button css={STYLES_BUTTON_PRIMARY} onClick={() => window.open("https://filecoin.io/slack")}>
                    Slack
                  </button>
                </div>
              </div>
              <div css={STYLES_SECTION_CHILD_FULL}>
                <h3 css={STYLES_H3}>Integrate</h3>
                <div css={STYLES_SECTION_CHILD_SPLIT}>
                  <h3 css={STYLES_H3} style={{ opacity: 0.7 }}>
                    Explore our API and SDK and build on top of Slate.
                  </h3>
                  <br />
                  <br />
                  <CodeBlock>npm install --save slate-react-system</CodeBlock>
                </div>
              </div>
              <div css={STYLES_SECTION_CHILD_FULL}>
                <h3 css={STYLES_H3}>Design System</h3>
                <div css={STYLES_SECTION_CHILD_SPLIT}>
                  <h3 css={STYLES_H3} style={{ opacity: 0.7 }}>
                    Check out our open source design system for your projects.
                  </h3>
                  <br />
                  <br />
                  <CodeBlock>npm install --save slate-react-system</CodeBlock>
                  <br />
                  <br />
                  <button
                    css={STYLES_BUTTON_PRIMARY}
                    style={{ marginRight: 24 }}
                    onClick={() => window.open("http://localhost:1337/_/system")}
                  >
                    Design system
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <WebsitePrototypeFooter />
      </WebsitePrototypeWrapper>
    );
  }
}
