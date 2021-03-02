import * as React from "react";
import * as Events from "~/common/custom-events";

import { ButtonPrimary } from "~/components/system/components/Buttons";
import { LoaderSpinner } from "~/components/system/components/Loaders";

const META_TASK_STATE_GRAPH = {
  idle: { confirmMetamask: "metamaskExist" },
  metamaskExist: { signin: "signingIn" },
  signingIn: { success: "signedIn", error: "error" },
  signedIn: { diconnect: "idle" },
  error: { signin: "signingIn" },
};

const reducer = (state, event) => {
  const nextState = META_TASK_STATE_GRAPH[state][event];
  return nextState !== undefined ? nextState : state;
};

export const MetamaskButton = () => {
  const [currentState, dispatch] = React.useReducer(reducer, "idle");

  useDetectMetaMask({ onDetection: () => dispatch("confirmMetamask") });

  let currentAccount = null;
  const handleLogin = async () => {
    if (currentState === "idle") {
      Events.dispatchMessage({ message: "You need to install Metamask wallet on your computer" });
      return;
    }

    dispatch("signin");
    try {
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      handleAccountsChange(accounts);

      // NOTE(daniel): set currentAccount state here later on
      dispatch("success");
    } catch (e) {
      dispatch("error");
    }
  };

  const handleAccountsChange = (accounts) => {
    if (accounts.length === 0) {
      Events.dispatchMessage({ message: "Please connect to Metamask wallet on your computer" });
    } else if (accounts[0] !== currentAccount) {
      currentAccount = accounts[0];
      console.log({ currentAccount });
    }
  };

  ethereum.on("accountsChanged", handleAccountsChange);

  return currentState === "signedIn" ? (
    "connected"
  ) : (
    <ButtonPrimary onClick={handleLogin} style={{ whiteSpace: "nowrap", marginRight: 24 }}>
      Connect{currentState === "signingIn" && "ing"} To Metatask
      {currentState === "signingIn" && (
        <LoaderSpinner style={{ height: 16, width: 16, marginLeft: "8px" }} />
      )}
    </ButtonPrimary>
  );
};

const useDetectMetaMask = ({ onDetection }) => {
  React.useEffect(() => {
    if (typeof window.ethereum !== "undefined" && window.ethereum.isMetaMask) {
      onDetection();
    }
  }, []);
};
