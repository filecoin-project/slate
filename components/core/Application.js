import * as React from "react";
import * as NavigationData from "~/common/navigation-data";
import * as Actions from "~/common/actions";
import * as Strings from "~/common/strings";
import * as State from "~/common/state";
import * as Credentials from "~/common/credentials";
import * as Constants from "~/common/constants";
import * as Validations from "~/common/validations";
import * as FileUtilities from "~/common/file-utilities";
import * as System from "~/components/system";
import * as Window from "~/common/window";
import * as Store from "~/common/store";
import * as Websockets from "~/common/browser-websockets";

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
import SceneActivity from "~/scenes/SceneActivity";
import SceneDirectory from "~/scenes/SceneDirectory";
import SceneProfile from "~/scenes/SceneProfile";
import SceneSentinel from "~/scenes/SceneSentinel";
import ScenePublicProfile from "~/scenes/ScenePublicProfile";
import ScenePublicSlate from "~/scenes/ScenePublicSlate";
import SceneArchive from "~/scenes/SceneArchive";
import SceneMakeFilecoinDeal from "~/scenes/SceneMakeFilecoinDeal";
import SceneEncryptedData from "~/scenes/SceneEncryptedData";
import SceneMiners from "~/scenes/SceneMiners";

// NOTE(jim):
// Sidebars each have a decorator and can be shown to with _handleAction
import SidebarCreateSlate from "~/components/sidebars/SidebarCreateSlate";
import SidebarCreateWalletAddress from "~/components/sidebars/SidebarCreateWalletAddress";
import SidebarWalletSendFunds from "~/components/sidebars/SidebarWalletSendFunds";
import SidebarFileStorageDeal from "~/components/sidebars/SidebarFileStorageDeal";
import SidebarAddFileToBucket from "~/components/sidebars/SidebarAddFileToBucket";
import SidebarAddFileToSlate from "~/components/sidebars/SidebarAddFileToSlate";
import SidebarDragDropNotice from "~/components/sidebars/SidebarDragDropNotice";
import SidebarSingleSlateSettings from "~/components/sidebars/SidebarSingleSlateSettings";
import SidebarFilecoinArchive from "~/components/sidebars/SidebarFilecoinArchive";
import SidebarHelp from "~/components/sidebars/SidebarHelp";
import SidebarFAQ from "~/components/sidebars/SidebarFAQ";

// NOTE(jim):
// Core components to the application structure.
import ApplicationHeader from "~/components/core/ApplicationHeader";
import ApplicationLayout from "~/components/core/ApplicationLayout";
import WebsitePrototypeWrapper from "~/components/core/WebsitePrototypeWrapper";
import Cookies from "universal-cookie";

import { OnboardingModal } from "~/components/core/OnboardingModal";
import { SearchModal } from "~/components/core/SearchModal";
import { dispatchCustomEvent } from "~/common/custom-events";
import { Alert } from "~/components/core/Alert";
import { announcements } from "~/components/core/OnboardingModal";

const cookies = new Cookies();

const SIDEBARS = {
  SIDEBAR_FILECOIN_ARCHIVE: <SidebarFilecoinArchive />,
  SIDEBAR_FILE_STORAGE_DEAL: <SidebarFileStorageDeal />,
  SIDEBAR_WALLET_SEND_FUNDS: <SidebarWalletSendFunds />,
  SIDEBAR_CREATE_WALLET_ADDRESS: <SidebarCreateWalletAddress />,
  SIDEBAR_ADD_FILE_TO_BUCKET: <SidebarAddFileToBucket />,
  SIDEBAR_ADD_FILE_TO_SLATE: <SidebarAddFileToSlate />,
  SIDEBAR_CREATE_SLATE: <SidebarCreateSlate />,
  SIDEBAR_DRAG_DROP_NOTICE: <SidebarDragDropNotice />,
  SIDEBAR_SINGLE_SLATE_SETTINGS: <SidebarSingleSlateSettings />,
  SIDEBAR_HELP: <SidebarHelp />,
  SIDEBAR_FAQ: <SidebarFAQ />,
};

