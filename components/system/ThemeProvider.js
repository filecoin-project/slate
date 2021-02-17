import * as React from "react";
import * as Constants from "~/common/constants";

import { ThemeProvider as EmotionTP } from "@emotion/react";

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = React.useState({ darkmode: true });
  const toggleDarkMode = (e) => setTheme((prev) => ({ ...prev, darkmode: e.detail.darkmode }));

  React.useEffect(() => {
    if (!window) return;
    window.addEventListener("slate-theme-toggle-darkmode", toggleDarkMode);
    return () => {
      if (!window) return;
      window.removeEventListener("slate-theme-toggle-darkmode", toggleDarkMode);
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
