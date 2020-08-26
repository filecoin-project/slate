import * as React from "react";
import * as Constants from "~/common/constants";
import * as System from "~/components/system";
import * as Actions from "~/common/actions";

import { css } from "@emotion/react";

const STYLES_ITEM = css`
  font-size: 12px;
  font-weight: 600;
  font-famliy: monaco;
  white-space: pre-wrap;
  overflow-wrap: break-word;
`;

const STYLES_ROW = css`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

const STYLES_COLUMN = css`
  width: 33.33%;
  flex-shrink: 0;
  padding: 24px;
  box-sizing: border-box;
`;

export const getServerSideProps = async (context) => {
  return {
    props: { ...context.query },
  };
};

export default class IntegrationPage extends React.Component {
  state = {
    results: [],
    viewer: this.props.viewer,
  };

  componentDidMount() {}

  _handleChange = async (e) => {
    const query = e.target.value;
    const results = await Actions.search({ query });

    this.setState({ results: results.data.results });
  };

  _handleUpdate = async (e) => {
    const response = await Actions.hydrateAuthenticatedUser();

    if (!response || response.error) {
      alert("TODO: error fetching authenticated viewer");
      return null;
    }

    const updates = {
      viewer: response.data,
    };

    this.setState(updates);
  };

  _handleTrust = async (user) => {
    const response = await Actions.createTrustRelationship({ userId: user.id });
    console.log(response);

    await this._handleUpdate();
  };

  _handleSubscribe = async (entity) => {
    let response;
    if (entity.type === "USER" || entity.target_user_id) {
      response = await Actions.createSubscription({
        userId: entity.target_user_id ? entity.target_user_id : entity.id,
      });
    }

    if (entity.type === "SLATE" || entity.target_slate_id) {
      response = await Actions.createSubscription({
        slateId: entity.target_slate_id ? entity.target_slate_id : entity.id,
      });
    }

    await this._handleUpdate();
  };

  render() {
    console.log(this.state.viewer);

    return (
      <div css={STYLES_ROW}>
        <div css={STYLES_COLUMN}>
          {this.state.viewer.trusted.map((each) => {
            return (
              <div css={STYLES_ITEM} key={each.id}>
                {JSON.stringify(each, null, 1)}{" "}
              </div>
            );
          })}
        </div>
        <div css={STYLES_COLUMN}>
          <button onClick={this._handleUpdate}>
            Update {this.state.viewer.username}
          </button>
          <br />
          <input
            type="text"
            onChange={this._handleChange}
            placeholder="type anything to search"
          />

          {this.state.results.map((each) => {
            if (!each) {
              return;
            }

            return (
              <div css={STYLES_ITEM} key={each.id}>
                {JSON.stringify(each, null, 1)}{" "}
                <div>
                  {each.type === "USER" ? (
                    <button onClick={() => this._handleTrust(each)}>
                      Trust
                    </button>
                  ) : null}
                  <button onClick={() => this._handleSubscribe(each)}>
                    Subscribe
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <div css={STYLES_COLUMN}>
          {this.state.viewer.subscriptions.map((each) => {
            return (
              <div css={STYLES_ITEM} key={each.id}>
                {JSON.stringify(each, null, 1)}{" "}
                <div>
                  <button onClick={() => this._handleSubscribe(each)}>
                    Unsubscribe
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
