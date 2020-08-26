import * as React from "react";
import * as Constants from "~/common/constants";
import * as System from "~/components/system";

import { css } from "@emotion/react";

export const getServerSideProps = async (context) => {
  return {
    props: { ...context.query },
  };
};

export default class IntegrationPage extends React.Component {
  state = {};

  componentDidMount() {}

  render() {
    console.log(this.props.viewer);
    return <div>Integration Test</div>;
  }
}
