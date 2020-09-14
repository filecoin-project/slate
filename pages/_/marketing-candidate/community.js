import * as React from "react";
import * as Constants from "~/common/constants";
import * as System from "~/components/system";

import WebsitePrototypeWrapper from "~/components/core/WebsitePrototypeWrapper";
import WebsitePrototypeHeader from "~/components/core/NewWebsitePrototypeHeader";
import WebsitePrototypeFooter from "~/components/core/NewWebsitePrototypeFooter";
import IssuesList from "~/components/core/marketing/IssuesList";
import CodeBlock from "~/components/system/CodeBlock";

import { css, keyframes } from "@emotion/react";
import { SceneUtils } from "three";

const STYLES_ROOT = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 1440px;
  margin: -88px 0 88px 0;
  background-color: ${Constants.system.foreground};
`;

const STYLES_H1 = css`
  font-size: ${Constants.typescale.lvl5};
  font-family: ${Constants.font.medium};
  font-weight: 400;
  line-height: 1.3;
  padding: 0px 0px 16px 0px;
  letter-spacing: -0.021rem;
  width: 100%;
  color: ${Constants.system.slate};

  @media (max-width: ${Constants.sizes.mobile}px) {
    font-size: ${Constants.typescale.lvl3};
  }
`;

const STYLES_H2 = css`
  font-size: ${Constants.typescale.lvl3};
  font-family: ${Constants.font.medium};
  font-weight: 400;
  line-height: 1.3;
  letter-spacing: -0.019rem;
  padding: 0 0 16px 0;
  width: 100%;
  color: ${Constants.system.slate};

  @media (max-width: ${Constants.sizes.mobile}px) {
    font-size: ${Constants.typescale.lvl2};
  }
