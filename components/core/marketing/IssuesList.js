import * as React from "react";

import { css } from "@emotion/react";

import Issue from "~/components/core/marketing/Issue";

const STYLES_ISSUE_CARD_GROUP = css`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin-top: 48px;
`;

export default class IssueList extends React.Component {
  render() {
    const { issues } = this.props;
    return (
      <div css={STYLES_ISSUE_CARD_GROUP}>
        {issues.map((issue) => {
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
