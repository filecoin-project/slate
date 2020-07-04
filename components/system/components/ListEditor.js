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

const INPUT = css`
  display: inline-block;
  width: calc(100% - 80px);
`;

const BUTTON = css`
  display: inline-block;
  text-align: right;
`;

const STYLES_DELETE = css`
  height: 18px;
  margin-top: 1px;
  cursor: pointer;
  color: ${Constants.system.darkGray};
  justify-self: end;

  :hover {
    color: ${Constants.system.brand};
  }
`;

const STYLES_REORDER = css`
  height: 14px;
  margin-top: 1px;
  cursor: grab;
  color: ${Constants.system.darkGray};
  justify-self: start;

  :hover {
    color: ${Constants.system.brand};
  }
`;

const STYLES_LIST = css`
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
  font-size: 14px;
  height: 30px;
  display: grid;
  align-items: center;
  grid-template-columns: 2fr 30fr 1fr;
  border-radius: 4px;
  padding: 0 5px;
  background-color: ${Constants.system.white};
  border: 1px solid ${Constants.system.gray};
  transition: 200ms ease all;
`;

export class ListEditor extends React.Component {
  state = {
    expand: false,
    selected: this.props.selected,
    reordering: null,
    deltaY: 0,
    search: "",
  };

  _handleDelete = (i) => {
    let selected = this.state.selected;
    selected.splice(i, 1);
    this.setState({ selected });
  };

  _handleAdd = () => {
    if (this.state.search.length) {
      let selected = this.state.selected;
      selected.splice(0, 0, this.state.search);
      this.setState({ selected, search: "" });
    }
  };

  _handleDrag = (e, ui) => {
    this.setState({
      deltaY: this.state.deltaY + ui.deltaY,
    });
  };

  _handleStop = () => {
    let selected = this.state.selected;
    let index = this.state.reordering;
    let newIndex = index + this.state.deltaY / ITEM_HEIGHT;
    let item = selected.splice(index, 1)[0];
    selected.splice(newIndex, 0, item);
    this.setState({ reordering: null, selected, deltaY: 0 });
  };

  _handleChange = (e) => {
    this.setState({ search: e.target.value });
  };

  render() {
    if (!this.state.expand) {
      return (
        <div>
          <div
            css={INPUT}
            onFocus={() => {
              this.setState({ expand: true });
            }}
          >
            <Input
              name={this.props.name}
              value={this.state.selected}
              readOnly
              tooltip={this.props.tooltip}
              label={this.props.label}
              description={this.props.description}
            />
          </div>
          <ButtonPrimary
            css={BUTTON}
            onClick={() => {
              this.setState({ expand: true });
            }}
          >
            Edit
          </ButtonPrimary>
        </div>
      );
    }
    let selected = this.state.selected.map((item, i) => (
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
          bottom: (this.state.selected.length - i - 1) * ITEM_HEIGHT,
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
          <SVG.X css={STYLES_DELETE} onClick={() => this._handleDelete(i)} />
        </div>
      </Draggable>
    ));
    return (
      <div>
        <div css={INPUT}>
          <Input
            value={this.state.search}
            search
            tooltip={this.props.tooltip}
            label={this.props.label}
            placeholder={this.props.placeholder}
            description={this.props.description}
            onChange={this._handleChange}
            onSubmit={this._handleAdd}
          />
        </div>
        <ButtonPrimary
          css={BUTTON}
          onClick={() => {
            this.setState({ expand: false });
          }}
        >
          Save
        </ButtonPrimary>
        <div css={STYLES_LIST}>{selected}</div>
      </div>
    );
  }
}
