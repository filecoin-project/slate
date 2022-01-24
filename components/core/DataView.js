import * as React from "react";
import * as Constants from "~/common/constants";
import * as Strings from "~/common/strings";
import * as SVG from "~/common/svg";
import * as Window from "~/common/window";
import * as UserBehaviors from "~/common/user-behaviors";
import * as Events from "~/common/custom-events";
import * as Styles from "~/common/styles";
import * as ObjectJumpers from "~/components/system/components/GlobalCarousel/jumpers";

import { Link } from "~/components/core/Link";
import { css } from "@emotion/react";
import { Boundary } from "~/components/system/components/fragments/Boundary";
import { PopoverNavigation } from "~/components/system/components/PopoverNavigation";
import { CheckBox } from "~/components/system/components/CheckBox";
import { Table } from "~/components/core/Table";
import { FileTypeIcon } from "~/components/core/FileTypeIcon";
import { ButtonPrimary, ButtonWarning } from "~/components/system/components/Buttons";
import { GroupSelectable, Selectable } from "~/components/core/Selectable/";
import { ConfirmationModal } from "~/components/core/ConfirmationModal";
import { useEventListener } from "~/common/hooks";

import FilePreviewBubble from "~/components/core/FilePreviewBubble";
import ObjectPreview from "~/components/core/ObjectPreview";

const STYLES_CONTAINER_HOVER = css`
  display: flex;
  :hover {
    color: ${Constants.system.blue};
  }
`;

const STYLES_ICON_BOX = css`
  height: 32px;
  width: 32px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-left: 16px;
`;

const STYLES_CANCEL_BOX = css`
  height: 16px;
  width: 16px;
  background-color: ${Constants.system.blue};
  border-radius: 3px;
  position: relative;
  right: 3px;
  cursor: pointer;
  box-shadow: 0 0 0 1px ${Constants.system.blue};
`;

const STYLES_HEADER_LINE = css`
  display: flex;
  align-items: center;
  margin-top: 80px;
  margin-bottom: 30px;
`;

const STYLES_LINK = css`
  display: inline;
  cursor: pointer;
  transition: 200ms ease all;
  font-size: 0.9rem;
  padding: 12px 0px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 320px;
  @media (max-width: ${Constants.sizes.tablet}px) {
    max-width: 120px;
  }
`;

const STYLES_VALUE = css`
  font-size: 0.9rem;
  padding: 12px 0px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const STYLES_ICON_BOX_HOVER = css`
  display: inline-flex;
  align-items: center;
  padding: 8px;
  cursor: pointer;
  :hover {
    color: ${Constants.system.blue};
  }
`;

const STYLES_ICON_BOX_BACKGROUND = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 25px;
  width: 25px;
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.75);
  border-radius: 3px;
  position: absolute;
  bottom: 8px;
  right: 8px;
`;

const STYLES_ACTION_BAR = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 12px;
  padding: 0px 32px;
  box-sizing: border-box;
  background-color: ${Constants.system.black};
  box-shadow: ${Constants.shadow.lightMedium};
  width: 90vw;
  max-width: 878px;
  height: 48px;
  @media (max-width: ${Constants.sizes.mobile}px) {
    display: none;
  }
`;

const STYLES_ACTION_BAR_CONTAINER = css`
  position: fixed;
  bottom: 30px;
  left: 0px;
  width: 100vw;
  display: flex;
  justify-content: center;
  z-index: ${Constants.zindex.header};
  @media (max-width: ${Constants.sizes.mobile}px) {
    display: none;
  }
`;

const STYLES_RIGHT = css`
  flex-shrink: 0;
  display: flex;
  align-items: center;
`;

const STYLES_LEFT = css`
  width: 100%;
  min-width: 10%;
  display: flex;
  align-items: center;
`;

const STYLES_FILES_SELECTED = css`
  font-family: ${Constants.font.semiBold};
  color: ${Constants.system.white};
  @media (max-width: ${Constants.sizes.mobile}px) {
    display: none;
  }
`;

const STYLES_COPY_INPUT = css`
  pointer-events: none;
  position: absolute;
  opacity: 0;
`;

const STYLES_IMAGE_GRID = css`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(248px, 1fr));
  grid-gap: 20px 12px;

  @media (max-width: ${Constants.sizes.mobile}px) {
    grid-template-columns: repeat(auto-fill, minmax(168px, 1fr));
  }
