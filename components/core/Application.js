import * as React from "react";
import * as NavigationData from "~/common/navigation-data";
import * as Actions from "~/common/actions";
import * as Strings from "~/common/strings";
import * as State from "~/common/state";
import * as Credentials from "~/common/credentials";
import * as Constants from "~/common/constants";
import * as Validations from "~/common/validations";
import * as FileUtilities from "~/common/file-utilities";
import * as Window from "~/common/window";
import * as Store from "~/common/store";
import * as Websockets from "~/common/browser-websockets";
import * as UserBehaviors from "~/common/user-behaviors";
import * as Events from "~/common/custom-events";

// NOTE(jim):
// Scenes each have an ID and can be navigated to with _handleAction
import SceneEditAccount from "~/scenes/SceneEditAccount";
import SceneFile from "~/scenes/SceneFile";
import SceneFilesFolder from "~/scenes/SceneFilesFolder";
import SceneSettings from "~/scenes/SceneSettings";
import SceneSlates from "~/scenes/SceneSlates";
import SceneLocalData from "~/scenes/SceneLocalData";
import SceneSettingsDeveloper from "~/scenes/SceneSettingsDeveloper";
import SceneSignIn from "~/scenes/SceneSignIn";
import SceneSlate from "~/scenes/SceneSlate";
import SceneActivity from "~/scenes/SceneActivity";
import SceneDirectory from "~/scenes/SceneDirectory";
import SceneProfile from "~/scenes/SceneProfile";
import SceneArchive from "~/scenes/SceneArchive";
import SceneMakeFilecoinDeal from "~/scenes/SceneMakeFilecoinDeal";

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

import { GlobalModal } from "~/components/system/components/GlobalModal";
import { OnboardingModal } from "~/components/core/OnboardingModal";
import { SearchModal } from "~/components/core/SearchModal";
import { Alert } from "~/components/core/Alert";
import { announcements } from "~/components/core/OnboardingModal";
import { Logo } from "~/common/logo";

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
  ACTIVITY: <SceneActivity tab={0} />,
  EXPLORE: <SceneActivity tab={1} />,
  DIRECTORY: <SceneDirectory />,
  PROFILE_FILES: <SceneProfile tab={0} />,
  PROFILE: <SceneProfile tab={1} />,
  PROFILE_PEERS: <SceneProfile tab={2} />,
  DATA: <SceneFilesFolder />,
  FILE: <SceneFile />,
  SLATE: <SceneSlate />,
  API: <SceneSettingsDeveloper />,
  SETTINGS: <SceneEditAccount />,
  SLATES: <SceneSlates tab={0} />,
  SLATES_FOLLOWING: <SceneSlates tab={1} />,
  LOCAL_DATA: <SceneLocalData />,
  DIRECTORY: <SceneDirectory tab={0} />,
  DIRECTORY_FOLLOWERS: <SceneDirectory tab={1} />,
  FILECOIN: <SceneArchive />,
  STORAGE_DEAL: <SceneMakeFilecoinDeal />,
};

let mounted;

export default class ApplicationPage extends React.Component {
  _body;

  state = {
    selected: {},
    viewer: this.props.viewer,
    data: null,
    sidebar: null,
    online: null,
    mobile: this.props.mobile,
    loaded: false,
    activeUsers: null,
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
    window.addEventListener("paste", this._handleUploadFromClipboard);
    window.onpopstate = this._handleBackForward;

    if (this.state.viewer) {
      await this._handleSetupWebsocket();
    }

    this._handleURLRedirect();
  }

  componentWillUnmount() {
    window.removeEventListener("dragenter", this._handleDragEnter);
    window.removeEventListener("dragleave", this._handleDragLeave);
    window.removeEventListener("dragover", this._handleDragOver);
    window.removeEventListener("drop", this._handleDrop);
    window.removeEventListener("online", this._handleOnlineStatus);
    window.removeEventListener("offline", this._handleOnlineStatus);
    window.removeEventListener("resize", this._handleWindowResize);
    window.removeEventListener("paste", this._handleUploadFromClipboard);

    mounted = false;

    let wsclient = Websockets.getClient();
    if (wsclient) {
      Websockets.deleteClient();
    }
  }

