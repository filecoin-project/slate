import * as React from "react";
import * as SVG from "~/common/svg";

export function FileTypeIcon(props) {
  if (props.type && props.type.startsWith("image/")) {
    return <SVG.Image {...props} />;
  }

  if (props.type && props.type.startsWith("video/")) {
    return <SVG.Video {...props} />;
  }

  if (props.type && props.type.startsWith("audio/")) {
    return <SVG.Sound {...props} />;
  }

  if (props.type && props.type.startsWith("application/epub")) {
    return <SVG.Book {...props} />;
  }

  if (props.type && props.type.startsWith("application/pdf")) {
    return <SVG.TextDocument {...props} />;
  }

  return <SVG.Document {...props} />;
}

export function FileTypeGroup(props) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        ...props.style,
      }}
    >
      <SVG.Sound height="24px" style={{ margin: "0 16px" }} />
      <SVG.Document height="24px" style={{ margin: "0 16px" }} />
      <SVG.Image height="24px" style={{ margin: "0 16px" }} />
      <SVG.Book height="24px" style={{ margin: "0 16px" }} />
      <SVG.Video height="24px" style={{ margin: "0 16px" }} />
    </div>
  );
}
