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
  margin: -280px 0 0 auto;
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
`;

export const getServerSideProps = async (context) => {
  return {
    props: { ...context.query },
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

export default class GuidelinesPage extends React.Component {
  render() {
    const title = `Slate: Terms of Service`;
    const description = "You must agree to our terms of service to use Slate.";
    const url = "https://slate.host/terms-new";

    return (
      <WebsitePrototypeWrapper title={title} description={description} url={url}>
        <WebsitePrototypeHeader />
        <div css={STYLES_ROOT}>
          <div css={STYLES_CONTENT_BLOCK1}>
            <h1 css={STYLES_H1}> 📑 </h1>
            <h1 css={STYLES_H1}> Terms of Service</h1>
            <br />
            <System.P>In this page</System.P>
            <ul css={STYLES_LIST}>
              <li>
                <a css={STYLES_LINK} href="#Storage Deals to the Filecoin Network">
                  Storage Deals to the Filecoin Network
                </a>
              </li>
              <li>
                <a css={STYLES_LINK} href="#Your Slate Account and Site">
                  Your Slate Account and Site
                </a>
              </li>
              <li>
                <a css={STYLES_LINK} href="#Responsibility of Contributors">
                  Responsibility of Contributors
                </a>
              </li>
              <li>
                <a css={STYLES_LINK} href="#Changes">
                  Changes
                </a>
              </li>
              <li>
                <a css={STYLES_LINK} href="#Termination">
                  Termination
                </a>
              </li>
              <li>
                <a css={STYLES_LINK} href="#Disclaimer of Warranties">
                  Disclaimer of Warranties
                </a>
              </li>
              <li>
                <a css={STYLES_LINK} href="#Limitation of Liability">
                  Limitation of Liability
                </a>
              </li>
              <li>
                <a css={STYLES_LINK} href="#General Representation and Warranty">
                  General Representation and Warranty
                </a>
              </li>
              <li>
                <a css={STYLES_LINK} href="#Indemnification">
                  Indemnification
                </a>
              </li>
              <li>
                <a css={STYLES_LINK} href="#Miscellaneous">
                  Miscellaneous
                </a>
              </li>
            </ul>
          </div>
          <br />
          <div css={STYLES_CONTENT_BLOCK2}>
            <System.P>
              The following terms and conditions govern all use of the Slate's website and all content, services and
              products available at or through the website.
            </System.P>
            <br />
            <System.P>
              Please read this Agreement carefully before accessing or using the Website. By accessing or using any part
              of the web site, you agree to become bound by the terms and conditions of this agreement.
            </System.P>
            <br />
            <System.P>
              If you do not agree to all the terms and conditions of this agreement, then you may not access the Website
              or use any services. If these terms and conditions are considered an offer by Slate, acceptance is
              expressly limited to these terms. The Website is available only to individuals who are at least 18 years
              old.
            </System.P>
            <div id="Storage Deals to the Filecoin Network">
              <br />
              <br />
              <h2 css={STYLES_H2}>Storage Deals to the Filecoin Network</h2>
              <br />
              <System.P>
                You agree to allow Slate to make storage deals on your behalf to the Filecoin Network at any given time.
              </System.P>
            </div>
            <div id="Your Slate Account and Site">
              <br />
              <br />
              <h2 css={STYLES_H2}>Your Slate Account and Site</h2>
              <br />
              <System.P>
                If you create an account on the Website, you are responsible for maintaining the security of your
                account and its content, and you are fully responsible for all activities that occur under the account
                and any other actions taken in connection with the Website. You must not describe or assign content to
                your account in a misleading or unlawful manner, including in a manner intended to trade on the name or
                reputation of others, and Slate may change or remove any description or keyword that it considers
                inappropriate or unlawful, or otherwise likely to cause Slate liability. You must immediately notify
                Slate of any unauthorized uses of your account or any other breaches of security. Slate will not be
                liable for any acts or omissions by You, including any damages of any kind incurred as a result of such
                acts or omissions.
              </System.P>
            </div>
            <div id="Responsibility of Contributors">
              <br />
              <br />
              <h2 css={STYLES_H2}>Responsibility of Contributors</h2>
              <br />
              <System.P>
                If you operate an account, post material to the Website, post links on the Website, or otherwise make
                (or allow any third party to make) material available by means of the Website (any such material,
                Content), You are entirely responsible for the content of, and any harm resulting from, that Content.
                That is the case regardless of whether the Content in question constitutes text or graphics. By making
                Content available, you represent and warrant that: the downloading, copying and use of the Content will
                not infringe the proprietary rights, including but not limited to the copyright, patent, trademark or
                trade secret rights, of any third party.
              </System.P>
            </div>
            <div id="Changes">
              <br />
              <br />
              <h2 css={STYLES_H2}>Changes</h2>
              <br />
              <System.P>
                Slate reserves the right, at its sole discretion, to modify or replace any part of this Agreement. It is
                your responsibility to check this Agreement periodically for changes. Your continued use of or access to
                the Website following the posting of any changes to this Agreement constitutes acceptance of those
                changes. Slate may also, in the future, offer new services and/or features through the Website
                (including, the release of new tools and resources). Such new features and/or services shall be subject
                to the terms and conditions of this Agreement.
              </System.P>
            </div>
            <div id="Termination">
              <br />
              <br />
              <h2 css={STYLES_H2}>Termination</h2>
              <br />
              <System.P>
                Slate may terminate your access to all or any part of the Website at any time, with or without cause,
                with or without notice, effective immediately. If you wish to terminate this Agreement or your Slate
                account (if you have one), you may simply discontinue using the Website. Notwithstanding the foregoing,
                if you have a VIP Services account, such account can only be terminated by Slate if you materially
                breach this Agreement and fail to cure such breach within thirty (30) days from Slate notice to you
                thereof; provided that, Slate can terminate the Website immediately as part of a general shut down of
                our service. All provisions of this Agreement which by their nature should survive termination shall
                survive termination, including, without limitation, ownership provisions, warranty disclaimers,
                indemnity and limitations of liability.
              </System.P>
            </div>
            <div id="Disclaimer of Warranties">
              <br />
              <br />
              <h2 css={STYLES_H2}>Disclaimer of Warranties</h2>
              <br />
              <System.P>
                The Website is provided “as is”. Slate and its suppliers and licensors hereby disclaim all warranties of
                any kind, express or implied, including, without limitation, the warranties of merchantability, fitness
                for a particular purpose and non-infringement. Neither Slate nor its suppliers and licensors, makes any
                warranty that the Website will be error free or that access thereto will be continuous or uninterrupted.
                You understand that you download from, or otherwise obtain content or services through, the Website at
                your own discretion and risk.
              </System.P>
            </div>
            <div id="Limitation of Liability">
              <br />
              <br />
              <h2 css={STYLES_H2}>Limitation of Liability</h2>
              <br />
              <System.P>
                In no event will Slate, or its suppliers or licensors, be liable with respect to any subject matter of
                this agreement under any contract, negligence, strict liability or other legal or equitable theory for:
                any special, incidental or consequential damages; the cost of procurement or substitute products or
                services; for interruption of use or loss or corruption of data; for any amounts that exceed the fees
                paid by you to Slate under this agreement during the twelve (12) month period prior to the cause of
                action.
              </System.P>
              <br />
              <System.P>
                Slate shall have no liability for any failure or delay due to matters beyond their reasonable control.
                The foregoing shall not apply to the extent prohibited by applicable law.
              </System.P>
            </div>
            <div id="General Representation and Warranty">
              <br />
              <br />
              <h2 css={STYLES_H2}>General Representation and Warranty</h2>
              <br />
              <System.P>
                You represent and warrant that Your use of the Website will be in strict accordance with the Slate
                Community Guidelines, with this Agreement and with all applicable laws and regulations (including
                without limitation any local laws or regulations in your country, state, city, or other governmental
                area, regarding online conduct and acceptable content, and including all applicable laws regarding the
                transmission of technical data exported from the United States or the country in which you reside) and
                your use of the Website will not infringe or misappropriate the intellectual property rights of any
                third party.
              </System.P>
            </div>
            <div id="Indemnification">
              <br />
              <br />
              <h2 css={STYLES_H2}>Indemnification</h2>
              <br />
              <System.P>
                You agree to indemnify and hold harmless Slate, its contractors, and its licensors, and their respective
                directors, officers, employees and agents from and against any and all claims and expenses, including
                attorneys fees, arising out of your use of the Website, including but not limited to out of your
                violation this Agreement.
              </System.P>
            </div>
            <div id="Miscellaneous">
              <br />
              <br />
              <h2 css={STYLES_H2}>Miscellaneous</h2>
              <br />
              <System.P>
                This Agreement constitutes the entire agreement between Slate and you concerning the subject matter
                hereof, and they may only be modified by a written amendment signed by an authorized executive of Slate,
                or by the posting by Slate of a revised version. Except to the extent applicable law, if any, provides
                otherwise, this Agreement, any access to or use of the Website will be governed by the laws of the state
                of California, U.S.A.
              </System.P>
            </div>
          </div>
        </div>
        <WebsitePrototypeFooter />
      </WebsitePrototypeWrapper>
    );
  }
}
