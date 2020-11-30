import * as React from "react";
import * as Actions from "~/common/actions";
import * as System from "~/components/system";
import * as SVG from "~/common/svg";
import * as Constants from "~/common/constants";

import { css } from "@emotion/react";

import ScenePage from "~/components/core/ScenePage";
import ScenePageHeader from "~/components/core/ScenePageHeader";

export default class SceneEncryptedData extends React.Component {
  render() {
    return (
      <ScenePage>
        <ScenePageHeader title="Encrypted data">
          All data on Slate is accessible by the public if they have the URL. <br />
          <br />
          In the future you will be allowed to add encrypted data that is secure and not accessible
          via URL. This data will only be accessible by you.
          <br />
          <br />
          This feature will be enabled soon.
        </ScenePageHeader>
      </ScenePage>
    );
  }
}
