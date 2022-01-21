import * as React from "react";
import * as Styles from "~/common/styles";
import * as System from "~/components/system";
import * as Jumper from "~/components/system/components/fragments/Jumper";
import * as SVG from "~/common/svg";
import * as Actions from "~/common/actions";
import * as UserBehaviors from "~/common/user-behaviors";
import * as MobileJumper from "~/components/system/components/fragments/MobileJumper";
import * as Events from "~/common/custom-events";
import * as RovingTabIndex from "~/components/core/RovingTabIndex";
import * as Strings from "~/common/strings";
import * as Validations from "~/common/validations";

import { v4 as uuid } from "uuid";
import { mergeEvents } from "~/common/utilities";
import { css } from "@emotion/react";
import { useEventListener, usePrevious } from "~/common/hooks";

/* -------------------------------------------------------------------------------------------------
 *  Combobox
 *  used internally by EditSlates jumper
 * -----------------------------------------------------------------------------------------------*/

const comboboxContext = React.createContext({});
const useComboboxContext = () => React.useContext(comboboxContext);

function ComboboxProvider({ children, isMobile = false, onItemSelect }) {
  const menuItemsRef = React.useRef({});
  const menuElementRef = React.useRef({});

  const initialIndex = 0;
  const [selectedIdx, setSelectedIdx] = React.useState(initialIndex);

  const registerMenuRef = (node) => {
    if (isMobile) return;
    menuElementRef.current = node;
  };

  const registerMenuItem = ({ index, onSelectRef, ref }) => {
    if (isMobile) return;
    menuItemsRef.current[index] = { index, onSelectRef, ref };
  };
  const cleanupMenuItem = (index) => {
    if (isMobile) return;
    if (index === selectedIdx) setSelectedIdx(initialIndex);
    delete menuItemsRef.current[index];
  };

  const isNavigatingViaKeyboard = React.useRef(true);
  const moveSelectionOnArrowUp = () => {
    isNavigatingViaKeyboard.current = true;
    if (isMobile) return;
    const prevIndex = selectedIdx - 1;
    let prevFocusedIndex = null;
    if (prevIndex >= initialIndex) {
      prevFocusedIndex = prevIndex;
    } else {
      prevFocusedIndex = Math.max(...Object.keys(menuItemsRef.current));
    }
    setSelectedIdx(prevFocusedIndex);
  };

  const moveSelectionOnArrowDown = () => {
    isNavigatingViaKeyboard.current = true;
    if (isMobile) return;
    const nextIndex = selectedIdx + 1;
    const elementExists = menuItemsRef.current[nextIndex];
    const nextFocusedIndex = elementExists ? nextIndex : initialIndex;
    setSelectedIdx(nextFocusedIndex);
  };

  const moveSelectionOnHover = (index) => {
    isNavigatingViaKeyboard.current = false;
    const elementExists = menuItemsRef.current[index];
    if (!elementExists) {
      console.warn("Combobox: The element you're trying to select doesn't exist");
      return;
    }
    setSelectedIdx(index);
  };

  const applySelectedElement = () => {
    if (isMobile) return;
    menuItemsRef.current[selectedIdx].onSelectRef.current(), onItemSelect?.();
  };

  React.useLayoutEffect(() => {
    if (isMobile) return;

    //NOTE(amine): don't scroll automatically when the user is navigating using a mouse
    if (!isNavigatingViaKeyboard.current) return;
    const menuNode = menuElementRef.current;
    const selectedNode = menuItemsRef.current[selectedIdx]?.ref?.current;
    if (!menuNode || !selectedNode) return;

    const menuTop = menuNode.scrollTop;
    const menuBottom = menuTop + menuNode.offsetHeight;

    const selectedNodeTop = selectedNode.offsetTop;
    const selectedNodeBottom = selectedNodeTop + selectedNode.offsetHeight;

    if (selectedNodeTop <= menuTop) {
      menuNode.scrollTo({ top: selectedNodeTop - selectedNode.offsetHeight });
    }

    if (selectedNodeBottom >= menuBottom) {
      menuNode.scrollTo({
        top: selectedNodeBottom - menuNode.offsetHeight + selectedNode.offsetHeight,
      });
    }
  }, [selectedIdx, isMobile]);

  const contextValue = React.useMemo(
    () => [
      { selectedIdx, isMobile },
      {
        onItemSelect,

        registerMenuItem,
        cleanupMenuItem,

        moveSelectionOnArrowUp,
        moveSelectionOnArrowDown,
        moveSelectionOnHover,
        applySelectedElement,

        registerMenuRef,
      },
    ],
    [selectedIdx, isMobile]
  );

  return <comboboxContext.Provider value={contextValue}>{children}</comboboxContext.Provider>;
}

