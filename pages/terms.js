import React, { useState } from "react";
import * as System from "~/components/system";
import * as Constants from "~/common/constants";

import { css } from "@emotion/core";

import WebsitePrototypeWrapper from "~/components/core/WebsitePrototypeWrapper";
import WebsitePrototypeHeader from "~/components/core/NewWebsitePrototypeHeader";
import WebsitePrototypeFooter from "~/components/core/NewWebsitePrototypeFooter";

const STYLES_ROOT = css`
  padding: 0 88px 128px 88px;
  margin: -88px auto 0 auto;
  width: 100%;
  background-color: ${Constants.system.wallLight};

  @media (max-width: ${Constants.sizes.mobile}px) {
    display: block;
    padding: 128px 24px;
  }
`;

const STYLES_CONTAINER = css`
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
`;

const STYLES_H1 = css`
  font-size: ${Constants.typescale.lvl5};
  font-family: ${Constants.font.medium};
  font-weight: 400;
  line-height: 1.3;
  padding: 0px gutterpx 16px gutterpx;
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
  width: 40%;
  position: -webkit-sticky;
  position: sticky;
  top: 120px;

  @media (max-width: ${Constants.sizes.mobile}px) {
    position: relative;
    top: 0;
    width: 100%;
  }
`;

const STYLES_CONTENT_BLOCK2 = css`
  margin: -120px 0 0 auto;
  width: 50%;

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
  line-height: 1.5;
  margin: 0px 0 0 4px;
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

export default class TermsPage extends React.Component {
  render() {
    const title = `Slate: Terms of Service`;
    const description = "You must agree to our terms of service to use Slate.";
    const url = "https://slate.host/terms-new";

    return (
      <WebsitePrototypeWrapper title={title} description={description} url={url}>
        <WebsitePrototypeHeader />
        <div css={STYLES_ROOT}>
          <div css={STYLES_CONTAINER}>
            <div css={STYLES_CONTENT_BLOCK1}>
              <h1 css={STYLES_H1}>Terms of Service</h1>
              <br />
              <ul css={STYLES_LIST}>
                <li>
                  <a css={STYLES_LINK} href="#Storage deals">
                    Storage deals
                  </a>
                </li>
                <li>
                  <a css={STYLES_LINK} href="#Filecoin Wallet">
                    Filecoin Wallet
                  </a>
                </li>
                <li>
                  <a css={STYLES_LINK} href="#Your account and slates">
                    Your account and slates
                  </a>
                </li>
                <li>
                  <a css={STYLES_LINK} href="#Responsibility of contributors">
                    Responsibility of contributors
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
                  <a css={STYLES_LINK} href="#Disclaimer of warranties">
                    Disclaimer of warranties
                  </a>
                </li>
                <li>
                  <a css={STYLES_LINK} href="#Limitation of liability">
                    Limitation of liability
                  </a>
                </li>
                <li>
                  <a css={STYLES_LINK} href="#General representation and warranty">
                    General representation and warranty
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
            <div css={STYLES_CONTENT_BLOCK2}>
              <System.P>
                The following terms and conditions govern all use of <b>https://slate.host</b>{" "}
                ("Website") and all content, slates, files, services and products available at or
                through the <b>Website</b>.
              </System.P>
              <br />
              <System.P>
                Please read this Agreement carefully before accessing or using the <b>Website</b>.
                By accessing or using any part of the web site, you agree to become bound by the
                terms and conditions of this <b>Agreement</b>.
              </System.P>
              <br />
              <System.P>
                If you do not agree to all the terms and conditions of this <b>Agreement</b>, then
                you may not access the <b>Website</b> or use any services. If these terms and
                conditions are considered an offer by <b>Slate</b>, acceptance is expressly limited
                to these terms. <br />
                <br />
                The <b>Website</b> is available only to individuals who are at least 18 years old.
                <br />
                <br />
                Your <b>Website</b> account ("account") encompasses the following basic Slate
                services: (i) a hosted wallet that allows you to store, track and manage Filecoin
                only (the "Filecoin Wallet"); <br />
                <br />
                <b>
                  YOU CAN NOT SEND FILECOIN TO OTHER USERS ON SLATE OR TO ANY OTHER FILECOIN WALLET.
                  YOU CAN ONLY USE YOUR FILECOIN IN YOUR FILECOIN WALLET FOR STORAGE DEALS ON THE
                  FILECOIN NETWORK ON THIS WEBSITE. SLATE ASSUMES NO RESPONSIBILITY OR LIABILITY IN
                  CONNECTION WITH ANY ATTEMPT TO USE SLATE TO MAKE STORAGE DEALS.
                </b>
              </System.P>
              <div id="Storage deals">
                <br />
                <br />
                <h2 css={STYLES_H2}>Storage deals</h2>
                <br />
                <System.P>
                  You agree to allow <b>Slate</b> employees to make storage deals on your behalf to
                  the <b>Filecoin Network</b> at any given time.
                </System.P>
              </div>
              <div id="Filecoin Wallet">
                <br />
                <br />
                <h2 css={STYLES_H2}>Filecoin Wallet</h2>
                <br />
                <System.P>
                  Your <b>Filecoin Wallet</b> enables you to store, track and manage Filecoin
                  contained in your <b>Filecoin Wallet</b> and utilize the <strong>Website</strong>.
                  Your <b>Filecoin Wallet</b> can only store Filecoin and will not hold any USD,
                  other fiat, or any other virtual currencies (e.g., bitcoin). You understand that
                  all Filecoin held in your
                  <b>Filecoin Wallet</b> are limited in use, can be redeemed solely in connection
                  with the <strong>Website</strong> and underlying redemption of Filecoin is limited
                  to purchasing storage deals with Miners on the <b>Filecoin Network</b>.{" "}
                  <b>Slate</b> does not facilitate the exchange of Filecoin to other users or
                  third-parties for other fiat or virtual currencies.
                </System.P>
                <br />
                <System.P>
                  <b>
                    SLATE CANNOT REVERSE A TRANSACTION WHICH HAS BEEN BROADCAST TO THE FILECOIN
                    NETWORK. UNDER NO CIRCUMSTANCES SHOULD YOU ATTEMPT TO USE YOUR FILECOIN WALLET
                    TO STORE, SEND, REQUEST, OR RECEIVE VIRTUAL CURRENCIES IN ANY FORM THAT ARE NOT
                    SUPPORTED BY THE WEBSITE. SLATE ASSUMES NO RESPONSIBILITY OR LIABILITY IN
                    CONNECTION WITH ANY ATTEMPT TO USE THE WEBSITE FOR ANY ACTIVITIES OR VIRTUAL
                    CURRENCIES THAT SLATE DOES NOT SUPPORT.
                  </b>
                </System.P>
                <br />
                <System.P>
                  <b>Slate</b> does not own or control the <b>Filecoin Network</b> or the underlying
                  software protocols which govern the operation of Storage deals on our website. In
                  general, the underlying protocols are open source, and anyone can use, copy,
                  modify, and distribute them. By using the <b>Website</b>, you acknowledge and
                  agree (i) that <b>Slate</b> is not responsible for operation of the Filecoin
                  Network and that <b>Slate</b> makes no guarantee of their functionality, security,
                  or availability; and (ii) that the <b>Filecoin Network</b> is subject to sudden
                  changes in operating rules (“forks”), and that such forks may materially affect
                  the value, function, and/or even the name of Filecoin you store in the Filecoin
                  Network. <br />
                  <br />
                  In the event of a fork, you agree that <b>Slate</b> may temporarily suspend{" "}
                  <b>Website</b> operations (with or without advance notice to you) and that
                  <b>Slate</b> may, in its sole discretion, decide whether or not to support (or
                  cease supporting) either branch of the forked protocol entirely. You acknowledge
                  and agree that <b>Slate</b> assumes absolutely no responsibility whatsoever in
                  respect of an unsupported branch of a forked protocol.
                </System.P>
              </div>
              <div id="Your account and slates">
                <br />
                <br />
                <h2 css={STYLES_H2}>Your account and slates</h2>
                <br />
                <System.P>
                  If you create an account on the <b>Website</b>, you are responsible for
                  maintaining the security of your account and its content, and you are fully
                  responsible for all activities that occur under the account and any other actions
                  taken in connection with the <b>Website</b>. You must not describe or assign
                  content to your account in a misleading or unlawful manner, including in a manner
                  intended to trade on the name or reputation of others, and <b>Slate</b> may change
                  or remove any description or keyword that it considers inappropriate or unlawful,
                  or otherwise likely to cause <b>Slate</b> liability. You must immediately notify{" "}
                  <b>Slate</b> of any unauthorized uses of your account or any other breaches of
                  security. <br />
                  <br />
                  <b>Slate</b> will not be liable for any acts or omissions by You, including any
                  damages of any kind incurred as a result of such acts or omissions. <b>Slate</b>{" "}
                  cannot and will not be liable for any loss or damage arising from your failure to
                  comply with the above requirements.
                </System.P>
              </div>
              <div id="Responsibility of contributors">
                <br />
                <br />
                <h2 css={STYLES_H2}>Responsibility of contributors</h2>
                <br />
                <System.P>
                  If you operate an account, post material to the <b>Website</b>, post links or
                  files on the <b>Website</b>, or otherwise make (or allow any third party to make)
                  material available by means of the <b>Website</b> (any such material, Content),
                  You are entirely responsible for the content of, and any harm resulting from, that
                  Content. That is the case regardless of whether the Content in question
                  constitutes text or graphics. By making Content available, you represent and
                  warrant that: the downloading, copying and use of the Content will not infringe
                  the proprietary rights, including but not limited to the copyright, patent,
                  trademark or trade secret rights, of any third party.
                </System.P>
              </div>
              <div id="Changes">
                <br />
                <br />
                <h2 css={STYLES_H2}>Changes</h2>
                <br />
                <System.P>
                  <b>Slate</b> reserves the right, at its sole discretion, to modify or replace any
                  part of this Agreement. It is your responsibility to check this Agreement
                  periodically for changes. Your continued use of or access to the <b>Website</b>{" "}
                  following the posting of any changes to this Agreement constitutes acceptance of
                  those changes. <b>Slate</b> may also, in the future, offer new services and/or
                  features through the <b>Website</b>
                  (including, the release of new tools and resources). Such new features and/or
                  services shall be subject to the terms and conditions of this Agreement.
                </System.P>
              </div>
              <div id="Termination">
                <br />
                <br />
                <h2 css={STYLES_H2}>Termination</h2>
                <br />
                <System.P>
                  <b>Slate</b> may terminate your access to all or any part of the <b>Website</b> at
                  any time, with or without cause, with or without notice, effective immediately. If
                  you wish to terminate this Agreement or your <b>Slate></b> account (if you have
                  one), you may simply discontinue using the <b>Website</b>. All provisions of this
                  Agreement which by their nature should survive termination shall survive
                  termination, including, without limitation, ownership provisions, warranty
                  disclaimers, indemnity and limitations of liability.
                </System.P>
              </div>
              <div id="Disclaimer of warranties">
                <br />
                <br />
                <h2 css={STYLES_H2}>Disclaimer of warranties</h2>
                <br />
                <System.P>
                  The <b>Website</b> is provided “as is”. <b>Slate</b> and its suppliers and
                  licensors hereby disclaim all warranties of any kind, express or implied,
                  including, without limitation, the warranties of merchantability, fitness for a
                  particular purpose and non-infringement. Neither <b>Slate</b> nor its suppliers
                  and licensors, makes any warranty that the <b>Website</b> will be error free or
                  that access thereto will be continuous or uninterrupted. You understand that you
                  download from, or otherwise obtain content or services through, the <b>Website</b>{" "}
                  at your own discretion and risk.
                </System.P>
              </div>
              <div id="Limitation of liability">
                <br />
                <br />
                <h2 css={STYLES_H2}>Limitation of liability</h2>
                <br />
                <System.P>
                  In no event will <b>Slate</b>, or its suppliers or licensors, be liable with
                  respect to any subject matter of this <b>Agreement</b> under any contract,
                  negligence, strict liability or other legal or equitable theory for: any special,
                  incidental or consequential damages; the cost of procurement or substitute
                  products or services; for interruption of use or loss or corruption of data; for
                  any amounts that exceed the fees paid by you to <b>Slate</b> under this{" "}
                  <b>Agreement</b> during the twelve (12) month period prior to the cause of action.
                </System.P>
                <br />
                <System.P>
                  <b>Slate</b> shall have no liability for any failure or delay due to matters
                  beyond their reasonable control. The foregoing shall not apply to the extent
                  prohibited by applicable law.
                </System.P>
              </div>
              <div id="General representation and warranty">
                <br />
                <br />
                <h2 css={STYLES_H2}>General representation and warranty</h2>
                <br />
                <System.P>
                  You represent and warrant that Your use of the <b>Website</b> will be in strict
                  accordance with the <b>Slate</b> Community Guidelines, with this Agreement and
                  with all applicable laws and regulations (including without limitation any local
                  laws or regulations in your country, state, city, or other governmental area,
                  regarding online conduct and acceptable content, and including all applicable laws
                  regarding the transmission of technical data exported from the United States or
                  the country in which you reside) and your use of the <b>Website</b> will not
                  infringe or misappropriate the intellectual property rights of any third party.
                </System.P>
              </div>
              <div id="Indemnification">
                <br />
                <br />
                <h2 css={STYLES_H2}>Indemnification</h2>
                <br />
                <System.P>
                  You agree to indemnify and hold harmless <b>Slate</b>, its contractors, and its
                  licensors, and their respective directors, officers, employees and agents from and
                  against any and all claims and expenses, including attorneys fees, arising out of
                  your use of the <b>Website</b>, including but not limited to out of your violation
                  this Agreement.
                </System.P>
              </div>
              <div id="Miscellaneous">
                <br />
                <br />
                <h2 css={STYLES_H2}>Miscellaneous</h2>
                <br />
                <System.P>
                  This Agreement constitutes the entire <b>Agreement</b> between <b>Slate</b> and
                  you concerning the subject matter hereof, and they may only be modified by a
                  written amendment signed by an authorized employee of <b>Slate</b>, or by the
                  posting by <b>Slate</b> of a revised version. Except to the extent applicable law,
                  if any, provides otherwise, this Agreement, any access to or use of the{" "}
                  <b>Website</b> will be governed by the laws of the state of California, U.S.A.
                </System.P>
              </div>
            </div>
          </div>
        </div>
        <WebsitePrototypeFooter />
      </WebsitePrototypeWrapper>
    );
  }
}
