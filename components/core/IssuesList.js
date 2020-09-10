import React, { Component } from "react";
import Issue from "~/components/core/Issue";

import { css, keyframes } from "@emotion/react";

const STYLES_SECTION_WRAPPER = css`
  display: flex;
  flex-direction: row;
  padding: 88px;
`;
export default class IssueList extends Component {
  render() {
    const { issues } = this.props;
    return (
      <div css={STYLES_SECTION_WRAPPER}>
        {issues.map(issue => {
          return (
            <Issue
              title={issue.title}
              id={issue.id}
              labels={issue.labels}
              userName={issue.user.login}
            />
          );
        })}
      </div>
    );
  }
}