/* -----------------------------------------------------------------------------------------------*/

const ComboboxInput = React.forwardRef(({ onKeyDown, ...props }, ref) => {
  const [, { moveSelectionOnArrowUp, moveSelectionOnArrowDown, applySelectedElement }] =
    useComboboxContext();

  const keyDownHandler = (e) => {
    switch (e.key) {
      case "ArrowUp":
        e.preventDefault();
        e.stopPropagation();
        moveSelectionOnArrowUp();
        break;
      case "ArrowDown":
        e.preventDefault();
        e.stopPropagation();
        moveSelectionOnArrowDown();
        break;
      case "ArrowLeft":
        e.preventDefault();
        break;
      case "ArrowRight":
        e.preventDefault();
        break;
      case "Enter":
        e.preventDefault();
        e.stopPropagation();
        applySelectedElement();
        break;
    }
  };

  return <System.Input onKeyDown={mergeEvents(keyDownHandler, onKeyDown)} {...props} ref={ref} />;
});

/* -----------------------------------------------------------------------------------------------*/

function ComboboxMenuButton({ children, index, onSelect, onMouseDown, onClick, css, ...props }) {
  const [
    { selectedIdx },
    { registerMenuItem, cleanupMenuItem, moveSelectionOnHover, onItemSelect },
  ] = useComboboxContext();
  const handleMouseDown = (e) => e.preventDefault();
  const handleClick = () => (onSelect?.(), onItemSelect?.());

  const ref = React.useRef();

  //NOTE(amine): fix closure stale state
  const onSelectRef = React.useRef(onSelect);
  onSelectRef.current = onSelect;
  React.useEffect(() => {
    registerMenuItem({ index, onSelectRef: onSelectRef, ref });
    return () => cleanupMenuItem(index);
  }, [index]);

  const onMouseMoveHandler = () => {
    if (selectedIdx !== index) moveSelectionOnHover(index);
  };
  useEventListener(
    { type: "mousemove", handler: onMouseMoveHandler, ref, options: { once: true } },
    [selectedIdx]
  );

  return (
    <li>
      <button
        ref={ref}
        tabIndex={-1}
        onMouseDown={mergeEvents(handleMouseDown, onMouseDown)}
        onClick={mergeEvents(handleClick, onClick)}
        css={[Styles.BUTTON_RESET, css]}
        {...props}
      >
        {children}
      </button>
    </li>
  );
}

/* -----------------------------------------------------------------------------------------------*/

const STYLES_COMBOBOX_MENU = css`
  position: relative;
  overflow-y: auto;
`;

function ComboboxMenu({ children, css, ...props }) {
  const [, { registerMenuRef }] = useComboboxContext();

  return (
    <ul ref={registerMenuRef} css={[STYLES_COMBOBOX_MENU, css]} {...props}>
      {children}
    </ul>
  );
}

/* -----------------------------------------------------------------------------------------------*/

const Combobox = {
  Provider: ComboboxProvider,
  Input: ComboboxInput,
  Menu: ComboboxMenu,
  MenuButton: ComboboxMenuButton,
};

