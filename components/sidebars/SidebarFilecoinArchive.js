import * as React from "react";
import * as Constants from "~/common/constants";
import * as Actions from "~/common/actions";
import * as System from "~/components/system";
import * as Window from "~/common/window";
import * as Messages from "~/common/messages";
import * as Events from "~/common/custom-events";

const DEFAULT_ERROR_MESSAGE = "We could not make your deal. Please try again later.";

export default class SidebarFilecoinArchive extends React.Component {
  state = { response: null, loading: false };

  async componentDidMount() {}

  _handleMakeDeal = async () => {
    return await Actions.archive({});
  };

  _handleSubmit = async (e) => {
    if (e) {
      e.persist();
    }

    await this.setState({ loading: true });
    const response = await this._handleMakeDeal();

    if (Events.hasError(response)) {
      return;
    }

    await Window.delay(5000);
    alert(
      "Your storage deal was put in the queue. This can take up to 36 hours, check back later."
    );
    window.location.reload();
  };

  _handleCancel = () => {
    this.props.onCancel();
  };

  _handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <React.Fragment>
        <System.P
          style={{
            fontFamily: Constants.font.semiBold,
            fontSize: Constants.typescale.lvl3,
          }}
        >
          Archive your data
        </System.P>

        <System.P style={{ marginTop: 24 }}>
          This will archive all of your data onto the Filecoin Network with a storage deal using
          your default settings.
        </System.P>

        <System.ButtonPrimary
          full
          style={{ marginTop: 48 }}
          onClick={this._handleSubmit}
          loading={this.state.loading}
        >
          Make storage deal
        </System.ButtonPrimary>

        {this.state.response ? (
          <div style={{ whiteSpace: "pre-wrap", marginTop: 48 }}>
            {JSON.stringify(this.state.response, null, 2)}
          </div>
        ) : null}
      </React.Fragment>
    );
  }
}
