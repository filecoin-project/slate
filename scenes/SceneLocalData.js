import * as React from "react";
import * as System from "~/components/system";

import { css } from "@emotion/react";

import ScenePage from "~/components/core/ScenePage";

// TODO(jim): Figure out the local data story.
export default class SceneLocalData extends React.Component {
  render() {
    return (
      <ScenePage>
        <System.DescriptionGroup
          label="Coming soon"
          description="An offline client for Slate with local file storage."
        />
      </ScenePage>
    );
  }
}
