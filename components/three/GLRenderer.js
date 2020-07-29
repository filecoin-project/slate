import * as THREE from "three";
import * as React from "react";

import GLComponent from "~/common/three/gl-component";
import AnimationLoop from "~/common/three/animation-loop";

export default class GLRenderer extends React.Component {
  _GLComponent = undefined;
  _AnimationLoop = undefined;

  async componentDidMount() {
    this._GLComponent = new GLComponent({
      width: this.props.width,
      height: this.props.height,
      container: this.refs.canvas,
      countries: this.props.countries,
    });

    this._AnimationLoop = new AnimationLoop();

    await this._GLComponent.mount();
    this._GLComponent.firstRender();
    this._AnimationLoop.subscribe(() => {
      this._GLComponent.render();
    });
    this._AnimationLoop.start();
  }

  componentWillUnmount() {
    this.reset();
  }

  pause() {
    this._AnimationLoop.stop();
  }

  resume() {
    if (!this._GLComponent) {
      return null;
    }

    this._AnimationLoop.start();
  }

  reset() {
    this._AnimationLoop.stop();
    this._AnimationLoop.unsubscribeAll();
    this._AnimationLoop = null;
    this._GLComponent.unmount();
    this._GLComponent = null;
  }

  render() {
    return <div ref="canvas" />;
  }
}