const SCENES = {
  HOME: <SceneHome />,
  DIRECTORY: <SceneDirectory />,
  PUBLIC_PROFILE: <ScenePublicProfile />,
  PROFILE: <SceneProfile />,
  FOLDER: <SceneFilesFolder />,
  FILE: <SceneFile />,
  PUBLIC_SLATE: <ScenePublicSlate />,
  SLATE: <SceneSlate />,
  SETTINGS_DEVELOPER: <SceneSettingsDeveloper />,
  EDIT_ACCOUNT: <SceneEditAccount />,
  SLATES: <SceneSlates />,
  LOCAL_DATA: <SceneLocalData />,
  DIRECTORY: <SceneDirectory />,
  FILECOIN: <SceneArchive />,
};

let mounted;

export default class ApplicationPage extends React.Component {
  _body;

  state = {
    selected: {},
    viewer: this.props.viewer,
    history: [{ id: "V1_NAVIGATION_HOME", scrollTop: 0, data: null }],
    currentIndex: 0,
    data: null,
    sidebar: null,
    sidebarLoading: false,
    online: null,
    sidebar: null,
    mobile: this.props.mobile,
  };

  async componentDidMount() {
    if (mounted) {
      return false;
    }

    mounted = true;

    window.addEventListener("dragenter", this._handleDragEnter);
    window.addEventListener("dragleave", this._handleDragLeave);
    window.addEventListener("dragover", this._handleDragOver);
    window.addEventListener("drop", this._handleDrop);
    window.addEventListener("online", this._handleOnlineStatus);
    window.addEventListener("offline", this._handleOnlineStatus);
    window.addEventListener("resize", this._handleWindowResize);

    const id = Window.getQueryParameterByName("scene");
    const user = Window.getQueryParameterByName("user");
    const slate = Window.getQueryParameterByName("slate");

    let wsclient = Websockets.getClient();
    if (wsclient) {
      await Websockets.deleteClient();
      wsclient = null;
    }

    if (this.state.viewer) {
      wsclient = this._handleSetupWebsocket();
      if (!wsclient) {
        dispatchCustomEvent({
          name: "create-alert",
          detail: {
            alert: {
              message:
                "We cannot connect to our live update server. You may have to refresh to see updates.",
            },
          },
        });
      }
    }

    if (!Strings.isEmpty(id) && this.state.viewer) {
      console.log("redirecting to page");
      return this._handleNavigateTo({ id, user, slate });
    }
  }

  componentWillUnmount() {
    window.removeEventListener("dragenter", this._handleDragEnter);
    window.removeEventListener("dragleave", this._handleDragLeave);
    window.removeEventListener("dragover", this._handleDragOver);
    window.removeEventListener("drop", this._handleDrop);
    window.removeEventListener("resize", this._handleWindowResize);

    mounted = false;

    let wsclient = Websockets.getClient();
    if (wsclient) {
      Websockets.deleteClient();
    }
  }

  //make this a function that can handle different types of inputs and updates state accordingly (rather than ahving a bunch of different functions for each type)
  _handleUpdateViewer = (newViewerState) => {
    console.log("update viewer");
    console.log({ newViewerState });
    if (this.state.viewer && newViewerState.id && newViewerState.id === this.state.viewer.id) {
      console.log(this.state.viewer);
      console.log(newViewerState);
      this.setState({
        viewer: { ...this.state.viewer, ...newViewerState, type: "VIEWER" },
      });
    }
  };

  _handleSetupWebsocket = () => {
    if (this.props.resources && !Strings.isEmpty(this.props.resources.pubsub)) {
      if (!this.state.viewer) {
        console.log("WEBSOCKET: NOT AUTHENTICATED");
        return null;
      }

      return Websockets.init({
        resource: this.props.resources.pubsub,
        viewer: this.state.viewer,
        onUpdate: this._handleUpdateViewer,
      });
    }

    return null;
  };

  _handleWindowResize = () => {
    const { width } = Window.getViewportSize();

    // (1) is Window.isMobileBrowser checks, that one holds.
    // (2) then if the viewport is smaller than the width
    let mobile = width > Constants.sizes.mobile ? this.props.mobile : true;

    // only change if necessary.
    if (this.state.mobile !== mobile) {
      console.log("changing to mobile?", mobile);
      this.setState({ mobile });
    }
  };

  _handleOnlineStatus = async () => {
    if (navigator.onLine) {
      dispatchCustomEvent({
        name: "create-alert",
        detail: { alert: { message: "Back online!", status: "INFO" } },
      });
    } else {
      dispatchCustomEvent({
        name: "create-alert",
        detail: { alert: { message: "Offline. Trying to reconnect" } },
      });
    }
    this.setState({ online: navigator.onLine });
  };