`;

const STYLES_IMAGE_BOX = css`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  @media (max-width: ${Constants.sizes.mobile}px) {
    margin: 12px auto;
  }
  :hover {
    box-shadow: 0px 0px 0px 1px ${Constants.semantic.borderLight} inset,
      ${Constants.shadow.lightSmall};
  }
`;

const STYLES_MOBILE_HIDDEN = css`
  @media (max-width: ${Constants.sizes.mobile}px) {
    display: none;
  }
`;

const STYLES_TAGS_WRAPPER = css`
  box-sizing: border-box;
  display: block;
  width: 100%;
  max-width: 800px;
`;

const STYLES_LIST = css`
  display: inline-flex;
  margin: 0;
  padding: 0;
`;

const STYLES_TAG = css`
  list-style-type: none;
  border-radius: 4px;
  background: ${Constants.semantic.bgLight};
  color: ${Constants.system.black};
  font-family: ${Constants.font.text};
  padding: 2px 8px;
  margin: 8px 8px 0 0;
  span {
    line-height: 1.5;
    font-size: 14px;
  }
  &:hover {
    background: ${Constants.system.grayLight4};
  }
`;

// class Tags extends React.Component {
//   state = {
//     isTruncated: false,
//     truncateIndex: 0,
//   };

//   listWrapper = React.createRef();
//   listEl = React.createRef();

//   componentDidMount() {
//     this._handleTruncate();
//   }

//   componentDidUpdate(prevProps, prevState) {
//     if (!isEqual(prevProps.tags, this.props.tags)) {
//       this._handleTruncate();
//     }
//   }

//   _handleTruncate = () => {
//     const listWrapper = this.listWrapper.current?.getBoundingClientRect();
//     const tagNodes = this.listEl.current?.querySelectorAll("li");
//     const tagElems = Array.from(tagNodes);

//     let total = 0;
//     const truncateIndex = tagElems.findIndex((tagElem) => {
//       const { width } = tagElem?.getBoundingClientRect();
//       total += width;

//       if (total >= listWrapper.width - 50) {
//         return true;
//       }
//     });

//     if (truncateIndex > 0) {
//       this.setState({ isTruncated: true, truncateIndex });
//       return;
//     }

//     this.setState({ isTruncated: false, truncateIndex: tagElems.length });
//   };

//   render() {
//     const { tags } = this.props;

//     return (
//       <div css={STYLES_TAGS_WRAPPER}>
//         <div ref={this.listWrapper} style={{ width: 340 }}>
//           <ul css={STYLES_LIST} ref={this.listEl}>
//             {(this.state.isTruncated ? tags.slice(0, this.state.truncateIndex) : tags).map(
//               (tag) => (
//                 <li key={tag} css={STYLES_TAG}>
//                   <span>{tag}</span>
//                 </li>
//               )
//             )}
//           </ul>
//           {this.state.isTruncated && <span>...</span>}
//         </div>
//       </div>
//     );
//   }
// }

function Footer({
  type = "myslate",
  close,
  isOwner,
  viewer,
  getSelectedFiles,
  totalSelectedFiles,
  downloadFiles,
  deleteFiles,
  //NOTE(amine): Myslate actions
  // editTags,
  //NOTE(amine): Collection actions
  removeFromCollection,
  saveCopy,
}) {
  const [isSlatesJumperVisible, setSlatesJumperVisibility] = React.useState(false);
  const showSlatesJumper = () => setSlatesJumperVisibility(true);
  const hideSlatesJumper = () => setSlatesJumperVisibility(false);

  const totalFiles = `${totalSelectedFiles} ${Strings.pluralize(
    "object",
    totalSelectedFiles
  )} selected`;

  const isCollectionType = type === "collection";

  const isSlatesControlVisible = isOwner && !isCollectionType;

  const handleKeyDown = (e) => {
    const targetTagName = e.target.tagName;
    if (targetTagName === "INPUT" || targetTagName === "TEXTAREA" || targetTagName === "SELECT")
      return;

    switch (e.key) {
      case "T":
      case "t":
        showSlatesJumper();
        break;
    }
  };
  useEventListener({ type: "keyup", handler: handleKeyDown, enabled: isSlatesControlVisible });

  return (
    <React.Fragment>
      <div css={STYLES_ACTION_BAR_CONTAINER}>
        <div css={STYLES_ACTION_BAR}>
          <div css={STYLES_LEFT}>
            <span css={STYLES_FILES_SELECTED}>{totalFiles}</span>
          </div>
          <div css={STYLES_RIGHT}>
            {isSlatesControlVisible && (
              <>
                <ButtonPrimary
                  transparent
                  style={{ color: Constants.system.white }}
                  onClick={showSlatesJumper}
                >
                  Tag
                </ButtonPrimary>
                {isSlatesJumperVisible ? (
                  <ObjectJumpers.EditSlates
                    file={getSelectedFiles()}
                    viewer={viewer}
                    onClose={hideSlatesJumper}
                  />
                ) : null}
              </>
            )}
            {isOwner && isCollectionType && (
              <ButtonWarning
                transparent
                style={{ marginLeft: 8, color: Constants.system.white }}
                onClick={removeFromCollection}
              >
                Untag
              </ButtonWarning>
            )}
            {/* {isOwner && !isCollectionType && (
              <ButtonPrimary
                transparent
                style={{ color: Constants.system.white }}
                onClick={editTags}
              >
                Edit tags
              </ButtonPrimary>
            )} */}
            {!isOwner && isCollectionType && (
              <ButtonPrimary
                transparent
                onClick={saveCopy}
                style={{ color: Constants.system.white }}
              >
                Save
              </ButtonPrimary>
            )}
            {isOwner && (
              <ButtonWarning
                transparent
                style={{ marginLeft: 8, color: Constants.system.white }}
                onClick={downloadFiles}
              >
                Download
              </ButtonWarning>
            )}
            {isOwner && (
              <ButtonWarning
                transparent
                style={{ marginLeft: 8, color: Constants.system.white }}
                onClick={deleteFiles}
              >
                Delete
              </ButtonWarning>
            )}
            <div css={STYLES_ICON_BOX} onClick={close}>
              <SVG.Dismiss height="20px" style={{ color: Constants.system.grayLight2 }} />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default class DataView extends React.Component {
  _mounted = false;

  state = {
    menu: null,
    checked: {},
    viewLimit: 40,
    scrollDebounce: false,
    modalShow: false,
    items: this.props.items,
  };

  isShiftDown = false;
  lastSelectedItemIndex = null;

  gridWrapperEl = React.createRef();

  async componentDidMount() {
    if (!this._mounted) {
      this._mounted = true;
      window.addEventListener("scroll", this._handleCheckScroll);
      window.addEventListener("resize", this.debounceInstance);
      window.addEventListener("keydown", this._handleKeyDown);
      window.addEventListener("keyup", this._handleKeyUp);

      if (this.gridWrapperEl.current) {
        this.gridWrapperEl.current.addEventListener("selectstart", this._handleSelectStart);
      }
    }
  }

  componentWillUnmount() {
    this._mounted = false;
    window.removeEventListener("scroll", this._handleCheckScroll);
    window.removeEventListener("resize", this.debounceInstance);
    window.removeEventListener("keydown", this._handleKeyDown);
    window.removeEventListener("keyup", this._handleKeyUp);

    if (this.gridWrapperEl.current) {
      this.gridWrapperEl.current.removeEventListener("selectstart", this._handleSelectStart);
    }
  }

  _gerSelectedFiles = () => this.props.items.filter((_, i) => this.state.checked[i]);

  _handleScroll = (e) => {
    const windowHeight =
      "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight - 600) {
      this.setState({ viewLimit: this.state.viewLimit + 30 });
    }
  };

  _handleCheckScroll = Window.debounce(this._handleScroll, 200);

  /* NOTE(daniel): This disable text selection while pressing shift key */
  _handleSelectStart = (e) => {
    if (this.isShiftDown) {
      e.preventDefault();
    }
  };

  _addSelectedItemsOnDrag = (e) => {
    let selectedItems = {};
    for (const i of e) {
      selectedItems[i] = true;
    }
    this.setState({ checked: { ...this.state.checked, ...selectedItems } });
  };

  _removeSelectedItemsOnDrag = (e) => {
    const selectedItems = { ...this.state.checked };
    for (const i in selectedItems) {
      selectedItems[i] = selectedItems[i] && !e.includes(+i);
      if (!selectedItems[i]) delete selectedItems[i];
    }
    this.setState({ checked: selectedItems, ...selectedItems });
  };

  _handleDragAndSelect = (e, { isAltDown }) => {
    if (isAltDown) {
      this._removeSelectedItemsOnDrag(e);
      return;
    }
    this._addSelectedItemsOnDrag(e);
  };

  _handleKeyUp = (e) => {
    if (e.keyCode === 16 && this.isShiftDown) {
      this.isShiftDown = false;
    }
  };

  _handleKeyDown = (e) => {
    if (e.keyCode === 16 && !this.isShiftDown) {
      this.isShiftDown = true;
    }

    let numChecked = Object.keys(this.state.checked).length || 0;
    if (e.keyCode === 27 && numChecked) {
      this._handleUncheckAll();
    }
  };

  _handleCheckBox = (e, i) => {
    e.stopPropagation();
    e.preventDefault();

    let checked = this.state.checked;
    if (this.isShiftDown && this.lastSelectedItemIndex !== i) {
      return this._handleShiftClick({
        currentSelectedItemIndex: i,
        lastSelectedItemIndex: this.lastSelectedItemIndex,
        checked,
      });
    }

    if (checked[i]) {
      delete checked[i];
    } else {
      checked[i] = true;
    }
    this.setState({ checked });
    this.lastSelectedItemIndex = i;
  };

  _handleShiftClick = ({ currentSelectedItemIndex, lastSelectedItemIndex, checked }) => {
    const start = Math.min(currentSelectedItemIndex, lastSelectedItemIndex);
    const stop = Math.max(currentSelectedItemIndex, lastSelectedItemIndex) + 1;

    let rangeSelected = {};

    for (let i = start; i < stop; i++) {
      if (checked[currentSelectedItemIndex]) {
        delete checked[i];
      } else {
        rangeSelected[i] = true;
      }
    }

    let newSelection = Object.assign({}, checked, rangeSelected);
    this.setState({ checked: newSelection });
    this.lastSelectedItemIndex = currentSelectedItemIndex;

    return;
  };

  _handleDownloadFiles = async () => {
    if (!this.props.viewer) {
      Events.dispatchCustomEvent({ name: "slate-global-open-cta", detail: {} });
      return;
    }

    UserBehaviors.compressAndDownloadFiles({
      files: this._gerSelectedFiles(),
    });
    this.setState({ checked: {} });
  };

  _handleDeleteFilesFromCollection = (res) => {
    if (!res) {
      this.setState({ modalShow: false });
      return;
    }

    let ids = [];
    for (let index of Object.keys(this.state.checked)) {
      ids.push(this.state.items[index].id);
    }

    const { slates } = this.props.viewer;
    const slateId = this.props.collection.id;
    for (let slate of slates) {
      if (slate.id === slateId) {
        slate.objects = slate.objects.filter((obj) => !ids.includes(obj.id));
        slate.fileCount = slate.objects.length;
        this.props.onAction({ type: "UPDATE_VIEWER", viewer: { slates } });
        break;
      }
    }

    let library = this.props.viewer.library.filter((obj) => !ids.includes(obj.id));
    this.props.onAction({ type: "UPDATE_VIEWER", viewer: { library } });

    UserBehaviors.deleteFiles(ids);
    this.setState({ checked: {}, modalShow: false });
    return;
  };

  _handleDelete = (res) => {
    if (!res) {
      this.setState({ modalShow: false });
      return;
    }
    const ids = Object.keys(this.state.checked).map((id) => {
      let index = parseInt(id);
      let item = this.props.viewer.library[index];
      return item.id;
    });

    let library = this.props.viewer.library.filter((obj) => !ids.includes(obj.id));
    this.props.onAction({ type: "UPDATE_VIEWER", viewer: { library } });

    UserBehaviors.deleteFiles(ids);
    this.setState({ checked: {}, modalShow: false });
  };

  _handleCheckBoxMouseEnter = (i) => {
    if (this.props.isOwner) {
      this.setState({ hover: i });
    }
  };

  _handleCheckBoxMouseLeave = (i) => {
    if (this.props.isOwner) {
      this.setState({ hover: null });
    }
  };

  _handleCopy = (e, value) => {
    e.stopPropagation();
    this._handleHide();
    this.setState({ copyValue: value }, () => {
      this._ref.select();
      document.execCommand("copy");
    });
  };

  _handleHide = (e) => {
    this.setState({ menu: null });
  };

  _handleClick = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  _handleUncheckAll = () => {
    this.setState({ checked: {} });
    this.lastSelectedItemIndex = null;
  };

  /** Note(Amine): These methods will stop collision between 
                   Drag to desktop event and drop to upload
  */
  _stopPropagation = (e) => e.stopPropagation();

  _disableDragAndDropUploadEvent = () => {
    document.addEventListener("dragenter", this._stopPropagation);
    document.addEventListener("drop", this._stopPropagation);
  };

  _enableDragAndDropUploadEvent = () => {
    document.removeEventListener("dragenter", this._stopPropagation);
    document.removeEventListener("drop", this._stopPropagation);
  };

  _handleDragToDesktop = (e, object) => {
    const url = Strings.getURLfromCID(object.cid);
    const title = object.filename || object.name;
    const type = object.type;
    console.log(e.dataTransfer, e.dataTransfer.setData);
    e.dataTransfer.setData("DownloadURL", `${type}:${title}:${url}`);
  };

  _handleCloseFooter = () => {
    this.setState({ checked: {} });
    this.lastSelectedItemIndex = null;
  };

  _handleRemoveFromCollection = (e, i) => {
    e.stopPropagation();
    e.preventDefault();
    let ids = [];
    if (i !== undefined) {
      ids = [this.state.items[i].id];
    } else {
      for (let index of Object.keys(this.state.checked)) {
        ids.push(this.state.items[index].id);
      }
      this.setState({ checked: {} });
    }

    let { slates } = this.props.viewer;
    let slateId = this.props.collection.id;
    for (let slate of slates) {
      if (slate.id === slateId) {
        slate.objects = slate.objects.filter((obj) => !ids.includes(obj.id));
        slate.fileCount = slate.objects.length;
        this.props.onAction({ type: "UPDATE_VIEWER", viewer: { slates } });
        break;
      }
    }

    UserBehaviors.removeFromSlate({ slate: this.props.collection, ids });
  };

  _handleSaveCopy = async (e, i) => {
    if (!this.props.viewer) {
      Events.dispatchCustomEvent({ name: "slate-global-open-cta", detail: {} });
      return;
    }
    e.stopPropagation();
    e.preventDefault();
    let items = [];
    if (i !== undefined) {
      items = [this.state.items[i]];
    } else {
      this.setState({ checked: {} });
      for (let i of Object.keys(this.state.checked)) {
        items.push(this.state.items[i]);
      }
    }
    UserBehaviors.saveCopy({ files: items });
  };

  // getCommonTagFromSelectedItems = () => {
  //   const { items } = this.props;
  //   const { checked } = this.state;

  //   if (!Object.keys(checked).length) {
  //     return;
  //   }

  //   let allTagsFromSelectedItems = Object.keys(checked).map((index) =>
  //     items[index].data.tags ? items[index].data.tags : []
  //   );

  //   let sortedItems = allTagsFromSelectedItems.sort((a, b) => a.length - b.length);
  //   if (sortedItems.length === 0) {
  //     return [];
  //   }

  //   let commonTags = sortedItems.shift().reduce((acc, cur) => {
  //     if (acc.indexOf(cur) === -1 && sortedItems.every((item) => item.indexOf(cur) !== -1)) {
  //       acc.push(cur);
  //     }

  //     return acc;
  //   }, []);

  //   return commonTags;
  // };

  render() {
    let numChecked = Object.keys(this.state.checked).length || 0;
    // const header = (
    //   <div css={STYLES_HEADER_LINE}>
    //     <span css={STYLES_MOBILE_HIDDEN}>
    //       <div
    //         css={STYLES_ICON_BOX}
    //         onClick={() => {
    //           this.setState({ view: "grid", menu: null });
    //         }}
    //       >
    //         <SVG.GridView
    //           style={{
    //             color: this.props.view === 0 ? Constants.system.black : "rgba(0,0,0,0.25)",
    //           }}
    //           height="24px"
    //         />
    //       </div>
    //     </span>
    //     <span css={STYLES_MOBILE_HIDDEN}>
    //       <div
    //         css={STYLES_ICON_BOX}
    //         onClick={() => {
    //           this.setState({ view: "list", menu: null });
    //         }}
    //       >
    //         <SVG.TableView
    //           style={{
    //             color: this.state.view === "list" ? Constants.system.black : "rgba(0,0,0,0.25)",
    //           }}
    //           height="24px"
    //         />
    //       </div>
    //     </span>
    //   </div>
    // );

    // const handleEditTags = () => {
    //   this.props.onAction({
    //     type: "SIDEBAR",
    //     value: "SIDEBAR_EDIT_TAGS",
    //     data: {
    //       numChecked,
    //       commonTags: this.getCommonTagFromSelectedItems(),
    //       objects: this.props.items,
    //       checked: this.state.checked,
    //     },
    //   });
    // };

    const footer = (
      <React.Fragment>
        {numChecked ? (
          <>
            <Footer
              type={this.props.type}
              totalSelectedFiles={numChecked}
              getSelectedFiles={this._gerSelectedFiles}
              viewer={this.props.viewer}
              isOwner={this.props.isOwner}
              downloadFiles={this._handleDownloadFiles}
              deleteFiles={() => this.setState({ modalShow: true })}
              close={this._handleCloseFooter}
              //NOTE(amine): Myslate actions
              // editTags={handleEditTags}
              //NOTE(amine): Collection actions
              removeFromCollection={this._handleRemoveFromCollection}
              saveCopy={this._handleSaveCopy}
            />
            {this.state.modalShow && (
              <ConfirmationModal
                type={"DELETE"}
                withValidation={false}
                callback={
                  this.props.collection ? this._handleDeleteFilesFromCollection : this._handleDelete
                }
                header={`Are you sure you want to delete the selected files?`}
                subHeader={`These files will be deleted from all connected collections and your file library. You can’t undo this action.`}
              />
            )}
          </>
        ) : null}
      </React.Fragment>
    );
    if (this.props.view === "grid") {
      return (
        <React.Fragment>
          <GroupSelectable onSelection={this._handleDragAndSelect}>
            <div css={Styles.OBJECTS_PREVIEW_GRID} ref={this.gridWrapperEl}>
              {this.props.items.slice(0, this.state.viewLimit).map((each, i) => {
                return (
                  <Link
                    key={each.id}
                    redirect
                    params={{ ...this.props.page?.params, id: each.id }}
                    onAction={this.props.onAction}
                  >
                    <Selectable
                      key={each.id}
                      draggable={!numChecked}
                      onDragStart={(e) => {
                        this._disableDragAndDropUploadEvent();
                        this._handleDragToDesktop(e, each);
                      }}
                      onDragEnd={this._enableDragAndDropUploadEvent}
                      selectableKey={i}
                      onMouseEnter={() => this._handleCheckBoxMouseEnter(i)}
                      onMouseLeave={() => this._handleCheckBoxMouseLeave(i)}
                    >
                      <div style={{ position: "relative" }}>
                        <ObjectPreview
                          viewer={this.props.viewer}
                          file={each}
                          onAction={this.props.onAction}
                          isOwner={this.props.isOwner}
                          isSelected={i in this.state.checked}
                          isMobile={this.props.isMobile}
                        />
                        <span css={STYLES_MOBILE_HIDDEN} style={{ pointerEvents: "auto" }}>
                          {numChecked || this.state.hover === i || this.state.menu === each.id ? (
                            <React.Fragment>
                              <div
                                style={{ position: "absolute", zIndex: 1, left: 16, top: 16 }}
                                onClick={(e) => this._handleCheckBox(e, i)}
                              >
                                <CheckBox
                                  name={i}
                                  value={!!this.state.checked[i]}
                                  boxStyle={{
                                    height: 24,
                                    width: 24,
                                    borderRadius: "8px",
                                    backgroundColor: this.state.checked[i]
                                      ? Constants.system.blue
                                      : "rgba(255, 255, 255, 0.75)",
                                  }}
                                />
                              </div>
                            </React.Fragment>
                          ) : null}
                        </span>
                      </div>
                    </Selectable>
                  </Link>
                );
              })}
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  css={STYLES_IMAGE_BOX}
                  style={{ boxShadow: "none", cursor: "default" }}
                />
              ))}
            </div>
          </GroupSelectable>
          {footer}
          <input
            ref={(c) => {
              this._ref = c;
            }}
            readOnly
            value={this.state.copyValue}
            css={STYLES_COPY_INPUT}
          />
        </React.Fragment>
      );
    }

    const columns = [
      {
        key: "checkbox",
        name: numChecked ? (
          <div
            css={STYLES_CANCEL_BOX}
            onClick={() => {
              this.setState({ checked: {} });
              this.lastSelectedItemIndex = null;
            }}
          >
            <SVG.Minus height="16px" style={{ color: Constants.system.white }} />
          </div>
        ) : (
          <span />
        ),
        width: "24px",
      },
      {
        key: "name",
        name: <div style={{ fontSize: "0.9rem", padding: "18px 0" }}>Name</div>,
        width: "100%",
      },
      // {
      //   key: "tags",
      //   name: <div style={{ fontSize: "0.9rem", padding: "18px 0" }}>Tags</div>,
      //   width: "360px",
      // },
      {
        key: "size",
        name: <div style={{ fontSize: "0.9rem", padding: "18px 0" }}>Size</div>,
        width: "104px",
      },
      {
        key: "more",
        name: <span />,
        width: "48px",
      },
    ];

    const rows = this.props.items.slice(0, this.state.viewLimit).map((each, index) => {
      const cid = each.cid;

      return {
        ...each,
        checkbox: (
          <div onClick={(e) => this._handleCheckBox(e, index)}>
            <CheckBox
              name={index}
              value={!!this.state.checked[index]}
              boxStyle={{ height: 16, width: 16 }}
              style={{
                position: "relative",
                right: 3,
                margin: "12px 0",
                opacity: numChecked > 0 || this.state.hover === index ? "100%" : "0%",
              }}
            />
          </div>
        ),
        name: (
          <Selectable
            key={each.id}
            selectableKey={index}
            draggable={!numChecked}
            onDragStart={(e) => {
              this._disableDragAndDropUploadEvent();
              this._handleDragToDesktop(e, each);
            }}
            onDragEnd={this._enableDragAndDropUploadEvent}
          >
            <FilePreviewBubble cid={cid} type={each.type}>
              <Link
                redirect
                params={{ ...this.props.page.params, id: each.id }}
                onAction={this.props.onAction}
              >
                <div css={STYLES_CONTAINER_HOVER}>
                  <div css={STYLES_ICON_BOX_HOVER} style={{ paddingLeft: 0, paddingRight: 18 }}>
                    <FileTypeIcon file={each} height="24px" />
                  </div>
                  <div css={STYLES_LINK}>{each.name || each.filename}</div>
                </div>
              </Link>
            </FilePreviewBubble>
          </Selectable>
        ),
        // tags: <>{each.data.tags?.length ? <Tags tags={each.data.tags} /> : null}</>,
        size: <div css={STYLES_VALUE}>{Strings.bytesToSize(each.size)}</div>,
        more: this.props.isOwner ? (
          <div
            css={STYLES_ICON_BOX_HOVER}
            onClick={() =>
              this.setState({
                menu: this.state.menu === each.id ? null : each.id,
              })
            }
          >
            <SVG.MoreHorizontal height="24px" />
            {this.state.menu === each.id ? (
              <Boundary
                captureResize={true}
                captureScroll={false}
                enabled
                onOutsideRectEvent={this._handleHide}
              >
                <PopoverNavigation
                  style={{
                    top: "48px",
                    right: "40px",
                  }}
                  navigation={[
                    [
                      {
                        text: "Copy CID",
                        onClick: (e) => this._handleCopy(e, cid),
                      },
                      // {
                      //   text: "Copy link",
                      //   onClick: (e) => this._handleCopy(e, Strings.getURLfromCID(cid)),
                      // },
                      {
                        text: "Delete",
                        onClick: (e) => {
                          e.stopPropagation();
                          this.setState({ menu: null, modalShow: true });
                        },
                      },
                    ],
                  ]}
                />
              </Boundary>
            ) : null}
          </div>
        ) : null,
      };
    });

    const data = {
      columns,
      rows,
    };

    return (
      <React.Fragment>
        <GroupSelectable enabled={true} onSelection={this._handleDragAndSelect}>
          {({ isSelecting }) => (
            <Table
              data={data}
              rowStyle={{
                padding: "10px 16px",
                textAlign: "left",
                backgroundColor: Constants.system.white,
              }}
              topRowStyle={{
                padding: "0px 16px",
                textAlign: "left",
                backgroundColor: Constants.system.white,
              }}
              onMouseEnter={(i) => {
                if (isSelecting) return;
                this._handleCheckBoxMouseEnter(i);
              }}
              onMouseLeave={() => {
                if (isSelecting) return;
                this._handleCheckBoxMouseEnter();
              }}
              isShiftDown={this.isShiftDown}
            />
          )}
        </GroupSelectable>
        {footer}
        <input
          ref={(c) => {
            this._ref = c;
          }}
          readOnly
          value={this.state.copyValue}
          css={STYLES_COPY_INPUT}
        />
      </React.Fragment>
    );
  }
}