  _handleUploadFromClipboard = (e) => {
    const clipboardItems = e.clipboardData.items || [];
    if (!clipboardItems) return;

    const { fileLoading, toUpload } = UserBehaviors.formatPastedImages({
      clipboardItems,
    });

    this._handleRegisterFileLoading({ fileLoading });

    let page;
    if (typeof window !== "undefined") {
      page = window?.history?.state;
    }
    if (!page || !page.id) {
      page = { id: "NAV_DATA", scrollTop: 0, data: null };
    }
    const current = NavigationData.getCurrent(page);

    let slate = null;
    if (
      current.target.id === "NAV_SLATE" &&
      this.state.data?.data?.ownerId === this.state.viewer?.id
    ) {
      slate = this.state.data;
    }

    this._handleUpload({
      files: toUpload,
      slate,
      keys: Object.keys(fileLoading),
    });
  };

  _handleUpdateViewer = (newViewerState) => {
    // let setAsyncState = (newState) =>
    //   new Promise((resolve) =>
    //     this.setState(
    //       {
    //         viewer: { ...this.state.viewer, ...newState, type: "VIEWER" },
    //       },
    //       resolve
    //     )
    //   );
    // await setAsyncState(newViewerState);

    //NOTE(martina): if updating viewer affects this.state.data (e.g. you're viewing your own slate), update data as well
    if (newViewerState.slates?.length) {
      let page;
      if (typeof window !== "undefined") {
        page = window?.history?.state;
      }
      if (!page || !page.id) {
        page = { id: "NAV_DATA", scrollTop: 0, data: null };
      }
      if (page.id === "NAV_SLATE" && this.state.data?.data?.ownerId === this.state.viewer.id) {
        let data = this.state.data;
        for (let slate of newViewerState.slates) {
          if (slate.id === data.id) {
            data = slate;
            break;
          }
        }
        this.setState({
          viewer: { ...this.state.viewer, ...newViewerState, type: "VIEWER" },
          data,
        });
        return;
      }
    }
    this.setState({
      viewer: { ...this.state.viewer, ...newViewerState, type: "VIEWER" },
    });
  };

  _handleUpdateData = ({ data }) => {
    //TODO(martina): maybe add a default window.history.replacestate where it pushes the new data to browser?
    this.setState({ data });
  };

  _handleSetupWebsocket = async () => {
    let wsclient = Websockets.getClient();
    if (wsclient) {
      await Websockets.deleteClient();
      wsclient = null;
    }
    if (this.props.resources && !Strings.isEmpty(this.props.resources.pubsub)) {
      if (!this.state.viewer) {
        console.log("WEBSOCKET: NOT AUTHENTICATED");
        return;
      }

      wsclient = Websockets.init({
        resource: this.props.resources.pubsub,
        viewer: this.state.viewer,
        onUpdate: this._handleUpdateViewer,
        onNewActiveUser: this._handleNewActiveUser,
      });
    }
    if (!wsclient) {
      Events.dispatchMessage({
        message:
          "We cannot connect to our live update server. You may have to refresh to see updates.",
      });
    }
    return;
  };

