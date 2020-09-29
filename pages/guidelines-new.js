import React, { useState } from "react";
import * as System from "~/components/system";
import * as Constants from "~/common/constants";

import { css } from "@emotion/react";

import WebsitePrototypeWrapper from "~/components/core/WebsitePrototypeWrapper";
import WebsitePrototypeHeader from "~/components/core/NewWebsitePrototypeHeader";
import WebsitePrototypeFooter from "~/components/core/NewWebsitePrototypeFooter";

const STYLES_ROOT = css`
  padding: 88px 88px 128px 88px;
  width: 100%;
  margin: 0 auto;

  @media (max-width: ${Constants.sizes.mobile}px) {
    display: block;
    padding: 24px 24px 88px 24px;
  }
`;

const STYLES_H1 = css`
  width: 30%;
  font-size: ${Constants.typescale.lvl5};
  font-family: ${Constants.font.medium};
  font-weight: 400;
  line-height: 1.3;
  padding: 0px 0px 16px 0px;
  letter-spacing: -0.021rem;
  width: 100%;
  color: ${Constants.system.slate};

  @media (max-width: ${Constants.sizes.tablet}px) {
    font-size: ${Constants.typescale.lvl4};
  }

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
  margin-top: 24px;
  width: 100%;
  color: ${Constants.system.slate};

  @media (max-width: ${Constants.sizes.tablet}px) {
    font-size: ${Constants.typescale.lvl2};
  }
`;

const STYLES_CONTENT_BLOCK1 = css`
  width: 30%;
  position: -webkit-sticky;
  position: sticky;
  top: 80px;

  @media (max-width: ${Constants.sizes.mobile}px) {
    position: relative;
    top: 0;
    width: 100%;
  }
`;

const STYLES_CONTENT_BLOCK2 = css`
  margin: -264px 0 0 auto;
  width: 66%;

  @media (max-width: ${Constants.sizes.mobile}px) {
    margin: 48px 0 0 0;
    width: 100%;
  }
`;

const STYLES_LIST = css`
  list-style-type: none;
  font-family: ${Constants.font.text};
  font-weight: 400;
  font-size: ${Constants.typescale.lvl1};
  letter-spacing: -0.011rem;
  line-height: 1.5;
  margin: 4px 0 0 16px;
  opacity: 0.7;
  padding: 0;
`;

const STYLES_LINK = css`
  text-decoration: none;
  transition: 200ms ease none;
  color: ${Constants.system.slate};

  :hover {
    color: ${Constants.system.newBlue};
  }
  :active {
    color: ${Constants.system.newBlue};
  }
  :visited {
    color: ${Constants.system.slate};
  }
`;

const STYLES_COPY_EMAIL = css`
  display: inline;
  color: ${Constants.system.newGreen};
`;

export function CopyEmail() {
  const [copySuccess, setCopySuccess] = useState("");

  function copyToClipboard() {
    navigator.clipboard.writeText("abuse@filecoin.io");
    setCopySuccess("  copied!");
  }
  return (
    <div css={STYLES_COPY_EMAIL}>
      <a onClick={copyToClipboard}>abuse@filecoin.io</a>
      {copySuccess}
    </div>
  );
}