const useCombobox = () => {
  const [{ selectedIdx, isMobile }] = useComboboxContext();
  const checkIfIndexSelected = (index) => {
    if (isMobile) return false;
    return selectedIdx === index;
  };
  return { checkIfIndexSelected };
};

/* -------------------------------------------------------------------------------------------------
 *  EditSlates Internals
 * -----------------------------------------------------------------------------------------------*/

const STYLES_APPLIED_SLATE_BUTTON = (theme) => css`
  ${Styles.HORIZONTAL_CONTAINER_CENTERED};
  height: 32px;
  padding: 5px 12px 7px;
  border-radius: 12px;
  background-color: ${theme.semantic.bgWhite};
  border: 1px solid ${theme.semantic.borderGrayLight};
  box-shadow: ${theme.shadow.lightSmall};
`;

const STYLES_APPLIED_COLOR_TEXTBLACK = (theme) => css`
  color: ${theme.semantic.textBlack};
`;
const STYLES_APPLIED_COLOR_TEXTGRAY = (theme) => css`
  color: ${theme.semantic.textGray};
`;

const AppliedSlateButton = React.forwardRef(({ hasPublicIcon, children, ...props }, ref) => {
  return (
    <System.ButtonPrimitive css={STYLES_APPLIED_SLATE_BUTTON} ref={ref} {...props}>
      {hasPublicIcon && (
        <SVG.Users
          width={16}
          height={16}
          css={STYLES_APPLIED_COLOR_TEXTBLACK}
          style={{ marginRight: 4 }}
        />
      )}
      <System.H5
        as="span"
        style={{ maxWidth: "35ch" }}
        nbrOflines={1}
        title={children}
        color="textBlack"
      >
        {children}
      </System.H5>
      <SVG.Dismiss width={16} style={{ marginLeft: 4 }} css={STYLES_APPLIED_COLOR_TEXTGRAY} />
    </System.ButtonPrimitive>
  );
});

const STYLES_SLATES_INPUT = (theme) => css`
  background-color: transparent;
  ${theme.semantic.textGray};
  box-shadow: none;
  height: 24px;
  padding: 0px;
  border-radius: 0px;
  ::placeholder {
    color: ${theme.semantic.textGray};
  }
`;

const STYLES_SLATES_INPUT_WRAPPER = css`
  display: flex;
  flex-wrap: wrap;
  margin: calc(-8px + 6px) 0 0 -8px;
  width: calc(100% + 8px);
  max-height: 110px;
  overflow-y: auto;
  padding-bottom: 12px;

  & > * {
    margin: 8px 0 0 8px !important;
  }
`;

const STYLES_SEARCH_SLATES_COLOR = (theme) => css`
  color: ${theme.semantic.textGrayDark};
`;

function ComboboxSlatesInput({ appliedSlates, removeFileFromSlate, style, ...props }) {
  const reverseAppliedSlates = React.useMemo(
    () => [...appliedSlates].sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt)),
    [appliedSlates]
  );
  const prevLength = usePrevious(reverseAppliedSlates.length);

  const inputRef = React.useRef();
  React.useEffect(() => {
    if (reverseAppliedSlates.length > prevLength) {
      // NOTE(amine): if a new slate is added, scroll to the input
      inputRef.current.scrollIntoView();
    }
  }, [reverseAppliedSlates]);

  return (
    <div css={[Styles.HORIZONTAL_CONTAINER, STYLES_SEARCH_SLATES_COLOR]} style={{ width: "100%" }}>
      <SVG.Hash width={16} style={{ marginTop: 20, marginBottom: 16 }} />
      <RovingTabIndex.Provider>
        <RovingTabIndex.List
          css={STYLES_SLATES_INPUT_WRAPPER}
          style={{ marginLeft: 6, marginTop: 6, paddingRight: 20, ...style }}
        >
          {reverseAppliedSlates.map((slate, idx) => (
            <RovingTabIndex.Item key={slate.id} index={idx}>
              <AppliedSlateButton
                hasPublicIcon={slate.isPublic}
                onClick={() => removeFileFromSlate(slate)}
              >
                {slate.slatename}
              </AppliedSlateButton>
            </RovingTabIndex.Item>
          ))}
          <RovingTabIndex.Item index={reverseAppliedSlates.length}>
            <Combobox.Input
              ref={inputRef}
              name="search"
              placeholder="Search or create a new tag"
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus
              inputCss={STYLES_SLATES_INPUT}
              containerStyle={{ flexGrow: 1, paddingTop: 3, height: 32 }}
              {...props}
            />
          </RovingTabIndex.Item>
        </RovingTabIndex.List>
      </RovingTabIndex.Provider>
    </div>
  );
}

