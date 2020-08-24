import * as React from "react";
import * as Constants from "~/common/constants";
import * as Actions from "~/common/actions";
import * as System from "~/components/system";
import CodeBlock from "~/components/system/CodeBlock";
import ReactDOM from "react-dom";

import { css } from "@emotion/react";

import WebsitePrototypeWrapper from "~/components/core/WebsitePrototypeWrapper";
import WebsitePrototypeHeader from "~/components/core/WebsitePrototypeHeader";
import WebsitePrototypeFooter from "~/components/core/NewWebsitePrototypeFooter";

const STYLES_ROOT = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  padding: 5%;
  margin: 0;
`;

const STYLES_SECTION_CONTAINER = css `
  width: 100%;
  height: 100vh;
`;

const STYLES_HEADER_TEXT = css`
  font-size: 4.768rem;
  padding: 0px 0px 32px 0px;
  width: 100%;
    @media (max-width: ${Constants.sizes.mobile}px) {
      font-size: 2.441rem;
    }
`;

const STYLES_SECTION_TEXT = css `
  font-size: 1rem;
  color: ${Constants.system.black};
    @media (max-width: ${Constants.sizes.mobile}px) {
      font-size: 0.78rem;
    }
`;

const STYLES_CONTRIBUTOR_CONTAINER = css `
  display: grid;
  padding-top: 32px;
  column-gap: 10px;
  row-gap: 15px;
  justify-items: center;
  align-item: center;
  grid-template-columns: repeat(auto-fit, 125px);
  height: 70vh;
`;

const STYLES_CONTRIBUTOR_CARD = css `
  height: 135px;
  width: 100px;
`;

const STYLES_IMAGE_CONTAINER = css `
  height: 100px;
`;

const STYLES_CARD_IMAGE = css `
  width: 100%;
  height: auto;
`;

const STYLES_CARD_TEXT = css `
font-size: 1rem;
color: ${Constants.system.black};
  @media (max-width: ${Constants.sizes.mobile}px) {
    font-size: 0.78rem;
  }
