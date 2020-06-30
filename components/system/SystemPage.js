import Head from 'next/head';

import * as React from 'react';
import * as SVG from '~/common/svg';
import * as Constants from '~/common/constants';

import { css } from '@emotion/react';

const STYLES_PAGE = css`
  background-color: ${Constants.system.foreground};
`;

const STYLES_BODY = css`
  max-width: 960px;
  width: 100%;
  margin: 0 auto 0 auto;
  padding: 88px 24px 128px 276px;
`;

const STYLES_ICON_ELEMENT = css`
  height: 40px;
  width: 40px;
  border-radius: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: ${Constants.system.brand};
  color: ${Constants.system.white};
  user-select: none;
`;

const STYLES_SIDEBAR = css`
  padding: 80px 24px 128px 24px;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 252px;
  background-color: ${Constants.system.foreground};
  overflow-y: scroll;

  ::-webkit-scrollbar {
    width: 4px;
  }

  ::-webkit-scrollbar-track {
    background: ${Constants.system.gray};
  }

  ::-webkit-scrollbar-thumb {
    background: ${Constants.system.darkGray};
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${Constants.system.brand};
  }
`;

const STYLES_LINK = css`
  font-family: 'inter-semi-bold';
  color: ${Constants.system.pitchBlack};
  text-decoration: none;
  font-weight: 400;
  display: block;
  margin-top: 8px;

  :hover {
    color: ${Constants.system.brand};
  }
`;

const STYLES_LINK_ACTIVE = css`
  font-family: 'inter-semi-bold';
  color: ${Constants.system.brand};
  text-decoration: none;
  font-weight: 400;
  display: block;
  margin-top: 8px;
`;

const STYLES_DESCRIPTION = css`
  font-weight: 400;
  margin-top: 4px;
  display: block;
  margin-bottom: 16px;
`;

const STYLES_LABEL = css`
  font-family: 'inter-semi-bold';
  display: block;
  font-size: 11px;
  text-transform: uppercase;
  color: ${Constants.system.darkGray};
  letter-spacing: 0.6px;
`;

const SidebarLink = (props) => {
  console.log(props.url)
  return (
    <React.Fragment>
      <a css={props.url.includes(props.href) ? STYLES_LINK_ACTIVE : STYLES_LINK} href={props.href} target={props.target}>
        {props.title}
      </a>
      {props.children ? <div css={STYLES_DESCRIPTION}>{props.children}</div> : null}
    </React.Fragment>
  );
};

const STYLES_SMALL_LINK = css`
  padding: 0 16px 0 0px;
  font-size: 14px;
  font-family: 'inter-semi-bold';
  margin-top: 11px;
  color: #666;
  transition: 200ms ease all;
  cursor: pointer;

  :hover {
    color: ${Constants.system.brand};
  }
`;