/* -----------------------------------------------------------------------------------------------*/

const STYLES_SLATES_MENU_WRAPPER = (theme) => css`
  flex-grow: 1;
  flex-basis: 0;
  padding: 12px;

  @media (max-width: ${theme.sizes.mobile}px) {
    padding: 8px;
    max-height: none;
  }
`;

const STYLES_RETURN_KEY = (theme) => css`
  padding: 0px 2px;
  border-radius: 6px;
  background-color: ${theme.semantic.bgBlurLightOP};
`;

const STYLES_SLATES_MENU_BUTTON_SELECTED = (theme) => css`
  background-color: ${theme.semantic.bgGrayLight4};
`;

const STYLES_SLATES_MENU_BUTTON = css`
  ${Styles.HORIZONTAL_CONTAINER_CENTERED};
  justify-content: space-between;
  position: relative;
  padding: 9px 8px 11px;
  width: 100%;
  overflow: hidden;
  border-radius: 8px;
`;

const STYLES_CHECKBOX_CIRCLE = (theme) => css`
  padding: 4px;
  border-radius: 50%;
  background-color: ${theme.system.green};
  color: ${theme.semantic.textWhite};
`;

const STYLES_EMPTY_STATE_TAG = (theme) => css`
  padding: 7px 12px 9px;
  border-radius: 12px;
  background-color: ${theme.semantic.bgGrayLight4};
`;

const STYLES_EMPTY_STATE_WRAPPER = css`
  ${Styles.VERTICAL_CONTAINER_CENTERED};
  justify-content: center;
  height: 275px;
`;

const STYLES_SLATES_MENU_BUTTON_BLUE = (theme) => css`
  color: ${theme.system.blue};
  &:hover {
    color: ${theme.system.blue};
  }
`;
const STYLES_SLATES_MENU_BUTTON_TEXTBLACK = (theme) => css`
  color: ${theme.system.textBlack};
  &:hover {
    color: ${theme.system.textBlack};
  }
`;

const ComboboxSlatesMenuButton = ({
  hasPublicIcon,
  isCreateAction,
  isSlateApplied,
  children,
  index,
  ...props
}) => {
  const { checkIfIndexSelected } = useCombobox();
  const isSelected = checkIfIndexSelected(index);

  return (
    <Combobox.MenuButton
      css={[
        STYLES_SLATES_MENU_BUTTON,
        isSelected && STYLES_SLATES_MENU_BUTTON_SELECTED,
        isCreateAction ? STYLES_SLATES_MENU_BUTTON_BLUE : STYLES_SLATES_MENU_BUTTON_TEXTBLACK,
      ]}
      index={index}
      {...props}
    >
      <div>
        {hasPublicIcon && (
          <div style={{ position: "absolute", padding: "2px", left: "8px", top: "9x" }}>
            <SVG.Users width={16} height={16} />
          </div>
        )}
        <System.H5
          as="span"
          nbrOflines={isCreateAction ? 2 : 1}
          title={children}
          style={{ marginLeft: 32, maxWidth: "46ch" }}
        >
          {children}
        </System.H5>
      </div>
      {!isCreateAction && isSelected && (
        <div css={Styles.HORIZONTAL_CONTAINER_CENTERED} style={{ marginLeft: "auto" }}>
          <System.P3 color="textGrayDark">{isSlateApplied ? "remove tag" : "apply tag"}</System.P3>
          <System.P3 css={STYLES_RETURN_KEY} color="textGray" style={{ marginLeft: 4 }}>
            ⏎
          </System.P3>
        </div>
      )}
      {isSlateApplied && (
        <div css={STYLES_CHECKBOX_CIRCLE} style={{ marginLeft: 12 }}>
          <SVG.Check width={12} height={12} />
        </div>
      )}
    </Combobox.MenuButton>
  );
};