export default class GuidelinesPage extends React.Component {
  render() {
    const title = `Slate: Terms of Service`;
    const description = "You must agree to our terms of service to use Slate.";
    const url = "https://slate.host/guidelines-new";

    return (
      <WebsitePrototypeWrapper title={title} description={description} url={url}>
        <WebsitePrototypeHeader />
        <div css={STYLES_ROOT}>
          <div css={STYLES_CONTENT_BLOCK1}>
            <h1 css={STYLES_H1}> 💙</h1>
            <h1 css={STYLES_H1}> Community Guidelines</h1>
            <br />
            <System.P>In this page</System.P>
            <ul css={STYLES_LIST}>
              <li>
                <a css={STYLES_LINK} href="#Friendly Harassment-Free Space">
                  Friendly Harassment-Free Space
                </a>
              </li>
              <li>
                <a css={STYLES_LINK} href="#Avoid Marketing or Soliciting">
                  Avoid Marketing or Soliciting
                </a>
              </li>
              <li>
                <a css={STYLES_LINK} href="#Reporting Violations of this Code of Conduct">
                  Reporting Violations of this Code of Conduct
                </a>
              </li>
              <li>
                <a css={STYLES_LINK} href="#Copyright Violations">
                  Copyright Violations
                </a>
              </li>
              <li>
                <a css={STYLES_LINK} href="#Consequences">
                  Consequences
                </a>
              </li>
              <li>
                <a css={STYLES_LINK} href="#Addressing Grievances">
                  Addressing Grievances
                </a>
              </li>
              <li>
                <a css={STYLES_LINK} href="#Contact Info">
                  Contact Info
                </a>
              </li>
              <li>
                <a css={STYLES_LINK} href="#Changes">
                  Changes
                </a>
              </li>
              <li>
                <a css={STYLES_LINK} href="#Credit and License">
                  Credit and License
                </a>
              </li>
            </ul>
          </div>
          <br />
          <div css={STYLES_CONTENT_BLOCK2}>
            <System.P>
              We believe that our mission is best served in an environment that is friendly, safe, and accepting; free
              from intimidation or harassment. Towards this end, certain behaviors and practices will not be tolerated.
            </System.P>
            <br />
            <System.UL>
              <System.LI>Be respectful.</System.LI>
              <System.LI>
                We're here to help: <CopyEmail />
              </System.LI>
              <System.LI>Abusive behavior is never tolerated.</System.LI>
              <System.LI>
                Violations of this code may result in swift and permanent expulsion from the Slate community.
              </System.LI>
              <System.LI>
                "Too long, didn't read" is not a valid excuse for not knowing what is in this document.
              </System.LI>
            </System.UL>
            <br />
            <System.P>
              We expect all members of the Slate community to abide by this Code of Conduct at all times in all Slate
              community venues, online and in person, and in one-on-one communications pertaining to Slate affairs.
            </System.P>

            <br />
            <System.P>
              This policy covers the usage of Filecoin public infrastructure, as well as other Filecoin websites,
              Filecoin related events, and any other services offered by or on behalf of the Filecoin community. It also
              applies to behavior in the context of the Filecoin Open Source project communities, including but not
              limited to public GitHub repositories, IRC channels, social media, mailing lists, and public events.
            </System.P>
            <br />

            <System.P>
              The definitions of various subjective terms such as "discriminatory", "hateful", or "confusing" will be
              decided at the sole discretion of the Filecoin abuse team.
            </System.P>
            <div id="Friendly Harassment-Free Space">
              <br />
              <br />
              <h2 css={STYLES_H2}>Friendly Harassment-Free Space</h2>
              <br />
              <System.P>
                We are committed to providing a friendly, safe and welcoming environment for all, regardless of gender
                identity, sexual orientation, disability, ethnicity, religion, age, physical appearance, body size,
                race, or similar personal characteristics.We ask that you please respect that people have differences of
                opinion regarding technical choices, and that every design or implementation choice carries a trade-off
                and numerous costs. There is seldom a single right answer. A difference of technology preferences is not
                a license to be rude.{" "}
              </System.P>
              <br />
              <System.P>
                Any spamming, trolling, flaming, baiting, or other attention-stealing behavior is not welcome, and will
                not be tolerated. Harassing other users is never tolerated, whether via public or private media. Avoid
                using offensive or harassing nicknames, or other identifiers that might detract from a friendly, safe,
                and welcoming environment for all.{" "}
              </System.P>
              <br />
              <System.P>
                Harassment includes, but is not limited to: harmful or prejudicial verbal or written comments related to
                gender identity, sexual orientation, disability, ethnicity, religion, age, physical appearance, body
                size, race, or similar personal characteristics; inappropriate use of nudity, sexual images, and/or
                sexually explicit language in public spaces; threats of physical or non-physical harm; deliberate
                intimidation, stalking or following; harassing photography or recording; sustained disruption of talks
                or other events; inappropriate physical contact; and unwelcome sexual attention.{" "}
              </System.P>
              <br />
              <System.P>
                Media shared through public infrastructure run by the Filecoin team must not contain illegal or
                infringing content. You should only publish content via Filecoin public infrastructure if you have the
                right to do so. This include complying with all software license agreements or other intellectual
                property restrictions. You will be solely responsible for any violation of laws or others' intellectual
                property rights.
              </System.P>
            </div>
            <div id="Avoid Marketing or Soliciting">
              <br />
              <br />
              <h2 css={STYLES_H2}>Avoid Marketing or Soliciting</h2>
              <br />
              <System.P>
                You are welcome to post endorsements of tools, products or services that you personally find useful, but
                please refrain from blatant advertising, marketing or any kind of spam. Selling commercial services or
                fundraising is not allowed.
              </System.P>
            </div>
            <div id="Reporting Violations of this Code of Conduct">
              <br />
              <br />
              <h2 css={STYLES_H2}>Reporting Violations of this Code of Conduct</h2>
              <br />
              <System.P>
                If you believe someone is harassing you or has otherwise violated this Code of Conduct, please contact
                us at <CopyEmail /> to send us an abuse report. If this is the initial report of a problem, please
                include as much detail as possible. It is easiest for us to address issues when we have more context.
              </System.P>
            </div>
            <div id="Copyright Violations">
              <br />
              <br />
              <h2 css={STYLES_H2}>Copyright Violations</h2>
              <br />
              <System.P>
                We respect the intellectual property of others and ask that you do too. If you believe any content or
                other materials available through public Filecoin infrastructure violates a copyright held by you and
                you would like to submit a notice pursuant to the Digital Millennium Copyright Act or other similar
                international law, you can submit a notice to our agent for service of notice to: <CopyEmail />. Please
                make sure your notice meets the Digital Millennium Copyright Act requirements.
              </System.P>
            </div>
            <div id="Consequences">
              <br />
              <br />
              <h2 css={STYLES_H2}>Consequences</h2>
              <br />
              <System.P>
                All content published to public Filecoin infrastructure is hosted at the sole discretion of the Filecoin
                team. Unacceptable behavior from any community member will not be tolerated. Anyone asked to stop
                unacceptable behavior is expected to comply immediately. If a community member engages in unacceptable
                behavior, the Filecoin team may take any action they deem appropriate, up to and including a temporary
                ban or permanent expulsion from the community without warning (and without refund in the case of a paid
                event or service).
              </System.P>
            </div>
            <div id="Addressing Grievances">
              <br />
              <br />
              <h2 css={STYLES_H2}>Addressing Grievances</h2>
              <br />
              <System.P>
                Please contact <CopyEmail /> if you need to report a problem or address a grievance related to an abuse
                report. If you feel you have been falsely or unfairly accused of violating this Code of Conduct, you
                should contact <CopyEmail />. We will do our best to ensure that your grievance is handled
                appropriately. In general, we will choose the course of action that we judge as being most in the
                interest of fostering a safe and friendly community.
              </System.P>
            </div>
            <div id="Contact Info">
              <br />
              <br />
              <h2 css={STYLES_H2}>Contact Info</h2>
              <br />
              <System.P>
                Please contact <CopyEmail /> if you need to report a problem or address a grievance related to an abuse
                report. You are also encouraged to contact us if you are curious about something that might be "on the
                line" between appropriate and inappropriate content. We are happy to provide guidance to help you be a
                successful part of our community.
              </System.P>
            </div>
            <div id="Changes">
              <br />
              <br />
              <h2 css={STYLES_H2}>Changes</h2>
              <br />
              <System.P>
                This is a living document and may be updated from time to time. Please refer to the{" "}
                <a
                  href="https://github.com/filecoin-project/slate/blob/main/pages/guidelines.js"
                  alt="GitHub Changelog"
                >
                  git history
                </a>{" "}
                for this document to view the changes.
              </System.P>
            </div>
            <div id="Credit and License">
              <br />
              <br />
              <h2 css={STYLES_H2}>Credit and License</h2>
              <br />
              <System.P>
                This Code of Conduct is based on the{" "}
                <a href="https://www.npmjs.com/policies/conduct">npm Code of Conduct</a>. This document may be reused
                under a{" "}
                <a href="http://creativecommons.org/licenses/by-sa/4.0/">
                  Creative Commons Attribution-ShareAlike License
                </a>
                .
              </System.P>
            </div>
          </div>
        </div>
        <WebsitePrototypeFooter />
      </WebsitePrototypeWrapper>
    );
  }
}
