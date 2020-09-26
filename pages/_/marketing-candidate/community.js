import * as React from "react";
import * as Constants from "~/common/constants";
import * as Actions from "~/common/actions";
import * as System from "~/components/system";

import { css, keyframes } from "@emotion/react";
import { SceneUtils } from "three";

import WebsitePrototypeWrapper from "~/components/core/WebsitePrototypeWrapper";
import WebsitePrototypeHeader from "~/components/core/NewWebsitePrototypeHeader";
import WebsitePrototypeFooter from "~/components/core/NewWebsitePrototypeFooter";
import IssuesList from "~/components/core/marketing/IssuesList";
import CodeBlock from "~/components/system/CodeBlock";

const FEATURES = [
  {
    illustration:
      "https://slate.textile.io/ipfs/bafkreih4hmgltk3mboh5to6lwzcmcptzsiuzlodpdxztynsl2xij6q4deq",
    title: "Multiplayer slate",
    description:
      "Slate as social space. Co-create slates with family and friends. Share design, code, research, dinner plans with others and discuss your ideas.",
  },
  {
    illustration:
      "https://slate.textile.io/ipfs/bafybeiebglllfwpqk7v57erslgmsjq2vkfav7zmcgjb7dcq3rhca26iwli",
    title: "Unity game engine",
    description:
      "Slate as playground. Upload your favorite unity game to the file-sharing network. Invite your friends to play together.",
  },
  {
    illustration:
      "https://slate.textile.io/ipfs/bafkreigwlh7kmqnay2qs5lrcyl34mq7rhlcwfwld4vwstmnhhxyrqdyhaq",
    title: "Flexible content arrangement",
    description:
      "Slate as digital garden. Organized information with gallery view, list view, a node-link diagram, a timeline, a discussion thread and more.",
  },
];

const CONTRIBUTIONS = [
  {
    contribution: "An open source brandbook for Slate.",
    contributor: "Narrative",
    illustration:
      "https://slate.textile.io/ipfs/bafkreiamnbqik6542ydqowdicdqji7jljbtvebee7vaciyozklgn6uycim",
  },
  {
    contribution: "A portrait of Slate",
    contributor: "Jason Yuan",
    illustration:
      "https://slate.textile.io/ipfs/bafkreidtgwdyqwqwk2apprnu3rwxkzv5lewktquou6k6crckpouxpq5ugm",
  },
  {
    contribution: "A playful hover tile",
    contributor: "Someone",
    illustration:
      "https://slate.textile.io/ipfs/bafkreiaz2hmjkzau3kkcah55rxdkwzum33n35icqbse2ik5e7vqcsb73kq",
  },
];

const SLATE_CORE_TEAM = [
  {
    id: 1,
    name: "Jason Leyser",
    url: "https://github.com/jasonleyser",
    username: "jasonleyser",
    imageUrl:
      "https://avatars0.githubusercontent.com/u/310223?s=400&u=62a15c1b5791b953fc5153a4b3f491f4b0bf2ae5&v=4",
  },
  {
    id: 2,
    name: "Cake",
    url: "https://github.com/jimmylee",
    username: "jimmylee",
    imageUrl:
      "https://avatars0.githubusercontent.com/u/310223?s=400&u=62a15c1b5791b953fc5153a4b3f491f4b0bf2ae5&v=4",
  },
  {
    id: 3,
    name: "Martina Long",
    url: "https://github.com/martinalong",
    username: "martinalong",
    imageUrl:
      "https://avatars0.githubusercontent.com/u/310223?s=400&u=62a15c1b5791b953fc5153a4b3f491f4b0bf2ae5&v=4",
  },
  {
    id: 4,
    name: "Haris Butt",
    url: "https://github.com/harisbutt",
    username: "harisbutt",
    imageUrl:
      "https://avatars0.githubusercontent.com/u/310223?s=400&u=62a15c1b5791b953fc5153a4b3f491f4b0bf2ae5&v=4",
  },
  {
    id: 5,
    name: "Tara Lin",
    url: "https://github.com/tarafanlin",
    username: "tarafanlin",
    imageUrl:
      "https://avatars0.githubusercontent.com/u/310223?s=400&u=62a15c1b5791b953fc5153a4b3f491f4b0bf2ae5&v=4",
  },
  {
    id: 6,
    name: "William Felker",
    url: "https://slate.host/gndclouds/urban-gardens",
    username: "gndclouds",
    imageUrl:
      "https://avatars0.githubusercontent.com/u/310223?s=400&u=62a15c1b5791b953fc5153a4b3f491f4b0bf2ae5&v=4",
  },
];

