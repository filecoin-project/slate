import * as React from "react";
import * as Constants from "~/common/constants";
import * as System from "~/components/system";
import * as Actions from "~/common/actions";

import { css } from "@emotion/react";

export const getServerSideProps = async (context) => {
  return {
    props: { ...context.query },
  };
};

export default class IntegrationPage extends React.Component {
  state = {
    results: [],
  };

  componentDidMount() {}

  _handleChange = async (e) => {
    const query = e.target.value;

    const results = await Actions.search({ query });

    this.setState({ results: results.data.results });
  };

  render() {
    console.log(this.props.viewer);
    console.log({ results: this.state.results });
    return (
      <div>
        <input type="text" onChange={this._handleChange} />
      </div>
    );
  }
}
