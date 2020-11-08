import * as React from "react";

import ScenePage from "~/components/core/ScenePage";
import ScenePageHeader from "~/components/core/ScenePageHeader";

// TODO(jim): Figure out the activity story.
export default class SceneActivity extends React.Component {
  render() {
    return (
      <ScenePage>
        <ScenePageHeader title="Network [WIP]">
          This scene is currently a work in progress.
        </ScenePageHeader>
      </ScenePage>
    );
  }
}