const SLATE_CONTRIBUTOR_TEAM = [
  {
    id: 1,
    name: "Pooja Shah",
    url: "https://github.com/pooja",
    username: "pooja",
    imageUrl:
      "https://slate.textile.io/ipfs/bafkreier4xffhrpconlprzxvzslqsovykqet7xj6zhhptxgu4nm2qw5i3u",
  },
  {
    id: 2,
    name: "Why",
    url: "https://github.com/whyrusleeping",
    username: "whyrusleeping",
    imageUrl:
      "https://slate.textile.io/ipfs/bafkreigvs53l22cuswtc4dtgndmc3aqns2unpc5xndnzx5gjdbw4yv6qhm",
  },
  {
    id: 4,
    name: "Aaron Stula",
    url: "https://github.com/asutula",
    username: "asutula",
    imageUrl:
      "https://slate.textile.io/ipfs/bafkreig3vnxyqqsxnrs24zpbbuc6jh5wvdsa7w6fx5gvi4j3t7rhoelhlm",
  },
  {
    id: 3,
    name: "Ignacio Hagopian",
    url: "https://github.com/jsign",
    username: "jsign",
    imageUrl:
      "https://slate.textile.io/ipfs/bafkreicktewpelagb3uvgd6psacr4kra66ii7254ghqflklek7taahni2m",
  },
  {
    id: 5,
    name: "Sander Pick",
    url: "https://github.com/sanderpick",
    username: "sanderpick",
    imageUrl:
      "https://slate.textile.io/ipfs/bafkreihptnrkusu7qnsm4qure7noknmsrhftyrx7zy6aaj4e2cxmtcey6q",
  },
  {
    id: 6,
    name: "Andrew Hill",
    url: "https://github.com/andrewxhill",
    username: "andrewxhill",
    imageUrl:
      "https://slate.textile.io/ipfs/bafkreicfbr2qpmineh2ezi2kjfbshbpizkikectbdurfskczwatjkdfcoa",
  },
  {
    id: 7,
    name: "Akuoko Daniel Jnr",
    url: "https://github.com/akuokojnr",
    username: "akuokojnr",
    imageUrl:
      "https://slate.textile.io/ipfs/bafkreiblpimmchcbvsv3xh5aimjzrjw6bmiz6yg2dtifssf2oencg5z54q",
  },
  {
    id: 8,
    name: "Narative",
    url: "https://github.com/narative",
    username: "Narative",
    imageUrl:
      "https://slate.textile.io/ipfs/bafkreihdkapriwuzfh42zkhs3kwj5qki43dvyu6mq5j3rug3uf6i7egs6y",
  },
  {
    id: 9,
    name: "Colin S. McCaleb",
    url: "https://github.com/uonai",
    username: "uonai",
    imageUrl:
      "https://slate.textile.io/ipfs/bafkreigbjyxbmc2cirha3g4y2rmlrntau2l2gjy4ft3y6ii3kyh4ifw5li",
  },
];

const STYLES_ROOT = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 1440px;
  margin: -88px 0 0 0;
  background-color: ${Constants.system.foreground};
`;

const STYLES_H1 = css`
  font-family: ${Constants.font.medium};
  font-weight: 400;
  font-size: ${Constants.typescale.lvl5};
  letter-spacing: -0.022rem;
  line-height: 1.3;
  color: ${Constants.system.slate};
  margin-bottom: 1rem;

  @media (max-width: ${Constants.sizes.mobile}px) {
    font-size: ${Constants.typescale.lvl4};
  }
`;

const STYLES_H2 = css`
  font-family: ${Constants.font.medium};
  font-weight: 400;
  font-size: ${Constants.typescale.lvl4};
  letter-spacing: -0.022rem;
  line-height: 1.3;
  color: ${Constants.system.slate};
  margin-bottom: 1rem;
  width: 45%;

  @media (max-width: ${Constants.sizes.mobile}px) {
    width: 100%;
    font-size: ${Constants.typescale.lvl3};
  }