function ComboboxSlatesMenu({
  filterValue,
  filteredSlates,
  slates,

  createSlate,
  addFileToSlate,
  removeFileFromSlate,
  checkIfSlateIsApplied,
}) {
  const { canCreateSlate, suggestions } = React.useMemo(() => {
    let canCreateSlate = true;

    const filterRegex = new RegExp(filterValue, "gi");
    const filterAndSortSlates = (slates) =>
      slates.filter((slate) => {
        if (slate.slatename === filterValue) canCreateSlate = false;
        return filterRegex.test(slate.slatename);
      });

    return {
      suggestions: {
        applied: filterAndSortSlates(filteredSlates.applied),
        unapplied: filterAndSortSlates(filteredSlates.unapplied),
      },
      canCreateSlate,
    };
  }, [filterValue, filteredSlates]);

  const isFilteredView = !!filterValue;

  const createPublicState = React.useCallback(() => {
    createSlate({ name: filterValue, isPublic: true });
  }, [filterValue]);
  const createPrivateState = React.useCallback(() => {
    createSlate({ name: filterValue, isPublic: false });
  }, [filterValue]);

  if (isFilteredView) {
    return (
      <Combobox.Menu css={STYLES_SLATES_MENU_WRAPPER}>
        {suggestions.unapplied.map((slate, i) => (
          <ComboboxSlatesMenuButton
            key={slate.id}
            hasPublicIcon={slate.isPublic}
            css={STYLES_SLATES_MENU_BUTTON}
            index={i}
            onSelect={() => addFileToSlate(slate)}
          >
            {slate.slatename}
          </ComboboxSlatesMenuButton>
        ))}
        {canCreateSlate ? (
          <>
            <ComboboxSlatesMenuButton
              isCreateAction
              index={suggestions.unapplied.length}
              onSelect={createPrivateState}
            >
              create new private tag “{filterValue}”
            </ComboboxSlatesMenuButton>
            <ComboboxSlatesMenuButton
              isCreateAction
              hasPublicIcon
              index={suggestions.unapplied.length + 1}
              onSelect={createPublicState}
            >
              create new shared tag “{filterValue}” (shows on your profile)
            </ComboboxSlatesMenuButton>
          </>
        ) : null}
        {suggestions.applied.map((slate, i) => (
          <ComboboxSlatesMenuButton
            isSlateApplied
            hasPublicIcon={slate.isPublic}
            index={
              canCreateSlate
                ? suggestions.unapplied.length + i + 2
                : suggestions.unapplied.length + i
            }
            key={slate.id}
            onSelect={() => removeFileFromSlate(slate)}
          >
            {slate.slatename}
          </ComboboxSlatesMenuButton>
        ))}
      </Combobox.Menu>
    );
  }

  if (slates.length === 0) {
    return (
      <div css={STYLES_EMPTY_STATE_WRAPPER}>
        <System.P2 color="textGrayDark" style={{ textAlign: "center" }}>
          You don’t have any tags yet. <br /> Start typing above to create one.
        </System.P2>
        <div css={STYLES_EMPTY_STATE_TAG} style={{ marginTop: 19 }}>
          <SVG.Hash width={16} height={16} style={{ display: "block" }} />
        </div>
      </div>
    );
  }

  return (
    <Combobox.Menu css={STYLES_SLATES_MENU_WRAPPER}>
      {slates.map((slate, i) => {
        const isSlateApplied = checkIfSlateIsApplied(slate);
        return (
          <ComboboxSlatesMenuButton
            hasPublicIcon={slate.isPublic}
            key={slate.id}
            index={i}
            isSlateApplied={isSlateApplied}
            onSelect={
              isSlateApplied ? () => removeFileFromSlate(slate) : () => addFileToSlate(slate)
            }
          >
            {slate.slatename}
          </ComboboxSlatesMenuButton>
        );
      })}
    </Combobox.Menu>
  );
}