  _handleDrop = async (e) => {
    this._handleDismissSidebar();
    // NOTE(jim): If this is true, then drag and drop came from a slate object.
    const data = e.dataTransfer.getData("slate-object-drag-data");
    if (data) {
      return;
    }

    e.preventDefault();

    // TODO(jim): Refactor later
    const navigation = NavigationData.generate(this.state.viewer);
    const next = this.state.history[this.state.currentIndex];
    const current = NavigationData.getCurrentById(navigation, next.id);

    let slate = null;
    if (current.target && current.target.slateId) {
      slate = { id: current.target.slateId };
    }

    const files = [];
    let fileLoading = {};
    // let sidebarOpen = false;
    if (e.dataTransfer.items && e.dataTransfer.items.length) {
      for (var i = 0; i < e.dataTransfer.items.length; i++) {
        if (e.dataTransfer.items[i].kind === "file") {
          var file = e.dataTransfer.items[i].getAsFile();

          // if (!sidebarOpen) {
          //   this._handleAction({
          //     type: "SIDEBAR",
          //     value: "SIDEBAR_ADD_FILE_TO_BUCKET",
          //     data: slate,
          //   });
          //   sidebarOpen = true;
          // }

          files.push(file);
          fileLoading[`${file.lastModified}-${file.name}`] = {
            name: file.name,
            loaded: 0,
            total: file.size,
          };
        }
      }
    }

    if (!files.length) {
      dispatchCustomEvent({
        name: "create-alert",
        detail: {
          alert: {
            message: "File type not supported. Please try a different file",
          },
        },
      });
      return;
    }

    // NOTE(jim): Stages each file.
    this._handleRegisterFileLoading({ fileLoading });

    this._handleUpload({ files, slate, keys: Object.keys(fileLoading) });
  };

  _handleUploadFiles = async ({ files, slate }) => {
    let toUpload = [];
    let fileLoading = {};
    let someFailed = false;
    for (let i = 0; i < files.length; i++) {
      let file = files[i];

      if (!file) {
        someFailed = true;
        continue;
      }

      toUpload.push(file);
      fileLoading[`${file.lastModified}-${file.name}`] = {
        name: file.name,
        loaded: 0,
        total: file.size,
      };
    }

    if (!toUpload.length) {
      dispatchCustomEvent({
        name: "create-alert",
        detail: {
          alert: { message: "We could not find any files to upload." },
        },
      });
      return false;
    }

    if (someFailed) {
      dispatchCustomEvent({
        name: "create-alert",
        detail: {
          alert: { message: "Some of your files could not be uploaded" },
        },
      });
    }

    this._handleRegisterFileLoading({ fileLoading });
    this._handleUpload({
      files: toUpload,
      slate,
      keys: Object.keys(fileLoading),
    });
  };

  _handleUpload = async ({ files, slate, keys }) => {
    if (!files || !files.length) {
      return null;
    }

    const resolvedFiles = [];
    for (let i = 0; i < files.length; i++) {
      if (Store.checkCancelled(`${files[i].lastModified}-${files[i].name}`)) {
        continue;
      }

      // NOTE(jim): With so many failures, probably good to wait a few seconds.
      await Window.delay(3000);

      // NOTE(jim): Sends XHR request.
      let response = null;
      try {
        response = await FileUtilities.upload({
          file: files[i],
          context: this,
          routes: this.props.resources,
        });
      } catch (e) {
        console.log(e);
      }

      // NOTE(jim): We probably don't want to keep the responses for failed attempt.
      if (!response || response.error) {
        continue;
      }

      if (response) {
        resolvedFiles.push(response);
      }
    }

    if (!resolvedFiles.length) {
      this.setState({ fileLoading: {} });
      return null;
    }

    let responses = await Promise.allSettled(resolvedFiles);

    let succeeded = responses
      .filter((res) => {
        return res.status === "fulfilled" && res.value && !res.value.error;
      })
      .map((res) => res.value);
    if (slate && slate.id) {
      await FileUtilities.uploadToSlate({ responses: succeeded, slate });
    }

    let processResponse = await Actions.processPendingFiles();
    if (!processResponse) {
      dispatchCustomEvent({
        name: "create-alert",
        detail: {
          alert: {
            message: "We encountered issues updating your uploaded files. Please try again",
          },
        },
      });
      return;
    }

    if (processResponse.error) {
      dispatchCustomEvent({
        name: "create-alert",
        detail: {
          alert: {
            decorator: processResponse.decorator,
          },
        },
      });
      return;
    }

    this.setState({ sidebar: null });

    if (!slate) {
      const { added, skipped } = processResponse.data;
      let message = Strings.formatAsUploadMessage(added, skipped);
      dispatchCustomEvent({
        name: "create-alert",
        detail: {
          alert: { message, status: !added ? null : "INFO" },
        },
      });
    }

    this._handleRegisterLoadingFinished({ keys });

    return null;
  };

