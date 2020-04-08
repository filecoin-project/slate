const FRAMES_PER_SECOND = 60;
const SECOND = 1000;

export default class AnimationLoop {
  _subscribers = [];
  _loopId = null;
  _timeNow = null;
  _timeThen = null;

  loop = () => {
    this._timeNow = Date.now();
    const timeDelta = this._timeNow - this._timeThen;

    if (timeDelta > SECOND / FRAMES_PER_SECOND) {
      this._timeThen =
        this._timeNow - (timeDelta % (SECOND / FRAMES_PER_SECOND));

      this._subscribers.forEach(callback => {
        callback.call();
      });
    }

    this._loopID = window.requestAnimationFrame(this.loop);
  };

  start() {
    this._timeThen = Date.now();
    if (!this._loopID) {
      this.loop();
    }
  }

  stop() {
    this._timeThen = null;
    this._timeNow = null;
    window.cancelAnimationFrame(this._loopId);
  }

  subscribe(callback) {
    return this._subscribers.push(callback);
  }

  unsubscribeAll() {
    this._subscribers = [];
  }
}
