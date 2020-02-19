import * as React from 'react';

import { css } from 'react-emotion';

const STYLES_GOOGLE = css`
  height: 48px;
  padding: 0 24px 0 0;
  border-radius: 32px;
  background: #000;
  color: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  transition: 200ms ease all;
  transition-property: color;

  :visited {
    color: #fff;
  }

  :hover {
    color: #fff;
    background: #222;
  }
`;

const STYLES_LOGO = css`
  height: 32px;
  width: 32px;
  border-radius: 32px;
  display: inline-flex;
  background-size: cover;
  background-position: 50% 50%;
  background-image: url('/static/logos/google.jpg');
  margin-right: 16px;
  margin-left: 8px;
`;

export default class GoogleButton extends React.Component {
  render() {
    return (
      <a className={STYLES_GOOGLE} href={this.props.href}>
        <span className={STYLES_LOGO} />
        Sign in with Google
      </a>
    );
  }
}