  _handleRegisterFileLoading = ({ fileLoading }) => {
    if (this.state.fileLoading) {
      return this.setState({
        fileLoading: { ...this.state.fileLoading, ...fileLoading },
      });
    }
    return this.setState({
      fileLoading,
    });
  };

  _handleRegisterFileCancelled = ({ key }) => {
    let fileLoading = this.state.fileLoading;
    fileLoading[key].cancelled = true;
    this.setState({ fileLoading });
  };

  _handleRegisterLoadingFinished = ({ keys }) => {
    let fileLoading = this.state.fileLoading;
    for (let key of keys) {
      delete fileLoading[key];
    }
    this.setState({ fileLoading });
  };

  _handleDragEnter = (e) => {
    e.preventDefault();
    if (this.state.sidebar) {
      return;
    }

    // NOTE(jim): Only allow the sidebar to show with file drag and drop.
    if (
      e.dataTransfer.items &&
      e.dataTransfer.items.length &&
      e.dataTransfer.items[0].kind !== "file"
    ) {
      return;
    }

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

  //change the naem to hydrate. and use this only upon initial sign in (should be the only time you need it)
  rehydrate = async (options) => {
    const response = await Actions.hydrateAuthenticatedUser();

    if (!response || response.error) {
      dispatchCustomEvent({
        name: "create-alert",
        detail: {
          alert: {
            message: "We encountered issues while refreshing. Please try again",
          },
        },
      });
      return null;
    }

    console.log("REHYDRATION CALL", response);

    const updates = {
      viewer: JSON.parse(JSON.stringify(response.data)),
    };

    if (options && options.resetFiles) {
      updates.sidebar = null;
    }

    this.setState(updates);

    return response;
  };

  _handleSubmit = async (data) => {
    let response;

    if (data.type === "CREATE_SLATE") {
      response = await Actions.createSlate({
        name: data.name,
        public: data.public,
        body: data.body,
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

    this._handleDismissSidebar();

    return response;
  };

  _handleDeleteYourself = async () => {
    // TODO(jim): Put this somewhere better for messages.
    const message = "Do you really want to delete your account? It will be permanently removed";
    if (!window.confirm(message)) {
      return false;
    }

    await Actions.updateSearch("delete-user");

    let response = await Actions.deleteViewer();

    if (!response || response.error) {
      dispatchCustomEvent({
        name: "create-alert",
        detail: {
          alert: {
            message: "We're having trouble connecting right now. Please try again later",
          },
        },
      });
      return response;
    }

    await this._handleSignOut();

    let wsclient = Websockets.getClient();
    if (wsclient) {
      await Websockets.deleteClient();
      wsclient = null;
    }

    return response;
  };

  _handleCreateUser = async (state) => {
    // NOTE(jim): Acts as our existing username exists check.
    // If the user exists, move on the sign in anyways.
    let response = await Actions.createUser(state);
    console.log("CREATE_USER", response);

    if (!response || response.error) {
      return response;
    }

    return this._handleAuthenticate(state, true);
  };

  _handleAuthenticate = async (state, newAccount) => {
    // NOTE(jim): Kills existing session cookie if there is one.
    const jwt = cookies.get(Credentials.session.key);

    if (jwt) {
      cookies.remove(Credentials.session.key);
    }

    let response = await Actions.signIn(state);
    if (!response || response.error) {
      return response;
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

    await this.rehydrate();

    let wsclient = Websockets.getClient();
    if (wsclient) {
      await Websockets.deleteClient();
      wsclient = null;
    }

    wsclient = this._handleSetupWebsocket();
    if (!wsclient) {
      dispatchCustomEvent({
        name: "create-alert",
        detail: {
          alert: {
            message:
              "We cannot connect to our live update server. You may have to refresh to see updates.",
          },
        },
      });
    }

    this._handleAction({ type: "NAVIGATE", value: "V1_NAVIGATION_HOME" });

    let unseenAnnouncements = [];
    for (let feature of announcements) {
      if (!Object.keys(this.state.viewer.onboarding).includes(feature)) {
        unseenAnnouncements.push(feature);
      }
    }

    if (newAccount || unseenAnnouncements.length) {
      dispatchCustomEvent({
        name: "create-modal",
        detail: {
          modal: (
            <OnboardingModal
              onAction={this._handleAction}
              viewer={this.state.viewer}
              newAccount={newAccount}
              unseenAnnouncements={unseenAnnouncements}
            />
          ),
          noBoundary: true,
        },
      });
    }

    if (newAccount) {
      Actions.updateSearch("create-user");
    }
    return response;
  };

  _handleSignOut = async () => {
    let wsclient = Websockets.getClient();
    if (wsclient) {
      await Websockets.deleteClient();
      wsclient = null;
    }

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
    this.setState({ sidebar: null, sidebarLoading: false, sidebarData: null });
  };

  _handleAction = (options) => {
    if (options.type === "NAVIGATE") {
      // NOTE(martina): The `scene` property is only necessary when you need to display a component different from the one corresponding to the tab it appears in
      // + e.g. to display <SceneProfile/> while on the Home tab
      // + `scene` should be the decorator of the component you want displayed
      return this._handleNavigateTo(
        { id: options.value, scene: options.scene, user: options.user, slate: options.slate },
        options.data,
        options.redirect
      );
    }

    if (options.type === "NEW_WINDOW") {
      return window.open(options.value);
    }

    if (options.type === "ACTION") {
      dispatchCustomEvent({
        name: "create-alert",
        detail: { alert: { message: JSON.stringify(options), status: "INFO" } },
      });
    }

    if (options.type === "DOWNLOAD") {
      dispatchCustomEvent({
        name: "create-alert",
        detail: { alert: { message: JSON.stringify(options), status: "INFO" } },
      });
    }

    if (options.type === "SIDEBAR") {
      return this.setState({
        sidebar: SIDEBARS[options.value],
        sidebarData: options.data,
      });
    }

    if (options.type === "REGISTER_FILE_CANCELLED") {
      return this._handleRegisterFileCancelled({ key: options.value });
    }

    return alert(JSON.stringify(options));
  };

  _handleNavigateTo = (next, data = null, redirect = false) => {
    if (next.id) {
      window.history.replaceState(
        { ...next },
        "Slate",
        `?scene=${next.id}${next.user ? `&user=${next.user}` : ""}${
          next.slate ? `&slate=${next.slate}` : ""
        }`
      );
    }

    if (redirect) {
      const adjustedArray = [...this.state.history];
      adjustedArray.length = this.state.currentIndex;
      return this.setState({
        history: [...adjustedArray, next],
        data,
        sidebar: null,
      });
    }

    let body = document.documentElement || document.body;
    this.state.history[this.state.currentIndex].scrollTop = body.scrollTop;
    this.state.history[this.state.currentIndex].data = this.state.data;

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
        () => body.scrollTo(0, 0)
      );
    }

    this.setState(
      {
        history: [...this.state.history, next],
        currentIndex: this.state.currentIndex + 1,
        data,
        sidebar: null,
      },
      () => body.scrollTo(0, 0)
    );
  };

  _handleBack = () => {
    let body = document.documentElement || document.body;
    this.state.history[this.state.currentIndex].scrollTop = body.scrollTop;
    this.state.history[this.state.currentIndex].data = this.state.data;

    const next = this.state.history[this.state.currentIndex - 1];
    window.history.replaceState({ ...next }, "Slate", `?scene=${next.id}`);

    this.setState(
      {
        currentIndex: this.state.currentIndex - 1,
        sidebar: null,
        data: { ...next.data },
      },
      () => {
        console.log({ next });
        body.scrollTo(0, next.scrollTop);
      }
    );
  };

  _handleForward = () => {
    let body = document.documentElement || document.body;
    this.state.history[this.state.currentIndex].scrollTop = body.scrollTop;
    const next = this.state.history[this.state.currentIndex + 1];

    window.history.replaceState({ ...next }, "Slate", `?scene=${next.id}`);

    this.setState(
      {
        currentIndex: this.state.currentIndex + 1,
        sidebar: null,
        data: { ...next.data },
      },
      () => {
        console.log({ next });
        body.scrollTo(0, next.scrollTop);
      }
    );
  };

  render() {
    // NOTE(jim): Not authenticated.
    if (!this.state.viewer) {
      return (
        <WebsitePrototypeWrapper
          title="Slate: sign in"
          description="Sign in to your Slate account to manage your assets."
          url="https://slate.host/_"
        >
          <Alert noWarning />
          <SceneSignIn
            onCreateUser={this._handleCreateUser}
            onAuthenticate={this._handleAuthenticate}
            onAction={this._handleAction}
          />
        </WebsitePrototypeWrapper>
      );
    }
    // NOTE(jim): Authenticated.
    const navigation = NavigationData.generate(this.state.viewer);
    const next = this.state.history[this.state.currentIndex];
    const current = NavigationData.getCurrentById(navigation, next.id);

    // NOTE(jim): Only happens during a bad query parameter.
    if (!current.target) {
      window.location.replace("/_");
      return null;
    }

    let headerElement = (
      <ApplicationHeader
        viewer={this.state.viewer}
        navigation={navigation}
        activeIds={current.activeIds}
        pageTitle={current.target.pageTitle}
        currentIndex={this.state.currentIndex}
        history={this.state.history}
        onAction={this._handleAction}
        onBack={this._handleBack}
        onForward={this._handleForward}
        onSignOut={this._handleSignOut}
        mobile={this.state.mobile}
      />
    );

    const scene = React.cloneElement(SCENES[next.scene || current.target.decorator], {
      current: current.target,
      data: this.state.data,
      viewer: this.state.viewer,
      selected: this.state.selected,
      onSelectedChange: this._handleSelectedChange,
      onViewerChange: this._handleViewerChange,
      onDeleteYourself: this._handleDeleteYourself,
      onAction: this._handleAction,
      onUpload: this._handleUploadFiles,
      onBack: this._handleBack,
      onForward: this._handleForward,
      sceneId: current.target.id,
      mobile: this.state.mobile,
      resources: this.props.resources,
    });

    let sidebarElement;
    if (this.state.sidebar) {
      sidebarElement = React.cloneElement(this.state.sidebar, {
        current: current.target,
        selected: this.state.selected,
        viewer: this.state.viewer,
        data: this.state.data,
        sidebarData: this.state.sidebarData,
        fileLoading: this.state.fileLoading,
        sidebarLoading: this.state.sidebarLoading,
        onSelectedChange: this._handleSelectedChange,
        onSubmit: this._handleSubmit,
        onCancel: this._handleDismissSidebar,
        onRegisterFileLoading: this._handleRegisterFileLoading,
        onUpload: this._handleUploadFiles,
        onSidebarLoading: this._handleSidebarLoading,
        onAction: this._handleAction,
        resources: this.props.resources,
      });
    }

    const title = `Slate : ${current.target.pageTitle}`;
    const description = "";
    const url = "https://slate.host/_";

    console.log("application state:", { target: current.target });
    console.log("application state:", { data: this.state.data });

    return (
      <React.Fragment>
        <WebsitePrototypeWrapper description={description} title={title} url={url}>
          <ApplicationLayout
            onAction={this._handleAction}
            header={headerElement}
            sidebar={sidebarElement}
            onDismissSidebar={this._handleDismissSidebar}
            fileLoading={this.state.fileLoading}
            filecoin={current.target.filecoin}
            mobile={this.state.mobile}
          >
            {scene}
          </ApplicationLayout>
          <System.GlobalCarousel
            viewer={this.state.viewer}
            current={
              current.target &&
              (current.target.decorator === "SLATE" || current.target.decorator === "HOME")
                ? current.target
                : this.state.data //NOTE(martina): for slates that are not your own
            }
            slates={this.state.viewer.slates}
            onAction={this._handleAction}
            mobile={this.props.mobile}
          />
          <System.GlobalModal />
          <SearchModal
            viewer={this.state.viewer}
            onAction={this._handleAction}
            mobile={this.props.mobile}
            resourceURI={this.props.resources.search}
          />
        </WebsitePrototypeWrapper>
      </React.Fragment>
    );
  }
}
