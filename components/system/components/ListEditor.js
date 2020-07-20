import * as React from "react";
import * as Constants from "~/common/constants";
import * as SVG from "~/components/system/svg";

import { css, keyframes } from "@emotion/react";
import Draggable from "react-draggable";

import { Input } from "~/components/system/components/Input";
import { ButtonPrimary } from "~/components/system/components/Buttons";

const ITEM_HEIGHT = 30;

const expand = keyframes`
  0% {
    max-height: 0px;
    overflow: scroll;
  }
  100% {
    max-height: 400px;
    overflow: scroll;
  }
`;

const STYLES_INPUT = css`
  box-sizing: border-box;
  display: inline-block;
  width: calc(100% - 80px);
`;

const STYLES_INPUT_HIDDEN = css`
  box-sizing: border-box;
  visibility: hidden;
  opacity: 0;
  pointer-events: none;
  position: absolute;
  height: 0;
`;

const STYLES_MODAL_BACKGROUND = css`
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
`;

const STYLES_BUTTON = css`
  box-sizing: border-box;
  display: inline-block;
  text-align: right;
`;

const STYLES_DELETE = css`
  box-sizing: border-box;
  height: 18px;
  cursor: pointer;
  color: ${Constants.system.darkGray};
  justify-self: end;

  :hover {
    color: ${Constants.system.brand};
  }
`;

const STYLES_REORDER = css`
  box-sizing: border-box;
  height: 14px;
  margin-top: 4px;
  cursor: grab;
  color: ${Constants.system.darkGray};
  justify-self: start;

  :hover {
    color: ${Constants.system.brand};
  }
`;

const STYLES_LIST = css`
  box-sizing: border-box;
  max-width: 480px;
  min-width: 188px;
  width: 100%;
  max-height: 400px;
  overflow-y: scroll;
  background-color: ${Constants.system.white};
  border: 1px solid ${Constants.system.darkGray};
  padding: 4px;
  border-radius: 4px;
  animation: ${expand} 500ms ease-out 1;
  position: absolute;
`;

const STYLES_LIST_ITEM = css`
  box-sizing: border-box;
  font-size: 14px;
  height: 30px;
  display: grid;
  align-items: center;
  grid-template-columns: 2fr 30fr 1fr;
  border-radius: 4px;
  padding: 0 5px;
  background-color: ${Constants.system.white};
  border: 1px solid ${Constants.system.gray};
`;

export class ListEditor extends React.Component {
  state = {
    expand: false,
    options: this.props.options,
    reordering: null,
    deltaY: 0,
    search: "",
  };

  _handleToggle = () => {
    if (this.state.expand) {
      this.props.onChange({ name: this.props.name, value: this.state.options });
    }
    this.setState({ expand: !this.state.expand });
  };

  _handleDelete = (i) => {
    let options = this.state.options;
    options.splice(i, 1);
    this.setState({ options });
  };

  _handleAdd = () => {
    if (this.state.search.length) {
      let options = this.state.options;
      options.splice(0, 0, this.state.search);
      this.setState({ options, search: "" });
    }
  };

  _handleDrag = (e, ui) => {
    this.setState({
      deltaY: this.state.deltaY + ui.deltaY,
    });
  };

  _handleStop = () => {
    let options = this.state.options;
    let index = this.state.reordering;
    let newIndex = index + this.state.deltaY / ITEM_HEIGHT;
    let item = options.splice(index, 1)[0];
    options.splice(newIndex, 0, item);
    this.setState({ reordering: null, options, deltaY: 0 });
  };

  _handleChange = (e) => {
    this.setState({ search: e.target.value });
  };

  render() {
    let options = this.state.options.map((item, i) => (
      <Draggable
        axis="y"
        grid={[ITEM_HEIGHT, ITEM_HEIGHT]}
        position={{
          x: 0,
          y:
            this.state.reordering === null
              ? 0
              : this.state.reordering > i &&
                this.state.reordering + this.state.deltaY / ITEM_HEIGHT <= i
              ? ITEM_HEIGHT
              : this.state.reordering < i &&
                this.state.reordering + this.state.deltaY / ITEM_HEIGHT >= i
              ? -ITEM_HEIGHT
              : 0,
        }}
        bounds={{
          top: -i * ITEM_HEIGHT,
          left: 0,
          right: 0,
          bottom: (this.state.options.length - i - 1) * ITEM_HEIGHT,
        }}
        onStart={() => this.setState({ reordering: i })}
        onDrag={this._handleDrag}
        onStop={this._handleStop}
        key={item}
      >
        <div
          className="no-cursor"
          css={STYLES_LIST_ITEM}
          style={{
            backgroundColor:
              this.state.reordering === i
                ? Constants.system.gray
                : Constants.system.white,
          }}
        >
          <SVG.Reorder className="cursor" css={STYLES_REORDER} />
          <div>{item}</div>
          <SVG.Close
            css={STYLES_DELETE}
            onClick={() => this._handleDelete(i)}
          />
        </div>
      </Draggable>
    ));
    return (
      <div>
        <div
          css={this.state.expand ? STYLES_INPUT_HIDDEN : STYLES_INPUT}
          onFocus={this._handleToggle}
        >
          <Input
            name={this.props.name}
            style={{ cursor: "pointer" }}
            value={this.state.options}
            readOnly
            tooltip={this.props.tooltip}
            label={this.props.label}
            description={this.props.description}
          />
        </div>
        {this.state.expand ? (
          <div css={STYLES_MODAL_BACKGROUND} onClick={this._handleToggle} />
        ) : null}
        <div css={this.state.expand ? STYLES_INPUT : STYLES_INPUT_HIDDEN}>
          <Input
            value={this.state.search}
            tooltip={this.props.tooltip}
            label={this.props.label}
            placeholder={this.props.placeholder}
            description={this.props.description}
            icon={SVG.Search}
            onChange={this._handleChange}
            onSubmit={this._handleAdd}
          />
        </div>
        <ButtonPrimary css={STYLES_BUTTON} onClick={this._handleToggle}>
          {this.state.expand ? "Save" : "Edit"}
        </ButtonPrimary>
        {this.state.expand ? <div css={STYLES_LIST}>{options}</div> : null}
      </div>
    );
  }
}
