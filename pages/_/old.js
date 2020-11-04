import * as React from "react";
import * as Constants from "~/common/constants";
import * as Actions from "~/common/actions";
import * as System from "~/components/system";
import CodeBlock from "~/components/system/CodeBlock";
import ReactDOM from "react-dom";

import { css } from "@emotion/core";

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

const STYLES_SECTION_CONTAINER = css`
  width: 100%;
  height: 100vh;
`;

const STYLES_OPENSOURCE_CONTAINER = css`
  width: 100%;
  background-color: ${Constants.system.foreground};
`;

const STYLES_HEADER_TEXT = css`
  font-size: 4.768rem;
  padding: 0px 0px 32px 0px;
  width: 100%;
  @media (max-width: ${Constants.sizes.mobile}px) {
    font-size: 2.441rem;
  }
`;

const STYLES_SECTION_TEXT = css`
  font-size: 1rem;
  color: ${Constants.system.black};
  @media (max-width: ${Constants.sizes.mobile}px) {
    font-size: 0.78rem;
  }
`;

const STYLES_CONTRIBUTOR_CONTAINER = css`
  display: grid;
  padding-top: 32px;
  column-gap: 5px;
  row-gap: 10px;
  justify-items: center;
  align-item: center;
  grid-template-columns: repeat(auto-fit, 150px);
  height: 70vh;
  overflow: hidden;
`;

const STYLES_CONTRIBUTOR_CARD = css`
  height: 200px;
  width: 150px;
  background-color: ${Constants.system.white};
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
  font-size: 1rem;
  color: ${Constants.system.black};
  @media (max-width: ${Constants.sizes.mobile}px) {
    font-size: 0.78rem;
  }
`;

const STYLES_SECTION_CONTRIBUTE = css`
  width: 100%;
  height: 80%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto 1fr 1fr;
`;

const STYLES_BTN_SPACER = css`
  padding-bottom: 32px;
`;

const STYLES_IMAGES_CONTAINER = css`
  grid-row: 1 / span 2;
  grid-column: 2;
  display: flex;
  flex-direction: column;
`;

const STYLES_IMAGE_CONT = css`
  max-width: 500px;
  float: right;
  justify-self: center;
  align-self: center;
  margin-bottom: 20px;
  border: 1px solid ${Constants.system.border};
  box-shadow: 5px 5px 1px ${Constants.system.border};
`;

const STYLES_CONTRIBUTE_CONTAINER = css`
  width: 100%;
  height: 100vh;
`;

const STYLES_IMAGE_THREE = css`
  width: 100%;
  height: auto;
`;

const STYLES_SECTION_QUOTE = css`
  grid-row: 3;
  grid-column: 1;
  font-size: 2rem;
  color: ${Constants.system.black};
  @media (max-width: ${Constants.sizes.mobile}px) {
    font-size: 1rem;
  }
`;

const STYLES_CONTACT_CONTAINER = css`
  width: 100%;
  height: auto;
`;

const STYLES_CONTACT_BTN_CONTAINER = css`
  display: flex;
  padding: 96px 0;
  flex-direction: row;
  justify-content: space-around;
`;

const STYLES_INTEGRATE_GIF = css`
  width: 100%
  height: 70vh;
  padding-top: 20vh;
`;

const STYLES_DESIGN_CONTAINER = css`
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 32px;
`;

const STYLES_D_TEXT = css`
  grid-column: 1;
  grid-row: 1;
`;

const STYLES_DESIGN_CODE = css`
  width: 100%;
  grid-row: 2;
  grid-column: 1;
`;

const STYLES_D_IMAGE_CONTAINER = css`
  height: auto;
  width: 90%;
  grid-column: 2;
  grid-row: 1 / span 2;
`;

const STYLES_DESIGN_IMAGE = css`
  width: 100%;
  height: auto;
`;
const STYLES_WRAPPER_TEXT = css`
  width: 40%;
  align-self: center;
  padding: 0 50px;
`;
const STYLES_SECTION = css`
  display: flex;
  flex-direction: row;
  align-self: center;
  h1 {
    font-size: 46px;
    line-height: 100%;
  }
`;
const STYLES_CARD = css``;

export const getServerSideProps = async (context) => {
  return {
    props: { ...context.query },
  };
};

export default class IndexPage extends React.Component {
  async componentDidMount() {
    const response = await Actions.health();
    console.log("HEALTH_CHECK", response);
    this.addContributors();
  }

