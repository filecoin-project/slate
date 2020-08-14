import * as React from "react";
import * as Constants from "~/common/constants";
import * as Actions from "~/common/actions";
import * as System from "~/components/system";

import { css, keyframes } from "@emotion/react";

import WebsitePrototypeWrapper from "~/components/core/WebsitePrototypeWrapper";
import WebsitePrototypeHeader from "~/components/core/NewWebsitePrototypeHeader";
import WebsitePrototypeFooter from "~/components/core/NewWebsitePrototypeFooter";

import TextLoop from "react-text-loop";
import { Fade } from "react-slideshow-image";

const STYLES_HERO_SECTION = css`
text-align: center;
  width: 100vw;
  height: 100vh;
  padding-top: 30vh;
  background-image: url("");  
   background-size: cover; 
  background-position: center; 
  background-repeat: no-repeat; 
  transition: width 2s, height 4s;
`;
const STYLES_HERO_TEXT = css`
  text-align: center;
  color: ${Constants.system.foreground};
  width: 80vw;
  margin: auto; 
`;

const STYLES_ROOT = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  h1{
    font-size: 4.768rem;
    padding: 0px 0px 32px 0px;
    width: 100%;
  }
  h2{
    font-size: 1.953rem;
    width: 48%;
  }
  p{
    font-size: 1rem;
    color: ${Constants.system.black};
  }
  @media (max-width: ${Constants.sizes.mobile}px) {
    h1{
      font-size: 2.441rem;
    }
    h2{
      font-size: 1.25rem;
    }
    p{
      font-size: 0.78rem;
    }
  }
`;

const STYLES_FOREGROUND_H1 = css`
  font-size: 4.768rem;
  color: ${Constants.system.foreground};
  padding: 0px 0px 32px 0px;
  width: 64%;
`;

const STYLES_FOREGROUND_H2 = css`
  font-size: 1.953rem;
  color: ${Constants.system.foreground};
  width: 48%;
`;

const STYLES_HERO = css`
  padding: 88px 24px;
  width: 100vw;
  height: 100vh;
  background: ${Constants.system.foreground};
`;
const STYLES_SECTION_WHITE = css`
  padding: 88px 24px;
  width: 100vw;
  height: 100vh;
  background: ${Constants.system.white};
`;

const STYLES_SECTION_GRAY = css`
  padding: 88px 24px;
  width: 100vw;
  height: 100vh;
  background: ${Constants.system.gray};
`;

const STYLES_SECTION_FOREGROUND = css`
  padding: 88px 24px;
  width: 100vw;
  height: 100vh;
  background: ${Constants.system.foreground};
  position: relative;
`;

const STYLES_SECTION_FRONT = css`
  padding: 88px 24px 24px 24px;
  margin: 0px 0px 0px 0px;
  position: relative;
  z-index : 2;

// const STYLES_VIEWS_TEXT = css`
// align-items: center;
// height: 80%;
// ul {
//   list-style-type: none;
//   position: relative;
//   padding-top: 20vh;
// }
// a {
//   font-size: 1.953rem;
//   color: ${Constants.system.black};
//   text-decoration: none;
// }
// a:hover{
//   font-size: 1.953rem;
//   color: ${Constants.system.black};
//   text-decoration-style: wavy;
//   font-weight: bold;
// }
// img {
//   display: none;
//   height: 301px;
//   position: absolute;
//   right: 0;
//   top: 0;
//   width: 300px;
// }
// a:hover + img,
// img:hover {
//   width: 65%;
//   height: auto;
//   display: block;
// }
// }
// `;

const STYLES_SECTION_BACK = css`
  margin: 0px 0px 0px 0px;
  width: 100vw;
  height: 100vh;
  padding: 0px;
  position: absolute;
  background-size: cover;   
  background-position: center;   
  background-repeat: no-repeat;
`;

const STYLES_SECTION_MEDIA = css`
  width: 100%;
  height: 100vh;
  padding: 0px;
  margin: 0px;
`;

const STYLES_MEDIA = css`
  max-width: 100%;
  max-height: 100vh;
  background-size: cover;   
  background-position: center;   
  background-repeat: no-repeat;
`;

const STYLES_SIMPLE_FLOW_CONTAINER = css `
  display: flex;
  flex-direction: row;
  width: 100vw;
  justify-content: space-around;
  padding-top: 20vh;
  align-items: center;
`;

const STYLES_ARROW_CONTAINER = css `
  width: 200px;
`

const STYLES_SECTION_TEXT = css`
  display: block;
  max-width: 980px;
`;

