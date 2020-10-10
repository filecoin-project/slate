const { Transform } = require("stream");

/**
 * Transform stream with throttle functionality
 *
 * @class
 * @extends Transform
 * @param {Object} options - Configuration options
 * @param {Integer} options.bytes - Number of bytes to send in one chunk
 * @param {Integer} options.interval - Interval for sending chunks, in miliseconds
 */
export default class Throttle extends Transform {
  constructor(options) {
    super();
    Object.assign(this, options);
    this.previousPassTime = Date.now();
    this.queue = [];
    this.intervalId = this.setPushInterval();
  }

  _transform(chunks, _, cb) {
    for (const chunk of chunks) {
      this.queue.push(chunk);
    }
    this.isQueueFull() ? setTimeout(cb, this.interval) : cb();
  }

  _flush(cb) {
    clearInterval(this.intervalId);
    this.intervalId = this.setPushInterval(cb);
  }

  setPushInterval(cb = null) {
    return setInterval(() => {
      const elapsedTime = Date.now() - this.previousPassTime;
      if (elapsedTime < this.interval) return;

      if (this.queue.length > 0) {
        this.push(this.getChunk());
        return (this.previousPassTime += elapsedTime);
      }

      clearInterval(this.intervalId);
      return cb && cb();
    }, this.interval / 10);
  }

  getChunk() {
    return Buffer.from(this.queue.splice(0, this.bytes));
  }

  isQueueFull() {
    return this.queue.length >= 2 * this.bytes;
  }
}
