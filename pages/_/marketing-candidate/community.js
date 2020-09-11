import React, { useState, useEffect } from "react";
import * as Constants from "~/common/constants";
import * as System from "~/components/system";

import WebsitePrototypeWrapper from "~/components/core/WebsitePrototypeWrapper";
import WebsitePrototypeHeader from "~/components/core/NewWebsitePrototypeHeader";
import WebsitePrototypeFooter from "~/components/core/NewWebsitePrototypeFooter";
import IssuesList from "~/components/core/IssuesList";
import Issue from "~/components/core/Issue";

import CodeTerminal from "~/components/core/CodeTerminal";
import CodeBlock from "~/components/system/CodeBlock";

import { css, keyframes } from "@emotion/react";

import ReactDOM from "react-dom";

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
  margin: 20px 0px;
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
  flex-flow: row wrap;
  @media (max-width: ${Constants.sizes.tablet}px) {
    align-items: left;
    4margin-top: 16px;
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
export const getServerSideProps = async context => {
  return {
    props: { ...context.query }
  };
};

export default class CommunityPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      issues: []
    };
  }
  async componentDidMount() {
    fetch(
      `https://api.github.com/repos/filecoin-project/slate/issues?labels=For+the+public`
    )
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({
          issues: data
        });
      })
      .catch(err => console.log(err));
    this.addCoreTeam();
    this.addContributorTeam();
  }

  coreTeam = [
    {
      id: 1,
      name: "Jason Leyser",
      url: "https://github.com/jasonleyser",
      handle: "jasonleyser",
      imageUrl:
        "https://avatars3.githubusercontent.com/u/60402678?s=400&u=b7d840718b781d4266fff7fb59e688d369ec1e6b&v=4"
    },
    {
      id: 2,
      name: "Cake",
      url: "https://github.com/jimmylee",
      handle: "jimmylee",
      imageUrl:
        "https://avatars3.githubusercontent.com/u/60402678?s=400&u=b7d840718b781d4266fff7fb59e688d369ec1e6b&v=4"
    },
    {
      id: 3,
      name: "Martina Long",
      url: "https://github.com/martinalong",
      handle: "martinalong",
      imageUrl:
        "https://avatars3.githubusercontent.com/u/60402678?s=400&u=b7d840718b781d4266fff7fb59e688d369ec1e6b&v=4"
    },
    {
      id: 4,
      name: "Haris Butt",
      url: "https://github.com/harisbutt",
      handle: "harisbutt",
      imageUrl:
        "https://avatars3.githubusercontent.com/u/60402678?s=400&u=b7d840718b781d4266fff7fb59e688d369ec1e6b&v=4"
    },
    {
      id: 5,
      name: "Tara Lin",
      url: "https://github.com/tarafanlin",
      handle: "tarafanlin",
      imageUrl:
        "https://avatars3.githubusercontent.com/u/60402678?s=400&u=b7d840718b781d4266fff7fb59e688d369ec1e6b&v=4"
    },
    {
      id: 6,
      name: "William Felker",
      url: "https://slate.host/gndclouds/urban-gardens",
      handle: "gndclouds",
      imageUrl:
        "https://avatars3.githubusercontent.com/u/60402678?s=400&u=b7d840718b781d4266fff7fb59e688d369ec1e6b&v=4"
    }
  ];
  contributorTeam = [
    {
      id: 1,
      name: "Pooja Shah",
      url: "https://github.com/pooja",
      handle: "pooja",
      imageUrl:
        "https://avatars3.githubusercontent.com/u/60402678?s=400&u=b7d840718b781d4266fff7fb59e688d369ec1e6b&v=4"
    },
    {
      id: 2,
      name: "Why",
      url: "https://github.com/whyrusleeping",
      handle: "whyrusleeping",
      imageUrl:
        "https://avatars3.githubusercontent.com/u/60402678?s=400&u=b7d840718b781d4266fff7fb59e688d369ec1e6b&v=4"
    },
    {
      id: 4,
      name: "Aaron Stula",
      url: "https://github.com/asutula",
      handle: "asutula",
      imageUrl:
        "https://avatars3.githubusercontent.com/u/60402678?s=400&u=b7d840718b781d4266fff7fb59e688d369ec1e6b&v=4"
    },
    {
      id: 3,
      name: "Ignacio Hagopian",
      url: "https://github.com/jsign",
      handle: "jsign",
      imageUrl:
        "https://avatars3.githubusercontent.com/u/60402678?s=400&u=b7d840718b781d4266fff7fb59e688d369ec1e6b&v=4"
    },
    {
      id: 5,
      name: "Sander Pick",
      url: "https://github.com/sanderpick",
      handle: "sanderpick",
      imageUrl:
        "https://avatars3.githubusercontent.com/u/60402678?s=400&u=b7d840718b781d4266fff7fb59e688d369ec1e6b&v=4"
    },
    {
      id: 6,
      name: "Andrew Hill",
      url: "https://github.com/andrewxhill",
      handle: "andrewxhill",
      imageUrl:
        "https://avatars3.githubusercontent.com/u/60402678?s=400&u=b7d840718b781d4266fff7fb59e688d369ec1e6b&v=4"
    },
    {
      id: 7,
      name: "Akuoko Daniel Jnr",
      url: "https://github.com/akuokojnr",
      handle: "akuokojnr",
      imageUrl:
        "https://avatars3.githubusercontent.com/u/60402678?s=400&u=b7d840718b781d4266fff7fb59e688d369ec1e6b&v=4"
    },
    {
      id: 8,
      name: "Narative",
      url: "https://github.com/narative",
      handle: "Narative",
      imageUrl:
        "https://avatars3.githubusercontent.com/u/60402678?s=400&u=b7d840718b781d4266fff7fb59e688d369ec1e6b&v=4"
    },
    {
      id: 9,
      name: "Colin S. McCaleb",
      url: "https://github.com/uonai",
      handle: "uonai",
      imageUrl:
        "https://avatars3.githubusercontent.com/u/60402678?s=400&u=b7d840718b781d4266fff7fb59e688d369ec1e6b&v=4"
    }
  ];
  addCoreTeam = () => {
    const allCoreTeam = [];
    const team = this.coreTeam;
    for (let c of team) {
      allCoreTeam.push(
        <div key={c.id} css={STYLES_CARD_WRAPPER}>
          <a href={c.url}>
            <System.HoverTile
              height={250}
              width={200}
              style={{ borderRadius: 4 }}
            >
              <div css={STYLES_SLATE_CARD_EFFECTS}>
                <img
                  css={STYLES_IMG}
                  alt={`Github Profile Photo for ${c.handle}`}
                  src={c.imageUrl}
                />
                <div css={STYLES_CARD_TEXT}>
                  <p css={STYLES_CARD_NAME}>{c.name}</p>
                  <p css={STYLES_CARD_GITHUB}>{`@${c.handle}`}</p>
                </div>
              </div>
            </System.HoverTile>
          </a>
        </div>
      );
    }
    ReactDOM.render(allCoreTeam, document.getElementById("core-team"));
  };
  addContributorTeam = () => {
    const allContributerTeam = [];
    const team = this.contributorTeam;
    for (let c of team) {
      allContributerTeam.push(
        <div key={c.id} css={STYLES_CARD_WRAPPER}>
          <a href={c.url}>
            <System.HoverTile
              height={250}
              width={200}
              style={{ borderRadius: 4 }}
            >
              <div css={STYLES_SLATE_CARD_EFFECTS}>
                <img
                  css={STYLES_IMG}
                  alt={`Github Profile Photo for ${c.handle}`}
                  src={c.imageUrl}
                />
                <div css={STYLES_CARD_TEXT}>
                  <p css={STYLES_CARD_NAME}>{c.name}</p>
                  <p css={STYLES_CARD_GITHUB}>{`@${c.handle}`}</p>
                </div>
              </div>
            </System.HoverTile>
          </a>
        </div>
      );
    }
    ReactDOM.render(
      allContributerTeam,
      document.getElementById("contributer-team")
    );
  };

  render() {
    const title = `Slate`;
    const description =
      "Slate is designed and built by a growing community of hackers, artists, and creatives on the web.";
    const url = "https://slate.host/community";
    const words = "npm install --save slate-react-system";
    const letters = words.split("");
    let count = 0;

    return (
      <WebsitePrototypeWrapper
        title={title}
        description={description}
        url={url}
      >
        <WebsitePrototypeHeader />
        <div css={STYLES_ROOT}>
          <div css={STYLES_SECTION_HERO}>
            <div css={STYLES_TEXT_BLOCK}>
              <img
                css={STYLES_HEROIMG}
                src="https://bafybeigtl3tjyozxxkabdvfdhopkep62ux4grgritlslwusgww6gdmm5da.ipfs.slate.textile.io/"
                alt="blocks evolving into different structures"
              />
              <h1 css={STYLES_H1}>Community</h1>
              <h3 css={STYLES_H3} style={{ opacity: 0.7 }}>
                Slate is designed and built by a growing community of hackers,
                artists, and creatives on the web.
              </h3>
              <br />
              <br />
              <div>
                <button
                  css={STYLES_BUTTON_PRIMARY}
                  onClick={() => window.open("https://filecoin.io/slack")}
                >
                  Join our community
                </button>
              </div>
            </div>
          </div>

          <div css={STYLES_SECTION_WRAPPER}>
            <div css={STYLES_TEXT_BLOCK}>
              <h2 css={STYLES_H2}>Core Team</h2>
            </div>
            <div id="core-team" css={STYLES_CARD_GROUP}></div>
          </div>

          <div css={STYLES_SECTION_WRAPPER}>
            <div css={STYLES_TEXT_BLOCK}>
              <h2 css={STYLES_H2}>Contributors</h2>
            </div>
            <div id="contributer-team" css={STYLES_CARD_GROUP}></div>
          </div>
          <div css={STYLES_SECTION_WRAPPER}>
            <div css={STYLES_TEXT_BLOCK}>
              <h1 css={STYLES_H1}>Get involved</h1>
              <h3 css={STYLES_H3} style={{ opacity: 0.7 }}>
                The Slate Project is the byproduct of a growing community of
                contributors from around the world. We’d love for you to join
                us, get involved in the project and contribute.
              </h3>
              <div css={STYLES_SECTION_CHILD_SPLIT}>
                <h3 css={STYLES_H3}>Contribute</h3>
                <br />

                <h3 css={STYLES_H3} style={{ opacity: 0.7 }}>
                  Find something you want to work on and file an issue. If you
                  see something you want to fix or change, submit a pull
                  request.
                </h3>
                <br />
                <br />

                <button
                  css={STYLES_BUTTON_PRIMARY}
                  onClick={() =>
                    window.open("https://github.com/filecoin-project/slate")
                  }
                >
                  Github
                </button>
              </div>
              <div css={STYLES_SECTION_CHILD_SPLIT}>
                <IssuesList issues={this.state.issues} />
              </div>
              <div css={STYLES_SECTION_CHILD_FULL}>
                <h3 css={STYLES_H3}>Contact</h3>
                <div css={STYLES_SECTION_CHILD_SPLIT}>
                  <h3 css={STYLES_H3} style={{ opacity: 0.7 }}>
                    {" "}
                    Reach out to any of the core contributors, reach us on
                    Twitter, or join our Slack.
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
                  <button
                    css={STYLES_BUTTON_PRIMARY}
                    onClick={() => window.open("https://filecoin.io/slack")}
                  >
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

                  <CodeTerminal />
                  <br />
                  <br />
                  <button
                    css={STYLES_BUTTON_PRIMARY}
                    style={{ marginRight: 24 }}
                    onClick={() =>
                      window.open("http://localhost:1337/_/system")
                    }
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
