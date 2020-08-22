import * as React from "react";
import * as System from "~/components/system";

import { css } from "@emotion/react";

import ScenePage from "~/components/core/ScenePage";
import ScenePageHeader from "~/components/core/ScenePageHeader";

// TODO(jim): Figure out the local data story.
export default class SceneLocalData extends React.Component {
  render() {
    return (
      <ScenePage>
        <ScenePageHeader title="Local [WIP]">
          This scene is currently a work in progress.
        </ScenePageHeader>
      </ScenePage>
    );
  }
}