/* -------------------------------------------------------------------------------------------------
 *  EditSlates Jumper
 * -----------------------------------------------------------------------------------------------*/

const useSlates = ({ viewer, object }) => {
  const sortedSlates = React.useMemo(
    () => [...viewer.slates].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)),
    []
  );
  const [slates, setSlates] = React.useState(sortedSlates);

  const appliedSlatesHash = React.useRef({});
  const filteredSlates = React.useMemo(() => {
    let applied = [];
    let unapplied = [];

    slates.forEach((slate) => {
      if (slate.objects.some((item) => item.id === object.id)) {
        appliedSlatesHash.current[slate.id] = true;
        applied.push(slate);
      } else {
        appliedSlatesHash.current[slate.id] = false;
        unapplied.push(slate);
      }
    });

    return { applied, unapplied };
  }, [slates, object]);

  const checkIfSlateIsApplied = (slate) => !!appliedSlatesHash.current[slate.id];

  const createSlate = async ({ name, isPublic }) => {
    const generatedId = uuid();
    setSlates([
      {
        id: generatedId,
        slatename: name,
        isPublic,
        objects: [object],
        updatedAt: new Date().toString(),
      },
      ...slates,
    ]);

    const response = await Actions.createSlate({
      name: name,
      isPublic,
      hydrateViewer: false,
    });
    if (Events.hasError(response)) {
      setSlates(slates.filter((slate) => slate.id !== generatedId));
      return;
    }

    // NOTE(amine): replace generated id with response
    const prevSlates = slates.filter((slate) => slate.id !== generatedId);
    setSlates([{ ...response.slate, objects: [object] }, ...prevSlates]);

    const saveResponse = await UserBehaviors.saveCopy({
      slate: response.slate,
      files: [object],
      showAlerts: false,
    });
    if (Events.hasError(saveResponse)) {
      setSlates([prevSlates, ...response.slate]);
    }
  };

  const addFileToSlate = async (slate) => {
    const prevSlates = [...slates];
    const resetViewerSlates = () => setSlates(prevSlates);

    const nextSlates = slates.map((item) => {
      if (slate.id === item.id)
        return { ...item, updatedAt: new Date().toString(), objects: [...item.objects, object] };
      return item;
    });
    setSlates(nextSlates);

    const response = await UserBehaviors.saveCopy({ slate, files: [object], showAlerts: false });
    if (!response) resetViewerSlates();
  };

  const removeFileFromSlate = async (slate) => {
    const prevSlates = [...slates];
    const resetViewerSlates = () => setSlates(prevSlates);
    const nextSlates = [];
    slates.forEach((item) => {
      if (slate.id === item.id) {
        const objects = item.objects.filter((item) => item.id !== object.id);
        //NOTE(Amine): delete the tag when there is no files
        if (objects.length === 0) return;
        nextSlates.push({
          ...item,
          updatedAt: new Date().toString(),
          objects: objects,
        });
        return;
      }
      nextSlates.push(item);
    });
    setSlates(nextSlates);

    const response = await UserBehaviors.removeFromSlate({ slate, ids: [object.id] });
    if (!response) resetViewerSlates();
  };

  return {
    slates,
    filteredSlates,
    createSlate,
    addFileToSlate,
    removeFileFromSlate,
    checkIfSlateIsApplied,
  };
};