`;

const STYLES_H3 = css`
  font-family: ${Constants.font.medium};
  font-weight: 400;
  font-size: ${Constants.typescale.lvl3};
  letter-spacing: -0.022rem;
  line-height: 1.3;
  color: ${Constants.system.slate};
  margin-bottom: 1rem;

  @media (max-width: ${Constants.sizes.mobile}px) {
    width: 100%;
    font-size: ${Constants.typescale.lvl2};
  }
`;

const STYLES_P = css`
  font-family: ${Constants.font.text};
  font-weight: 400;
  font-size: ${Constants.typescale.lvl1};
  letter-spacing: -0.011rem;
  line-height: 1.5;
  margin: 4px 0 0 0;
  width: 50%;
  color: ${Constants.system.slate};
  opacity: 0.7;

  @media (max-width: ${Constants.sizes.mobile}px) {
    width: 100%;
  }
`;

const STYLES_TEXT_BLOCK = css`
  display: flex;
  flex: 1 1 auto;
  justify-content: space-between;
  width: 67%;

  @media (max-width: ${Constants.sizes.mobile}px) {
    display: block;
    width: 100%;
  }
`;

const STYLES_SECTION_WRAPPER = css`
  padding: 44px;
  margin: 12px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  background-color: ${Constants.system.white};
  border-radius: 16px;

  @media (max-width: ${Constants.sizes.mobile}px) {
    padding: 24px;
  }
`;

const STYLES_BUTTON = css`
  margin-top: 48px;
  min-height: 48px;
  box-sizing: border-box;
  border: 0;
  border-radius: 4px;
  padding: 0 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  background: ${Constants.system.slate};
  color: ${Constants.system.white};
  font-family: ${Constants.font.semiBold};
  font-weight: 400;
  font-size: ${Constants.typescale.lvl1};
  letter-spacing: -0.011rem;
  box-shadow: 0px 10px 50px 20px rgba(0, 0, 0, 0.1);
  transition: 200ms ease all;

  :hover {
    background: ${Constants.system.white};
    color: ${Constants.system.slate};
  }
`;

const STYLES_CARD_WRAPPER = css`
  width: calc(100% / 10 px);
  transition: 200ms ease box-shadow;
  padding: 36px 36px 0 0;
  transition: all 0.2s ease-in-out;

  :hover {
    transform: scale(1.1);
  }

  @media (max-width: ${Constants.sizes.tablet}px) {
  }
`;

const STYLES_FULL_WIDTH = css`
  width: 100%;
`;

const STYLES_SPLIT_WIDTH = css`
  padding: 24px 0;
  width: 50%;
  :nth-child(2) {
    padding-left: 18px;
  }

  @media (max-width: ${Constants.sizes.tablet}px) {
    width: 100%;
  }

  @media (max-width: ${Constants.sizes.mobile}px) {
    width: 100%;
  }
`;

const STYLES_FIGURES_GROUP = css`
  width: 50%;
  margin: -4px auto;

  @media (max-width: ${Constants.sizes.mobile}px) {
    width: 100%;
    margin: 10vh 0 -4px 0;
  }
`;

const STYLES_FIGURE = css`
  width: 50%;
`;

const STYLES_FIGURES_BOTTOM = css`
  width: 50%;
  margin: -4px auto;
  transform: rotate(180deg);

  @media (max-width: ${Constants.sizes.mobile}px) {
    width: 100%;
  }
`;

const STYLES_FIGURE_RIGHT = css`
  width: 25%;
  transform: rotate(90deg) translateY(39%);

  @media (max-width: ${Constants.sizes.mobile}px) {
    display: none;
  }
`;

const STYLES_FIGURE_LEFT = css`
  width: 25%;
  transform: rotate(-90deg) translateY(39%);

  @media (max-width: ${Constants.sizes.mobile}px) {
    display: none;
  }
`;

const STYLES_DINNER_TABLE = css`
  width: 50%;
  padding: 48px 64px;
  background-color: #e7e7e9;
  display: inline-block;
  box-shadow: 0px 10px 50px 20px rgba(0, 0, 0, 0.1);

  @media (max-width: ${Constants.sizes.mobile}px) {
    width: 100%;
    padding: 24px 32px;
  }
