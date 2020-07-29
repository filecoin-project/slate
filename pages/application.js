import * as React from "react";

import Application from "~/components/core/Application";

export const getServerSideProps = async (context) => {
  return {
    props: { ...context.query },
  };
};

export default class ApplicationPage extends React.Component {
  render() {
    return <Application {...this.props} />;
  }
}
