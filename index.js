var Stream = require('stream');

module.exports = function(opts) {
  if (typeof opts == 'number') opts = { ms: opts };
  return wait(opts);
};

/**
 * Creates a through stream that buffers data for at least opts.ms
 *
 * @param   {opts}
 * @returns {Stream}
 */
function wait(opts) {
  var s = new Stream;
  s.readable = s.writable = true;
  
  var timeOut;
  var buffer = {};

  s.write = function(data) {
    buffer = merge(buffer, data);
    clearTimeout(timeOut);

    if (!opts.equal && mul(data)) return s.emit('data', buffer);

    timeOut = setTimeout(function() {
      s.emit('data', buffer);
    }, opts.ms);
  }
  return s;
}

/**
 * Merges object b into a
 *
 * @param   {object} a Destination
 * @param   {object} b Source
 * @returns {object}   Merged
 */
function merge(a, b){
  var has = Object.prototype.hasOwnProperty;
  for (var key in b) {
    if (has.call(b, key)) a[key] = b[key];
  }
  return a;
}

/**
 * Checks if `obj` has more than one key
 *
 * @param   {object}
 * @returns {boolean}
 */
function mul(obj) {
  if (Object.prototype.toString.call(obj) != '[object Object]') return false;
  var len = 0;
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) len++;
    if (len > 1) return true;
  }
  return false;
}
