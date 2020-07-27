import * as React from "react";
import * as System from "~/components/system";

import { css } from "@emotion/react";

import ScenePage from "~/components/core/ScenePage";

// TODO(jim): Figure out the local data story.
export default class SceneSlate extends React.Component {
  render() {
    console.log(this.props);
    return <ScenePage>Scene Slate</ScenePage>;
  }
}