const useInput = () => {
  const [value, setValue] = React.useState("");
  const handleInputChange = (e) => {
    const nextValue = e.target.value;
    //NOTE(amine): allow input's value to be empty but keep other validations
    if (Strings.isEmpty(nextValue) || Validations.slatename(nextValue)) {
      setValue(Strings.createSlug(nextValue, ""));
    }
  };
  const clearInputValue = () => setValue("");

  return [value, { handleInputChange, clearInputValue }];
};

/* -----------------------------------------------------------------------------------------------*/

export function EditSlates({ file, viewer, onClose, ...props }) {
  const {
    slates,
    filteredSlates,

    createSlate,
    addFileToSlate,
    removeFileFromSlate,
    checkIfSlateIsApplied,
  } = useSlates({
    viewer,
    object: file,
  });

  const [value, { handleInputChange, clearInputValue }] = useInput();

  return (
    <Jumper.Root onClose={onClose} {...props}>
      <Combobox.Provider onItemSelect={clearInputValue}>
        <Jumper.Header style={{ paddingTop: 0, paddingBottom: 0, paddingRight: 0 }}>
          <ComboboxSlatesInput
            value={value}
            appliedSlates={filteredSlates.applied}
            removeFileFromSlate={removeFileFromSlate}
            onChange={handleInputChange}
            style={{ paddingRight: 24 }}
          />
          <Jumper.Dismiss style={{ position: "absolute", right: 16, top: 20 }} />
        </Jumper.Header>
        <Jumper.Divider />
        <Jumper.ObjectInfo file={file} />
        <Jumper.Divider />
        <Jumper.Item css={Styles.VERTICAL_CONTAINER} style={{ padding: 0, flexGrow: 1 }}>
          <ComboboxSlatesMenu
            filterValue={value}
            slates={slates}
            filteredSlates={filteredSlates}
            checkIfSlateIsApplied={checkIfSlateIsApplied}
            createSlate={createSlate}
            addFileToSlate={addFileToSlate}
            removeFileFromSlate={removeFileFromSlate}
          />
        </Jumper.Item>
      </Combobox.Provider>
    </Jumper.Root>
  );
}

/* -----------------------------------------------------------------------------------------------*/

export function EditSlatesMobile({ file, viewer, onClose }) {
  const {
    slates,
    filteredSlates,

    createSlate,
    addFileToSlate,
    removeFileFromSlate,
    checkIfSlateIsApplied,
  } = useSlates({
    viewer,
    object: file,
  });

  const [value, { handleInputChange, clearInputValue }] = useInput();

  return (
    <MobileJumper.Root onClose={onClose}>
      <Combobox.Provider onItemSelect={clearInputValue} isMobile>
        <System.Divider height={1} color="borderGrayLight" />
        <MobileJumper.ObjectInfo file={file} onClick={onClose} />
        <System.Divider height={1} color="borderGrayLight" />
        <MobileJumper.Header style={{ paddingTop: 0, paddingBottom: 0, paddingRight: 0 }}>
          <ComboboxSlatesInput
            value={value}
            appliedSlates={filteredSlates.applied}
            removeFileFromSlate={removeFileFromSlate}
            onChange={handleInputChange}
          />
        </MobileJumper.Header>
        <System.Divider height={1} color="borderGrayLight" />
        <MobileJumper.Content style={{ padding: 0, paddingBottom: 60 }}>
          <ComboboxSlatesMenu
            filterValue={value}
            slates={slates}
            filteredSlates={filteredSlates}
            checkIfSlateIsApplied={checkIfSlateIsApplied}
            createSlate={createSlate}
            addFileToSlate={addFileToSlate}
            removeFileFromSlate={removeFileFromSlate}
          />
        </MobileJumper.Content>
      </Combobox.Provider>
    </MobileJumper.Root>
  );
}
