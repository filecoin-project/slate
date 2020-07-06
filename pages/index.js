import * as React from "react";
import * as NavigationData from "~/common/navigation-data";
import * as Actions from "~/common/actions";
import * as State from "~/common/state";

import SceneDataTransfer from "~/scenes/SceneDataTransfer";
import SceneDeals from "~/scenes/SceneDeals";
import SceneEditAccount from "~/scenes/SceneEditAccount";
import SceneFile from "~/scenes/SceneFile";
import SceneFilesFolder from "~/scenes/SceneFilesFolder";
import SceneHome from "~/scenes/SceneHome";
import SceneLogs from "~/scenes/SceneLogs";
import SceneMiners from "~/scenes/SceneMiners";
import ScenePaymentChannels from "~/scenes/ScenePaymentChannels";
import ScenePeers from "~/scenes/ScenePeers";
import SceneSettings from "~/scenes/SceneSettings";
import SceneStats from "~/scenes/SceneStats";
import SceneStatus from "~/scenes/SceneStatus";
import SceneStorageMarket from "~/scenes/SceneStorageMarket";
import SceneWallet from "~/scenes/SceneWallet";

import SidebarCreateWalletAddress from "~/components/sidebars/SidebarCreateWalletAddress";
import SidebarDeleteWalletAddress from "~/components/sidebars/SidebarDeleteWalletAddress";
import SidebarWalletSendFunds from "~/components/sidebars/SidebarWalletSendFunds";
import SidebarFileStorageDeal from "~/components/sidebars/SidebarFileStorageDeal";
import SidebarFileRetrievalDeal from "~/components/sidebars/SidebarFileRetrievalDeal";
import SidebarCreatePaymentChannel from "~/components/sidebars/SidebarCreatePaymentChannel";
import SidebarAddMiner from "~/components/sidebars/SidebarAddMiner";
import SidebarAddPeer from "~/components/sidebars/SidebarAddPeer";
import SidebarNotifications from "~/components/sidebars/SidebarNotifications";
import SidebarRedeemPaymentChannel from "~/components/sidebars/SidebarRedeemPaymentChannel";

import ApplicationNavigation from "~/components/core/ApplicationNavigation";
import ApplicationHeader from "~/components/core/ApplicationHeader";
import ApplicationLayout from "~/components/core/ApplicationLayout";
import WebsitePrototypeWrapper from "~/components/core/WebsitePrototypeWrapper";

const getCurrentNavigationStateById = (navigation, targetId) => {
  let target = null;
  let activeIds = {};

  const findById = (state, id) => {
    for (let i = 0; i < state.length; i++) {
      if (state[i].id === id) {
        target = state[i];
        activeIds[state[i].id] = true;
      }

      if (!target && state[i].children) {
        activeIds[state[i].id] = true;
        findById(state[i].children, id);

        if (!target) {
          activeIds[state[i].id] = false;
        }
      }
    }
  };

  findById(navigation, targetId);

  return { target, activeIds };
};

export const getServerSideProps = async (context) => {
  if (context.query && context.query.production) {
    return { production: true, ...context.query };
  }

  const data = await Actions.rehydrateViewer();

  return {
    props: { ...context.query, ...data.data },
  };
};

export default class IndexPage extends React.Component {
  _socket = null;

  state = {
    history: [{ id: 1, scrollTop: 0 }],
    currentIndex: 0,
    data: null,
    selected: {
      address: "",
    },
    viewer: State.getInitialState(this.props),
    sidebar: null,
    file: null,
  };

  componentDidMount() {
    this._socket = new WebSocket(`ws://localhost:${this.props.wsPort}`);
    this._socket.onmessage = (m) => {
      console.log(m);
      if (m.type === "message") {
        const parsed = JSON.parse(m.data);

        if (parsed.action === "UPDATE_VIEWER") {
          this.rehydrate({ data: parsed.data });
        }
      }
    };

    window.addEventListener("dragenter", this._handleDragEnter);
    window.addEventListener("dragleave", this._handleDragLeave);
    window.addEventListener("dragover", this._handleDragOver);
    window.addEventListener("drop", this._handleDrop);
  }

