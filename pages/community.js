import * as React from "react";
import * as Constants from "~/common/constants";
import * as Actions from "~/common/actions";
import * as System from "~/components/system";

import { css, keyframes } from "@emotion/react";
import { SceneUtils } from "three";

import WebsitePrototypeWrapper from "~/components/core/WebsitePrototypeWrapper";
import WebsitePrototypeHeader from "~/components/core/NewWebsitePrototypeHeader";
import WebsitePrototypeFooter from "~/components/core/NewWebsitePrototypeFooter";
import CodeBlock from "~/components/system/CodeBlock";

const SLATE_CORE_TEAM = [
  {
    id: 1,
    name: "Jason Leyser",
    url: "https://github.com/jasonleyser",
    username: "jasonleyser",
    imageUrl:
      "https://slate.textile.io/ipfs/bafkreidw22xqcr6fo6m7k25qe3yemby6w4dlawbsu6yxs7qjnpu5gyoiwm",
  },
  {
    id: 2,
    name: "Cake",
    url: "https://github.com/jimmylee",
    username: "jimmylee",
    imageUrl:
      "https://slate.textile.io/ipfs/bafkreigxoyf43vw3p2hbc4ycsyh2og36cgy3s47xkb2n4w3i7auv2a6cei",
  },
  {
    id: 3,
    name: "Martina Long",
    url: "https://github.com/martinalong",
    username: "martinalong",
    imageUrl:
      "https://slate.textile.io/ipfs/bafkreiasfgunf66fxncazlfzff3vp2btfe4j55jxgb2epcthrnvwkthwrq",
  },
  {
    id: 4,
    name: "Haris Butt",
    url: "https://github.com/harisbutt",
    username: "harisbutt",
    imageUrl:
      "https://slate.textile.io/ipfs/bafkreih3tbsh6f4m3m2yv3uyc7cupriovl4b354rsyyxuh6l5sv7ftdgzq",
  },
  {
    id: 5,
    name: "Tara Lin",
    url: "https://github.com/tarafanlin",
    username: "tarafanlin",
    imageUrl:
      "https://slate.textile.io/ipfs/bafkreieuxq4itewoes3wnpfxw2dfat6oi6rsy2snix7tvtgv7d7bgre64q",
  },
  {
    id: 6,
    name: "William Felker",
    url: "https://github.com/gndclouds",
    username: "gndclouds",
    imageUrl:
      "https://bafkreih2b33oaftlflmsg6njtu7i54f2nwws5gfhhf5w4qaezcejs6gjte.ipfs.slate.textile.io/",
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
];

const STYLES_ROOT = css`
  padding: 0 88px 128px 88px;
  margin: -88px auto 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${Constants.system.foreground};

  @media (max-width: ${Constants.sizes.mobile}px) {
    display: block;
    padding: 128px 24px;
  }
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
  width: 80%;

  @media (max-width: ${Constants.sizes.mobile}px) {
    width: 100%;
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
  opacity: 0.7;
  width: 80%;

  @media (max-width: ${Constants.sizes.mobile}px) {
    width: 100%;
  }
`;

const STYLES_SECTION_WRAPPER = css`
  max-width: 1440px;
  margin: 0 auto;
  padding: 88px 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  @media (max-width: ${Constants.sizes.mobile}px) {
    padding: 24px;
  }
`;

const STYLES_BUTTON = css`
  margin-top: 48px;
  min-height: 48px;
  margin-right: 12px;
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

    :nth-child(2) {
      padding-left: 0;
    }
  }

  @media (max-width: ${Constants.sizes.mobile}px) {
    width: 100%;

    :nth-child(2) {
      padding-left: 0;
    }
  }
`;

const STYLES_DINNER_TABLE = css`
  width: auto;
  height: auto;
  margin: 0 auto;
  padding: 24px;
  position: relative;
  background-color: #e7e7e9;
  box-shadow: 0px 10px 50px 20px rgba(0, 0, 0, 0.1);
  border-radius: 7px;

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
  border-radius: 8px;
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

const STYLES_SECTION_HERO = css`
  max-width: 1440px;
  padding: 100px;
  overflow: hidden;
  background-image: url("https://bafkreieb4yfiamtipapmhoihl547lxeod2vfku67dimrhmab5tcglr5bli.ipfs.slate.textile.io/");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  box-shadow: 0px 10px 50px 20px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 150px 250px;
  margin: 88px auto 0 auto;

  @media (max-width: ${Constants.sizes.tablet}px) {
    padding: 24px;
    margin: 44px auto 88px auto;
  }

  @media (max-width: ${Constants.sizes.mobile}px) {
    padding: 24px;
    margin: 44px auto 88px auto;
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
  border-radius: 8px;
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

const STYLES_FEATURE_CARD_WRAPPER = css`
  width: 33%;
  height: auto;
  padding-right: 24px;

  :nth-last-child() {
    padding-right: 0px;
  }

  @media (max-width: ${Constants.sizes.tablet}px) {
    width: 100%;
    height: auto;
    margin-bottom: 32px;
  }

  @media (max-width: ${Constants.sizes.mobile}px) {
    width: 100%;
    height: auto;
    margin-bottom: 32px;
  }
`;

const STYLES_FEATURE_CARD = css`
  margin: 24px auto;
  padding: 16px;
  border-radius: 8px;
  background-color: #f2f4f8;
  box-shadow: 0px 16px 24px rgba(0, 0, 0, 0.1);

  @media (max-width: ${Constants.sizes.tablet}px) {
    width: 100%;
    height: auto;
    margin-bottom: 32px;
  }

  @media (max-width: ${Constants.sizes.mobile}px) {
    width: 100%;
    height: auto;
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

const STYLES_CARD_GROUP = css`
  display: flex;
  flex-wrap: wrap;
  align-items: left;
`;

const STYLES_IMG = css`
  width: 100%;
  border-radius: 8px 8px 0px 0px;
  display: block;
`;

const STYLES_CHAT = css`
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  margin: 50px 0px;
  padding: 30px;
  box-shadow: 0px 16px 24px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const STYLES_HIGLIGHT_TEXT_GREEN = css`
  color: #63b182;
`;

const STYLES_HIGLIGHT_TEXT_YELLOW = css`
  color: #fbc67a;
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
        <System.HoverTileColorful
          height={350}
          width={300}
          style={{ borderRadius: 4 }}
        >
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
        </System.HoverTileColorful>
      </a>
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
          <div css={STYLES_SECTION_HERO}>
            <div css={STYLES_DINNER_TABLE}>
              <h1 css={STYLES_H1}>An open invitation to everyone</h1>
              <p css={STYLES_P}>
                Slate is designed and built by a growing community of hackers,
                artists, and creatives on the web.
              </p>
              <button
                css={STYLES_BUTTON}
                onClick={() =>
                  window.open(
                    "https://slate.textile.io/ipfs/bafybeiekksvkiaa2vwyzaitjb44adb5mfbqaqkagizwuw5odmgcwdmmiha"
                  )
                }
              >
                Join our community{" "}
              </button>
            </div>
          </div>
          <div css={STYLES_SECTION_WRAPPER}>
            <div css={STYLES_FULL_WIDTH}>
              <h1>Core Team</h1>
              <p css={STYLES_P}>
                We work on Slate, and you can reachout to us about for anything
                you might need to know.
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
              <h2 css={STYLES_H2}>Contributors</h2>
              <p css={STYLES_P}>
                Our amazing community members helping us make Slate.
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
            <div css={STYLES_SPLIT_WIDTH}>
              <h2 css={STYLES_H2}>
                <span css={STYLES_HIGLIGHT_TEXT_GREEN}>Have an idea</span> for
                how to make Slate better?
              </h2>
              <p css={STYLES_P}>
                You can create an issue on github or send us an email with your
                recommendation.
              </p>
              <div>
                <button
                  css={STYLES_BUTTON}
                  onClick={() =>
                    window.open(
                      "https://github.com/filecoin-project/slate/issues"
                    )
                  }
                >
                  Create an issue
                </button>
                <button
                  css={STYLES_BUTTON}
                  onClick={() => window.open("https://twitter.com/_slate")}
                >
                  Tweet us
                </button>
              </div>
            </div>
            <div css={STYLES_SPLIT_WIDTH}>
              <div css={STYLES_CHAT}>
                <p>
                  Hey Slate Team,
                  <br />
                  <br /> Have you thought about adding a confetti effect to the
                  download button?
                  <br />
                  <br />
                  Best, <br />
                  Will
                </p>
              </div>
              <div css={STYLES_CHAT}>
                <p>
                  Hey Will, <br />
                  <br />
                  That would be so fun, will work in it! <br />
                  <br /> Best, <br />
                  John
                </p>
              </div>
            </div>
          </div>
          <div css={STYLES_SECTION_WRAPPER}>
            <div css={STYLES_SPLIT_WIDTH}>
              <h2 css={STYLES_H2}>
                <span css={STYLES_HIGLIGHT_TEXT_YELLOW}>
                  Explore our API and SDK{" "}
                </span>
                and build on top of Slate.
              </h2>
              <p css={STYLES_P}>
                Checkout the examples below to see how quickly you can get up
                and running with Slate’s API.
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
    Authorization: 'Basic SLATE-API-KEY-FROM-ACCOUNT-SETTINGS',
    },
    body: JSON.stringify({ data: {
    // NOTE: optional, if you want your private slates too.
    private: false
    }})
  });
  
  const json = await response.json();
  console.log(json);`}
              </CodeWindow>
            </div>
          </div>
        </div>
        <WebsitePrototypeFooter />
      </WebsitePrototypeWrapper>
    );
  }
}
