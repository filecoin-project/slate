import * as React from "react";
import * as Constants from "~/common/constants";
import * as Actions from "~/common/actions";
import * as System from "~/components/system";
import CodeBlock from "~/components/system/CodeBlock";
import ReactDOM from "react-dom";

import { css } from "@emotion/react";

import WebsitePrototypeWrapper from "~/components/core/WebsitePrototypeWrapper";
import WebsitePrototypeHeader from "~/components/core/NewWebsitePrototypeHeader";
import WebsitePrototypeFooter from "~/components/core/NewWebsitePrototypeFooter";

const STYLES_ROOT = css`
  display: flex;
  flex-direction: column;
  padding: 16px 88px;
  @media (max-width: ${Constants.sizes.tablet}px) {
    padding: 5px 10px;
  }
  @media (max-width: ${Constants.sizes.mobile}px) {
    padding: 5px 5px;
  }
`;

const STYLES_H1 = css`
  font-size: 1.953rem;
  line-height: 1.25;
  padding: 0px 0px 32px 0px;
  width: 100%;
  color: ${Constants.system.pitchBlack};
  @media (max-width: ${Constants.sizes.mobile}px) {
    font-size: 1.953rem;
    padding: 0px 0px 16px 0px;
    line-height: 1.25;
  }
`;

const STYLES_H2 = css`
  font-size: 1.25rem;
  line-height: 1.25;
  padding: 0px 0px 32px 0px;
  width: 100%;
  color: ${Constants.system.darkGray};
  @media (max-width: ${Constants.sizes.mobile}px) {
    font-size: 1.25rem;
    padding: 0px 0px 8px 0px;
    line-height: 1.5;
  }
`;

const STYLES_H3 = css`
  font-size: 1.563em;
  line-height: 1.5;
  padding: 0px 0px 16px 0px;
  color: ${Constants.system.darkGray};
  @media (max-width: ${Constants.sizes.mobile}px) {
    font-size: 1rem;
    padding: 0px 0px 8px 0px;
    line-height: 1.5;
    color: ${Constants.system.moonstone};
  }
`;

const STYLES_P = css`
  font-size: 1rem;
  color: ${Constants.system.black};
  @media (max-width: ${Constants.sizes.mobile}px) {
    font-size: 0.78rem;
  }
`;

const STYLES_A = css`
  :link {
    color: ${Constants.system.darkGray};
    background-color: transparent;
    text-decoration: none;
  }
  :hover {
    color: ${Constants.system.pitchBlack};
    background-color: transparent;
    text-decoration: none;
  }
  :active {
    color: yellow;
    background-color: transparent;
    text-decoration: none;
  }
  @media (max-width: ${Constants.sizes.mobile}px) {
  }
`;

const STYLES_IMG = css`
  width: 180px;
  border-radius: 4px;

  @media (max-width: ${Constants.sizes.mobile}px) {
  }
`;

const STYLES_BUTTON_PRIMARY = css`
  box-sizing: border-box;
  border-radius: 2px;
  outline: 0;
  border: 0;
  min-height: 40px;
  padding: 6px 24px 6px 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
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
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 10px auto;
  width: 100%;
  flex-wrap: wrap;
  @media (max-width: ${Constants.sizes.mobile}px) {
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
`;

