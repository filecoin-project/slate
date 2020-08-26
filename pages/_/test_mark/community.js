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

const STYLES_OPENSOURCE_CONTAINER = css `
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
  column-gap: 5px;
  row-gap: 10px;
  justify-items: center;
  align-item: center;
  grid-template-columns: repeat(auto-fit, 150px);
  height: 70vh;
  overflow: hidden;
`;

const STYLES_CONTRIBUTOR_CARD = css `
  height: 200px;
  width: 150px;
  background-color: ${Constants.system.white};
`;

const STYLES_IMAGE_CONTAINER = css `
  height: 150px;
  width: 150px;
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

const STYLES_SECTION_CONTRIBUTE = css `
  width: 100%;
  height: 80%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto 1fr 1fr;
`;

const STYLES_BTN_SPACER = css`
  padding-bottom: 32px;
`;

const STYLES_IMAGES_CONTAINER = css `
  grid-row: 1 / span 2;
  grid-column: 2;
  display: flex;
  flex-direction: column;
`;

const STYLES_IMAGE_CONT = css `
  max-width: 500px;
  float: right;
  justify-self: center; 
  align-self: center;
  margin-bottom: 20px;  
  border: 1px solid ${Constants.system.border};
  box-shadow: 5px 5px 1px ${Constants.system.border};
`;

const STYLES_CONTRIBUTE_CONTAINER = css `
  width: 100%;
  height: 100vh;  
`;

const STYLES_IMAGE_THREE = css `
  width: 100%;
  height: auto;
`;

const STYLES_SECTION_QUOTE = css `
  grid-row: 3;
  grid-column: 1; 
  font-size: 2rem;
  color: ${Constants.system.black};
    @media (max-width: ${Constants.sizes.mobile}px) {
      font-size: 1rem;
  }
`;

const STYLES_CONTACT_CONTAINER = css `
  width: 100%;
  height: auto;
`;

const STYLES_CONTACT_BTN_CONTAINER = css `
  display: flex;
  padding: 96px 0;
  flex-direction: row;
  justify-content: space-around;
`;

const STYLES_INTEGRATE_GIF = css `
  width: 100%
  height: 70vh;
  padding-top: 20vh;
`;

const STYLES_DESIGN_CONTAINER = css `
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 32px;
`;

const STYLES_D_TEXT = css `
  grid-column: 1;
  grid-row: 1;
`;

const STYLES_DESIGN_CODE = css `
  width: 100%;
  grid-row: 2;
  grid-column: 1;
`;  

const STYLES_D_IMAGE_CONTAINER = css `
  height: auto;
  width: 90%;
  grid-column: 2;
  grid-row: 1 / span 2;