  componentWillUnmount() {
    window.removeEventListener("dragenter", this._handleDragEnter);
    window.removeEventListener("dragleave", this._handleDragLeave);
    window.removeEventListener("dragover", this._handleDragOver);
    window.removeEventListener("drop", this._handleDrop);
  }

  _handleSetFile = async ({ file }) => {
    let data = new FormData();
    data.append("image", file);

    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: data,
    };

    const response = await fetch(`/_/storage/${file.name}`, options);
    const json = await response.json();

    if (json && json.success) {
      this.setState({ file });
    }
  };

  _handleDragEnter = (e) => {
    // TODO(jim): Styles.
    console.log("dragenter", e);
  };

  _handleDragLeave = (e) => {
    // TODO(jim): Styles.
    console.log("dragleave", e);
  };

  _handleDragOver = (e) => {
    e.preventDefault();
    console.log("dragover", e);
  };

  _handleDrop = async (e) => {
    e.preventDefault();

    if (e.dataTransfer.items) {
      for (var i = 0; i < e.dataTransfer.items.length; i++) {
        if (e.dataTransfer.items[i].kind === "file") {
          var file = e.dataTransfer.items[i].getAsFile();
          console.log(file.name);
          await this._handleSetFile({ file });
          break;
        }
      }
    }

    this._handleAction({ type: "SIDEBAR", value: "SIDEBAR_FILE_STORAGE_DEAL" });
  };

  rehydrate = async ({ data }) => {
    this.setState({ viewer: { ...State.getInitialState(data) } });
  };

  _handleSubmit = async (data) => {
    if (this.props.production) {
      alert("TODO");
      return this._handleDismissSidebar();
    }

    if (data.type === "CREATE_WALLET_ADDRESS") {
      const address = await Actions.createWalletAddress({
        name: data.name,
        type: data.wallet_type,
        makeDefault: data.makeDefault,
      });
    }

    if (data.type === "SEND_WALLET_ADDRESS_FILECOIN") {
      const response = await Actions.sendWalletAddressFilecoin({
        source: data.source,
        target: data.target,
        amount: data.amount,
      });
    }

    this._handleDismissSidebar();
  };

  _handleCancel = () => {
    this._handleDismissSidebar();
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
    this.setState({ sidebar: null });
  };

  _handleAction = (options) => {
    if (options.type === "NAVIGATE") {
      return this._handleNavigateTo({ id: options.value }, options.data);
    }

    if (options.type === "ACTION") {
      return alert(JSON.stringify(options));
    }

    if (options.type === "DOWNLOAD") {
      return alert(JSON.stringify(options));
    }

    if (options.type === "SIDEBAR") {
      return this.setState({ sidebar: this.sidebars[options.value] });
    }

    return alert(JSON.stringify(options));
  };

  _handleNavigateTo = (next, data = {}) => {
    this.state.history[this.state.currentIndex].scrollTop = window.scrollY;

    if (this.state.currentIndex !== this.state.history.length - 1) {
      const adjustedArray = [...this.state.history];
      adjustedArray.length = this.state.currentIndex + 1;

      return this.setState(
        {
          history: [...adjustedArray, next],
          currentIndex: this.state.currentIndex + 1,
          data,
        },
        () => {
          window.scrollTo(0, 0);
        }
      );
    }

    this.setState(
      {
        history: [...this.state.history, next],
        currentIndex: this.state.currentIndex + 1,
        data,
      },
      () => {
        window.scrollTo(0, 0);
      }
    );
  };

  _handleBack = () => {
    this.state.history[this.state.currentIndex].scrollTop = window.scrollY;

    this.setState(
      {
        currentIndex: this.state.currentIndex - 1,
      },
      () => {
        const next = this.state.history[this.state.currentIndex];
        console.log({ next });
        window.scrollTo(0, next.scrollTop);
      }
    );
  };

  _handleForward = () => {
    this.state.history[this.state.currentIndex].scrollTop = window.scrollY;

    this.setState(
      {
        currentIndex: this.state.currentIndex + 1,
      },
      () => {
        const next = this.state.history[this.state.currentIndex];
        console.log({ next });
        window.scrollTo(0, next.scrollTop);
      }
    );
  };

  sidebars = {
    SIDEBAR_NOTIFICATIONS: <SidebarNotifications />,
    SIDEBAR_ADD_PEER: <SidebarAddPeer />,
    SIDEBAR_ADD_MINER: <SidebarAddMiner />,
    SIDEBAR_CREATE_PAYMENT_CHANNEL: <SidebarCreatePaymentChannel />,
    SIDEBAR_FILE_STORAGE_DEAL: <SidebarFileStorageDeal />,
    SIDEBAR_FILE_RETRIEVAL_DEAL: <SidebarFileRetrievalDeal />,
    SIDEBAR_WALLET_SEND_FUNDS: <SidebarWalletSendFunds />,
    SIDEBAR_CREATE_WALLET_ADDRESS: <SidebarCreateWalletAddress />,
    SIDEBAR_DELETE_WALLET_ADDRESS: <SidebarDeleteWalletAddress />,
    SIDEBAR_REDEEM_PAYMENT_CHANNEL: <SidebarRedeemPaymentChannel />,
  };

  scenes = {
    HOME: <SceneHome />,
    WALLET: <SceneWallet />,
    CHANNELS: <ScenePaymentChannels />,
    FOLDER: <SceneFilesFolder />,
    FILE: <SceneFile />,
    DEALS: <SceneDeals />,
    DATA_TRANSFER: <SceneDataTransfer />,
    STATS: <SceneStats />,
    STORAGE_MARKET: <SceneStorageMarket />,
    MINERS: <SceneMiners />,
    STATUS: <SceneStatus />,
    PEERS: <ScenePeers />,
    LOGS: <SceneLogs />,
    SETTINGS: <SceneSettings />,
    EDIT_ACCOUNT: <SceneEditAccount />,
  };

  render() {
    if (this.props.production) {
      return null;
    }

    const navigation = NavigationData.generate(this.state.viewer.library);
    const next = this.state.history[this.state.currentIndex];
    const current = getCurrentNavigationStateById(navigation, next.id);

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
      />
    );

    const scene = React.cloneElement(this.scenes[current.target.decorator], {
      viewer: this.state.viewer,
      selected: this.state.selected,
      data: current.target,
      file: this.state.data,
      onNavigateTo: this._handleNavigateTo,
      onSelectedChange: this._handleSelectedChange,
      onViewerChange: this._handleViewerChange,
      onAction: this._handleAction,
      onBack: this._handleBack,
      onForward: this._handleForward,
    });

    let sidebarElement;
    if (this.state.sidebar) {
      sidebarElement = React.cloneElement(this.state.sidebar, {
        file: this.state.file,
        viewer: this.state.viewer,
        selected: this.state.selected,
        onSelectedChange: this._handleSelectedChange,
        onSubmit: this._handleSubmit,
        onCancel: this._handleCancel,
        onSetFile: this._handleSetFile,
      });
    }

    const title = `Prototype 0.0.1 : ${current.target.pageTitle}`;
    const description = "This is an early preview.";
    const url = "https://fps.onrender.com/v1";

    return (
      <React.Fragment>
        <WebsitePrototypeWrapper title={title} description={description} url={url}>
          <ApplicationLayout
            navigation={navigationElement}
            header={headerElement}
            sidebar={sidebarElement}
            onDismissSidebar={this._handleDismissSidebar}>
            {scene}
          </ApplicationLayout>
        </WebsitePrototypeWrapper>
      </React.Fragment>
    );
  }
}