const STYLES_SECTION_CHILD_FULL = css`
  width: 100%;
  @media (max-width: ${Constants.sizes.tablet}px) {
    width: 100%;
  }
  @media (max-width: ${Constants.sizes.mobile}px) {
    width: 100%;
    padding: 20px;
  }
`;
const STYLES_SECTION_CHILD_SPLIT = css`
  padding: 50px;
  width: 50%;
  @media (max-width: ${Constants.sizes.tablet}px) {
    width: 100%;
    padding: 20px;
  }
  @media (max-width: ${Constants.sizes.mobile}px) {
    width: 100%;
    padding: 20px;
  }
`;
const STYLES_CARD_NAME = css`
font-size: 1.3rem;
font-weight: 600;
letter-spacing: 0.002em;
text-align: center;
  @media (max-width: ${Constants.sizes.mobile}px) {

`;
const STYLES_CARD_GITHUB = css`
  font-size: 1rem;
  font-weight: 400;
  letter-spacing: 0.002em;
  text-align: center;
  @media (max-width: ${Constants.sizes.mobile}px) {
  }
`;
const STYLES_CARD_TEXT = css`
  padding: 20px 5px;
  color: ${Constants.system.pitchBlack};
  :hover {
  }
  @media (max-width: ${Constants.sizes.mobile}px) {
  }
`;
const STYLES_CARD_WRAPPER = css`
  float: left;
  width: 150px;
  transition: 200ms ease box-shadow;
  border-radius: 4px;
  margin: 20px 40px;
  @media (max-width: ${Constants.sizes.tablet}px) {
    width: 100%;
    padding: 20px;
  }
  @media (max-width: ${Constants.sizes.mobile}px) {
    width: 100%;
    padding: 20px;
  }
`;

export const getServerSideProps = async context => {
  return {
    props: { ...context.query }
  };
};

export default class CommunityPage extends React.Component {
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
        <WebsitePrototypeHeader color="dark" />
        <div css={STYLES_ROOT}>
          <div css={STYLES_SECTION_WRAPPER}>
            <div css={STYLES_SECTION_CHILD_FULL}>
              <h1 css={STYLES_H1}>
                Slate is designed and built by a growing community of hackers,
                artists, and creatives on the web.
              </h1>
            </div>
            <div css={STYLES_SECTION_CHILD_FULL}>
              <img
                css={STYLES_IMG}
                src=" https://bafybeihi2f53tmtwxv5f5jd2wcxtzrutgvxg5xsawfv3ousfjz2yfurm2i.ipfs.slate.textile.io"
                alt="Slate browser extension"
              />
            </div>
          </div>