`;

const STYLES_DESIGN_IMAGE = css `
  width: 100%;
  height: auto;
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
     pic: "/static/a1.jpg"
    },
    {id: 2,
      name: "martinalong",
      url: "https://github.com/martinalong",
      organization: "",
      pic: "/static/a1.jpg"
     },
     {id: 3,
      name: "gndclouds",
      url: "https://github.com/gndclouds",
      organization: "",
      pic: "/static/a1.jpg"
     },
     {id: 4,
      name: "uonai",
      url: "https://github.com/uonai",
      organization: "",
      pic: "/static/a1.jpg"
     },
     {id: 5,
      name: "tarafanlin",
      url: "https://github.com/tarafanlin",
      organization: "",
      pic: "/static/a1.jpg"
     },
     {id: 6,
      name: "jasonleyser",
      url: "https://github.com/",
      organization: "",
      pic: "/static/a1.jpg"
     },
     {id: 7,
      name: "akuokojnr",
      url: "https://github.com/akuokojnr",
      organization: "",
      pic: "/static/a1.jpg"
     },
     {id: 8,
      name: "jordattebayo",
      url: "https://github.com/jordattebayo",
      organization: "",
      pic: "/static/a1.jpg"
     },
     {id: 9,
      name: "Pooja",
      url: "https://github.com/",
      organization: "",
      pic: "/static/a1.jpg"
     },
     {id: 10,
      name: "tmytrn",
      url: "https://github.com/tmrtrn",
      organization: "",
      pic: "/static/a1.jpg"
     },
     {id: 11,
      name: "motdde",
      url: "https://github.com/motdde",
      organization: "",
      pic: "/static/a1.jpg"
     },
     {id: 12,
      name: "harisbutt",
      url: "https://github.com/harisbutt",
      organization: "",
      pic: "/static/a1.jpg"
     },
     {id: 13,
      name: "andrewxhill",
      url: "https://github.com/andrewxhill",
      organization: "",
      pic: "/static/a1.jpg"
     },
     {id: 14,
      name: "johannes-jp",
      url: "https://github.com/johannes-jp",
      organization: "",
      pic: "/static/a1.jpg"
     },
     {id: 15,
      name: "Anish-Agnihotri",
      url: "https://github.com/anish-agnihotri",
      organization: "",
      pic: "/static/a1.jpg"
     },
     {id: 16,
      name: "Aminejvm",
      url: "https://github.com/aminejvm",
      organization: "",
      pic: "/static/a1.jpg"
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
          <div css={STYLES_OPENSOURCE_CONTAINER}>
            <System.H1 css={STYLES_HEADER_TEXT}>Open source</System.H1>
            <System.P css={STYLES_SECTION_TEXT}>
              Slate is designed and built by a growing community of hackers,
              artists, and creatives on the web.
            </System.P>
            <div id="contr-cont" css={STYLES_CONTRIBUTOR_CONTAINER}>
            </div>
          </div>
          <div css={STYLES_CONTRIBUTE_CONTAINER}>
            <System.H1 css={STYLES_HEADER_TEXT}>Contribute</System.H1>
            <div css={STYLES_SECTION_CONTRIBUTE}>
                <System.P css={STYLES_SECTION_TEXT, STYLES_BTN_SPACER}>Get involved with the project and contribute.</System.P>
                <a>
                  <System.ButtonPrimary>Contribute on Github</System.ButtonPrimary>
                </a>
              
              <div css={STYLES_IMAGES_CONTAINER}>
                <div css={STYLES_IMAGE_CONT}><img css={STYLES_IMAGE_THREE} src="/static/githubissueA.jpg" alt="Previous GitHub Issues for Slate" /></div>
                <div css={STYLES_IMAGE_CONT}><img css={STYLES_IMAGE_THREE} src="/static/githubissueB.jpg" alt="Previous GitHub Issues for Slate" /></div>
                <div css={STYLES_IMAGE_CONT}> <img css={STYLES_IMAGE_THREE} src="/static/githubissueC.jpg" alt="Previous GitHub Issues for Slate" /></div>
              </div>
            
            <System.P css={STYLES_SECTION_QUOTE}>
              <q cite="#">Maybe put here an interesting quote about collaboration?</q><br/>
              –Albert Einstein
            </System.P>
            </div>  
          </div>
          <div css={STYLES_CONTACT_CONTAINER}>
            <System.H1 css={STYLES_HEADER_TEXT}>Contact</System.H1>
            <System.P css={STYLES_SECTION_TEXT}>
              Reach out to any of the core contributors, reach us on Twitter, or
              join our Slack.
            </System.P>
            <div css={STYLES_CONTACT_BTN_CONTAINER}>
              <a>
                <System.ButtonPrimary>Join Slack Discussions</System.ButtonPrimary>
              </a>
              <a>
                <System.ButtonPrimary>Twitter @_slate</System.ButtonPrimary>
              </a>
            </div>
          </div>
          <div css={STYLES_SECTION_CONTAINER}>
            <System.H1 css={STYLES_HEADER_TEXT}>Integrate</System.H1>
            <System.P css={STYLES_SECTION_TEXT}>
              Explore our API and SDK and build on top of Slate
            </System.P>
            <div css={STYLES_INTEGRATE_GIF}>
              <CodeBlock>npm install --save slate-react-system</CodeBlock>
              <img src="" alt="" />
            </div>
          </div>
          <div css={STYLES_SECTION_CONTAINER}>
            <System.H1 css={STYLES_HEADER_TEXT}>Design System</System.H1>
            <div css={STYLES_DESIGN_CONTAINER}>
              <System.P css={STYLES_SECTION_TEXT, STYLES_D_TEXT}>
                Check out our open source design system. You can use these
                components, experiences, and constants in your own React projects.
                First, install the npm module:{" "}
              </System.P>
              <div css={STYLES_DESIGN_CODE}>
                <CodeBlock>npm install --save slate-react-system</CodeBlock>
              </div>
              <div css={STYLES_D_IMAGE_CONTAINER}>  
                <img css={STYLES_DESIGN_IMAGE} src="/static/designSystemScreenshot.png" alt="A screenshot of Slate's design system"/>
              </div>
            </div>
          </div>
        </div>
        <WebsitePrototypeFooter />
      </WebsitePrototypeWrapper>
    );
  }
}
