import * as React from 'react';

import { css } from '@emotion/react';

const STYLES_LAYOUT = css`
  max-width: 928px;
  width: 100%;
  margin: 128px auto 288px auto;
`;

const STYLES_TITLE = css`
  font-size: 24px;
  display: block;
  margin-bottom: 48px;
  font-weight: 400;
`;

const STYLES_PARAGRAPH = css`
  font-size: 24px;
  line-height: 1.5;
  color: #999;
  max-width: 768px;
  margin-bottom: 48px;

  strong {
    font-family: 'inter-semi-bold';
    font-weight: 400;
  }
`;

const STYLES_NAME = css`
  font-family: 'inter-semi-bold';
  font-size: 24px;
  margin: 16px;
  position: relative;
  width: 200px;
  height: 200px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #000;
  border-radius: 4px;
`;

const STYLES_LOGO = css`
  display: inline-flex;
  margin: 0;
  background-size: cover;
  background-position: 50% 50%;
  margin: 16px;
  height: 200px;
  width: 200px;
  border-radius: 4px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.07);
  position: relative;
`;

const STYLES_PILL = css`
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  width: 32px;
  background: black;
  color: white;
  position: absolute;
  bottom: -16px;
  right: -16px;
  border-radius: 32px;
  z-index: 1;
`;

const STYLES_CHOICE = css`
  font-size: 10px;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  background: black;
  color: white;
  position: absolute;
  bottom: 0;
  right: 0;
  border-radius: 32px;
  z-index: 1;
`;

const LOGOS = [
  { src: 'idea-logo-1.jpg', votes: 1 },
  { src: 'idea-logo-2.jpg', votes: 2 },
  { src: 'idea-logo-3.jpg', votes: 0 },
  { src: 'idea-logo-4.jpg', votes: 2 },
  { src: 'idea-logo-5.jpg', votes: 1 },
  { src: 'idea-logo-6.jpg', votes: 0 },
  { src: 'idea-logo-7.jpg', votes: 0 },
  { src: 'idea-logo-8.jpg', votes: 1 },
  { src: 'idea-logo-9.jpg', votes: 3 },
  { src: 'idea-logo-10.jpg', votes: 1 },
  { src: 'idea-logo-11.jpg', votes: 3 },
  { src: 'idea-logo-12.jpg', votes: 1 },
  { src: 'idea-logo-13.jpg', votes: 2 },
  { src: 'idea-logo-14.jpg', votes: 0 },
  { src: 'idea-logo-15.jpg', votes: 2 },
  { src: 'idea-logo-16.jpg', votes: 3 },
  { src: 'idea-logo-17.jpg', votes: 0 },
  { src: 'idea-logo-18.jpg', votes: 0 },
  { src: 'idea-logo-19.jpg', votes: 0 },
  { src: 'idea-logo-20.jpg', votes: 2 },
  { src: 'idea-logo-21.jpg', votes: 0 },
  { src: 'idea-logo-22.jpg', votes: 3 },
  { src: 'idea-logo-23.jpg', votes: 2 },
  { src: 'idea-logo-24.jpg', votes: 0 },
];

const NAMES = [
  { src: 'Petal', votes: 1 },
  { src: 'Petals', votes: 0 },
  { src: 'Pistil', votes: 0 },
  { src: 'Stamen', votes: 0 },
  { src: 'Pollen', votes: 0 },
  { src: 'Mission Control', votes: 0 },
  { src: 'Hex', votes: 2 },
  { src: 'Hive', votes: 2 },
  { src: 'Hexagons', votes: 0 },
  { src: 'Spheres', votes: 0 },
  { src: 'FileManager', votes: 0 },
  { src: 'FilePatron', votes: 0 },
  { src: 'Filecoin Client', votes: 0 },
  { src: 'Ponds', votes: 1 },
  { src: 'Outre', votes: 1 },
  { src: 'Slate', votes: 2 },
  { src: 'Case', votes: 2 },
  { src: 'Materials', votes: 0 },
  { src: 'SeedDrive', votes: 0 },
  { src: 'Monet', votes: 2 },
  { src: 'Lilypad', votes: 0 },
  { src: 'StoreBuddy', votes: 0 },
  { src: 'FileCabinet', votes: 0 },
  { src: 'Jacana', votes: 1 },
  { src: 'Argo', votes: 2 },
  { src: 'Octavius', votes: 0 },
  { src: 'Corgi', votes: 0 },
  { src: 'Filing Cabinet', votes: 0 },
  { src: 'FileCorgi', votes: 0 },
  { src: 'Max', votes: 0 },
  { src: 'Nominal', votes: 0 },
  { src: 'X AE', votes: 0 },
  { src: 'A 12', votes: 0 },
];

export default class LogoNameTest extends React.Component {
  render() {
    return (
      <div css={STYLES_LAYOUT}>
        <p css={STYLES_PARAGRAPH}>
          If you are looking at this page, it is a list of name and logo ideas (I did not make them). Names and logos do
          not correspond with each other.{' '}
          <strong>Please let me know which ones you like through Slack direct message.</strong>
          <br />
          <br />
          All votes are anonymous. We will take the votes, consolidate the choices and then ask other designers to help
          out with refining what the team prefers.
          <br />
          <br />
          Key
          <br />
          <span style={{ color: `#0047FF` }}>Blue</span> - Vote count
        </p>

        <h1 css={STYLES_TITLE}>Names</h1>
        <div>
          {NAMES.map((n, index) => {
            return (
              <span key={n.src} css={STYLES_NAME}>
                {n.src}
                {n.votes > 0 ? (
                  <span
                    css={STYLES_PILL}
                    style={{
                      backgroundColor: '#0047FF',
                      bottom: 'auto',
                      top: -16,
                    }}>
                    {n.votes}
                  </span>
                ) : null}
                <span css={STYLES_CHOICE} style={{ background: 'transparent', color: '#000' }}>
                  Option #{index + 1}
                </span>
              </span>
            );
          })}
        </div>

        <h1 css={STYLES_TITLE} style={{ marginTop: 64 }}>
          Logos
        </h1>
        <div>
          {LOGOS.map((l, index) => {
            return (
              <span key={l.src} css={STYLES_LOGO} style={{ backgroundImage: `url('/static/temp/${l.src}')` }}>
                {l.votes > 0 ? (
                  <span
                    css={STYLES_PILL}
                    style={{
                      backgroundColor: '#0047FF',
                      bottom: 'auto',
                      top: -16,
                    }}>
                    {l.votes}
                  </span>
                ) : null}
                <span css={STYLES_CHOICE}>Option #{index + 1}</span>
              </span>
            );
          })}
        </div>
      </div>
    );
  }
}