  _handleNewActiveUser = (users) => {
    this.setState({ activeUsers: users });
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
      Events.dispatchMessage({ message: "Back online!", status: "INFO" });
    } else {
      Events.dispatchMessage({ message: "Offline. Trying to reconnect" });
    }
    this.setState({ online: navigator.onLine });
  };

  _handleDrop = async (e) => {
    e.preventDefault();
    this.setState({ sidebar: null });
    const { fileLoading, files, numFailed, error } = await UserBehaviors.formatDroppedFiles({
      dataTransfer: e.dataTransfer,
    });

    if (error) {
      return null;
    }

    let page;
    if (typeof window !== "undefined") {
      page = window?.history?.state;
    }
    if (!page || !page.id) {
      page = { id: "NAV_DATA", scrollTop: 0, data: null };
    }
    const current = NavigationData.getCurrent(page);

    let slate = null;
    if (
      current.target.id === "NAV_SLATE" &&
      this.state.data?.data?.ownerId === this.state.viewer?.id
    ) {
      slate = this.state.data;
    }

    this._handleRegisterFileLoading({ fileLoading });
    this._handleUpload({ files, slate, keys: Object.keys(fileLoading), numFailed });
  };

  _handleUploadFiles = async ({ files, slate }) => {
    const { fileLoading, toUpload, numFailed } = UserBehaviors.formatUploadedFiles({ files });

    this._handleRegisterFileLoading({ fileLoading });
    this._handleUpload({
      files: toUpload,
      slate,
      keys: Object.keys(fileLoading),
      numFailed,
    });
  };

  _handleUpload = async ({ files, slate, keys, numFailed }) => {
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

      if (!response || response.error) {
        continue;
      }
      resolvedFiles.push(response);
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
    if (Events.hasError(processResponse)) {
      return;
    }

    if (!slate) {
      const { added, skipped } = processResponse.data;
      let message = Strings.formatAsUploadMessage(added, skipped + numFailed);
      Events.dispatchMessage({ message, status: !added ? null : "INFO" });
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

  _handleCreateUser = async (state) => {
    let response = await Actions.createUser(state);

    if (Events.hasError(response)) {
      return;
    }

    return this._handleAuthenticate(state, true);
  };

  _handleAuthenticate = async (state, newAccount) => {
    let response = await UserBehaviors.authenticate(state);
    if (!response) {
      return;
    }
    let viewer = await UserBehaviors.hydrate();
    if (!viewer) {
      return viewer;
    }

    this.setState({ viewer });
    await this._handleSetupWebsocket();

    let unseenAnnouncements = [];
    for (let feature of announcements) {
      if (!Object.keys(viewer.onboarding).includes(feature)) {
        unseenAnnouncements.push(feature);
      }
    }

    if (newAccount || unseenAnnouncements.length) {
      Events.dispatchCustomEvent({
        name: "create-modal",
        detail: {
          modal: (
            <OnboardingModal
              onAction={this._handleAction}
              viewer={viewer}
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

    let redirected = this._handleURLRedirect();
    if (!redirected) {
      this._handleAction({ type: "NAVIGATE", value: "NAV_DATA" });
    }
    return response;
  };

  _handleURLRedirect = () => {
    const id = Window.getQueryParameterByName("scene");
    const user = Window.getQueryParameterByName("user");
    const slate = Window.getQueryParameterByName("slate");
    const cid = Window.getQueryParameterByName("cid");

    if (!Strings.isEmpty(id) && this.state.viewer) {
      this._handleNavigateTo({ id, user, slate, cid }, null, true);
      return true;
    }
    if (!this.state.loaded) {
      this.setState({ loaded: true });
    }
    return false;
  };

  _handleSelectedChange = (e) => {
    this.setState({
      selected: { ...this.state.selected, [e.target.name]: e.target.value },
    });
  };

  _handleDismissSidebar = () => {
    this.setState({ sidebar: null, sidebarData: null });
  };

  _handleAction = (options) => {
    if (options.type === "NAVIGATE") {
      // NOTE(martina): The `scene` property is only necessary when you need to display a component different from the one corresponding to the tab it appears in
      // + e.g. to display <SceneProfile/> while on the Home tab
      // + `scene` should be the decorator of the component you want displayed
      return this._handleNavigateTo(
        {
          ...options,
          id: options.value,
          redirect: null,
        },
        options.data,
        options.redirect
      );
    }

    if (options.type === "NEW_WINDOW") {
      return window.open(options.value);
    }

    if (options.type === "ACTION") {
      Events.dispatchMessage({ message: JSON.stringify(options), status: "INFO" });
    }

    if (options.type === "DOWNLOAD") {
      Events.dispatchMessage({ message: JSON.stringify(options), status: "INFO" });
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
    if (redirect) {
      window.history.replaceState(
        { ...next, data },
        "Slate",
        `/_${next.id ? `?scene=${next.id}` : ""}`
      );
    } else {
      window.history.pushState(
        { ...next, data },
        "Slate",
        `/_${next.id ? `?scene=${next.id}` : ""}`
      );
    }

    if (!this.state.loaded) {
      this.setState({ loaded: true });
    }

    let body = document.documentElement || document.body;
    if (data) {
      this.setState(
        {
          data,
          sidebar: null,
        },
        () => body.scrollTo(0, 0)
      );
    } else {
      this.setState(
        {
          sidebar: null,
        },
        () => body.scrollTo(0, 0)
      );
    }
  };

  _handleBackForward = (e) => {
    let page = window.history.state;
    this.setState({
      sidebar: null,
      data: page.data,
    });
    Events.dispatchCustomEvent({ name: "slate-global-close-carousel", detail: {} });
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
          <Alert noWarning style={{ top: 0, zIndex: Constants.zindex.sidebar }} />
          <SceneSignIn
            onCreateUser={this._handleCreateUser}
            onAuthenticate={this._handleAuthenticate}
            onAction={this._handleAction}
          />
        </WebsitePrototypeWrapper>
      );
    }
    // NOTE(jim): Authenticated.
    let page;
    if (typeof window !== "undefined") {
      page = window?.history?.state;
    }
    if (!page || !page.id) {
      page = { id: "NAV_DATA", scrollTop: 0, data: null };
    }
    const current = NavigationData.getCurrent(page);

    // NOTE(jim): Only happens during a bad query parameter.
    if (!current.target) {
      window.location.replace("/_");
      return null;
    }

    let headerElement = (
      <ApplicationHeader
        viewer={this.state.viewer}
        navigation={NavigationData.navigation}
        activeIds={current.activeIds}
        onAction={this._handleAction}
        mobile={this.state.mobile}
        mac={this.props.mac}
      />
    );

    const scene = React.cloneElement(SCENES[page.scene || current.target.decorator], {
      key: this.state.data?.id,
      page: page,
      current: current.target,
      data: this.state.data,
      viewer: this.state.viewer,
      selected: this.state.selected,
      onSelectedChange: this._handleSelectedChange,
      onAction: this._handleAction,
      onUpload: this._handleUploadFiles,
      onUpdateData: this._handleUpdateData,
      onUpdateViewer: this._handleUpdateViewer,
      sceneId: current.target.id,
      mobile: this.state.mobile,
      mac: this.props.mac,
      resources: this.props.resources,
      activeUsers: this.state.activeUsers,
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
        onSelectedChange: this._handleSelectedChange,
        onCancel: this._handleDismissSidebar,
        onUpload: this._handleUploadFiles,
        onAction: this._handleAction,
        onUpdateViewer: this._handleUpdateViewer,
        resources: this.props.resources,
      });
    }

    const title = `Slate : ${current.target.pageTitle}`;
    const description = "";
    const url = "https://slate.host/_";

    // console.log("application state:", { target: current.target });
    // console.log("application state:", { data: this.state.data });

    if (!this.state.loaded) {
      return (
        <WebsitePrototypeWrapper description={description} title={title} url={url}>
          <div
            style={{
              height: "100vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Logo style={{ width: "20vw", maxWidth: "200px" }} />
          </div>
        </WebsitePrototypeWrapper>
      );
    }
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
            mac={this.props.mac}
            viewer={this.state.viewer}
            onUpdateViewer={this._handleUpdateViewer}
          >
            {scene}
          </ApplicationLayout>
          <GlobalModal />
          <SearchModal
            viewer={this.state.viewer}
            onAction={this._handleAction}
            mobile={this.state.mobile}
            resourceURI={this.props.resources.search}
          />
          {!this.state.loaded ? (
            <div
              style={{
                position: "absolute",
                width: "100vw",
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Logo style={{ width: "20vw", maxWidth: "200px" }} />
            </div>
          ) : null}
        </WebsitePrototypeWrapper>
      </React.Fragment>
    );
  }
}
