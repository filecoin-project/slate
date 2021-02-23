import * as React from "react";

import { css } from "@emotion/react";

const STYLES_WRAPPER = css`
  display: inline-block;
  height: 100%;
  width: 100%;
  transform-style: preserve-3d;
  -webkit-tap-highlight-color: rgba(#000, 0);

  .container.over .shadow {
    box-shadow: 0 45px 100px rgba(14, 21, 47, 0.4), 0 16px 40px rgba(14, 21, 47, 0.4);
  }
`;

const STYLES_CONTAINER = css`
  position: relative;
  width: 100%;
  height: 100%;
  transition: all 0.2s ease-out;
`;

const STYLES_SHADOW = css`
  position: absolute;
  top: 5%;
  left: 5%;
  width: 90%;
  height: 90%;
  transition: all 0.2s ease-out;
  box-shadow: 0 8px 30px rgba(14, 21, 47, 0.6);
`;

const STYLES_LAYER = css`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  transform-style: preserve-3d;
`;

const STYLES_SHINE = css`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0) 60%);
`;

export const Card3D = ({ children }) => {
  const wrapper = React.useRef();

  const [width, setWidth] = React.useState(0);

  React.useEffect(() => {
    const width = getWidth(wrapper.current);
    setWidth(width);
  }, [width]);

  const _handleMouseMove = (...args) => processMovement(...args);
  const _handleMouseEnter = (...args) => processEnter(...args);
  const _handleMouseLeave = (...args) => processExit(...args);

  const _handleTouchMove = (e, ...rest) => {
    if (window.preventScroll) {
      e.preventDefault();
    }

    processMovement(e, ...rest);
  };

  const _handleTouchStart = (...args) => {
    window.preventScroll = true;
    processEnter(...args);
  };

  const _handleTouchEnd = (...args) => {
    window.preventScroll = false;
    processExit(...args);
  };

  React.useEffect(() => {
    let layersNode = document.querySelectorAll(".inner-layer");
    let layers = Array.from(layersNode);
    let shine = document.querySelectorAll(".shine")[0];

    // NOTE(daniel): desktop devices
    wrapper.current?.addEventListener("mousemove", (e) =>
      _handleMouseMove(e, false, wrapper.current, layers, layers.length, shine)
    );
    wrapper.current?.addEventListener("mouseenter", (e) => _handleMouseEnter(e, wrapper.current));
    wrapper.current?.addEventListener("mouseleave", (e) =>
      _handleMouseLeave(e, wrapper.current, layers, layers.length, shine)
    );

    // NOTE(daniel): mobile devices
    wrapper.current?.addEventListener("touchmove", (e) =>
      _handleTouchMove(e, false, wrapper.current, layers, layers.length, shine)
    );
    wrapper.current?.addEventListener("touchstart", (e) => _handleTouchStart(e, wrapper.current));
    wrapper.current?.addEventListener("touchend", (e) =>
      _handleTouchEnd(e, wrapper.current, layers, layers.length, shine)
    );

    return () => {
      // NOTE(daniel): desktop devices
      wrapper.current?.removeEventListener("mousemove", (e) =>
        _handleMouseMove(e, false, wrapper.current, layers, layers.length, shine)
      );
      wrapper.current?.removeEventListener("mouseenter", (e) =>
        _handleMouseEnter(e, wrapper.current)
      );
      wrapper.current?.removeEventListener("mouseleave", (e) =>
        _handleMouseLeave(e, wrapper.current, layers, layers.length, shine)
      );

      // NOTE(daniel): mobile devices
      wrapper.current?.removeEventListener("touchmove", (e) =>
        _handleTouchMove(e, false, wrapper.current, layers, layers.length, shine)
      );
      wrapper.current?.removeEventListener("touchstart", (e) =>
        _handleTouchStart(e, wrapper.current)
      );
      wrapper.current?.removeEventListener("touchend", (e) =>
        _handleTouchEnd(e, wrapper.current, layers, layers.length, shine)
      );
    };
  });

  let cardChildren;

  if (!children) {
    cardChildren = null;
  } else if (Array.isArray(children)) {
    cardChildren = children.map((child) => React.cloneElement(child, { className: "inner-layer" }));
  } else {
    React.cloneElement(children, { className: "inner-layer" });
  }

  return (
    <div css={STYLES_WRAPPER} ref={wrapper} style={{ transform: `perspective(${width * 3}px)` }}>
      <div css={STYLES_CONTAINER} className="container">
        <div className="shadow" css={STYLES_SHADOW} />
        <div className="layer" css={STYLES_LAYER}>
          {cardChildren}
        </div>
        <div className="shine" css={STYLES_SHINE} />
      </div>
    </div>
  );
};

function getWidth(elem) {
  let width;
  if (elem) {
    width = elem.clientWidth || elem.offsetWidth || elem.scrollWidth;
  }
  return width;
}

function processMovement(e, touchEnabled, elem, layers, totalLayers, shine) {
  let html = document.getElementsByTagName("html")[0];
  let bodyScrollTop = document.body.scrollTop || html.scrollTop,
    bodyScrollLeft = document.body.scrollLeft,
    pageX = touchEnabled ? e.touches[0].pageX : e.pageX,
    pageY = touchEnabled ? e.touches[0].pageY : e.pageY,
    offsets = elem.getBoundingClientRect(),
    w = elem.clientWidth || elem.offsetWidth || elem.scrollWidth,
    h = elem.clientHeight || elem.offsetHeight || elem.scrollHeight,
    wMultiple = 320 / w,
    offsetX = 0.52 - (pageX - offsets.left - bodyScrollLeft) / w,
    offsetY = 0.52 - (pageY - offsets.top - bodyScrollTop) / h,
    dy = pageY - offsets.top - bodyScrollTop - h / 2,
    dx = pageX - offsets.left - bodyScrollLeft - w / 2,
    yRotate = (offsetX - dx) * (0.07 * wMultiple),
    xRotate = (dy - offsetY) * (0.1 * wMultiple),
    imgCSS = "rotateX(" + xRotate + "deg) rotateY(" + yRotate + "deg)",
    arad = Math.atan2(dy, dx),
    angle = (arad * 180) / Math.PI - 90;

  if (angle < 0) {
    angle = angle + 360;
  }

  if (elem.firstChild.className.indexOf(" over") !== -1) {
    imgCSS += " scale3d(1.07,1.07,1.07)";
  }
  elem.firstChild.style.transform = imgCSS;

  shine.style.background =
    "linear-gradient(" +
    angle +
    "deg, rgba(255,255,255," +
    ((pageY - offsets.top - bodyScrollTop) / h) * 0.4 +
    ") 0%,rgba(255,255,255,0) 80%)";
  shine.style.transform =
    "translateX(" +
    offsetX * totalLayers -
    0.1 +
    "px) translateY(" +
    offsetY * totalLayers -
    0.1 +
    "px)";

  let revNum = totalLayers;
  for (let ly = 0; ly < totalLayers; ly++) {
    layers[ly].style.transform =
      "translateX(" +
      offsetX * revNum * ((ly * 2.5) / wMultiple) +
      "px) translateY(" +
      offsetY * totalLayers * ((ly * 2.5) / wMultiple) +
      "px)";
    revNum--;
  }
}

function processEnter(e, elem) {
  elem.firstChild.className += " over";
}

function processExit(e, elem, layers, totalLayers, shine) {
  let container = elem.firstChild;

  container.className = container.className.replace(" over", "");
  container.style.transform = "";
  shine.style.cssText = "";

  for (let ly = 0; ly < totalLayers; ly++) {
    layers[ly].style.transform = "";
  }
}