`;

const STYLES_CODE_BLOCK = css`
  box-sizing: border-box;
  font-family: ${Constants.font.code};
  background-color: ${Constants.system.pitchBlack};
  color: ${Constants.system.white};
  border-color: ${Constants.system.yellow};
  font-size: 12px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  padding: 24px;

  * {
    white-space: pre-wrap;
    overflow-wrap: break-word;
    ::-webkit-scrollbar {
      -webkit-appearance: none;
      width: 0;
      height: 0;
    }
  }
`;

const STYLES_LINE = css`
  box-sizing: border-box;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

const STYLES_PRE = css`
  box-sizing: border-box;
  color: #666;
  font-family: ${Constants.font.code};
  flex-shrink: 0;
  min-width: 32px;
  user-select: none;
`;

const STYLES_CODE = css`
  box-sizing: border-box;
  background-color: ${Constants.system.pitchBlack};
  font-family: ${Constants.font.code};
  color: ${Constants.system.gray};
  width: 100%;
  padding-left: 16px;
`;

const STYLES_CARD_NAME = css`
  font-size: ${Constants.typescale.lvl1};
  align-items: center;
  justify-content: center;
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
  align-items: center;
  justify-content: center;

  :hover {
    color: ${Constants.system.black};
  }
`;

const STYLES_SLATE_CARD_EFFECTS = css`
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  height: 100%;
  cursor: default;
  border: 1px solid ${Constants.system.black};
  background-color: ${Constants.system.foreground};
  background-position: center;
  mix-blend-mode: luminosity;
  z-index: 2;

  :hover {
    background-position: center;
    background-size: 100%;
    border: 2px solid ${Constants.system.black};
    mix-blend-mode: normal;
    color: ${Constants.system.black};
    transition: background-image 2s ease-in-out 2s;
    opacity: 1;
    z-index: 2;
  }
`;

const STYLES_FEATURE_CARD = css`
  width: 30%;
  height: 350px;
  justify-content: space-between;
  margin: auto;
  padding: 16px;
  border-radius: 8px;
  background-color: #f2f4f8;
  box-shadow: -6px -6px 10px #ffffff, 4px 4px 10px #d4d4d4;

  @media (max-width: ${Constants.sizes.mobile}px) {
    width: 100%;
    margin-bottom: 32px;
  }
`;

const STYLES_CONTRIBUTION_CARD = css`
  margin-left: 33.3%;
  width: 66.6%;
  display: flex;
  justify-content: space-between;
  padding: 16px;
  border: 1px solid ${Constants.system.gray};

  @media (max-width: ${Constants.sizes.mobile}px) {
    margin: 0;
    width: 100%;
  }
`;

const STYLES_FEATURE_TEXT = css`
  font-family: ${Constants.font.text};
  font-weight: 400;
  font-size: ${Constants.typescale.lvl1};
  letter-spacing: -0.011rem;
  line-height: 1.5;
  margin: 8px 0 0 0;
  color: ${Constants.system.slate};
`;

const STYLES_CONTRIBUTION_TEXT = css`
  font-family: ${Constants.font.text};
  font-weight: 400;
  font-size: ${Constants.typescale.lvl1};
  letter-spacing: -0.011rem;
  line-height: 1.5;
  margin: 8px 0 0 0;
  color: ${Constants.system.slate};
`;

const STYLES_CONTRIBUTION_IMG = css`
  width: 40%;
  height: 40%;
  box-shadow: 0px 0px 20px 10px rgba(0, 0, 0, 0.1);
`;

const STYLES_FEATURE_IMG = css`
  width: 100%;
  border-radius: 4px;
  margin-bottom: 8px;
`;

const STYLES_CARD_GROUP = css`
  display: flex;
  flex-wrap: wrap;
  align-items: left;
`;

const STYLES_IMG = css`
  width: 100%;
  display: block;
`;

const STYLES_IMG_ICON = css`
  width: 15%;
  margin-bottom: 24px;
`;

const STYLES_CHAT = css`
  width: 350px;
  background: #ffffff;
  border: 1px solid #000000;
  box-sizing: border-box;
  margin: 50px 0px;
  padding: 30px;
  box-shadow: 0px 16px 24px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const STYLES_CHAT_CARD_IMAGE_RIGHT = css`
  width: 50px;
  margin-bottom: -57px;
  margin-left: 29.5vw;
  border-radius: 8px;
