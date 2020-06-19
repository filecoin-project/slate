import * as React from "react";
import * as Strings from "~/common/strings";
import * as Constants from "~/common/constants";
import * as Fixtures from "~/common/fixtures";
import * as System from "~/components/system";
import * as SchemaTable from "~/common/schema-table";

import { css } from "@emotion/react";

import Section from "~/components/core/Section";
import ScenePage from "~/components/core/ScenePage";

export default class SceneDeals extends React.Component {
  state = {};

  _handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <ScenePage>
        <Section
          onAction={this.props.onAction}
          onNavigateTo={this.props.onNavigateTo}
          title="All deals"
          buttons={[]}
        >
          <System.Table
            onAction={this.props.onAction}
            onNavigateTo={this.props.onNavigateTo}
            data={{ columns: SchemaTable.Deals, rows: this.props.viewer.deals }}
            selectedRowId={this.state.table_deals}
            onChange={this._handleChange}
            name="table_deals"
          />
        </Section>
      </ScenePage>
    );
  }
}
