import * as React from "react";
import * as Events from "~/common/custom-events";

import { ButtonPrimary } from "~/components/system/components/Buttons";
import { LoaderSpinner } from "~/components/system/components/Loaders";

const META_TASK_STATE_GRAPH = {
  idle: { confirmMetamask: "matamaskExist" },
  matamaskExist: { signin: "signingIn" },
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
  const handleLogin = async () => {
    if (currentState === "idle") {
      Events.dispatchMessage({ message: "You need to install Metamask wallet on your computer" });
      return;
    }

    dispatch("signin");
    try {
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      console.log(accounts);
      dispatch("success");
    } catch (e) {
      dispatch("error");
    }
  };
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
