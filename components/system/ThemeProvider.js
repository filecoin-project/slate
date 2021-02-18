import * as React from "react";
import * as Constants from "~/common/constants";

import { ThemeProvider as EmotionTP } from "@emotion/react";

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useLocalStorage("slate-theme", { darkmode: true });
  const handleSlateTheme = (e) => setTheme((prev) => ({ ...prev, ...e.detail }));

  React.useEffect(() => {
    if (!window) return;
    window.addEventListener("set-slate-theme", handleSlateTheme);
    return () => {
      if (!window) return;
      window.removeEventListener("set-slate-theme", handleSlateTheme);
    };
  }, []);

  const value = React.useMemo(
    () => ({
      ...theme,
      sizes: Constants.sizes,
      system: Constants.system,
      shadow: Constants.shadow,
      zindex: Constants.zindex,
      font: Constants.font,
      typescale: Constants.typescale,
    }),
    [theme]
  );
  return (
    <EmotionTP theme={value}>
      <React.Fragment>{children}</React.Fragment>
    </EmotionTP>
  );
}

export const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = React.useState(defaultValue);

  React.useEffect(() => {
    const cachedValue = localStorage.getItem(key);
    if (cachedValue) setValue(JSON.parse(cachedValue));
  }, []);

  React.useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};
