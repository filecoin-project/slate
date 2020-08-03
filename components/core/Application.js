import * as React from "react";
import * as NavigationData from "~/common/navigation-data";
import * as Actions from "~/common/actions";
import * as State from "~/common/state";
import * as Credentials from "~/common/credentials";
import * as Validations from "~/common/validations";

// NOTE(jim):
// Scenes each have an ID and can be navigated to with _handleAction
import SceneDeals from "~/scenes/SceneDeals";
import SceneEditAccount from "~/scenes/SceneEditAccount";
import SceneFile from "~/scenes/SceneFile";
import SceneFilesFolder from "~/scenes/SceneFilesFolder";
import SceneHome from "~/scenes/SceneHome";
import SceneSettings from "~/scenes/SceneSettings";
import SceneWallet from "~/scenes/SceneWallet";
import SceneSlates from "~/scenes/SceneSlates";
import SceneLocalData from "~/scenes/SceneLocalData";
import SceneSettingsDeveloper from "~/scenes/SceneSettingsDeveloper";
import SceneSignIn from "~/scenes/SceneSignIn";
import SceneSlate from "~/scenes/SceneSlate";

// NOTE(jim):
// Sidebars each have a decorator and can be shown to with _handleAction
import SidebarCreateSlate from "~/components/sidebars/SidebarCreateSlate";
import SidebarCreateWalletAddress from "~/components/sidebars/SidebarCreateWalletAddress";
import SidebarWalletSendFunds from "~/components/sidebars/SidebarWalletSendFunds";
import SidebarFileStorageDeal from "~/components/sidebars/SidebarFileStorageDeal";
import SidebarAddFileToBucket from "~/components/sidebars/SidebarAddFileToBucket";
import SidebarDragDropNotice from "~/components/sidebars/SidebarDragDropNotice";

