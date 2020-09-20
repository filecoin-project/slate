import * as React from "react";
import * as Constants from "~/common/constants";
import * as SVG from "~/common/svg";

import { css } from "@emotion/react";
import { LoaderSpinner } from "~/components/system/components/Loaders";

const STYLES_DROPDOWN_CONTAINER = css`
  box-sizing: border-box;
  z-index: ${Constants.zindex.modal};
  height: 100%;
`;

const STYLES_DROPDOWN = css`
  box-sizing: border-box;
  position: absolute;
  display: flex;
  flex-direction: column;
  background-color: ${Constants.system.white};
  overflow: hidden;
  width: 100%;
  scrollbar-width: none;
  padding-bottom: 24px;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const STYLES_DROPDOWN_ITEM = css`
  box-sizing: border-box;
  padding: 8px;
  font-size: 0.8em;
  border-radius: 4px;
  border: 1px solid transparent;
  cursor: pointer;
  margin-bottom: -1px;

  :hover {
    border-color: ${Constants.system.border} !important;
  }
`;

const STYLES_INPUT = css`
  font-family: ${Constants.font.text};
  -webkit-appearance: none;
  width: 100%;
  height: 40px;
  background: ${Constants.system.foreground};
  color: ${Constants.system.black};
  display: flex;
  font-size: 14px;
  align-items: center;
  justify-content: flex-start;
  outline: 0;
  border: 0;
  box-sizing: border-box;
  transition: 200ms ease all;
  padding: 0 24px 0 48px;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-radius: 4px;
  margin-bottom: 16px;
  ::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: ${Constants.system.black};
    opacity: 1; /* Firefox */
  }
  :-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: ${Constants.system.black};
  }
  ::-ms-input-placeholder {
    /* Microsoft Edge */
    color: ${Constants.system.black};
  }
`;

const STYLES_LOADER = css`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export class SearchDropdown extends React.Component {
  _input;
  _optionRoot;

  static defaultProps = {
    defaultResults: [],
  };

  state = {
    selectedIndex: -1,
  };

  componentDidMount = () => {
    window.addEventListener("keydown", this._handleDocumentKeydown);
  };

  componentWillUnmount = () => {
    window.removeEventListener("keydown", this._handleDocumentKeydown);
  };

  componentDidUpdate = (prevProps) => {
    if (prevProps.disabled && !this.props.disabled) {
      this._input.focus();
    }
  };

  _handleChange = (e) => {
    if (this.state.selectedIndex !== -1) {
      this.setState({ selectedIndex: -1 });
    }
    this.props.onChange(e);
  };

  _handleSelect = (index) => {
    this.props.onSelect(this.props.results[index].value);
  };

  _handleDocumentKeydown = (e) => {
    if (e.keyCode === 27) {
      this._handleDelete();
      e.preventDefault();
    } else if (e.keyCode === 9) {
      this._handleDelete();
    } else if (e.keyCode === 40) {
      if (this.state.selectedIndex < this.props.results.length - 1) {
        let listElem = this._optionRoot.children[this.state.selectedIndex + 1];
        let elemRect = listElem.getBoundingClientRect();
        let rootRect = this._optionRoot.getBoundingClientRect();
        if (elemRect.bottom > rootRect.bottom) {
          this._optionRoot.scrollTop =
            listElem.offsetTop +
            listElem.offsetHeight -
            this._optionRoot.offsetHeight;
        }
        this.setState({ selectedIndex: this.state.selectedIndex + 1 });
      }
      e.preventDefault();
    } else if (e.keyCode === 38) {
      if (this.state.selectedIndex > 0) {
        let listElem = this._optionRoot.children[this.state.selectedIndex - 1];
        let elemRect = listElem.getBoundingClientRect();
        let rootRect = this._optionRoot.getBoundingClientRect();
        if (elemRect.top < rootRect.top) {
          this._optionRoot.scrollTop = listElem.offsetTop;
        }
        this.setState({ selectedIndex: this.state.selectedIndex - 1 });
      }
      e.preventDefault();
    } else if (e.keyCode === 13) {
      if (
        this.props.results.length > this.state.selectedIndex &&
        this.state.selectedIndex !== -1
      ) {
        this._handleSelect(this.state.selectedIndex);
      }
      e.preventDefault();
    }
  };

  render() {
    return (
      <div css={STYLES_DROPDOWN_CONTAINER} style={this.props.containerStyle}>
        {this.props.disabled ? (
          <div css={STYLES_LOADER}>
            <LoaderSpinner />
          </div>
        ) : (
          <React.Fragment>
            <div style={{ position: "relative" }}>
              <input
                disabled={this.props.disabled}
                css={STYLES_INPUT}
                value={this.props.inputValue}
                placeholder={this.props.placeholder}
                style={this.props.inputStyle}
                onChange={this._handleChange}
                ref={(c) => {
                  this._input = c;
                }}
              />
              <SVG.Search
                height="20px"
                style={{ position: "absolute", left: "12px", top: "10px" }}
              />
            </div>

            <div
              data-menu
              ref={(c) => {
                this._optionRoot = c;
              }}
              css={STYLES_DROPDOWN}
              style={this.props.style}
            >
              {this.props.results.map((each, i) => (
                <div
                  key={each.value.data.id}
                  css={STYLES_DROPDOWN_ITEM}
                  style={{
                    borderColor:
                      this.state.selectedIndex === i
                        ? Constants.system.border
                        : "transparent",
                    ...this.props.itemStyle,
                  }}
                  onClick={() => this.props.onSelect(each.value)}
                >
                  {each.component}
                </div>
              ))}
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}
