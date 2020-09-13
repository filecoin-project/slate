import React, { Component } from "react";
import * as Constants from "~/common/constants";

import { css, keyframes } from "@emotion/react";

import Issue from "~/components/core/marketing/Issue";

const STYLES_SLATE_CARD_GROUP = css`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin-top: 48px;
`;

export default class IssueList extends Component {
  render() {
    const { issues } = this.props;
    return (
      <div css={STYLES_SLATE_CARD_GROUP}>
        {issues.map(issue => {
          return (
            <Issue
              title={issue.title}
              id={issue.id}
              labels={issue.labels}
              userName={issue.user.login}
              url={issue.html_url}
            />
          );
        })}
      </div>
    );
  }
}
