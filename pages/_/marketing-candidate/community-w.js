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

const STYLES_P = css`
  font-family: ${Constants.font.text};
  font-weight: 400;
  font-size: ${Constants.typescale.lvl1};
  letter-spacing: -0.011rem;
  line-height: 1.3;
  color: ${Constants.system.slate};
  opacity: 0.7;
`;

const STYLES_SECTION_WRAPPER = css`
  width: 100%;
  padding: 88px;
  margin: 12px;
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
  cursor: pointer;

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

const STYLES_CARD_NAME = css`
  font-size: ${Constants.typescale.lvl1};
  align-items: center;
  justify-content: center;
  display: inline;
  :hover {
    display: none;
  }
`;

const STYLES_CARD_GITHUB = css`
  font-size: ${Constants.typescale.lvl0};
  text-align: left;
  display: none;
  :hover {
    display: inline;
  }
`;

const STYLES_CARD_TEXT = css`
  padding: 8px 4px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  justify-content: center;
`;

const STYLES_SLATE_CARD_EFFECTS = css`
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  height: 100%;
  cursor: default;
  border: 1px solid ${Constants.system.black};
  color: ${Constants.system.slate};
  background-color: ${Constants.system.foreground};
  background-position: center;
  mix-blend-mode: luminosity;

  z-index: 2;
  :hover {
    // background-image: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/13471/sparkles.gif");
    background-position: center;
    background-size: 100%;
    border: 2px solid ${Constants.system.black};

    mix-blend-mode: normal;
    color: ${Constants.system.foreground};
    transition: background-image 2s ease-in-out 2s;
    opacity: 1;
    z-index: 2;
  }
  :after {
  }
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

const SLATE_CORE_TEAM = [
  {
    id: 1,
    name: "Jason Leyser",
    url: "https://github.com/jasonleyser",
    username: "jasonleyser",
    imageUrl:
      "https://avatars3.githubusercontent.com/u/60402678?s=400&u=b7d840718b781d4266fff7fb59e688d369ec1e6b&v=4",
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
      "https://avatars2.githubusercontent.com/u/33686587?s=400&u=d1841da2872f30f7f8cb80e67cdc9b385d0f50e1&v=4",
  },
  {
    id: 4,
    name: "Haris Butt",
    url: "https://github.com/harisbutt",
    username: "harisbutt",
    imageUrl:
      "https://avatars2.githubusercontent.com/u/13544493?s=400&u=264f4b9241b2520ba13e4eb4d71042b05adc5f74&v=4",
  },
  {
    id: 5,
    name: "Tara Lin",
    url: "https://github.com/tarafanlin",
    username: "tarafanlin",
    imageUrl:
      "https://avatars2.githubusercontent.com/u/35607644?s=400&u=48483bdf251e5293fefb30ae993bfa04d06601a6&v=4",
  },
  {
    id: 6,
    name: "William Felker",
    url: "https://slate.host/gndclouds/urban-gardens",
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
  {
    id: 9,
    name: "Colin S. McCaleb",
    url: "https://github.com/uonai",
    username: "uonai",
    imageUrl:
      "https://slate.textile.io/ipfs/bafkreigbjyxbmc2cirha3g4y2rmlrntau2l2gjy4ft3y6ii3kyh4ifw5li",
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
            <img
              css={STYLES_IMG}
              alt={`Github Profile Photo for ${props.handle}`}
              src={props.preview}
            />
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
  async componentDidMount() {
    const response = await Actions.health();
  }

  render() {
    const title = `Slate`;
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
          <div css={STYLES_SECTION_WRAPPER} style={{ marginTop: 80 }}>
            <div>
              <h1>Core Team</h1>
              <p>We work on the core product 24/7/365</p>
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
            <br />
            <br />
            <div>
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
          <div css={STYLES_SECTION_WRAPPER} style={{ marginTop: 80 }}>
            <div>Message Cards</div>
            <div>
              <h1>Have an idea for how to make Slate better?</h1>
              <p>
                You can create an issue on github or send us an email with your
                recommendation.{" "}
              </p>
              <div>
                {" "}
                <button css={STYLES_BUTTON}>Create an issue</button>
                <button css={STYLES_BUTTON}>Email us feedback</button>
              </div>
            </div>
          </div>
          <div css={STYLES_SECTION_WRAPPER} style={{ marginTop: 80 }}>
            Add Slate to your next project with our storage API.
          </div>
        </div>
        <WebsitePrototypeFooter />
      </WebsitePrototypeWrapper>
    );
  }
}
