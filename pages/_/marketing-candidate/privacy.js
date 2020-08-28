import React, { useRef, useState } from "react";
import * as Constants from "~/common/constants";
import * as Actions from "~/common/actions";
import * as System from "~/components/system";

import { css } from "@emotion/react";

import WebsitePrototypeWrapper from "~/components/core/WebsitePrototypeWrapper";
import WebsitePrototypeHeader from "~/components/core/WebsitePrototypeHeader";
import WebsitePrototypeFooter from "~/components/core/NewWebsitePrototypeFooter";

const STYLES_ROOT = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  section {
    padding: 150px;
  }
  @media (max-width: ${Constants.sizes.mobile}px) {
  }
`;
const STYLES_COPY_EMAIL = css`
  display: inline;
`;

export const getServerSideProps = async context => {
  return {
    props: { ...context.query }
  };
};
export function CopyEmail() {
  const [copySuccess, setCopySuccess] = useState("");

  function copyToClipboard() {
    navigator.clipboard.writeText("abuse@filecoin.io");
    setCopySuccess("Copied!");
  }
  return (
    <div css={STYLES_COPY_EMAIL}>
      <a onClick={copyToClipboard}>abuse@filecoin.io</a>
      {copySuccess}
    </div>
  );
}

export default class IndexPage extends React.Component {
  async componentDidMount() {
    const response = await Actions.health();
    console.log("HEALTH_CHECK", response);
  }

  render() {
    const title = `Slate`;
    const description =
      "The place for all of your assets. Powered by Textile and Filecoin.";
    const url = "https://slate.host/privacy";
    return (
      <WebsitePrototypeWrapper
        title={title}
        description={description}
        url={url}
      >
        <WebsitePrototypeHeader />
        <div css={STYLES_ROOT}>
          <section>
            <System.H1>Slate Guidelines and Terms of Service</System.H1>
            <br />
            <System.P>
              We believe that our mission is best served in an environment that
              is friendly, safe, and accepting; free from intimidation or
              harassment. Towards this end, certain behaviors and practices will
              not be tolerated.
            </System.P>
            <br />
            <System.UL>
              <System.LI>Be respectful.</System.LI>
              <System.LI>
                We're here to help: <CopyEmail />
              </System.LI>
              <System.LI>Abusive behavior is never tolerated.</System.LI>
              <System.LI>
                Violations of this code may result in swift and permanent
                expulsion from the Slate community.
              </System.LI>
              <System.LI>
                "Too long, didn't read" is not a valid excuse for not knowing
                what is in this document.
              </System.LI>
            </System.UL>
            <br />
            <System.P>
              We expect all members of the Slate community to abide by this Code
              of Conduct at all times in all Slate community venues, online and
              in person, and in one-on-one communications pertaining to Slate
              affairs.
            </System.P>

            <br />
            <System.P>
              This policy covers the usage of Filecoin public infrastructure, as
              well as other Filecoin websites, Filecoin related events, and any
              other services offered by or on behalf of the Filecoin community.
              It also applies to behavior in the context of the Filecoin Open
              Source project communities, including but not limited to public
              GitHub repositories, IRC channels, social media, mailing lists,
              and public events.
            </System.P>
            <br />

            <System.P>
              The definitions of various subjective terms such as
              "discriminatory", "hateful", or "confusing" will be decided at the
              sole discretion of the Filecoin abuse team.
            </System.P>
            <br />
            <br />
            <System.H2>Friendly Harassment-Free Space</System.H2>
            <br />
            <System.P>
              We are committed to providing a friendly, safe and welcoming
              environment for all, regardless of gender identity, sexual
              orientation, disability, ethnicity, religion, age, physical
              appearance, body size, race, or similar personal
              characteristics.We ask that you please respect that people have
              differences of opinion regarding technical choices, and that every
              design or implementation choice carries a trade-off and numerous
              costs. There is seldom a single right answer. A difference of
              technology preferences is not a license to be rude.{" "}
            </System.P>
            <br />
            <System.P>
              Any spamming, trolling, flaming, baiting, or other
              attention-stealing behavior is not welcome, and will not be
              tolerated. Harassing other users is never tolerated, whether via
              public or private media. Avoid using offensive or harassing
              nicknames, or other identifiers that might detract from a
              friendly, safe, and welcoming environment for all.{" "}
            </System.P>
            <br />
            <System.P>
              Harassment includes, but is not limited to: harmful or prejudicial
              verbal or written comments related to gender identity, sexual
              orientation, disability, ethnicity, religion, age, physical
              appearance, body size, race, or similar personal characteristics;
              inappropriate use of nudity, sexual images, and/or sexually
              explicit language in public spaces; threats of physical or
              non-physical harm; deliberate intimidation, stalking or following;
              harassing photography or recording; sustained disruption of talks
              or other events; inappropriate physical contact; and unwelcome
              sexual attention.{" "}
            </System.P>
            <br />
            <System.P>
              Media shared through public infrastructure run by the Filecoin
              team must not contain illegal or infringing content. You should
              only publish content via Filecoin public infrastructure if you
              have the right to do so. This include complying with all software
              license agreements or other intellectual property restrictions.
              You will be solely responsible for any violation of laws or
              others' intellectual property rights.
            </System.P>
            <br />
            <System.H2>Avoid Marketing or Soliciting</System.H2>
            <br />
            <System.P>
              You are welcome to post endorsements of tools, products or
              services that you personally find useful, but please refrain from
              blatant advertising, marketing or any kind of spam. Selling
              commercial services or fundraising is not allowed.
            </System.P>
            <br />
            <br />
            <System.H2>Reporting Violations of this Code of Conduct</System.H2>
            <br />
            <System.P>
              If you believe someone is harassing you or has otherwise violated
              this Code of Conduct, please contact us at <CopyEmail /> to send
              us an abuse report. If this is the initial report of a problem,
              please include as much detail as possible. It is easiest for us to
              address issues when we have more context.
            </System.P>
            <br />
            <br />
            <System.H2>Copyright Violations</System.H2>
            <br />
            <System.P>
              We respect the intellectual property of others and ask that you do
              too. If you believe any content or other materials available
              through public Filecoin infrastructure violates a copyright held
              by you and you would like to submit a notice pursuant to the
              Digital Millennium Copyright Act or other similar international
              law, you can submit a notice to our agent for service of notice
              to: <CopyEmail />. Please make sure your notice meets the Digital
              Millennium Copyright Act requirements.
            </System.P>
            <br />
            <br />
            <System.H2>Consequences</System.H2>
            <br />
            <System.P>
              All content published to public Filecoin infrastructure is hosted
              at the sole discretion of the Filecoin team. Unacceptable behavior
              from any community member will not be tolerated. Anyone asked to
              stop unacceptable behavior is expected to comply immediately. If a
              community member engages in unacceptable behavior, the Filecoin
              team may take any action they deem appropriate, up to and
              including a temporary ban or permanent expulsion from the
              community without warning (and without refund in the case of a
              paid event or service).
            </System.P>
            <br />
            <br />
            <System.H2>Addressing Grievances</System.H2>
            <br />
            <System.P>
              Please contact <CopyEmail /> if you need to report a problem or
              address a grievance related to an abuse report. If you feel you
              have been falsely or unfairly accused of violating this Code of
              Conduct, you should contact <CopyEmail />. We will do our best to
              ensure that your grievance is handled appropriately. In general,
              we will choose the course of action that we judge as being most in
              the interest of fostering a safe and friendly community.
            </System.P>
            <br />
            <br />
            <System.H2>Contact Info</System.H2>
            <br />
            <System.P>
              Please contact <CopyEmail /> if you need to report a problem or
              address a grievance related to an abuse report. You are also
              encouraged to contact us if you are curious about something that
              might be "on the line" between appropriate and inappropriate
              content. We are happy to provide guidance to help you be a
              successful part of our community.
            </System.P>
            <br />
            <br />
            <System.H2>Changes</System.H2>
            <br />
            <System.P>
              This is a living document and may be updated from time to time.
              Please refer to the{" "}
              <a
                href="https://github.com/filecoin-project/slate/commits/main"
                alt="GitHub Changelog"
              >
                git history
              </a>{" "}
              for this document to view the changes.
            </System.P>
            <br />
            <br />
            <System.H2>Credit and License</System.H2>
            <br />
            <System.P>
              This Code of Conduct is based on the{" "}
              <a href="https://www.npmjs.com/policies/conduct">
                npm Code of Conduct
              </a>
              . This document may be reused under a{" "}
              <a href="http://creativecommons.org/licenses/by-sa/4.0/">
                Creative Commons Attribution-ShareAlike License
              </a>
              .
            </System.P>
          </section>
        </div>
        <WebsitePrototypeFooter />
      </WebsitePrototypeWrapper>
    );
  }
}
