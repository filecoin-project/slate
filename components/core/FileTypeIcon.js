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
    return <SVG.Document {...props} />;
  }

  return <SVG.Document {...props} />;
}