`;


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
    {id: 1,
     name: "jimmylee",
     url: "https://github.com/jimmylee",
     organization: "",
     pic: "http://place-puppy.com/200x200"
    },
    {id: 2,
      name: "martinalong",
      url: "https://github.com/martinalong",
      organization: "",
      pic: "http://place-puppy.com/200x200"
     },
     {id: 3,
      name: "gndclouds",
      url: "https://github.com/gndclouds",
      organization: "",
      pic: "http://place-puppy.com/200x200"
     },
     {id: 4,
      name: "uonai",
      url: "https://github.com/uonai",
      organization: "",
      pic: "http://place-puppy.com/200x200"
     },
     {id: 5,
      name: "tarafanlin",
      url: "https://github.com/tarafanlin",
      organization: "",
      pic: "http://place-puppy.com/200x200"
     },
     {id: 6,
      name: "jasonleyser",
      url: "https://github.com/",
      organization: "",
      pic: "http://place-puppy.com/200x200"
     },
     {id: 7,
      name: "akuokojnr",
      url: "https://github.com/akuokojnr",
      organization: "",
      pic: "http://place-puppy.com/200x200"
     },
     {id: 8,
      name: "jordattebayo",
      url: "https://github.com/jordattebayo",
      organization: "",
      pic: "http://place-puppy.com/200x200"
     },
     {id: 9,
      name: "Pooja",
      url: "https://github.com/",
      organization: "",
      pic: "http://place-puppy.com/200x200"
     },
     {id: 10,
      name: "tmytrn",
      url: "https://github.com/tmrtrn",
      organization: "",
      pic: "http://place-puppy.com/200x200"
     },
     {id: 11,
      name: "motdde",
      url: "https://github.com/motdde",
      organization: "",
      pic: "http://place-puppy.com/200x200"
     },
     {id: 12,
      name: "harisbutt",
      url: "https://github.com/harisbutt",
      organization: "",
      pic: "http://place-puppy.com/200x200"
     },
     {id: 13,
      name: "andrewxhill",
      url: "https://github.com/andrewxhill",
      organization: "",
      pic: "http://place-puppy.com/200x200"
     },
     {id: 14,
      name: "johannes-jp",
      url: "https://github.com/johannes-jp",
      organization: "",
      pic: "http://place-puppy.com/200x200"
     },
     {id: 15,
      name: "Anish-Agnihotri",
      url: "https://github.com/anish-agnihotri",
      organization: "",
      pic: "http://place-puppy.com/200x200"
     },
     {id: 16,
      name: "Aminejvm",
      url: "https://github.com/aminejvm",
      organization: "",
      pic: "http://place-puppy.com/200x200"
     },     
  ]

  addContributors = () => {
    const allContributors = []
    const contributors = this.contributorsList
    for (let c of contributors) {
      allContributors.push(
        <div key={c.id} css={STYLES_CONTRIBUTOR_CARD}>
          <div css={STYLES_IMAGE_CONTAINER}>
            <img css={STYLES_CARD_IMAGE} src={c.pic}/>
          </div>
          <System.P css={STYLES_CARD_TEXT}>
            {c.name}
          </System.P>
          <a href={c.url}>{`@${c.name}`}</a>
        </div>
      )
    }
    ReactDOM.render(allContributors, document.getElementById("contr-cont"))
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
          <div css={STYLES_SECTION_CONTAINER}>
            <System.H1 css={STYLES_HEADER_TEXT}>Open source</System.H1>
            <System.P css={STYLES_SECTION_TEXT}>
              Slate is designed and built by a growing community of hackers,
              artists, and creatives on the web.{" "}
            </System.P>
            <div id="contr-cont" css={STYLES_CONTRIBUTOR_CONTAINER}>
            </div>
          </div>
          <div css={STYLES_SECTION_CONTAINER}>
            <System.H1 css={STYLES_HEADER_TEXT}>Contribute</System.H1>
            <System.P css={STYLES_SECTION_TEXT}>Get involved with the project and contribute.</System.P>
            <a>
              <System.ButtonPrimary>Contribute on Github</System.ButtonPrimary>
            </a>
            <img src="" alt="" />
            <System.P css={STYLES_SECTION_TEXT}>
              “Maybe put here an interesting quote about collaboration?
              <span>–Albert Einstein</span>
            </System.P>
          </div>
          <div css={STYLES_SECTION_CONTAINER}>
            <System.H1 css={STYLES_HEADER_TEXT}>Contact</System.H1>
            <System.P css={STYLES_SECTION_TEXT}>
              Reach out to any of the core contributors, reach us on Twitter, or
              join our Slack.
            </System.P>
            <a>
              <System.ButtonPrimary>Join Slack Discussions</System.ButtonPrimary>
            </a>
            <a>
              <System.ButtonPrimary>Twitter @_slate</System.ButtonPrimary>
            </a>
          </div>
          <div css={STYLES_SECTION_CONTAINER}>
            <System.H1 css={STYLES_HEADER_TEXT}>Integrate</System.H1>
            <System.P css={STYLES_SECTION_TEXT}>
              Explore our API and SDK and build on top of Slate
            </System.P>
            <CodeBlock>npm install --save slate-react-system</CodeBlock>
            <img src="" alt="" />
          </div>
          <div css={STYLES_SECTION_CONTAINER}>
            <System.H1 css={STYLES_HEADER_TEXT}>Design System</System.H1>
            <System.P css={STYLES_SECTION_TEXT}>
              Check out our open source design system. You can use these
              components, experiences, and constants in your own React projects.
              First, install the npm module:{" "}
            </System.P>
            <CodeBlock>npm install --save slate-react-system</CodeBlock>
            <img src="" alt="" />
          </div>
        </div>
        <WebsitePrototypeFooter />
      </WebsitePrototypeWrapper>
    );
  }
}