`;

const STYLES_H3 = css`
  font-size: ${Constants.typescale.lvl2};
  font-family: ${Constants.font.text};
  font-weight: 400;
  line-height: 1.5;
  letter-spacing: -0.014rem;
  padding: 0 0 8px 0;
  color: ${Constants.system.slate};
  opacity: 0.7;

  @media (max-width: ${Constants.sizes.mobile}px) {
    font-size: ${Constants.typescale.lvl1};
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

const STYLES_BLOCK = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 56vw;
  width: 100%;
  align-self: center;
  margin-bottom: 16px;

  @media (max-width: ${Constants.sizes.mobile}px) {
    width: 100%;
    max-width: 100vw;
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
  margin: 24px 0 16px 0;
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

const STYLES_SECTION_WRAPPER = css`
  width: 100vw;
  padding: 32px 88px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: ${Constants.system.foreground};

  @media (max-width: ${Constants.sizes.mobile}px) {
    padding: 64px 24px;
    display: block;
  }
`;

const STYLES_CARD_GROUP = css`
  display: flex;
  flex-wrap: wrap;
  align-items: left;
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
const SLATE_CORE_TEAM = [
  {
    id: 1,
    name: "Jason Leyser",
    url: "https://github.com/jasonleyser",
    username: "jasonleyser",
    imageUrl: "https://avatars3.githubusercontent.com/u/60402678?s=400&u=b7d840718b781d4266fff7fb59e688d369ec1e6b&v=4",
  },
  {
    id: 2,
    name: "Cake",
    url: "https://github.com/jimmylee",
    username: "jimmylee",
    imageUrl: "https://avatars0.githubusercontent.com/u/310223?s=400&u=62a15c1b5791b953fc5153a4b3f491f4b0bf2ae5&v=4",
  },
  {
    id: 3,
    name: "Martina Long",
    url: "https://github.com/martinalong",
    username: "martinalong",
    imageUrl: "https://avatars2.githubusercontent.com/u/33686587?s=400&u=d1841da2872f30f7f8cb80e67cdc9b385d0f50e1&v=4",
  },
  {
    id: 4,
    name: "Haris Butt",
    url: "https://github.com/harisbutt",
    username: "harisbutt",
    imageUrl: "https://avatars2.githubusercontent.com/u/13544493?s=400&u=264f4b9241b2520ba13e4eb4d71042b05adc5f74&v=4",
  },
  {
    id: 5,
    name: "Tara Lin",
    url: "https://github.com/tarafanlin",
    username: "tarafanlin",
    imageUrl: "https://avatars2.githubusercontent.com/u/35607644?s=400&u=48483bdf251e5293fefb30ae993bfa04d06601a6&v=4",
  },
  {
    id: 6,
    name: "William Felker",
    url: "https://slate.host/gndclouds/urban-gardens",
    username: "gndclouds",
    imageUrl: "https://bafkreih2b33oaftlflmsg6njtu7i54f2nwws5gfhhf5w4qaezcejs6gjte.ipfs.slate.textile.io/",
  },
];
const SLATE_CONTRIBUTOR_TEAM = [
  {
    id: 1,
    name: "Pooja Shah",
    url: "https://github.com/pooja",
    username: "pooja",
    imageUrl: "https://slate.textile.io/ipfs/bafkreier4xffhrpconlprzxvzslqsovykqet7xj6zhhptxgu4nm2qw5i3u",
  },
  {
    id: 2,
    name: "Why",
    url: "https://github.com/whyrusleeping",
    username: "whyrusleeping",
    imageUrl: "https://slate.textile.io/ipfs/bafkreigvs53l22cuswtc4dtgndmc3aqns2unpc5xndnzx5gjdbw4yv6qhm",
  },
  {
    id: 4,
    name: "Aaron Stula",
    url: "https://github.com/asutula",
    username: "asutula",
    imageUrl: "https://slate.textile.io/ipfs/bafkreig3vnxyqqsxnrs24zpbbuc6jh5wvdsa7w6fx5gvi4j3t7rhoelhlm",
  },
  {
    id: 3,
    name: "Ignacio Hagopian",
    url: "https://github.com/jsign",
    username: "jsign",
    imageUrl: "https://slate.textile.io/ipfs/bafkreicktewpelagb3uvgd6psacr4kra66ii7254ghqflklek7taahni2m",
  },
  {
    id: 5,
    name: "Sander Pick",
    url: "https://github.com/sanderpick",
    username: "sanderpick",
    imageUrl: "https://slate.textile.io/ipfs/bafkreihptnrkusu7qnsm4qure7noknmsrhftyrx7zy6aaj4e2cxmtcey6q",
  },
  {
    id: 6,
    name: "Andrew Hill",
    url: "https://github.com/andrewxhill",
    username: "andrewxhill",
    imageUrl: "https://slate.textile.io/ipfs/bafkreicfbr2qpmineh2ezi2kjfbshbpizkikectbdurfskczwatjkdfcoa",
  },
  {
    id: 7,
    name: "Akuoko Daniel Jnr",
    url: "https://github.com/akuokojnr",
    username: "akuokojnr",
    imageUrl: "https://slate.textile.io/ipfs/bafkreiblpimmchcbvsv3xh5aimjzrjw6bmiz6yg2dtifssf2oencg5z54q",
  },
  {
    id: 8,
    name: "Narative",
    url: "https://github.com/narative",
    username: "Narative",
    imageUrl: "https://slate.textile.io/ipfs/bafkreihdkapriwuzfh42zkhs3kwj5qki43dvyu6mq5j3rug3uf6i7egs6y",
  },
  {
    id: 9,
    name: "Colin S. McCaleb",
    url: "https://github.com/uonai",
    username: "uonai",
    imageUrl: "https://slate.textile.io/ipfs/bafkreigbjyxbmc2cirha3g4y2rmlrntau2l2gjy4ft3y6ii3kyh4ifw5li",
  },
];

export const getServerSideProps = async (context) => {
  return {
    props: { ...context.query },
  };
};

const SlateTeamCards = (props) => {
  return (
    <div key={props.id} css={STYLES_CARD_WRAPPER}>
      <a href={props.url}>
        <System.HoverTile height={250} width={200} style={{ borderRadius: 4 }}>
          <div css={STYLES_SLATE_CARD_EFFECTS}>
            <img css={STYLES_IMG} alt={`Github Profile Photo for ${props.handle}`} src={props.preview} />
            <div css={STYLES_CARD_TEXT}>
              <p css={STYLES_CARD_NAME}>{props.name}</p>
              <p css={STYLES_CARD_GITHUB}>{`@${props.handle}`}</p>
            </div>
          </div>
        </System.HoverTile>
      </a>
    </div>
  );
};

export default class CommunityPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      issues: [],
    };
  }

  async componentDidMount() {
    try {
      const response = await fetch(`https://api.github.com/repos/filecoin-project/slate/issues?labels=For+the+public`);
      const issues = await response.json();
      this.setState({
        issues,
      });
    } catch (e) {}
  }

  render() {
    const title = `Slate`;
    const description =
      "Slate is designed and built by a growing community of hackers, artists, and creatives on the web.";
    const url = "https://slate.host/community";
    const words = "npm install --save slate-react-system";
    const letters = words.split("");
    let count = 0;

    return (
      <WebsitePrototypeWrapper title={title} description={description} url={url}>
        <WebsitePrototypeHeader />
        <div css={STYLES_ROOT}>
          <div css={STYLES_SECTION_HERO}>
            <div css={STYLES_BLOCK}>
              <img
                css={STYLES_HEROIMG}
                src="https://slate.textile.io/ipfs/bafybeigtl3tjyozxxkabdvfdhopkep62ux4grgritlslwusgww6gdmm5da"
                alt="blocks evolving into different structures"
              />
              <h1 css={STYLES_H1}>Community</h1>
              <h3 css={STYLES_H3}>
                Slate is designed and built by a growing community of hackers, artists, and creatives on the web.
              </h3>
              <div>
                <button css={STYLES_BUTTON_PRIMARY} onClick={() => window.open("https://filecoin.io/slack")}>
                  Join our community
                </button>
              </div>
            </div>
          </div>

          <div css={STYLES_SECTION_WRAPPER}>
            <div css={STYLES_BLOCK}>
              <h2 css={STYLES_H2}>Core Team</h2>
              <div css={STYLES_CARD_GROUP}>
                {SLATE_CORE_TEAM.map((each) => (
                  <SlateTeamCards
                    key={each.name}
                    preview={each.imageUrl}
                    url={each.url}
                    name={each.name}
                    username={each.username}
                  />
                ))}
              </div>
            </div>
          </div>

          <div css={STYLES_SECTION_WRAPPER}>
            <div css={STYLES_BLOCK}>
              <h2 css={STYLES_H2}>Contributors</h2>
              <div css={STYLES_CARD_GROUP}>
                {SLATE_CONTRIBUTOR_TEAM.map((each) => (
                  <SlateTeamCards
                    key={each.name}
                    preview={each.imageUrl}
                    url={each.url}
                    name={each.name}
                    username={each.username}
                  />
                ))}
              </div>
            </div>
          </div>
          <div css={STYLES_SECTION_WRAPPER}>
            <div css={STYLES_BLOCK}>
              <h1 css={STYLES_H1}>Get involved</h1>
              <h3 css={STYLES_H3}>
                The Slate Project is the byproduct of a growing community of contributors from around the world. We’d
                love for you to join us, get involved in the project and contribute.
              </h3>
            </div>
          </div>
          <div css={STYLES_SECTION_WRAPPER}>
            <div css={STYLES_BLOCK}>
              <h2 css={STYLES_H2}>Contribute</h2>
              <h3 css={STYLES_H3}>
                Find something you want to work on and file an issue. If you see something you want to fix or change,
                submit a pull request.
              </h3>
              <IssuesList issues={this.state.issues} />
              <br />
              <div>
                <button
                  css={STYLES_BUTTON_PRIMARY}
                  onClick={() => window.open("https://github.com/filecoin-project/slate")}
                >
                  View Github repo
                </button>
              </div>
            </div>
          </div>
          <div css={STYLES_SECTION_WRAPPER}>
            <div css={STYLES_BLOCK}>
              <h2 css={STYLES_H2}>Integrate</h2>
              <h3 css={STYLES_H3}>
                Explore our API and SDK and build on top of Slate. Check out our open source design system for your
                projects.
              </h3>
              <br />
              <CodeBlock>npm install --save slate-react-system</CodeBlock>
              <br />
              <div>
                <button css={STYLES_BUTTON_PRIMARY} onClick={() => window.open("http://localhost:1337/_/system")}>
                  Use Slate design system
                </button>
              </div>
            </div>
          </div>
        </div>

        <WebsitePrototypeFooter />
      </WebsitePrototypeWrapper>
    );
  }
}
