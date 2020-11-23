import * as React from "react";

//NOTE(martina): This component behaves unusually sometimes when there is a click on an SVG. It will count it as an out of rectangle event. Solve this issue with adding { pointerEvents: "none" } to the SVG
export class Boundary extends React.PureComponent {
  static defaultProps = {
    className: undefined,
    captureResize: false,
    captureScroll: false,
    children: null,
    enabled: false,
    isDataMenuCaptured: false,
    onOutsideRectEvent: () => {},
  };

  _root = undefined;

  componentDidMount() {
    if (!this.props.enabled) {
      return;
    }
    this._addListeners();
  }

  componentWillUnmount() {
    this._removeListeners();
  }

  componentDidUpdate(prevProps) {
    if (this.props.enabled != prevProps.enabled) {
      if (this.props.enabled) {
        this._addListeners();
        return;
      }
      this._removeListeners();
    }
  }

  _addListeners = () => {
    this._removeListeners();

    // NOTE(jim): Ensures the execution of these methods since setTimeout clears the call stack and fires this.
    window.setTimeout(() => {
      if (this.props.onOutsideRectEvent) {
        if (this.props.onMouseDown) {
          window.addEventListener("mousedown", this._handleOutsideClick);
        } else {
          window.addEventListener("click", this._handleOutsideClick);
        }
      }
      if (this.props.captureResize) {
        window.addEventListener("resize", this._handleWindowResize);
      }
      if (this.props.captureScroll) {
        window.addEventListener("scroll", this._handleWindowScroll);
      }
    });
  };

  _handleOutsideClick = (e) => {
    // NOTE(jim): anything with `data-menu` is also ignored...
    if (!e.target) {
      return;
    }

    if (
      this.props.isDataMenuCaptured &&
      typeof e.target.hasAttribute === "function" &&
      e.target.hasAttribute("data-menu")
    ) {
      return;
    }

    if (
      this.props.isDataMenuCaptured &&
      e.target.parentNode &&
      typeof e.target.parentNode.hasAttribute === "function" &&
      e.target.parentNode.hasAttribute("data-menu")
    ) {
      return;
    }

    if (this._root && !this._root.contains(e.target)) {
      this._handleOutsideRectEvent(e);
    }
  };

  _handleWindowResize = (e) => this._handleOutsideRectEvent(e);
  _handleWindowScroll = (e) => this._handleOutsideRectEvent(e);

  _removeListeners = () => {
    if (this.props.onMouseDown) {
      window.removeEventListener("mousedown", this._handleOutsideClick);
    } else {
      window.removeEventListener("click", this._handleOutsideClick);
    }
    window.removeEventListener("resize", this._handleWindowResize);
    window.removeEventListener("scroll", this._handleWindowScroll);
  };

  _handleOutsideRectEvent = (e) => {
    // console.log("outside rect event");
    this.props.onOutsideRectEvent(e);
  };

  render() {
    return (
      <div
        className={this.props.className}
        ref={(c) => {
          this._root = c;
        }}
        style={this.props.style}
      >
        {this.props.children}
      </div>
    );
  }
}