          <div css={STYLES_SECTION_WRAPPER}>
            <div css={STYLES_SECTION_CHILD_FULL}>
              <h1 css={STYLES_H1}>Core Team</h1>
              <br />
              <div css={STYLES_CARD_WRAPPER}>
                <a href="https://github.com/jasonleyser">
                  <System.HoverTile
                    height={300}
                    width={200}
                    style={{ padding: 10 }}
                  >
                    <div>
                      <img
                        css={STYLES_IMG}
                        alt="Github Profile Photo for Jason Leyser"
                        src="https://bafkreie3dvujhpil4tgv2qx2lng5bfeif7reyybmgaftub6n4wxx4vnbly.ipfs.slate.textile.io"
                      />
                    </div>
                    <div css={STYLES_CARD_TEXT}>
                      <p css={STYLES_CARD_NAME}>Jason Leyser</p>
                      <p css={STYLES_CARD_GITHUB}>@jasonleyser</p>
                    </div>
                  </System.HoverTile>
                </a>
              </div>
              <div css={STYLES_CARD_WRAPPER}>
                <a href="https://github.com/jimmylee">
                  <System.HoverTile
                    height={300}
                    width={200}
                    style={{ padding: 10 }}
                  >
                    <div>
                      <img
                        css={STYLES_IMG}
                        alt="Github Profile Photo for Cake"
                        src="https://bafkreibfbxpiypzw4t7ubvjsxac7z3fdigvran5sayp2ibbuxhvzeivn4a.ipfs.slate.textile.io"
                      />
                    </div>
                    <div css={STYLES_CARD_TEXT}>
                      <p css={STYLES_CARD_NAME}>Cake</p>
                      <p css={STYLES_CARD_GITHUB}>@jimmylee</p>
                    </div>
                  </System.HoverTile>
                </a>
              </div>
              <div css={STYLES_CARD_WRAPPER}>
                <a href="https://github.com/martinalong">
                  <System.HoverTile
                    height={300}
                    width={200}
                    style={{ padding: 10 }}
                  >
                    <div>
                      <img
                        css={STYLES_IMG}
                        alt="Github Profile Photo for Martina Long"
                        src="https://bafkreif4mdwcxtykrcl2sfs6kcapg3d2tjyjjpcpmxnw3rqshbvr5ncjdi.ipfs.slate.textile.io"
                      />
                    </div>
                    <div css={STYLES_CARD_TEXT}>
                      <p css={STYLES_CARD_NAME}>Martina Long</p>
                      <p css={STYLES_CARD_GITHUB}>@martinalong</p>
                    </div>
                  </System.HoverTile>
                </a>
              </div>
              <div css={STYLES_CARD_WRAPPER}>
                <a href="https://github.com/harisbutt">
                  <System.HoverTile
                    height={300}
                    width={200}
                    style={{ padding: 10 }}
                  >
                    <div>
                      <img
                        css={STYLES_IMG}
                        alt="Github Profile Photo for Haris Butt"
                        src="https://bafkreigs2w7wsambbek5v5e4ykkoketj6r6ho6t3snm7jso7hodyzxbqfu.ipfs.slate.textile.io"
                      />
                    </div>
                    <div css={STYLES_CARD_TEXT}>
                      <p css={STYLES_CARD_NAME}>Haris Butt</p>
                      <p css={STYLES_CARD_GITHUB}>@harisbutt</p>
                    </div>
                  </System.HoverTile>
                </a>
              </div>
              <div css={STYLES_CARD_WRAPPER}>
                <a href="https://github.com/tarafanlin">
                  <System.HoverTile
                    height={300}
                    width={200}
                    style={{ padding: 10 }}
                  >
                    <div>
                      <img
                        css={STYLES_IMG}
                        alt="Github Profile Photo for Tara Lin"
                        src="https://bafkreibku3qhls572oo4hskrg4t32c2kcj4auujyxioz5i44pfbaatwqbe.ipfs.slate.textile.io"
                      />
                    </div>
                    <div css={STYLES_CARD_TEXT}>
                      <p css={STYLES_CARD_NAME}>Tara Lin</p>
                      <p css={STYLES_CARD_GITHUB}>@tarafanlin</p>
                    </div>
                  </System.HoverTile>
                </a>
              </div>
              <div css={STYLES_CARD_WRAPPER}>
                <a href="https://github.com/gndclouds">
                  <System.HoverTile
                    height={300}
                    width={200}
                    style={{ padding: 10 }}
                  >
                    <div>
                      <img
                        css={STYLES_IMG}
                        alt="Github Profile Photo for William Felker"
                        src="https://bafybeic25subftulrkrxrw2ggpjblamofj3uemi2vaoqmlqzyzg2lfji5q.ipfs.slate.textile.io"
                      />
                    </div>
                    <div css={STYLES_CARD_TEXT}>
                      <p css={STYLES_CARD_NAME}>William Felker</p>
                      <p css={STYLES_CARD_GITHUB}>@gndclouds</p>
                    </div>
                  </System.HoverTile>
                </a>
              </div>
            </div>
          </div>
          <div css={STYLES_SECTION_WRAPPER}>
            <div css={STYLES_SECTION_CHILD_FULL}>
              <h1 css={STYLES_H1}>Contributors</h1>
              <br />
              <div css={STYLES_CARD_WRAPPER}>
                <a href="https://github.com/pooja">
                  <System.HoverTile
                    height={300}
                    width={200}
                    style={{ padding: 10 }}
                  >
                    <div>
                      <img
                        css={STYLES_IMG}
                        alt="Github Profile Photo for Pooja Shah"
                        src="https://bafkreifqrmwuvlky7urkmkxyswksyjjpxvk62jwqgol35bfdfshgmcjmba.ipfs.slate.textile.io/"
                      />
                    </div>
                    <div css={STYLES_CARD_TEXT}>
                      <p css={STYLES_CARD_NAME}>Pooja Shah</p>
                      <p css={STYLES_CARD_GITHUB}>@pooja</p>
                    </div>
                  </System.HoverTile>
                </a>
              </div>
              <div css={STYLES_CARD_WRAPPER}>
                <a href="https://github.com/whyrusleeping">
                  <System.HoverTile
                    height={300}
                    width={200}
                    style={{ padding: 10 }}
                  >
                    <div>
                      <img
                        css={STYLES_IMG}
                        alt="Github Profile Photo for Why"
                        src="https://bafkreiczwqnp5c6msa42pihhobagcbq6r5lkxuucmm3rmccb5lh46x3h7u.ipfs.slate.textile.io"
                      />
                    </div>
                    <div css={STYLES_CARD_TEXT}>
                      <p css={STYLES_CARD_NAME}>Pooja Shah</p>
                      <p css={STYLES_CARD_GITHUB}>@pooja</p>
                    </div>
                  </System.HoverTile>
                </a>
              </div>
              <div css={STYLES_CARD_WRAPPER}>
                <a href="https://github.com/asutula">
                  <System.HoverTile
                    height={300}
                    width={200}
                    style={{ padding: 10 }}
                  >
                    <div>
                      <img
                        css={STYLES_IMG}
                        alt="Github Profile Photo for Aaron Sutula"
                        src="https://bafkreihl4pll4esqivugvam7d7j6oxbms4kz6c3azq77vf2ittwuon2dy4.ipfs.slate.textile.io"
                      />
                    </div>
                    <div css={STYLES_CARD_TEXT}>
                      <p css={STYLES_CARD_NAME}>Aaron Sutula</p>
                      <p css={STYLES_CARD_GITHUB}>@asutula</p>
                    </div>
                  </System.HoverTile>
                </a>
              </div>
              <div css={STYLES_CARD_WRAPPER}>
                <a href="https://github.com/jsign">
                  <System.HoverTile
                    height={300}
                    width={200}
                    style={{ padding: 10 }}
                  >
                    <div>
                      <img
                        css={STYLES_IMG}
                        alt="Github Profile Photo for Ignacio Hagopian"
                        src="https://bafkreieqpfn4bpqv3yrdr22surdngc3xyn574miybm3awjosfu6fcmbd6a.ipfs.slate.textile.io"
                      />
                    </div>
                    <div css={STYLES_CARD_TEXT}>
                      <p css={STYLES_CARD_NAME}>Ignacio Hagopian</p>
                      <p css={STYLES_CARD_GITHUB}>@jsign</p>
                    </div>
                  </System.HoverTile>
                </a>
              </div>
              <div css={STYLES_CARD_WRAPPER}>
                <a href="https://github.com/sanderpick">
                  <System.HoverTile
                    height={300}
                    width={200}
                    style={{ padding: 10 }}
                  >
                    <div>
                      <img
                        css={STYLES_IMG}
                        alt="Github Profile Photo for Sander Pick"
                        src="https://bafkreial7bum4chyd2rubvxkyufis4qczvb7xerrzis7eg6gyshbf7ltci.ipfs.slate.textile.io"
                      />
                    </div>
                    <div css={STYLES_CARD_TEXT}>
                      <p css={STYLES_CARD_NAME}>Sander Pick</p>
                      <p css={STYLES_CARD_GITHUB}>@sanderpick</p>
                    </div>
                  </System.HoverTile>
                </a>
              </div>
              <div css={STYLES_CARD_WRAPPER}>
                <a href="https://github.com/andrewxhill">
                  <System.HoverTile
                    height={300}
                    width={200}
                    style={{ padding: 10 }}
                  >
                    <div>
                      <img
                        css={STYLES_IMG}
                        alt="Github Profile Photo for Andrew Hill"
                        src="https://bafkreighz4m7bqjmt7cidgbbocbzp65f4liuzebwq6d64t27slhpe2cigm.ipfs.slate.textile.io"
                      />
                    </div>
                    <div css={STYLES_CARD_TEXT}>
                      <p css={STYLES_CARD_NAME}>Andrew Hill</p>
                      <p css={STYLES_CARD_GITHUB}>@andrewxhill</p>
                    </div>
                  </System.HoverTile>
                </a>
              </div>
              <div css={STYLES_CARD_WRAPPER}>
                <a href="https://github.com/akuokojnr">
                  <System.HoverTile
                    height={300}
                    width={200}
                    style={{ padding: 10 }}
                  >
                    <div>
                      <img
                        css={STYLES_IMG}
                        alt="Github Profile Photo for Akuoko Daniel Jnr"
                        src="https://bafkreibpqkmnm6vijyxlkbcjyayoo7b6tnf4tzelzsi4wk3z6o7enhpbrm.ipfs.slate.textile.io"
                      />
                    </div>
                    <div css={STYLES_CARD_TEXT}>
                      <p css={STYLES_CARD_NAME}>Akuoko Daniel Jnr</p>
                      <p css={STYLES_CARD_GITHUB}>@akuokojnr</p>
                    </div>
                  </System.HoverTile>
                </a>
              </div>

