import React from "react";
import doObjectsCollide from "./doObjectsCollide";
import { css } from "@emotion/react";
import * as Constants from "~/common/constants";

const Context = React.createContext();
export const useSelectable = () => {
  return React.useContext(Context);
};

const GROUP_WRAPPER = css`
  position: relative;
  overflow: visible;
`;

const SELECTION_BOX_WRAPPER = css`
  z-index: 9000;
  position: absolute;
  cursor: default;
`;
const SELECTION_BOX_INNER = css`
  background-color: rgba(255, 255, 255, 0.45);
  border: 1px dashed ${Constants.system.border};
  width: 100%;
  height: 100%;
  float: left;
`;

export default function GroupSelectable({
  onSelection,
  onSelectionStarted,
  children,
  enabled: enabledProp = true,
  ...props
}) {
  const ref = React.useRef();
  const selectBoxRef = React.useRef();

  const isShiftDown = useKeyDown(16);
  const isAltDown = useKeyDown(18);
  const enabled = enabledProp && (isShiftDown || isAltDown);

  const { _registerSelectable, _unregisterUnselectable, registery } = useRegistery();
  const { isBoxSelecting, boxLeft, boxTop, boxWidth, boxHeight } = useGroupSelectable({
    ref,
    selectBoxRef,
    enabled,
    onSelection: (e) => onSelection(e, { isShiftDown, isAltDown }),
    onSelectionStarted,
    registery,
  });

  return (
    <Context.Provider
      value={{
        register: _registerSelectable,
        unregister: _unregisterUnselectable,
        enabled,
      }}
    >
      <div css={GROUP_WRAPPER} ref={ref} {...props}>
        {isBoxSelecting ? (
          <div
            css={SELECTION_BOX_WRAPPER}
            style={{ left: boxLeft, top: boxTop, width: boxWidth, height: boxHeight }}
            ref={selectBoxRef}
          >
            <span css={SELECTION_BOX_INNER} />
          </div>
        ) : null}
        <div>{typeof children === "function" ? children({ isSelecting: enabled }) : children}</div>
      </div>
    </Context.Provider>
  );
}

const useKeyDown = (id) => {
  const [isKeyDown, setKeyDownBool] = React.useState(false);
  const _handleKeyDown = (e) => {
    if (e.keyCode === id) setKeyDownBool(true);
  };
  const _handleKeyUp = (e) => {
    if (e.keyCode === id) setKeyDownBool(false);
  };
  React.useEffect(() => {
    window.addEventListener("keydown", _handleKeyDown);
    window.addEventListener("keyup", _handleKeyUp);
    return () => {
      window.removeEventListener("keydown", _handleKeyDown);
      window.removeEventListener("keyup", _handleKeyUp);
    };
  }, []);
  return isKeyDown;
};

const useRegistery = () => {
  const data = React.useRef({ registery: [] });
  const _registerSelectable = (key, domNode) => {
    data.current.registery.push({ key, domNode });
  };
  const _unregisterUnselectable = (key) =>
    data.current.registery.filter((item) => item.key !== key);
  return { _registerSelectable, _unregisterUnselectable, registery: data.current.registery };
};

const _getInitialCoords = (element) => {
  const style = window.getComputedStyle(document.body);
  const t = style.getPropertyValue("margin-top");
  const l = style.getPropertyValue("margin-left");
  const mLeft = parseInt(l.slice(0, l.length - 2), 10);
  const mTop = parseInt(t.slice(0, t.length - 2), 10);

  const bodyRect = document.body.getBoundingClientRect();
  const elemRect = element.getBoundingClientRect();
  return {
    x: Math.round(elemRect.left - bodyRect.left + mLeft),
    y: Math.round(elemRect.top - bodyRect.top + mTop),
  };
};

const useGroupSelectable = ({
  ref,
  selectBoxRef,
  enabled,
  onSelection,
  onSelectionStarted,
  registery,
}) => {
  const [state, setState] = React.useState({
    isBoxSelecting: false,
    boxHeight: 0,
    boxWidth: 0,
  });

  const data = React.useRef({
    mouseDataDown: null,
    rect: null,
  });

  React.useEffect(() => {
    if (!ref.current) return;
    _applyMouseDown(enabled);
    data.current.rect = _getInitialCoords(ref.current);

    return () => {
      if (!ref.current) return;
      _applyMouseDown(false);
    };
  }, [enabled]);

  const _applyMouseDown = (enabled) => {
    const fncName = enabled ? "addEventListener" : "removeEventListener";
    ref.current[fncName]("mousedown", _mousedown);
  };

  const _drawBox = (e) => {
    const w = Math.abs(data.current.mouseDataDown.initialW - e.pageX + data.current.rect.x);
    const h = Math.abs(data.current.mouseDataDown.initialH - e.pageY + data.current.rect.y);

    setState({
      isBoxSelecting: true,
      boxWidth: w,
      boxHeight: h,
      boxLeft: Math.min(e.pageX - data.current.rect.x, data.current.mouseDataDown.initialW),
      boxTop: Math.min(e.pageY - data.current.rect.y, data.current.mouseDataDown.initialH),
    });
  };

  const _selectElements = (e) => {
    const currentItems = [];
    const _selectbox = selectBoxRef.current;
    if (!_selectbox) return;
    registery.forEach((item) => {
      if (
        item.domNode &&
        doObjectsCollide(_selectbox, item.domNode) &&
        !currentItems.includes(item.key)
      ) {
        currentItems.push(item.key);
      }
    });
    onSelection(currentItems, e);
  };

  const _mousedown = (e) => {
    e.preventDefault();

    if (typeof onSelectionStarted === "function") onSelectionStarted(e);

    window.addEventListener("mouseup", _mouseUp);

    // Right clicks
    if (e.which === 3 || e.button === 2) return;

    data.current.rect = _getInitialCoords(ref.current);
    data.current.mouseDataDown = {
      boxLeft: e.pageX - data.current.rect.x,
      boxTop: e.pageY - data.current.rect.y,
      initialW: e.pageX - data.current.rect.x,
      initialH: e.pageY - data.current.rect.y,
    };
    window.addEventListener("mousemove", _drawBox);
  };

  const _mouseUp = (e) => {
    e.stopPropagation();

    window.removeEventListener("mousemove", _drawBox);
    window.removeEventListener("mouseup", _mouseUp);

    if (!data.current.mouseDataDown) return;
    _selectElements(e, true);
    data.current.mouseDataDown = null;
    setState({
      isBoxSelecting: false,
      boxWidth: 0,
      boxHeight: 0,
    });
  };

  return state;
};