// NOTE(jim):
// Core components to the application structure.
import ApplicationNavigation from "~/components/core/ApplicationNavigation";
import ApplicationHeader from "~/components/core/ApplicationHeader";
import ApplicationLayout from "~/components/core/ApplicationLayout";
import WebsitePrototypeWrapper from "~/components/core/WebsitePrototypeWrapper";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export default class ApplicationPage extends React.Component {
  state = {
    selected: State.getSelectedState(this.props.viewer),
    viewer: State.getInitialState(this.props.viewer),
    history: [{ id: 1, scrollTop: 0, data: null }],
    currentIndex: 0,
    data: null,
    sidebar: null,
    sidebarLoading: false,
    online: null,
  };

  async componentDidMount() {
    window.addEventListener("dragenter", this._handleDragEnter);
    window.addEventListener("dragleave", this._handleDragLeave);
    window.addEventListener("dragover", this._handleDragOver);
    window.addEventListener("drop", this._handleDrop);

    window.addEventListener("online", this._handleOnlineStatus);
    window.addEventListener("offline", this._handleOnlineStatus);
  }

  componentWillUnmount() {
    window.removeEventListener("dragenter", this._handleDragEnter);
    window.removeEventListener("dragleave", this._handleDragLeave);
    window.removeEventListener("dragover", this._handleDragOver);
    window.removeEventListener("drop", this._handleDrop);
  }

  _handleOnlineStatus = async () => {
    window.alert(navigator.onLine ? "online" : "offline");
    this.setState({ online: navigator.onLine });
  };

  _handleSetFile = async ({ file, slate }) => {
    this.setState({ fileLoading: true });

    let data = new FormData();
    data.append("data", file);

    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: data,
    };

    const response = await fetch(`/api/data/${file.name}`, options);
    const json = await response.json();

    if (!json) {
      this.setState({ sidebar: null, fileLoading: false });
      return;
    }

    if (json.error) {
      this.setState({ sidebar: null, fileLoading: false });
      return;
    }

    if (!json.data) {
      this.setState({ sidebar: null, fileLoading: false });
      return;
    }

    if (json && slate) {
      const addResponse = await fetch(`/api/slates/add-url`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ slate, data: { ...json.data } }),
      });

      if (!addResponse || addResponse.error) {
        console.log(addResponse.error);
        alert("TODO: Adding an image to Slate went wrong.");
      }
    }

    await this.rehydrate();

    this.setState({ sidebar: null, fileLoading: false });
  };

  _handleDragEnter = (e) => {
    if (this.state.sidebar) {
      return;
    }

    e.preventDefault();

    this._handleAction({
      type: "SIDEBAR",
      value: "SIDEBAR_DRAG_DROP_NOTICE",
    });
  };

  _handleDragLeave = (e) => {
    e.preventDefault();
  };

  _handleDragOver = (e) => {
    e.preventDefault();
  };

  _handleSidebarLoading = (sidebarLoading) => this.setState({ sidebarLoading });

  _handleDrop = async (e) => {
    e.preventDefault();

    this.setState({ fileLoading: true });

    // TODO(jim):
    // Refactor later
    const navigation = NavigationData.generate(this.state.viewer);
    const next = this.state.history[this.state.currentIndex];
    const current = NavigationData.getCurrentById(navigation, next.id);

    let slate;
    if (current.target && current.target.slatename) {
      slate = { ...current.target, id: current.target.slateId };
    }

    if (e.dataTransfer.items) {
      for (var i = 0; i < e.dataTransfer.items.length; i++) {
        if (e.dataTransfer.items[i].kind === "file") {
          var file = e.dataTransfer.items[i].getAsFile();

          console.log(file);

          if (Validations.isFileTypeAllowed(file.type)) {
            this._handleAction({
              type: "SIDEBAR",
              value: "SIDEBAR_ADD_FILE_TO_BUCKET",
              data: slate,
            });

            await this._handleSetFile({ file, slate });
          }

          break;
        }
      }
    }

    this.setState({ fileLoading: false });
  };

  rehydrate = async () => {
    const response = await Actions.hydrateAuthenticatedUser();

    console.log("REHYDRATION CALL", response);

    if (!response || response.error) {
      return null;
    }

    this.setState({
      viewer: State.getInitialState(response.data),
      selected: State.getSelectedState(response.data),
    });

    return { rehydrated: true };
  };

  _handleSubmit = async (data) => {
    let response;
    if (data.type === "CREATE_SLATE") {
      response = await Actions.createSlate({
        name: data.name,
      });
    }

    if (data.type === "CREATE_WALLET_ADDRESS") {
      response = await Actions.updateViewer({
        type: "CREATE_FILECOIN_ADDRESS",
        address: {
          name: data.name,
          type: data.wallet_type,
          makeDefault: data.makeDefault,
        },
      });
    }

    if (data.type === "SEND_WALLET_ADDRESS_FILECOIN") {
      response = await Actions.sendFilecoin({
        source: data.source,
        target: data.target,
        amount: data.amount,
      });
    }

    console.log({ response });

    await this.rehydrate();

    this._handleDismissSidebar();

    return response;
  };

  _handleCancel = () => {
    this._handleDismissSidebar();
  };

  _handleDeleteYourself = async () => {
    // TODO(jim):
    // Put this somewhere better for messages.
    const message =
      "Do you really want to delete your account? It will be permanently removed";
    if (!window.confirm(message)) {
      return false;
    }

    let response = await Actions.deleteViewer();
    console.log("DELETE_VIEWER", response);

    await this._handleSignOut();
  };

  _handleAuthenticate = async (state) => {
    // NOTE(jim): Kills existing session cookie if there is one.
    const jwt = cookies.get(Credentials.session.key);

    if (jwt) {
      cookies.remove(Credentials.session.key);
    }

    // NOTE(jim): Acts as our existing username exists check.
    // If the user exists, move on the sign in anyways.
    let response = await Actions.createUser(state);
    console.log("CREATE_USER", response);

    response = await Actions.signIn(state);
    if (response.error) {
      console.log("SIGN IN ERROR", response);
      return null;
    }

    if (response.token) {
      // NOTE(jim):
      // + One week.
      // + Only requests to the same site.
      // + Not using sessionStorage so the cookie doesn't leave when the browser dies.
      cookies.set(Credentials.session.key, response.token, true, {
        path: "/",
        maxAge: 3600 * 24 * 7,
        sameSite: "strict",
      });
    }

    return await this.rehydrate();
  };

  _handleSignOut = () => {
    const jwt = cookies.get(Credentials.session.key);

    if (jwt) {
      cookies.remove(Credentials.session.key);
      window.location.reload();
    }
  };

  _handleViewerChange = (e) => {
    this.setState({
      viewer: { ...this.state.viewer, [e.target.name]: e.target.value },
    });
  };

  _handleSelectedChange = (e) => {
    this.setState({
      selected: { ...this.state.selected, [e.target.name]: e.target.value },
    });
  };

  _handleDismissSidebar = () => {
    this.setState({ sidebar: null, sidebarLoading: false, data: null });
  };

  _handleAction = (options) => {
    console.log(options);
    if (options.type === "NAVIGATE") {
      return this._handleNavigateTo({ id: options.value }, options.data);
    }

    if (options.type === "NEW_WINDOW") {
      return window.open(options.value);
    }

    if (options.type === "ACTION") {
      return alert(JSON.stringify(options));
    }

    if (options.type === "DOWNLOAD") {
      return alert(JSON.stringify(options));
    }

    if (options.type === "SIDEBAR") {
      return this.setState({
        sidebar: this.sidebars[options.value],
        data: options.data,
      });
    }

    return alert(JSON.stringify(options));
  };

  _handleNavigateTo = (next, data = null) => {
    this.state.history[this.state.currentIndex].scrollTop = window.scrollY;
    this.state.history[this.state.currentIndex].data = data;

    if (this.state.currentIndex !== this.state.history.length - 1) {
      const adjustedArray = [...this.state.history];
      adjustedArray.length = this.state.currentIndex + 1;

      return this.setState(
        {
          history: [...adjustedArray, next],
          currentIndex: this.state.currentIndex + 1,
          data,
          sidebar: null,
        },
        () => window.scrollTo(0, 0)
      );
    }

    this.setState(
      {
        history: [...this.state.history, next],
        currentIndex: this.state.currentIndex + 1,
        data,
        sidebar: null,
      },
      () => window.scrollTo(0, 0)
    );
  };

  _handleBack = () => {
    this.state.history[this.state.currentIndex].scrollTop = window.scrollY;

    const next = this.state.history[this.state.currentIndex - 1];

    this.setState(
      {
        currentIndex: this.state.currentIndex - 1,
        sidebar: null,
        data: { ...next.data },
      },
      () => {
        console.log({ next });
        window.scrollTo(0, next.scrollTop);
      }
    );
  };

  _handleForward = () => {
    this.state.history[this.state.currentIndex].scrollTop = window.scrollY;

    const next = this.state.history[this.state.currentIndex + 1];

    this.setState(
      {
        currentIndex: this.state.currentIndex + 1,
        sidebar: null,
        data: { ...next.data },
      },
      () => {
        console.log({ next });
        window.scrollTo(0, next.scrollTop);
      }
    );
  };

  sidebars = {
    SIDEBAR_FILE_STORAGE_DEAL: <SidebarFileStorageDeal />,
    SIDEBAR_WALLET_SEND_FUNDS: <SidebarWalletSendFunds />,
    SIDEBAR_CREATE_WALLET_ADDRESS: <SidebarCreateWalletAddress />,
    SIDEBAR_ADD_FILE_TO_BUCKET: <SidebarAddFileToBucket />,
    SIDEBAR_CREATE_SLATE: <SidebarCreateSlate />,
    SIDEBAR_DRAG_DROP_NOTICE: <SidebarDragDropNotice />,
  };

  scenes = {
    HOME: <SceneHome />,
    WALLET: <SceneWallet />,
    FOLDER: <SceneFilesFolder />,
    FILE: <SceneFile />,
    SLATE: <SceneSlate />,
    DEALS: <SceneDeals />,
    SETTINGS: <SceneSettings />,
    SETTINGS_DEVELOPER: <SceneSettingsDeveloper />,
    EDIT_ACCOUNT: <SceneEditAccount />,
    SLATES: <SceneSlates />,
    LOCAL_DATA: <SceneLocalData />,
  };

  render() {
    // NOTE(jim): Not authenticated.
    if (!this.state.viewer) {
      return (
        <WebsitePrototypeWrapper
          title="Slate: sign in"
          description="Sign in to your Slate account to manage your assets."
          url="https://slate.host/application"
        >
          <SceneSignIn
            onAuthenticate={this._handleAuthenticate}
            onNavigateTo={this._handleNavigateTo}
          />
        </WebsitePrototypeWrapper>
      );
    }

    // NOTE(jim): Authenticated.
    const navigation = NavigationData.generate(this.state.viewer);
    const next = this.state.history[this.state.currentIndex];
    const current = NavigationData.getCurrentById(navigation, next.id);

    const navigationElement = (
      <ApplicationNavigation
        viewer={this.state.viewer}
        activeId={current.target.id}
        activeIds={current.activeIds}
        navigation={navigation}
        onNavigateTo={this._handleNavigateTo}
        onAction={this._handleAction}
      />
    );

    const headerElement = (
      <ApplicationHeader
        viewer={this.state.viewer}
        pageTitle={current.target.pageTitle}
        currentIndex={this.state.currentIndex}
        onBack={this._handleBack}
        onForward={this._handleForward}
        history={this.state.history}
        onNavigateTo={this._handleNavigateTo}
        onAction={this._handleAction}
        onSignOut={this._handleSignOut}
      />
    );

    const scene = React.cloneElement(this.scenes[current.target.decorator], {
      current: current.target,
      data: this.state.data,
      viewer: this.state.viewer,
      selected: this.state.selected,
      onNavigateTo: this._handleNavigateTo,
      onSelectedChange: this._handleSelectedChange,
      onViewerChange: this._handleViewerChange,
      onDeleteYourself: this._handleDeleteYourself,
      onAction: this._handleAction,
      onBack: this._handleBack,
      onForward: this._handleForward,
      onRehydrate: this.rehydrate,
    });

    let sidebarElement;
    if (this.state.sidebar) {
      sidebarElement = React.cloneElement(this.state.sidebar, {
        selected: this.state.selected,
        viewer: this.state.viewer,
        data: this.state.data,
        fileLoading: this.state.fileLoading,
        sidebarLoading: this.state.sidebarLoading,
        onSelectedChange: this._handleSelectedChange,
        onSubmit: this._handleSubmit,
        onCancel: this._handleCancel,
        onSetFile: this._handleSetFile,
        onSidebarLoading: this._handleSidebarLoading,
        onRehydrate: this.rehydrate,
      });
    }

    const title = `Slate : ${current.target.pageTitle}`;
    const description = "This is an early preview.";
    const url = "https://fps.onrender.com/v1";

    return (
      <React.Fragment>
        <WebsitePrototypeWrapper
          title={title}
          description={description}
          url={url}
        >
          <ApplicationLayout
            navigation={navigationElement}
            header={headerElement}
            sidebar={sidebarElement}
            onDismissSidebar={this._handleDismissSidebar}
          >
            {scene}
          </ApplicationLayout>
        </WebsitePrototypeWrapper>
      </React.Fragment>
    );
  }
}
