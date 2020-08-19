import * as React from "react";

import Application from "~/components/core/Application";

export const getServerSideProps = async ({ query, res }) => {
  let json = null;
  try {
    const response = await fetch("https://hub.textile.io/health", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    json = await response.json();
  } catch (e) {
    console.log(e);
  }

  // TODO(jim): Do something more robust here.
  if (json) {
    console.log(json);
  } else {
    return res.redirect("/maintenance");
  }

  return {
    props: { viewer: query.viewer, analytics: query.analytics },
  };
};

export default class ApplicationPage extends React.Component {
  render() {
    return <Application viewer={this.props.viewer} analytics={this.props.analytics} />;
  }
}