const STYLES_SECTION_SVG_CONTAINER = css`
  display: flex;
  justify-content: center;
`;

const STYLES_STROKE_KF = keyframes`
 from { stroke-dashoffset: 1; }
 to { stroke-dashoffset: 0;}
`

const STYLES_SVG_AN = css`
  animation: ${STYLES_STROKE_KF} 5s ease-in-out infinite alternate;
`

const STYLES_CONTR_CONTAINER = css `
  display: flex;
`
const STYLES_CONTR_LIST = css `
  display: flex;
  justify-content: space-around;
  width: 100vw;
  list-style: none;
`

const STYLES_CONTR_LI0 = css `
  font-size: 1.953rem;
  color: ${Constants.system.black};
  text-decoration: none;
  padding-bottom: 1.5rem;
`
const STYLES_CONTR_LI1 = css `
  font-size: 1.953rem;
  color: ${Constants.system.black};
  text-decoration: none;
  opacity: .76;
  padding-bottom: 1.5rem;
`
const STYLES_CONTR_LI2 = css `
  font-size: 1.953rem;
  color: ${Constants.system.black};
  text-decoration: none;
  opacity: .56;
  padding-bottom: 1.5rem;
`
const STYLES_CONTR_LI3 = css `
  font-size: 1.953rem;
  color: ${Constants.system.black};
  text-decoration: none;
  opacity: .26;
  padding-bottom: 1.5rem;
`
const STYLES_MEDIA_LEFT = css`
  position: absolute;
  right: 16%;
  bottom: 24px
`;

const fadeImages = [
  "/static/media/image.jpg",
  "/static/media/sound.jpg",
  "/static/media/code.jpg",
  "/static/media/text.jpg",
  "/static/media/url.jpg",
];

export const getServerSideProps = async (context) => {
  return {
    props: { ...context.query },
  };
};