`;

const STYLES_CHAT_CARD_IMAGE_LEFT = css`
  width: 50px;
  margin-bottom: -57px;
  margin-left: -5.5vw;
  border-radius: 8px;
`;

const STYLES_CONSOLE = css`
  box-sizing: border-box;
  font-family: ${Constants.font.code};
  display: block;
  border-radius: 4px;
  width: 100%;
  background: ${Constants.system.red};
  padding: 8px 24px;
  color: ${Constants.system.white};
  font-size: 14px;
  box-sizing: border-box;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);

  :hover {
  }
`;

const STYLES_CONSOLE_BODY = css`
  background-color: pink;
  color: ${Constants.system.white};
  font-family: ${Constants.system.code};
  font-size: 14px;
  display: inline-block;
`;

const STYLES_HIGLIGHT_TEXT_GREEN = css`
  color: #63b182;
`;

const STYLES_HIGLIGHT_TEXT_YELLOW = css`
  color: #fbc67a;
`;

const STYLES_CENTER_BLOCK = css`
  width: 50%;
  margin: 96px auto;
  text-align: center;

  @media (max-width: ${Constants.sizes.mobile}px) {
    margin: 0 auto 48px autp;
    width: 100%;
  }
`;

const STYLES_DOT = css`
  height: 12px;
  width: 12px;
  margin-right: 8px;
  background-color: ${Constants.system.darkGray};
  border-radius: 50%;
  display: inline-block;