export default class SystemPage extends React.Component {
  render() {
    const { title, description, url, children } = this.props;

    return (
      <div css={STYLES_PAGE}>
        <Head>
          <title>{title}</title>
          <meta name="title" content={title} />
          <meta name="description" content={description} />

          <meta property="og:type" content="website" />
          <meta property="og:url" content={url} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="og:image" content="/static/social.png" />

          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content={url} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
          <meta property="twitter:image" content="/static/social.png" />

          <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="96x96" href="/static/favicon-96x96.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon-16x16.png" />

          <link rel="shortcut icon" href="/static/favicon.ico" />
        </Head>
        <div css={STYLES_SIDEBAR}>
          <a css={STYLES_ICON_ELEMENT} href="/system">
            <SVG.Logo height="32px" />
          </a>
          <br />
          <br />

          <span css={STYLES_LABEL}>Tutorials</span>
          <SidebarLink
            url={url}
            href="https://github.com/filecoin-project/filecoin-client-tutorial"
            target="_blank"
            title="Build a Simple Example Quickly">
            Upload data to IPFS and Filecoin on the Lotus DevNet in under 5 minutes.
          </SidebarLink>
          <SidebarLink 
            url={url}
            href="https://blog.textile.io/integrating-powergate/" 
            target="_blank" 
            title="Using Powergate">
            A guide to integrate Powergate into your web client.
          </SidebarLink>

          <span css={STYLES_LABEL}>
            <br />
            <br />
            Components
          </span>
          <SidebarLink url={url} href="/system/globe" title="Globe"></SidebarLink>
          <SidebarLink url={url} href="/system/icons" title="Icons"></SidebarLink>
          <SidebarLink url={url} href="/system/colors" title="Colors"></SidebarLink>
          <SidebarLink url={url} href="/system/tables" title="Tables"></SidebarLink>
          <SidebarLink url={url} href="/system/tooltips" title="Tooltips"></SidebarLink>
          <SidebarLink url={url} href="/system/line-charts" title="Line Charts"></SidebarLink>
          <SidebarLink url={url} href="/system/stats" title="Stats"></SidebarLink>
          <SidebarLink url={url} href="/system/buttons" title="Buttons"></SidebarLink>
          <SidebarLink url={url} href="/system/checkboxes" title="Checkboxes"></SidebarLink>
          <SidebarLink url={url} href="/system/radios" title="Radios"></SidebarLink>
          <SidebarLink url={url} href="/system/card-tabs" title="Card Tabs"></SidebarLink>
          <SidebarLink url={url} href="/system/tabs" title="Tabs"></SidebarLink>
          <SidebarLink url={url} href="/system/toggles" title="Toggles"></SidebarLink>
          <SidebarLink url={url} href="/system/inputs" title="Inputs"></SidebarLink>
          <SidebarLink url={url} href="/system/dropdowns" title="Dropdowns"></SidebarLink>

          <div
            css={STYLES_SMALL_LINK}
            onClick={() => {
              window.open('https://filscan.io/');
            }}
            style={{ marginTop: 48 }}>
            <SVG.ExpandBox height="12px" style={{ marginRight: 10 }} />
            Block Explorer
          </div>
          <div
            css={STYLES_SMALL_LINK}
            onClick={() => {
              window.open('https://github.com/filecoin-project/filecoin-client');
            }}>
            <SVG.ExpandBox height="12px" style={{ marginRight: 10 }} />
            View source
          </div>
          <div
            css={STYLES_SMALL_LINK}
            onClick={() => {
              window.open('https://github.com/filecoin-shipyard/js-lotus-client');
            }}>
            <SVG.ExpandBox height="12px" style={{ marginRight: 10 }} />
            JS Lotus Client
          </div>
          <div
            css={STYLES_SMALL_LINK}
            onClick={() => {
              window.open('https://github.com/textileio/js-powergate-client');
            }}>
            <SVG.ExpandBox height="12px" style={{ marginRight: 10 }} />
            JS Powergate Client
          </div>
          <div
            css={STYLES_SMALL_LINK}
            onClick={() => {
              window.open('https://docs.textile.io/');
            }}>
            <SVG.ExpandBox height="12px" style={{ marginRight: 10 }} />
            Textile Documentation
          </div>
          <div
            css={STYLES_SMALL_LINK}
            onClick={() => {
              window.open('https://docs.lotu.sh/');
            }}>
            <SVG.ExpandBox height="12px" style={{ marginRight: 10 }} />
            Lotus Documentation
          </div>
          <div
            css={STYLES_SMALL_LINK}
            onClick={() => {
              window.open('https://docs.filecoin.io/');
            }}>
            <SVG.ExpandBox height="12px" style={{ marginRight: 10 }} />
            Filecoin Documentation
          </div>
          <div
            css={STYLES_SMALL_LINK}
            onClick={() => {
              window.open('https://filecoin.io/#community');
            }}>
            <SVG.ExpandBox height="12px" style={{ marginRight: 10 }} />
            Community
          </div>
        </div>
        <div css={STYLES_BODY}>{children}</div>
      </div>
    );
  }
}