              <div css={STYLES_CARD_WRAPPER}>
                <a href="https://github.com/narative">
                  <System.HoverTile
                    height={300}
                    width={200}
                    style={{ padding: 10 }}
                  >
                    <div>
                      <img
                        css={STYLES_IMG}
                        alt="Github Profile Photo for Narative"
                        src="https://bafkreihgmyxi2rzp4gtkoxwkrajiwivrbttixfjrdfb6qz5fhpdaofrhoi.ipfs.slate.textile.io"
                      />
                    </div>
                    <div css={STYLES_CARD_TEXT}>
                      <p css={STYLES_CARD_NAME}>Narative</p>
                      <p css={STYLES_CARD_GITHUB}>@narative</p>
                    </div>
                  </System.HoverTile>
                </a>
              </div>
              <div css={STYLES_CARD_WRAPPER}>
                <a href="https://github.com/narative">
                  <System.HoverTile
                    height={300}
                    width={200}
                    style={{ padding: 10 }}
                  >
                    <div>
                      <img
                        css={STYLES_IMG}
                        alt="Github Profile Photo for Colin S. Mccaleb"
                        src="https://bafkreigxhplpm7adi3p77eljj3g66lcnnzig7m6ihpervxwqeti3tbqudi.ipfs.slate.textile.io"
                      />
                    </div>
                    <div css={STYLES_CARD_TEXT}>
                      <p css={STYLES_CARD_NAME}>Colin S. McCaleb</p>
                      <p css={STYLES_CARD_GITHUB}>@uonai</p>
                    </div>
                  </System.HoverTile>
                </a>
              </div>
            </div>
          </div>
          <div css={STYLES_SECTION_WRAPPER}>
            <div css={STYLES_SECTION_CHILD_FULL}>
              <h1 css={STYLES_H1}>Get involved</h1>
              <p css={STYLES_P}>
                Slate is a fully open-source file sharing network designed for
                research and collaboration.
              </p>
            </div>
            <div css={STYLES_SECTION_CHILD_SPLIT}>
              <h2 css={STYLES_H2}>Contribute</h2>
              <br />
              <p css={STYLES_P}>
                Get involved with the project and contribute.
              </p>
              <br />

