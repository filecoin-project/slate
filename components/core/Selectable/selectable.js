import React from "react";
import { useSelectable } from "./groupSelectable";

export default function Selectable({ children, selectableKey, style, ...props }) {
  const ref = React.useRef();
  const selectable = useSelectable();
  React.useEffect(() => {
    if (selectable) {
      selectable.register(selectableKey, ref.current);
      return () => selectable.unregister(selectableKey);
    }
  });
  return (
    <div
      ref={ref}
      style={{
        cursor: selectable?.enabled ? "default" : "pointer",
        pointerEvents: selectable?.enabled ? "none" : "auto",
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}
