import * as React from "react";

import { jsx } from "@emotion/react";
import { mergeRefs } from "~/common/utilities";
import { useEventListener, useIsomorphicLayoutEffect } from "~/common/hooks";

/* -------------------------------------------------------------------------------------------------
 * RovingTabIndex Provider
 * -----------------------------------------------------------------------------------------------*/

const rovingIndexContext = React.createContext({});
const useRovingIndexContext = () => React.useContext(rovingIndexContext);

export function Provider({ axis, children }) {
  const focusedElementsRefs = React.useRef({});
  const initialIndex = 0;
  const [focusedIndex, setFocusedIndex] = React.useState(initialIndex);

  const registerItem = ({ index, ref }) => {
    focusedElementsRefs.current[index] = ref;
    if (ref.current === document.activeElement) setFocusedIndex(index);
  };

  const cleanupItem = (index) => {
    delete focusedElementsRefs.current[index];
  };

  const syncFocusedIndexState = ({ index, isFocused }) => {
    if (!isFocused) return;
    const calculatedMaxIndex = Math.max(...Object.keys(focusedElementsRefs.current));
    const maxIndex = Number.isFinite(calculatedMaxIndex) ? calculatedMaxIndex : index;
    const minIndex = initialIndex;
    if (index >= maxIndex) {
      setIndexTo(maxIndex);
    } else if (index <= minIndex) {
      setIndexTo(minIndex);
    } else {
      setIndexTo(index);
    }
  };

  const focusElement = (index) => {
    const focusedElementRef = focusedElementsRefs.current[index];
    focusedElementRef.current.focus();
  };

  const setIndexToNextElement = () => {
    const nextIndex = focusedIndex + 1;
    const elementsExists = focusedElementsRefs.current[nextIndex];
    const nextFocusedIndex = elementsExists ? nextIndex : initialIndex;
    setFocusedIndex(nextFocusedIndex);
    focusElement(nextFocusedIndex);
  };

  const setIndexPreviousElement = () => {
    const prevIndex = focusedIndex - 1;
    let prevFocusedIndex = null;
    if (prevIndex >= initialIndex) {
      prevFocusedIndex = prevIndex;
    } else {
      prevFocusedIndex = Math.max(...Object.keys(focusedElementsRefs.current));
    }
    setFocusedIndex(prevFocusedIndex);
    focusElement(prevFocusedIndex);
  };

  const setIndexTo = (index) => {
    if (!focusedElementsRefs.current[index]) return;
    setFocusedIndex(index);
    focusElement(index);
  };

  const contextValue = React.useMemo(
    () => [
      { focusedIndex, axis },
      {
        registerItem,
        cleanupItem,
        syncFocusedIndexState,
        setIndexToNextElement,
        setIndexPreviousElement,
        setIndexTo,
      },
    ],
    [focusedIndex]
  );

  return <rovingIndexContext.Provider value={contextValue}>{children}</rovingIndexContext.Provider>;
}

/* -------------------------------------------------------------------------------------------------
 * RovingTabIndex List
 * -----------------------------------------------------------------------------------------------*/
const useRovingHandler = ({ ref }) => {
  const [{ axis }, { setIndexToNextElement, setIndexPreviousElement }] = useRovingIndexContext();

  const keyUpHandler = (e) => {
    const preventDefaults = () => (e.preventDefault(), e.stopPropagation());
    if (axis === "vertical") {
      if (e.key === "ArrowUp") preventDefaults(), setIndexPreviousElement();
      if (e.key === "ArrowDown") preventDefaults(), e.stopPropagation(), setIndexToNextElement();
      return;
    }
    if (e.key === "ArrowLeft") preventDefaults(), setIndexPreviousElement();
    if (e.key === "ArrowRight") preventDefaults(), setIndexToNextElement();
  };
  useEventListener({
    type: "keyup",
    handler: keyUpHandler,
    ref,
  });
};

export const List = React.forwardRef(({ as = "div", children, ...props }, forwardedRef) => {
  const ref = React.useRef();
  useRovingHandler({ ref });

  return jsx(as, { ...props, ref: mergeRefs([ref, forwardedRef]) }, children);
});

/* -------------------------------------------------------------------------------------------------
 * RovingTabIndex Item
 * -----------------------------------------------------------------------------------------------*/

export const Item = React.forwardRef(({ children, index, ...props }, forwardedRef) => {
  const [{ focusedIndex }, { registerItem, cleanupItem, syncFocusedIndexState, setIndexTo }] =
    useRovingIndexContext();
  const ref = React.useRef();

  const indexRef = React.useRef(index);
  useIsomorphicLayoutEffect(() => {
    indexRef.current = index;
    if (!ref.current) return;

    registerItem({ index, ref });
    return () => cleanupItem(index);
  }, [index]);

  const isFocusedBeforeUnmountingRef = React.useRef();
  React.useLayoutEffect(() => {
    const element = ref.current;
    return () => (isFocusedBeforeUnmountingRef.current = element === document.activeElement);
  }, []);

  React.useEffect(() => {
    if (!ref.current) return;
    if (children.props.autoFocus) setIndexTo(index);

    // NOTE(amine): when an element is removed and is focused,move focus the next one
    return () => {
      syncFocusedIndexState({
        index: indexRef.current,
        isFocused: isFocusedBeforeUnmountingRef.current,
      });
    };
  }, []);

  return React.cloneElement(React.Children.only(children), {
    ...props,
    tabIndex: focusedIndex === index ? 0 : -1,
    ref: mergeRefs([ref, forwardedRef, children.ref]),
  });
});
