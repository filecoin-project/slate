import * as React from "react";
import * as UploadUtilities from "~/common/upload-utilities";
import * as FileUtilities from "~/common/file-utilities";
import * as Logging from "~/common/logging";

import { useEventListener } from "~/common/hooks";

const SettingsContext = React.createContext({});
export const useSettingsContext = () => React.useContext(SettingsContext);

export const Provider = ({ children, viewer }) => {
  const [isSettingsJumperVisible, { showSettingsJumper, hideSettingsJumper }] = useSettingsJumper();

  useEventListener("open-settings-jumper", showSettingsJumper);

  const providerValue = React.useMemo(
    () => [
      { isSettingsJumperVisible },
      {
        showSettingsJumper,
        hideSettingsJumper,
      },
    ],
    [isSettingsJumperVisible]
  );
  

  return <SettingsContext.Provider value={providerValue}>{children}</SettingsContext.Provider>;
};

const useSettingsJumper = () => {
  const [isSettingsJumperVisible, setSettingsJumperState] = React.useState(false);
  const showSettingsJumper = () => setSettingsJumperState(true);
  const hideSettingsJumper = () => setSettingsJumperState(false);
  return [isSettingsJumperVisible, { showSettingsJumper, hideSettingsJumper }];
};
