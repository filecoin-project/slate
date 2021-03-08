import * as React from "react";

import Application from "~/components/core/Application";

export const getServerSideProps = async ({ query }) => {
  return {
    props: {
      viewer: query.viewer,
      analytics: query.analytics,
      mobile: query.mobile,
      mac: query.mac,
      resources: query.resources,
    },
  };
};

export default class ApplicationPage extends React.Component {
  render() {
    return (
      <Application
        viewer={this.props.viewer}
        analytics={this.props.analytics}
        mobile={this.props.mobile}
        mac={this.props.mac}
        resources={this.props.resources}
      />
    );
  }
}