  contributorsList = [
    {
      id: 1,
      name: "jimmylee",
      url: "https://github.com/jimmylee",
      organization: "Slate",
      pic:
        "https://avatars0.githubusercontent.com/u/310223?s=400&u=62a15c1b5791b953fc5153a4b3f491f4b0bf2ae5&v=4",
    },
    {
      id: 2,
      name: "martinalong",
      url: "https://github.com/martinalong",
      organization: "Slate",
      pic:
        "https://avatars2.githubusercontent.com/u/33686587?s=400&u=d1841da2872f30f7f8cb80e67cdc9b385d0f50e1&v=4",
    },
    {
      id: 3,
      name: "gndclouds",
      url: "https://github.com/gndclouds",
      organization: "Slate",
      pic:
        "https://avatars0.githubusercontent.com/u/1757261?s=400&u=b7136d82bfacac3002b3b08980ac611ca7f34b7b&v=4",
    },
    {
      id: 4,
      name: "uonai",
      url: "https://github.com/uonai",
      organization: "",
      pic:
        "https://avatars2.githubusercontent.com/u/7935491?s=400&u=8d91d58215c8df440eacf37d6291d912252685c3&v=4",
    },
    {
      id: 5,
      name: "tarafanlin",
      url: "https://github.com/tarafanlin",
      organization: "Slate",
      pic:
        "https://avatars2.githubusercontent.com/u/35607644?s=400&u=48483bdf251e5293fefb30ae993bfa04d06601a6&v=4",
    },
    {
      id: 6,
      name: "jasonleyser",
      url: "https://github.com/",
      organization: "Slate",
      pic: "/static/a1.jpg",
    },
    {
      id: 7,
      name: "akuokojnr",
      url: "https://github.com/akuokojnr",
      organization: "",
      pic:
        "https://avatars2.githubusercontent.com/u/31008944?s=400&u=340814cc84eac860654a072781661e58aadaf560&v=4",
    },
    {
      id: 8,
      name: "jordattebayo",
      url: "https://github.com/jordattebayo",
      organization: "",
      pic:
        "https://avatars2.githubusercontent.com/u/31581758?s=400&u=21765bba0c302a554ef3aab835450a32fc947a98&v=4",
    },
    {
      id: 9,
      name: "Pooja",
      url: "https://github.com/",
      organization: "",
      pic: "/static/a1.jpg",
    },
    {
      id: 10,
      name: "tmytrn",
      url: "https://github.com/tmrtrn",
      organization: "",
      pic:
        "https://avatars0.githubusercontent.com/u/2691514?s=400&u=b589dc97fa893152768b00c27b5f9f68d1a7fb79&v=4",
    },
    {
      id: 11,
      name: "motdde",
      url: "https://github.com/motdde",
      organization: "",
      pic:
        "https://avatars3.githubusercontent.com/u/12215060?s=400&u=aa85ebcfc7438becdb50a67aa79e78ba8feb2d77&v=4",
    },
    {
      id: 12,
      name: "harisbutt",
      url: "https://github.com/harisbutt",
      organization: "",
      pic: "/static/a1.jpg",
    },
    {
      id: 13,
      name: "andrewxhill",
      url: "https://github.com/andrewxhill",
      organization: "",
      pic: "/static/a1.jpg",
    },
    {
      id: 14,
      name: "johannes-jp",
      url: "https://github.com/johannes-jp",
      organization: "",
      pic: "/static/a1.jpg",
    },
    {
      id: 15,
      name: "Anish-Agnihotri",
      url: "https://github.com/anish-agnihotri",
      organization: "",
      pic: "/static/a1.jpg",
    },
    {
      id: 16,
      name: "Aminejvm",
      url: "https://github.com/aminejvm",
      organization: "",
      pic: "/static/a1.jpg",
    },
  ];

  addContributors = () => {
    const allContributors = [];
    const contributors = this.contributorsList;
    for (let c of contributors) {
      allContributors.push(
        <div key={c.id} css={STYLES_CONTRIBUTOR_CARD}>
          <div css={STYLES_IMAGE_CONTAINER}>
            <img css={STYLES_CARD_IMAGE} src={c.pic} />
          </div>
          <System.P css={STYLES_CARD_TEXT}>{c.name}</System.P>
          <a href={c.url}>{`@${c.name}`}</a>
        </div>
      );
    }
    ReactDOM.render(allContributors, document.getElementById("contr-cont"));
  };

  render() {
    const title = `Slate`;
    const description = "The place for all of your assets. Powered by Textile and Filecoin.";
    const url = "https://slate.host/community";

    return (
      <WebsitePrototypeWrapper title={title} description={description} url={url}>
        <WebsitePrototypeHeader />
        <div css={STYLES_ROOT}>
          <section css={STYLES_SECTION}>
            <div>
              <System.H1>
                Slate is designed and built by a growing community of hackers, artists, and
                creatives on the web.
              </System.H1>
              <System.P>ytu</System.P>
            </div>
            <div>
              {" "}
              <div id="contr-cont" css={STYLES_CONTRIBUTOR_CONTAINER} />
            </div>
          </section>

          <section css={STYLES_SECTION}>
            <div css={STYLES_WRAPPER_TEXT}>
              <System.H1>Get Involved</System.H1>
              <System.P>
                Slate is a fully open-source file sharing network designed for research and
                collaboration.
              </System.P>
              <br />
              <br />
              <div>
                <img
                  src="https://d2w9rnfcy7mm78.cloudfront.net/8547413/original_613b9b0a650a3f274c68e1407f552ff3.png?1599111034?bc=0"
                  alt="Slate Web App Screenshot"
                />
              </div>
            </div>

            <div css={STYLES_CARD}>
              <System.H2>Contribute</System.H2>
              <br />
              <System.P>Get involved with the project and contribute.</System.P>
              <br />
              <br />
            </div>

            <div css={STYLES_CARD}>
              <System.H2>Contact</System.H2>
              <br />
              <System.P>
                Reach out to any of the core contributors, reach us on Twitter, or join our Slack.
              </System.P>
              <br />
              <br />
            </div>

            <div css={STYLES_CARD}>
              <System.H2>Integrate</System.H2>
              <br />
              <System.P>Explore our API and SDK and build on top of Slate.</System.P>
              <br />
              <br />
              <CodeBlock>npm install --save slate-react-system</CodeBlock>
            </div>

            <div>
              <System.H2>Design System</System.H2>
              <br />
              <System.P>Check out our open source design system for your projects</System.P>
              <br />
              <br />
              <CodeBlock>npm install --save slate-react-system</CodeBlock>
            </div>
          </section>
        </div>
        <WebsitePrototypeFooter />
      </WebsitePrototypeWrapper>
    );
  }
}
