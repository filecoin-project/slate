import * as React from "react";
import * as System from "~/components/system";

import { css } from "@emotion/react";

import ScenePage from "~/components/core/ScenePage";

// TODO(jim): Figure out the activity story.
export default class SceneDirectory extends React.Component {
  render() {
    return (
      <ScenePage>
        <System.DescriptionGroup
          label="Coming soon"
          description="Your directory on Slate will appear here."
        />
      </ScenePage>
    );
  }
}