`;

export const getServerSideProps = async (context) => {
  return {
    props: { ...context.query },
  };
};

class CodeWindow extends React.Component {
  componentDidMount() {
    Prism.highlightAll();
  }

  render() {
    const codeBlockContent = this.props.children + "";
    const codeBlockToken = codeBlockContent.split("\n");
    const textMap = codeBlockToken;

    return (
      <div
        css={STYLES_CODE_BLOCK}
        className="language-javascript"
        style={this.props.style}
      >
        {textMap.map((element, index) => {
          return (
            <div css={STYLES_LINE} key={`${element}-${index}`}>
              <div css={STYLES_PRE}>{index}</div>
              <pre css={STYLES_CODE}>
                <code>{element}</code>
              </pre>
            </div>
          );
        })}
      </div>
    );
  }
}

const SlateTeamCards = (props) => {
  return (
    <div key={props.id} css={STYLES_CARD_WRAPPER}>
      <a href={props.url}>
        <System.HoverTile height={250} width={200} style={{ borderRadius: 4 }}>
          <div css={STYLES_SLATE_CARD_EFFECTS}>
            <img
              css={STYLES_IMG}
              alt={`Github Profile Photo for ${props.handle}`}
              src={props.preview}
            />
            <div css={STYLES_CARD_TEXT}>
              <p css={STYLES_CARD_NAME}>{props.name}</p>
              <p css={STYLES_CARD_GITHUB}>{`@${props.username}`}</p>
            </div>
          </div>
        </System.HoverTile>
      </a>
    </div>
  );
};

const FeatureCard = (props) => {
  return (
    <div css={STYLES_FEATURE_CARD}>
      <img css={STYLES_FEATURE_IMG} src={props.illustration} />
      <div css={STYLES_FEATURE_TEXT}>{props.title}</div>
      <div css={STYLES_FEATURE_TEXT} style={{ opacity: 0.7 }}>
        {props.description}
      </div>
    </div>
  );
};

const ContributionCard = (props) => {
  return (
    <div css={STYLES_CONTRIBUTION_CARD}>
      <div css={STYLES_CONTRIBUTION_TEXT} style={{ marginRight: 8 }}>
        <span css={STYLES_DOT} />
        {props.contributor}
        <br />
        {props.contribution}
      </div>
      <img css={STYLES_CONTRIBUTION_IMG} src={props.illustration} />
    </div>
  );
};

export default class CommunityPage extends React.Component {
  async componentDidMount() {
    const response = await Actions.health();
  }

  render() {
    const title = `Community`;
    const description =
      "Slate is designed and built by a growing community of hackers, artists, and creatives on the web.";
    const url = "https://slate.host/community";

    return (
      <WebsitePrototypeWrapper
        title={title}
        description={description}
        url={url}
      >
        <WebsitePrototypeHeader />
        <div css={STYLES_ROOT}>
          <div css={STYLES_SECTION_WRAPPER}>
            <div css={STYLES_FIGURES_GROUP}>
              <img
                css={STYLES_FIGURE}
                src="https://slate.textile.io/ipfs/bafybeiekksvkiaa2vwyzaitjb44adb5mfbqaqkagizwuw5odmgcwdmmiha"
              />
              <img
                css={STYLES_FIGURE}
                src="https://slate.textile.io/ipfs/bafybeiehufugq7vujsclzdpkdhff5kop6c4uw6emjuswwp3jhpznaou2se"
              />
            </div>
            <div css={STYLES_FULL_WIDTH}>
              <img
                css={STYLES_FIGURE_LEFT}
                src="https://slate.textile.io/ipfs/bafybeiehufugq7vujsclzdpkdhff5kop6c4uw6emjuswwp3jhpznaou2se"
              />
              <div css={STYLES_DINNER_TABLE}>
                <h1 css={STYLES_H1}>An open invitation to everyone</h1>
                <p css={STYLES_P}>
                  Slate is designed and built by a growing community of hackers,
                  artists, and creatives on the web.
                </p>
                <button
                  css={STYLES_BUTTON}
                  onClick={() => window.open("https://filecoin.io/slack")}
                >
                  Join our community{" "}
                </button>
              </div>
              <img
                css={STYLES_FIGURE_RIGHT}
                src="https://slate.textile.io/ipfs/bafybeiekksvkiaa2vwyzaitjb44adb5mfbqaqkagizwuw5odmgcwdmmiha"
              />
            </div>
            <div css={STYLES_FIGURES_BOTTOM}>
              <img
                css={STYLES_FIGURE}
                src="https://slate.textile.io/ipfs/bafybeiekksvkiaa2vwyzaitjb44adb5mfbqaqkagizwuw5odmgcwdmmiha"
              />
              <img
                css={STYLES_FIGURE}
                src="https://slate.textile.io/ipfs/bafybeiehufugq7vujsclzdpkdhff5kop6c4uw6emjuswwp3jhpznaou2se"
              />
            </div>
          </div>
          <div css={STYLES_SECTION_WRAPPER}>
            <div css={STYLES_FULL_WIDTH}>
              <h1>Core Team</h1>
              <p>
                We work on the core product of Slate, and you can reachout to us
                about for anything you might need to know about Slate.
              </p>
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
          <div css={STYLES_SECTION_WRAPPER} style={{ marginTop: 80 }}>
            <div css={STYLES_FULL_WIDTH}>
              <h1>Contributors</h1>
              <p>
                We couldn’t make Slate without the input and continures from the
                out community.
              </p>
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
            <div css={STYLES_TEXT_BLOCK}>
              <h2 css={STYLES_H2}>
                We couldn’t build Slate without our community of contributors
              </h2>
              <p css={STYLES_P}>
                Here features some great work from our contributors. We define
                contribution beyond code. And we believe that everyone has
                something to bring to the table. 🍰
              </p>
            </div>
            <br />
            <br />
            <div>
              {CONTRIBUTIONS.map((each) => (
                <ContributionCard
                  contribution={each.contribution}
                  contributor={each.contributor}
                  illustration={each.illustration}
                />
              ))}
            </div>
            <div css={STYLES_CENTER_BLOCK}>
              <img
                css={STYLES_IMG_ICON}
                src="https://slate.textile.io/ipfs/bafkreiav4ursjyxypvx5nvils6wyskpdua64pnzukmun3xmilndiuv3vp4"
              />
              <h3 css={STYLES_H3}>
                Have some 🍰 to bring to the table?
                <br />
                Let’s chat about how we can support you.
              </h3>
              <button
                css={STYLES_BUTTON}
                onClick={() =>
                  window.open(
                    "https://github.com/filecoin-project/slate/issues"
                  )
                }
              >
                Join Slack channel
              </button>
            </div>
          </div>
          <div css={STYLES_SECTION_WRAPPER} style={{ marginTop: 80 }}>
            <div css={STYLES_SPLIT_WIDTH}>
              <div css={STYLES_CHAT}>
                <p>
                  Hey Slate Team,
                  <br />
                  <br /> Have you thought about adding a confetti 🎉 effect to
                  the download button?
                  <br />
                  <br />
                  Best, <br />
                  🦄
                </p>
                <img
                  css={STYLES_CHAT_CARD_IMAGE_RIGHT}
                  src="https://slate.textile.io/ipfs/bafkreigxoyf43vw3p2hbc4ycsyh2og36cgy3s47xkb2n4w3i7auv2a6cei"
                />
              </div>
              <div css={STYLES_CHAT}>
                <p>
                  That would be so fun, will work in it! <br /> - J
                </p>
                <img
                  css={STYLES_CHAT_CARD_IMAGE_LEFT}
                  src="https://slate.textile.io/ipfs/bafkreigxoyf43vw3p2hbc4ycsyh2og36cgy3s47xkb2n4w3i7auv2a6cei"
                />
              </div>
            </div>
            <div css={STYLES_SPLIT_WIDTH}>
              <h1>
                <span css={STYLES_HIGLIGHT_TEXT_GREEN}>Have an idea</span> for
                how to make Slate better?
              </h1>
              <p>
                You can create an issue on github or send us an email with your
                recommendation.
              </p>
              <div>
                <button
                  css={STYLES_BUTTON}
                  onClick={() =>
                    window.open(
                      "https://github.com/filecoin-project/slate/issues/new/choose"
                    )
                  }
                >
                  Create an issue
                </button>
                <button
                  css={STYLES_BUTTON}
                  onClick={() =>
                    window.open(
                      "https://chrome.google.com/webstore/detail/slate/gloembacbehhbfbkcfjmloikeeaebnoc"
                    )
                  }
                >
                  Email us feedback
                </button>
              </div>
            </div>
          </div>
          <div css={STYLES_SECTION_WRAPPER}>
            <div css={STYLES_TEXT_BLOCK}>
              <h2 css={STYLES_H2}>Further down the road</h2>
              <p css={STYLES_P}>
                Slate has infinite possibilities. Here are some of them that
                we’re excited about.
              </p>
            </div>
            <div css={STYLES_CARD_GROUP}>
              {FEATURES.map((each) => (
                <FeatureCard
                  illustration={each.illustration}
                  title={each.title}
                  description={each.description}
                />
              ))}
            </div>
            <div css={STYLES_CENTER_BLOCK}>
              <img
                css={STYLES_IMG_ICON}
                src="https://slate.textile.io/ipfs/bafkreicq4yjwe47vu66u3qt5qqvznrq5vb4tfunmbrjjt3w6rg5p7pdcwy"
              />
              <h3 css={STYLES_H3}>
                Have an idea?
                <br />
                Expand our imaginations.
              </h3>
              <button
                css={STYLES_BUTTON}
                onClick={() =>
                  window.open(
                    "https://github.com/filecoin-project/slate/issues"
                  )
                }
              >
                Submit a feature request
              </button>
            </div>
          </div>
          <div css={STYLES_SECTION_WRAPPER} style={{ marginTop: 80 }}>
            <div css={STYLES_SPLIT_WIDTH}>
              <h1>
                <span css={STYLES_HIGLIGHT_TEXT_YELLOW}>
                  Explore our API and SDK{" "}
                </span>
                and build on top of Slate.
              </h1>
              <br />
              <p>
                Checkout the examples below to see how quickly you can get up
                and running wtih Slate’s API.
              </p>
              <button
                css={STYLES_BUTTON}
                onClick={() => window.open("https://slate.host/system")}
              >
                Use Slate API
              </button>
            </div>
            <div css={STYLES_SPLIT_WIDTH}>
              <CodeWindow>
                {`const response = await fetch('https://slate.host/api/v1/get', {
                      method: 'POST',
                      headers: {
                      'Content-Type': 'application/json',
                      // NOTE: your API key
                      Authorization: 'Basic SLA234abe41-c235-464f-9f4a-9effbbd3530dTE',
                      },
                      body: JSON.stringify({ data: {
                      // NOTE: optional, if you want your private slates too.
                      private: false
                      }})
                    });
                    
                    const json = await response.json();
                    console.log(json);`}
              </CodeWindow>
              {/*<div css={STYLES_CONSOLE}>
                <div css={STYLES_CONSOLE_BODY}>
                  <code>{`
                `}</code>
                </div>
              </div>*/}
            </div>
          </div>
        </div>
        <WebsitePrototypeFooter />
      </WebsitePrototypeWrapper>
    );
  }
}