              <button css={STYLES_BUTTON_PRIMARY}>
                <a>Github</a>
              </button>
            </div>
            <div css={STYLES_SECTION_CHILD_SPLIT}>
              <h2 css={STYLES_H2}>Contact</h2>
              <br />
              <p css={STYLES_P}>
                {" "}
                Reach out to any of the core contributors, reach us on Twitter,
                or join our Slack.
              </p>
              <br />

              <button css={STYLES_BUTTON_PRIMARY}>
                <a>Github</a>
              </button>
            </div>
            <div css={STYLES_SECTION_CHILD_SPLIT}>
              <h2 css={STYLES_H2}>Integrate</h2>
              <br />
              <p css={STYLES_P}>
                Explore our API and SDK and build on top of Slate.
              </p>

              <br />
              <CodeBlock>npm install --save slate-react-system</CodeBlock>
            </div>
            <br />
            <div css={STYLES_SECTION_CHILD_SPLIT}>
              <h2 css={STYLES_H2}>Design System</h2>
              <p css={STYLES_P}>
                Check out our open source design system for your projects.
              </p>

              <br />
              <CodeBlock>npm install --save slate-react-system</CodeBlock>
            </div>
          </div>
        </div>
        <WebsitePrototypeFooter />
      </WebsitePrototypeWrapper>
    );
  }
}