export default class IndexPage extends React.Component {
  async componentDidMount() {
    const response = await Actions.health();
    console.log("HEALTH_CHECK", response);
  }
  render() {
    const title = `Slate`;
    const description = "The place for all of your assets. Powered by Textile and Filecoin.";
    const url = "https://slate.host";

    return (
      <WebsitePrototypeWrapper title={title} description={description} url={url}>
        <div css={STYLES_ROOT}>
          <WebsitePrototypeHeader />
            <section css={STYLES_HERO_SECTION}>
            <div css={STYLES_HERO_TEXT}>
              <System.H1>Slate is the gateway to Filecoin.</System.H1>
              <br/>
              <System.H2>By creating a safe, open, and moddable storage system that is easy to use, we create paths to a new network of designed around trust.</System.H2>
           </div>
          
            </section>
            <section css={STYLES_SECTION_WHITE}>
              <h1>Simple, intuitive</h1>
              <h2>Break way from abstract visualizations of your files.<br/>Securely organize your data in a relatable way</h2>
              <div css={STYLES_SIMPLE_FLOW_CONTAINER}>
                <div>{/*<ButtonPrimary>Upload File</ButtonPrimary> Figure out hoiw to pull in correctly*/}<button>Upload File</button></div>
                <div css={STYLES_ARROW_CONTAINER}>
                  <svg viewBox="0 0 350 100">
                    <defs>
                      <marker id="arrowhead" markerWidth="10" markerHeight="7"
                      refX="0" refY="1.5" orient="auto" fill="#1b1f23">
                        <polygon points="0 0, 5 1.5, 0 3" />
                      </marker>
                    </defs>
                    <line x1="5" y1="50" x2="250" y2="50" stroke="#1b1f23"
                    stroke-width="8" marker-end="url(#arrowhead)" />
                  </svg>
                </div>
                <div><p>Slate securely stores your file</p></div>
                <div css={STYLES_ARROW_CONTAINER}>
                  <svg viewBox="0 0 350 100">
                    <defs>
                      <marker id="arrowhead" markerWidth="10" markerHeight="7"
                      refX="0" refY="1.5" orient="auto" fill="#1b1f23">
                        <polygon points="0 0, 5 1.5, 0 3" />
                      </marker>
                    </defs>
                    <line x1="5" y1="50" x2="250" y2="50" stroke="#1b1f23"
                    stroke-width="8" marker-end="url(#arrowhead)" />
                  </svg>
                </div>
                <div><p>Share!</p></div>
              </div>
            </section>
      
            <section css={STYLES_SECTION_FOREGROUND}>
              <h1>Private & Secure</h1>
              <h2>All your files are encryped. Only accessible by you and the people you choose to share.</h2>
              <div css={STYLES_MEDIA_LEFT}>
              <img src="/static/privacy.png" />
              </div>
            </section>

            
            <section css={STYLES_SECTION_MEDIA}>
              
                <div css={STYLES_SECTION_BACK}>
                  <Fade 
                    arrows={false} 
                    duration={2400} 
                    transitionDuration={800}     
                    pauseOnHover={false}
                  >
                    <div className="each-fade" css={STYLES_MEDIA}>
                    <img src={fadeImages[0]} />
                    </div>
                    <div className="each-fade"  css={STYLES_MEDIA}>
                    <img src={fadeImages[1]}/>
                    </div>
                    <div className="each-fade"  css={STYLES_MEDIA}>
                    <img src={fadeImages[2]}/>
                    </div>
                    <div className="each-fade"  css={STYLES_MEDIA}>
                    <img src={fadeImages[3]}/>
                    </div>
                    <div className="each-fade"  css={STYLES_MEDIA}>
                    <img src={fadeImages[4]}/>
                    </div>
                  </Fade>  
                </div>

                <div css={STYLES_SECTION_FRONT}>
                  <h1 css={STYLES_FOREGROUND_H1}>
                    Easily store any{" "}
                    <TextLoop interval={3200}>
                      <span>image</span>
                      <span>sound</span>
                      <span>code</span>
                      <span>text</span>
                      <span>URL</span>
                    </TextLoop>
                  </h1>
                  <h2 css={STYLES_FOREGROUND_H2}>
                    Slate is the first decentralized storage system made for everyone. You can store any form of information on Slate. 
                  </h2>
                </div>
            </section>
            

            <section css={STYLES_SECTION_FOREGROUND}>
              <h1>Making a Slate</h1>
              <h2>Slates give you rich previews and different layouts to view your files.</h2>
                {/* <div css={STYLES_VIEWS_TEXT}>
                <ul>
                    <li>
                        <a href="#">Create moodboards</a>
                        <img src="/static/slate-views-moodboard.png" alt=""/>
                    </li>
                    <li>
                        <a href="#">Organize research</a>
                        <img src="/static/slate-views-canvas.png" alt=""/>
                    </li>
                    <li>
                        <a href="#">Share presentations</a>
                        <img src="/static/slate-views-presentation.png" alt=""/>
                    </li>

                </ul>
                </div> */}
            </section>

            <section css={STYLES_SECTION_WHITE}>
              <h1>Share with</h1>
              <h2>Words about things</h2>
            </section>

            <section css={STYLES_SECTION_FOREGROUND}>
              <h1>Open Source</h1>
              <h2 css={STYLES_SECTION_TEXT}>"Collaboration makes better software". <br/><br/>Pair that with Filecoin's transparent marketplace as Slates's foundation. And you got yourself real nice power couple right there.</h2>
              <div css={STYLES_SECTION_SVG_CONTAINER}>
                <svg viewBox="-15 125 750 750" width="800" height="800">
                  <path css={STYLES_SVG_AN} stroke="#b2b2b2" fill="none" strokeWidth="3" strokeDasharray="1 1" pathLength="1"
                    d="m 398.40437,595.27818 c 40.32082,-14.97419 61.36968,-43.81349 61.36968,-93.44762 0,-49.63413 -41.82527,-93.37059 -94.0866,-93.45552 -55.14896,-0.0896 -96.75182,43.64 -96.0866,93.45552 0.66523,49.81551 24.42164,82.95509 62.44642,94.93898 L 264.68924,762.47972 C 174.536,739.14196 82.84508,632.78774 82.84508,501.83056 c 0,-155.10914 124.63284,-280.84993 280.84238,-280.84993 156.20954,0 282.84239,125.74079 282.84239,280.84993 0,132.99462 -90.82075,237.8649 -182.89748,261.11527 z"
                  />
                </svg>
              </div>
              <div css={STYLES_CONTR_CONTAINER}>
                <ul css={STYLES_CONTR_LIST}>
                  <li css={STYLES_CONTR_LI0}>Jimmylee<br/>github.com/jimmylee</li>
                  <li css={STYLES_CONTR_LI1}>Martinalong<br/>github.com/martinalong</li>
                  <li css={STYLES_CONTR_LI2}>William Felker<br/>github.com/gndclouds</li>
                  <li css={STYLES_CONTR_LI3}>Uonai<br/>github.com/uonai</li>
                </ul>
              </div>
            </section>
          <WebsitePrototypeFooter />
        </div>
      </WebsitePrototypeWrapper>
    );
  }
}