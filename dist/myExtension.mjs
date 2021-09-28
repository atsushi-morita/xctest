var global$1 = typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {};

// based off https://github.com/defunctzombie/node-process/blob/master/browser.js

function defaultSetTimout() {
  throw new Error('setTimeout has not been defined');
}

function defaultClearTimeout() {
  throw new Error('clearTimeout has not been defined');
}

var cachedSetTimeout = defaultSetTimout;
var cachedClearTimeout = defaultClearTimeout;

if (typeof global$1.setTimeout === 'function') {
  cachedSetTimeout = setTimeout;
}

if (typeof global$1.clearTimeout === 'function') {
  cachedClearTimeout = clearTimeout;
}

function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    //normal enviroments in sane situations
    return setTimeout(fun, 0);
  } // if setTimeout wasn't available but was latter defined


  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}

function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    //normal enviroments in sane situations
    return clearTimeout(marker);
  } // if clearTimeout wasn't available but was latter defined


  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
      return cachedClearTimeout.call(null, marker);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
      // Some versions of I.E. have different rules for clearTimeout vs setTimeout
      return cachedClearTimeout.call(this, marker);
    }
  }
}

var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }

  draining = false;

  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }

  if (queue.length) {
    drainQueue();
  }
}

function drainQueue() {
  if (draining) {
    return;
  }

  var timeout = runTimeout(cleanUpNextTick);
  draining = true;
  var len = queue.length;

  while (len) {
    currentQueue = queue;
    queue = [];

    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }

    queueIndex = -1;
    len = queue.length;
  }

  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}

function nextTick(fun) {
  var args = new Array(arguments.length - 1);

  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }

  queue.push(new Item(fun, args));

  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
} // v8 likes predictible objects

function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}

Item.prototype.run = function () {
  this.fun.apply(null, this.array);
};

var title = 'browser';
var platform = 'browser';
var browser$1 = true;
var env = {};
var argv = [];
var version$1 = ''; // empty string to avoid regexp issues

var versions = {};
var release = {};
var config = {};

function noop() {}

var on = noop;
var addListener = noop;
var once = noop;
var off = noop;
var removeListener = noop;
var removeAllListeners = noop;
var emit = noop;
function binding(name) {
  throw new Error('process.binding is not supported');
}
function cwd() {
  return '/';
}
function chdir(dir) {
  throw new Error('process.chdir is not supported');
}
function umask() {
  return 0;
} // from https://github.com/kumavis/browser-process-hrtime/blob/master/index.js

var performance = global$1.performance || {};

var performanceNow = performance.now || performance.mozNow || performance.msNow || performance.oNow || performance.webkitNow || function () {
  return new Date().getTime();
}; // generate timestamp or delta
// see http://nodejs.org/api/process.html#process_process_hrtime


function hrtime(previousTimestamp) {
  var clocktime = performanceNow.call(performance) * 1e-3;
  var seconds = Math.floor(clocktime);
  var nanoseconds = Math.floor(clocktime % 1 * 1e9);

  if (previousTimestamp) {
    seconds = seconds - previousTimestamp[0];
    nanoseconds = nanoseconds - previousTimestamp[1];

    if (nanoseconds < 0) {
      seconds--;
      nanoseconds += 1e9;
    }
  }

  return [seconds, nanoseconds];
}
var startTime = new Date();
function uptime() {
  var currentTime = new Date();
  var dif = currentTime - startTime;
  return dif / 1000;
}
var process = {
  nextTick: nextTick,
  title: title,
  browser: browser$1,
  env: env,
  argv: argv,
  version: version$1,
  versions: versions,
  on: on,
  addListener: addListener,
  once: once,
  off: off,
  removeListener: removeListener,
  removeAllListeners: removeAllListeners,
  emit: emit,
  binding: binding,
  cwd: cwd,
  chdir: chdir,
  umask: umask,
  hrtime: hrtime,
  platform: platform,
  release: release,
  config: config,
  uptime: uptime
};

var react = {exports: {}};

function _typeof$1(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof$1 = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof$1 = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof$1(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
/* eslint-disable no-unused-vars */


var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
  if (val === null || val === undefined) {
    throw new TypeError('Object.assign cannot be called with null or undefined');
  }

  return Object(val);
}

function shouldUseNative() {
  try {
    if (!Object.assign) {
      return false;
    } // Detect buggy property enumeration order in older V8 versions.
    // https://bugs.chromium.org/p/v8/issues/detail?id=4118


    var test1 = new String('abc'); // eslint-disable-line no-new-wrappers

    test1[5] = 'de';

    if (Object.getOwnPropertyNames(test1)[0] === '5') {
      return false;
    } // https://bugs.chromium.org/p/v8/issues/detail?id=3056


    var test2 = {};

    for (var i = 0; i < 10; i++) {
      test2['_' + String.fromCharCode(i)] = i;
    }

    var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
      return test2[n];
    });

    if (order2.join('') !== '0123456789') {
      return false;
    } // https://bugs.chromium.org/p/v8/issues/detail?id=3056


    var test3 = {};
    'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
      test3[letter] = letter;
    });

    if (Object.keys(Object.assign({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
      return false;
    }

    return true;
  } catch (err) {
    // We don't expect any of the above to throw, but better to be safe.
    return false;
  }
}

var objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
  var from;
  var to = toObject(target);
  var symbols;

  for (var s = 1; s < arguments.length; s++) {
    from = Object(arguments[s]);

    for (var key in from) {
      if (hasOwnProperty.call(from, key)) {
        to[key] = from[key];
      }
    }

    if (getOwnPropertySymbols) {
      symbols = getOwnPropertySymbols(from);

      for (var i = 0; i < symbols.length; i++) {
        if (propIsEnumerable.call(from, symbols[i])) {
          to[symbols[i]] = from[symbols[i]];
        }
      }
    }
  }

  return to;
};

var emptyObject = {};

{
  Object.freeze(emptyObject);
}

var emptyObject_1 = emptyObject;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */


function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}
/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */


var emptyFunction$1 = function emptyFunction() {};

emptyFunction$1.thatReturns = makeEmptyFunction;
emptyFunction$1.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction$1.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction$1.thatReturnsNull = makeEmptyFunction(null);

emptyFunction$1.thatReturnsThis = function () {
  return this;
};

emptyFunction$1.thatReturnsArgument = function (arg) {
  return arg;
};

var emptyFunction_1 = emptyFunction$1;

var m$1 = objectAssign,
    n$1 = emptyObject_1,
    p$1 = emptyFunction_1,
    q$1 = "function" === typeof Symbol && Symbol["for"],
    r$1 = q$1 ? Symbol["for"]("react.element") : 60103,
    t$1 = q$1 ? Symbol["for"]("react.call") : 60104,
    u = q$1 ? Symbol["for"]("react.return") : 60105,
    v$1 = q$1 ? Symbol["for"]("react.portal") : 60106,
    w$1 = q$1 ? Symbol["for"]("react.fragment") : 60107,
    x$1 = "function" === typeof Symbol && Symbol.iterator;

function y$1(a) {
  for (var b = arguments.length - 1, e = "Minified React error #" + a + "; visit http://facebook.github.io/react/docs/error-decoder.html?invariant\x3d" + a, c = 0; c < b; c++) {
    e += "\x26args[]\x3d" + encodeURIComponent(arguments[c + 1]);
  }

  b = Error(e + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.");
  b.name = "Invariant Violation";
  b.framesToPop = 1;
  throw b;
}

var z$1 = {
  isMounted: function isMounted() {
    return !1;
  },
  enqueueForceUpdate: function enqueueForceUpdate() {},
  enqueueReplaceState: function enqueueReplaceState() {},
  enqueueSetState: function enqueueSetState() {}
};

function A(a, b, e) {
  this.props = a;
  this.context = b;
  this.refs = n$1;
  this.updater = e || z$1;
}

A.prototype.isReactComponent = {};

A.prototype.setState = function (a, b) {
  "object" !== _typeof$1(a) && "function" !== typeof a && null != a ? y$1("85") : void 0;
  this.updater.enqueueSetState(this, a, b, "setState");
};

A.prototype.forceUpdate = function (a) {
  this.updater.enqueueForceUpdate(this, a, "forceUpdate");
};

function B(a, b, e) {
  this.props = a;
  this.context = b;
  this.refs = n$1;
  this.updater = e || z$1;
}

function C() {}

C.prototype = A.prototype;
var D = B.prototype = new C();
D.constructor = B;
m$1(D, A.prototype);
D.isPureReactComponent = !0;

function E(a, b, e) {
  this.props = a;
  this.context = b;
  this.refs = n$1;
  this.updater = e || z$1;
}

var F = E.prototype = new C();
F.constructor = E;
m$1(F, A.prototype);
F.unstable_isAsyncReactComponent = !0;

F.render = function () {
  return this.props.children;
};

var G = {
  current: null
},
    H = Object.prototype.hasOwnProperty,
    I = {
  key: !0,
  ref: !0,
  __self: !0,
  __source: !0
};

function J(a, b, e) {
  var c,
      d = {},
      g = null,
      k = null;
  if (null != b) for (c in void 0 !== b.ref && (k = b.ref), void 0 !== b.key && (g = "" + b.key), b) {
    H.call(b, c) && !I.hasOwnProperty(c) && (d[c] = b[c]);
  }
  var f = arguments.length - 2;
  if (1 === f) d.children = e;else if (1 < f) {
    for (var h = Array(f), l = 0; l < f; l++) {
      h[l] = arguments[l + 2];
    }

    d.children = h;
  }
  if (a && a.defaultProps) for (c in f = a.defaultProps, f) {
    void 0 === d[c] && (d[c] = f[c]);
  }
  return {
    $$typeof: r$1,
    type: a,
    key: g,
    ref: k,
    props: d,
    _owner: G.current
  };
}

function K(a) {
  return "object" === _typeof$1(a) && null !== a && a.$$typeof === r$1;
}

function escape$1(a) {
  var b = {
    "\x3d": "\x3d0",
    ":": "\x3d2"
  };
  return "$" + ("" + a).replace(/[=:]/g, function (a) {
    return b[a];
  });
}

var L = /\/+/g,
    M$1 = [];

function N(a, b, e, c) {
  if (M$1.length) {
    var d = M$1.pop();
    d.result = a;
    d.keyPrefix = b;
    d.func = e;
    d.context = c;
    d.count = 0;
    return d;
  }

  return {
    result: a,
    keyPrefix: b,
    func: e,
    context: c,
    count: 0
  };
}

function O(a) {
  a.result = null;
  a.keyPrefix = null;
  a.func = null;
  a.context = null;
  a.count = 0;
  10 > M$1.length && M$1.push(a);
}

function P(a, b, e, c) {
  var d = _typeof$1(a);

  if ("undefined" === d || "boolean" === d) a = null;
  var g = !1;
  if (null === a) g = !0;else switch (d) {
    case "string":
    case "number":
      g = !0;
      break;

    case "object":
      switch (a.$$typeof) {
        case r$1:
        case t$1:
        case u:
        case v$1:
          g = !0;
      }

  }
  if (g) return e(c, a, "" === b ? "." + Q(a, 0) : b), 1;
  g = 0;
  b = "" === b ? "." : b + ":";
  if (Array.isArray(a)) for (var k = 0; k < a.length; k++) {
    d = a[k];
    var f = b + Q(d, k);
    g += P(d, f, e, c);
  } else if (null === a || "undefined" === typeof a ? f = null : (f = x$1 && a[x$1] || a["@@iterator"], f = "function" === typeof f ? f : null), "function" === typeof f) for (a = f.call(a), k = 0; !(d = a.next()).done;) {
    d = d.value, f = b + Q(d, k++), g += P(d, f, e, c);
  } else "object" === d && (e = "" + a, y$1("31", "[object Object]" === e ? "object with keys {" + Object.keys(a).join(", ") + "}" : e, ""));
  return g;
}

function Q(a, b) {
  return "object" === _typeof$1(a) && null !== a && null != a.key ? escape$1(a.key) : b.toString(36);
}

function R(a, b) {
  a.func.call(a.context, b, a.count++);
}

function S(a, b, e) {
  var c = a.result,
      d = a.keyPrefix;
  a = a.func.call(a.context, b, a.count++);
  Array.isArray(a) ? T(a, c, e, p$1.thatReturnsArgument) : null != a && (K(a) && (b = d + (!a.key || b && b.key === a.key ? "" : ("" + a.key).replace(L, "$\x26/") + "/") + e, a = {
    $$typeof: r$1,
    type: a.type,
    key: b,
    ref: a.ref,
    props: a.props,
    _owner: a._owner
  }), c.push(a));
}

function T(a, b, e, c, d) {
  var g = "";
  null != e && (g = ("" + e).replace(L, "$\x26/") + "/");
  b = N(b, g, c, d);
  null == a || P(a, "", S, b);
  O(b);
}

var U = {
  Children: {
    map: function map(a, b, e) {
      if (null == a) return a;
      var c = [];
      T(a, c, null, b, e);
      return c;
    },
    forEach: function forEach(a, b, e) {
      if (null == a) return a;
      b = N(null, null, b, e);
      null == a || P(a, "", R, b);
      O(b);
    },
    count: function count(a) {
      return null == a ? 0 : P(a, "", p$1.thatReturnsNull, null);
    },
    toArray: function toArray(a) {
      var b = [];
      T(a, b, null, p$1.thatReturnsArgument);
      return b;
    },
    only: function only(a) {
      K(a) ? void 0 : y$1("143");
      return a;
    }
  },
  Component: A,
  PureComponent: B,
  unstable_AsyncComponent: E,
  Fragment: w$1,
  createElement: J,
  cloneElement: function cloneElement(a, b, e) {
    var c = m$1({}, a.props),
        d = a.key,
        g = a.ref,
        k = a._owner;

    if (null != b) {
      void 0 !== b.ref && (g = b.ref, k = G.current);
      void 0 !== b.key && (d = "" + b.key);
      if (a.type && a.type.defaultProps) var f = a.type.defaultProps;

      for (h in b) {
        H.call(b, h) && !I.hasOwnProperty(h) && (c[h] = void 0 === b[h] && void 0 !== f ? f[h] : b[h]);
      }
    }

    var h = arguments.length - 2;
    if (1 === h) c.children = e;else if (1 < h) {
      f = Array(h);

      for (var l = 0; l < h; l++) {
        f[l] = arguments[l + 2];
      }

      c.children = f;
    }
    return {
      $$typeof: r$1,
      type: a.type,
      key: d,
      ref: g,
      props: c,
      _owner: k
    };
  },
  createFactory: function createFactory(a) {
    var b = J.bind(null, a);
    b.type = a;
    return b;
  },
  isValidElement: K,
  version: "16.2.0",
  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {
    ReactCurrentOwner: G,
    assign: m$1
  }
},
    V = Object.freeze({
  default: U
}),
    W = V && U || V;
W["default"] ? W["default"] : W;

var react_development = {exports: {}};

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */


var validateFormat = function validateFormat(format) {};

{
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant$1(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;

    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame

    throw error;
  }
}

var invariant_1 = invariant$1;

var emptyFunction = emptyFunction_1;
/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = emptyFunction;

{
  var printWarning$2 = function printWarning(format) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });

    if (typeof console !== 'undefined') {
      console.error(message);
    }

    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  warning = function warning(condition, format) {
    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }

    if (format.indexOf('Failed Composite propType: ') === 0) {
      return; // Ignore CompositeComponent proptype check.
    }

    if (!condition) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning$2.apply(undefined, [format].concat(args));
    }
  };
}

var warning_1 = warning;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var ReactPropTypesSecret$2 = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';
var ReactPropTypesSecret_1 = ReactPropTypesSecret$2;

var printWarning$1 = function printWarning() {};

{
  var ReactPropTypesSecret$1 = ReactPropTypesSecret_1;
  var loggedTypeFailures = {};
  var has$1 = Function.call.bind(Object.prototype.hasOwnProperty);

  printWarning$1 = function printWarning(text) {
    var message = 'Warning: ' + text;

    if (typeof console !== 'undefined') {
      console.error(message);
    }

    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}
/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */


function checkPropTypes$1(typeSpecs, values, location, componentName, getStack) {
  {
    for (var typeSpecName in typeSpecs) {
      if (has$1(typeSpecs, typeSpecName)) {
        var error; // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.

        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          if (typeof typeSpecs[typeSpecName] !== 'function') {
            var err = Error((componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' + 'it must be a function, usually from the `prop-types` package, but received `' + _typeof$1(typeSpecs[typeSpecName]) + '`.');
            err.name = 'Invariant Violation';
            throw err;
          }

          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret$1);
        } catch (ex) {
          error = ex;
        }

        if (error && !(error instanceof Error)) {
          printWarning$1((componentName || 'React class') + ': type specification of ' + location + ' `' + typeSpecName + '` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a ' + _typeof$1(error) + '. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).');
        }

        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;
          var stack = getStack ? getStack() : '';
          printWarning$1('Failed ' + location + ' type: ' + error.message + (stack != null ? stack : ''));
        }
      }
    }
  }
}
/**
 * Resets warning cache when testing.
 *
 * @private
 */


checkPropTypes$1.resetWarningCache = function () {
  {
    loggedTypeFailures = {};
  }
};

var checkPropTypes_1 = checkPropTypes$1;

{
  (function () {

    var _assign = objectAssign;
    var emptyObject = emptyObject_1;
    var invariant = invariant_1;
    var warning = warning_1;
    var emptyFunction = emptyFunction_1;
    var checkPropTypes = checkPropTypes_1; // TODO: this is special because it gets imported during build.

    var ReactVersion = '16.2.0'; // The Symbol used to tag the ReactElement-like types. If there is no native Symbol
    // nor polyfill, then a plain number is used for performance.

    var hasSymbol = typeof Symbol === 'function' && Symbol['for'];
    var REACT_ELEMENT_TYPE = hasSymbol ? Symbol['for']('react.element') : 0xeac7;
    var REACT_CALL_TYPE = hasSymbol ? Symbol['for']('react.call') : 0xeac8;
    var REACT_RETURN_TYPE = hasSymbol ? Symbol['for']('react.return') : 0xeac9;
    var REACT_PORTAL_TYPE = hasSymbol ? Symbol['for']('react.portal') : 0xeaca;
    var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol['for']('react.fragment') : 0xeacb;
    var MAYBE_ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
    var FAUX_ITERATOR_SYMBOL = '@@iterator';

    function getIteratorFn(maybeIterable) {
      if (maybeIterable === null || typeof maybeIterable === 'undefined') {
        return null;
      }

      var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];

      if (typeof maybeIterator === 'function') {
        return maybeIterator;
      }

      return null;
    }
    /**
     * WARNING: DO NOT manually require this module.
     * This is a replacement for `invariant(...)` used by the error code system
     * and will _only_ be required by the corresponding babel pass.
     * It always throws.
     */

    /**
     * Forked from fbjs/warning:
     * https://github.com/facebook/fbjs/blob/e66ba20ad5be433eb54423f2b097d829324d9de6/packages/fbjs/src/__forks__/warning.js
     *
     * Only change is we use console.warn instead of console.error,
     * and do nothing when 'console' is not supported.
     * This really simplifies the code.
     * ---
     * Similar to invariant but only logs a warning if the condition is not met.
     * This can be used to log issues in development environments in critical
     * paths. Removing the logging code for production environments will keep the
     * same logic and follow the same code paths.
     */


    var lowPriorityWarning = function lowPriorityWarning() {};

    {
      var printWarning = function printWarning(format) {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        var argIndex = 0;
        var message = 'Warning: ' + format.replace(/%s/g, function () {
          return args[argIndex++];
        });

        if (typeof console !== 'undefined') {
          console.warn(message);
        }

        try {
          // --- Welcome to debugging React ---
          // This error was thrown as a convenience so that you can use this stack
          // to find the callsite that caused this warning to fire.
          throw new Error(message);
        } catch (x) {}
      };

      lowPriorityWarning = function lowPriorityWarning(condition, format) {
        if (format === undefined) {
          throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
        }

        if (!condition) {
          for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
            args[_key2 - 2] = arguments[_key2];
          }

          printWarning.apply(undefined, [format].concat(args));
        }
      };
    }
    var lowPriorityWarning$1 = lowPriorityWarning;
    var didWarnStateUpdateForUnmountedComponent = {};

    function warnNoop(publicInstance, callerName) {
      {
        var constructor = publicInstance.constructor;
        var componentName = constructor && (constructor.displayName || constructor.name) || 'ReactClass';
        var warningKey = componentName + '.' + callerName;

        if (didWarnStateUpdateForUnmountedComponent[warningKey]) {
          return;
        }

        warning(false, '%s(...): Can only update a mounted or mounting component. ' + 'This usually means you called %s() on an unmounted component. ' + 'This is a no-op.\n\nPlease check the code for the %s component.', callerName, callerName, componentName);
        didWarnStateUpdateForUnmountedComponent[warningKey] = true;
      }
    }
    /**
     * This is the abstract API for an update queue.
     */


    var ReactNoopUpdateQueue = {
      /**
       * Checks whether or not this composite component is mounted.
       * @param {ReactClass} publicInstance The instance we want to test.
       * @return {boolean} True if mounted, false otherwise.
       * @protected
       * @final
       */
      isMounted: function isMounted(publicInstance) {
        return false;
      },

      /**
       * Forces an update. This should only be invoked when it is known with
       * certainty that we are **not** in a DOM transaction.
       *
       * You may want to call this when you know that some deeper aspect of the
       * component's state has changed but `setState` was not called.
       *
       * This will not invoke `shouldComponentUpdate`, but it will invoke
       * `componentWillUpdate` and `componentDidUpdate`.
       *
       * @param {ReactClass} publicInstance The instance that should rerender.
       * @param {?function} callback Called after component is updated.
       * @param {?string} callerName name of the calling function in the public API.
       * @internal
       */
      enqueueForceUpdate: function enqueueForceUpdate(publicInstance, callback, callerName) {
        warnNoop(publicInstance, 'forceUpdate');
      },

      /**
       * Replaces all of the state. Always use this or `setState` to mutate state.
       * You should treat `this.state` as immutable.
       *
       * There is no guarantee that `this.state` will be immediately updated, so
       * accessing `this.state` after calling this method may return the old value.
       *
       * @param {ReactClass} publicInstance The instance that should rerender.
       * @param {object} completeState Next state.
       * @param {?function} callback Called after component is updated.
       * @param {?string} callerName name of the calling function in the public API.
       * @internal
       */
      enqueueReplaceState: function enqueueReplaceState(publicInstance, completeState, callback, callerName) {
        warnNoop(publicInstance, 'replaceState');
      },

      /**
       * Sets a subset of the state. This only exists because _pendingState is
       * internal. This provides a merging strategy that is not available to deep
       * properties which is confusing. TODO: Expose pendingState or don't use it
       * during the merge.
       *
       * @param {ReactClass} publicInstance The instance that should rerender.
       * @param {object} partialState Next partial state to be merged with state.
       * @param {?function} callback Called after component is updated.
       * @param {?string} Name of the calling function in the public API.
       * @internal
       */
      enqueueSetState: function enqueueSetState(publicInstance, partialState, callback, callerName) {
        warnNoop(publicInstance, 'setState');
      }
    };
    /**
     * Base class helpers for the updating state of a component.
     */

    function Component(props, context, updater) {
      this.props = props;
      this.context = context;
      this.refs = emptyObject; // We initialize the default updater but the real one gets injected by the
      // renderer.

      this.updater = updater || ReactNoopUpdateQueue;
    }

    Component.prototype.isReactComponent = {};
    /**
     * Sets a subset of the state. Always use this to mutate
     * state. You should treat `this.state` as immutable.
     *
     * There is no guarantee that `this.state` will be immediately updated, so
     * accessing `this.state` after calling this method may return the old value.
     *
     * There is no guarantee that calls to `setState` will run synchronously,
     * as they may eventually be batched together.  You can provide an optional
     * callback that will be executed when the call to setState is actually
     * completed.
     *
     * When a function is provided to setState, it will be called at some point in
     * the future (not synchronously). It will be called with the up to date
     * component arguments (state, props, context). These values can be different
     * from this.* because your function may be called after receiveProps but before
     * shouldComponentUpdate, and this new state, props, and context will not yet be
     * assigned to this.
     *
     * @param {object|function} partialState Next partial state or function to
     *        produce next partial state to be merged with current state.
     * @param {?function} callback Called after state is updated.
     * @final
     * @protected
     */

    Component.prototype.setState = function (partialState, callback) {
      !(_typeof$1(partialState) === 'object' || typeof partialState === 'function' || partialState == null) ? invariant(false, 'setState(...): takes an object of state variables to update or a function which returns an object of state variables.') : void 0;
      this.updater.enqueueSetState(this, partialState, callback, 'setState');
    };
    /**
     * Forces an update. This should only be invoked when it is known with
     * certainty that we are **not** in a DOM transaction.
     *
     * You may want to call this when you know that some deeper aspect of the
     * component's state has changed but `setState` was not called.
     *
     * This will not invoke `shouldComponentUpdate`, but it will invoke
     * `componentWillUpdate` and `componentDidUpdate`.
     *
     * @param {?function} callback Called after update is complete.
     * @final
     * @protected
     */


    Component.prototype.forceUpdate = function (callback) {
      this.updater.enqueueForceUpdate(this, callback, 'forceUpdate');
    };
    /**
     * Deprecated APIs. These APIs used to exist on classic React classes but since
     * we would like to deprecate them, we're not going to move them over to this
     * modern base class. Instead, we define a getter that warns if it's accessed.
     */


    {
      var deprecatedAPIs = {
        isMounted: ['isMounted', 'Instead, make sure to clean up subscriptions and pending requests in ' + 'componentWillUnmount to prevent memory leaks.'],
        replaceState: ['replaceState', 'Refactor your code to use setState instead (see ' + 'https://github.com/facebook/react/issues/3236).']
      };

      var defineDeprecationWarning = function defineDeprecationWarning(methodName, info) {
        Object.defineProperty(Component.prototype, methodName, {
          get: function get() {
            lowPriorityWarning$1(false, '%s(...) is deprecated in plain JavaScript React classes. %s', info[0], info[1]);
            return undefined;
          }
        });
      };

      for (var fnName in deprecatedAPIs) {
        if (deprecatedAPIs.hasOwnProperty(fnName)) {
          defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
        }
      }
    }
    /**
     * Base class helpers for the updating state of a component.
     */

    function PureComponent(props, context, updater) {
      // Duplicated from Component.
      this.props = props;
      this.context = context;
      this.refs = emptyObject; // We initialize the default updater but the real one gets injected by the
      // renderer.

      this.updater = updater || ReactNoopUpdateQueue;
    }

    function ComponentDummy() {}

    ComponentDummy.prototype = Component.prototype;
    var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
    pureComponentPrototype.constructor = PureComponent; // Avoid an extra prototype jump for these methods.

    _assign(pureComponentPrototype, Component.prototype);

    pureComponentPrototype.isPureReactComponent = true;

    function AsyncComponent(props, context, updater) {
      // Duplicated from Component.
      this.props = props;
      this.context = context;
      this.refs = emptyObject; // We initialize the default updater but the real one gets injected by the
      // renderer.

      this.updater = updater || ReactNoopUpdateQueue;
    }

    var asyncComponentPrototype = AsyncComponent.prototype = new ComponentDummy();
    asyncComponentPrototype.constructor = AsyncComponent; // Avoid an extra prototype jump for these methods.

    _assign(asyncComponentPrototype, Component.prototype);

    asyncComponentPrototype.unstable_isAsyncReactComponent = true;

    asyncComponentPrototype.render = function () {
      return this.props.children;
    };
    /**
     * Keeps track of the current owner.
     *
     * The current owner is the component who should own any components that are
     * currently being constructed.
     */


    var ReactCurrentOwner = {
      /**
       * @internal
       * @type {ReactComponent}
       */
      current: null
    };
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var RESERVED_PROPS = {
      key: true,
      ref: true,
      __self: true,
      __source: true
    };
    var specialPropKeyWarningShown;
    var specialPropRefWarningShown;

    function hasValidRef(config) {
      {
        if (hasOwnProperty.call(config, 'ref')) {
          var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;

          if (getter && getter.isReactWarning) {
            return false;
          }
        }
      }
      return config.ref !== undefined;
    }

    function hasValidKey(config) {
      {
        if (hasOwnProperty.call(config, 'key')) {
          var getter = Object.getOwnPropertyDescriptor(config, 'key').get;

          if (getter && getter.isReactWarning) {
            return false;
          }
        }
      }
      return config.key !== undefined;
    }

    function defineKeyPropWarningGetter(props, displayName) {
      var warnAboutAccessingKey = function warnAboutAccessingKey() {
        if (!specialPropKeyWarningShown) {
          specialPropKeyWarningShown = true;
          warning(false, '%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName);
        }
      };

      warnAboutAccessingKey.isReactWarning = true;
      Object.defineProperty(props, 'key', {
        get: warnAboutAccessingKey,
        configurable: true
      });
    }

    function defineRefPropWarningGetter(props, displayName) {
      var warnAboutAccessingRef = function warnAboutAccessingRef() {
        if (!specialPropRefWarningShown) {
          specialPropRefWarningShown = true;
          warning(false, '%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName);
        }
      };

      warnAboutAccessingRef.isReactWarning = true;
      Object.defineProperty(props, 'ref', {
        get: warnAboutAccessingRef,
        configurable: true
      });
    }
    /**
     * Factory method to create a new React element. This no longer adheres to
     * the class pattern, so do not use new to call it. Also, no instanceof check
     * will work. Instead test $$typeof field against Symbol.for('react.element') to check
     * if something is a React Element.
     *
     * @param {*} type
     * @param {*} key
     * @param {string|object} ref
     * @param {*} self A *temporary* helper to detect places where `this` is
     * different from the `owner` when React.createElement is called, so that we
     * can warn. We want to get rid of owner and replace string `ref`s with arrow
     * functions, and as long as `this` and owner are the same, there will be no
     * change in behavior.
     * @param {*} source An annotation object (added by a transpiler or otherwise)
     * indicating filename, line number, and/or other information.
     * @param {*} owner
     * @param {*} props
     * @internal
     */


    var ReactElement = function ReactElement(type, key, ref, self, source, owner, props) {
      var element = {
        // This tag allow us to uniquely identify this as a React Element
        $$typeof: REACT_ELEMENT_TYPE,
        // Built-in properties that belong on the element
        type: type,
        key: key,
        ref: ref,
        props: props,
        // Record the component responsible for creating this element.
        _owner: owner
      };
      {
        // The validation flag is currently mutative. We put it on
        // an external backing store so that we can freeze the whole object.
        // This can be replaced with a WeakMap once they are implemented in
        // commonly used development environments.
        element._store = {}; // To make comparing ReactElements easier for testing purposes, we make
        // the validation flag non-enumerable (where possible, which should
        // include every environment we run tests in), so the test framework
        // ignores it.

        Object.defineProperty(element._store, 'validated', {
          configurable: false,
          enumerable: false,
          writable: true,
          value: false
        }); // self and source are DEV only properties.

        Object.defineProperty(element, '_self', {
          configurable: false,
          enumerable: false,
          writable: false,
          value: self
        }); // Two elements created in two different places should be considered
        // equal for testing purposes and therefore we hide it from enumeration.

        Object.defineProperty(element, '_source', {
          configurable: false,
          enumerable: false,
          writable: false,
          value: source
        });

        if (Object.freeze) {
          Object.freeze(element.props);
          Object.freeze(element);
        }
      }
      return element;
    };
    /**
     * Create and return a new ReactElement of the given type.
     * See https://reactjs.org/docs/react-api.html#createelement
     */


    function createElement(type, config, children) {
      var propName; // Reserved names are extracted

      var props = {};
      var key = null;
      var ref = null;
      var self = null;
      var source = null;

      if (config != null) {
        if (hasValidRef(config)) {
          ref = config.ref;
        }

        if (hasValidKey(config)) {
          key = '' + config.key;
        }

        self = config.__self === undefined ? null : config.__self;
        source = config.__source === undefined ? null : config.__source; // Remaining properties are added to a new props object

        for (propName in config) {
          if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
            props[propName] = config[propName];
          }
        }
      } // Children can be more than one argument, and those are transferred onto
      // the newly allocated props object.


      var childrenLength = arguments.length - 2;

      if (childrenLength === 1) {
        props.children = children;
      } else if (childrenLength > 1) {
        var childArray = Array(childrenLength);

        for (var i = 0; i < childrenLength; i++) {
          childArray[i] = arguments[i + 2];
        }

        {
          if (Object.freeze) {
            Object.freeze(childArray);
          }
        }
        props.children = childArray;
      } // Resolve default props


      if (type && type.defaultProps) {
        var defaultProps = type.defaultProps;

        for (propName in defaultProps) {
          if (props[propName] === undefined) {
            props[propName] = defaultProps[propName];
          }
        }
      }

      {
        if (key || ref) {
          if (typeof props.$$typeof === 'undefined' || props.$$typeof !== REACT_ELEMENT_TYPE) {
            var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;

            if (key) {
              defineKeyPropWarningGetter(props, displayName);
            }

            if (ref) {
              defineRefPropWarningGetter(props, displayName);
            }
          }
        }
      }
      return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
    }
    /**
     * Return a function that produces ReactElements of a given type.
     * See https://reactjs.org/docs/react-api.html#createfactory
     */


    function cloneAndReplaceKey(oldElement, newKey) {
      var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);
      return newElement;
    }
    /**
     * Clone and return a new ReactElement using element as the starting point.
     * See https://reactjs.org/docs/react-api.html#cloneelement
     */


    function cloneElement(element, config, children) {
      var propName; // Original props are copied

      var props = _assign({}, element.props); // Reserved names are extracted


      var key = element.key;
      var ref = element.ref; // Self is preserved since the owner is preserved.

      var self = element._self; // Source is preserved since cloneElement is unlikely to be targeted by a
      // transpiler, and the original source is probably a better indicator of the
      // true owner.

      var source = element._source; // Owner will be preserved, unless ref is overridden

      var owner = element._owner;

      if (config != null) {
        if (hasValidRef(config)) {
          // Silently steal the ref from the parent.
          ref = config.ref;
          owner = ReactCurrentOwner.current;
        }

        if (hasValidKey(config)) {
          key = '' + config.key;
        } // Remaining properties override existing props


        var defaultProps;

        if (element.type && element.type.defaultProps) {
          defaultProps = element.type.defaultProps;
        }

        for (propName in config) {
          if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
            if (config[propName] === undefined && defaultProps !== undefined) {
              // Resolve default props
              props[propName] = defaultProps[propName];
            } else {
              props[propName] = config[propName];
            }
          }
        }
      } // Children can be more than one argument, and those are transferred onto
      // the newly allocated props object.


      var childrenLength = arguments.length - 2;

      if (childrenLength === 1) {
        props.children = children;
      } else if (childrenLength > 1) {
        var childArray = Array(childrenLength);

        for (var i = 0; i < childrenLength; i++) {
          childArray[i] = arguments[i + 2];
        }

        props.children = childArray;
      }

      return ReactElement(element.type, key, ref, self, source, owner, props);
    }
    /**
     * Verifies the object is a ReactElement.
     * See https://reactjs.org/docs/react-api.html#isvalidelement
     * @param {?object} object
     * @return {boolean} True if `object` is a valid component.
     * @final
     */


    function isValidElement(object) {
      return _typeof$1(object) === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
    }

    var ReactDebugCurrentFrame = {};
    {
      // Component that is being worked on
      ReactDebugCurrentFrame.getCurrentStack = null;

      ReactDebugCurrentFrame.getStackAddendum = function () {
        var impl = ReactDebugCurrentFrame.getCurrentStack;

        if (impl) {
          return impl();
        }

        return null;
      };
    }
    var SEPARATOR = '.';
    var SUBSEPARATOR = ':';
    /**
     * Escape and wrap key so it is safe to use as a reactid
     *
     * @param {string} key to be escaped.
     * @return {string} the escaped key.
     */

    function escape(key) {
      var escapeRegex = /[=:]/g;
      var escaperLookup = {
        '=': '=0',
        ':': '=2'
      };
      var escapedString = ('' + key).replace(escapeRegex, function (match) {
        return escaperLookup[match];
      });
      return '$' + escapedString;
    }
    /**
     * TODO: Test that a single child and an array with one item have the same key
     * pattern.
     */


    var didWarnAboutMaps = false;
    var userProvidedKeyEscapeRegex = /\/+/g;

    function escapeUserProvidedKey(text) {
      return ('' + text).replace(userProvidedKeyEscapeRegex, '$&/');
    }

    var POOL_SIZE = 10;
    var traverseContextPool = [];

    function getPooledTraverseContext(mapResult, keyPrefix, mapFunction, mapContext) {
      if (traverseContextPool.length) {
        var traverseContext = traverseContextPool.pop();
        traverseContext.result = mapResult;
        traverseContext.keyPrefix = keyPrefix;
        traverseContext.func = mapFunction;
        traverseContext.context = mapContext;
        traverseContext.count = 0;
        return traverseContext;
      } else {
        return {
          result: mapResult,
          keyPrefix: keyPrefix,
          func: mapFunction,
          context: mapContext,
          count: 0
        };
      }
    }

    function releaseTraverseContext(traverseContext) {
      traverseContext.result = null;
      traverseContext.keyPrefix = null;
      traverseContext.func = null;
      traverseContext.context = null;
      traverseContext.count = 0;

      if (traverseContextPool.length < POOL_SIZE) {
        traverseContextPool.push(traverseContext);
      }
    }
    /**
     * @param {?*} children Children tree container.
     * @param {!string} nameSoFar Name of the key path so far.
     * @param {!function} callback Callback to invoke with each child found.
     * @param {?*} traverseContext Used to pass information throughout the traversal
     * process.
     * @return {!number} The number of children in this subtree.
     */


    function traverseAllChildrenImpl(children, nameSoFar, callback, traverseContext) {
      var type = _typeof$1(children);

      if (type === 'undefined' || type === 'boolean') {
        // All of the above are perceived as null.
        children = null;
      }

      var invokeCallback = false;

      if (children === null) {
        invokeCallback = true;
      } else {
        switch (type) {
          case 'string':
          case 'number':
            invokeCallback = true;
            break;

          case 'object':
            switch (children.$$typeof) {
              case REACT_ELEMENT_TYPE:
              case REACT_CALL_TYPE:
              case REACT_RETURN_TYPE:
              case REACT_PORTAL_TYPE:
                invokeCallback = true;
            }

        }
      }

      if (invokeCallback) {
        callback(traverseContext, children, // If it's the only child, treat the name as if it was wrapped in an array
        // so that it's consistent if the number of children grows.
        nameSoFar === '' ? SEPARATOR + getComponentKey(children, 0) : nameSoFar);
        return 1;
      }

      var child;
      var nextName;
      var subtreeCount = 0; // Count of children found in the current subtree.

      var nextNamePrefix = nameSoFar === '' ? SEPARATOR : nameSoFar + SUBSEPARATOR;

      if (Array.isArray(children)) {
        for (var i = 0; i < children.length; i++) {
          child = children[i];
          nextName = nextNamePrefix + getComponentKey(child, i);
          subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
        }
      } else {
        var iteratorFn = getIteratorFn(children);

        if (typeof iteratorFn === 'function') {
          {
            // Warn about using Maps as children
            if (iteratorFn === children.entries) {
              warning(didWarnAboutMaps, 'Using Maps as children is unsupported and will likely yield ' + 'unexpected results. Convert it to a sequence/iterable of keyed ' + 'ReactElements instead.%s', ReactDebugCurrentFrame.getStackAddendum());
              didWarnAboutMaps = true;
            }
          }
          var iterator = iteratorFn.call(children);
          var step;
          var ii = 0;

          while (!(step = iterator.next()).done) {
            child = step.value;
            nextName = nextNamePrefix + getComponentKey(child, ii++);
            subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
          }
        } else if (type === 'object') {
          var addendum = '';
          {
            addendum = ' If you meant to render a collection of children, use an array ' + 'instead.' + ReactDebugCurrentFrame.getStackAddendum();
          }
          var childrenString = '' + children;
          invariant(false, 'Objects are not valid as a React child (found: %s).%s', childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString, addendum);
        }
      }

      return subtreeCount;
    }
    /**
     * Traverses children that are typically specified as `props.children`, but
     * might also be specified through attributes:
     *
     * - `traverseAllChildren(this.props.children, ...)`
     * - `traverseAllChildren(this.props.leftPanelChildren, ...)`
     *
     * The `traverseContext` is an optional argument that is passed through the
     * entire traversal. It can be used to store accumulations or anything else that
     * the callback might find relevant.
     *
     * @param {?*} children Children tree object.
     * @param {!function} callback To invoke upon traversing each child.
     * @param {?*} traverseContext Context for traversal.
     * @return {!number} The number of children in this subtree.
     */


    function traverseAllChildren(children, callback, traverseContext) {
      if (children == null) {
        return 0;
      }

      return traverseAllChildrenImpl(children, '', callback, traverseContext);
    }
    /**
     * Generate a key string that identifies a component within a set.
     *
     * @param {*} component A component that could contain a manual key.
     * @param {number} index Index that is used if a manual key is not provided.
     * @return {string}
     */


    function getComponentKey(component, index) {
      // Do some typechecking here since we call this blindly. We want to ensure
      // that we don't block potential future ES APIs.
      if (_typeof$1(component) === 'object' && component !== null && component.key != null) {
        // Explicit key
        return escape(component.key);
      } // Implicit key determined by the index in the set


      return index.toString(36);
    }

    function forEachSingleChild(bookKeeping, child, name) {
      var func = bookKeeping.func,
          context = bookKeeping.context;
      func.call(context, child, bookKeeping.count++);
    }
    /**
     * Iterates through children that are typically specified as `props.children`.
     *
     * See https://reactjs.org/docs/react-api.html#react.children.foreach
     *
     * The provided forEachFunc(child, index) will be called for each
     * leaf child.
     *
     * @param {?*} children Children tree container.
     * @param {function(*, int)} forEachFunc
     * @param {*} forEachContext Context for forEachContext.
     */


    function forEachChildren(children, forEachFunc, forEachContext) {
      if (children == null) {
        return children;
      }

      var traverseContext = getPooledTraverseContext(null, null, forEachFunc, forEachContext);
      traverseAllChildren(children, forEachSingleChild, traverseContext);
      releaseTraverseContext(traverseContext);
    }

    function mapSingleChildIntoContext(bookKeeping, child, childKey) {
      var result = bookKeeping.result,
          keyPrefix = bookKeeping.keyPrefix,
          func = bookKeeping.func,
          context = bookKeeping.context;
      var mappedChild = func.call(context, child, bookKeeping.count++);

      if (Array.isArray(mappedChild)) {
        mapIntoWithKeyPrefixInternal(mappedChild, result, childKey, emptyFunction.thatReturnsArgument);
      } else if (mappedChild != null) {
        if (isValidElement(mappedChild)) {
          mappedChild = cloneAndReplaceKey(mappedChild, // Keep both the (mapped) and old keys if they differ, just as
          // traverseAllChildren used to do for objects as children
          keyPrefix + (mappedChild.key && (!child || child.key !== mappedChild.key) ? escapeUserProvidedKey(mappedChild.key) + '/' : '') + childKey);
        }

        result.push(mappedChild);
      }
    }

    function mapIntoWithKeyPrefixInternal(children, array, prefix, func, context) {
      var escapedPrefix = '';

      if (prefix != null) {
        escapedPrefix = escapeUserProvidedKey(prefix) + '/';
      }

      var traverseContext = getPooledTraverseContext(array, escapedPrefix, func, context);
      traverseAllChildren(children, mapSingleChildIntoContext, traverseContext);
      releaseTraverseContext(traverseContext);
    }
    /**
     * Maps children that are typically specified as `props.children`.
     *
     * See https://reactjs.org/docs/react-api.html#react.children.map
     *
     * The provided mapFunction(child, key, index) will be called for each
     * leaf child.
     *
     * @param {?*} children Children tree container.
     * @param {function(*, int)} func The map function.
     * @param {*} context Context for mapFunction.
     * @return {object} Object containing the ordered map of results.
     */


    function mapChildren(children, func, context) {
      if (children == null) {
        return children;
      }

      var result = [];
      mapIntoWithKeyPrefixInternal(children, result, null, func, context);
      return result;
    }
    /**
     * Count the number of children that are typically specified as
     * `props.children`.
     *
     * See https://reactjs.org/docs/react-api.html#react.children.count
     *
     * @param {?*} children Children tree container.
     * @return {number} The number of children.
     */


    function countChildren(children, context) {
      return traverseAllChildren(children, emptyFunction.thatReturnsNull, null);
    }
    /**
     * Flatten a children object (typically specified as `props.children`) and
     * return an array with appropriately re-keyed children.
     *
     * See https://reactjs.org/docs/react-api.html#react.children.toarray
     */


    function toArray(children) {
      var result = [];
      mapIntoWithKeyPrefixInternal(children, result, null, emptyFunction.thatReturnsArgument);
      return result;
    }
    /**
     * Returns the first child in a collection of children and verifies that there
     * is only one child in the collection.
     *
     * See https://reactjs.org/docs/react-api.html#react.children.only
     *
     * The current implementation of this function assumes that a single child gets
     * passed without a wrapper, but the purpose of this helper function is to
     * abstract away the particular structure of children.
     *
     * @param {?object} children Child collection structure.
     * @return {ReactElement} The first and only `ReactElement` contained in the
     * structure.
     */


    function onlyChild(children) {
      !isValidElement(children) ? invariant(false, 'React.Children.only expected to receive a single React element child.') : void 0;
      return children;
    }

    var describeComponentFrame = function describeComponentFrame(name, source, ownerName) {
      return '\n    in ' + (name || 'Unknown') + (source ? ' (at ' + source.fileName.replace(/^.*[\\\/]/, '') + ':' + source.lineNumber + ')' : ownerName ? ' (created by ' + ownerName + ')' : '');
    };

    function getComponentName(fiber) {
      var type = fiber.type;

      if (typeof type === 'string') {
        return type;
      }

      if (typeof type === 'function') {
        return type.displayName || type.name;
      }

      return null;
    }
    /**
     * ReactElementValidator provides a wrapper around a element factory
     * which validates the props passed to the element. This is intended to be
     * used only in DEV and could be replaced by a static type checker for languages
     * that support it.
     */


    {
      var currentlyValidatingElement = null;
      var propTypesMisspellWarningShown = false;

      var getDisplayName = function getDisplayName(element) {
        if (element == null) {
          return '#empty';
        } else if (typeof element === 'string' || typeof element === 'number') {
          return '#text';
        } else if (typeof element.type === 'string') {
          return element.type;
        } else if (element.type === REACT_FRAGMENT_TYPE) {
          return 'React.Fragment';
        } else {
          return element.type.displayName || element.type.name || 'Unknown';
        }
      };

      var getStackAddendum = function getStackAddendum() {
        var stack = '';

        if (currentlyValidatingElement) {
          var name = getDisplayName(currentlyValidatingElement);
          var owner = currentlyValidatingElement._owner;
          stack += describeComponentFrame(name, currentlyValidatingElement._source, owner && getComponentName(owner));
        }

        stack += ReactDebugCurrentFrame.getStackAddendum() || '';
        return stack;
      };

      var VALID_FRAGMENT_PROPS = new Map([['children', true], ['key', true]]);
    }

    function getDeclarationErrorAddendum() {
      if (ReactCurrentOwner.current) {
        var name = getComponentName(ReactCurrentOwner.current);

        if (name) {
          return '\n\nCheck the render method of `' + name + '`.';
        }
      }

      return '';
    }

    function getSourceInfoErrorAddendum(elementProps) {
      if (elementProps !== null && elementProps !== undefined && elementProps.__source !== undefined) {
        var source = elementProps.__source;
        var fileName = source.fileName.replace(/^.*[\\\/]/, '');
        var lineNumber = source.lineNumber;
        return '\n\nCheck your code at ' + fileName + ':' + lineNumber + '.';
      }

      return '';
    }
    /**
     * Warn if there's no key explicitly set on dynamic arrays of children or
     * object keys are not valid. This allows us to keep track of children between
     * updates.
     */


    var ownerHasKeyUseWarning = {};

    function getCurrentComponentErrorInfo(parentType) {
      var info = getDeclarationErrorAddendum();

      if (!info) {
        var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;

        if (parentName) {
          info = '\n\nCheck the top-level render call using <' + parentName + '>.';
        }
      }

      return info;
    }
    /**
     * Warn if the element doesn't have an explicit key assigned to it.
     * This element is in an array. The array could grow and shrink or be
     * reordered. All children that haven't already been validated are required to
     * have a "key" property assigned to it. Error statuses are cached so a warning
     * will only be shown once.
     *
     * @internal
     * @param {ReactElement} element Element that requires a key.
     * @param {*} parentType element's parent's type.
     */


    function validateExplicitKey(element, parentType) {
      if (!element._store || element._store.validated || element.key != null) {
        return;
      }

      element._store.validated = true;
      var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);

      if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
        return;
      }

      ownerHasKeyUseWarning[currentComponentErrorInfo] = true; // Usually the current owner is the offender, but if it accepts children as a
      // property, it may be the creator of the child that's responsible for
      // assigning it a key.

      var childOwner = '';

      if (element && element._owner && element._owner !== ReactCurrentOwner.current) {
        // Give the component that originally created this child.
        childOwner = ' It was passed a child from ' + getComponentName(element._owner) + '.';
      }

      currentlyValidatingElement = element;
      {
        warning(false, 'Each child in an array or iterator should have a unique "key" prop.' + '%s%s See https://fb.me/react-warning-keys for more information.%s', currentComponentErrorInfo, childOwner, getStackAddendum());
      }
      currentlyValidatingElement = null;
    }
    /**
     * Ensure that every element either is passed in a static location, in an
     * array with an explicit keys property defined, or in an object literal
     * with valid key property.
     *
     * @internal
     * @param {ReactNode} node Statically passed child of any type.
     * @param {*} parentType node's parent's type.
     */


    function validateChildKeys(node, parentType) {
      if (_typeof$1(node) !== 'object') {
        return;
      }

      if (Array.isArray(node)) {
        for (var i = 0; i < node.length; i++) {
          var child = node[i];

          if (isValidElement(child)) {
            validateExplicitKey(child, parentType);
          }
        }
      } else if (isValidElement(node)) {
        // This element was passed in a valid location.
        if (node._store) {
          node._store.validated = true;
        }
      } else if (node) {
        var iteratorFn = getIteratorFn(node);

        if (typeof iteratorFn === 'function') {
          // Entry iterators used to provide implicit keys,
          // but now we print a separate warning for them later.
          if (iteratorFn !== node.entries) {
            var iterator = iteratorFn.call(node);
            var step;

            while (!(step = iterator.next()).done) {
              if (isValidElement(step.value)) {
                validateExplicitKey(step.value, parentType);
              }
            }
          }
        }
      }
    }
    /**
     * Given an element, validate that its props follow the propTypes definition,
     * provided by the type.
     *
     * @param {ReactElement} element
     */


    function validatePropTypes(element) {
      var componentClass = element.type;

      if (typeof componentClass !== 'function') {
        return;
      }

      var name = componentClass.displayName || componentClass.name;
      var propTypes = componentClass.propTypes;

      if (propTypes) {
        currentlyValidatingElement = element;
        checkPropTypes(propTypes, element.props, 'prop', name, getStackAddendum);
        currentlyValidatingElement = null;
      } else if (componentClass.PropTypes !== undefined && !propTypesMisspellWarningShown) {
        propTypesMisspellWarningShown = true;
        warning(false, 'Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?', name || 'Unknown');
      }

      if (typeof componentClass.getDefaultProps === 'function') {
        warning(componentClass.getDefaultProps.isReactClassApproved, 'getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.');
      }
    }
    /**
     * Given a fragment, validate that it can only be provided with fragment props
     * @param {ReactElement} fragment
     */


    function validateFragmentProps(fragment) {
      currentlyValidatingElement = fragment;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = Object.keys(fragment.props)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var key = _step.value;

          if (!VALID_FRAGMENT_PROPS.has(key)) {
            warning(false, 'Invalid prop `%s` supplied to `React.Fragment`. ' + 'React.Fragment can only have `key` and `children` props.%s', key, getStackAddendum());
            break;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator['return']) {
            _iterator['return']();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      if (fragment.ref !== null) {
        warning(false, 'Invalid attribute `ref` supplied to `React.Fragment`.%s', getStackAddendum());
      }

      currentlyValidatingElement = null;
    }

    function createElementWithValidation(type, props, children) {
      var validType = typeof type === 'string' || typeof type === 'function' || _typeof$1(type) === 'symbol' || typeof type === 'number'; // We warn in this case but don't throw. We expect the element creation to
      // succeed and there will likely be errors in render.

      if (!validType) {
        var info = '';

        if (type === undefined || _typeof$1(type) === 'object' && type !== null && Object.keys(type).length === 0) {
          info += ' You likely forgot to export your component from the file ' + "it's defined in, or you might have mixed up default and named imports.";
        }

        var sourceInfo = getSourceInfoErrorAddendum(props);

        if (sourceInfo) {
          info += sourceInfo;
        } else {
          info += getDeclarationErrorAddendum();
        }

        info += getStackAddendum() || '';
        warning(false, 'React.createElement: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', type == null ? type : _typeof$1(type), info);
      }

      var element = createElement.apply(this, arguments); // The result can be nullish if a mock or a custom function is used.
      // TODO: Drop this when these are no longer allowed as the type argument.

      if (element == null) {
        return element;
      } // Skip key warning if the type isn't valid since our key validation logic
      // doesn't expect a non-string/function type and can throw confusing errors.
      // We don't want exception behavior to differ between dev and prod.
      // (Rendering will throw with a helpful message and as soon as the type is
      // fixed, the key warnings will appear.)


      if (validType) {
        for (var i = 2; i < arguments.length; i++) {
          validateChildKeys(arguments[i], type);
        }
      }

      if (_typeof$1(type) === 'symbol' && type === REACT_FRAGMENT_TYPE) {
        validateFragmentProps(element);
      } else {
        validatePropTypes(element);
      }

      return element;
    }

    function createFactoryWithValidation(type) {
      var validatedFactory = createElementWithValidation.bind(null, type); // Legacy hook TODO: Warn if this is accessed

      validatedFactory.type = type;
      {
        Object.defineProperty(validatedFactory, 'type', {
          enumerable: false,
          get: function get() {
            lowPriorityWarning$1(false, 'Factory.type is deprecated. Access the class directly ' + 'before passing it to createFactory.');
            Object.defineProperty(this, 'type', {
              value: type
            });
            return type;
          }
        });
      }
      return validatedFactory;
    }

    function cloneElementWithValidation(element, props, children) {
      var newElement = cloneElement.apply(this, arguments);

      for (var i = 2; i < arguments.length; i++) {
        validateChildKeys(arguments[i], newElement.type);
      }

      validatePropTypes(newElement);
      return newElement;
    }

    var React = {
      Children: {
        map: mapChildren,
        forEach: forEachChildren,
        count: countChildren,
        toArray: toArray,
        only: onlyChild
      },
      Component: Component,
      PureComponent: PureComponent,
      unstable_AsyncComponent: AsyncComponent,
      Fragment: REACT_FRAGMENT_TYPE,
      createElement: createElementWithValidation,
      cloneElement: cloneElementWithValidation,
      createFactory: createFactoryWithValidation,
      isValidElement: isValidElement,
      version: ReactVersion,
      __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {
        ReactCurrentOwner: ReactCurrentOwner,
        // Used by renderers to avoid bundling object-assign twice in UMD bundles:
        assign: _assign
      }
    };
    {
      _assign(React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, {
        // These should not be included in production.
        ReactDebugCurrentFrame: ReactDebugCurrentFrame,
        // Shim for React DOM 16.0.0 which still destructured (but not used) this.
        // TODO: remove in React 17.0.
        ReactComponentTreeHook: {}
      });
    }
    var React$2 = Object.freeze({
      default: React
    });
    var React$3 = React$2 && React || React$2; // TODO: decide on the top-level export form.
    // This is hacky but makes it work with both Rollup and Jest.

    var react = React$3['default'] ? React$3['default'] : React$3;
    react_development.exports = react;
  })();
}

{
  react.exports = react_development.exports;
}

var React = react.exports;

var allLocaleData = {};

var intlMessageformat = {exports: {}};

var main$1 = {};

var core$1 = {};

var utils = {};

/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/

utils.extend = extend;
var hop$1 = Object.prototype.hasOwnProperty;

function extend(obj) {
  var sources = Array.prototype.slice.call(arguments, 1),
      i,
      len,
      source,
      key;

  for (i = 0, len = sources.length; i < len; i += 1) {
    source = sources[i];

    if (!source) {
      continue;
    }

    for (key in source) {
      if (hop$1.call(source, key)) {
        obj[key] = source[key];
      }
    }
  }

  return obj;
}

utils.hop = hop$1;

var es5$1 = {};

/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/

var src$utils$$ = utils; // Purposely using the same implementation as the Intl.js `Intl` polyfill.
// Copyright 2013 Andy Earnshaw, MIT License

var realDefineProp$1 = function () {
  try {
    return !!Object.defineProperty({}, 'a', {});
  } catch (e) {
    return false;
  }
}();
var defineProperty$1 = realDefineProp$1 ? Object.defineProperty : function (obj, name, desc) {
  if ('get' in desc && obj.__defineGetter__) {
    obj.__defineGetter__(name, desc.get);
  } else if (!src$utils$$.hop.call(obj, name) || 'value' in desc) {
    obj[name] = desc.value;
  }
};

var objCreate$1 = Object.create || function (proto, props) {
  var obj, k;

  function F() {}

  F.prototype = proto;
  obj = new F();

  for (k in props) {
    if (src$utils$$.hop.call(props, k)) {
      defineProperty$1(obj, k, props[k]);
    }
  }

  return obj;
};

es5$1.defineProperty = defineProperty$1, es5$1.objCreate = objCreate$1;

var compiler = {};

/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/

(function (exports) {

  exports["default"] = Compiler;

  function Compiler(locales, formats, pluralFn) {
    this.locales = locales;
    this.formats = formats;
    this.pluralFn = pluralFn;
  }

  Compiler.prototype.compile = function (ast) {
    this.pluralStack = [];
    this.currentPlural = null;
    this.pluralNumberFormat = null;
    return this.compileMessage(ast);
  };

  Compiler.prototype.compileMessage = function (ast) {
    if (!(ast && ast.type === 'messageFormatPattern')) {
      throw new Error('Message AST is not of type: "messageFormatPattern"');
    }

    var elements = ast.elements,
        pattern = [];
    var i, len, element;

    for (i = 0, len = elements.length; i < len; i += 1) {
      element = elements[i];

      switch (element.type) {
        case 'messageTextElement':
          pattern.push(this.compileMessageText(element));
          break;

        case 'argumentElement':
          pattern.push(this.compileArgument(element));
          break;

        default:
          throw new Error('Message element does not have a valid type');
      }
    }

    return pattern;
  };

  Compiler.prototype.compileMessageText = function (element) {
    // When this `element` is part of plural sub-pattern and its value contains
    // an unescaped '#', use a `PluralOffsetString` helper to properly output
    // the number with the correct offset in the string.
    if (this.currentPlural && /(^|[^\\])#/g.test(element.value)) {
      // Create a cache a NumberFormat instance that can be reused for any
      // PluralOffsetString instance in this message.
      if (!this.pluralNumberFormat) {
        this.pluralNumberFormat = new Intl.NumberFormat(this.locales);
      }

      return new PluralOffsetString(this.currentPlural.id, this.currentPlural.format.offset, this.pluralNumberFormat, element.value);
    } // Unescape the escaped '#'s in the message text.


    return element.value.replace(/\\#/g, '#');
  };

  Compiler.prototype.compileArgument = function (element) {
    var format = element.format;

    if (!format) {
      return new StringFormat(element.id);
    }

    var formats = this.formats,
        locales = this.locales,
        pluralFn = this.pluralFn,
        options;

    switch (format.type) {
      case 'numberFormat':
        options = formats.number[format.style];
        return {
          id: element.id,
          format: new Intl.NumberFormat(locales, options).format
        };

      case 'dateFormat':
        options = formats.date[format.style];
        return {
          id: element.id,
          format: new Intl.DateTimeFormat(locales, options).format
        };

      case 'timeFormat':
        options = formats.time[format.style];
        return {
          id: element.id,
          format: new Intl.DateTimeFormat(locales, options).format
        };

      case 'pluralFormat':
        options = this.compileOptions(element);
        return new PluralFormat(element.id, format.ordinal, format.offset, options, pluralFn);

      case 'selectFormat':
        options = this.compileOptions(element);
        return new SelectFormat(element.id, options);

      default:
        throw new Error('Message element does not have a valid format type');
    }
  };

  Compiler.prototype.compileOptions = function (element) {
    var format = element.format,
        options = format.options,
        optionsHash = {}; // Save the current plural element, if any, then set it to a new value when
    // compiling the options sub-patterns. This conforms the spec's algorithm
    // for handling `"#"` syntax in message text.

    this.pluralStack.push(this.currentPlural);
    this.currentPlural = format.type === 'pluralFormat' ? element : null;
    var i, len, option;

    for (i = 0, len = options.length; i < len; i += 1) {
      option = options[i]; // Compile the sub-pattern and save it under the options's selector.

      optionsHash[option.selector] = this.compileMessage(option.value);
    } // Pop the plural stack to put back the original current plural value.


    this.currentPlural = this.pluralStack.pop();
    return optionsHash;
  }; // -- Compiler Helper Classes --------------------------------------------------


  function StringFormat(id) {
    this.id = id;
  }

  StringFormat.prototype.format = function (value) {
    if (!value && typeof value !== 'number') {
      return '';
    }

    return typeof value === 'string' ? value : String(value);
  };

  function PluralFormat(id, useOrdinal, offset, options, pluralFn) {
    this.id = id;
    this.useOrdinal = useOrdinal;
    this.offset = offset;
    this.options = options;
    this.pluralFn = pluralFn;
  }

  PluralFormat.prototype.getOption = function (value) {
    var options = this.options;
    var option = options['=' + value] || options[this.pluralFn(value - this.offset, this.useOrdinal)];
    return option || options.other;
  };

  function PluralOffsetString(id, offset, numberFormat, string) {
    this.id = id;
    this.offset = offset;
    this.numberFormat = numberFormat;
    this.string = string;
  }

  PluralOffsetString.prototype.format = function (value) {
    var number = this.numberFormat.format(value - this.offset);
    return this.string.replace(/(^|[^\\])#/g, '$1' + number).replace(/\\#/g, '#');
  };

  function SelectFormat(id, options) {
    this.id = id;
    this.options = options;
  }

  SelectFormat.prototype.getOption = function (value) {
    var options = this.options;
    return options[value] || options.other;
  };
})(compiler);

var intlMessageformatParser = {exports: {}};

var parser = {};

(function (exports) {

  exports["default"] = function () {
    /*
     * Generated by PEG.js 0.9.0.
     *
     * http://pegjs.org/
     */

    function peg$subclass(child, parent) {
      function ctor() {
        this.constructor = child;
      }

      ctor.prototype = parent.prototype;
      child.prototype = new ctor();
    }

    function peg$SyntaxError(message, expected, found, location) {
      this.message = message;
      this.expected = expected;
      this.found = found;
      this.location = location;
      this.name = "SyntaxError";

      if (typeof Error.captureStackTrace === "function") {
        Error.captureStackTrace(this, peg$SyntaxError);
      }
    }

    peg$subclass(peg$SyntaxError, Error);

    function peg$parse(input) {
      var options = arguments.length > 1 ? arguments[1] : {},
          peg$FAILED = {},
          peg$startRuleFunctions = {
        start: peg$parsestart
      },
          peg$startRuleFunction = peg$parsestart,
          peg$c0 = function peg$c0(elements) {
        return {
          type: 'messageFormatPattern',
          elements: elements,
          location: location()
        };
      },
          peg$c1 = function peg$c1(text) {
        var string = '',
            i,
            j,
            outerLen,
            inner,
            innerLen;

        for (i = 0, outerLen = text.length; i < outerLen; i += 1) {
          inner = text[i];

          for (j = 0, innerLen = inner.length; j < innerLen; j += 1) {
            string += inner[j];
          }
        }

        return string;
      },
          peg$c2 = function peg$c2(messageText) {
        return {
          type: 'messageTextElement',
          value: messageText,
          location: location()
        };
      },
          peg$c3 = /^[^ \t\n\r,.+={}#]/,
          peg$c4 = {
        type: "class",
        value: "[^ \\t\\n\\r,.+={}#]",
        description: "[^ \\t\\n\\r,.+={}#]"
      },
          peg$c5 = "{",
          peg$c6 = {
        type: "literal",
        value: "{",
        description: "\"{\""
      },
          peg$c7 = ",",
          peg$c8 = {
        type: "literal",
        value: ",",
        description: "\",\""
      },
          peg$c9 = "}",
          peg$c10 = {
        type: "literal",
        value: "}",
        description: "\"}\""
      },
          peg$c11 = function peg$c11(id, format) {
        return {
          type: 'argumentElement',
          id: id,
          format: format && format[2],
          location: location()
        };
      },
          peg$c12 = "number",
          peg$c13 = {
        type: "literal",
        value: "number",
        description: "\"number\""
      },
          peg$c14 = "date",
          peg$c15 = {
        type: "literal",
        value: "date",
        description: "\"date\""
      },
          peg$c16 = "time",
          peg$c17 = {
        type: "literal",
        value: "time",
        description: "\"time\""
      },
          peg$c18 = function peg$c18(type, style) {
        return {
          type: type + 'Format',
          style: style && style[2],
          location: location()
        };
      },
          peg$c19 = "plural",
          peg$c20 = {
        type: "literal",
        value: "plural",
        description: "\"plural\""
      },
          peg$c21 = function peg$c21(pluralStyle) {
        return {
          type: pluralStyle.type,
          ordinal: false,
          offset: pluralStyle.offset || 0,
          options: pluralStyle.options,
          location: location()
        };
      },
          peg$c22 = "selectordinal",
          peg$c23 = {
        type: "literal",
        value: "selectordinal",
        description: "\"selectordinal\""
      },
          peg$c24 = function peg$c24(pluralStyle) {
        return {
          type: pluralStyle.type,
          ordinal: true,
          offset: pluralStyle.offset || 0,
          options: pluralStyle.options,
          location: location()
        };
      },
          peg$c25 = "select",
          peg$c26 = {
        type: "literal",
        value: "select",
        description: "\"select\""
      },
          peg$c27 = function peg$c27(options) {
        return {
          type: 'selectFormat',
          options: options,
          location: location()
        };
      },
          peg$c28 = "=",
          peg$c29 = {
        type: "literal",
        value: "=",
        description: "\"=\""
      },
          peg$c30 = function peg$c30(selector, pattern) {
        return {
          type: 'optionalFormatPattern',
          selector: selector,
          value: pattern,
          location: location()
        };
      },
          peg$c31 = "offset:",
          peg$c32 = {
        type: "literal",
        value: "offset:",
        description: "\"offset:\""
      },
          peg$c33 = function peg$c33(number) {
        return number;
      },
          peg$c34 = function peg$c34(offset, options) {
        return {
          type: 'pluralFormat',
          offset: offset,
          options: options,
          location: location()
        };
      },
          peg$c35 = {
        type: "other",
        description: "whitespace"
      },
          peg$c36 = /^[ \t\n\r]/,
          peg$c37 = {
        type: "class",
        value: "[ \\t\\n\\r]",
        description: "[ \\t\\n\\r]"
      },
          peg$c38 = {
        type: "other",
        description: "optionalWhitespace"
      },
          peg$c39 = /^[0-9]/,
          peg$c40 = {
        type: "class",
        value: "[0-9]",
        description: "[0-9]"
      },
          peg$c41 = /^[0-9a-f]/i,
          peg$c42 = {
        type: "class",
        value: "[0-9a-f]i",
        description: "[0-9a-f]i"
      },
          peg$c43 = "0",
          peg$c44 = {
        type: "literal",
        value: "0",
        description: "\"0\""
      },
          peg$c45 = /^[1-9]/,
          peg$c46 = {
        type: "class",
        value: "[1-9]",
        description: "[1-9]"
      },
          peg$c47 = function peg$c47(digits) {
        return parseInt(digits, 10);
      },
          peg$c48 = /^[^{}\\\0-\x1F \t\n\r]/,
          peg$c49 = {
        type: "class",
        value: "[^{}\\\\\\0-\\x1F\\x7f \\t\\n\\r]",
        description: "[^{}\\\\\\0-\\x1F\\x7f \\t\\n\\r]"
      },
          peg$c50 = "\\\\",
          peg$c51 = {
        type: "literal",
        value: "\\\\",
        description: "\"\\\\\\\\\""
      },
          peg$c52 = function peg$c52() {
        return '\\';
      },
          peg$c53 = "\\#",
          peg$c54 = {
        type: "literal",
        value: "\\#",
        description: "\"\\\\#\""
      },
          peg$c55 = function peg$c55() {
        return '\\#';
      },
          peg$c56 = "\\{",
          peg$c57 = {
        type: "literal",
        value: "\\{",
        description: "\"\\\\{\""
      },
          peg$c58 = function peg$c58() {
        return "{";
      },
          peg$c59 = "\\}",
          peg$c60 = {
        type: "literal",
        value: "\\}",
        description: "\"\\\\}\""
      },
          peg$c61 = function peg$c61() {
        return "}";
      },
          peg$c62 = "\\u",
          peg$c63 = {
        type: "literal",
        value: "\\u",
        description: "\"\\\\u\""
      },
          peg$c64 = function peg$c64(digits) {
        return String.fromCharCode(parseInt(digits, 16));
      },
          peg$c65 = function peg$c65(chars) {
        return chars.join('');
      },
          peg$currPos = 0,
          peg$savedPos = 0,
          peg$posDetailsCache = [{
        line: 1,
        column: 1,
        seenCR: false
      }],
          peg$maxFailPos = 0,
          peg$maxFailExpected = [],
          peg$silentFails = 0,
          peg$result;

      if ("startRule" in options) {
        if (!(options.startRule in peg$startRuleFunctions)) {
          throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
        }

        peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
      }

      function location() {
        return peg$computeLocation(peg$savedPos, peg$currPos);
      }

      function peg$computePosDetails(pos) {
        var details = peg$posDetailsCache[pos],
            p,
            ch;

        if (details) {
          return details;
        } else {
          p = pos - 1;

          while (!peg$posDetailsCache[p]) {
            p--;
          }

          details = peg$posDetailsCache[p];
          details = {
            line: details.line,
            column: details.column,
            seenCR: details.seenCR
          };

          while (p < pos) {
            ch = input.charAt(p);

            if (ch === "\n") {
              if (!details.seenCR) {
                details.line++;
              }

              details.column = 1;
              details.seenCR = false;
            } else if (ch === "\r" || ch === "\u2028" || ch === "\u2029") {
              details.line++;
              details.column = 1;
              details.seenCR = true;
            } else {
              details.column++;
              details.seenCR = false;
            }

            p++;
          }

          peg$posDetailsCache[pos] = details;
          return details;
        }
      }

      function peg$computeLocation(startPos, endPos) {
        var startPosDetails = peg$computePosDetails(startPos),
            endPosDetails = peg$computePosDetails(endPos);
        return {
          start: {
            offset: startPos,
            line: startPosDetails.line,
            column: startPosDetails.column
          },
          end: {
            offset: endPos,
            line: endPosDetails.line,
            column: endPosDetails.column
          }
        };
      }

      function peg$fail(expected) {
        if (peg$currPos < peg$maxFailPos) {
          return;
        }

        if (peg$currPos > peg$maxFailPos) {
          peg$maxFailPos = peg$currPos;
          peg$maxFailExpected = [];
        }

        peg$maxFailExpected.push(expected);
      }

      function peg$buildException(message, expected, found, location) {
        function cleanupExpected(expected) {
          var i = 1;
          expected.sort(function (a, b) {
            if (a.description < b.description) {
              return -1;
            } else if (a.description > b.description) {
              return 1;
            } else {
              return 0;
            }
          });

          while (i < expected.length) {
            if (expected[i - 1] === expected[i]) {
              expected.splice(i, 1);
            } else {
              i++;
            }
          }
        }

        function buildMessage(expected, found) {
          function stringEscape(s) {
            function hex(ch) {
              return ch.charCodeAt(0).toString(16).toUpperCase();
            }

            return s.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\x08/g, '\\b').replace(/\t/g, '\\t').replace(/\n/g, '\\n').replace(/\f/g, '\\f').replace(/\r/g, '\\r').replace(/[\x00-\x07\x0B\x0E\x0F]/g, function (ch) {
              return '\\x0' + hex(ch);
            }).replace(/[\x10-\x1F\x80-\xFF]/g, function (ch) {
              return '\\x' + hex(ch);
            }).replace(/[\u0100-\u0FFF]/g, function (ch) {
              return "\\u0" + hex(ch);
            }).replace(/[\u1000-\uFFFF]/g, function (ch) {
              return "\\u" + hex(ch);
            });
          }

          var expectedDescs = new Array(expected.length),
              expectedDesc,
              foundDesc,
              i;

          for (i = 0; i < expected.length; i++) {
            expectedDescs[i] = expected[i].description;
          }

          expectedDesc = expected.length > 1 ? expectedDescs.slice(0, -1).join(", ") + " or " + expectedDescs[expected.length - 1] : expectedDescs[0];
          foundDesc = found ? "\"" + stringEscape(found) + "\"" : "end of input";
          return "Expected " + expectedDesc + " but " + foundDesc + " found.";
        }

        if (expected !== null) {
          cleanupExpected(expected);
        }

        return new peg$SyntaxError(message !== null ? message : buildMessage(expected, found), expected, found, location);
      }

      function peg$parsestart() {
        var s0;
        s0 = peg$parsemessageFormatPattern();
        return s0;
      }

      function peg$parsemessageFormatPattern() {
        var s0, s1, s2;
        s0 = peg$currPos;
        s1 = [];
        s2 = peg$parsemessageFormatElement();

        while (s2 !== peg$FAILED) {
          s1.push(s2);
          s2 = peg$parsemessageFormatElement();
        }

        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c0(s1);
        }

        s0 = s1;
        return s0;
      }

      function peg$parsemessageFormatElement() {
        var s0;
        s0 = peg$parsemessageTextElement();

        if (s0 === peg$FAILED) {
          s0 = peg$parseargumentElement();
        }

        return s0;
      }

      function peg$parsemessageText() {
        var s0, s1, s2, s3, s4, s5;
        s0 = peg$currPos;
        s1 = [];
        s2 = peg$currPos;
        s3 = peg$parse_();

        if (s3 !== peg$FAILED) {
          s4 = peg$parsechars();

          if (s4 !== peg$FAILED) {
            s5 = peg$parse_();

            if (s5 !== peg$FAILED) {
              s3 = [s3, s4, s5];
              s2 = s3;
            } else {
              peg$currPos = s2;
              s2 = peg$FAILED;
            }
          } else {
            peg$currPos = s2;
            s2 = peg$FAILED;
          }
        } else {
          peg$currPos = s2;
          s2 = peg$FAILED;
        }

        if (s2 !== peg$FAILED) {
          while (s2 !== peg$FAILED) {
            s1.push(s2);
            s2 = peg$currPos;
            s3 = peg$parse_();

            if (s3 !== peg$FAILED) {
              s4 = peg$parsechars();

              if (s4 !== peg$FAILED) {
                s5 = peg$parse_();

                if (s5 !== peg$FAILED) {
                  s3 = [s3, s4, s5];
                  s2 = s3;
                } else {
                  peg$currPos = s2;
                  s2 = peg$FAILED;
                }
              } else {
                peg$currPos = s2;
                s2 = peg$FAILED;
              }
            } else {
              peg$currPos = s2;
              s2 = peg$FAILED;
            }
          }
        } else {
          s1 = peg$FAILED;
        }

        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c1(s1);
        }

        s0 = s1;

        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          s1 = peg$parsews();

          if (s1 !== peg$FAILED) {
            s0 = input.substring(s0, peg$currPos);
          } else {
            s0 = s1;
          }
        }

        return s0;
      }

      function peg$parsemessageTextElement() {
        var s0, s1;
        s0 = peg$currPos;
        s1 = peg$parsemessageText();

        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c2(s1);
        }

        s0 = s1;
        return s0;
      }

      function peg$parseargument() {
        var s0, s1, s2;
        s0 = peg$parsenumber();

        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          s1 = [];

          if (peg$c3.test(input.charAt(peg$currPos))) {
            s2 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s2 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c4);
            }
          }

          if (s2 !== peg$FAILED) {
            while (s2 !== peg$FAILED) {
              s1.push(s2);

              if (peg$c3.test(input.charAt(peg$currPos))) {
                s2 = input.charAt(peg$currPos);
                peg$currPos++;
              } else {
                s2 = peg$FAILED;

                if (peg$silentFails === 0) {
                  peg$fail(peg$c4);
                }
              }
            }
          } else {
            s1 = peg$FAILED;
          }

          if (s1 !== peg$FAILED) {
            s0 = input.substring(s0, peg$currPos);
          } else {
            s0 = s1;
          }
        }

        return s0;
      }

      function peg$parseargumentElement() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8;
        s0 = peg$currPos;

        if (input.charCodeAt(peg$currPos) === 123) {
          s1 = peg$c5;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c6);
          }
        }

        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();

          if (s2 !== peg$FAILED) {
            s3 = peg$parseargument();

            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();

              if (s4 !== peg$FAILED) {
                s5 = peg$currPos;

                if (input.charCodeAt(peg$currPos) === 44) {
                  s6 = peg$c7;
                  peg$currPos++;
                } else {
                  s6 = peg$FAILED;

                  if (peg$silentFails === 0) {
                    peg$fail(peg$c8);
                  }
                }

                if (s6 !== peg$FAILED) {
                  s7 = peg$parse_();

                  if (s7 !== peg$FAILED) {
                    s8 = peg$parseelementFormat();

                    if (s8 !== peg$FAILED) {
                      s6 = [s6, s7, s8];
                      s5 = s6;
                    } else {
                      peg$currPos = s5;
                      s5 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s5;
                    s5 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s5;
                  s5 = peg$FAILED;
                }

                if (s5 === peg$FAILED) {
                  s5 = null;
                }

                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();

                  if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 125) {
                      s7 = peg$c9;
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;

                      if (peg$silentFails === 0) {
                        peg$fail(peg$c10);
                      }
                    }

                    if (s7 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c11(s3, s5);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }

        return s0;
      }

      function peg$parseelementFormat() {
        var s0;
        s0 = peg$parsesimpleFormat();

        if (s0 === peg$FAILED) {
          s0 = peg$parsepluralFormat();

          if (s0 === peg$FAILED) {
            s0 = peg$parseselectOrdinalFormat();

            if (s0 === peg$FAILED) {
              s0 = peg$parseselectFormat();
            }
          }
        }

        return s0;
      }

      function peg$parsesimpleFormat() {
        var s0, s1, s2, s3, s4, s5, s6;
        s0 = peg$currPos;

        if (input.substr(peg$currPos, 6) === peg$c12) {
          s1 = peg$c12;
          peg$currPos += 6;
        } else {
          s1 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c13);
          }
        }

        if (s1 === peg$FAILED) {
          if (input.substr(peg$currPos, 4) === peg$c14) {
            s1 = peg$c14;
            peg$currPos += 4;
          } else {
            s1 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c15);
            }
          }

          if (s1 === peg$FAILED) {
            if (input.substr(peg$currPos, 4) === peg$c16) {
              s1 = peg$c16;
              peg$currPos += 4;
            } else {
              s1 = peg$FAILED;

              if (peg$silentFails === 0) {
                peg$fail(peg$c17);
              }
            }
          }
        }

        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();

          if (s2 !== peg$FAILED) {
            s3 = peg$currPos;

            if (input.charCodeAt(peg$currPos) === 44) {
              s4 = peg$c7;
              peg$currPos++;
            } else {
              s4 = peg$FAILED;

              if (peg$silentFails === 0) {
                peg$fail(peg$c8);
              }
            }

            if (s4 !== peg$FAILED) {
              s5 = peg$parse_();

              if (s5 !== peg$FAILED) {
                s6 = peg$parsechars();

                if (s6 !== peg$FAILED) {
                  s4 = [s4, s5, s6];
                  s3 = s4;
                } else {
                  peg$currPos = s3;
                  s3 = peg$FAILED;
                }
              } else {
                peg$currPos = s3;
                s3 = peg$FAILED;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }

            if (s3 === peg$FAILED) {
              s3 = null;
            }

            if (s3 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c18(s1, s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }

        return s0;
      }

      function peg$parsepluralFormat() {
        var s0, s1, s2, s3, s4, s5;
        s0 = peg$currPos;

        if (input.substr(peg$currPos, 6) === peg$c19) {
          s1 = peg$c19;
          peg$currPos += 6;
        } else {
          s1 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c20);
          }
        }

        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();

          if (s2 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 44) {
              s3 = peg$c7;
              peg$currPos++;
            } else {
              s3 = peg$FAILED;

              if (peg$silentFails === 0) {
                peg$fail(peg$c8);
              }
            }

            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();

              if (s4 !== peg$FAILED) {
                s5 = peg$parsepluralStyle();

                if (s5 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c21(s5);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }

        return s0;
      }

      function peg$parseselectOrdinalFormat() {
        var s0, s1, s2, s3, s4, s5;
        s0 = peg$currPos;

        if (input.substr(peg$currPos, 13) === peg$c22) {
          s1 = peg$c22;
          peg$currPos += 13;
        } else {
          s1 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c23);
          }
        }

        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();

          if (s2 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 44) {
              s3 = peg$c7;
              peg$currPos++;
            } else {
              s3 = peg$FAILED;

              if (peg$silentFails === 0) {
                peg$fail(peg$c8);
              }
            }

            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();

              if (s4 !== peg$FAILED) {
                s5 = peg$parsepluralStyle();

                if (s5 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c24(s5);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }

        return s0;
      }

      function peg$parseselectFormat() {
        var s0, s1, s2, s3, s4, s5, s6;
        s0 = peg$currPos;

        if (input.substr(peg$currPos, 6) === peg$c25) {
          s1 = peg$c25;
          peg$currPos += 6;
        } else {
          s1 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c26);
          }
        }

        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();

          if (s2 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 44) {
              s3 = peg$c7;
              peg$currPos++;
            } else {
              s3 = peg$FAILED;

              if (peg$silentFails === 0) {
                peg$fail(peg$c8);
              }
            }

            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();

              if (s4 !== peg$FAILED) {
                s5 = [];
                s6 = peg$parseoptionalFormatPattern();

                if (s6 !== peg$FAILED) {
                  while (s6 !== peg$FAILED) {
                    s5.push(s6);
                    s6 = peg$parseoptionalFormatPattern();
                  }
                } else {
                  s5 = peg$FAILED;
                }

                if (s5 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c27(s5);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }

        return s0;
      }

      function peg$parseselector() {
        var s0, s1, s2, s3;
        s0 = peg$currPos;
        s1 = peg$currPos;

        if (input.charCodeAt(peg$currPos) === 61) {
          s2 = peg$c28;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c29);
          }
        }

        if (s2 !== peg$FAILED) {
          s3 = peg$parsenumber();

          if (s3 !== peg$FAILED) {
            s2 = [s2, s3];
            s1 = s2;
          } else {
            peg$currPos = s1;
            s1 = peg$FAILED;
          }
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }

        if (s1 !== peg$FAILED) {
          s0 = input.substring(s0, peg$currPos);
        } else {
          s0 = s1;
        }

        if (s0 === peg$FAILED) {
          s0 = peg$parsechars();
        }

        return s0;
      }

      function peg$parseoptionalFormatPattern() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8;
        s0 = peg$currPos;
        s1 = peg$parse_();

        if (s1 !== peg$FAILED) {
          s2 = peg$parseselector();

          if (s2 !== peg$FAILED) {
            s3 = peg$parse_();

            if (s3 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 123) {
                s4 = peg$c5;
                peg$currPos++;
              } else {
                s4 = peg$FAILED;

                if (peg$silentFails === 0) {
                  peg$fail(peg$c6);
                }
              }

              if (s4 !== peg$FAILED) {
                s5 = peg$parse_();

                if (s5 !== peg$FAILED) {
                  s6 = peg$parsemessageFormatPattern();

                  if (s6 !== peg$FAILED) {
                    s7 = peg$parse_();

                    if (s7 !== peg$FAILED) {
                      if (input.charCodeAt(peg$currPos) === 125) {
                        s8 = peg$c9;
                        peg$currPos++;
                      } else {
                        s8 = peg$FAILED;

                        if (peg$silentFails === 0) {
                          peg$fail(peg$c10);
                        }
                      }

                      if (s8 !== peg$FAILED) {
                        peg$savedPos = s0;
                        s1 = peg$c30(s2, s6);
                        s0 = s1;
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }

        return s0;
      }

      function peg$parseoffset() {
        var s0, s1, s2, s3;
        s0 = peg$currPos;

        if (input.substr(peg$currPos, 7) === peg$c31) {
          s1 = peg$c31;
          peg$currPos += 7;
        } else {
          s1 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c32);
          }
        }

        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();

          if (s2 !== peg$FAILED) {
            s3 = peg$parsenumber();

            if (s3 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c33(s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }

        return s0;
      }

      function peg$parsepluralStyle() {
        var s0, s1, s2, s3, s4;
        s0 = peg$currPos;
        s1 = peg$parseoffset();

        if (s1 === peg$FAILED) {
          s1 = null;
        }

        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();

          if (s2 !== peg$FAILED) {
            s3 = [];
            s4 = peg$parseoptionalFormatPattern();

            if (s4 !== peg$FAILED) {
              while (s4 !== peg$FAILED) {
                s3.push(s4);
                s4 = peg$parseoptionalFormatPattern();
              }
            } else {
              s3 = peg$FAILED;
            }

            if (s3 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c34(s1, s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }

        return s0;
      }

      function peg$parsews() {
        var s0, s1;
        peg$silentFails++;
        s0 = [];

        if (peg$c36.test(input.charAt(peg$currPos))) {
          s1 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s1 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c37);
          }
        }

        if (s1 !== peg$FAILED) {
          while (s1 !== peg$FAILED) {
            s0.push(s1);

            if (peg$c36.test(input.charAt(peg$currPos))) {
              s1 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s1 = peg$FAILED;

              if (peg$silentFails === 0) {
                peg$fail(peg$c37);
              }
            }
          }
        } else {
          s0 = peg$FAILED;
        }

        peg$silentFails--;

        if (s0 === peg$FAILED) {
          s1 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c35);
          }
        }

        return s0;
      }

      function peg$parse_() {
        var s0, s1, s2;
        peg$silentFails++;
        s0 = peg$currPos;
        s1 = [];
        s2 = peg$parsews();

        while (s2 !== peg$FAILED) {
          s1.push(s2);
          s2 = peg$parsews();
        }

        if (s1 !== peg$FAILED) {
          s0 = input.substring(s0, peg$currPos);
        } else {
          s0 = s1;
        }

        peg$silentFails--;

        if (s0 === peg$FAILED) {
          s1 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c38);
          }
        }

        return s0;
      }

      function peg$parsedigit() {
        var s0;

        if (peg$c39.test(input.charAt(peg$currPos))) {
          s0 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s0 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c40);
          }
        }

        return s0;
      }

      function peg$parsehexDigit() {
        var s0;

        if (peg$c41.test(input.charAt(peg$currPos))) {
          s0 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s0 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c42);
          }
        }

        return s0;
      }

      function peg$parsenumber() {
        var s0, s1, s2, s3, s4, s5;
        s0 = peg$currPos;

        if (input.charCodeAt(peg$currPos) === 48) {
          s1 = peg$c43;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c44);
          }
        }

        if (s1 === peg$FAILED) {
          s1 = peg$currPos;
          s2 = peg$currPos;

          if (peg$c45.test(input.charAt(peg$currPos))) {
            s3 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s3 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c46);
            }
          }

          if (s3 !== peg$FAILED) {
            s4 = [];
            s5 = peg$parsedigit();

            while (s5 !== peg$FAILED) {
              s4.push(s5);
              s5 = peg$parsedigit();
            }

            if (s4 !== peg$FAILED) {
              s3 = [s3, s4];
              s2 = s3;
            } else {
              peg$currPos = s2;
              s2 = peg$FAILED;
            }
          } else {
            peg$currPos = s2;
            s2 = peg$FAILED;
          }

          if (s2 !== peg$FAILED) {
            s1 = input.substring(s1, peg$currPos);
          } else {
            s1 = s2;
          }
        }

        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c47(s1);
        }

        s0 = s1;
        return s0;
      }

      function peg$parsechar() {
        var s0, s1, s2, s3, s4, s5, s6, s7;

        if (peg$c48.test(input.charAt(peg$currPos))) {
          s0 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s0 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c49);
          }
        }

        if (s0 === peg$FAILED) {
          s0 = peg$currPos;

          if (input.substr(peg$currPos, 2) === peg$c50) {
            s1 = peg$c50;
            peg$currPos += 2;
          } else {
            s1 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c51);
            }
          }

          if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c52();
          }

          s0 = s1;

          if (s0 === peg$FAILED) {
            s0 = peg$currPos;

            if (input.substr(peg$currPos, 2) === peg$c53) {
              s1 = peg$c53;
              peg$currPos += 2;
            } else {
              s1 = peg$FAILED;

              if (peg$silentFails === 0) {
                peg$fail(peg$c54);
              }
            }

            if (s1 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c55();
            }

            s0 = s1;

            if (s0 === peg$FAILED) {
              s0 = peg$currPos;

              if (input.substr(peg$currPos, 2) === peg$c56) {
                s1 = peg$c56;
                peg$currPos += 2;
              } else {
                s1 = peg$FAILED;

                if (peg$silentFails === 0) {
                  peg$fail(peg$c57);
                }
              }

              if (s1 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c58();
              }

              s0 = s1;

              if (s0 === peg$FAILED) {
                s0 = peg$currPos;

                if (input.substr(peg$currPos, 2) === peg$c59) {
                  s1 = peg$c59;
                  peg$currPos += 2;
                } else {
                  s1 = peg$FAILED;

                  if (peg$silentFails === 0) {
                    peg$fail(peg$c60);
                  }
                }

                if (s1 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c61();
                }

                s0 = s1;

                if (s0 === peg$FAILED) {
                  s0 = peg$currPos;

                  if (input.substr(peg$currPos, 2) === peg$c62) {
                    s1 = peg$c62;
                    peg$currPos += 2;
                  } else {
                    s1 = peg$FAILED;

                    if (peg$silentFails === 0) {
                      peg$fail(peg$c63);
                    }
                  }

                  if (s1 !== peg$FAILED) {
                    s2 = peg$currPos;
                    s3 = peg$currPos;
                    s4 = peg$parsehexDigit();

                    if (s4 !== peg$FAILED) {
                      s5 = peg$parsehexDigit();

                      if (s5 !== peg$FAILED) {
                        s6 = peg$parsehexDigit();

                        if (s6 !== peg$FAILED) {
                          s7 = peg$parsehexDigit();

                          if (s7 !== peg$FAILED) {
                            s4 = [s4, s5, s6, s7];
                            s3 = s4;
                          } else {
                            peg$currPos = s3;
                            s3 = peg$FAILED;
                          }
                        } else {
                          peg$currPos = s3;
                          s3 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s3;
                        s3 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s3;
                      s3 = peg$FAILED;
                    }

                    if (s3 !== peg$FAILED) {
                      s2 = input.substring(s2, peg$currPos);
                    } else {
                      s2 = s3;
                    }

                    if (s2 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c64(s2);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                }
              }
            }
          }
        }

        return s0;
      }

      function peg$parsechars() {
        var s0, s1, s2;
        s0 = peg$currPos;
        s1 = [];
        s2 = peg$parsechar();

        if (s2 !== peg$FAILED) {
          while (s2 !== peg$FAILED) {
            s1.push(s2);
            s2 = peg$parsechar();
          }
        } else {
          s1 = peg$FAILED;
        }

        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c65(s1);
        }

        s0 = s1;
        return s0;
      }

      peg$result = peg$startRuleFunction();

      if (peg$result !== peg$FAILED && peg$currPos === input.length) {
        return peg$result;
      } else {
        if (peg$result !== peg$FAILED && peg$currPos < input.length) {
          peg$fail({
            type: "end",
            description: "end of input"
          });
        }

        throw peg$buildException(null, peg$maxFailExpected, peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null, peg$maxFailPos < input.length ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1) : peg$computeLocation(peg$maxFailPos, peg$maxFailPos));
      }
    }

    return {
      SyntaxError: peg$SyntaxError,
      parse: peg$parse
    };
  }();
})(parser);

(function (module, exports) {

  exports = module.exports = parser['default'];
  exports['default'] = exports;
})(intlMessageformatParser, intlMessageformatParser.exports);

/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/

(function (exports) {

  var src$utils$$ = utils,
      src$es5$$ = es5$1,
      src$compiler$$ = compiler,
      intl$messageformat$parser$$ = intlMessageformatParser.exports;
  exports["default"] = MessageFormat; // -- MessageFormat --------------------------------------------------------

  function MessageFormat(message, locales, formats) {
    // Parse string messages into an AST.
    var ast = typeof message === 'string' ? MessageFormat.__parse(message) : message;

    if (!(ast && ast.type === 'messageFormatPattern')) {
      throw new TypeError('A message must be provided as a String or AST.');
    } // Creates a new object with the specified `formats` merged with the default
    // formats.


    formats = this._mergeFormats(MessageFormat.formats, formats); // Defined first because it's used to build the format pattern.

    src$es5$$.defineProperty(this, '_locale', {
      value: this._resolveLocale(locales)
    }); // Compile the `ast` to a pattern that is highly optimized for repeated
    // `format()` invocations. **Note:** This passes the `locales` set provided
    // to the constructor instead of just the resolved locale.

    var pluralFn = this._findPluralRuleFunction(this._locale);

    var pattern = this._compilePattern(ast, locales, formats, pluralFn); // "Bind" `format()` method to `this` so it can be passed by reference like
    // the other `Intl` APIs.


    var messageFormat = this;

    this.format = function (values) {
      try {
        return messageFormat._format(pattern, values);
      } catch (e) {
        if (e.variableId) {
          throw new Error('The intl string context variable \'' + e.variableId + '\'' + ' was not provided to the string \'' + message + '\'');
        } else {
          throw e;
        }
      }
    };
  } // Default format options used as the prototype of the `formats` provided to the
  // constructor. These are used when constructing the internal Intl.NumberFormat
  // and Intl.DateTimeFormat instances.


  src$es5$$.defineProperty(MessageFormat, 'formats', {
    enumerable: true,
    value: {
      number: {
        'currency': {
          style: 'currency'
        },
        'percent': {
          style: 'percent'
        }
      },
      date: {
        'short': {
          month: 'numeric',
          day: 'numeric',
          year: '2-digit'
        },
        'medium': {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        },
        'long': {
          month: 'long',
          day: 'numeric',
          year: 'numeric'
        },
        'full': {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
          year: 'numeric'
        }
      },
      time: {
        'short': {
          hour: 'numeric',
          minute: 'numeric'
        },
        'medium': {
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric'
        },
        'long': {
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
          timeZoneName: 'short'
        },
        'full': {
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
          timeZoneName: 'short'
        }
      }
    }
  }); // Define internal private properties for dealing with locale data.

  src$es5$$.defineProperty(MessageFormat, '__localeData__', {
    value: src$es5$$.objCreate(null)
  });
  src$es5$$.defineProperty(MessageFormat, '__addLocaleData', {
    value: function value(data) {
      if (!(data && data.locale)) {
        throw new Error('Locale data provided to IntlMessageFormat is missing a ' + '`locale` property');
      }

      MessageFormat.__localeData__[data.locale.toLowerCase()] = data;
    }
  }); // Defines `__parse()` static method as an exposed private.

  src$es5$$.defineProperty(MessageFormat, '__parse', {
    value: intl$messageformat$parser$$["default"].parse
  }); // Define public `defaultLocale` property which defaults to English, but can be
  // set by the developer.

  src$es5$$.defineProperty(MessageFormat, 'defaultLocale', {
    enumerable: true,
    writable: true,
    value: undefined
  });

  MessageFormat.prototype.resolvedOptions = function () {
    // TODO: Provide anything else?
    return {
      locale: this._locale
    };
  };

  MessageFormat.prototype._compilePattern = function (ast, locales, formats, pluralFn) {
    var compiler = new src$compiler$$["default"](locales, formats, pluralFn);
    return compiler.compile(ast);
  };

  MessageFormat.prototype._findPluralRuleFunction = function (locale) {
    var localeData = MessageFormat.__localeData__;
    var data = localeData[locale.toLowerCase()]; // The locale data is de-duplicated, so we have to traverse the locale's
    // hierarchy until we find a `pluralRuleFunction` to return.

    while (data) {
      if (data.pluralRuleFunction) {
        return data.pluralRuleFunction;
      }

      data = data.parentLocale && localeData[data.parentLocale.toLowerCase()];
    }

    throw new Error('Locale data added to IntlMessageFormat is missing a ' + '`pluralRuleFunction` for :' + locale);
  };

  MessageFormat.prototype._format = function (pattern, values) {
    var result = '',
        i,
        len,
        part,
        id,
        value,
        err;

    for (i = 0, len = pattern.length; i < len; i += 1) {
      part = pattern[i]; // Exist early for string parts.

      if (typeof part === 'string') {
        result += part;
        continue;
      }

      id = part.id; // Enforce that all required values are provided by the caller.

      if (!(values && src$utils$$.hop.call(values, id))) {
        err = new Error('A value must be provided for: ' + id);
        err.variableId = id;
        throw err;
      }

      value = values[id]; // Recursively format plural and select parts' option — which can be a
      // nested pattern structure. The choosing of the option to use is
      // abstracted-by and delegated-to the part helper object.

      if (part.options) {
        result += this._format(part.getOption(value), values);
      } else {
        result += part.format(value);
      }
    }

    return result;
  };

  MessageFormat.prototype._mergeFormats = function (defaults, formats) {
    var mergedFormats = {},
        type,
        mergedType;

    for (type in defaults) {
      if (!src$utils$$.hop.call(defaults, type)) {
        continue;
      }

      mergedFormats[type] = mergedType = src$es5$$.objCreate(defaults[type]);

      if (formats && src$utils$$.hop.call(formats, type)) {
        src$utils$$.extend(mergedType, formats[type]);
      }
    }

    return mergedFormats;
  };

  MessageFormat.prototype._resolveLocale = function (locales) {
    if (typeof locales === 'string') {
      locales = [locales];
    } // Create a copy of the array so we can push on the default locale.


    locales = (locales || []).concat(MessageFormat.defaultLocale);
    var localeData = MessageFormat.__localeData__;
    var i, len, localeParts, data; // Using the set of locales + the default locale, we look for the first one
    // which that has been registered. When data does not exist for a locale, we
    // traverse its ancestors to find something that's been registered within
    // its hierarchy of locales. Since we lack the proper `parentLocale` data
    // here, we must take a naive approach to traversal.

    for (i = 0, len = locales.length; i < len; i += 1) {
      localeParts = locales[i].toLowerCase().split('-');

      while (localeParts.length) {
        data = localeData[localeParts.join('-')];

        if (data) {
          // Return the normalized locale string; e.g., we return "en-US",
          // instead of "en-us".
          return data.locale;
        }

        localeParts.pop();
      }
    }

    var defaultLocale = locales.pop();
    throw new Error('No locale data has been added to IntlMessageFormat for: ' + locales.join(', ') + ', or the default locale: ' + defaultLocale);
  };
})(core$1);

var en$1 = {};

(function (exports) {

  exports["default"] = {
    "locale": "en",
    "pluralRuleFunction": function pluralRuleFunction(n, ord) {
      var s = String(n).split("."),
          v0 = !s[1],
          t0 = Number(s[0]) == n,
          n10 = t0 && s[0].slice(-1),
          n100 = t0 && s[0].slice(-2);
      if (ord) return n10 == 1 && n100 != 11 ? "one" : n10 == 2 && n100 != 12 ? "two" : n10 == 3 && n100 != 13 ? "few" : "other";
      return n == 1 && v0 ? "one" : "other";
    }
  };
})(en$1);

/* jslint esnext: true */

(function (exports) {

  var src$core$$ = core$1,
      src$en$$ = en$1;

  src$core$$["default"].__addLocaleData(src$en$$["default"]);

  src$core$$["default"].defaultLocale = 'en';
  exports["default"] = src$core$$["default"];
})(main$1);

/* jshint node:true */

(function (module, exports) {

  var IntlMessageFormat = main$1['default']; // Add all locale data to `IntlMessageFormat`. This module will be ignored when
  // bundling for the browser with Browserify/Webpack.
  // Re-export `IntlMessageFormat` as the CommonJS default exports with all the
  // locale data registered, and with English set as the default locale. Define
  // the `default` prop for use with other compiled ES6 Modules.

  exports = module.exports = IntlMessageFormat;
  exports['default'] = exports;
})(intlMessageformat, intlMessageformat.exports);

var IntlMessageFormat = intlMessageformat.exports;

var intlRelativeformat = {exports: {}};

var main = {};

var core = {};

var diff = {};

/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/


Object.defineProperty(diff, "__esModule", {
  value: true
});
/* jslint esnext: true */

var round = Math.round;

function daysToYears(days) {
  // 400 years have 146097 days (taking into account leap year rules)
  return days * 400 / 146097;
} // Thanks to date-fns
// https://github.com/date-fns/date-fns
// MIT © Sasha Koss


var MILLISECONDS_IN_MINUTE = 60000;
var MILLISECONDS_IN_DAY = 86400000;

function startOfDay(dirtyDate) {
  var date = new Date(dirtyDate);
  date.setHours(0, 0, 0, 0);
  return date;
}

function differenceInCalendarDays(dirtyDateLeft, dirtyDateRight) {
  var startOfDayLeft = startOfDay(dirtyDateLeft);
  var startOfDayRight = startOfDay(dirtyDateRight);
  var timestampLeft = startOfDayLeft.getTime() - startOfDayLeft.getTimezoneOffset() * MILLISECONDS_IN_MINUTE;
  var timestampRight = startOfDayRight.getTime() - startOfDayRight.getTimezoneOffset() * MILLISECONDS_IN_MINUTE; // Round the number of days to the nearest integer
  // because the number of milliseconds in a day is not constant
  // (e.g. it's different in the day of the daylight saving time clock shift)

  return Math.round((timestampLeft - timestampRight) / MILLISECONDS_IN_DAY);
}

function default_1(from, to) {
  // Convert to ms timestamps.
  from = +from;
  to = +to;
  var millisecond = round(to - from),
      second = round(millisecond / 1000),
      minute = round(second / 60),
      hour = round(minute / 60); // We expect a more precision in rounding when dealing with
  // days as it feels wrong when something happended 13 hours ago and
  // is regarded as "yesterday" even if the time was this morning.

  var day = differenceInCalendarDays(to, from);
  var week = round(day / 7);
  var rawYears = daysToYears(day),
      month = round(rawYears * 12),
      year = round(rawYears);
  return {
    millisecond: millisecond,
    second: second,
    'second-short': second,
    minute: minute,
    'minute-short': minute,
    hour: hour,
    'hour-short': hour,
    day: day,
    'day-short': day,
    week: week,
    'week-short': week,
    month: month,
    'month-short': month,
    year: year,
    'year-short': year
  };
}

diff.default = default_1;

var es5 = {};

/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/


Object.defineProperty(es5, "__esModule", {
  value: true
});
/* jslint esnext: true */
// Purposely using the same implementation as the Intl.js `Intl` polyfill.
// Copyright 2013 Andy Earnshaw, MIT License

var hop = Object.prototype.hasOwnProperty;
var toString = Object.prototype.toString;

var realDefineProp = function () {
  try {
    return !!Object.defineProperty({}, 'a', {});
  } catch (e) {
    return false;
  }
}();
var defineProperty = realDefineProp ? Object.defineProperty : function (obj, name, desc) {
  if ('get' in desc && obj.__defineGetter__) {
    obj.__defineGetter__(name, desc.get);
  } else if (!hop.call(obj, name) || 'value' in desc) {
    obj[name] = desc.value;
  }
};
es5.defineProperty = defineProperty;

var objCreate = Object.create || function (proto, props) {
  var obj, k;

  function F() {}

  F.prototype = proto;
  obj = new F();

  for (k in props) {
    if (hop.call(props, k)) {
      defineProperty(obj, k, props[k]);
    }
  }

  return obj;
};

es5.objCreate = objCreate;

var arrIndexOf = Array.prototype.indexOf || function (search, fromIndex) {
  /*jshint validthis:true */
  var arr = this;

  if (!arr.length) {
    return -1;
  }

  for (var i = fromIndex || 0, max = arr.length; i < max; i++) {
    if (arr[i] === search) {
      return i;
    }
  }

  return -1;
};

es5.arrIndexOf = arrIndexOf;

var isArray = Array.isArray || function (obj) {
  return toString.call(obj) === '[object Array]';
};

es5.isArray = isArray;

var dateNow = Date.now || function () {
  return new Date().getTime();
};

es5.dateNow = dateNow;

/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/


Object.defineProperty(core, "__esModule", {
  value: true
});
/* jslint esnext: true */

var intl_messageformat_1 = intlMessageformat.exports;
var diff_1 = diff;
var es5_1 = es5;

core.default = RelativeFormat; // -----------------------------------------------------------------------------


var FIELDS = ['second', 'second-short', 'minute', 'minute-short', 'hour', 'hour-short', 'day', 'day-short', 'month', 'month-short', 'year', 'year-short'];
var STYLES = ['best fit', 'numeric']; // -- RelativeFormat -----------------------------------------------------------

function RelativeFormat(locales, options) {
  options = options || {}; // Make a copy of `locales` if it's an array, so that it doesn't change
  // since it's used lazily.

  if (es5_1.isArray(locales)) {
    locales = locales.concat();
  }

  es5_1.defineProperty(this, '_locale', {
    value: this._resolveLocale(locales)
  });
  es5_1.defineProperty(this, '_options', {
    value: {
      style: this._resolveStyle(options.style),
      units: this._isValidUnits(options.units) && options.units
    }
  });
  es5_1.defineProperty(this, '_locales', {
    value: locales
  });
  es5_1.defineProperty(this, '_fields', {
    value: this._findFields(this._locale)
  });
  es5_1.defineProperty(this, '_messages', {
    value: es5_1.objCreate(null)
  }); // "Bind" `format()` method to `this` so it can be passed by reference like
  // the other `Intl` APIs.

  var relativeFormat = this;

  this.format = function format(date, options) {
    return relativeFormat._format(date, options);
  };
} // Define internal private properties for dealing with locale data.


es5_1.defineProperty(RelativeFormat, '__localeData__', {
  value: es5_1.objCreate(null)
});
es5_1.defineProperty(RelativeFormat, '__addLocaleData', {
  value: function value() {
    for (var i = 0; i < arguments.length; i++) {
      var datum = arguments[i];

      if (!(datum && datum.locale)) {
        throw new Error('Locale data provided to IntlRelativeFormat is missing a ' + '`locale` property value');
      }

      RelativeFormat.__localeData__[datum.locale.toLowerCase()] = datum; // Add data to IntlMessageFormat.

      intl_messageformat_1.default.__addLocaleData(datum);
    }
  }
}); // Define public `defaultLocale` property which can be set by the developer, or
// it will be set when the first RelativeFormat instance is created by
// leveraging the resolved locale from `Intl`.

es5_1.defineProperty(RelativeFormat, 'defaultLocale', {
  enumerable: true,
  writable: true,
  value: undefined
}); // Define public `thresholds` property which can be set by the developer, and
// defaults to relative time thresholds from moment.js.

es5_1.defineProperty(RelativeFormat, 'thresholds', {
  enumerable: true,
  value: {
    second: 45,
    'second-short': 45,
    minute: 45,
    'minute-short': 45,
    hour: 22,
    'hour-short': 22,
    day: 26,
    'day-short': 26,
    month: 11,
    'month-short': 11 // months to year

  }
});

RelativeFormat.prototype.resolvedOptions = function () {
  return {
    locale: this._locale,
    style: this._options.style,
    units: this._options.units
  };
};

RelativeFormat.prototype._compileMessage = function (units) {
  // `this._locales` is the original set of locales the user specified to the
  // constructor, while `this._locale` is the resolved root locale.
  var locales = this._locales;
  this._locale;
  var field = this._fields[units];
  var relativeTime = field.relativeTime;
  var future = '';
  var past = '';
  var i;

  for (i in relativeTime.future) {
    if (relativeTime.future.hasOwnProperty(i)) {
      future += ' ' + i + ' {' + relativeTime.future[i].replace('{0}', '#') + '}';
    }
  }

  for (i in relativeTime.past) {
    if (relativeTime.past.hasOwnProperty(i)) {
      past += ' ' + i + ' {' + relativeTime.past[i].replace('{0}', '#') + '}';
    }
  }

  var message = '{when, select, future {{0, plural, ' + future + '}}' + 'past {{0, plural, ' + past + '}}}'; // Create the synthetic IntlMessageFormat instance using the original
  // locales value specified by the user when constructing the the parent
  // IntlRelativeFormat instance.

  return new intl_messageformat_1.default(message, locales);
};

RelativeFormat.prototype._getMessage = function (units) {
  var messages = this._messages; // Create a new synthetic message based on the locale data from CLDR.

  if (!messages[units]) {
    messages[units] = this._compileMessage(units);
  }

  return messages[units];
};

RelativeFormat.prototype._getRelativeUnits = function (diff, units) {
  var field = this._fields[units];

  if (field.relative) {
    return field.relative[diff];
  }
};

RelativeFormat.prototype._findFields = function (locale) {
  var localeData = RelativeFormat.__localeData__;
  var data = localeData[locale.toLowerCase()]; // The locale data is de-duplicated, so we have to traverse the locale's
  // hierarchy until we find `fields` to return.

  while (data) {
    if (data.fields) {
      return data.fields;
    }

    data = data.parentLocale && localeData[data.parentLocale.toLowerCase()];
  }

  throw new Error('Locale data added to IntlRelativeFormat is missing `fields` for :' + locale);
};

RelativeFormat.prototype._format = function (date, options) {
  var now = options && options.now !== undefined ? options.now : es5_1.dateNow();

  if (date === undefined) {
    date = now;
  } // Determine if the `date` and optional `now` values are valid, and throw a
  // similar error to what `Intl.DateTimeFormat#format()` would throw.


  if (!isFinite(now)) {
    throw new RangeError('The `now` option provided to IntlRelativeFormat#format() is not ' + 'in valid range.');
  }

  if (!isFinite(date)) {
    throw new RangeError('The date value provided to IntlRelativeFormat#format() is not ' + 'in valid range.');
  }

  var diffReport = diff_1.default(now, date);

  var units = this._options.units || this._selectUnits(diffReport);

  var diffInUnits = diffReport[units];

  if (this._options.style !== 'numeric') {
    var relativeUnits = this._getRelativeUnits(diffInUnits, units);

    if (relativeUnits) {
      return relativeUnits;
    }
  }

  return this._getMessage(units).format({
    '0': Math.abs(diffInUnits),
    when: diffInUnits < 0 ? 'past' : 'future'
  });
};

RelativeFormat.prototype._isValidUnits = function (units) {
  if (!units || es5_1.arrIndexOf.call(FIELDS, units) >= 0) {
    return true;
  }

  if (typeof units === 'string') {
    var suggestion = /s$/.test(units) && units.substr(0, units.length - 1);

    if (suggestion && es5_1.arrIndexOf.call(FIELDS, suggestion) >= 0) {
      throw new Error('"' + units + '" is not a valid IntlRelativeFormat `units` ' + 'value, did you mean: ' + suggestion);
    }
  }

  throw new Error('"' + units + '" is not a valid IntlRelativeFormat `units` value, it ' + 'must be one of: "' + FIELDS.join('", "') + '"');
};

RelativeFormat.prototype._resolveLocale = function (locales) {
  if (typeof locales === 'string') {
    locales = [locales];
  } // Create a copy of the array so we can push on the default locale.


  locales = (locales || []).concat(RelativeFormat.defaultLocale);
  var localeData = RelativeFormat.__localeData__;
  var i, len, localeParts, data; // Using the set of locales + the default locale, we look for the first one
  // which that has been registered. When data does not exist for a locale, we
  // traverse its ancestors to find something that's been registered within
  // its hierarchy of locales. Since we lack the proper `parentLocale` data
  // here, we must take a naive approach to traversal.

  for (i = 0, len = locales.length; i < len; i += 1) {
    localeParts = locales[i].toLowerCase().split('-');

    while (localeParts.length) {
      data = localeData[localeParts.join('-')];

      if (data) {
        // Return the normalized locale string; e.g., we return "en-US",
        // instead of "en-us".
        return data.locale;
      }

      localeParts.pop();
    }
  }

  var defaultLocale = locales.pop();
  throw new Error('No locale data has been added to IntlRelativeFormat for: ' + locales.join(', ') + ', or the default locale: ' + defaultLocale);
};

RelativeFormat.prototype._resolveStyle = function (style) {
  // Default to "best fit" style.
  if (!style) {
    return STYLES[0];
  }

  if (es5_1.arrIndexOf.call(STYLES, style) >= 0) {
    return style;
  }

  throw new Error('"' + style + '" is not a valid IntlRelativeFormat `style` value, it ' + 'must be one of: "' + STYLES.join('", "') + '"');
};

RelativeFormat.prototype._selectUnits = function (diffReport) {
  var i, l, units;
  var fields = FIELDS.filter(function (field) {
    return field.indexOf('-short') < 1;
  });

  for (i = 0, l = fields.length; i < l; i += 1) {
    units = fields[i];

    if (Math.abs(diffReport[units]) < RelativeFormat.thresholds[units]) {
      break;
    }
  }

  return units;
};

var en = {};

Object.defineProperty(en, "__esModule", {
  value: true
});
/* @generated */

en.default = {
  "locale": "en",
  "pluralRuleFunction": function pluralRuleFunction(n, ord) {
    var s = String(n).split('.'),
        v0 = !s[1],
        t0 = Number(s[0]) == n,
        n10 = t0 && s[0].slice(-1),
        n100 = t0 && s[0].slice(-2);
    if (ord) return n10 == 1 && n100 != 11 ? 'one' : n10 == 2 && n100 != 12 ? 'two' : n10 == 3 && n100 != 13 ? 'few' : 'other';
    return n == 1 && v0 ? 'one' : 'other';
  },
  "fields": {
    "year": {
      "displayName": "year",
      "relative": {
        "0": "this year",
        "1": "next year",
        "-1": "last year"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} year",
          "other": "in {0} years"
        },
        "past": {
          "one": "{0} year ago",
          "other": "{0} years ago"
        }
      }
    },
    "year-short": {
      "displayName": "yr.",
      "relative": {
        "0": "this yr.",
        "1": "next yr.",
        "-1": "last yr."
      },
      "relativeTime": {
        "future": {
          "one": "in {0} yr.",
          "other": "in {0} yr."
        },
        "past": {
          "one": "{0} yr. ago",
          "other": "{0} yr. ago"
        }
      }
    },
    "month": {
      "displayName": "month",
      "relative": {
        "0": "this month",
        "1": "next month",
        "-1": "last month"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} month",
          "other": "in {0} months"
        },
        "past": {
          "one": "{0} month ago",
          "other": "{0} months ago"
        }
      }
    },
    "month-short": {
      "displayName": "mo.",
      "relative": {
        "0": "this mo.",
        "1": "next mo.",
        "-1": "last mo."
      },
      "relativeTime": {
        "future": {
          "one": "in {0} mo.",
          "other": "in {0} mo."
        },
        "past": {
          "one": "{0} mo. ago",
          "other": "{0} mo. ago"
        }
      }
    },
    "week": {
      "displayName": "week",
      "relativePeriod": "the week of {0}",
      "relative": {
        "0": "this week",
        "1": "next week",
        "-1": "last week"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} week",
          "other": "in {0} weeks"
        },
        "past": {
          "one": "{0} week ago",
          "other": "{0} weeks ago"
        }
      }
    },
    "week-short": {
      "displayName": "wk.",
      "relativePeriod": "the week of {0}",
      "relative": {
        "0": "this wk.",
        "1": "next wk.",
        "-1": "last wk."
      },
      "relativeTime": {
        "future": {
          "one": "in {0} wk.",
          "other": "in {0} wk."
        },
        "past": {
          "one": "{0} wk. ago",
          "other": "{0} wk. ago"
        }
      }
    },
    "day": {
      "displayName": "day",
      "relative": {
        "0": "today",
        "1": "tomorrow",
        "-1": "yesterday"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} day",
          "other": "in {0} days"
        },
        "past": {
          "one": "{0} day ago",
          "other": "{0} days ago"
        }
      }
    },
    "day-short": {
      "displayName": "day",
      "relative": {
        "0": "today",
        "1": "tomorrow",
        "-1": "yesterday"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} day",
          "other": "in {0} days"
        },
        "past": {
          "one": "{0} day ago",
          "other": "{0} days ago"
        }
      }
    },
    "hour": {
      "displayName": "hour",
      "relative": {
        "0": "this hour"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} hour",
          "other": "in {0} hours"
        },
        "past": {
          "one": "{0} hour ago",
          "other": "{0} hours ago"
        }
      }
    },
    "hour-short": {
      "displayName": "hr.",
      "relative": {
        "0": "this hour"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} hr.",
          "other": "in {0} hr."
        },
        "past": {
          "one": "{0} hr. ago",
          "other": "{0} hr. ago"
        }
      }
    },
    "minute": {
      "displayName": "minute",
      "relative": {
        "0": "this minute"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} minute",
          "other": "in {0} minutes"
        },
        "past": {
          "one": "{0} minute ago",
          "other": "{0} minutes ago"
        }
      }
    },
    "minute-short": {
      "displayName": "min.",
      "relative": {
        "0": "this minute"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} min.",
          "other": "in {0} min."
        },
        "past": {
          "one": "{0} min. ago",
          "other": "{0} min. ago"
        }
      }
    },
    "second": {
      "displayName": "second",
      "relative": {
        "0": "now"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} second",
          "other": "in {0} seconds"
        },
        "past": {
          "one": "{0} second ago",
          "other": "{0} seconds ago"
        }
      }
    },
    "second-short": {
      "displayName": "sec.",
      "relative": {
        "0": "now"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} sec.",
          "other": "in {0} sec."
        },
        "past": {
          "one": "{0} sec. ago",
          "other": "{0} sec. ago"
        }
      }
    }
  }
};

/* jslint esnext: true */


Object.defineProperty(main, "__esModule", {
  value: true
});
var core_1 = core;
var en_1 = en;

core_1.default.__addLocaleData(en_1.default);

core_1.default.defaultLocale = 'en';

main.default = core_1.default;

/* jshint node:true */

(function (module, exports) {

  var IntlRelativeFormat = main['default']; // Add all locale data to `IntlRelativeFormat`. This module will be ignored when
  // bundling for the browser with Browserify/Webpack.
  // Re-export `IntlRelativeFormat` as the CommonJS default exports with all the
  // locale data registered, and with English set as the default locale. Define
  // the `default` prop for use with other compiled ES6 Modules.

  exports = module.exports = IntlRelativeFormat;
  exports['default'] = exports;
})(intlRelativeformat, intlRelativeformat.exports);

var IntlRelativeFormat = intlRelativeformat.exports;

var propTypes = {exports: {}};

var reactIs = {exports: {}};

var reactIs_production_min = {};

Object.defineProperty(reactIs_production_min, "__esModule", {
  value: !0
});
var b = "function" === typeof Symbol && Symbol.for,
    c = b ? Symbol.for("react.element") : 60103,
    d = b ? Symbol.for("react.portal") : 60106,
    e = b ? Symbol.for("react.fragment") : 60107,
    f = b ? Symbol.for("react.strict_mode") : 60108,
    g = b ? Symbol.for("react.profiler") : 60114,
    h = b ? Symbol.for("react.provider") : 60109,
    k = b ? Symbol.for("react.context") : 60110,
    l = b ? Symbol.for("react.async_mode") : 60111,
    m = b ? Symbol.for("react.concurrent_mode") : 60111,
    n = b ? Symbol.for("react.forward_ref") : 60112,
    p = b ? Symbol.for("react.suspense") : 60113,
    q = b ? Symbol.for("react.suspense_list") : 60120,
    r = b ? Symbol.for("react.memo") : 60115,
    t = b ? Symbol.for("react.lazy") : 60116,
    v = b ? Symbol.for("react.fundamental") : 60117,
    w = b ? Symbol.for("react.responder") : 60118,
    x = b ? Symbol.for("react.scope") : 60119;

function y(a) {
  if ("object" === _typeof$1(a) && null !== a) {
    var u = a.$$typeof;

    switch (u) {
      case c:
        switch (a = a.type, a) {
          case l:
          case m:
          case e:
          case g:
          case f:
          case p:
            return a;

          default:
            switch (a = a && a.$$typeof, a) {
              case k:
              case n:
              case h:
                return a;

              default:
                return u;
            }

        }

      case t:
      case r:
      case d:
        return u;
    }
  }
}

function z(a) {
  return y(a) === m;
}

reactIs_production_min.typeOf = y;
reactIs_production_min.AsyncMode = l;
reactIs_production_min.ConcurrentMode = m;
reactIs_production_min.ContextConsumer = k;
reactIs_production_min.ContextProvider = h;
reactIs_production_min.Element = c;
reactIs_production_min.ForwardRef = n;
reactIs_production_min.Fragment = e;
reactIs_production_min.Lazy = t;
reactIs_production_min.Memo = r;
reactIs_production_min.Portal = d;
reactIs_production_min.Profiler = g;
reactIs_production_min.StrictMode = f;
reactIs_production_min.Suspense = p;

reactIs_production_min.isValidElementType = function (a) {
  return "string" === typeof a || "function" === typeof a || a === e || a === m || a === g || a === f || a === p || a === q || "object" === _typeof$1(a) && null !== a && (a.$$typeof === t || a.$$typeof === r || a.$$typeof === h || a.$$typeof === k || a.$$typeof === n || a.$$typeof === v || a.$$typeof === w || a.$$typeof === x);
};

reactIs_production_min.isAsyncMode = function (a) {
  return z(a) || y(a) === l;
};

reactIs_production_min.isConcurrentMode = z;

reactIs_production_min.isContextConsumer = function (a) {
  return y(a) === k;
};

reactIs_production_min.isContextProvider = function (a) {
  return y(a) === h;
};

reactIs_production_min.isElement = function (a) {
  return "object" === _typeof$1(a) && null !== a && a.$$typeof === c;
};

reactIs_production_min.isForwardRef = function (a) {
  return y(a) === n;
};

reactIs_production_min.isFragment = function (a) {
  return y(a) === e;
};

reactIs_production_min.isLazy = function (a) {
  return y(a) === t;
};

reactIs_production_min.isMemo = function (a) {
  return y(a) === r;
};

reactIs_production_min.isPortal = function (a) {
  return y(a) === d;
};

reactIs_production_min.isProfiler = function (a) {
  return y(a) === g;
};

reactIs_production_min.isStrictMode = function (a) {
  return y(a) === f;
};

reactIs_production_min.isSuspense = function (a) {
  return y(a) === p;
};

var reactIs_development = {};

(function (exports) {

  {
    (function () {

      Object.defineProperty(exports, '__esModule', {
        value: true
      }); // The Symbol used to tag the ReactElement-like types. If there is no native Symbol
      // nor polyfill, then a plain number is used for performance.

      var hasSymbol = typeof Symbol === 'function' && Symbol.for;
      var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
      var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
      var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
      var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
      var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
      var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
      var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace; // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
      // (unstable) APIs that have been removed. Can we remove the symbols?

      var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
      var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
      var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
      var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
      var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 0xead8;
      var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
      var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
      var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5;
      var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for('react.responder') : 0xead6;
      var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for('react.scope') : 0xead7;

      function isValidElementType(type) {
        return typeof type === 'string' || typeof type === 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
        type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || _typeof$1(type) === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE);
      }
      /**
       * Forked from fbjs/warning:
       * https://github.com/facebook/fbjs/blob/e66ba20ad5be433eb54423f2b097d829324d9de6/packages/fbjs/src/__forks__/warning.js
       *
       * Only change is we use console.warn instead of console.error,
       * and do nothing when 'console' is not supported.
       * This really simplifies the code.
       * ---
       * Similar to invariant but only logs a warning if the condition is not met.
       * This can be used to log issues in development environments in critical
       * paths. Removing the logging code for production environments will keep the
       * same logic and follow the same code paths.
       */


      var lowPriorityWarningWithoutStack = function lowPriorityWarningWithoutStack() {};

      {
        var printWarning = function printWarning(format) {
          for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
          }

          var argIndex = 0;
          var message = 'Warning: ' + format.replace(/%s/g, function () {
            return args[argIndex++];
          });

          if (typeof console !== 'undefined') {
            console.warn(message);
          }

          try {
            // --- Welcome to debugging React ---
            // This error was thrown as a convenience so that you can use this stack
            // to find the callsite that caused this warning to fire.
            throw new Error(message);
          } catch (x) {}
        };

        lowPriorityWarningWithoutStack = function lowPriorityWarningWithoutStack(condition, format) {
          if (format === undefined) {
            throw new Error('`lowPriorityWarningWithoutStack(condition, format, ...args)` requires a warning ' + 'message argument');
          }

          if (!condition) {
            for (var _len2 = arguments.length, args = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
              args[_key2 - 2] = arguments[_key2];
            }

            printWarning.apply(void 0, [format].concat(args));
          }
        };
      }
      var lowPriorityWarningWithoutStack$1 = lowPriorityWarningWithoutStack;

      function typeOf(object) {
        if (_typeof$1(object) === 'object' && object !== null) {
          var $$typeof = object.$$typeof;

          switch ($$typeof) {
            case REACT_ELEMENT_TYPE:
              var type = object.type;

              switch (type) {
                case REACT_ASYNC_MODE_TYPE:
                case REACT_CONCURRENT_MODE_TYPE:
                case REACT_FRAGMENT_TYPE:
                case REACT_PROFILER_TYPE:
                case REACT_STRICT_MODE_TYPE:
                case REACT_SUSPENSE_TYPE:
                  return type;

                default:
                  var $$typeofType = type && type.$$typeof;

                  switch ($$typeofType) {
                    case REACT_CONTEXT_TYPE:
                    case REACT_FORWARD_REF_TYPE:
                    case REACT_PROVIDER_TYPE:
                      return $$typeofType;

                    default:
                      return $$typeof;
                  }

              }

            case REACT_LAZY_TYPE:
            case REACT_MEMO_TYPE:
            case REACT_PORTAL_TYPE:
              return $$typeof;
          }
        }

        return undefined;
      } // AsyncMode is deprecated along with isAsyncMode


      var AsyncMode = REACT_ASYNC_MODE_TYPE;
      var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
      var ContextConsumer = REACT_CONTEXT_TYPE;
      var ContextProvider = REACT_PROVIDER_TYPE;
      var Element = REACT_ELEMENT_TYPE;
      var ForwardRef = REACT_FORWARD_REF_TYPE;
      var Fragment = REACT_FRAGMENT_TYPE;
      var Lazy = REACT_LAZY_TYPE;
      var Memo = REACT_MEMO_TYPE;
      var Portal = REACT_PORTAL_TYPE;
      var Profiler = REACT_PROFILER_TYPE;
      var StrictMode = REACT_STRICT_MODE_TYPE;
      var Suspense = REACT_SUSPENSE_TYPE;
      var hasWarnedAboutDeprecatedIsAsyncMode = false; // AsyncMode should be deprecated

      function isAsyncMode(object) {
        {
          if (!hasWarnedAboutDeprecatedIsAsyncMode) {
            hasWarnedAboutDeprecatedIsAsyncMode = true;
            lowPriorityWarningWithoutStack$1(false, 'The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
          }
        }
        return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
      }

      function isConcurrentMode(object) {
        return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
      }

      function isContextConsumer(object) {
        return typeOf(object) === REACT_CONTEXT_TYPE;
      }

      function isContextProvider(object) {
        return typeOf(object) === REACT_PROVIDER_TYPE;
      }

      function isElement(object) {
        return _typeof$1(object) === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
      }

      function isForwardRef(object) {
        return typeOf(object) === REACT_FORWARD_REF_TYPE;
      }

      function isFragment(object) {
        return typeOf(object) === REACT_FRAGMENT_TYPE;
      }

      function isLazy(object) {
        return typeOf(object) === REACT_LAZY_TYPE;
      }

      function isMemo(object) {
        return typeOf(object) === REACT_MEMO_TYPE;
      }

      function isPortal(object) {
        return typeOf(object) === REACT_PORTAL_TYPE;
      }

      function isProfiler(object) {
        return typeOf(object) === REACT_PROFILER_TYPE;
      }

      function isStrictMode(object) {
        return typeOf(object) === REACT_STRICT_MODE_TYPE;
      }

      function isSuspense(object) {
        return typeOf(object) === REACT_SUSPENSE_TYPE;
      }

      exports.typeOf = typeOf;
      exports.AsyncMode = AsyncMode;
      exports.ConcurrentMode = ConcurrentMode;
      exports.ContextConsumer = ContextConsumer;
      exports.ContextProvider = ContextProvider;
      exports.Element = Element;
      exports.ForwardRef = ForwardRef;
      exports.Fragment = Fragment;
      exports.Lazy = Lazy;
      exports.Memo = Memo;
      exports.Portal = Portal;
      exports.Profiler = Profiler;
      exports.StrictMode = StrictMode;
      exports.Suspense = Suspense;
      exports.isValidElementType = isValidElementType;
      exports.isAsyncMode = isAsyncMode;
      exports.isConcurrentMode = isConcurrentMode;
      exports.isContextConsumer = isContextConsumer;
      exports.isContextProvider = isContextProvider;
      exports.isElement = isElement;
      exports.isForwardRef = isForwardRef;
      exports.isFragment = isFragment;
      exports.isLazy = isLazy;
      exports.isMemo = isMemo;
      exports.isPortal = isPortal;
      exports.isProfiler = isProfiler;
      exports.isStrictMode = isStrictMode;
      exports.isSuspense = isSuspense;
    })();
  }
})(reactIs_development);

{
  reactIs.exports = reactIs_development;
}

var ReactIs$2 = reactIs.exports;
var assign = objectAssign;
var ReactPropTypesSecret = ReactPropTypesSecret_1;
var checkPropTypes = checkPropTypes_1;
var has = Function.call.bind(Object.prototype.hasOwnProperty);

var printWarning = function printWarning() {};

{
  printWarning = function printWarning(text) {
    var message = 'Warning: ' + text;

    if (typeof console !== 'undefined') {
      console.error(message);
    }

    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

function emptyFunctionThatReturnsNull() {
  return null;
}

var factoryWithTypeCheckers = function factoryWithTypeCheckers(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */

  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);

    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }
  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */


  var ANONYMOUS = '<<anonymous>>'; // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.

  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),
    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    elementType: createElementTypeTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker
  };
  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */

  /*eslint-disable no-self-compare*/

  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */


  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  } // Make `instanceof Error` still work for returned errors.


  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }

    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          var err = new Error('Calling PropTypes validators directly is not supported by the `prop-types` package. ' + 'Use `PropTypes.checkPropTypes()` to call them. ' + 'Read more at http://fb.me/use-check-prop-types');
          err.name = 'Invariant Violation';
          throw err;
        } else if (typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;

          if (!manualPropTypeCallCache[cacheKey] && // Avoid spamming the console because they are often not actionable except for lib authors
          manualPropTypeWarningCount < 3) {
            printWarning('You are manually calling a React.PropTypes validation ' + 'function for the `' + propFullName + '` prop on `' + componentName + '`. This is deprecated ' + 'and will throw in the standalone `prop-types` package. ' + 'You may be seeing this warning due to a third-party PropTypes ' + 'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.');
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }

      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }

          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }

        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);
    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);

      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }

      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunctionThatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }

      var propValue = props[propName];

      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }

      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);

        if (error instanceof Error) {
          return error;
        }
      }

      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];

      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }

      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function createElementTypeTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];

      if (!ReactIs$2.isValidElementType(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement type.'));
      }

      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }

      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      {
        if (arguments.length > 1) {
          printWarning('Invalid arguments supplied to oneOf, expected an array, got ' + arguments.length + ' arguments. ' + 'A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).');
        } else {
          printWarning('Invalid argument supplied to oneOf, expected an array.');
        }
      }

      return emptyFunctionThatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];

      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues, function replacer(key, value) {
        var type = getPreciseType(value);

        if (type === 'symbol') {
          return String(value);
        }

        return value;
      });
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + String(propValue) + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }

    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }

      var propValue = props[propName];
      var propType = getPropType(propValue);

      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }

      for (var key in propValue) {
        if (has(propValue, key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);

          if (error instanceof Error) {
            return error;
          }
        }
      }

      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      printWarning('Invalid argument supplied to oneOfType, expected an instance of array.') ;
      return emptyFunctionThatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];

      if (typeof checker !== 'function') {
        printWarning('Invalid argument supplied to oneOfType. Expected an array of check functions, but ' + 'received ' + getPostfixForTypeWarning(checker) + ' at index ' + i + '.');
        return emptyFunctionThatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];

        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }

    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }

      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);

      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }

      for (var key in shapeTypes) {
        var checker = shapeTypes[key];

        if (!checker) {
          continue;
        }

        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);

        if (error) {
          return error;
        }
      }

      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);

      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      } // We need to check all keys in case some are required but missing from
      // props.


      var allKeys = assign({}, props[propName], shapeTypes);

      for (var key in allKeys) {
        var checker = shapeTypes[key];

        if (!checker) {
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' + '\nBad object: ' + JSON.stringify(props[propName], null, '  ') + '\nValid keys: ' + JSON.stringify(Object.keys(shapeTypes), null, '  '));
        }

        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);

        if (error) {
          return error;
        }
      }

      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (_typeof$1(propValue)) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;

      case 'boolean':
        return !propValue;

      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }

        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);

        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;

          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;

              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;

      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    } // falsy value can't be a Symbol


    if (!propValue) {
      return false;
    } // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'


    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    } // Fallback for non-spec compliant Symbols which are polyfilled.


    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  } // Equivalent of `typeof` but with special handling for array and regexp.


  function getPropType(propValue) {
    var propType = _typeof$1(propValue);

    if (Array.isArray(propValue)) {
      return 'array';
    }

    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }

    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }

    return propType;
  } // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.


  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }

    var propType = getPropType(propValue);

    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }

    return propType;
  } // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"


  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);

    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;

      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;

      default:
        return type;
    }
  } // Returns class name of the object, if any.


  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }

    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.resetWarningCache = checkPropTypes.resetWarningCache;
  ReactPropTypes.PropTypes = ReactPropTypes;
  return ReactPropTypes;
};

{
  var ReactIs$1 = reactIs.exports; // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod

  var throwOnDirectAccess = true;
  propTypes.exports = factoryWithTypeCheckers(ReactIs$1.isElement, throwOnDirectAccess);
}

var PropTypes = propTypes.exports;

/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */


var ReactIs = reactIs.exports;
var FORWARD_REF_STATICS = {
  '$$typeof': true,
  render: true,
  defaultProps: true,
  displayName: true,
  propTypes: true
};
var TYPE_STATICS = {};
TYPE_STATICS[ReactIs.ForwardRef] = FORWARD_REF_STATICS;

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */


var invariant = function invariant(condition, format, a, b, c, d, e, f) {
  {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;

    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame

    throw error;
  }
};

var browser = invariant;

function getCacheId(inputs) {
  return JSON.stringify(inputs.map(function (input) {
    return input && _typeof$1(input) === 'object' ? orderedProps(input) : input;
  }));
}

function orderedProps(obj) {
  return Object.keys(obj).sort().map(function (k) {
    var _a;

    return _a = {}, _a[k] = obj[k], _a;
  });
}

var memoizeFormatConstructor = function memoizeFormatConstructor(FormatConstructor, cache) {
  if (cache === void 0) {
    cache = {};
  }

  return function () {
    var _a;

    var args = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }

    var cacheId = getCacheId(args);
    var format = cacheId && cache[cacheId];

    if (!format) {
      format = new ((_a = FormatConstructor).bind.apply(_a, [void 0].concat(args)))();

      if (cacheId) {
        cache[cacheId] = format;
      }
    }

    return format;
  };
};

var defaultLocaleData = {
  "locale": "en",
  "pluralRuleFunction": function pluralRuleFunction(n, ord) {
    var s = String(n).split("."),
        v0 = !s[1],
        t0 = Number(s[0]) == n,
        n10 = t0 && s[0].slice(-1),
        n100 = t0 && s[0].slice(-2);
    if (ord) return n10 == 1 && n100 != 11 ? "one" : n10 == 2 && n100 != 12 ? "two" : n10 == 3 && n100 != 13 ? "few" : "other";
    return n == 1 && v0 ? "one" : "other";
  },
  "fields": {
    "year": {
      "displayName": "year",
      "relative": {
        "0": "this year",
        "1": "next year",
        "-1": "last year"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} year",
          "other": "in {0} years"
        },
        "past": {
          "one": "{0} year ago",
          "other": "{0} years ago"
        }
      }
    },
    "year-short": {
      "displayName": "yr.",
      "relative": {
        "0": "this yr.",
        "1": "next yr.",
        "-1": "last yr."
      },
      "relativeTime": {
        "future": {
          "one": "in {0} yr.",
          "other": "in {0} yr."
        },
        "past": {
          "one": "{0} yr. ago",
          "other": "{0} yr. ago"
        }
      }
    },
    "month": {
      "displayName": "month",
      "relative": {
        "0": "this month",
        "1": "next month",
        "-1": "last month"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} month",
          "other": "in {0} months"
        },
        "past": {
          "one": "{0} month ago",
          "other": "{0} months ago"
        }
      }
    },
    "month-short": {
      "displayName": "mo.",
      "relative": {
        "0": "this mo.",
        "1": "next mo.",
        "-1": "last mo."
      },
      "relativeTime": {
        "future": {
          "one": "in {0} mo.",
          "other": "in {0} mo."
        },
        "past": {
          "one": "{0} mo. ago",
          "other": "{0} mo. ago"
        }
      }
    },
    "day": {
      "displayName": "day",
      "relative": {
        "0": "today",
        "1": "tomorrow",
        "-1": "yesterday"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} day",
          "other": "in {0} days"
        },
        "past": {
          "one": "{0} day ago",
          "other": "{0} days ago"
        }
      }
    },
    "day-short": {
      "displayName": "day",
      "relative": {
        "0": "today",
        "1": "tomorrow",
        "-1": "yesterday"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} day",
          "other": "in {0} days"
        },
        "past": {
          "one": "{0} day ago",
          "other": "{0} days ago"
        }
      }
    },
    "hour": {
      "displayName": "hour",
      "relative": {
        "0": "this hour"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} hour",
          "other": "in {0} hours"
        },
        "past": {
          "one": "{0} hour ago",
          "other": "{0} hours ago"
        }
      }
    },
    "hour-short": {
      "displayName": "hr.",
      "relative": {
        "0": "this hour"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} hr.",
          "other": "in {0} hr."
        },
        "past": {
          "one": "{0} hr. ago",
          "other": "{0} hr. ago"
        }
      }
    },
    "minute": {
      "displayName": "minute",
      "relative": {
        "0": "this minute"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} minute",
          "other": "in {0} minutes"
        },
        "past": {
          "one": "{0} minute ago",
          "other": "{0} minutes ago"
        }
      }
    },
    "minute-short": {
      "displayName": "min.",
      "relative": {
        "0": "this minute"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} min.",
          "other": "in {0} min."
        },
        "past": {
          "one": "{0} min. ago",
          "other": "{0} min. ago"
        }
      }
    },
    "second": {
      "displayName": "second",
      "relative": {
        "0": "now"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} second",
          "other": "in {0} seconds"
        },
        "past": {
          "one": "{0} second ago",
          "other": "{0} seconds ago"
        }
      }
    },
    "second-short": {
      "displayName": "sec.",
      "relative": {
        "0": "now"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} sec.",
          "other": "in {0} sec."
        },
        "past": {
          "one": "{0} sec. ago",
          "other": "{0} sec. ago"
        }
      }
    }
  }
};
/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

function addLocaleData() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var locales = Array.isArray(data) ? data : [data];
  locales.forEach(function (localeData) {
    if (localeData && localeData.locale) {
      IntlMessageFormat.__addLocaleData(localeData);

      IntlRelativeFormat.__addLocaleData(localeData);
    }
  });
}

function hasLocaleData(locale) {
  var localeParts = (locale || '').split('-');

  while (localeParts.length > 0) {
    if (hasIMFAndIRFLocaleData(localeParts.join('-'))) {
      return true;
    }

    localeParts.pop();
  }

  return false;
}

function hasIMFAndIRFLocaleData(locale) {
  var normalizedLocale = locale && locale.toLowerCase();
  return !!(IntlMessageFormat.__localeData__[normalizedLocale] && IntlRelativeFormat.__localeData__[normalizedLocale]);
}

var _typeof = typeof Symbol === "function" && _typeof$1(Symbol.iterator) === "symbol" ? function (obj) {
  return _typeof$1(obj);
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof$1(obj);
};

var classCallCheck = function classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var inherits = function inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + _typeof$1(superClass));
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var objectWithoutProperties = function objectWithoutProperties(obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var possibleConstructorReturn = function possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (_typeof$1(call) === "object" || typeof call === "function") ? call : self;
};

var toConsumableArray = function toConsumableArray(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  } else {
    return Array.from(arr);
  }
};
/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */


var bool = PropTypes.bool;
var number = PropTypes.number;
var string = PropTypes.string;
var func = PropTypes.func;
var object = PropTypes.object;
var oneOf = PropTypes.oneOf;
var shape = PropTypes.shape;
var any = PropTypes.any;
var oneOfType = PropTypes.oneOfType;
var localeMatcher = oneOf(['best fit', 'lookup']);
var narrowShortLong = oneOf(['narrow', 'short', 'long']);
var numeric2digit = oneOf(['numeric', '2-digit']);
var funcReq = func.isRequired;
var intlConfigPropTypes = {
  locale: string,
  timeZone: string,
  formats: object,
  messages: object,
  textComponent: any,
  defaultLocale: string,
  defaultFormats: object,
  onError: func
};
var intlFormatPropTypes = {
  formatDate: funcReq,
  formatTime: funcReq,
  formatRelative: funcReq,
  formatNumber: funcReq,
  formatPlural: funcReq,
  formatMessage: funcReq,
  formatHTMLMessage: funcReq
};
var intlShape = shape(_extends({}, intlConfigPropTypes, intlFormatPropTypes, {
  formatters: object,
  now: funcReq
}));
var messageDescriptorPropTypes = {
  id: string.isRequired,
  description: oneOfType([string, object]),
  defaultMessage: string
};
var dateTimeFormatPropTypes = {
  localeMatcher: localeMatcher,
  formatMatcher: oneOf(['basic', 'best fit']),
  timeZone: string,
  hour12: bool,
  weekday: narrowShortLong,
  era: narrowShortLong,
  year: numeric2digit,
  month: oneOf(['numeric', '2-digit', 'narrow', 'short', 'long']),
  day: numeric2digit,
  hour: numeric2digit,
  minute: numeric2digit,
  second: numeric2digit,
  timeZoneName: oneOf(['short', 'long'])
};
var numberFormatPropTypes = {
  localeMatcher: localeMatcher,
  style: oneOf(['decimal', 'currency', 'percent']),
  currency: string,
  currencyDisplay: oneOf(['symbol', 'code', 'name']),
  useGrouping: bool,
  minimumIntegerDigits: number,
  minimumFractionDigits: number,
  maximumFractionDigits: number,
  minimumSignificantDigits: number,
  maximumSignificantDigits: number
};
var relativeFormatPropTypes = {
  style: oneOf(['best fit', 'numeric']),
  units: oneOf(['second', 'minute', 'hour', 'day', 'month', 'year', 'second-short', 'minute-short', 'hour-short', 'day-short', 'month-short', 'year-short'])
};
var pluralFormatPropTypes = {
  style: oneOf(['cardinal', 'ordinal'])
};
/*
HTML escaping and shallow-equals implementations are the same as React's
(on purpose.) Therefore, it has the following Copyright and Licensing:

Copyright 2013-2014, Facebook, Inc.
All rights reserved.

This source code is licensed under the BSD-style license found in the LICENSE
file in the root directory of React's source tree.
*/

var intlConfigPropNames = Object.keys(intlConfigPropTypes);
var ESCAPED_CHARS = {
  '&': '&amp;',
  '>': '&gt;',
  '<': '&lt;',
  '"': '&quot;',
  "'": '&#x27;'
};
var UNSAFE_CHARS_REGEX = /[&><"']/g;

function escape(str) {
  return ('' + str).replace(UNSAFE_CHARS_REGEX, function (match) {
    return ESCAPED_CHARS[match];
  });
}

function filterProps(props, whitelist) {
  var defaults$$1 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return whitelist.reduce(function (filtered, name) {
    if (props.hasOwnProperty(name)) {
      filtered[name] = props[name];
    } else if (defaults$$1.hasOwnProperty(name)) {
      filtered[name] = defaults$$1[name];
    }

    return filtered;
  }, {});
}

function invariantIntlContext() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      intl = _ref.intl;

  browser(intl, '[React Intl] Could not find required `intl` object. ' + '<IntlProvider> needs to exist in the component ancestry.');
}

function shallowEquals(objA, objB) {
  if (objA === objB) {
    return true;
  }

  if ((typeof objA === 'undefined' ? 'undefined' : _typeof(objA)) !== 'object' || objA === null || (typeof objB === 'undefined' ? 'undefined' : _typeof(objB)) !== 'object' || objB === null) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  } // Test for A's keys different from B.


  var bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);

  for (var i = 0; i < keysA.length; i++) {
    if (!bHasOwnProperty(keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
      return false;
    }
  }

  return true;
}

function shouldIntlComponentUpdate(_ref2, nextProps, nextState) {
  var props = _ref2.props,
      state = _ref2.state,
      _ref2$context = _ref2.context,
      context = _ref2$context === undefined ? {} : _ref2$context;
  var nextContext = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var _context$intl = context.intl,
      intl = _context$intl === undefined ? {} : _context$intl;
  var _nextContext$intl = nextContext.intl,
      nextIntl = _nextContext$intl === undefined ? {} : _nextContext$intl;
  return !shallowEquals(nextProps, props) || !shallowEquals(nextState, state) || !(nextIntl === intl || shallowEquals(filterProps(nextIntl, intlConfigPropNames), filterProps(intl, intlConfigPropNames)));
}

function createError(message, exception) {
  var eMsg = exception ? '\n' + exception : '';
  return '[React Intl] ' + message + eMsg;
}

function defaultErrorHandler(error) {
  {
    console.error(error);
  }
}
/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */
// This is a "hack" until a proper `intl-pluralformat` package is created.


function resolveLocale(locales) {
  // IntlMessageFormat#_resolveLocale() does not depend on `this`.
  return IntlMessageFormat.prototype._resolveLocale(locales);
}

function findPluralFunction(locale) {
  // IntlMessageFormat#_findPluralFunction() does not depend on `this`.
  return IntlMessageFormat.prototype._findPluralRuleFunction(locale);
}

var IntlPluralFormat = function IntlPluralFormat(locales) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  classCallCheck(this, IntlPluralFormat);
  var useOrdinal = options.style === 'ordinal';
  var pluralFn = findPluralFunction(resolveLocale(locales));

  this.format = function (value) {
    return pluralFn(value, useOrdinal);
  };
};
/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */


var DATE_TIME_FORMAT_OPTIONS = Object.keys(dateTimeFormatPropTypes);
var NUMBER_FORMAT_OPTIONS = Object.keys(numberFormatPropTypes);
var RELATIVE_FORMAT_OPTIONS = Object.keys(relativeFormatPropTypes);
var PLURAL_FORMAT_OPTIONS = Object.keys(pluralFormatPropTypes);
var RELATIVE_FORMAT_THRESHOLDS = {
  second: 60,
  // seconds to minute
  minute: 60,
  // minutes to hour
  hour: 24,
  // hours to day
  day: 30,
  // days to month
  month: 12
};

function updateRelativeFormatThresholds(newThresholds) {
  var thresholds = IntlRelativeFormat.thresholds;
  thresholds.second = newThresholds.second;
  thresholds.minute = newThresholds.minute;
  thresholds.hour = newThresholds.hour;
  thresholds.day = newThresholds.day;
  thresholds.month = newThresholds.month;
  thresholds['second-short'] = newThresholds['second-short'];
  thresholds['minute-short'] = newThresholds['minute-short'];
  thresholds['hour-short'] = newThresholds['hour-short'];
  thresholds['day-short'] = newThresholds['day-short'];
  thresholds['month-short'] = newThresholds['month-short'];
}

function getNamedFormat(formats, type, name, onError) {
  var format = formats && formats[type] && formats[type][name];

  if (format) {
    return format;
  }

  onError(createError('No ' + type + ' format named: ' + name));
}

function formatDate(config, state, value) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var locale = config.locale,
      formats = config.formats,
      timeZone = config.timeZone;
  var format = options.format;
  var onError = config.onError || defaultErrorHandler;
  var date = new Date(value);

  var defaults$$1 = _extends({}, timeZone && {
    timeZone: timeZone
  }, format && getNamedFormat(formats, 'date', format, onError));

  var filteredOptions = filterProps(options, DATE_TIME_FORMAT_OPTIONS, defaults$$1);

  try {
    return state.getDateTimeFormat(locale, filteredOptions).format(date);
  } catch (e) {
    onError(createError('Error formatting date.', e));
  }

  return String(date);
}

function formatTime(config, state, value) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var locale = config.locale,
      formats = config.formats,
      timeZone = config.timeZone;
  var format = options.format;
  var onError = config.onError || defaultErrorHandler;
  var date = new Date(value);

  var defaults$$1 = _extends({}, timeZone && {
    timeZone: timeZone
  }, format && getNamedFormat(formats, 'time', format, onError));

  var filteredOptions = filterProps(options, DATE_TIME_FORMAT_OPTIONS, defaults$$1);

  if (!filteredOptions.hour && !filteredOptions.minute && !filteredOptions.second) {
    // Add default formatting options if hour, minute, or second isn't defined.
    filteredOptions = _extends({}, filteredOptions, {
      hour: 'numeric',
      minute: 'numeric'
    });
  }

  try {
    return state.getDateTimeFormat(locale, filteredOptions).format(date);
  } catch (e) {
    onError(createError('Error formatting time.', e));
  }

  return String(date);
}

function formatRelative(config, state, value) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var locale = config.locale,
      formats = config.formats;
  var format = options.format;
  var onError = config.onError || defaultErrorHandler;
  var date = new Date(value);
  var now = new Date(options.now);
  var defaults$$1 = format && getNamedFormat(formats, 'relative', format, onError);
  var filteredOptions = filterProps(options, RELATIVE_FORMAT_OPTIONS, defaults$$1); // Capture the current threshold values, then temporarily override them with
  // specific values just for this render.

  var oldThresholds = _extends({}, IntlRelativeFormat.thresholds);

  updateRelativeFormatThresholds(RELATIVE_FORMAT_THRESHOLDS);

  try {
    return state.getRelativeFormat(locale, filteredOptions).format(date, {
      now: isFinite(now) ? now : state.now()
    });
  } catch (e) {
    onError(createError('Error formatting relative time.', e));
  } finally {
    updateRelativeFormatThresholds(oldThresholds);
  }

  return String(date);
}

function formatNumber(config, state, value) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var locale = config.locale,
      formats = config.formats;
  var format = options.format;
  var onError = config.onError || defaultErrorHandler;
  var defaults$$1 = format && getNamedFormat(formats, 'number', format, onError);
  var filteredOptions = filterProps(options, NUMBER_FORMAT_OPTIONS, defaults$$1);

  try {
    return state.getNumberFormat(locale, filteredOptions).format(value);
  } catch (e) {
    onError(createError('Error formatting number.', e));
  }

  return String(value);
}

function formatPlural(config, state, value) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var locale = config.locale;
  var filteredOptions = filterProps(options, PLURAL_FORMAT_OPTIONS);
  var onError = config.onError || defaultErrorHandler;

  try {
    return state.getPluralFormat(locale, filteredOptions).format(value);
  } catch (e) {
    onError(createError('Error formatting plural.', e));
  }

  return 'other';
}

function formatMessage$1(config, state) {
  var messageDescriptor = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var values = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var locale = config.locale,
      formats = config.formats,
      messages = config.messages,
      defaultLocale = config.defaultLocale,
      defaultFormats = config.defaultFormats;
  var id = messageDescriptor.id,
      defaultMessage = messageDescriptor.defaultMessage; // Produce a better error if the user calls `intl.formatMessage(element)`

  {
    browser(! /*#__PURE__*/react.exports.isValidElement(config), '[React Intl] Don\'t pass React elements to ' + 'formatMessage(), pass `.props`.');
  } // `id` is a required field of a Message Descriptor.


  browser(id, '[React Intl] An `id` must be provided to format a message.');
  var message = messages && messages[id];
  var hasValues = Object.keys(values).length > 0; // Avoid expensive message formatting for simple messages without values. In
  // development messages will always be formatted in case of missing values.

  if (!hasValues && process.env.NODE_ENV === 'production') {
    return message || defaultMessage || id;
  }

  var formattedMessage = void 0;
  var onError = config.onError || defaultErrorHandler;

  if (message) {
    try {
      var formatter = state.getMessageFormat(message, locale, formats);
      formattedMessage = formatter.format(values);
    } catch (e) {
      onError(createError('Error formatting message: "' + id + '" for locale: "' + locale + '"' + (defaultMessage ? ', using default message as fallback.' : ''), e));
    }
  } else {
    // This prevents warnings from littering the console in development
    // when no `messages` are passed into the <IntlProvider> for the
    // default locale, and a default message is in the source.
    if (!defaultMessage || locale && locale.toLowerCase() !== defaultLocale.toLowerCase()) {
      onError(createError('Missing message: "' + id + '" for locale: "' + locale + '"' + (defaultMessage ? ', using default message as fallback.' : '')));
    }
  }

  if (!formattedMessage && defaultMessage) {
    try {
      var _formatter = state.getMessageFormat(defaultMessage, defaultLocale, defaultFormats);

      formattedMessage = _formatter.format(values);
    } catch (e) {
      onError(createError('Error formatting the default message for: "' + id + '"', e));
    }
  }

  if (!formattedMessage) {
    onError(createError('Cannot format message: "' + id + '", ' + ('using message ' + (message || defaultMessage ? 'source' : 'id') + ' as fallback.')));
  }

  return formattedMessage || message || defaultMessage || id;
}

function formatHTMLMessage(config, state, messageDescriptor) {
  var rawValues = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {}; // Process all the values before they are used when formatting the ICU
  // Message string. Since the formatted message might be injected via
  // `innerHTML`, all String-based values need to be HTML-escaped.

  var escapedValues = Object.keys(rawValues).reduce(function (escaped, name) {
    var value = rawValues[name];
    escaped[name] = typeof value === 'string' ? escape(value) : value;
    return escaped;
  }, {});
  return formatMessage$1(config, state, messageDescriptor, escapedValues);
}

var format = Object.freeze({
  formatDate: formatDate,
  formatTime: formatTime,
  formatRelative: formatRelative,
  formatNumber: formatNumber,
  formatPlural: formatPlural,
  formatMessage: formatMessage$1,
  formatHTMLMessage: formatHTMLMessage
});
/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

var intlConfigPropNames$1 = Object.keys(intlConfigPropTypes);
var intlFormatPropNames = Object.keys(intlFormatPropTypes); // These are not a static property on the `IntlProvider` class so the intl
// config values can be inherited from an <IntlProvider> ancestor.

var defaultProps = {
  formats: {},
  messages: {},
  timeZone: null,
  textComponent: 'span',
  defaultLocale: 'en',
  defaultFormats: {},
  onError: defaultErrorHandler
};

var IntlProvider = function (_Component) {
  inherits(IntlProvider, _Component);

  function IntlProvider(props) {
    var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    classCallCheck(this, IntlProvider);

    var _this = possibleConstructorReturn(this, (IntlProvider.__proto__ || Object.getPrototypeOf(IntlProvider)).call(this, props, context));

    browser(typeof Intl !== 'undefined', '[React Intl] The `Intl` APIs must be available in the runtime, ' + 'and do not appear to be built-in. An `Intl` polyfill should be loaded.\n' + 'See: http://formatjs.io/guides/runtime-environments/');
    var intlContext = context.intl; // Used to stabilize time when performing an initial rendering so that
    // all relative times use the same reference "now" time.

    var initialNow = void 0;

    if (isFinite(props.initialNow)) {
      initialNow = Number(props.initialNow);
    } else {
      // When an `initialNow` isn't provided via `props`, look to see an
      // <IntlProvider> exists in the ancestry and call its `now()`
      // function to propagate its value for "now".
      initialNow = intlContext ? intlContext.now() : Date.now();
    } // Creating `Intl*` formatters is expensive. If there's a parent
    // `<IntlProvider>`, then its formatters will be used. Otherwise, this
    // memoize the `Intl*` constructors and cache them for the lifecycle of
    // this IntlProvider instance.


    var _ref = intlContext || {},
        _ref$formatters = _ref.formatters,
        formatters = _ref$formatters === undefined ? {
      getDateTimeFormat: memoizeFormatConstructor(Intl.DateTimeFormat),
      getNumberFormat: memoizeFormatConstructor(Intl.NumberFormat),
      getMessageFormat: memoizeFormatConstructor(IntlMessageFormat),
      getRelativeFormat: memoizeFormatConstructor(IntlRelativeFormat),
      getPluralFormat: memoizeFormatConstructor(IntlPluralFormat)
    } : _ref$formatters;

    _this.state = _extends({}, formatters, {
      // Wrapper to provide stable "now" time for initial render.
      now: function now() {
        return _this._didDisplay ? Date.now() : initialNow;
      }
    });
    return _this;
  }

  createClass(IntlProvider, [{
    key: 'getConfig',
    value: function getConfig() {
      var intlContext = this.context.intl; // Build a whitelisted config object from `props`, defaults, and
      // `context.intl`, if an <IntlProvider> exists in the ancestry.

      var config = filterProps(this.props, intlConfigPropNames$1, intlContext); // Apply default props. This must be applied last after the props have
      // been resolved and inherited from any <IntlProvider> in the ancestry.
      // This matches how React resolves `defaultProps`.

      for (var propName in defaultProps) {
        if (config[propName] === undefined) {
          config[propName] = defaultProps[propName];
        }
      }

      if (!hasLocaleData(config.locale)) {
        var _config = config,
            locale = _config.locale,
            defaultLocale = _config.defaultLocale,
            defaultFormats = _config.defaultFormats,
            onError = _config.onError;
        onError(createError('Missing locale data for locale: "' + locale + '". ' + ('Using default locale: "' + defaultLocale + '" as fallback.'))); // Since there's no registered locale data for `locale`, this will
        // fallback to the `defaultLocale` to make sure things can render.
        // The `messages` are overridden to the `defaultProps` empty object
        // to maintain referential equality across re-renders. It's assumed
        // each <FormattedMessage> contains a `defaultMessage` prop.

        config = _extends({}, config, {
          locale: defaultLocale,
          formats: defaultFormats,
          messages: defaultProps.messages
        });
      }

      return config;
    }
  }, {
    key: 'getBoundFormatFns',
    value: function getBoundFormatFns(config, state) {
      return intlFormatPropNames.reduce(function (boundFormatFns, name) {
        boundFormatFns[name] = format[name].bind(null, config, state);
        return boundFormatFns;
      }, {});
    }
  }, {
    key: 'getChildContext',
    value: function getChildContext() {
      var config = this.getConfig(); // Bind intl factories and current config to the format functions.

      var boundFormatFns = this.getBoundFormatFns(config, this.state);
      var _state = this.state,
          now = _state.now,
          formatters = objectWithoutProperties(_state, ['now']);
      return {
        intl: _extends({}, config, boundFormatFns, {
          formatters: formatters,
          now: now
        })
      };
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      for (var _len = arguments.length, next = Array(_len), _key = 0; _key < _len; _key++) {
        next[_key] = arguments[_key];
      }

      return shouldIntlComponentUpdate.apply(undefined, [this].concat(next));
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._didDisplay = true;
    }
  }, {
    key: 'render',
    value: function render() {
      return react.exports.Children.only(this.props.children);
    }
  }]);
  return IntlProvider;
}(react.exports.Component);

IntlProvider.displayName = 'IntlProvider';
IntlProvider.contextTypes = {
  intl: intlShape
};
IntlProvider.childContextTypes = {
  intl: intlShape.isRequired
};
IntlProvider.propTypes = _extends({}, intlConfigPropTypes, {
  children: PropTypes.element.isRequired,
  initialNow: PropTypes.any
}) ;
/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

var FormattedDate = function (_Component) {
  inherits(FormattedDate, _Component);

  function FormattedDate(props, context) {
    classCallCheck(this, FormattedDate);

    var _this = possibleConstructorReturn(this, (FormattedDate.__proto__ || Object.getPrototypeOf(FormattedDate)).call(this, props, context));

    invariantIntlContext(context);
    return _this;
  }

  createClass(FormattedDate, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      for (var _len = arguments.length, next = Array(_len), _key = 0; _key < _len; _key++) {
        next[_key] = arguments[_key];
      }

      return shouldIntlComponentUpdate.apply(undefined, [this].concat(next));
    }
  }, {
    key: 'render',
    value: function render() {
      var _context$intl = this.context.intl,
          formatDate = _context$intl.formatDate,
          Text = _context$intl.textComponent;
      var _props = this.props,
          value = _props.value,
          children = _props.children;
      var formattedDate = formatDate(value, this.props);

      if (typeof children === 'function') {
        return children(formattedDate);
      }

      return /*#__PURE__*/React.createElement(Text, null, formattedDate);
    }
  }]);
  return FormattedDate;
}(react.exports.Component);

FormattedDate.displayName = 'FormattedDate';
FormattedDate.contextTypes = {
  intl: intlShape
};
FormattedDate.propTypes = _extends({}, dateTimeFormatPropTypes, {
  value: PropTypes.any.isRequired,
  format: PropTypes.string,
  children: PropTypes.func
}) ;
/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

var FormattedTime = function (_Component) {
  inherits(FormattedTime, _Component);

  function FormattedTime(props, context) {
    classCallCheck(this, FormattedTime);

    var _this = possibleConstructorReturn(this, (FormattedTime.__proto__ || Object.getPrototypeOf(FormattedTime)).call(this, props, context));

    invariantIntlContext(context);
    return _this;
  }

  createClass(FormattedTime, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      for (var _len = arguments.length, next = Array(_len), _key = 0; _key < _len; _key++) {
        next[_key] = arguments[_key];
      }

      return shouldIntlComponentUpdate.apply(undefined, [this].concat(next));
    }
  }, {
    key: 'render',
    value: function render() {
      var _context$intl = this.context.intl,
          formatTime = _context$intl.formatTime,
          Text = _context$intl.textComponent;
      var _props = this.props,
          value = _props.value,
          children = _props.children;
      var formattedTime = formatTime(value, this.props);

      if (typeof children === 'function') {
        return children(formattedTime);
      }

      return /*#__PURE__*/React.createElement(Text, null, formattedTime);
    }
  }]);
  return FormattedTime;
}(react.exports.Component);

FormattedTime.displayName = 'FormattedTime';
FormattedTime.contextTypes = {
  intl: intlShape
};
FormattedTime.propTypes = _extends({}, dateTimeFormatPropTypes, {
  value: PropTypes.any.isRequired,
  format: PropTypes.string,
  children: PropTypes.func
}) ;
/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

var SECOND = 1000;
var MINUTE = 1000 * 60;
var HOUR = 1000 * 60 * 60;
var DAY = 1000 * 60 * 60 * 24; // The maximum timer delay value is a 32-bit signed integer.
// See: https://mdn.io/setTimeout

var MAX_TIMER_DELAY = 2147483647;

function selectUnits(delta) {
  var absDelta = Math.abs(delta);

  if (absDelta < MINUTE) {
    return 'second';
  }

  if (absDelta < HOUR) {
    return 'minute';
  }

  if (absDelta < DAY) {
    return 'hour';
  } // The maximum scheduled delay will be measured in days since the maximum
  // timer delay is less than the number of milliseconds in 25 days.


  return 'day';
}

function getUnitDelay(units) {
  switch (units) {
    case 'second':
      return SECOND;

    case 'minute':
      return MINUTE;

    case 'hour':
      return HOUR;

    case 'day':
      return DAY;

    default:
      return MAX_TIMER_DELAY;
  }
}

function isSameDate(a, b) {
  if (a === b) {
    return true;
  }

  var aTime = new Date(a).getTime();
  var bTime = new Date(b).getTime();
  return isFinite(aTime) && isFinite(bTime) && aTime === bTime;
}

var FormattedRelative = function (_Component) {
  inherits(FormattedRelative, _Component);

  function FormattedRelative(props, context) {
    classCallCheck(this, FormattedRelative);

    var _this = possibleConstructorReturn(this, (FormattedRelative.__proto__ || Object.getPrototypeOf(FormattedRelative)).call(this, props, context));

    invariantIntlContext(context);
    var now = isFinite(props.initialNow) ? Number(props.initialNow) : context.intl.now(); // `now` is stored as state so that `render()` remains a function of
    // props + state, instead of accessing `Date.now()` inside `render()`.

    _this.state = {
      now: now
    };
    return _this;
  }

  createClass(FormattedRelative, [{
    key: 'scheduleNextUpdate',
    value: function scheduleNextUpdate(props, state) {
      var _this2 = this; // Cancel and pending update because we're scheduling a new update.


      clearTimeout(this._timer);
      var value = props.value,
          units = props.units,
          updateInterval = props.updateInterval;
      var time = new Date(value).getTime(); // If the `updateInterval` is falsy, including `0` or we don't have a
      // valid date, then auto updates have been turned off, so we bail and
      // skip scheduling an update.

      if (!updateInterval || !isFinite(time)) {
        return;
      }

      var delta = time - state.now;
      var unitDelay = getUnitDelay(units || selectUnits(delta));
      var unitRemainder = Math.abs(delta % unitDelay); // We want the largest possible timer delay which will still display
      // accurate information while reducing unnecessary re-renders. The delay
      // should be until the next "interesting" moment, like a tick from
      // "1 minute ago" to "2 minutes ago" when the delta is 120,000ms.

      var delay = delta < 0 ? Math.max(updateInterval, unitDelay - unitRemainder) : Math.max(updateInterval, unitRemainder);
      this._timer = setTimeout(function () {
        _this2.setState({
          now: _this2.context.intl.now()
        });
      }, delay);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.scheduleNextUpdate(this.props, this.state);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(_ref) {
      var nextValue = _ref.value; // When the `props.value` date changes, `state.now` needs to be updated,
      // and the next update can be rescheduled.

      if (!isSameDate(nextValue, this.props.value)) {
        this.setState({
          now: this.context.intl.now()
        });
      }
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      for (var _len = arguments.length, next = Array(_len), _key = 0; _key < _len; _key++) {
        next[_key] = arguments[_key];
      }

      return shouldIntlComponentUpdate.apply(undefined, [this].concat(next));
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps, nextState) {
      this.scheduleNextUpdate(nextProps, nextState);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearTimeout(this._timer);
    }
  }, {
    key: 'render',
    value: function render() {
      var _context$intl = this.context.intl,
          formatRelative = _context$intl.formatRelative,
          Text = _context$intl.textComponent;
      var _props = this.props,
          value = _props.value,
          children = _props.children;
      var formattedRelative = formatRelative(value, _extends({}, this.props, this.state));

      if (typeof children === 'function') {
        return children(formattedRelative);
      }

      return /*#__PURE__*/React.createElement(Text, null, formattedRelative);
    }
  }]);
  return FormattedRelative;
}(react.exports.Component);

FormattedRelative.displayName = 'FormattedRelative';
FormattedRelative.contextTypes = {
  intl: intlShape
};
FormattedRelative.defaultProps = {
  updateInterval: 1000 * 10
};
FormattedRelative.propTypes = _extends({}, relativeFormatPropTypes, {
  value: PropTypes.any.isRequired,
  format: PropTypes.string,
  updateInterval: PropTypes.number,
  initialNow: PropTypes.any,
  children: PropTypes.func
}) ;
/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

var FormattedNumber = function (_Component) {
  inherits(FormattedNumber, _Component);

  function FormattedNumber(props, context) {
    classCallCheck(this, FormattedNumber);

    var _this = possibleConstructorReturn(this, (FormattedNumber.__proto__ || Object.getPrototypeOf(FormattedNumber)).call(this, props, context));

    invariantIntlContext(context);
    return _this;
  }

  createClass(FormattedNumber, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      for (var _len = arguments.length, next = Array(_len), _key = 0; _key < _len; _key++) {
        next[_key] = arguments[_key];
      }

      return shouldIntlComponentUpdate.apply(undefined, [this].concat(next));
    }
  }, {
    key: 'render',
    value: function render() {
      var _context$intl = this.context.intl,
          formatNumber = _context$intl.formatNumber,
          Text = _context$intl.textComponent;
      var _props = this.props,
          value = _props.value,
          children = _props.children;
      var formattedNumber = formatNumber(value, this.props);

      if (typeof children === 'function') {
        return children(formattedNumber);
      }

      return /*#__PURE__*/React.createElement(Text, null, formattedNumber);
    }
  }]);
  return FormattedNumber;
}(react.exports.Component);

FormattedNumber.displayName = 'FormattedNumber';
FormattedNumber.contextTypes = {
  intl: intlShape
};
FormattedNumber.propTypes = _extends({}, numberFormatPropTypes, {
  value: PropTypes.any.isRequired,
  format: PropTypes.string,
  children: PropTypes.func
}) ;
/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

var FormattedPlural = function (_Component) {
  inherits(FormattedPlural, _Component);

  function FormattedPlural(props, context) {
    classCallCheck(this, FormattedPlural);

    var _this = possibleConstructorReturn(this, (FormattedPlural.__proto__ || Object.getPrototypeOf(FormattedPlural)).call(this, props, context));

    invariantIntlContext(context);
    return _this;
  }

  createClass(FormattedPlural, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      for (var _len = arguments.length, next = Array(_len), _key = 0; _key < _len; _key++) {
        next[_key] = arguments[_key];
      }

      return shouldIntlComponentUpdate.apply(undefined, [this].concat(next));
    }
  }, {
    key: 'render',
    value: function render() {
      var _context$intl = this.context.intl,
          formatPlural = _context$intl.formatPlural,
          Text = _context$intl.textComponent;
      var _props = this.props,
          value = _props.value,
          other = _props.other,
          children = _props.children;
      var pluralCategory = formatPlural(value, this.props);
      var formattedPlural = this.props[pluralCategory] || other;

      if (typeof children === 'function') {
        return children(formattedPlural);
      }

      return /*#__PURE__*/React.createElement(Text, null, formattedPlural);
    }
  }]);
  return FormattedPlural;
}(react.exports.Component);

FormattedPlural.displayName = 'FormattedPlural';
FormattedPlural.contextTypes = {
  intl: intlShape
};
FormattedPlural.defaultProps = {
  style: 'cardinal'
};
FormattedPlural.propTypes = _extends({}, pluralFormatPropTypes, {
  value: PropTypes.any.isRequired,
  other: PropTypes.node.isRequired,
  zero: PropTypes.node,
  one: PropTypes.node,
  two: PropTypes.node,
  few: PropTypes.node,
  many: PropTypes.node,
  children: PropTypes.func
}) ;
/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

var defaultFormatMessage = function defaultFormatMessage(descriptor, values) {
  {
    console.error('[React Intl] Could not find required `intl` object. <IntlProvider> needs to exist in the component ancestry. Using default message as fallback.');
  }

  return formatMessage$1({}, {
    getMessageFormat: memoizeFormatConstructor(IntlMessageFormat)
  }, descriptor, values);
};

var FormattedMessage = function (_Component) {
  inherits(FormattedMessage, _Component);

  function FormattedMessage(props, context) {
    classCallCheck(this, FormattedMessage);

    var _this = possibleConstructorReturn(this, (FormattedMessage.__proto__ || Object.getPrototypeOf(FormattedMessage)).call(this, props, context));

    if (!props.defaultMessage) {
      invariantIntlContext(context);
    }

    return _this;
  }

  createClass(FormattedMessage, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      var values = this.props.values;
      var nextValues = nextProps.values;

      if (!shallowEquals(nextValues, values)) {
        return true;
      } // Since `values` has already been checked, we know they're not
      // different, so the current `values` are carried over so the shallow
      // equals comparison on the other props isn't affected by the `values`.


      var nextPropsToCheck = _extends({}, nextProps, {
        values: values
      });

      for (var _len = arguments.length, next = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        next[_key - 1] = arguments[_key];
      }

      return shouldIntlComponentUpdate.apply(undefined, [this, nextPropsToCheck].concat(next));
    }
  }, {
    key: 'render',
    value: function render() {
      var _ref = this.context.intl || {},
          _ref$formatMessage = _ref.formatMessage,
          formatMessage$$1 = _ref$formatMessage === undefined ? defaultFormatMessage : _ref$formatMessage,
          _ref$textComponent = _ref.textComponent,
          Text = _ref$textComponent === undefined ? 'span' : _ref$textComponent;

      var _props = this.props,
          id = _props.id,
          description = _props.description,
          defaultMessage = _props.defaultMessage,
          values = _props.values,
          _props$tagName = _props.tagName,
          Component$$1 = _props$tagName === undefined ? Text : _props$tagName,
          children = _props.children;
      var tokenDelimiter = void 0;
      var tokenizedValues = void 0;
      var elements = void 0;
      var hasValues = values && Object.keys(values).length > 0;

      if (hasValues) {
        // Creates a token with a random UID that should not be guessable or
        // conflict with other parts of the `message` string.
        var uid = Math.floor(Math.random() * 0x10000000000).toString(16);

        var generateToken = function () {
          var counter = 0;
          return function () {
            return 'ELEMENT-' + uid + '-' + (counter += 1);
          };
        }(); // Splitting with a delimiter to support IE8. When using a regex
        // with a capture group IE8 does not include the capture group in
        // the resulting array.


        tokenDelimiter = '@__' + uid + '__@';
        tokenizedValues = {};
        elements = {}; // Iterates over the `props` to keep track of any React Element
        // values so they can be represented by the `token` as a placeholder
        // when the `message` is formatted. This allows the formatted
        // message to then be broken-up into parts with references to the
        // React Elements inserted back in.

        Object.keys(values).forEach(function (name) {
          var value = values[name];

          if ( /*#__PURE__*/react.exports.isValidElement(value)) {
            var token = generateToken();
            tokenizedValues[name] = tokenDelimiter + token + tokenDelimiter;
            elements[token] = value;
          } else {
            tokenizedValues[name] = value;
          }
        });
      }

      var descriptor = {
        id: id,
        description: description,
        defaultMessage: defaultMessage
      };
      var formattedMessage = formatMessage$$1(descriptor, tokenizedValues || values);
      var nodes = void 0;
      var hasElements = elements && Object.keys(elements).length > 0;

      if (hasElements) {
        // Split the message into parts so the React Element values captured
        // above can be inserted back into the rendered message. This
        // approach allows messages to render with React Elements while
        // keeping React's virtual diffing working properly.
        nodes = formattedMessage.split(tokenDelimiter).filter(function (part) {
          return !!part;
        }).map(function (part) {
          return elements[part] || part;
        });
      } else {
        nodes = [formattedMessage];
      }

      if (typeof children === 'function') {
        return children.apply(undefined, toConsumableArray(nodes));
      } // Needs to use `createElement()` instead of JSX, otherwise React will
      // warn about a missing `key` prop with rich-text message formatting.


      return react.exports.createElement.apply(undefined, [Component$$1, null].concat(toConsumableArray(nodes)));
    }
  }]);
  return FormattedMessage;
}(react.exports.Component);

FormattedMessage.displayName = 'FormattedMessage';
FormattedMessage.contextTypes = {
  intl: intlShape
};
FormattedMessage.defaultProps = {
  values: {}
};
FormattedMessage.propTypes = _extends({}, messageDescriptorPropTypes, {
  values: PropTypes.object,
  tagName: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  children: PropTypes.func
}) ;
/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

var FormattedHTMLMessage = function (_Component) {
  inherits(FormattedHTMLMessage, _Component);

  function FormattedHTMLMessage(props, context) {
    classCallCheck(this, FormattedHTMLMessage);

    var _this = possibleConstructorReturn(this, (FormattedHTMLMessage.__proto__ || Object.getPrototypeOf(FormattedHTMLMessage)).call(this, props, context));

    invariantIntlContext(context);
    return _this;
  }

  createClass(FormattedHTMLMessage, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      var values = this.props.values;
      var nextValues = nextProps.values;

      if (!shallowEquals(nextValues, values)) {
        return true;
      } // Since `values` has already been checked, we know they're not
      // different, so the current `values` are carried over so the shallow
      // equals comparison on the other props isn't affected by the `values`.


      var nextPropsToCheck = _extends({}, nextProps, {
        values: values
      });

      for (var _len = arguments.length, next = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        next[_key - 1] = arguments[_key];
      }

      return shouldIntlComponentUpdate.apply(undefined, [this, nextPropsToCheck].concat(next));
    }
  }, {
    key: 'render',
    value: function render() {
      var _context$intl = this.context.intl,
          formatHTMLMessage = _context$intl.formatHTMLMessage,
          Text = _context$intl.textComponent;
      var _props = this.props,
          id = _props.id,
          description = _props.description,
          defaultMessage = _props.defaultMessage,
          rawValues = _props.values,
          _props$tagName = _props.tagName,
          Component$$1 = _props$tagName === undefined ? Text : _props$tagName,
          children = _props.children;
      var descriptor = {
        id: id,
        description: description,
        defaultMessage: defaultMessage
      };
      var formattedHTMLMessage = formatHTMLMessage(descriptor, rawValues);

      if (typeof children === 'function') {
        return children(formattedHTMLMessage);
      } // Since the message presumably has HTML in it, we need to set
      // `innerHTML` in order for it to be rendered and not escaped by React.
      // To be safe, all string prop values were escaped when formatting the
      // message. It is assumed that the message is not UGC, and came from the
      // developer making it more like a template.
      //
      // Note: There's a perf impact of using this component since there's no
      // way for React to do its virtual DOM diffing.


      var html = {
        __html: formattedHTMLMessage
      };
      return /*#__PURE__*/React.createElement(Component$$1, {
        dangerouslySetInnerHTML: html
      });
    }
  }]);
  return FormattedHTMLMessage;
}(react.exports.Component);

FormattedHTMLMessage.displayName = 'FormattedHTMLMessage';
FormattedHTMLMessage.contextTypes = {
  intl: intlShape
};
FormattedHTMLMessage.defaultProps = {
  values: {}
};
FormattedHTMLMessage.propTypes = _extends({}, messageDescriptorPropTypes, {
  values: PropTypes.object,
  tagName: PropTypes.string,
  children: PropTypes.func
}) ;
/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

addLocaleData(defaultLocaleData);
/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

addLocaleData(allLocaleData);

var img$3 = "data:image/png;base64,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iEghFFgiIiIihVFgiYiIiBRGgSUiIiJSGAWWiIiISGEUWCIiIiKFUWCJiIiIFEaBJSIiIlIYBZaIiIhIYRRYIiIiIoVRYImIiIgURoElIiIiUhgFloiIiEhhFFgiIiIihVFgiYiIiBRGgSUiIiJSGAWWiIiISGEUWCIiIiKFUWCJiIiIFEaBJSIiIlIYBZaIiIhIYRRYIiIiIoVRYImIiIgURoElIiIiUhgFloiIiEhhFFgiIiIihVFgiYiIiBRGgSUiIiJSGAWWiIiISGEUWCIiIiKFUWCJiIiIFEaBJSIiIlIYBZaIiIhIYRRYIiIiIoVRYImIiIgURoElIiIiUhgFloiIiEhhFFgiIiIihVFgiYiIiBRGgSUiIiJSGAWWiIiISGEUWCIiIiKFUWCJiIiIFEaBJSIiIlIYBZaIiIhIYRRYIiIiIoVRYImIiIgURoElIiIiUhgFloiIiEhhFFgiIiIihVFgiYiIiBRGgSUiIiJSGAWWiIiISGEUWCIiIiKFUWCJiIiIFEaBJSIiIlIYBZaIiIhIYRRYIiIiIoVRYImIiIgURoElIiIiUhgFloiIiEhhFFgiIiIihVFgiYiIiBRGgSUiIiJSGAWWiIiISGEUWCIiIiKFUWCJiIiIFEaBJSIiIlIYBZaIiIhIYRRYIiIiIoVRYImIiIgURoElIiIiUhgFloiIiEhhFFgiIiIihVFgiYiIiBRGgSUiIiJSGAWWiIiISGEUWCIiIiKFUWCJiIiIFEaBJSIiIlIYBZaIiIhIYRRYIiIiIoVRYImIiIgURoElIiIiUhgFloiIiEhhFFgiIiIihVFgiYiIiBRGgSUiIiJSGAWWiIiISGEUWCIiIiKFUWCJiIiIFEaBJSIiIlIYBZaIiIhIYRRYIiIiIoVRYImIiIgURoElIiIiUhgFloiIiEhhFFgiIiIihVFgiYiIiBRGgSUiIiJSGAWWiIiISGEUWCIiIiKFUWCJiIiIFEaBJSIiIlIYBZaIiIhIYRRYIiIiIoVRYImIiIgURoElIiIiUhgFloiIiEhhFFgiIiIihVFgiYiIiBRGgSUiIiJSGAWWiIiISGEUWCIiIiKFUWCJiIiIFEaBJSIiIlIYBZaIiIhIYRRYIiIiIoVRYImIiIgURoElIiIiUhgFloiIiEhhFFgiIiIihVFgiYiIiBRGgSUiIiJSGAWWiIiISGEUWCIiIiKFUWCJiIiIFEaBJSIiIlIYBZaIiIhIYRRYIiIiIoVRYImIiIgURoElIiIiUpjDHo/0/y77gV17Hg8btu4IW7bviq/d6Xfe2xObYeuO3WFrfG93/H3GhNGhZ+TP9e/ksT1hWnxv7OhRYfzokWFMz8j+v4iIiMjBhgJrH4Jo2r5zT+jbuTtsiy9+burbFVas3xbWbt4R1m7ZHpav2xZ27NqTRNa6KLbWbd0Zdu3eE46cMT6MbRBRc6eMDQumjwtTx40O0yeMCVPG94Qxo0aG3p4R6XO9UXSNOOyw/k+LiIjIgUSBtY9AXPVFcfXA6s1h8dKN4c5lG8LiZRvDg2u2hJ1RQCGidkdRtTOKqz3x87TC7j173+P3MVE4HdYgmPBmjR41IowccViYMq4nzJnUG46cNSEcP2dSOGne3te4MaP6Py0iIiIHEgVWQRBOazZtD0vXbQsPRSF1fxRXSx/bFpav739t2Ou5Giy9PSPDhN5RYcaEMWHO5N4wb+rYsHDauHBUFFxHzZyQPF1TxvYYRhQRETlAKLAGyV7P0+NhY9/OsGpjX7hr2cbwk0fXh1sfeiz8+OF1KSS4ryE0SKjw1AVTwrlHzwhnHjE1HB3F1rwpY5MQGzUCb1j/h0VERGSfo8AaJLt2782duvbOleGrty1PAmvdlh1h645dKWkd8bU/QGSNHT0yTBgzKowbMzI85ajp4dknzQ7nHzszzJw4JoUXRUREZP+gwBoEj6zdEu5YujF5qm6NrzuWbkghQkKFB5qF08eFE+ZOSq+zjpwWTl8wJSXKK7RERET2PQqsLqG2tu/aHdZs3h6uv2dN+Prty8O1d65KXqyDjRw6vODE2eFXTp8XzolCC5E13mR4ERGRfYoCq0vYUuGhtVvCf3z3gXDTA2vDQ6u3pPyr/RUK7BZE1sTeUcmjdeFJs8NzT52b8rRERERk36HA6pC8QejNDz4WvrN4VXotWbc1bRg6FCA/i8T3Jx85PTztuJnhqcfNSPtpjRph9ruIiEhpFFgdkMXVbUs2hE/d+HD4wq1L0x5X7HU11EBUnTJ/SvjdC48Jpy+cEmZNGuMGpSIiIoUx47kDsrj6wLX3Jc/VUBVXsPda1h8S1yIiInKwosCqAc/V2s3bww/uXZM8Vz95ZF1aJTiUBcnPvXHrw9duW568cas2bk/vi4iISBkMEVZArZC8jqj65A1DOyxYRQ4X/t5Fx4QzFk5N+2XJgWXPnj1h586dYdeuvbl9o0ePDj09Pel32bdQ99u3xwlU/MljqkaNGhVGjhyZXiXZvXt3etHGDL/781wjRowIY8aMST9lcFCn3Ku5XnMbNj7iTIY3CqwKWC1478pN4V1fujMltuPlOdRCaSS4Tx0/Opxz1PTwG+cuSls5yIEDw75t27awatWqsGbNmvTevHnzwuGHH55+l30LdX///fennxjLadOmpdfEiRP7P1GGTZs2hcceeyy9MNL781xjx44NRx99dPopg4N7lHuV/jJ+/Pgn2pD2FAEFVgWIqq/8dHn4zI8eSc8RrAqhjRk5IsyduPeZgDMn9YZJ43rSA5kPNJu27QyrN/aFR9ZuDWu37ghbdrbe/JSHSM+I5X/RmYeHl5yzMJwwb2IYN7q7AWLFihXh0UcfDatXr04Del9fX/9f9i3Tp08PCxYsCMcdd9yQNxibN29OdfjNb34zPPjgg2H9+vXp/Tlz5oQTTjghPPOZz0y/9/b2pvelDIgO6vonP/lJuPnmm8PDDz+c+i8eCYzmmWeeGc4999xwxBFHDKruOc+6devCj370o7B48eJ0ni1btiRRnc+F8Dn55JPDaaedFqZMmTIoQ801PPTQQ+GGG24It9566xPn4hoWLVoUzj777HD66acP+jzDEfrLd7/73XD77beHRx55JHmx8ArOmDEjtR31eswxx/R/WoYzCqwm0nMFozj56HUPhf/83gPpAc14s1oxtmdkmBPFyflHTA1POnxyOHrOxDA7Cq2DYbf0lRv6wv0rNoWbH3os3LZsY3ggCq3tuwlx9n+giTMXTQ2XnjI3vPQpC8PhU8cm4dUOjAYzY4wGAzmzf2Z0Gzdu7P/EvuXII49MhuJ5z3teMhoTJkzo/8vQ4+677w7XXntteO973xseeOCBFKoCPBpPetKTwpve9KZw3nnnhfnz56f3DxayQCEMRShz0qRJB9RgZy8ggpWyzZo1qzbEyoTglltuCVdddVX4/Oc//4SnJ3PRRReFl73sZeFXf/VXw8yZMwcc/mHy8bOf/Sz813/9V7j++uuTiG4mC+nf/M3fDCeeeGKaQAwE2oL78Itf/GL49Kc/nfpVJnvLXvSiF4XLL788nHXWWcW9ZocyCFfu1Xe84x2pHZcuXdr/l5DE6jOe8Yzwile8IrzgBS8wFCsKrGZ4jiDPFfzszY+Gb8WfPPamqoZOjoLqwuNmhsvOXRQOnzYujOkZEUZFYXIwhOB5RuK2HXHWvHlHuOaWR8PVP3o0PLC+L2yrEIvjRo8Mx8+dFN548fHhnKP27vjeDgbxT37yk+Eb3/hGmiUjCpjNYeT2B+QnEUJDYL3whS8MT33qU/v/MvTA8L7//e9PgzfiIN+W5HRgaC+88MJkeJ///Oen9w8WCJN84QtfSKIaD9sll1ySDPiBAk8NngWM39q1a8PrXve62hArXp6//Mu/DN///veTBxFx0jgk4pV48pOfHN75zncmAYTRHAhf+cpXwn//93+H733ve+m+yQK6EbxLCGjEHALo6U9/ev9fugPR+NOf/jS87W1vS545/p9BINKn8Pxy/Le//e3JOyedcdddd4Vvf/vb4T3veU8SyYx3GeoVsXrFFVeE3/md3zEUK64ibGT7zt1h2fpt4Zt3rAi3L92QPFd18vPImRPCU4+fGY6aPSHMnEx4cHQYN2ZUGDv6wL8mju0JMyeNjWWbGE5ZMDWcPH9KfL86gZYHUxNO/NadK8LdK34+IFeBCGCAYXaMB2D58uVp9s9gjpHbHy9CLnh7EHgMfEMZjC7iauvWrb9g4DH4iBcM5ZIlS/rfPTjA04OIQZzgLflqFBG0B33jQIB3AZGEJ4ry3HjjjWHlihWVIWvex7NE36H/cj3N8028c1wTYT0+2y0cExF62223JdFXJa6A8uARwYDj7eJeov27ZeXKleGOO+5I4atGcQVcH2Xieu+5557KupHWcA/++Mc/TmNdo7gC2or+Qr3fd999le0swwcFVgNrN+8Ii5dtDDfcvzaJjXbMmzYuPGnh1NAbBc3BCJ60nlEjknfthHmTQ29P/QqlTX07w3fvWh1ue3RD/H1X7eN/EDf33ntvMgTkYB0oCAcxWz/YxEen5JAWIqrKoO7YsSMJBwb1g4ksUPAY3XLzzeGmm24KP4ov2mJ/eTEbQVgg9r/+ta+ln0tjOai3DRs29H/iF6H8GET6cpXQQIzwffp5YzioUzCyTEQQcfxsZ3Rzf0YgIYKajXgnUE7ahGNVwfUOVMANZ+jvpELUtSN9atmyZQNqOzm0UGA1wN5QX/7psrB+a2c3Ru/okQdNUnsdeLQmjx/dtpyEQ8k5ox5+/PC65NWqgpl4u4FG2kP9UY913pEswg62ARtDgpjatnVrmDB+fMrv+fgnPpESgCnv/hZZeIg++pGPpPJMmjgxjOrpCXcuXpyM3WDgWhA8AzkOHklyFAlFdkMnIqkKyjnQ70o93IOI0wMxgZChhwIrkjcUxXt1axIWnT1fcOPWHWHFumj4ojA5mGFj0eXrtsZy1sQ7I0RHCItSD9+9a1XY3Fdt0Bm8MbAHegZMjgMrdw625O9O6VQ88bnm8NWBJs/U8fJMnjw5TJs6NaxYvjxcd9114Vvf+tZ+W+xAuDgttPjhD1NohmTjmTNmpBw9ysjfW0HOEzkz7faeQgSz6m8gHkQEFt6vbj2sWSRVedbqoJyUF89nFYhhk7C7h3tQr590indXhNyrB1dvSblHD6/ZUrlqsJmla7eGnz74WFgfxdmug1BkEeJju4YHV20OdyzZkJLeO+HBNZvDDfevCSs29IW+WDetwKgygLebyeVNFDFmLEUv+ZoaDfpRRx0VLr744pSALPsXhCHhM2Tf+AkTUnJ7bzTad0RhQB4URn5fe1EQpoQGv/rVr6bQ2u7YLxFX9I2e2O92xj5KX20FfRJhyOrTupWGnCPnGHKsToUuhph8NHLrKGM3cL4777wzicNOz8fnEIOUEw9znWhnYsK1txOXIjJwFFiRLdt3hevvWxPuj0KkGwilXX3LknDHI+vDuiiyDja2xuu6JV7XtYtXhuseeixsrgn5NbItfm7pum3hR1E8PtpBLlodDOAYXlYqnXTSSUVfz3nOc8KVV16ZXnixZP8ybty4JGSykR4zenTaOgPDToL517/+9ZRIvS9BSJB0/OUvfSmFWRHc3az047Os9mI7hyoQSogWjs/PTj0YeK/4Di9+7wauixxHPHB1nqhG+ByeL86HsK2b/HC9XPdAV0WKSHtG/v+R/t+HJYQHl63vS4/DuXPpxiS2OmXnrj1hU/z82i07wh3LNqa8JcTWPUs3hPuWbwx3LdlQ+1oWxcuMyb1hTE3yedqXa+vOcOej68MN96xueZzG1+0Prw/X3bMqfO/u1eE7d8Wf8fXjR+O5NvbFGW7/Qduw93OHhVEjDwuHTx0Xjpn9y/tLkVPCDJtXnfHA03TGGWeEZz/72Wk7BZa8l3qxASQbQbKpH+cZiiBGMIiEuFgpWMeznvWs9DpYoN3xzLCKcFQUWewThScIr9H2vr7w2Lp1yUuycOHCFK4rGY7CW4OgIN/rc5/7XHj4wQfDxAkTntj3itWNlO+ss89O+4ixnUcr+Aw5cAiTusUaiJUs7JN3rMbjlcELRZuyeSyJ9N3A+RCw55xzTqrXTvZ4I5yIKPvBD36QvHl1IK44NveR+2B1DvXKvco9W+UhZDJJn+M1VMclKcOwF1ib+3aF+1ZuCp+IAuvRx7qbZZLStGn77nDXik3J20NYbXEUQknsRJH10yi46l7sEH/mUdPD5HGj+4/4yyDiVkcBeO3ty8Pnb3qk5XEaXzc/sDZ8644V4duLV4Xv3xvLE8v22NbOZsCN8Fgg6uaYORPC6QunplBf4/5enQosDCybJ+a9fdjluNSLHdzZe6kTY3ewMpQFFuEyhMO13/52+v/UKVOSN4v2oL/cE41979ixYe7cuWkvL7wlA92osxnEFSsEEVdf/MIXwox4fEKDJNsjvhB+hMsuufTStGln1d5cHIdtFNiKgVcdGE6ECftqEV5sB6FBEu9Z0TiQrSswzscee2wSh7Nnz+5/txrOwX50eA8RWnVg/Nk3jrpByA0U6hqPHnVNXdKf84v3944be1+HAgos6YZhHyJcvqEv3LlsYwqLDZadex4Py7fsCIvXbg03L9/Y9nXH6i2hr02+F96kvh27wiNRjLU6RvPrZ6s2hxVbd4Ztg8wJyysKl0dxty4KtLotG2R4QjI53qmZs2YljwteI0RXzm3i77ffdlvaJR0PEQa4FITqPvWpT6XwIAJhRr+Xh3JwHno/eWF4N+vCfzlEiJeoHRjVblbOcs2sPhxoHhrnabfCtBE+j0js5PNcb4kQIXVNGJNQcJ5w5RfvdRPiFDnUUGBF4bJ42YbQV/Gsvm5ADO3Y/XjYunN38my1e22Joq7dA6Qf51/8DEKs1TGaX+RZ7YhiaLB6KF1LPCf1Q27a9l2unJFfJD925fzzzw/TZswIy5YvD32Ij8MOSyJrzuzZKWyFCCJM1s6r0imsyPvhD38Y/vd//zesi0Jr3ty5SWThPcOrsGTp0iS2zjzrrOT9qdtNm3IiNOpEWAbh0s0GkuRRDWYzT4QZQoVQYycgZPDqdRKOzDlYnXji6qBshCQ/8pGPhA9+8IPhP/7jP9KL33k6AYsPWj0WSGQ4MOwFFs/su2v5psrVcsMdVhLetXzjIVk/hDDYbBHDidHGEBDWwevQ7sXO3ngL+B7fZ7VX1Wq1fQXCm3Oykg9vSV35ETfsME1ZCSV1sxquDp49SH4dye0bYl1SD+RgIb4I2yFu8GzxqJjGhw4PBMqLuGH7AhLo749ih8ATQo4Vg7tie27ZujUsX7EizJ4zJ4WmCU1SlioIZxLyw6NDWevyxAgldrJZaC4nAgvB08qDQ8iMcnF+frYKoSHMEGi0bbv2yudk/yy8RlVwfVwn18t1Dza8Tv8nB+/qq68OV3/uc+FL11yTXp+P///cZz+bBBaitDTUDe3BsbkXEaL8pDzNG6jS37hHaAvqk8/l+4LfeY+/0U/bLQ7YF+S2Q6xyPY33LO3Jtda1fR1cC9eEx5dj0X+5Xuorn6f5xXlZAUxdUseDuWeHO8P+WYTv+9a94Z+/cXcKg/H8vv3JCXMnhQ//zlPSzyrYWuHBKHA+8N0Hwkd/+HD/u/sPHmJ90ZPmhNdecHSY1/B8QrwHn/nMZ9KrLiTBQP6Sl7wkvQ6m/CFgICafIu+yjSFjEGJQaQdGCg8Az3RDXJAwzE+eXdcNDF4MdjyH8MMf/nD/u60hXZLn5mUwugyc5PiQd0M4CUPRqvx4cshZO/nkk9OL3/E+1YmPTsCQkYNH2T/60Y+G7XEwp81nz9rrEdoWjQMelfujGP2VX/mV8KpXvzqdfyC5KRgh2gjvCM/1mxPPQX2zqSgChaR6+uK6aEx5biPPgyN3iQT7dvz7v/97er4cdVgV0qOuTj311PDxj3885S5Vkcv57ne/O7zvfe9raZw4FvWPwMHrRjs2C3SuCa/cG9/4xvDmN7+5tr04J/ttcc0YyeZjZXK/fcMb3pA+O1i+9KUvpQdK3xlFL+HGnOvGvUU9TpoyJbzqVa9KD0AuCfcsnjOeg0ldU4dcGw9bfu5zn5vuR5L3s8DgGZA8UotHFtEfqS+gzCxaOOWUU9KCGRbkUD8cqxV46mhT7lnu3VYwzuUxj3uhHZSF+5aQNw/NZywC7lkeZk/98TD7bsO5+doRbUxK6BcIJ4Rcq/6W4bzkkVEvjWOG+WTdM2yT3Fk9yIOd//euVeH796xO/9/fzJg4JrzorPnpZxXsr8U+WzeTxL6k9SM/9iUj4iA/fsyo8PTjZoWp439uqLpZRZgTPrlpDzQMiiSqfuc730nGgQ0xEScYJ7w/DG6ILAx1uxczXj5LXTDr47uIG8JTDIadiBcMA8fqNMkdrwweEQZNjAbP3CP8xmNqaAu8aq3Kz4CKRwUvFjNYyku7UU5ypQYKHhGOwTyN193x2OxFNba3N4kD6oA+tDnWO2KL+keIUked1E8GY0Di+mc/+9lw/XXXpes5PBoCjnNYLMP2WCesAuT4T49G9qKLLkpiCHHVyjvUDAaOF7P2qpAeBovz8ZBkPGNV4TXKQFgUzw5GrRUYcBLYWaRBeBOj3yppmnNi5LIgrhKLeK3ov9dcc03tBCGFTqOQIKzbbu846pPy0zfxAHG9zatB+Rvt8Xgs5+RJk9KL7Tpoe8pO38M4s1oxgyinjvAe8X3qnGN20g/zpAKxhCC5+eabk2igb3Dd1CP9mvqirIgvBCD3OhvgUkecj8/ne4PvZW8j9zLXSp9uNVkqmeTO/cK9zPHwAH7ta19L4xDXk+9ZykJd4immr3QK14SoYj86vL30RTzIeTLJGNFYB40vzsvfKEce2xhvGO+g23t3ODNsBRb5RUvWbQ0/uGdNuPWh7pZQl2IoCCyS3XmG4aWnzg3TJ7AKbO/7Q01gMdgzcDDAMtj+z//8T1qBhqhhwGGAZefxThNyOR6zdL5HXXAcjo1RIsGb2TODIsa9zsB3I7Ce9rSnhbPOOiuJJDyIlB8PIgMns9K68iMaGCApK4M4gy/thtFkpopBYSDvRIy0gmvmehEWG6NR2BONKCsIGYhHRuOJsePBy5z/iCiwECjdCDvajnLjvWK3eDxk7Bw/uqcnGV0M6/p43omxDK9+9auTB4Pr6vR6qBuMCv0Z418FxoWtGjB2XEMrMIo8sBnRi9FuBf0D0cE9wT1CH6zynLEKk3AewrTKs4LBpP+wbQXnr4J2QqjTj1ig0IosgOhX34jG+TvXXhvWRQFHG9Jf6Cd8hjahH/7whhvCxHgNCMXGkCN9+6FopPEIcf9nQUFbca8wyWGC88D996fvkRdGP6wL09KPMfb0fV70Ye5FoEzcj5SL66NfUCd4JhFX3Jt4i/Lngd95D0HCcRF93I+0LeVOE4SG8pQSWNQF7Y2IQVzhFWXiw5iS4VppS/ombdXJXn9cM9dCORGheJbpEwgr+nceIzh/FZyXNqIumbAxVnA86pX7ib5LO9EfBjpeDBeGrcAiafzhtVvDjx5cm/a/OhAMBYFFEv7ksaPDxafMDTOiwMrPMxxKAotBlMEMb8973/vecG00GAwcvNc42A4WBiYGJQZ1DCGzaAxSncHoRmDhkcGL8aEPfSiJRD7PgFw3WFbBeZnJ5/wTvCkIpIHOTPkeAy7Gd+myZalfTO/3uCCwGJA556Y4wNN3ps+YkcIynUJSO94rBnq2Ypjfnz/EAE873hUNNiKEbRkuueSSFOagLJ2CkcULRIimTqDQnoSFMXhVAgVDhCcJw8TvrUBckrt2/PHHJ9GGMG00ro1wD/F5wle0USswoGwJwXHqBCLCgS1TqPsqgcj36Y+Id4w/xvbeKD7ob4gY+jN1jncEAYY4XDB/fipnNrh8Zmc09o/EvrUjtnsuE0IQj/G//du/pUcbLY//Xxz7CuKHYyJqqkQJIBAIDXKthHNbwb1H21AXX/7yl5OYqxujGuH6uB/TytTYR7Poy5QSWIgcxNW//Mu/JA8Tv7eaHFEe6p9tafCctgNx9clPfjKF0Ml7RFRVTbo6hfGF+wNvIAKU8SLXMfe9Iqua6pH/EAfhQoL7xm37NzF5qIHt3hHravXGvrCp5tmEBzMYTAZaBhxCCggLEr1LiitgwE3G6N5708yegbPOWHcLZScHhGMjjBAEDMADIYdaMMzMcBGfDJ4DBTGDxwgjQAhqWjTeGKENsYwMwAzE/B2hgKcAI4lXod3+UIjWnG+DR4gQFMIgz543RlGyOhqVkfH4zPDJvyHvqtvkbcqGcOK4dWCsMDC0cxUYI66R668CoYYnDMOJuOX/VWAkaW/qogrO1ckWEogFtq6oyg3i3qA/fPKqq9Ijj8ZFQzottllvrJfH1q4NX4n3EV7E97/vfeHb/c+bnDdnzi9NJGgbHpu0MAqvbVFccUxWFbLCkLwpvJBsTkt/oO4RXoi1r3/ta6nuqsjCpEq4AkKVewQPGTlXiLtOJyHcT3wfwUeZBitOmsliBZH2if4HozPh4L1WZcyevSph3Qhtxz1FqJGxAq921XG7ge8zXjDeMDGlzJyDFIWqSYHsZRgLrL0PeN4yREXD/gQxunbzjq52uT9YwCgRUiMkSB4CMzwGiyoQAsxeMeIYocYX7/G3Oi9PHkCZPeNlwqNVd75u4JjkkyDgmoVJFjEYOmaXdV6zRjhODrngvRmMaOPc5PWcd955SWQx+JJ4jpGiXkhGpx4JH/741luTlwdDVuUJyLN32g1xlUODGOQ86PN3yoxoODeel9BgnQekCsIeCDO+W9e+2fNXJbBoe/7GZyhXKzg+BpMy48HCE1CX18Lx6MN59WcrCCPhSeL8VWCsCRHyYPSq8CzGnpAgBpRjHnPUUWF+FJ7pO/G7iHAeS/TZeD8R2hsbRRQem1bClPf4G/3x0SiKvtkvoH4S+zG77pNDh+frmKOPTjO52372s/D1b3wjickqqH/uqTrDjqDCS4a4ane/V8G4wTlKTsLos3jpaCcmXwisVvdyI4w3deHcDOVkIsKqTcQV91Ur6GP0cULcHJP2yS/+zxhXJ/bpX5QfAcuEFWFfanw7FBm2AkuGBxgMvB+49hmY24HhYYUYK97ySqD84j3+VmWcGuFcGCMGoypD2y0IlaqwJh4kwocMlIRZGsMa7eCYhLOYmZaYlSJyLr/88jB77ty0bcLKWBdZROHVOO7YY1OoEA8IYaeqdiGsQ/0h/pZFwYKxx+AgHpP4ivVK3Y6N711x5ZUpcXugIAYQH3ix6toXA1PnnSKMQl1Sp1VwfM7D+bieduel3fGE4jmr6ku8j8elSqxC3vuqrm9wnBUrV6b8OUQgdcsiBeqHkO8Zp50WznvKU1IbH3/ccWmTWf7WStDzHn9juw5E1Dlnn52+e8bpp4dZUWhjyJkY0HdTzmKsBzxidSFO+j51W+dZ6uQzBwLKg1AmLEh4lb7Sroy0ASFvvJ1V5OvNeVd1XnP6GOHhV77ylWllKquS84v/8zgzxpB2MK4SpkUglhrfDkWGbQ7Wlu2708OaFy/fGJas27dP/K9iKORgweRxPeFpx80MC6dHY9D/WB9usE5ysBhAGfQZTBgAMOIDeWH4uaGZ3TKjZ+CpGtgbYTaXV+dUzRSZ1eFZufjii9MAw4CGsSbnKedS8EJc8WKWx2yUgazKoDHoUT4MGrNFjFsr+D7GupMcLOC8GQwUXhCS35///Oenh1+zypBnNLK8mxwwBtSc2NpKmAHHpBx5Jsp1U7+desGawYAjHDjf2jVrwoOxr+ChwYNCWIif2UOwIZaNMpLAjaGlv2SoE8JJt95yS6pLvFesUAMMCgnUs2LdPuuCC1JoEC9LnfepDs5LP6Y/M/vH89GK7DnDQ4fI4HyN9US+D2Gausfj4CnAK0Fbce2dnBcvEG3d3JcoC+Eykuq5T+q8CfTFp0SBg4eR9m0FZaHcTA4Oi9c6PrZjvkbah3agfXnRjs1t1kwWUHw2fy+vMuRv5HjSNwnzkqtFAj71Slu2AmOO94Txp86wN94nwL3Cfcs9QT1yfN6jjzaGXrlWJips98D91Bw2HkwOFh4mBBCe25wDWgfeYMYkJnb0mcZyNEL5ETocm8lkq3JR/yyW4Jpe9rKXpcckUT7qInuw2AqC89AnaW/6YpUApJ9xTMrIcbvdnma4MGwF1qa+XeGmBx4Ld6/YlDbTPBAMB4HFzY64QjwwMA70hcAi0RnvAYKBATLNsKPhqQNjh9ucfIRWAw8DCQYLg/nbv/3bKQGYwbVx4Mkv3iPROIW54sCM2MMYNQ/mGQbERq9SKyhTNwIrw4wfUXLhhReGX//1X0+DJr+zMg3jTS4U5eVzGGC8ArRTVVkBwcNgjUBjwKwLFdRBnfJd2ujRJUuSUWIj0GxkMa58Zle89p9G4YvngrLmMFkWDYir//nMZ9JmotQjzzrEKLNbPOKW3KSnRiH88ssvT3lMiLrBgHeKvkqOD56GKvCesfUAngDqt1HUEcalv2LwGg13Ixg22oecMQww50VccU7O3YqqvsQ5MNbkGzGZqIPyIurwhlTVFeWhjRCI9Af6C/cYbVYFn0EosVUD9wUv3qOn0XZ1Aoy6ZPUnYom6vPLKK1PdVpWPzyEk2wmsDOWmX3GvkO/GZIR7HWFAqJl+Sr9kLEFYECbm/Ah27ifK0Vj+gQgs+jNihRWTeGPxcNaFBSkP9x/i6qUvfekT/awKjkXbI64Yj1tBOWj3l7/85WmPOIQj5+Ca84v/cx8i4rluPKb0gSqRxWcIcVO3LDCRX2bYhgjZfgBhtWFr65tEDi4YtJnxIWowJoimulyNTsDIYzyY1bGZIzP7Kk9TIwxUeLqY8VUZAsBwdvMsuW5glv+6170uvTCaGN9mI8hATznf8pa3pGvkWrnmKhhIETZ4+xAagwFBwEo+PIGUDwNDKBCDivHF6PH8QOqPfBmWk5PzAxhOxNUPvv/99PvcOOCzJUOGkOOSWL4nRUN4Xjw+BrGd0O4EhAXiBQHdDtq0VVJ51fuNUC+NZeYn/+f9Kqr6Ujd9jOvi+rjOKmiP3G9mRbHxAHldFQY2g7jaFsU7Ex+ELy9+5712jwKjzxHa5NrxwiJ8MPal4Hq4V37v934v/MM//EP43d/93fAbv/EbSWS89a1vTZvBsqLxHe94RwqT4W/427/923T97e6XTuGeYmUfqzIRZ3UTUkD4IYRIS6DsdWMM5AlJXWi1m75N++PF/63f+q10/iqYWFDWduUbzgxbgTVqxGFh2vjRaRNNGRpkkYWhZhaIV2owMKsjZII3gdktIoXZYzv4Hm5xhBYz3ioY+DA27UIB3cCMGyOEl41l/gyaGCQGu2ZPAZ+lfHjdLrjggvSdupkwwodBmuRgjN5goCwM6nhpMFYLFi5MISDye1i+jxhkYOY5guRjsVklngm8eIRSSAJeHkUU4iqHF5MnIIow6pNwD8fFG0F7lDCE2Qh1IrJzInue3VN3iB2EDjP/qlk/0CaNKwf5yf/r+hKeKoRU88owztNuVWOG6+L68nlbQbvgzcFrgjGmrvFMNYNwwpPIY4mY6DzIyr4ohndGAc1r4+bNYVn8GxvPsm0HooL7txnewwNDHhr9mp+NHsHBwHG4ZoQbfZ9rR8hRz7wIh3HO7PElPEnojPfoXyX6FH2ZyQILXriv8AgxyWgm3y94j/Gkv+hFL3rCc1XnPcxwb7Sq3wx/p4/UibAM/YN6YsxgYobI4h5rhHsSr1W7MXC4M2wFVs/IEWHulN4weawCa6jBYIHIYrBqBwMBhgKPSqMAYTBDJDFTYwDBPd7NwN7JjJABL83kCwosrgevUN6Ju85YAtfEtTFwI0gwHHUDNmVFvA7Wg5VhNowH6/xouNgElAdCY2wxMoQNeY4gm4U++sgjaVUSnknCuqw0IwSzsD8HhrpEZKQE7HjNiEYGf4RJKTgPoRPalPZtFqyNYKwahVQ2YIQt8dbx/2Yw2BgqjH7jcwD5yf95v0osUheIXtoF0Z6NNO/XrWoEjoc3hutqPG8VfJ5+xnfImYsV0f+XvdAWO6K44px4ThBIJMXj8VoU25vX3Gigx8djsIM/nkk+S/u1EhdAnywlrDJcA/2PUF9VP+GcfI5wNp/tpH46gXahL7ACFu8VK3SrVvbRz6hrQm3kW/EII+5vQnWlQJSTXoEYJgxNe/BeFdxjjC9M4l7wghckscd4RxmPOuqoNHFiTCEMyvgirRm2AkuGLgzGuKabZ1WtYCD4tV/7tSSmMKAZZmiEBBFYJL52C0aIQahuMMb4ZoNYCrwL5GYwc+wGjAcDIoakzqWfBdZgPViNIOp4nhreQsTVmtV7HziNYaEtERYM0niweCYgy9dZ/s/qM9qMusY4U4+EDE+Ogz2rFGnDxjYdLI1CpN2xEfiNoUDqrZ3nj2MTCsSIt4L324U78ZBhKKkP4Cf/r1qJCZ1MBhph4kLO47J4LXh1k8hqgHMiIvHOzIyi6v97zWvSBr6E2/KKtL/7u79LITnEwoJFi8JDUUDjfWvOPULgUC7EB2Kk+e+DgT5Pn6P/lewnnYDw5FE+nYQFKRvetNe//vXhhS98YfF+DfRT+isbkBIOZVFEJ5Moxhny4v7+7/8+tWkOofL7m970Jr1XbVBgSVvSMu1RI8KoaIAONIgaZnYkczMotYPPktjKw23/4A/+IBl6XrjhSQxnEK4zaBkGfjwWJP/i7megYkf4umToHDZq5c0YCIgQkkoRhBiNbqDeMGSsgqwbFPFOEEbA81YVzugWDDz5aoRhLowzYrwahPoIMRHoQvARCtkS6xjDzeakU6NhR0zynMHdsUxro8FiTy1CgnkFFAK7zss0EBBZCD5m6XVGDg9AoweLdiaxvU7o0Aa0HcdvBe/zdz5XRWOOF/2KtsJTUufNpf5JXm4WWLl/Im4Q1SRJs30AfZsQLW3Bdgqj+icRtFVui7Xx+s8466yUDH7ppZemiQzn4H7ihaDD68HfEA08H3JTbF+EB96dHOLMHlbK/8Prr0/eHspAWSgTZaOM+fPdwL2PF4b+Vbqf1IFHkRXPrF6uCwtm8AoRjsNrRd218542Qz/lGHWeJO5rJgH0Hcatj370o+kRQv/0T/8UPvaxj6WyMrbRpxtFLvcYwp8UCu47vNGMp7R38wpL+WWGrcBCNIztGRl6onCQekaMOCxM7B0VxvR0X1d4KDCeDHZ58B3MC8PKrJScCv7fDtz/DLKvfe1rwx/90R+lZFdeiCyMAzkfwACOwWIQwlOCccEbwQotlqwz+OBhQVwxILEjNUaI1Uz7C+qQ68dQ1hnhKhCSzEjx5rUDw40xLCGwMBYYDUKxeBMJFSKy8EZR55gSHqeDp4SHRNMmeCgpL5uSUhZWmmFin3PxxckThzEpHVLKUL8IhLo6xgjlMDWCARGA8apLNm/nScrn5XNVNAos+iptlMNvVVSdl7qnn7OoIW8f8KkocPC88B7iESGfPVjkYvEe4pv7hdwmXhjbVpMU3uNvhJjIKeqNQmdrLDMP/cbgA+MDG5jSBx6O9xKPQ+L8lIUy5X3SqONuoY8gPOrqc1+ASGHFM89yrAoLNoKwZuLDfdmJV74Z+iljHBPOqhBzhn5L/6F+//Vf/zV5oj7wgQ8kUc3YxhjHSlhCiVwH/YO+xXEZf5goUU7GVWnPsN2mYXccIHjg8z0rNoU7l/kswjpmTeoNl5+3KCyYHm/e/plVp9s0cCNiWMn/efGLX5wSSQfzYkuCyy67LBkMhFvdYNIMAz4hDwwN3hEG9wxCAmNFfgLXhFv/m9/8ZtoB/j//8z/TwM8ya3YUZ68jDF2nM+tc9lZgODhWJ9s04N3Ac8dsciADHAaVAZbBs91jcQhV4YHoNPG/E6h/vAkM2KtWrkziFSGF0U25S2vX7vUeRaOI0aCv4eXCIIyJ/z/zrLPS6irafl+JK6COyBtCVCMmqqAP4VFDhHBNeF/qnnuHwaf/IpKzsG+EPsj5CJVVbUHAdXNeJhiUEyPOqtq6MDTla/X8QcQhnhb6+NWf+1xaVMCDuql3cuNmxfLSZvkeo/9wjxwW75tjY19kJR5eq3ZtwTEQOYQIEcub43kx2Nx/iG9etDePQeL39VEwEva87gc/SPtj8V0MO8ehXjrdpoE6IgUgLwIpQSfbNCAeqassItuBaOWzjJMDKSv1yH2FmEMUIbg7EaSck3PnpwBwbfQ9wodsNcL9ybGAcUBvVfcMW/cNqwhnRmEzsbeM8ThUYZUlD3keN3pkqrNu4abMLuYsNAbzYsUPnivEVbcDEUKBgZyBBSHFYMK+NCzTJq+AnBF2WUZQMYsm6TrvAo/hZBAib4FBB+9BpwNoKQY7I2cgxrDX5WBluDaMxEBCM1VQ/4Qn8RzSjuwSjrCiLbK4YjNRyodRZxd4DDoiiy0Z8IIQlqjzLJWgE08SILARAvQLjBt9oypUR5kRN/RdRGUreJ+/87mqa6TvIS4wigiWxjBlFVxHqxBh9mBxTK6FxQYIdzxKbIuR2yFDeBBRh8AjaZz+2Elb0O4YaMYAQr+Eejl3BlGFeOL6EVmIL8pCmRB8jUn93cC17EtPZxXcM92MDdQ/+WyMR/SlbskeYsQ+Ah4vdSdbXVBOhFieUNB/OT8TTPbVwkPPpAEP1z/+4z+Gj3/842lLFcrb2H5SzTAWWCPClPGjw4TeUWHUSGZR/X+QX4BNRlltOXrkwLoKA3TJEOFA98hhwGOgxpjjAmeWlr1T//zP/5wEFvkIH/rQh9L7eKvwKBEmHEh4Yl/AtQ9mlVMeiPe3wWkE48lM/alPe1oKaySh0J9nMz9eG+ICD0pqr/Xrk/DCKBMWvuiii5Jx39dg6Am3YKDr6ooyY5DIvcqipypUxz1A8jL3QZX3kff5O5/j863AGGYxR19GYNX1T/oKoprFDc33DgYWccZnqHfE7cwoSPgcwqnRwwuECPE2UjY8St14NOh32euccpKaBAjn4jP8ncUNlIUyIcIHCtfA8Zqv42CDPsM4g6AhNDvQyRthRvLduE/wkmavE/d9NyCeGCvxcjMOkq/F5JOJKA+Fx4NHntmBmGQONYatwBo54rAwddzoFJ7jJ/+XX2byWATW2LStxVCFQYDBgHAIK53++I//OLzrXe9KszM8VBhHB4v9CyLrJS99aeiJRhVDiLjCe4FByBtXrlqzJoWUSADOeT7dhIQHCmVAlOAtqxP0CBuEDgIr50VVgXcOL1I7jw9/53N8vgrOg+cMT0Mn5+3EG9cJ3B+ci/rBeHcj1Gk32m+gk4NDHUQnKzfZoqRdm1ZBuzAx+P3f//20ATELDPAY8/5gyOMnE86PfOQj4U//9E/Tz4GWczgxbAUWoh7PFQJrwfRxA/bQHOpMnzAmLKJ+huhiAGb8hPdISmcmxoyM1UnM/kmeZabGDLKduMK7gBeA3CRClexXw2oa3pPuwdvDCkxCP4gYPDfkWQHt8XD8G+ErBvacbIugKRmyrCKHrNqtzMK44MFipt/O2HQadsyenuZwXiPUD+fLAqvKawadnBePBWVnI9i6UBwrOjHWeLG4d7oJE+Ep457jfkNk1XlVKANloUwDCUVxfDy9deJ4f9KJ55hrJqeMnDpyP+ty/6rgPAh0rp0Vf+xYz8ppHuzMmEUEoMp72g7GR8ZSJhT0dxLiEVnkKXJvSmuGvaogD+voWRPDmJ6D2418oKB+jhmi9cOggCubhE3yCK6++uqU61BnkBicU5giGlYGKowsWyOQ3/CMZzwjzQp5hAX7MOFZwcuxv2AQ3l8iY1/BNTBbJ6+NZGU8G9Q1OT+sVmMDSwzNkqVL0+9sRsrMGcNDcj6Jt3gc8wvxxaCPwed7pTyRGMRWeUuNIBo4PwK+ncDCk0TeUgmBxXnwmnHediFsjsN1tDovdU/Ilr8RsqNdEEAYd4xpc24XKz1ZAUpeFG3BZ+oEWYb+ymdpc5LDU4J7PFYjXAOLAzb2lyGHERF0iN1uwlx8hzDrwSCwEFV4QxlDmIy188IyPrF6EjGK93agIKbIdWTF9Gte85o0ZiGyyIOjf1E/hGARXO0EbyO0Jf2PHC32q2N7B/p+iXvuUGTYCyzCXyfNm5S2bJBfhvo58fBJoXcAWzQcSLjhMbYYcfKsGh9rUgeGkF3CWVqOm51N+cg9IPn9b/7mb8If/uEfpsEqb2C4P0MeDLgkmHZi1A5WMKLkcHw3it47br89zI8DPfk2GWbDCCcMMEaCPC2+8+Uvfzm8/e1vD3/1V3+VfuYXuSEf/OAHw1VXXZWEdDuh0ymdCJ3cxxB4hOzqzotYZxUfBraOTs7LOTvdbZ/jVHmwKAseWYz/pDipeCSKxVujmP3hjTemh3CvimKoEcTCzNjnEVg5P7FuBXGG+w6PJQnSa2P7kufV7M0h8Z3H6tA3fhyFGGWhTExwqso/FEDksaCDxfpsDdPuWpgkILLwEOGhHAw5LEvSO2MWG8CSIpGfycjK7lNPPTXlHA4kjMgCFBYDkXpRamJzqDFst2nIkHu1a8/j4fr71oT1W3eE+Ot+42DepqE3Cs4jZ00IFz1pdjj36BkpB6txkoMRZADgVTfIMlsl4ZIXBnN/QZkoG49eYRk7/68aABgE8S4Q9mPQ4dEaCChmeySOsukke78gqEiy5poQOQyEuMupizryCshWMHPvdJsGjDR1SFk7WQnYDHXAxocYOspeB3tN4bHrNNcGw4A3h+OSqEvogMUEXBOeC16IH/7O6sy740+SpgkNYgTwVrDXFY/S4SczbJ5DiJFlL6yceMs14GEhAZ4XhntF/M6SeG68Klwfnp2chEvbDjQHBQOFkGG2XgUzevoCIqKVJ4m6ow7ZfR+PZztvQQ4n0XfzXlTN/ZZz8j6Crp1R41En9Gu8KM3J3jmkxN+OiELm1NNOS4Jr/oIFqT1pH75DmakLPs//8UbRFpwbDwj3Bu83X1cuJ337i1/4Qup3eCQR1LQJn+cYtFM6X/wO994z473yjP4NLdmWBA9cLj+fa7dNA8dGWOYtTUpCP+Z66rZpgNzu3PcvfelL0wad9EXqES8sk6VWbcd7HJf65d5A/HKsOq9XHdQx9cGYxfkpE5NI2oxxDfHFhBKhRT3zGehEMPF3roO8L47Fd/fnhHMoMOwF1rjRe43HTfevDWs27wh9O/efd+BgFliTxvaEpx83Mzwtvo6dPTHeqP1/6OdgF1gMUOQykDiK4WWwb4bBh8ELEYUB5Onx7Jtz9tlnp5kmAxyCigGqeYBjYGGwveOOO2p3c4dSAgsjQ9IqAyJhzG7BILGLM+IHAVIF14pBYDUS7Vc1uDMI41FjqwWE5i1RiLBP2I033JCevdYosvh5H2Gt2BYsLNgdr5tBnrrFkHMsPDLse4RgOWLRovQsOxgfxSQeLdpwTPz8bnKG+vpS3eFNITzIlgX3xmP/LAosPGNL4/XRRgz6iAhezQKgDq4ZEUu5EQZ1xoa/VXkVOS/GB3FFYn+7MnBeBBYeMYQibdbKkHO+ujJxHM5NmIjNQJvFFeRrxEASAmcnccrICkH6NPtRsbs+Ior7hLJzHPKjqFuEQhYzCGDKw4vyMibkfeUQV4TnaTNWCDJRyfXA99I2EfE7CLs/eMMb0ma03C+UiTGDezCXfygILOqKfse58RyxdUIWN9zDCOe0/UhFqgLH5V7gXs+ip51wod6pD+4DVpniCc4imHamTMDPLIo5NotHeGQYZWXils+V25N+VpcHx985FqkS9KN2HtrhxrAPEcKEMaPC+cfOCEfPcnfaDMLzjEVTw4JpA18mfSDBADAQ1nmXGLQZ9PBakQzKbLFTz1A2DHXisjQMunhUECMDge8hCOtCSwzGDJIYAuqmlWHOIFwJEbz1rW9NK4v+6d3vTjkZd0WxtTEO9ntiHY2IougwDG/8HaNN+XujAaSed+7Y+6xGnlPHi8R29r6iDBgK2m5J/DseEz6PRwvBt2HjxiTU7ojnuScKkaXxMzyGBeNwXDQafA6P1ievuiq8Pc4f8Zh1MiNvJNcDhhpvGkZ7ICCW2oX8WsHnBxMaG+h5s+BCEOLpoB2ahQT5cgvmz0+exS9E8fTmN7855TgyocmTLsK1JEH/yZ/8Sdqkty/WP8KtedEAx2abDsJUnTwrcyiQxRXpBDyQnH7UKGapW8RMOxi/WOmMGKuDfk3/pv7f9ra3hSuuuCJtAvvGN74xPXaobgzMUOYcSvyzP/uz8M53vjNtTtvJpJixljLWCbHhigIrwl5YCKzj50xMq+W6mOgekrD31REzx4cnHT45zJ60bzd13FcQPmGFV90KFwY+QiIMLHlgrxMUjRD6YHZOiGp/wYyUayIM1skjOBphdstAi2ekrswICWajGObstWiEQRSPFR6J//7EJ8JXvvSl8HAs06YoerbFgZYcmydEEwJp6dIkRIH6nRoHcowps/eVq1eHqdOnh0VxEMfDeelzn5sWD7zs5S8Pp59xRjjmuOPS7HhdvG7ChpybF54sHjL8W69+dTJiV1x5ZQonTSM/qD98CHi77n/ggZS/xaNAEAvdGAGMIiKj3XMJ66CP0b+4jm4oIbDwUHQrsOj/eDj47uTYVqwYbBameDgQutTNmPj76lWr0qNhEFKs1uXFQ47xHrNjf28sy+EknUfRPrrpenJy/YSJE9P1cu5O78GDFTzfhNzwjFP/9CPIEzq85Xjn2u3RRcid/Ca8wXUeZ/o8q6NJh8gbI+Ml43tMgBC77RZDcK/Tprnf4f3jqQmI3nblpH8orlqjwIqMHT0ynLpgajhh3qS0aq6n/4YYrsydPDactnBKOHLmhCS2hiLc8IgrvB9VEELh8TN1Dz9uBbNFwlKESDoRWAxA3XhPqkCUIBIIkZDLhIhsFfpshnMjdhhwEYWd1AnGsxWIJQZvdnVmdozYI8Q3ZdKk5J1Iu3FHw4zBHB2PhQHFK0UoYXJ8b140PoiVnbF9WPbPTJ9cr4svuSQ9tZ8VT4Rqn/f856f8oSc/5Slp5RqGnrpG2I6Igz1G7BVxls7zJXmQ969ddlna7X1MFDRb4mcRAZQHw4AngOdHEqrsVhBng0O9DAS+NxCBRZ9s9+DnOgbqwQL6VOqvUVxT161mnNQvuVQIJzxaCKmbbrwxfOmaa9Lr+uuuS15EBPWihQvTBIZryY/aegLOlX48nl70k0769MEM/Y66J7SZQ3MZRAxhWF6I2DoBzaSIMDGrCrnfq8YQJl4kxbMTfBZSefxDeLGpMqKL+76TuqXMXAP3H0KwnSdbqlFgRbjpWSV3wtxJ4fxjZoTxve2Teg9lqIcLT5wdJo09tOuBAQuxVDezawWhMRLnCXl1EiLk+N2GqKpg0CUsg8jCU4TgqCNfI5//8Ic/3FZg4HHBm0RYrBVZrCCsEEo8N3BjHLjXPPZYGBWN7nOjMPo///f/Ji/G+9///vDKK64Ih0fjSs4KZUcUIkwRcCT/skcP+/XwGBxygBAjzPxJzCZcwSwa0UUS9oOxvjH4GA8MCW1AHRDGIMz7lre8Ja3WwvuFqCOpfnYUGBh5BDGrSfEIdEMWWIPxJPH9KsFaBfWPd5X2GAgDPS8goglNYdT5PonpVSCayKs6Np7rlFjeM6Jg5sXvvMff6kQiQm1OPMeDsU/gFcUz265PHwogsOjbiJc6EE8ILARS1RjCPUVfp4+3gokFkyEmZ93WLYKQMjYLRekMBVY/iKxjZk9ISd3Txo8e0HP3hjqERxfNGB9Onj85bV3BSsKhCm55jEzdwIBHiHwRwm5p3504e66Dz2N0yHVgxsgMsd13AIOFu7+E4eAYiIr8CAtCM1XhQgQN3iYe/0N58V4xGFeBIcRzQniAfJlGEImIGpK+b73lljAuGn4EFt4iPFFnR4Nx5ate9cQGrCTPEiYhtwOxQzsgRkliHxl/5+8kXxN+45zMmMn7YkAnlEgiNOKGcCWbJvJ53kv5KHEWTh4XoQ8MD2XjPCzpZ/Unou3ZF10UZkbDzeeZtU+cMCHcHkUhApE2rEowbmYwAit7MigbQqIbOB/eQDw/fL9bcqiXY3QDoSiS+n8S23l7bNt5c+fWlp37jL8jBCfEtqOeefE77/G3HCJrBaKc9iefi4nLQJ/HN9SgbeirTGboJ1XQt7m/8T5zz7fagJT65b6p6qN8n36PUGP/tE5gXGNMZOxiHKkb5xg3CCPWtfNwxRppYP7UceGsI6elVXNTxg3u8QJDDTz3E3tHhXPi9Z+6YMqQfzwOLm2MCwNPFcwIEVhsYknyN96dRgGCYcZbgmudvCPc9bjbc65DXaitEWaWpfZnokwchwGTJGK8WYgsyoZhIhTITwZSVvFRVjxJGC6+VxciQMCQ6I8wIgTXCIKEc5DATl3kvYxILkeM4UFinx+8UIgC/kb9cO0IUYzt9igOGawJjZx73nlpFl/XPoDRQDjxWVZPMuhzDeTq3BbFI/VAuRBvtDnGmlVorNxCKPL5XdFIYQDwBtDe1EunixPoQyQm55V03UBYEI9cnQenDq59ICFsRA3hKdqw29WmOZS8PIp46hMPVL5u6h2Bz8O36UudhvP4DJ/lO3yXY+TvsbksIUauFTHMo2LwcB7qIJppW+4X+neVOKGeqDf6bPZCNXvc24lp7kPGn2uuuSaNA0y0EE7c0608YrzPfZu3POH35nNmKDfXQl/rdhIxHFBgNYCgmDu5N7z4nAXhzCO6m/kNdfZe+9hD5tox6GzsWBXqghw+wyPFg55zyCmDIWDQxwtEkjSbjr7nPe9JRr0bCI+VEliZ7Mlig80///M/D6997WvTTzbf/Iu/+IuUm8TKvve9730plMnn24EYIAEX49xMXpXJtZCszPEQnwys7BbduFoKciiT71DHeLn4/Nhx41JSOoalGxBYJMDPjqKFvC6MAMnTbA3RaiNZPv+br3xlOP7EE9P+SutiO5IztDVeB2KaMnUCxgvPGgasW0/SYMOL1Cdhwro+3ArCennJPeXvBtoNjwft2CwoMbIro7HFG8vqTvoEbdoOPsNn+Q7f5RjNBptz8eL8fHY4QPvwcGb6auO90wrudUQWq3CbQ4H0L/pZXb4dEwruRbzZjGNMFBHTrcKOvI/H+6//+q9rV+BSXspNiL6TTXSHI8N+H6xG8OKMip2GPaC2bN8V1mzeHjb17Qq7drefpQ2Eg2kfrJPmTQ4XnzInXHTSnDBrUotk1Ca4CfOS7DpvAB6KA7EPVvY8MaCzcq4KZogYa4QUAxf7OTEQkbNECIoXq6HwEjGjI0zWqXHOYOTwJLAip9lIY2g63QcLA8QskcEuewUwRhgljkH5EVPZk0VZmam2M4IcE28LjwFiB3sMdLNx5ThswcAMmqR22hyPF7tUE+pDBOREWM6NJ+ILcca9LJaB92kL9jl61gUXpL2ZsperUzAihA659sfWrk2zcHKraAs8j/QzhFDOOeLzXBd1g8eNusATRLiSOiOBt13+C7CKkmulnyM86lalNkNok2tFnHUrdIBrpW8SOsOwdgrGlvATIraVWK4DkUqffCjWL1sr7Ih9By8T9wfbKbAHVm80pBhT6p0d2KlPQsa5/TNZkPG9dbEdaB9CgngyOV4WWdQpW2/Qvix4YB86+kcraM+DfR8sxrk85tV5aBEoeEbxrFKXHLNqIsS9Tl/ES8W9ile1Ee4l7n3Gr1ZiiPGCY+PR5TwINvo014JXizGOeuWF+OI9PPuUqyo8yLXhVWZyhUjkfmtedTzc0YPVRM5DOveY6eFZJ8wK08ePOaTzsdjJfuq40eHJR00Lzzt1XlpF2cn1ckMzkNXNug4kDNbc/LjhETXNg38jGDE8IMzaeCQOcw5ePBoHz9bHPvaxFBLESOdBlesnd4KBvN3xMfAYyVYeLAYkjtWuHvk75yKcgHFrHMiymOQaMDyISgZGrqsdnJtBG6OGQeLRNK1CWpwDQ8hPzo/g4vox5DkJloGYAZwcLVaSJU9RFCfk4/A3DA7J7AiObsNmHB/xRPiPJHaS3bNooVyEQgltITKzoETUsmEl5yOUifeMekKAduNNpKzUS3PYtAraBoGH6BzMSkCujxy1LHg7NV58fqDnxfOVtxHojfXFzvprYl9aGwUR4pRrOuXUU8NpUbhMie2+OYqrR2O/2xb72p7+sF8Gg87fEFfjYh/I32NbDlaF0m48jmdpPEdPvFb6Bzu5E0KuItct9THUYcygjzJOUefc33XXhdAnB5L7u5E81vFqNT400hguZO+yd73rXenxU3nM48X75Hvl+70V9C36Au1Fu9EmnfbP4YQCq4JT5k8JLzxzflpRN/kQzsea1NsTLjxpVrjgxFl7E9tHd5bYjqjg0S0Ha9ydG56ZPF4EZsXd5qK0I7v3WenW7vgMjMzYWw1WDKgIlHYzXQZNZoqvf/3r0+x1IB6RVnAd5FyxUq8ubIexZNaL14DZ8K4omNg+gUE29wGukxnxV6LYYSY8LR4bo4uB5tEn7Aw/mJVxXDPnY5f5Sy+5JBlnvGls/bA4irnPffazv7AxI+fhfMz4mdWzG/xAJgQYMGbonXpgczm5P2jbOvFdx0CPw+cHWs+ck/5FP+OpBpxz8d13h4mTJ4eXX355+MtogNmI8k1velPK7aP/Y2xzblUjiGq8MxyHz/IdVnqy+ejLXvayMCUK+3vvuy/dA3hBCWkj7OiTVeQ6qfvMUAMxjEeV/Me668oezWbP2b4cH6rgXuB+vuyyy1JqgbTGEGEFeLLYH4uVdNt37QlrNm0PO+PPks8qnDKuJzztmBlh2oQxYUzFir1t23eFOx5dH2564LFwz6rOkqo7hU1ET180JVx29oJw5qKpYcbEzh8nws1OaADPDka3lVsa8HKwIzCrwOpWy5SG68DwI7QQP3hcKC8zuIHC8TDWeG3ycwuZvWH88IrgvWnl4sdI8T0Sr1vlSWBgCD2QY4FRQsA0wjWQSE64iYGY/zPIZvd98+c7gWMwEDMDxSuEEKV9qgQIbUyOGh4p6pa6JOSD9wvPDl46HpHzuauvDovvvHNveCmWkXDSsdGAYIgRKXhXBjrT5XvUFQYd0YPHjnKQV8X7eFNS/lCsbwQrdY2hoY8S4l0QhQehqHigVJ4cTmxHNmC0MUm/GLmq/g4YSdoJ7xnGc7DXS0gH0YjArfNK5v6JN4TzUwfdCsp8TkKLhK8QM3i1mERwPfR36pW2J0RM+B1PJakVo+P5s2HnPkBws8oUw88YwOf53hP9JpYVUcFx87Fp1zohieeReuC8VcnwlJvQNSF56r8keIg5L16kqrYgLPn0pz89TfA68SLSbryyl5hztIK64XoYf5pFDe1GH6Ve84IM7o12fbVb6FNcH2MfYyBCnvNJaxRYNYzpGRGOnjUx7I6qanUUWBu27SwqssZFAXfMjPFhehRYk8fvdbE2jsXkX63e2Be+e+fK8JNH1odl8fcSEBbk8UBsJnrxyXPDc0+dF+ZN6W62y4CAcc9xegbTZhA2hFZ4bAODNEZ9f4P4wegwMPPK+VMMOp0MPBgoBjaOQ6iJGTZhrhe/+MXJ84PwwaCSm8RsnVfjcfk+woUBEYHEcRrh79QLq/4w3izDbvR00ScwSBgLxBBhPGaPnAOjy08EVv5ZB+diwGcQptw8g4wZKAMl11Bn2Bisydng+pJIjeVis1B2cCf8g5H99rXXhm9/61tJhJEfhZih3XNuF56VEmD8MdaEpRB2CC3+vzkKXEJSGCnaDCFAWckvQbzOiv/H4FBeRGUrsduK3AdyngzHpy+16j/0eYwgexzRV6jrElAG+khaFVnjCcX4ImgQGHxnIGSRRR4UxyH0xLUQfmr2jBD6plzcV5yPv1Mv9BdCihhktu1AXHNc4DP0BQQVXlNe3FucM3+mCsYcxhpECKGu5gkGxyDXDo8YZe80rNsp9H8ma1w319jYB7h/uFcRo7QB/YtxshMoN2UlxM2xEaiNx+bvjCMIN8L5zduoAPVKH0C0cp/n5HTKRdvwe7eTMc7LsbjnuB7Ct4wX3M+064EY04cSCqwauNkRIyR9z582Ljy6dmsSWdt2tN/7qCNiX98ej8eWEAunjw89o7gRfj7ArN3UF+6MwurztywJd63cFLbubC8IOgFxxXMGLztrQQqDkoPVeN5OyDctLwxPq9kkNyArvzDkGPCBDviDhUGA2SQDD14bBi8GR4xVOzCszNKYsSEU8XwwcDPYMaBRDxgRjo1XiYEfA8DAz/Uyq2R2TkikbqUNhp/vI7IoW4ayY3x4vhhGivNSJkQWAo+Bj0GTa6ky+hkGSuqBa2HXdERGnoG2axuMOtfFhpAYAJ5FtyOeD+OKgCE0iMhkDyTKQXlOigb016MQxXPHwF+y/XOb4q1C9Dz04IPJGHAePE0815D9rlgBStlItuc77DJ/YhS7eHjqwjGt4Nh4dDg+Hr1Wkwr6/Cte8Yp0fD5LmQYL7UNZ6RecF1HZDGXDS0yICJFVyqvAGEi/oa+3aj88hniUqH/anc/wk3Ji4FnYwKSgVRiJe4f66aZf8Hk8j9Q9Qrc5MZx64D5j89qqfMLBwL3O/UffQmg19oEsrhB3TIjob+0EY4a64LjUM9eIeGwcB7gu7vdXv/rV6fr4bCtyezHOIcQQsdQXx2eyQV0xNnUK50VU0a+ZVLLHHCF6BB5llXoOi4NzIX/MocuuPY+nEOF3Fq8K37pjRbj+vjV7Q4a7Byd4eqKomTmuJ4XnzjlyehRZ48K0CaPD6Ci01sbj37tqU/jZkg3hpgfWhjWbd4TtBVxnnOP0hVPDc06eE849enra82ugIAoQFCQX4yFgUOU9bnJmOwgCBhrEQOmBbiBQPhLV8cSw4gbjwHsMPAyUCBwG0GycMGoMTsy2STZmBs//m2el3EIMXHlFTp7RMwDxXWb/iDIMLoNuKygLg3ZeIcVMmfNwPrxAzIgRWrlsCB5EDGIHg8/1cG1cB23AdTFQI+g4DkKMwZLy4GHhmK2upYrc1p/59KfT9gv8H0OKyOrrN3CEiTjn9CgCOf4ll16avBMYun0FdUYIkPwrHs1CuWIHTAaItiREyRYNGGI2s3xy7I/MwMmfQ6x2Qw7h0Eas6qM+cj1nEUQ774s+Tx8ljMxKU64532sIaq4Tg4dYxvhxXZRpf0A9sNKWXdgRBKwmBMpG3VMecrCok5JQBzfffHOqE+4d+v3+qIeqPkD7c38y5uHxq0vUr4NrYSUgW8dwX9Pu9Cu8iTzhIHvGOrkuxjM8YoQz8/iA15uxhbai7zBucW8wLuF9ZTxA8PKT8zBm8GLsom4ZP7i3EGzSHgVWh5Cs27dzT/j6bcvD1bcuCT97ZH1YtbEvbC3gzRo/akQSWsfMnBAOnzo2jB0zKjy8enNYvGpLeGh9d1sCtIJJ1OiRI8LU8aPTTvXPPWVuuPCk2en/JcDQM+hwA/M7NyjeBVz1dcnfB5LsZaHMlJ1BB1HEYJINL4MKA0qncEyOQ34Ix0LcMNAys60SVo0weDMAsgUB3iC+z6DNi9/rZvqcG08CIUaui98ReAzOfBcxxavdcdpx7bXXJmPKI2eSIO2fSTNQs/weEXPOk5+cwoIYVupzX4MRIbn9m9/4RhLPXOfOWBaMCMn45AaR4L4p/p9ZODvO0z+pi4FCv8EA5nqmz9BX+Lkv+3zzvYaRzCHfbvpqKSgLYgfRze+N0PbkgyF49kXZcp+nLrjv9nc9NPYBQtRMwuomUZ2Sr4uoANGBPA6VuH/pM4wxvBhvGKfwliFOG4/Pz8HeI6LA6gpE1sZtO8ODq7eEr/5sefJm3frwuv6/Dhyic2yN0DtqZNrwk/tnx649SdBtH6SXDEjYnx+FG8nszzx+VnoUDnt9Ef4sAS5nblYMLr/jwWKQYZZ1sM506PaUlTJTdl68l8MWgOHs1MMD+ZjM3vk9u+s5Ziehgvx9BljKxUBHGXi1G1T5LiIHg5uvi3Nybr7LNeXZ6WBggEb8EXpjYF4ZZ9zAvcEsHm8d3isMAl6z0h6EVmRhShL+V7785XDjTTeFtdHYI7KAR/PMnjMn5cA9/3nPC+edf37qn4OpC+o3txP1nOt3X/d52rbxXgPOx/V001dLQVno73hx+L0R6oI+gJHeF2XLfT7Xxf6uh8Y+wLXme7WTe72OfF28qFOuJ78Ge/9ST7kPcR7GC66BuuMa8vH5Odh7RBRYA2Lrjl3hrmWbwo0PrAk33Lc23LZkQ1i5sS9tTnowgbDikTenL5wSnnLU9PCUo6eHI/qT6kUGCgYFrxGhBQxrBjFJaAyv2YEICROuIbxCiHbpkiVJdAGelIWLFqUcJTyKpROfRURaocAaBMvXbwu3L90QvvLT5eG2R9eHRx7bmjxc5Gax8vBAwA7sCKsJvaNScv4ZUVw977R54YITZ4fenhFtd2gXORQgfEOYBboN9YqIlECBNQgQUqwoZGXhbY9uCNfftzpce+fKJLQ29x0Ybxb7dh01c0I4/9gZ4WnHzUiPwJk9uTc9yFlxJcMFvGyEWKDbUK+ISAkUWIUg4Z3crLuWb0yve1dsSkKL0OGGra2fWVUKRNWC6ePCovg6YsaEtPv8CXMnhqNnTUjPOSSvS0RERPYfCqx9AOKK5HdeiK1H1m4NfTt3h+28du15IoTYbRgRBxRiiRdhwDHxhbgip+qsI6eGsxZNC6csmJw8WLwvIiIiBwYF1j4AMcX2DSTDr9m0Iyx5bGtYvGxjuG/VpvDwmi1h+Ya+sHbz9q7DiClpffLYlLh++LSx4cgZ45O36pjZE8K08WNS3hW7w/M5w4EiIiIHDgXWPgav1cYopEiI53E7CCtChqw43BTfXxP/z+N3qkheqyiYyKGaPHZ0fPWEyeN60u7vMyaMCXMm9z4RBlRTiYiIHBwosA4geLoeWL059O2oFlhsQ0K4b2YUUW6vICIiMjRQYB1A2JyRDUX5Wc1hezciHTkibUYqIiIiBz8KLBEREZHCuH5fREREpDAKLBEREZHCKLBERERECqPAEhERESmMAktERESkMAosERERkcIosEREREQKo8ASERERKYwCS0RERKQwCiwRERGRwiiwRERERAqjwBIREREpjAJLREREpDAKLBEREZHCKLBERERECqPAEhERESmMAktERESkMAosERERkcIosEREREQKo8ASERERKYwCS0RERKQwCiwRERGRwiiwRERERAqjwBIREREpjAJLREREpDAKLBEREZHCKLBERERECqPAEhERESmMAktERESkMAosERERkcIosEREREQKo8ASERERKYwCS0RERKQwCiwRERGRwiiwRERERAqjwBIREREpjAJLREREpDAKLBEREZHCKLBERERECqPAEhERESmMAktERESkMAosERERkcIosEREREQKo8ASERERKYwCS0RERKQwCiwRERGRwiiwRERERAqjwBIREREpjAJLREREpDAKLBEREZHCKLBERERECqPAEhERESmMAktERESkMAosERERkcIosEREREQKo8ASERERKYwCS0RERKQwCiwRERGRwiiwRERERAqjwBIREREpjAJLREREpDAKLBEREZHCKLBERERECqPAEhERESmMAktERESkMAosERERkcIosEREREQKo8ASERERKYwCS0RERKQwCiwRERGRwiiwRERERAqjwBIREREpjAJLREREpDAKLBEREZHCKLBERERECqPAEhERESmMAktERESkMAosERERkcIosEREREQKo8ASERERKYwCS0RERKQwCiwRERGRwiiwRERERAqjwBIREREpjAJLREREpDAKLBEREZHCKLBERERECqPAEhERESmMAktERESkMAosERERkcIosEREREQKo8ASERERKYwCS0RERKQwCiwRERGRwiiwRERERAqjwBIREREpjAJLREREpDAKLBEREZHCKLBERERECqPAEhERESmMAktERESkMAosERERkcIosEREREQKo8ASERERKYwCS0RERKQwCiwRERGRwiiwRERERAqjwBIREREpjAJLREREpDAKLBEREZHCKLBERERECqPAEhERESmMAktERESkMAosERERkcIosEREREQKo8ASERERKYwCS0RERKQwCiwRERGRwiiwRERERAqjwBIREREpjAJLREREpDAKLBEREZHCKLBERERECqPAEhERESmMAktERESkMAosERERkcIosEREREQKo8ASERERKYwCS0RERKQwCiwRERGRwiiwRERERAqjwBIREREpjAJLREREpDAKLBEREZHCKLBERERECqPAEhERESmMAktERESkMAosERERkcIosEREREQKo8ASERERKYwCS0RERKQwCiwRERGRwiiwRERERAqjwBIREREpjAJLREREpDAKLBEREZHCKLBERERECqPAEhERESmMAktERESkMAosERERkcIosEREREQKo8ASERERKYwCS0RERKQwCiwRERGRwiiwRERERAqjwBIREREpjAJLREREpDAKLBEREZHCKLBERERECqPAEhERESlKCP8PFlITPehprIAAAAAASUVORK5CYII=";

var img$2 = "data:image/svg+xml,%3csvg id='%e3%83%ac%e3%82%a4%e3%83%a4%e3%83%bc_1' data-name='%e3%83%ac%e3%82%a4%e3%83%a4%e3%83%bc 1' xmlns='http://www.w3.org/2000/svg' width='568.33' height='706.91' viewBox='0 0 568.33 706.91'%3e%3ctitle%3einset-icon%3c/title%3e%3cellipse cx='284.17' cy='287.59' rx='284.17' ry='284.16' style='fill:%230b308f'/%3e%3ctext transform='translate(75.76 557.24) scale(0.94 1)' style='isolation:isolate%3bfont-size:633.3125610351562px%3bfill:white%3bfont-family:UDDigiKyokashoNK-B%2c UD Digi Kyokasho NK-B'%3eT%3c/text%3e%3c/svg%3e";

var img$1 = "data:image/svg+xml,%3c%3fxml version='1.0' encoding='UTF-8' standalone='no'%3f%3e%3csvg xmlns:dc='http://purl.org/dc/elements/1.1/' xmlns:cc='http://creativecommons.org/ns%23' xmlns:rdf='http://www.w3.org/1999/02/22-rdf-syntax-ns%23' xmlns:svg='http://www.w3.org/2000/svg' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:sodipodi='http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd' xmlns:inkscape='http://www.inkscape.org/namespaces/inkscape' inkscape:version='0.92.5 (2060ec1f9f%2c 2020-04-08)' sodipodi:docname='connection-icon - %e3%82%b3%e3%83%94%e3%83%bc.svg' id='svg37191' style='fill-rule:evenodd%3bclip-rule:evenodd%3b' xml:space='preserve' version='1.1' viewBox='0 0 116 95' height='95px' width='116px'%3e%3cmetadata id='metadata37195'%3e%3crdf:RDF%3e%3ccc:Work rdf:about=''%3e%3cdc:format%3eimage/svg%2bxml%3c/dc:format%3e%3cdc:type rdf:resource='http://purl.org/dc/dcmitype/StillImage' /%3e%3cdc:title /%3e%3c/cc:Work%3e%3c/rdf:RDF%3e%3c/metadata%3e%3csodipodi:namedview inkscape:current-layer='microbit' inkscape:window-maximized='1' inkscape:window-y='871' inkscape:window-x='-11' inkscape:cy='38.886594' inkscape:cx='40.009905' inkscape:zoom='7.2845875' showgrid='false' id='namedview37193' inkscape:window-height='1541' inkscape:window-width='2880' inkscape:pageshadow='2' inkscape:pageopacity='0' guidetolerance='10' gridtolerance='10' objecttolerance='10' borderopacity='1' bordercolor='%23666666' pagecolor='white' /%3e%3cdefs id='defs37189'%3e%3cimage xlink:href='data:image/png%3bbase64%2ciVBORw0KGgoAAAANSUhEUgAAAHIAAABeCAYAAAD/s0AwAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACJ0lEQVR4nO3Z72raUByH8cdo/2xsJe0uQMH7v6RAcgFDLaWWLuJeGEtbZKuzLvrl%2bcB5I4f4g4ejiQ7YYTqejIBL4KJbg1379N%2bsgV/deq6aun2/4U2g6XgyAL51S6frAXiomnq9feElZHcKSzYnUKevBWbb0zmEl5P4AyOekwK4vivLx9liTtG9%2bB0Y9TiU/s0QuAEYTMeTSzanUefrZwFc9T2FDnZV4PdiggtDZrgo4OWGR%2berMGIIQ4YwZAhDhjBkCEOGMGQIQ4YwZAhDhjBkCEOGMGQIQ4YwZAhDhjBkCEOGMGQIQ4YwZAhDhjBkCEOGMGQIQ4YwZAhDhjBkCEOGMGQIQ4YwZAhDhjBkCEOGMGQIQ4YwZAhDhjBkCEOGMGQIQ4YwZAhDhjBkCEOGMGQIQ4YwZAhDhjBkCEOGMGQIQ4YwZAhDhjBkCEOGMGQIQ4YwZAhDhjBkiH1DPnbrM7XA7JOv%2bdoxZn7tHnj%2b5GvuPfNozzf4uuf%2bj85we4Trbh1j5tdujnDNvWf2ozWEIUMYMoQhQxgyhCFDGDJEAaz7HkIHWxfAqu8pdLBVweYnMp23tgCe%2bp5CB3sqqqZe4qk8Z23V1MvtXet9r6PoEPcAQ4DZYr66K8sVcN3rSNrXvGrqJ%2bhCAswW8/auLFvgEp8vT90KWGwjAgze75iOJwPgC5v/xEa79qgXazb3Mo/AsmrqN8//f400HU%2bGH9mno1pXTf3H5/3fEHBYu/7wayEAAAAASUVORK5CYII=' height='94px' width='114px' id='_Image1' /%3e%3cimage xlink:href='data:image/png%3bbase64%2ciVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAaUlEQVQ4je3PvQqAIABF4aMFQpO0ShT1/o9kZOLcz%2bYSLU3RIjlF5wE%2b7hUAQ9s1gAEUaUUgWDd5cSF9InBvlNeStxlJ%2bp2nlMyAAPBDP/RdKGZwogRCBigUy7butdYHUAFl6hJgtm7yJ21tFf%2bKFbzvAAAAAElFTkSuQmCC' height='18px' width='18px' id='_Image2' /%3e%3cimage xlink:href='data:image/png%3bbase64%2ciVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs%2b9AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAdElEQVQYlYWQrQ7AIAyEP8gQw8zMQ8L7PxIJ%2bGkQiM2UhZD9nGlzvV5/YEJw3gTnzcwrKSpgBSzQRQ0oQI05nYuQK7BNJmbgipbEzqMGWAAl%2b%2bwfQoBD/whu6JhTk8Xf0GJOrTuWD2EB6FdXiY/veWx/e/gF1ZkaTtgO5KEAAAAASUVORK5CYII=' height='10px' width='10px' id='_Image3' /%3e%3cimage xlink:href='data:image/png%3bbase64%2ciVBORw0KGgoAAAANSUhEUgAAAEsAAABGCAYAAACE0Gk0AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAVY0lEQVR4nM1cy3LbONo9uJCiJMeJesbpsqvSu%2blF5wFm2y%2bReR4/z%2bQlsp0HyCx6lqmya%2bLq1tixLIrEZRaHHwBKVGJ38v/TqGKRkijg4OC7AfxAha8oEVCPvVcB8Wva%2biPgeHQjwB6o%2bDvaVPnvXwP6f4XjUWQlcPvALi8fT/bl5SGoAfRjAB/F8LU4noDBPhlgCez16ydJJi4vy%2bso9UZFxFOAv4jh8vJpOH4HBilHG4mAmgRYAnv/XuHnn3n9yy/Tdf34Iyt59w54/ZrXb97EBLocaTVRxRSGy0vg7Vv1VRj43ziF4Rhhk5WPiNoHKOAE2GrF8/X1NNDzc1a0XscEXEAfI22//H9jOELYQeWTRIk0nZ0p/PKLwmqlcH2t8Je/AP/%2bt8Jvvym8eoUBkHQgN7bZRHz/fcS//kXg63V8FGmfI2kfw3KZ%2b7KP4cMH4LvvpjHc3PCefSmbIOw4WSVRJci21Tg9Jbj1WmE%2b531No3B3N67v9JSNtW3EdhuxWkVsNhF3d3EScElaSdLUQO1jaBreN4WhbVn/PoamCaNBKwmbIGtk4A/slBB1caFwc6PQtgTZdRrGKBijoZTCbKaw2Sj86U/Aw0MGu9mwsq6LWCwigABjIpomYrMJaFsSJaS9fQu8fp3bf/s2kwSw/c1GoWnYPqCwWGg8PCh4z3Zl8ABgsYj4z3%2bA5TJit4swJqJtA7ou4vQ04O5O4%2bYm4uIi4v17ti2ExYiolCoJG41CjFHEXiXVW681ViuFkxOF%2b3uNttXoOo3ZTME5Dec06lrBWnamqnKdfU9inIvoughrA6wN2O0i6jqgacKkpEmZkqRv3f7JScD9PdterQIAEjaoo1Iq4dHYL6VbPjtTk0QZY9C2FnVtMZtZhFAhhArzOc9Nw7MxNbbbGiFUAKp0nzEGShkABsYYnJ9rbDas/%2bYmH23L78/P2SbA/xljUl1S73Zbw5h61L7gCaHCbEa8bWthjEHXsf77e42TE/bz7ExN8jCUpIajqLhUv7ZVOD/Xg63SWK8NtDaYzQxCMAhBo2k0vKdKaq3Q9wpVBXhP0deao7jbBVSVx3arMZt5bDYcaUCh6wLOz2NSXQA4P6dNWi41lCJxy6VG1xnMZhp9b9A0GiFoABpaKxij0PeA1hFK8ZC2lQqYzTxi9ACA01Pg7o5tXV8HrNcKV1cjdYwMaOKIrIPI%2bOKCbNNGKNzdZaK6zmK55Chba7DbGVQVVcIYBedIvLUEq3VA3wcY46GUx3zuB/XxeHhgB2iDSG4uavheo20NFgsN5wzm8yxh3rPtEEhW2bZzbHu3YxuAR4zsU10D6zXgPfDiRUxqnmSn4GWI/w4j%2bCxVwMmJwnqdpWq7JVFVZfHwYDGfGzhnoRRBh0DCtJaoOyLGmCQK8AAcdjsPax0ASth2qzCf036JMxCjPZ%2brQRIpyX3P9prGwFoLgINlrQZtLtvuugilAmIMUMqj69jmdqtRVQpdB9Q1jX/bRnQd8P33tF3v36vB0UyHDjFGlQz72ZnCzQ3FXuxL29I%2bWUsb5ZxFjBWMsfDeoq4N%2bt4gxkyW1iTLOZLlvYMxmSxrHZxzWCw82jbAmADnIubziO2WRtt7qvnDA8lxjsdsZuC9hTEWfU%2bylFIIgW2HQLKqikQZ4%2bC9g1I9rHXQuodzDrudQ9M4xOjhvcdyGXB2FnBzE8XQi5GfnhsynhIXzWOx0GlkYyRRVVUhxgp1bQfgYoQJWmxWVYmdcABIklK0Q1prbLf8XamAEKg%2bIajhoERrbaCUhVIW1lYDdmKpKrbrPW2m1hFaRwAkoK4dQqBE9T3gHAbzELFYBHSdhvcR3tMzr9dqFFSXkpVCBkDh8lLj4kKhrs2BVIVQQesaSvFwroYx9EgxVgAIOsbsZUlAgNYOWjuEwNGVs0gb4KE1pWu7BeZzwHsx3lmKYqygdT6HwENrfdAu1d5DqR5AD%2b97WNshRh4hdNC6P5CurvO4uoq4vAyiikqpOC1ZNOyMhl%2b%2bVNCaUiXunsArGFNBqRre1wk8CaNKCGgeWQ0AA617hGBgDM8xehjj0fcc8b6ncfdejLkt2uAAec/PlDh6xGH0AZAsDooE0fzN%2bwCtPZQyUCpgsQioKoWPHxWWS/b/6upQskZR%2b9u3Ohn083ONuzuL%2bVwMeg2ta3g/gzEzhJDPgEgb1UJrGnoAsJaSpZRDjCJNHGlrO4RAadPaDZ2j6opKAWaQHB7O1QA4UDFWj2ozxg5AB6138H6XzsbsEEKHxaJD3ztstw6npw7X1wx1VquAN2/CMOifWc9arxUWC4WHB8Y5dM0cZQFPA18hBJKVwRsYQ%2bAhxIEEqgN/o/f03gDooXUP2h8PYwjOGCAEDaVor2KkJJVESUBKTGYIM5A8YIxmkDg6G5oDweKGgSDJDw8MkWQSPlGyjpcR6%2bkpXfbDg0Jd0yPVtdgEM6gRySJBNYAaMc4Q4wwhNIiRB9AAmKezUnOEMIcx8lsD7%2bfpXvlf%2bdn7ebrXmAYhsJ6y3vK/bJ9YROoFazYVtK11rYf%2bsb/zOadWE7yUZPF8dZVvlDmXMfRK1urBRVO6rDUJBEeapIkTiHEGpQR0c3BozbO1%2bSzEeD8ffW9Mvn//KNtRiu0LlhKftcTNYJp9CYH2zFoKhhThoVgFOa6GTUMjX1VkvKpUmlYYo4epDu0FYKGUqGA9fKaRZwRMYxujGH9KaZ7nuSEOCoO9iSnGYls04uJ1lcoE8Hsz1AcAETGG4jMDU4Bek/NRth8jieo6mpyuy/2eKGOyzs4YuX74QK9Q14y3ON8i832vCzed1ZJGVoiTDihoTbultQdQ/o8HvSzjL%2bmYMXEILuU%2bxnEcDNoqoEpxVwgGEmBzPuiHaxp61m0SQTHqFHd1HfvXtlmyfvuNPHBinbziccm6u1Np%2biBi6pxKDYlkcHQEQA4vYrSFZEXQ66rhOzlLHQxHtPaD2%2bf9SqnBCZjk9YSw/FnazFMskTDioSRzom9G%2bJ3LE3%2buh6kU8nxRsqS8epVn48slUswj5EmErlTuNGf9AsTsBYkxESRYtAZiVIWk%2bUF9IkKIxTxPpNemKD6rpU2qnckKw3chYeCgZLxaq0Hq8%2bA1DZL6yRL5Xjlcz5JF/z//mZ93O352Ls/oywZLEOVnuR6rnhmmSnawd5QQrbNHlWut6TDkWiQq20kDCYCl/hLLPh75LATt90n6Kf2eePgxLVkSY9W1Qgj5%2b7pmpbrgmICmaikJ42deqyH2MYhRlobU4ATCoIZIg5LJyIt/Eq2PVTq3M1X2cXqvMJsBfV/2T%2bHTJzVaGi/KoWRNlb7PI2Et0iT3WKGN4opD3Fsoi1H%2bWxrwbOfEDsl1KUGibiGU5OQ2xd4VS8EHRbBbiyRV0r8vlMeRBVCqRv/U8sgok0LjKtIhk9CQrvn7fkfUhPocqtS%2bxJTklG2IdAqOjCuOcB/r12fK48hqGp65%2bnhIlKxblUB5iNEWFZM5WyaPXosrlgCSxMjZewymoJQc1hNjGDxoXuSTtks8gq8kzDn2p%2bzfF8pncx1SaVt6xa5DWvalx%2bJnIUhm%2blkKJAQ4lAJ2rpTATHwIsnAo9YShHhT18PBeDeSoon5Zmsl2UOsI7znAxhB31wGzGftnzDciCyBRUsQO5REjKEqNLzoWBrXalz7en78rRz4WDqR0EmqQKNq60shLGCN1xOiHI0DrMWF0KlkVy359M7KkMLrG0DinJlxZCClKZ8wUkyckNlE9gpdVUXkCk6Vr3F5pszIpEjvpgVBObbLkZTPACD4/OCHW3I8nlMeRVVVswNqIvufn0qCPVcsPndfJYyoVk60qbYrW2QiLmpQGOAQ1LNWUwaROZ7Yhc8287i9YiCcPjrTDxUX2x3v25xHEPV2ygPzUhot045HMtiMOUXomVdaTSvA8yzSFkkW7JaosKojkJct5pUTpIoHeY1gTGxv/Eu9%2bOPPI8niyrM0GXYr32eDmSasfOh0SsRxpP9gPWXwbhxiUPiS7ohQlKk%2bLRJrynJKLghLg8jfauziSLMEoHhfI/RAP/03JAmgMq4oNOReTJyyBUfXi0LkcRtCOybNDPzgCUWMhDRg/qxM11gNxErVz8i0RPQdD1qaGWpKai9RzQOSJk3NI3vCR5Wlkic0CsieUNfMQRM3YSVFBceVaO3jvBwnjk5T9mEjslTgHqQvQsLY07HkRT%2bt8LQZf8ImdpD3M9so5JJv1lO4/iSwAQ%2b5CxG4H1HW2AdkuIbn%2b8jFYCHwgAfAhgkgaH%2blnCZPOlIY9T3Nk6mOGQbADIXFYM8srHSHgIIrXWmKr/TSB/yOyStLG0XoOHGlIgWxk8/NCSlX5NGcsYc6xE5wp5FBBHpjkpz0yI6igtQyQAfMlxDEceuDfQdLjyZrNqOt9L/FUVj%2bRhBxCqCHuAmhQqYLGOFjbo%2b8dgB58yuPSb87J1EWiehZ6N0qLtRreywpsjpeqinGcJLOJJxWvWgakEhOW0gZE1DWvyxWIJ5M1n0fc3lIl7HCrMWKjYrIFHDU9dFYlyTKGDzn57C4TRbJ6UBUdYgyw1sO5AGup4rOZrHLolENBD2sSoTHKvFHiMMEoKhwhOQ8iVZzukBzxjtstPfvz52z7SWStVnzm37b5u6qiikjuk0hWGS/RTqhCAiXNh7aKqtcn0oRICTk4OZbOyFIO4ykhi4/gMETsslTDuEvWrMTWlUTJjEEOCa7L0OH2lgH0ahVxff0IsiQNWoqooTRS1yGByFOWbK844iLiJIskMWPGWocYRcJIYF177HYh2SF6UoYMux3zuOgB88qBUkyTtFYIlRiMkpbxjGcMgrmuA7xnn4S0Uqr2ecCxJZoPH3hm0iyGKB0HOq91gPc5GGViRY6r9mMryT2QdCNJOXJOjD%2bPh4d8rVSf7in/l73rYTtKEZd8F0IY8huyd8xz2tw/6a/0/4tkvX/P8%2bkp7VXf0wBqTXtSSpX3zOajbSJpxmTQkjkjnZH4arfj4ZxD3/Ooa%2bZKLRa8Xiz4ua7zPcyn4n/L%2bvbbouMYYzImD6RIl7XsV13Tgd3e5nR04eEoWZKP/t13ER8/0sA3TUy5S1qHdAhRMoIC3rnciXK0Ja1IiKM68joEft80Dr/%2b6rFc8tw0ObyQe%2bV/x%2bo9hqPEO%2b4H%2b9Y0TKL7%2bJH9L/k4KllSTk8jlksadecyYdR/D2t9CjhlZA%2bBUl1EZfI6k0fXsZ7FgjlRIXjc3ga8fOmxXvN8exsQAn9fLMb/KwdDsnAkfiuJKvGFQK8rswfpk/RxuYxJsibKYa7DxUW%2bebdjjqcksvZ9gHOi%2bxmIgJVzVfUJeCaHUhCjx2zm0TSSMePx7Fkm6tdfA1694lkIe/ZMpCigaXzKODbGoet43fd5gKqqH%2bGRwcoEsh99H4Zr9nO3y30XHopch%2bP5WU3DPIT5nLnjklPedTWapkbfM%2bkiBKYpSrYwgGG9KCYyGVd1UKpH1/Wo6w7OMa9zPne4uwtDOmPAcpkXljabnHfPBGBmH1pr0XU16jpn8UjmIfGMc0s50CRLqR5V1aFtO9Q1M/%2b22x5Nw/ws7z3a1k/lZx2qoexwWK0okiJZ1gZ0Xc4jl/RGiZ0kbuJojj9770aqs9sFLJd%2btNtBiFqvYzqWy5B%2b2%2b2IYbnk/8v6vM/qLl61/MwcMEk%2bydLddUxEEck6PY0pl7Tc6SFqONrM8%2bYNN/1I8n7bEqDWAW3Lc9eFRJSkPQooOSj2PeqaQDndoZTNZrQ/2y330MxmAdttTGnVP/4YcXXF83rN77db3td1EdttwGLhU167tZKTmtubwlPmr3rv0HXjflnLvUSbDbfGvHtHPkQFgTht4GVf3osXMY2oMWFkVJlx3CfCRNVi7OBcBimj3rb5v9ttSPto2paSdX%2bfPdDr13mn2P09f5eBszZgu81xXdv6UTuMyzIWwVamdZfOxpi8n%2bfFizjq/75kUR1VNmay05PTHUmoj6gqEiZu3HuXCBPRl%2buqyiCbpk%2bBZFU5tC3BVVXAbMbcTZGq/aTXq6ssXU3D%2b6tKSA6oqhykNs10%2byUua7MahkCiqooSK329uyOG16/Tdj7hZ1qyfvwxJlX84QeStNlkyaoqlwgTQH3fj0RfInDvGUyKVC0WBCrSstnEJFUyULKNTT7f32ezwOkW6xEJcY4klFG/HH2fvxOiBH%2bM3D9kTMAPP4SkghP2CtjfYQEAf/ubxk8/ySYnnTY5yark/b3Bs2cGDw/cbLTbGSyXKqUlAZygSgzTdXT35ZSkjKlOTgL%2b8Y%2bIn3/OuxqkyG6Pd%2b80/vpX7kz7%2bNHg%2bfO8tiX5YG1rUNeSwq1S/oL3nPttNhGzGZ3DYuHx6ZPHyUkOeJsmpCzlq6uIf/4z4u9/D6VkHU6kf/opDllvtB%2byn2a1CtjtgJMTpD18s5ketpAwMayqMEgCCaOYRziXY6r7e7rkqgrDDjBujry54fbfcprx5g03bF5cRNzfc7Mn1ZeZPicnspZFQrjRSQ97gVjHbseVhMWC6hsjB49rYh6zGT2w95SqszPxiJ%2bZSO%2bnDb17h5H7Xq9pM7iyydH49IkqYMx4wnty0sMYfu66rIIkiqNY12HY%2bpFt1f4%2b6ZwUzPvu7vKmytWK9YnEdp1LWE5OMhalMpZPnyR69wVR47Dl3bsxD%2bMXZuRysJNVttzKvuiu0%2bh7jefPuZO075mXKZuSyiIblvo%2b7yItwcnuVdlUJPuj9zeUyz5p2Xwlu1q7TmO14hKO7GZ9DJaqoue7vaV0CxbZL11scCJXn9vJWpabGxq7pglpVKsqjGzPes1z17nRUf4mT3X2iVqvc4iwT5RImEiX7KU%2bP88Stl4HyH6bx2IRSXz50k8S9ZkyJktE7vIyG9qSMFHJpslA%2b56rBN770bFcOqxWPnWmVL2m4TY1Ub/SqJc4pMjvV1eUxHLwmiakwVitjmPp%2bzxgsjd7uQwHRBVStY9jRJbiMvEhSCFMbNj1dRhWGn1aJdgHuF7Tntzc8N7r63AAbv/1ACXAcuAEiwSr5eAJlpsbtncMy8uXsp0uYzn2boehfbVn5I%2brYQlSCCtHdrnMYF%2b98mkOJ8erVz79JiSJMf/CiyfkmCSsxLJeZ9LK9o5hEcylZB/DMlEmcylHKxGsgPfJ6wv2X28C5FecSCmnDOWLJkpgE0R9FsvUS4O%2bFZZHvI/maOLpUcJKoAIWQHp5jhRxweWLcj7zwp4pcF/EUr5R5KlYpgbsC1g%2bm6UbcyL%2bIVApX3od077xnnir0eeI%2biNheVRK8yRQNvao/3/NC77%2bSFge18BQYnn/U/PBvtEr7P6XWJ5E1n6Jj/z/tyDnj4DlvyKmjCu6E9atAAAAAElFTkSuQmCC' height='70px' width='75px' id='_Image4' /%3e%3cradialGradient id='_Radial2' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(1217.72%2c-59.7505%2c12.9632%2c284.312%2c552.955%2c1154.68)'%3e%3cstop offset='0' style='stop-color:rgb(212%2c170%2c0)%3bstop-opacity:1' id='stop31918' /%3e%3cstop offset='1' style='stop-color:rgb(211%2c177%2c44)%3bstop-opacity:1' id='stop31920' /%3e%3c/radialGradient%3e%3cradialGradient id='_Radial3' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(1217.72%2c-59.7505%2c12.9632%2c284.312%2c552.955%2c1154.68)'%3e%3cstop offset='0' style='stop-color:rgb(212%2c170%2c0)%3bstop-opacity:1' id='stop31923' /%3e%3cstop offset='1' style='stop-color:rgb(211%2c177%2c44)%3bstop-opacity:1' id='stop31925' /%3e%3c/radialGradient%3e%3cradialGradient id='_Radial4' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(466.809%2c-22.0906%2c4.9694%2c105.114%2c-471.791%2c488.167)'%3e%3cstop offset='0' style='stop-color:rgb(255%2c204%2c0)%3bstop-opacity:1' id='stop31928' /%3e%3cstop offset='1' style='stop-color:rgb(200%2c171%2c55)%3bstop-opacity:0' id='stop31930' /%3e%3c/radialGradient%3e%3clinearGradient id='_Linear5' x1='0' y1='0' x2='1' y2='0' gradientUnits='userSpaceOnUse' gradientTransform='matrix(0.968404%2c-222.261%2c222.261%2c0.968404%2c275.27%2c1681.54)'%3e%3cstop offset='0' style='stop-color:rgb(212%2c170%2c0)%3bstop-opacity:1' id='stop31933' /%3e%3cstop offset='1' style='stop-color:rgb(211%2c177%2c44)%3bstop-opacity:1' id='stop31935' /%3e%3c/linearGradient%3e%3clinearGradient id='_Linear6' x1='0' y1='0' x2='1' y2='0' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-43.5934%2c39.4616%2c-39.4616%2c-43.5934%2c1032.84%2c-2481.1)'%3e%3cstop offset='0' style='stop-color:rgb(255%2c230%2c128)%3bstop-opacity:1' id='stop31938' /%3e%3cstop offset='1' style='stop-color:rgb(212%2c170%2c0)%3bstop-opacity:1' id='stop31940' /%3e%3c/linearGradient%3e%3clinearGradient id='_Linear13' x1='0' y1='0' x2='1' y2='0' gradientUnits='userSpaceOnUse' gradientTransform='matrix(0.968404%2c-222.261%2c222.261%2c0.968404%2c-130.62%2c1681.54)'%3e%3cstop offset='0' style='stop-color:rgb(212%2c170%2c0)%3bstop-opacity:1' id='stop31973' /%3e%3cstop offset='1' style='stop-color:rgb(211%2c177%2c44)%3bstop-opacity:1' id='stop31975' /%3e%3c/linearGradient%3e%3clinearGradient id='_Linear14' x1='0' y1='0' x2='1' y2='0' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-43.5934%2c39.4616%2c-39.4616%2c-43.5934%2c626.948%2c-2481.1)'%3e%3cstop offset='0' style='stop-color:rgb(255%2c230%2c128)%3bstop-opacity:1' id='stop31978' /%3e%3cstop offset='1' style='stop-color:rgb(212%2c170%2c0)%3bstop-opacity:1' id='stop31980' /%3e%3c/linearGradient%3e%3cclipPath id='_clip15'%3e%3cpath d='m 101.275%2c1066.96 v 13.32 c 0%2c7.91 6.416%2c14.97 16.079%2c14.97 9.664%2c0 16.08%2c-6.77 16.08%2c-14.97 0%2c0 0%2c-13.32 0%2c-13.32 0%2c-7.91 -6.416%2c-14.96 -16.08%2c-14.96 -9.956%2c0 -16.079%2c6.76 -16.079%2c14.96 z m 0.978%2c0 c 0%2c-7.67 5.782%2c-13.95 15.101%2c-13.95 9.046%2c0 15.102%2c6.55 15.102%2c13.95 v 13.32 c 0%2c7.68 -6.056%2c13.95 -15.102%2c13.95 -9.045%2c0 -15.101%2c-6.55 -15.101%2c-13.95 z m 21.543%2c0 c 0%2c-1.98 -0.619%2c-3.73 -1.763%2c-4.99 -1.146%2c-1.26 -2.823%2c-2.04 -4.962%2c-2.04 -3.98%2c0 -6.442%2c3.36 -6.442%2c7.03 0%2c0 0%2c13.32 0%2c13.32 0%2c3.68 2.462%2c7.03 6.442%2c7.03 3.973%2c0 6.725%2c-3.36 6.725%2c-7.03 z m -0.978%2c0 v 13.32 c 0%2c3.14 -2.35%2c6.02 -5.747%2c6.02 -3.391%2c0 -5.464%2c-2.89 -5.464%2c-6.02 v -13.32 c 0%2c-3.13 2.073%2c-6.01 5.464%2c-6.01 1.829%2c0 3.27%2c0.64 4.25%2c1.72 0.983%2c1.08 1.497%2c2.59 1.497%2c4.29 z' id='path23949' /%3e%3c/clipPath%3e%3cclipPath id='_clip17'%3e%3cpath d='m 386.954%2c1059.94 c -0.025%2c0 -0.054%2c-0.01 -0.086%2c-0.01 h -0.218 c -0.637%2c0 -0.004%2c1.02 -0.004%2c1.02 l -0.49%2c-0.51 v 6.52 c 0%2c0.48 0.49%2c0.51 0.49%2c0.51 0%2c0 8.014%2c0 8.014%2c0 0%2c0 0%2c26.93 0%2c26.93 h 10.617 v -41.55 h -9.199 v 0.5 c 0%2c1.8 -0.229%2c3.22 -1.006%2c4.27 -0.571%2c0.77 -1.438%2c1.33 -2.697%2c1.71 -1.34%2c0.41 -3.103%2c0.6 -5.406%2c0.6 z m 0.181%2c6.51 v -5.5 c 4.857%2c-0.03 7.42%2c-0.96 8.714%2c-2.71 0.817%2c-1.11 1.15%2c-2.56 1.2%2c-4.38 0%2c0 7.249%2c0 7.249%2c0 0%2c0 0%2c39.52 0%2c39.52 0%2c0 -8.659%2c0 -8.659%2c0 0%2c0 0%2c-26.93 0%2c-26.93 z' id='path23955' /%3e%3c/clipPath%3e%3cclipPath id='_clip19'%3e%3cpath d='m 693.988%2c1094.4 h 28.847 l 0.021%2c-0.01 c 0.093%2c-0.01 0.468%2c-0.08 0.468%2c-0.5 v -7.65 c 0%2c-0.48 -0.489%2c0.5 -0.489%2c0.5 v -1.01 c 0%2c0 -16.787%2c0 -16.787%2c0 0.092%2c-1.45 0.615%2c-2.51 1.963%2c-3.75 1.071%2c-0.98 2.634%2c-2.08 4.863%2c-3.52 2.16%2c-1.16 4.887%2c-2.82 7.079%2c-5.04 2.253%2c-2.29 3.938%2c-5.18 3.938%2c-8.73 0%2c-8.82 -6.73%2c-12.69 -14.379%2c-12.69 -4.824%2c0 -8.547%2c1.47 -11.068%2c3.89 -2.544%2c2.43 -3.878%2c5.82 -3.878%2c9.65 v 0.51 h 10.333 v -0.51 c 0%2c-1.95 0.498%2c-3.33 1.345%2c-4.21 0.832%2c-0.86 1.988%2c-1.23 3.268%2c-1.23 1.146%2c0 2.169%2c0.3 2.901%2c0.97 0.723%2c0.66 1.145%2c1.67 1.145%2c3.06 0%2c1.82 -0.868%2c3.19 -2.273%2c4.43 -1.504%2c1.33 -3.605%2c2.51 -5.983%2c3.91 l -0.007%2c0.01 c -3.19%2c2.03 -5.931%2c3.99 -7.921%2c7.14 -1.986%2c3.14 -3.23%2c7.47 -3.375%2c14.26 z m 28.357%2c-7.66 v 6.64 h -27.354 c 0.188%2c-6.23 1.342%2c-10.27 3.202%2c-13.21 1.907%2c-3.02 4.549%2c-4.88 7.599%2c-6.82 v 0 c 2.438%2c-1.43 4.586%2c-2.66 6.128%2c-4.02 1.642%2c-1.45 2.617%2c-3.06 2.617%2c-5.2 0%2c-1.74 -0.57%2c-2.99 -1.477%2c-3.82 -0.898%2c-0.82 -2.143%2c-1.23 -3.548%2c-1.23 -1.555%2c0 -2.95%2c0.48 -3.961%2c1.53 -0.92%2c0.96 -1.533%2c2.4 -1.62%2c4.43 0%2c0 -8.377%2c0 -8.377%2c0 0.11%2c-3.33 1.32%2c-6.27 3.553%2c-8.41 2.368%2c-2.26 5.875%2c-3.62 10.405%2c-3.62 7.091%2c0 13.4%2c3.5 13.4%2c11.68 0%2c3.26 -1.575%2c5.9 -3.644%2c8 -2.124%2c2.16 -4.773%2c3.76 -6.862%2c4.88 l -0.036%2c0.02 c -5.916%2c3.84 -7.316%2c5.39 -7.316%2c8.65 v 0.5 z' id='path23961' /%3e%3c/clipPath%3e%3cclipPath id='_clip21'%3e%3cpath d='m 1003.75%2c1068.44 c -0.03%2c0 -0.05%2c0 -0.09%2c0 h -3.49 c -0.636%2c0 -0.11%2c1.01 -0.11%2c1.01 0%2c0 -0.486%2c-0.5 -0.486%2c-0.5 v 7.36 c 0%2c0.48 0.486%2c0.51 0.486%2c0.51 h 3.69 c 1.96%2c0 3.34%2c0.5 4.22%2c1.41 0.87%2c0.91 1.24%2c2.2 1.24%2c3.75 0%2c2.58 -1.81%2c4.88 -4.89%2c4.88 -1.7%2c0 -3.14%2c-0.57 -4.15%2c-1.68 -1.024%2c-1.12 -1.602%2c-2.78 -1.602%2c-4.9 v -0.5 h -10.049 v 0.5 c 0%2c4.41 1.478%2c8.15 4.231%2c10.79 2.736%2c2.63 6.742%2c4.18 11.85%2c4.18 8.23%2c0 15.23%2c-4.77 15.23%2c-12.7 0%2c-5.11 -2.44%2c-8.27 -5.76%2c-9.92 2.83%2c-1.53 5.19%2c-4.83 5.19%2c-9.07 0%2c-7.95 -7.01%2c-11.85 -14.66%2c-11.85 -5.266%2c0 -8.989%2c1.63 -11.402%2c4.12 -2.432%2c2.51 -3.546%2c5.89 -3.546%2c9.43 v 0.51 h 10.333 v -0.51 c 0%2c-2.03 0.325%2c-3.6 1.415%2c-4.53 0.72%2c-0.61 1.75%2c-0.92 3.2%2c-0.92 1.14%2c0 2.17%2c0.31 2.9%2c0.98 0.72%2c0.66 1.14%2c1.67 1.14%2c3.05 0%2c1.41 -0.22%2c2.57 -0.96%2c3.37 -0.74%2c0.81 -1.99%2c1.23 -3.93%2c1.23 z m -3.2%2c1.01 h 3.2 0.11 c 2.24%2c-0.02 3.66%2c-0.59 4.53%2c-1.54 0.89%2c-0.97 1.23%2c-2.36 1.23%2c-4.07 0%2c-1.73 -0.57%2c-2.99 -1.47%2c-3.81 -0.9%2c-0.83 -2.15%2c-1.23 -3.55%2c-1.23 -1.73%2c0 -2.96%2c0.42 -3.82%2c1.15 -1.192%2c1.01 -1.699%2c2.66 -1.766%2c4.8 10e-4%2c0 -8.374%2c0 -8.374%2c0 0.099%2c-3.08 1.12%2c-6.01 3.248%2c-8.2 2.264%2c-2.33 5.77%2c-3.82 10.712%2c-3.82 7.09%2c0 13.68%2c3.47 13.68%2c10.83 0%2c4.29 -2.67%2c7.52 -5.62%2c8.59 l -1.28%2c0.47 1.27%2c0.49 c 3.51%2c1.34 6.2%2c4.31 6.2%2c9.44 0%2c7.38 -6.6%2c11.68 -14.25%2c11.68 -4.817%2c0 -8.605%2c-1.42 -11.185%2c-3.9 -2.455%2c-2.36 -3.803%2c-5.66 -3.911%2c-9.54 h 8.096 c 0.091%2c2.18 0.77%2c3.89 1.859%2c5.09 1.191%2c1.3 2.871%2c2 4.861%2c2 3.71%2c0 5.87%2c-2.8 5.87%2c-5.9 0%2c-1.85 -0.48%2c-3.38 -1.52%2c-4.46 -1.04%2c-1.07 -2.63%2c-1.71 -4.92%2c-1.71 v 0 c -0.02%2c0 -0.03%2c0 -0.05%2c0 h -3.15 z' id='path23965' /%3e%3c/clipPath%3e%3cclipPath id='_clip23'%3e%3cpath d='m 1035.44%2c1094.4 h 9.47 l 14.82%2c-41.55 h -11.27 l -8.43%2c27.46 c 0%2c0 -8.43%2c-27.46 -8.43%2c-27.46 h -10.98 z m 8.79%2c-1.02 h -8.11 c 0%2c0 -14.1%2c-39.52 -14.1%2c-39.52 0%2c0 8.87%2c0 8.87%2c0 0%2c0 9.14%2c29.8 9.14%2c29.8 l 9.15%2c-29.8 c 0%2c0 9.14%2c0 9.14%2c0 z' id='path23967' /%3e%3c/clipPath%3e%3cclipPath id='_clip25'%3e%3cpath d='m 1278.77%2c1079.94 h 1.92 0.02 c 0.1%2c-0.01 0.47%2c-0.09 0.47%2c-0.51 v -7.08 c 0%2c-0.48 -0.49%2c0.5 -0.49%2c0.5 v -1.01 h -20.97 v 1.01 l -0.49%2c-0.5 v 7.08 c 0%2c0.48 0.49%2c0.51 0.49%2c0.51 h 6.5 c -0.76%2c3.75 -3.94%2c6.64 -9.06%2c6.64 -3.27%2c0 -5.84%2c-0.95 -7.75%2c-2.54 -2.87%2c-2.38 -4.23%2c-6.18 -4.23%2c-10.28 0%2c-6.53 3.79%2c-12.81 11.14%2c-12.81 4.53%2c0 7.77%2c2.89 8.3%2c5.82 l 0.08%2c0.41 h 10.85 l -0.04%2c-0.54 c -0.58%2c-7.87 -8.12%2c-14.64 -19.19%2c-14.64 -13.64%2c0 -21.75%2c10.45 -21.75%2c21.76 0%2c11.61 7.82%2c21.77 21.75%2c21.77 11.74%2c0 18.66%2c-6.23 20.52%2c-15.59 0%2c0 0.97%2c0 1.93%2c0 z m 1.43%2c-1.01 h -3.7 c -0.64%2c0 -0.06%2c1.01 -0.06%2c1.01 h -0.59 l 0.11%2c-0.6 c -1.66%2c9.12 -8.31%2c15.18 -19.64%2c15.18 -13.29%2c0 -20.78%2c-9.68 -20.78%2c-20.76 0%2c-10.79 7.76%2c-20.75 20.78%2c-20.75 10.2%2c0 17.31%2c5.97 18.16%2c13.16 0%2c0 -8.99%2c0 -8.99%2c0 -0.81%2c-3.16 -4.29%2c-6.24 -9.17%2c-6.24 -7.96%2c0 -12.12%2c6.76 -12.12%2c13.83 0%2c4.42 1.5%2c8.5 4.6%2c11.07 2.06%2c1.72 4.83%2c2.76 8.36%2c2.76 5.97%2c0 9.53%2c-3.61 10.13%2c-8.09 l -0.49%2c0.44 c 0%2c0 0.63%2c-1.01 -0.02%2c-1.01 h -6.57 v -6.08 h 19.99 z' id='path23973' /%3e%3c/clipPath%3e%3cclipPath id='_clip27'%3e%3cpath d='m 1307.42%2c1077.83 -13.97%2c-24.98 h -10.69 v 41.55 h 10.33 v -24.72 c 0%2c0 13.97%2c24.72 13.97%2c24.72 h 10.69 v -41.55 h -10.33 z m 0.06%2c2.14 0.91%2c1.63 v -27.74 c 0%2c0 8.38%2c0 8.38%2c0 0%2c0 0%2c39.52 0%2c39.52 0%2c0 -9.15%2c0 -9.15%2c0 0%2c0 -15.51%2c-27.44 -15.51%2c-27.44 v 27.44 c 0%2c0 -8.38%2c0 -8.38%2c0 0%2c0 0%2c-39.52 0%2c-39.52 0%2c0 9.15%2c0 9.15%2c0 0%2c0 14.6%2c26.11 14.6%2c26.11 z' id='path23979' /%3e%3c/clipPath%3e%3cclipPath id='_clip29'%3e%3cpath d='m 1339.94%2c1053.86 v -0.73 h -15.52 v 41.55 h 15.52 c 13.93%2c0 21.75%2c-10.18 21.75%2c-20.92 0%2c-10.73 -7.82%2c-20.91 -21.75%2c-20.91 z m 0.43%2c0.01 c 13.01%2c0.21 20.34%2c9.77 20.34%2c19.89 0%2c10.24 -7.49%2c19.91 -20.77%2c19.91 0%2c0 -14.54%2c0 -14.54%2c0 0%2c0 0%2c-39.53 0%2c-39.53 0%2c0 14.54%2c0 14.54%2c0 0%2c0 0.31%2c-0.02 0.43%2c-0.27 z m -6.31%2c7.93 v 24.38 h 5.59 l 0.19%2c-0.01 c 7.85%2c-0.09 12.21%2c-6.25 12.21%2c-12.69 0%2c-6.49 -4.72%2c-12.7 -12.4%2c-12.7 v 0 h -0.01 -5.02 c -0.63%2c0 -0.07%2c1.02 -0.07%2c1.02 z m 5.59%2c23.36 h -0.01 -4.6 v -23.36 h 4.61 c 7.07%2c0 11.42%2c5.7 11.42%2c11.68 0%2c5.98 -4.08%2c11.68 -11.42%2c11.68 z m -5.59%2c-23.36 v -0.51 z' id='path23981' /%3e%3c/clipPath%3e%3cclipPath id='_clip31'%3e%3cpath d='M 41.797%2c1012.94 H -0.979 v 55.44 c 0%2c30.98 17.776%2c57.96 41.302%2c72.31 l 1.474%2c0.9 z m -40.819%2c2.03 H 39.84 c 0%2c0 0%2c123.05 0%2c123.05 -22.224%2c-14.21 -38.861%2c-40.05 -38.861%2c-69.64 z' id='path24303' /%3e%3c/clipPath%3e%3cclipPath id='_clip33'%3e%3cpath d='m 1369.86%2c1012.94 v 128.36 l 1.47%2c-0.9 c 23.53%2c-14.34 41.3%2c-41.32 41.3%2c-72.02 0%2c0 0%2c-55.44 0%2c-55.44 z m 1.95%2c124.79 v -122.76 c 0%2c0 38.86%2c0 38.86%2c0 0%2c0 0%2c53.41 0%2c53.41 0%2c29.32 -16.63%2c55.14 -38.86%2c69.35 z' id='path24305' /%3e%3c/clipPath%3e%3clinearGradient id='_Linear35' x1='0' y1='0' x2='1' y2='0' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-0.630291%2c37.1875%2c-37.1875%2c-0.630291%2c-419.105%2c418.619)'%3e%3cstop offset='0' style='stop-color:rgb(255%2c255%2c0)%3bstop-opacity:0' id='stop31993' /%3e%3cstop offset='0.55' style='stop-color:rgb(255%2c221%2c85)%3bstop-opacity:1' id='stop31995' /%3e%3cstop offset='1' style='stop-color:rgb(255%2c221%2c85)%3bstop-opacity:0' id='stop31997' /%3e%3c/linearGradient%3e%3clinearGradient id='_Linear36' x1='0' y1='0' x2='1' y2='0' gradientUnits='userSpaceOnUse' gradientTransform='matrix(37.1875%2c0.630291%2c-0.630291%2c37.1875%2c418.619%2c419.105)'%3e%3cstop offset='0' style='stop-color:rgb(255%2c255%2c0)%3bstop-opacity:0' id='stop32000' /%3e%3cstop offset='0.55' style='stop-color:rgb(255%2c221%2c85)%3bstop-opacity:1' id='stop32002' /%3e%3cstop offset='1' style='stop-color:rgb(255%2c221%2c85)%3bstop-opacity:0' id='stop32004' /%3e%3c/linearGradient%3e%3clinearGradient id='_Linear42' x1='0' y1='0' x2='1' y2='0' gradientUnits='userSpaceOnUse' gradientTransform='matrix(127.547%2c33.716%2c-33.716%2c127.547%2c679.481%2c1846.4)'%3e%3cstop offset='0' style='stop-color:rgb(128%2c128%2c128)%3bstop-opacity:1' id='stop32042' /%3e%3cstop offset='1' style='stop-color:rgb(140%2c140%2c140)%3bstop-opacity:1' id='stop32044' /%3e%3c/linearGradient%3e%3clinearGradient id='_Linear44' x1='0' y1='0' x2='1' y2='0' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-25.8869%2c0%2c0%2c-25.8869%2c701.405%2c1863.49)'%3e%3cstop offset='0' style='stop-color:rgb(128%2c128%2c128)%3bstop-opacity:1' id='stop32048' /%3e%3cstop offset='1' style='stop-color:rgb(140%2c140%2c140)%3bstop-opacity:1' id='stop32050' /%3e%3c/linearGradient%3e%3clinearGradient id='_Linear45' x1='0' y1='0' x2='1' y2='0' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-28.6377%2c0%2c0%2c-28.6377%2c701.334%2c1863.49)'%3e%3cstop offset='0' style='stop-color:rgb(128%2c128%2c128)%3bstop-opacity:1' id='stop32053' /%3e%3cstop offset='1' style='stop-color:rgb(140%2c140%2c140)%3bstop-opacity:1' id='stop32055' /%3e%3c/linearGradient%3e%3clinearGradient id='_Linear46' x1='0' y1='0' x2='1' y2='0' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-28.867%2c0%2c0%2c-28.867%2c-787.593%2c-1850.9)'%3e%3cstop offset='0' style='stop-color:rgb(128%2c128%2c128)%3bstop-opacity:1' id='stop32058' /%3e%3cstop offset='1' style='stop-color:rgb(140%2c140%2c140)%3bstop-opacity:1' id='stop32060' /%3e%3c/linearGradient%3e%3cradialGradient id='_Radial47' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-13.7525%2c-13.3081%2c12.5963%2c-13.205%2c-800.638%2c-1853.57)'%3e%3cstop offset='0' style='stop-color:rgb(204%2c204%2c204)%3bstop-opacity:1' id='stop32063' /%3e%3cstop offset='1' style='stop-color:rgb(140%2c140%2c140)%3bstop-opacity:1' id='stop32065' /%3e%3c/radialGradient%3e%3cradialGradient id='_Radial48' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-31.4592%2c4.35394e-6%2c-3.02828e-6%2c-26.6266%2c688.739%2c-1858.25)'%3e%3cstop offset='0' style='stop-color:white%3bstop-opacity:0.7' id='stop32068' /%3e%3cstop offset='0.69' style='stop-color:rgb(173%2c173%2c173)%3bstop-opacity:0.42' id='stop32070' /%3e%3cstop offset='1' style='stop-color:rgb(51%2c51%2c51)%3bstop-opacity:0' id='stop32072' /%3e%3c/radialGradient%3e%3clinearGradient id='_Linear50' x1='0' y1='0' x2='1' y2='0' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-15.2653%2c0%2c0%2c-15.2653%2c698.248%2c1857.21)'%3e%3cstop offset='0' style='stop-color:rgb(51%2c51%2c51)%3bstop-opacity:1' id='stop32076' /%3e%3cstop offset='1' style='stop-color:rgb(51%2c51%2c51)%3bstop-opacity:0' id='stop32078' /%3e%3c/linearGradient%3e%3clinearGradient id='_Linear51' x1='0' y1='0' x2='1' y2='0' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-15.2653%2c0%2c0%2c-15.2653%2c-791.141%2c-1857.01)'%3e%3cstop offset='0' style='stop-color:rgb(51%2c51%2c51)%3bstop-opacity:1' id='stop32081' /%3e%3cstop offset='1' style='stop-color:rgb(51%2c51%2c51)%3bstop-opacity:0' id='stop32083' /%3e%3c/linearGradient%3e%3cradialGradient id='_Radial57' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-13.7525%2c-13.3081%2c12.5963%2c-13.205%2c-800.638%2c-1853.57)'%3e%3cstop offset='0' style='stop-color:rgb(204%2c204%2c204)%3bstop-opacity:1' id='stop32107' /%3e%3cstop offset='1' style='stop-color:rgb(140%2c140%2c140)%3bstop-opacity:1' id='stop32109' /%3e%3c/radialGradient%3e%3cradialGradient id='_Radial58' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-31.4592%2c4.35394e-6%2c-3.02828e-6%2c-26.6266%2c688.739%2c-1858.25)'%3e%3cstop offset='0' style='stop-color:white%3bstop-opacity:0.7' id='stop32112' /%3e%3cstop offset='0.69' style='stop-color:rgb(173%2c173%2c173)%3bstop-opacity:0.42' id='stop32114' /%3e%3cstop offset='1' style='stop-color:rgb(51%2c51%2c51)%3bstop-opacity:0' id='stop32116' /%3e%3c/radialGradient%3e%3cradialGradient id='_Radial65' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-13.7525%2c-13.3081%2c12.5963%2c-13.205%2c-800.638%2c-1853.57)'%3e%3cstop offset='0' style='stop-color:rgb(204%2c204%2c204)%3bstop-opacity:1' id='stop32149' /%3e%3cstop offset='1' style='stop-color:rgb(140%2c140%2c140)%3bstop-opacity:1' id='stop32151' /%3e%3c/radialGradient%3e%3cradialGradient id='_Radial66' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-31.4592%2c4.35394e-6%2c-3.02828e-6%2c-26.6266%2c688.739%2c-1858.25)'%3e%3cstop offset='0' style='stop-color:white%3bstop-opacity:0.7' id='stop32154' /%3e%3cstop offset='0.69' style='stop-color:rgb(173%2c173%2c173)%3bstop-opacity:0.42' id='stop32156' /%3e%3cstop offset='1' style='stop-color:rgb(51%2c51%2c51)%3bstop-opacity:0' id='stop32158' /%3e%3c/radialGradient%3e%3cradialGradient id='_Radial73' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-13.7525%2c-13.3081%2c12.5963%2c-13.205%2c-800.638%2c-1853.57)'%3e%3cstop offset='0' style='stop-color:rgb(204%2c204%2c204)%3bstop-opacity:1' id='stop32191' /%3e%3cstop offset='1' style='stop-color:rgb(140%2c140%2c140)%3bstop-opacity:1' id='stop32193' /%3e%3c/radialGradient%3e%3cradialGradient id='_Radial74' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-31.4592%2c4.35394e-6%2c-3.02828e-6%2c-26.6266%2c688.739%2c-1858.25)'%3e%3cstop offset='0' style='stop-color:white%3bstop-opacity:0.7' id='stop32196' /%3e%3cstop offset='0.69' style='stop-color:rgb(173%2c173%2c173)%3bstop-opacity:0.42' id='stop32198' /%3e%3cstop offset='1' style='stop-color:rgb(51%2c51%2c51)%3bstop-opacity:0' id='stop32200' /%3e%3c/radialGradient%3e%3cradialGradient id='_Radial81' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-13.7525%2c-13.3081%2c12.5963%2c-13.205%2c-800.638%2c-1853.57)'%3e%3cstop offset='0' style='stop-color:rgb(204%2c204%2c204)%3bstop-opacity:1' id='stop32233' /%3e%3cstop offset='1' style='stop-color:rgb(140%2c140%2c140)%3bstop-opacity:1' id='stop32235' /%3e%3c/radialGradient%3e%3cradialGradient id='_Radial82' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-31.4592%2c4.35394e-6%2c-3.02828e-6%2c-26.6266%2c688.739%2c-1858.25)'%3e%3cstop offset='0' style='stop-color:white%3bstop-opacity:0.7' id='stop32238' /%3e%3cstop offset='0.69' style='stop-color:rgb(173%2c173%2c173)%3bstop-opacity:0.42' id='stop32240' /%3e%3cstop offset='1' style='stop-color:rgb(51%2c51%2c51)%3bstop-opacity:0' id='stop32242' /%3e%3c/radialGradient%3e%3cradialGradient id='_Radial89' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-13.7525%2c-13.3081%2c12.5963%2c-13.205%2c-800.638%2c-1853.57)'%3e%3cstop offset='0' style='stop-color:rgb(204%2c204%2c204)%3bstop-opacity:1' id='stop32275' /%3e%3cstop offset='1' style='stop-color:rgb(140%2c140%2c140)%3bstop-opacity:1' id='stop32277' /%3e%3c/radialGradient%3e%3cradialGradient id='_Radial90' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-31.4592%2c4.35394e-6%2c-3.02828e-6%2c-26.6266%2c688.739%2c-1858.25)'%3e%3cstop offset='0' style='stop-color:white%3bstop-opacity:0.7' id='stop32280' /%3e%3cstop offset='0.69' style='stop-color:rgb(173%2c173%2c173)%3bstop-opacity:0.42' id='stop32282' /%3e%3cstop offset='1' style='stop-color:rgb(51%2c51%2c51)%3bstop-opacity:0' id='stop32284' /%3e%3c/radialGradient%3e%3cradialGradient id='_Radial97' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-13.7525%2c-13.3081%2c12.5963%2c-13.205%2c-800.638%2c-1853.57)'%3e%3cstop offset='0' style='stop-color:rgb(204%2c204%2c204)%3bstop-opacity:1' id='stop32317' /%3e%3cstop offset='1' style='stop-color:rgb(140%2c140%2c140)%3bstop-opacity:1' id='stop32319' /%3e%3c/radialGradient%3e%3cradialGradient id='_Radial98' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-31.4592%2c4.35394e-6%2c-3.02828e-6%2c-26.6266%2c688.739%2c-1858.25)'%3e%3cstop offset='0' style='stop-color:white%3bstop-opacity:0.7' id='stop32322' /%3e%3cstop offset='0.69' style='stop-color:rgb(173%2c173%2c173)%3bstop-opacity:0.42' id='stop32324' /%3e%3cstop offset='1' style='stop-color:rgb(51%2c51%2c51)%3bstop-opacity:0' id='stop32326' /%3e%3c/radialGradient%3e%3cradialGradient id='_Radial105' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-13.7525%2c-13.3081%2c12.5963%2c-13.205%2c-800.638%2c-1853.57)'%3e%3cstop offset='0' style='stop-color:rgb(204%2c204%2c204)%3bstop-opacity:1' id='stop32359' /%3e%3cstop offset='1' style='stop-color:rgb(140%2c140%2c140)%3bstop-opacity:1' id='stop32361' /%3e%3c/radialGradient%3e%3cradialGradient id='_Radial106' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-31.4592%2c4.35394e-6%2c-3.02828e-6%2c-26.6266%2c688.739%2c-1858.25)'%3e%3cstop offset='0' style='stop-color:white%3bstop-opacity:0.7' id='stop32364' /%3e%3cstop offset='0.69' style='stop-color:rgb(173%2c173%2c173)%3bstop-opacity:0.42' id='stop32366' /%3e%3cstop offset='1' style='stop-color:rgb(51%2c51%2c51)%3bstop-opacity:0' id='stop32368' /%3e%3c/radialGradient%3e%3cradialGradient id='_Radial113' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-13.7525%2c-13.3081%2c12.5963%2c-13.205%2c-800.638%2c-1853.57)'%3e%3cstop offset='0' style='stop-color:rgb(204%2c204%2c204)%3bstop-opacity:1' id='stop32401' /%3e%3cstop offset='1' style='stop-color:rgb(140%2c140%2c140)%3bstop-opacity:1' id='stop32403' /%3e%3c/radialGradient%3e%3cradialGradient id='_Radial114' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-31.4592%2c4.35394e-6%2c-3.02828e-6%2c-26.6266%2c688.739%2c-1858.25)'%3e%3cstop offset='0' style='stop-color:white%3bstop-opacity:0.7' id='stop32406' /%3e%3cstop offset='0.69' style='stop-color:rgb(173%2c173%2c173)%3bstop-opacity:0.42' id='stop32408' /%3e%3cstop offset='1' style='stop-color:rgb(51%2c51%2c51)%3bstop-opacity:0' id='stop32410' /%3e%3c/radialGradient%3e%3cradialGradient id='_Radial121' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-13.7525%2c-13.3081%2c12.5963%2c-13.205%2c-800.638%2c-1853.57)'%3e%3cstop offset='0' style='stop-color:rgb(204%2c204%2c204)%3bstop-opacity:1' id='stop32443' /%3e%3cstop offset='1' style='stop-color:rgb(140%2c140%2c140)%3bstop-opacity:1' id='stop32445' /%3e%3c/radialGradient%3e%3cradialGradient id='_Radial122' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-31.4592%2c4.35394e-6%2c-3.02828e-6%2c-26.6266%2c688.739%2c-1858.25)'%3e%3cstop offset='0' style='stop-color:white%3bstop-opacity:0.7' id='stop32448' /%3e%3cstop offset='0.69' style='stop-color:rgb(173%2c173%2c173)%3bstop-opacity:0.42' id='stop32450' /%3e%3cstop offset='1' style='stop-color:rgb(51%2c51%2c51)%3bstop-opacity:0' id='stop32452' /%3e%3c/radialGradient%3e%3cradialGradient id='_Radial129' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-13.7525%2c-13.3081%2c12.5963%2c-13.205%2c-800.638%2c-1853.57)'%3e%3cstop offset='0' style='stop-color:rgb(204%2c204%2c204)%3bstop-opacity:1' id='stop32485' /%3e%3cstop offset='1' style='stop-color:rgb(140%2c140%2c140)%3bstop-opacity:1' id='stop32487' /%3e%3c/radialGradient%3e%3cradialGradient id='_Radial130' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-31.4592%2c4.35394e-6%2c-3.02828e-6%2c-26.6266%2c688.739%2c-1858.25)'%3e%3cstop offset='0' style='stop-color:white%3bstop-opacity:0.7' id='stop32490' /%3e%3cstop offset='0.69' style='stop-color:rgb(173%2c173%2c173)%3bstop-opacity:0.42' id='stop32492' /%3e%3cstop offset='1' style='stop-color:rgb(51%2c51%2c51)%3bstop-opacity:0' id='stop32494' /%3e%3c/radialGradient%3e%3cradialGradient id='_Radial137' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-13.7525%2c-13.3081%2c12.5963%2c-13.205%2c-800.638%2c-1853.57)'%3e%3cstop offset='0' style='stop-color:rgb(204%2c204%2c204)%3bstop-opacity:1' id='stop32527' /%3e%3cstop offset='1' style='stop-color:rgb(140%2c140%2c140)%3bstop-opacity:1' id='stop32529' /%3e%3c/radialGradient%3e%3cradialGradient id='_Radial138' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-31.4592%2c4.35394e-6%2c-3.02828e-6%2c-26.6266%2c688.739%2c-1858.25)'%3e%3cstop offset='0' style='stop-color:white%3bstop-opacity:0.7' id='stop32532' /%3e%3cstop offset='0.69' style='stop-color:rgb(173%2c173%2c173)%3bstop-opacity:0.42' id='stop32534' /%3e%3cstop offset='1' style='stop-color:rgb(51%2c51%2c51)%3bstop-opacity:0' id='stop32536' /%3e%3c/radialGradient%3e%3cradialGradient id='_Radial145' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-13.7525%2c-13.3081%2c12.5963%2c-13.205%2c-800.638%2c-1853.57)'%3e%3cstop offset='0' style='stop-color:rgb(204%2c204%2c204)%3bstop-opacity:1' id='stop32569' /%3e%3cstop offset='1' style='stop-color:rgb(140%2c140%2c140)%3bstop-opacity:1' id='stop32571' /%3e%3c/radialGradient%3e%3cradialGradient id='_Radial146' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-31.4592%2c4.35394e-6%2c-3.02828e-6%2c-26.6266%2c688.739%2c-1858.25)'%3e%3cstop offset='0' style='stop-color:white%3bstop-opacity:0.7' id='stop32574' /%3e%3cstop offset='0.69' style='stop-color:rgb(173%2c173%2c173)%3bstop-opacity:0.42' id='stop32576' /%3e%3cstop offset='1' style='stop-color:rgb(51%2c51%2c51)%3bstop-opacity:0' id='stop32578' /%3e%3c/radialGradient%3e%3cradialGradient id='_Radial153' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-13.7525%2c-13.3081%2c12.5963%2c-13.205%2c-800.638%2c-1853.57)'%3e%3cstop offset='0' style='stop-color:rgb(204%2c204%2c204)%3bstop-opacity:1' id='stop32611' /%3e%3cstop offset='1' style='stop-color:rgb(140%2c140%2c140)%3bstop-opacity:1' id='stop32613' /%3e%3c/radialGradient%3e%3cradialGradient id='_Radial154' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-31.4592%2c4.35394e-6%2c-3.02828e-6%2c-26.6266%2c688.739%2c-1858.25)'%3e%3cstop offset='0' style='stop-color:white%3bstop-opacity:0.7' id='stop32616' /%3e%3cstop offset='0.69' style='stop-color:rgb(173%2c173%2c173)%3bstop-opacity:0.42' id='stop32618' /%3e%3cstop offset='1' style='stop-color:rgb(51%2c51%2c51)%3bstop-opacity:0' id='stop32620' /%3e%3c/radialGradient%3e%3cradialGradient id='_Radial161' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-13.7525%2c-13.3081%2c12.5963%2c-13.205%2c-800.638%2c-1853.57)'%3e%3cstop offset='0' style='stop-color:rgb(204%2c204%2c204)%3bstop-opacity:1' id='stop32653' /%3e%3cstop offset='1' style='stop-color:rgb(140%2c140%2c140)%3bstop-opacity:1' id='stop32655' /%3e%3c/radialGradient%3e%3cradialGradient id='_Radial162' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-31.4592%2c4.35394e-6%2c-3.02828e-6%2c-26.6266%2c688.739%2c-1858.25)'%3e%3cstop offset='0' style='stop-color:white%3bstop-opacity:0.7' id='stop32658' /%3e%3cstop offset='0.69' style='stop-color:rgb(173%2c173%2c173)%3bstop-opacity:0.42' id='stop32660' /%3e%3cstop offset='1' style='stop-color:rgb(51%2c51%2c51)%3bstop-opacity:0' id='stop32662' /%3e%3c/radialGradient%3e%3cradialGradient id='_Radial169' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-13.7525%2c-13.3081%2c12.5963%2c-13.205%2c-800.638%2c-1853.57)'%3e%3cstop offset='0' style='stop-color:rgb(204%2c204%2c204)%3bstop-opacity:1' id='stop32695' /%3e%3cstop offset='1' style='stop-color:rgb(140%2c140%2c140)%3bstop-opacity:1' id='stop32697' /%3e%3c/radialGradient%3e%3cradialGradient id='_Radial170' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-31.4592%2c4.35394e-6%2c-3.02828e-6%2c-26.6266%2c688.739%2c-1858.25)'%3e%3cstop offset='0' style='stop-color:white%3bstop-opacity:0.7' id='stop32700' /%3e%3cstop offset='0.69' style='stop-color:rgb(173%2c173%2c173)%3bstop-opacity:0.42' id='stop32702' /%3e%3cstop offset='1' style='stop-color:rgb(51%2c51%2c51)%3bstop-opacity:0' id='stop32704' /%3e%3c/radialGradient%3e%3cradialGradient id='_Radial177' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-13.7525%2c-13.3081%2c12.5963%2c-13.205%2c-800.638%2c-1853.57)'%3e%3cstop offset='0' style='stop-color:rgb(204%2c204%2c204)%3bstop-opacity:1' id='stop32737' /%3e%3cstop offset='1' style='stop-color:rgb(140%2c140%2c140)%3bstop-opacity:1' id='stop32739' /%3e%3c/radialGradient%3e%3cradialGradient id='_Radial178' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-31.4592%2c4.35394e-6%2c-3.02828e-6%2c-26.6266%2c688.739%2c-1858.25)'%3e%3cstop offset='0' style='stop-color:white%3bstop-opacity:0.7' id='stop32742' /%3e%3cstop offset='0.69' style='stop-color:rgb(173%2c173%2c173)%3bstop-opacity:0.42' id='stop32744' /%3e%3cstop offset='1' style='stop-color:rgb(51%2c51%2c51)%3bstop-opacity:0' id='stop32746' /%3e%3c/radialGradient%3e%3cradialGradient id='_Radial185' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-13.7525%2c-13.3081%2c12.5963%2c-13.205%2c-800.638%2c-1853.57)'%3e%3cstop offset='0' style='stop-color:rgb(204%2c204%2c204)%3bstop-opacity:1' id='stop32779' /%3e%3cstop offset='1' style='stop-color:rgb(140%2c140%2c140)%3bstop-opacity:1' id='stop32781' /%3e%3c/radialGradient%3e%3cradialGradient id='_Radial186' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-31.4592%2c4.35394e-6%2c-3.02828e-6%2c-26.6266%2c688.739%2c-1858.25)'%3e%3cstop offset='0' style='stop-color:white%3bstop-opacity:0.7' id='stop32784' /%3e%3cstop offset='0.69' style='stop-color:rgb(173%2c173%2c173)%3bstop-opacity:0.42' id='stop32786' /%3e%3cstop offset='1' style='stop-color:rgb(51%2c51%2c51)%3bstop-opacity:0' id='stop32788' /%3e%3c/radialGradient%3e%3cradialGradient id='_Radial193' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-13.7525%2c-13.3081%2c12.5963%2c-13.205%2c-800.638%2c-1853.57)'%3e%3cstop offset='0' style='stop-color:rgb(204%2c204%2c204)%3bstop-opacity:1' id='stop32821' /%3e%3cstop offset='1' style='stop-color:rgb(140%2c140%2c140)%3bstop-opacity:1' id='stop32823' /%3e%3c/radialGradient%3e%3cradialGradient id='_Radial194' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-31.4592%2c4.35394e-6%2c-3.02828e-6%2c-26.6266%2c688.739%2c-1858.25)'%3e%3cstop offset='0' style='stop-color:white%3bstop-opacity:0.7' id='stop32826' /%3e%3cstop offset='0.69' style='stop-color:rgb(173%2c173%2c173)%3bstop-opacity:0.42' id='stop32828' /%3e%3cstop offset='1' style='stop-color:rgb(51%2c51%2c51)%3bstop-opacity:0' id='stop32830' /%3e%3c/radialGradient%3e%3cradialGradient id='_Radial201' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-13.7525%2c-13.3081%2c12.5963%2c-13.205%2c-800.638%2c-1853.57)'%3e%3cstop offset='0' style='stop-color:rgb(204%2c204%2c204)%3bstop-opacity:1' id='stop32863' /%3e%3cstop offset='1' style='stop-color:rgb(140%2c140%2c140)%3bstop-opacity:1' id='stop32865' /%3e%3c/radialGradient%3e%3cradialGradient id='_Radial202' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-31.4592%2c4.35394e-6%2c-3.02828e-6%2c-26.6266%2c688.739%2c-1858.25)'%3e%3cstop offset='0' style='stop-color:white%3bstop-opacity:0.7' id='stop32868' /%3e%3cstop offset='0.69' style='stop-color:rgb(173%2c173%2c173)%3bstop-opacity:0.42' id='stop32870' /%3e%3cstop offset='1' style='stop-color:rgb(51%2c51%2c51)%3bstop-opacity:0' id='stop32872' /%3e%3c/radialGradient%3e%3cradialGradient id='_Radial209' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-13.7525%2c-13.3081%2c12.5963%2c-13.205%2c-800.638%2c-1853.57)'%3e%3cstop offset='0' style='stop-color:rgb(204%2c204%2c204)%3bstop-opacity:1' id='stop32905' /%3e%3cstop offset='1' style='stop-color:rgb(140%2c140%2c140)%3bstop-opacity:1' id='stop32907' /%3e%3c/radialGradient%3e%3cradialGradient id='_Radial210' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-31.4592%2c4.35394e-6%2c-3.02828e-6%2c-26.6266%2c688.739%2c-1858.25)'%3e%3cstop offset='0' style='stop-color:white%3bstop-opacity:0.7' id='stop32910' /%3e%3cstop offset='0.69' style='stop-color:rgb(173%2c173%2c173)%3bstop-opacity:0.42' id='stop32912' /%3e%3cstop offset='1' style='stop-color:rgb(51%2c51%2c51)%3bstop-opacity:0' id='stop32914' /%3e%3c/radialGradient%3e%3cradialGradient id='_Radial217' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-13.7525%2c-13.3081%2c12.5963%2c-13.205%2c-800.638%2c-1853.57)'%3e%3cstop offset='0' style='stop-color:rgb(204%2c204%2c204)%3bstop-opacity:1' id='stop32947' /%3e%3cstop offset='1' style='stop-color:rgb(140%2c140%2c140)%3bstop-opacity:1' id='stop32949' /%3e%3c/radialGradient%3e%3cradialGradient id='_Radial218' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-31.4592%2c4.35394e-6%2c-3.02828e-6%2c-26.6266%2c688.739%2c-1858.25)'%3e%3cstop offset='0' style='stop-color:white%3bstop-opacity:0.7' id='stop32952' /%3e%3cstop offset='0.69' style='stop-color:rgb(173%2c173%2c173)%3bstop-opacity:0.42' id='stop32954' /%3e%3cstop offset='1' style='stop-color:rgb(51%2c51%2c51)%3bstop-opacity:0' id='stop32956' /%3e%3c/radialGradient%3e%3cradialGradient id='_Radial225' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-13.7525%2c-13.3081%2c12.5963%2c-13.205%2c-800.638%2c-1853.57)'%3e%3cstop offset='0' style='stop-color:rgb(204%2c204%2c204)%3bstop-opacity:1' id='stop32989' /%3e%3cstop offset='1' style='stop-color:rgb(140%2c140%2c140)%3bstop-opacity:1' id='stop32991' /%3e%3c/radialGradient%3e%3cradialGradient id='_Radial226' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-31.4592%2c4.35394e-6%2c-3.02828e-6%2c-26.6266%2c688.739%2c-1858.25)'%3e%3cstop offset='0' style='stop-color:white%3bstop-opacity:0.7' id='stop32994' /%3e%3cstop offset='0.69' style='stop-color:rgb(173%2c173%2c173)%3bstop-opacity:0.42' id='stop32996' /%3e%3cstop offset='1' style='stop-color:rgb(51%2c51%2c51)%3bstop-opacity:0' id='stop32998' /%3e%3c/radialGradient%3e%3cradialGradient id='_Radial233' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-13.7525%2c-13.3081%2c12.5963%2c-13.205%2c-800.638%2c-1853.57)'%3e%3cstop offset='0' style='stop-color:rgb(204%2c204%2c204)%3bstop-opacity:1' id='stop33031' /%3e%3cstop offset='1' style='stop-color:rgb(140%2c140%2c140)%3bstop-opacity:1' id='stop33033' /%3e%3c/radialGradient%3e%3cradialGradient id='_Radial234' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-31.4592%2c4.35394e-6%2c-3.02828e-6%2c-26.6266%2c688.739%2c-1858.25)'%3e%3cstop offset='0' style='stop-color:white%3bstop-opacity:0.7' id='stop33036' /%3e%3cstop offset='0.69' style='stop-color:rgb(173%2c173%2c173)%3bstop-opacity:0.42' id='stop33038' /%3e%3cstop offset='1' style='stop-color:rgb(51%2c51%2c51)%3bstop-opacity:0' id='stop33040' /%3e%3c/radialGradient%3e%3cradialGradient id='_Radial241' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-13.7525%2c-13.3081%2c12.5963%2c-13.205%2c-800.638%2c-1853.57)'%3e%3cstop offset='0' style='stop-color:rgb(204%2c204%2c204)%3bstop-opacity:1' id='stop33073' /%3e%3cstop offset='1' style='stop-color:rgb(140%2c140%2c140)%3bstop-opacity:1' id='stop33075' /%3e%3c/radialGradient%3e%3cradialGradient id='_Radial242' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-31.4592%2c4.35394e-6%2c-3.02828e-6%2c-26.6266%2c688.739%2c-1858.25)'%3e%3cstop offset='0' style='stop-color:white%3bstop-opacity:0.7' id='stop33078' /%3e%3cstop offset='0.69' style='stop-color:rgb(173%2c173%2c173)%3bstop-opacity:0.42' id='stop33080' /%3e%3cstop offset='1' style='stop-color:rgb(51%2c51%2c51)%3bstop-opacity:0' id='stop33082' /%3e%3c/radialGradient%3e%3clinearGradient id='_Linear245' x1='0' y1='0' x2='1' y2='0' gradientUnits='userSpaceOnUse' gradientTransform='matrix(0%2c-51.6668%2c51.6668%2c0%2c-606.286%2c486.755)'%3e%3cstop offset='0' style='stop-color:rgb(212%2c170%2c0)%3bstop-opacity:1' id='stop33095' /%3e%3cstop offset='1' style='stop-color:rgb(211%2c177%2c44)%3bstop-opacity:1' id='stop33097' /%3e%3c/linearGradient%3e%3clinearGradient id='_Linear246' x1='0' y1='0' x2='1' y2='0' gradientUnits='userSpaceOnUse' gradientTransform='matrix(10.4409%2c11.5341%2c-11.5341%2c10.4409%2c-614.713%2c432.795)'%3e%3cstop offset='0' style='stop-color:rgb(255%2c230%2c128)%3bstop-opacity:1' id='stop33100' /%3e%3cstop offset='1' style='stop-color:rgb(212%2c170%2c0)%3bstop-opacity:1' id='stop33102' /%3e%3c/linearGradient%3e%3clinearGradient id='_Linear283' x1='0' y1='0' x2='1' y2='0' gradientUnits='userSpaceOnUse' gradientTransform='matrix(37.1875%2c0.630291%2c-0.630291%2c37.1875%2c418.619%2c526.308)'%3e%3cstop offset='0' style='stop-color:rgb(255%2c255%2c0)%3bstop-opacity:0' id='stop33285' /%3e%3cstop offset='0.55' style='stop-color:rgb(255%2c221%2c85)%3bstop-opacity:1' id='stop33287' /%3e%3cstop offset='1' style='stop-color:rgb(255%2c221%2c85)%3bstop-opacity:0' id='stop33289' /%3e%3c/linearGradient%3e%3clinearGradient id='_Linear284' x1='0' y1='0' x2='1' y2='0' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-4.57863%2c-113.553%2c113.553%2c-4.57863%2c69.9172%2c120.356)'%3e%3cstop offset='0' style='stop-color:rgb(255%2c230%2c128)%3bstop-opacity:1' id='stop33292' /%3e%3cstop offset='1' style='stop-color:rgb(212%2c170%2c0)%3bstop-opacity:1' id='stop33294' /%3e%3c/linearGradient%3e%3clinearGradient id='_Linear285' x1='0' y1='0' x2='1' y2='0' gradientUnits='userSpaceOnUse' gradientTransform='matrix(18.0628%2c19.1844%2c-19.1844%2c18.0628%2c81.7664%2c33.3235)'%3e%3cstop offset='0' style='stop-color:rgb(255%2c230%2c128)%3bstop-opacity:1' id='stop33297' /%3e%3cstop offset='1' style='stop-color:rgb(254%2c211%2c42)%3bstop-opacity:1' id='stop33299' /%3e%3c/linearGradient%3e%3clinearGradient id='_Linear287' x1='0' y1='0' x2='1' y2='0' gradientUnits='userSpaceOnUse' gradientTransform='matrix(15.4065%2c25.6776%2c-25.6776%2c15.4065%2c29.9975%2c31.8478)'%3e%3cstop offset='0' style='stop-color:rgb(255%2c230%2c128)%3bstop-opacity:1' id='stop33307' /%3e%3cstop offset='1' style='stop-color:rgb(254%2c211%2c42)%3bstop-opacity:1' id='stop33309' /%3e%3c/linearGradient%3e%3clinearGradient id='_Linear288' x1='0' y1='0' x2='1' y2='0' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-9.0058%2c-103.813%2c103.813%2c-9.0058%2c69.9172%2c120.356)'%3e%3cstop offset='0' style='stop-color:rgb(255%2c230%2c128)%3bstop-opacity:1' id='stop33312' /%3e%3cstop offset='1' style='stop-color:rgb(212%2c170%2c0)%3bstop-opacity:1' id='stop33314' /%3e%3c/linearGradient%3e%3clinearGradient id='_Linear289' x1='0' y1='0' x2='1' y2='0' gradientUnits='userSpaceOnUse' gradientTransform='matrix(102.194%2c27.7436%2c-27.7436%2c102.194%2c14.6841%2c38.9312)'%3e%3cstop offset='0' style='stop-color:rgb(212%2c170%2c0)%3bstop-opacity:1' id='stop33317' /%3e%3cstop offset='1' style='stop-color:rgb(211%2c177%2c44)%3bstop-opacity:1' id='stop33319' /%3e%3c/linearGradient%3e%3clinearGradient id='_Linear290' x1='0' y1='0' x2='1' y2='0' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-2.64645%2c-65.6335%2c65.6335%2c-2.64645%2c361.17%2c163.798)'%3e%3cstop offset='0' style='stop-color:rgb(255%2c230%2c128)%3bstop-opacity:1' id='stop33322' /%3e%3cstop offset='1' style='stop-color:rgb(212%2c170%2c0)%3bstop-opacity:1' id='stop33324' /%3e%3c/linearGradient%3e%3clinearGradient id='_Linear291' x1='0' y1='0' x2='1' y2='0' gradientUnits='userSpaceOnUse' gradientTransform='matrix(10.4403%2c11.0886%2c-11.0886%2c10.4403%2c368.019%2c113.493)'%3e%3cstop offset='0' style='stop-color:rgb(255%2c230%2c128)%3bstop-opacity:1' id='stop33327' /%3e%3cstop offset='1' style='stop-color:rgb(254%2c211%2c42)%3bstop-opacity:1' id='stop33329' /%3e%3c/linearGradient%3e%3clinearGradient id='_Linear292' x1='0' y1='0' x2='1' y2='0' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-0.0351496%2c-1.47321%2c1.47321%2c-0.0351496%2c627.388%2c244.72)'%3e%3cstop offset='0' style='stop-color:rgb(153%2c153%2c153)%3bstop-opacity:1' id='stop33332' /%3e%3cstop offset='1' style='stop-color:rgb(102%2c102%2c102)%3bstop-opacity:1' id='stop33334' /%3e%3c/linearGradient%3e%3clinearGradient id='_Linear293' x1='0' y1='0' x2='1' y2='0' gradientUnits='userSpaceOnUse' gradientTransform='matrix(0%2c4.12243%2c-4.12243%2c0%2c1386.36%2c717.021)'%3e%3cstop offset='0' style='stop-color:rgb(204%2c204%2c204)%3bstop-opacity:1' id='stop33337' /%3e%3cstop offset='1' style='stop-color:rgb(204%2c204%2c204)%3bstop-opacity:0' id='stop33339' /%3e%3c/linearGradient%3e%3clinearGradient id='_Linear297' x1='0' y1='0' x2='1' y2='0' gradientUnits='userSpaceOnUse' gradientTransform='matrix(0%2c-1.6071%2c1.6071%2c0%2c278.781%2c-654.943)'%3e%3cstop offset='0' style='stop-color:rgb(204%2c204%2c204)%3bstop-opacity:1' id='stop33357' /%3e%3cstop offset='1' style='stop-color:rgb(153%2c153%2c153)%3bstop-opacity:1' id='stop33359' /%3e%3c/linearGradient%3e%3clinearGradient id='_Linear298' x1='0' y1='0' x2='1' y2='0' gradientUnits='userSpaceOnUse' gradientTransform='matrix(52.7025%2c39.7776%2c-39.7776%2c52.7025%2c248.074%2c612.028)'%3e%3cstop offset='0' style='stop-color:rgb(128%2c128%2c128)%3bstop-opacity:1' id='stop33362' /%3e%3cstop offset='1' style='stop-color:rgb(140%2c140%2c140)%3bstop-opacity:1' id='stop33364' /%3e%3c/linearGradient%3e%3c/defs%3e%3cg transform='translate(-4.344461%2c1.6560332)' id='g42619'%3e%3cg id='g34971' style='clip-rule:evenodd%3bfill-rule:evenodd' transform='translate(1.8924419%2c-13.965912)'%3e%3cg id='microbit' transform='matrix(2.5%2c0%2c0%2c2.5%2c8.75%2c15)'%3e%3cellipse cx='20.433752' cy='17.815115' rx='17.589922' ry='17.589302' style='clip-rule:evenodd%3bfill:%230b308f%3bfill-rule:evenodd%3bstroke-width:0.0618993%3bstroke-linecap:round%3bstroke-linejoin:round' id='ellipse4' /%3e%3ctext y='33.455059' x='7.7700281' transform='scale(0.96953601%2c1.0314212)' style='font-size:38.00735855px%3bfont-family:UDDigiKyokashoNK-B%2c 'UD Digi Kyokasho NK-B'%3bclip-rule:evenodd%3bisolation:isolate%3bfill:white%3bfill-rule:evenodd%3bstroke-width:0.0600136%3bstroke-linecap:round%3bstroke-linejoin:round' id='text6'%3eT%3c/text%3e%3c/g%3e%3c/g%3e%3c/g%3e%3c/svg%3e";

var img = "data:image/svg+xml,%3c%3fxml version='1.0' encoding='UTF-8' standalone='no'%3f%3e%3csvg xmlns:dc='http://purl.org/dc/elements/1.1/' xmlns:cc='http://creativecommons.org/ns%23' xmlns:rdf='http://www.w3.org/1999/02/22-rdf-syntax-ns%23' xmlns:svg='http://www.w3.org/2000/svg' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:sodipodi='http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd' xmlns:inkscape='http://www.inkscape.org/namespaces/inkscape' id='svg10630' style='fill-rule:evenodd%3bclip-rule:evenodd%3bstroke-linecap:round%3bstroke-linejoin:round%3b' xml:space='preserve' version='1.1' viewBox='0 0 40 40' height='40px' width='40px' sodipodi:docname='connection-small-icon - %e3%82%b3%e3%83%94%e3%83%bc.svg' inkscape:version='0.92.5 (2060ec1f9f%2c 2020-04-08)'%3e%3csodipodi:namedview pagecolor='white' bordercolor='%23666666' borderopacity='1' objecttolerance='10' gridtolerance='10' guidetolerance='10' inkscape:pageopacity='0' inkscape:pageshadow='2' inkscape:window-width='2880' inkscape:window-height='1541' id='namedview1481' showgrid='false' inkscape:zoom='11.8' inkscape:cx='26.802204' inkscape:cy='-0.065299463' inkscape:window-x='-11' inkscape:window-y='871' inkscape:window-maximized='1' inkscape:current-layer='svg10630' /%3e%3cmetadata id='metadata10634'%3e%3crdf:RDF%3e%3ccc:Work rdf:about=''%3e%3cdc:format%3eimage/svg%2bxml%3c/dc:format%3e%3cdc:type rdf:resource='http://purl.org/dc/dcmitype/StillImage' /%3e%3cdc:title /%3e%3c/cc:Work%3e%3c/rdf:RDF%3e%3c/metadata%3e%3cdefs id='defs10628'%3e%3cimage xlink:href='data:image/png%3bbase64%2ciVBORw0KGgoAAAANSUhEUgAAACIAAAAcCAYAAAAEN20fAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAA1ElEQVRIie3XsU7DMBRG4c%2bmFaIDLOyt1Pd/JCTYkRADQahVzVAjRa6dgSHJ4CN5SG6u/xM7QxzguD9ssEM0LxcML2%2bv55AlnhFmlvgj4T26rsRSEnL2Lpp/O2rENUhgHauBLnJLFynpIiVdpKSLlHSRki5SslqR1HjuMlFL/6ilPGdVJOGj0pjwjXMj7CePGid8NWQ%2bx/c3RfGp0hDwoP2Dfd8Igm3OqPU%2bji/GIgF3jQmnvqXQCJqq3WRF7beZkxQxWFYmYQhw3B%2b2ljloJdcj5%2bkXPe8rjWdIHOUAAAAASUVORK5CYII=' height='28px' width='34px' id='_Image1' /%3e%3cimage xlink:href='data:image/png%3bbase64%2ciVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAYAAADgzO9IAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAK0lEQVQImWNUllfQYWBgEGZABW%2bZsAgyMDAwCDNhEWRgYGBgIE/iLRbxtwD55QOaOR9NWAAAAABJRU5ErkJggg==' height='6px' width='6px' id='_Image2' /%3e%3cimage xlink:href='data:image/png%3bbase64%2ciVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAJ0lEQVQImS3GsQkAIBAEsPiWP4SC%2b493pWBjqoyzdqOR%2bpnoQnCRBzu7BHNrioXgAAAAAElFTkSuQmCC' height='3px' width='3px' id='_Image3' /%3e%3cimage xlink:href='data:image/png%3bbase64%2ciVBORw0KGgoAAAANSUhEUgAAABkAAAAYCAYAAAAPtVbGAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACb0lEQVRIiY2Wa27aQBSFP4N5uUlTpVXVNXYHWUF20EVWLYFAMMZm3B8%2bB18bkGppNPbMuffMfY4zwvPr9TXTa8b1095Yu4v7%2bfLSDkBB%2bURrnjMJtUAK79l/4JLJ8nCCCTAFco1pED6HYZJpGBHXaGCiTFaYYA4sNeZab4EaqDQnrc%2bAheZM6yfgqHESabIlmcBL4BH4DBRaSyI4SPisAy2FWYi0FuY9xCYht9j0mYS%2bAN80LwUugT3wIZJc2AdgJR1HYCPC6LZkksmI5LvGo/ZLYCeiRiQP2l/pIDu5uBG%2blAeySJIHd30FfgDPWq%2bCJSb5JKwVr2XBDngTZmISx8SBLxSTZ1mzDKc7BJJCVuRyFSIopMdZd4lJtMYJ4JMWUuDMceAXGkjmQ3KzaMXYkpjKHrlO5b0JfQrPpbDVAaJcLFJiMY5biour1ndNn/tT%2bgqHvkhv6RmQ%2bHF%2bN3JPkpKS6zpZ6f0kvFvK4Ikksfc0EjzQB3zH7ewq6F0WiS5k%2bQ2CswRKOt82wJYuRbdy2wx4osvAJ%2bkpCa0kEuU3CCq5xYV3BP4Cv%2bkquqIL%2bl6EjVznnlWNiaIl0YJ3nXYuV/0RyVqYOX1CJLrY1JKLFg0scRzcPt60lotkLWs2gSTRZdBZcbFbd9JziU8kqbW5VSxKusw5am0jBY6J75WarigTXWJsJVuPSVwPB/ouupcSZ9lewsY6lkdZ5ve98LVdFmNS099wJ/rLyOlcaXbF%2b3BlcLsvN19wLQzv%2bHj9uj34AA33r1/3PwLG%2bDS%2b41OYJwzby60fCad8PcIOfiQImwSLrtZtNnR/HwF3Fxt/if4BFBM38JLMEaoAAAAASUVORK5CYII=' height='24px' width='25px' id='_Image4' /%3e%3cradialGradient id='_Radial2' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(1217.72%2c-59.7505%2c12.9632%2c284.312%2c552.955%2c1154.68)'%3e%3cstop offset='0' style='stop-color:rgb(212%2c170%2c0)%3bstop-opacity:1' id='stop2206' /%3e%3cstop offset='1' style='stop-color:rgb(211%2c177%2c44)%3bstop-opacity:1' id='stop2208' /%3e%3c/radialGradient%3e%3cradialGradient id='_Radial3' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(1217.72%2c-59.7505%2c12.9632%2c284.312%2c552.955%2c1154.68)'%3e%3cstop offset='0' style='stop-color:rgb(212%2c170%2c0)%3bstop-opacity:1' id='stop2211' /%3e%3cstop offset='1' style='stop-color:rgb(211%2c177%2c44)%3bstop-opacity:1' id='stop2213' /%3e%3c/radialGradient%3e%3cradialGradient id='_Radial4' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(466.809%2c-22.0906%2c4.9694%2c105.114%2c-471.791%2c488.167)'%3e%3cstop offset='0' style='stop-color:rgb(255%2c204%2c0)%3bstop-opacity:1' id='stop2216' /%3e%3cstop offset='1' style='stop-color:rgb(200%2c171%2c55)%3bstop-opacity:0' id='stop2218' /%3e%3c/radialGradient%3e%3clinearGradient id='_Linear5' x1='0' y1='0' x2='1' y2='0' gradientUnits='userSpaceOnUse' gradientTransform='matrix(0.968404%2c-222.261%2c222.261%2c0.968404%2c275.27%2c1681.54)'%3e%3cstop offset='0' style='stop-color:rgb(212%2c170%2c0)%3bstop-opacity:1' id='stop2221' /%3e%3cstop offset='1' style='stop-color:rgb(211%2c177%2c44)%3bstop-opacity:1' id='stop2223' /%3e%3c/linearGradient%3e%3clinearGradient id='_Linear6' x1='0' y1='0' x2='1' y2='0' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-43.5934%2c39.4616%2c-39.4616%2c-43.5934%2c1032.84%2c-2481.1)'%3e%3cstop offset='0' style='stop-color:rgb(255%2c230%2c128)%3bstop-opacity:1' id='stop2226' /%3e%3cstop offset='1' style='stop-color:rgb(212%2c170%2c0)%3bstop-opacity:1' id='stop2228' /%3e%3c/linearGradient%3e%3clinearGradient id='_Linear13' x1='0' y1='0' x2='1' y2='0' gradientUnits='userSpaceOnUse' gradientTransform='matrix(0.968404%2c-222.261%2c222.261%2c0.968404%2c-130.62%2c1681.54)'%3e%3cstop offset='0' style='stop-color:rgb(212%2c170%2c0)%3bstop-opacity:1' id='stop2261' /%3e%3cstop offset='1' style='stop-color:rgb(211%2c177%2c44)%3bstop-opacity:1' id='stop2263' /%3e%3c/linearGradient%3e%3clinearGradient id='_Linear14' x1='0' y1='0' x2='1' y2='0' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-43.5934%2c39.4616%2c-39.4616%2c-43.5934%2c626.948%2c-2481.1)'%3e%3cstop offset='0' style='stop-color:rgb(255%2c230%2c128)%3bstop-opacity:1' id='stop2266' /%3e%3cstop offset='1' style='stop-color:rgb(212%2c170%2c0)%3bstop-opacity:1' id='stop2268' /%3e%3c/linearGradient%3e%3cclipPath id='_clip15'%3e%3cpath id='path23949' d='m 101.275%2c1080.28 v 0 c 0%2c7.91 6.416%2c14.97 16.079%2c14.97 9.664%2c0 16.08%2c-6.77 16.08%2c-14.97 v 0 -13.32 0 c 0%2c-7.91 -6.416%2c-14.96 -16.08%2c-14.96 -9.956%2c0 -16.079%2c6.76 -16.079%2c14.96 l 0.489%2c0.51 c 0%2c0 -0.489%2c-0.51 -0.489%2c-0.51 z m 0.978%2c0 v -13.32 0 c 0%2c-7.67 5.782%2c-13.95 15.101%2c-13.95 9.046%2c0 15.102%2c6.55 15.102%2c13.95 l 0.489%2c0.51 c 0%2c0 -0.489%2c-0.51 -0.489%2c-0.51 l 0.002%2c13.38 -0.002%2c-0.05 c -10e-4%2c7.67 -6.057%2c13.94 -15.102%2c13.94 -9.045%2c0 -15.101%2c-6.55 -15.101%2c-13.95 z m 8.376%2c0 v 0 c 0%2c3.68 2.462%2c7.03 6.442%2c7.03 3.973%2c0 6.725%2c-3.36 6.725%2c-7.03 v 0 -13.32 0 c 0%2c-1.98 -0.619%2c-3.73 -1.763%2c-4.99 -1.146%2c-1.26 -2.823%2c-2.04 -4.962%2c-2.04 -3.98%2c0 -6.442%2c3.36 -6.442%2c7.03 l 0.489%2c0.51 c 0%2c0 -0.489%2c-0.51 -0.489%2c-0.51 z m 12.189%2c0 v 0 c 0%2c3.14 -2.35%2c6.02 -5.747%2c6.02 -3.391%2c0 -5.464%2c-2.89 -5.464%2c-6.02 v 0 -13.32 0 c 0%2c-3.13 2.073%2c-6.01 5.464%2c-6.01 1.829%2c0 3.27%2c0.64 4.25%2c1.72 0.983%2c1.08 1.497%2c2.59 1.497%2c4.29 l 0.489%2c0.51 -0.489%2c-0.51 z' /%3e%3c/clipPath%3e%3cclipPath id='_clip17'%3e%3cpath id='path23955' d='m 386.929%2c1059.93 h -0.278 c -0.634%2c0 -0.005%2c1.02 -0.005%2c1.02 l -0.49%2c-0.51 v 6.52 c 0%2c0 0.49%2c0.51 0.49%2c0.51 h 8.014 c 0%2c0 0%2c26.93 0%2c26.93 h 10.617 v -41.05 l -0.49%2c0.51 c 0%2c0 0.625%2c-1.01 -0.021%2c-1.01 h -8.198 c -0.651%2c0 -10e-4%2c1.01 -10e-4%2c1.01 h -0.489 v -0.51 c 0%2c1.8 -0.229%2c3.22 -1.006%2c4.27 -0.571%2c0.77 -1.438%2c1.33 -2.697%2c1.71 -1.347%2c0.41 -3.123%2c0.6 -5.446%2c0.6 z m 17.369%2c33.45 h -8.659 v -26.42 l -0.489%2c0.51 c 0%2c0 0.648%2c-1.02 -0.002%2c-1.02 h -8.013 v -5.5 c 4.857%2c-0.03 7.42%2c-0.96 8.714%2c-2.71 0.817%2c-1.11 1.151%2c-2.56 1.2%2c-4.38 0%2c0 7.249%2c0 7.249%2c0 z' /%3e%3c/clipPath%3e%3cclipPath id='_clip19'%3e%3cpath id='path23961' d='m 722.835%2c1094.4 c 0%2c0 0.489%2c-0.03 0.489%2c-0.51 v -7.65 c 0%2c-0.32 -0.222%2c0.02 -0.367%2c0.27 0.143%2c-0.3 0.306%2c-0.78 -0.143%2c-0.78 h -16.766 c 0.092%2c-1.45 0.615%2c-2.51 1.963%2c-3.75 1.072%2c-0.98 2.635%2c-2.08 4.864%2c-3.53 2.16%2c-1.15 4.886%2c-2.81 7.078%2c-5.03 2.253%2c-2.29 3.938%2c-5.18 3.938%2c-8.73 0%2c-8.82 -6.73%2c-12.69 -14.379%2c-12.69 -4.824%2c0 -8.547%2c1.47 -11.068%2c3.89 -2.544%2c2.43 -3.878%2c5.82 -3.878%2c9.65 v 0.51 h 10.333 v -0.51 c 0%2c-1.95 0.498%2c-3.33 1.345%2c-4.21 0.832%2c-0.86 1.988%2c-1.23 3.268%2c-1.23 1.146%2c0 2.169%2c0.3 2.901%2c0.97 0.723%2c0.66 1.145%2c1.67 1.145%2c3.06 0%2c1.82 -0.868%2c3.19 -2.273%2c4.43 -1.504%2c1.33 -3.605%2c2.51 -5.983%2c3.91 l -0.007%2c0.01 c -3.19%2c2.03 -5.931%2c3.99 -7.921%2c7.14 -1.986%2c3.14 -3.23%2c7.47 -3.375%2c14.26 l -0.011%2c0.52 z m -0.49%2c-7.66 v 6.64 h -27.353 c 0.187%2c-6.23 1.341%2c-10.27 3.201%2c-13.21 1.907%2c-3.02 4.549%2c-4.88 7.6%2c-6.82 v 0 c 2.437%2c-1.43 4.585%2c-2.66 6.127%2c-4.02 1.642%2c-1.45 2.617%2c-3.06 2.617%2c-5.2 0%2c-1.74 -0.57%2c-2.99 -1.477%2c-3.82 -0.898%2c-0.82 -2.143%2c-1.23 -3.548%2c-1.23 -1.555%2c0 -2.95%2c0.48 -3.961%2c1.53 -0.92%2c0.96 -1.533%2c2.4 -1.62%2c4.43 h -8.378 c 0.111%2c-3.33 1.321%2c-6.27 3.554%2c-8.41 2.368%2c-2.26 5.875%2c-3.62 10.405%2c-3.62 7.091%2c0 13.4%2c3.5 13.4%2c11.68 0%2c3.26 -1.575%2c5.9 -3.644%2c8 -2.124%2c2.16 -4.773%2c3.76 -6.862%2c4.88 l -0.036%2c0.02 c -5.916%2c3.84 -7.316%2c5.39 -7.316%2c8.65 v 0.5 z' /%3e%3c/clipPath%3e%3cclipPath id='_clip21'%3e%3cpath id='path23965' d='m 999.985%2c1065.77 h -10.333 v -0.51 c 0%2c-3.54 1.114%2c-6.92 3.546%2c-9.43 2.413%2c-2.49 6.136%2c-4.12 11.402%2c-4.12 7.65%2c0 14.66%2c3.9 14.66%2c11.85 0%2c4.24 -2.36%2c7.53 -5.18%2c9.06 v 0.02 c 3.32%2c1.65 5.75%2c4.81 5.75%2c9.91 0%2c7.93 -7%2c12.7 -15.23%2c12.7 -5.108%2c0 -9.114%2c-1.55 -11.85%2c-4.18 -2.647%2c-2.54 -4.115%2c-6.09 -4.225%2c-10.28 h 0.483 c 0%2c0 -0.648%2c-1.01 0.003%2c-1.01 h 9.066 c 0.65%2c0 0.002%2c1.01 0.002%2c1.01 l 0.489%2c-0.51 c 0%2c2.12 0.578%2c3.78 1.602%2c4.9 1.01%2c1.11 2.45%2c1.68 4.15%2c1.68 3.08%2c0 4.89%2c-2.3 4.89%2c-4.88 0%2c-1.55 -0.37%2c-2.84 -1.24%2c-3.75 -0.88%2c-0.91 -2.26%2c-1.41 -4.22%2c-1.41 h -3.69 c 0%2c0 -0.486%2c-0.03 -0.486%2c-0.51 v -7.36 l 0.486%2c0.5 c 0%2c0 -0.641%2c-1.01 0.01%2c-1.01 h 3.61 c 0.07%2c0 0.12%2c0.01 0.16%2c0.03 l -0.01%2c-0.03 c 1.9%2c-0.02 3.12%2c-0.43 3.85%2c-1.23 0.74%2c-0.8 0.96%2c-1.96 0.96%2c-3.37 0%2c-1.38 -0.42%2c-2.39 -1.14%2c-3.05 -0.73%2c-0.67 -1.76%2c-0.98 -2.9%2c-0.98 -1.45%2c0 -2.48%2c0.31 -3.2%2c0.92 -1.09%2c0.93 -1.415%2c2.5 -1.415%2c4.53 z m 3.765%2c10.04 c -0.01%2c0 -0.03%2c0 -0.04%2c0 h -3.16 v -6.36 h 3.2 c 2.31%2c0 3.75%2c-0.57 4.64%2c-1.54 0.89%2c-0.97 1.23%2c-2.36 1.23%2c-4.07 0%2c-1.73 -0.57%2c-2.99 -1.47%2c-3.81 -0.9%2c-0.83 -2.15%2c-1.23 -3.55%2c-1.23 -1.73%2c0 -2.96%2c0.42 -3.82%2c1.15 -1.192%2c1.01 -1.699%2c2.66 -1.765%2c4.8 h -8.376 c 0.1%2c-3.08 1.121%2c-6.01 3.249%2c-8.2 2.264%2c-2.33 5.77%2c-3.82 10.712%2c-3.82 7.09%2c0 13.68%2c3.47 13.68%2c10.83 0%2c4.29 -2.67%2c7.52 -5.62%2c8.59 l -1.28%2c0.47 1.27%2c0.49 c 3.51%2c1.34 6.2%2c4.31 6.2%2c9.44 0%2c7.38 -6.6%2c11.68 -14.25%2c11.68 -4.817%2c0 -8.605%2c-1.42 -11.185%2c-3.9 -2.455%2c-2.36 -3.803%2c-5.66 -3.911%2c-9.54 h 8.096 c 0.091%2c2.18 0.77%2c3.89 1.859%2c5.09 1.191%2c1.3 2.871%2c2 4.861%2c2 3.71%2c0 5.87%2c-2.8 5.87%2c-5.9 0%2c-1.85 -0.48%2c-3.38 -1.52%2c-4.46 -1.04%2c-1.07 -2.63%2c-1.71 -4.92%2c-1.71 z m -15.225%2c4.98 c -0.004%2c-0.17 -0.006%2c-0.34 -0.006%2c-0.51 v 0.51 z' /%3e%3c/clipPath%3e%3cclipPath id='_clip23'%3e%3cpath id='path23967' d='m 1020.98%2c1053.86 14.46%2c40.54 h 9.47 l 14.57%2c-40.87 -0.46%2c0.33 c 0%2c0 0.62%2c-1.01 -0.02%2c-1.01 h -10.18 c -0.65%2c0 0%2c1.01 0%2c1.01 h -0.67 l 0.2%2c-0.66 -8.32%2c27.11 c 0%2c0 -8.32%2c-27.11 -8.32%2c-27.11 l -0.47%2c0.66 c 0%2c0 0.62%2c-1.01 -0.02%2c-1.01 h -9.9 c -0.65%2c0 0%2c1.01 0%2c1.01 z m 15.14%2c39.52 -14.1%2c-39.52 c 0%2c0 8.87%2c0 8.87%2c0 0%2c0 9.14%2c29.8 9.14%2c29.8 l 9.15%2c-29.8 c 0%2c0 9.14%2c0 9.14%2c0 l -14.09%2c39.52 z m -15.14%2c-39.52 -0.12%2c-0.33 z' /%3e%3c/clipPath%3e%3cclipPath id='_clip25'%3e%3cpath id='path23973' d='m 1264.7%2c1067.18 h 10.85 l -0.04%2c-0.54 c -0.58%2c-7.87 -8.12%2c-14.64 -19.19%2c-14.64 -13.64%2c0 -21.75%2c10.45 -21.75%2c21.76 0%2c11.61 7.82%2c21.77 21.75%2c21.77 11.74%2c0 18.66%2c-6.23 20.52%2c-15.6 0%2c0.01 0.97%2c0.01 1.93%2c0.01 h 1.92 0.02 c 0.1%2c-0.01 0.47%2c-0.09 0.47%2c-0.51 v -7.08 c 0%2c-0.48 -0.49%2c0.5 -0.49%2c0.5 v -1.01 h -20.97 v 1.01 c 0%2c0 -0.49%2c-0.5 -0.49%2c-0.5 v 7.08 c 0%2c0.48 0.49%2c0.51 0.49%2c0.51 h 6.5 c -0.76%2c3.75 -3.94%2c6.64 -9.06%2c6.64 -3.27%2c0 -5.84%2c-0.95 -7.75%2c-2.54 -2.87%2c-2.38 -4.23%2c-6.18 -4.23%2c-10.28 0%2c-6.53 3.79%2c-12.81 11.14%2c-12.81 4.53%2c0 7.77%2c2.89 8.3%2c5.82 z m 9.78%2c-1.01 h -8.99 c -0.81%2c-3.16 -4.29%2c-6.24 -9.17%2c-6.24 -7.96%2c0 -12.12%2c6.76 -12.12%2c13.83 0%2c4.42 1.5%2c8.5 4.6%2c11.07 2.06%2c1.72 4.83%2c2.76 8.36%2c2.76 5.97%2c0 9.53%2c-3.61 10.13%2c-8.09 l -0.49%2c0.44 c 0%2c0 0.63%2c-1.01 -0.02%2c-1.01 h -6.57 v -6.08 h 19.99 v 6.08 h -3.7 c -0.64%2c0 -0.06%2c1.01 -0.06%2c1.01 h -0.59 l 0.11%2c-0.6 c -1.66%2c9.12 -8.31%2c15.18 -19.64%2c15.18 -13.29%2c0 -20.78%2c-9.68 -20.78%2c-20.76 0%2c-10.79 7.76%2c-20.75 20.78%2c-20.75 10.2%2c0 17.31%2c5.97 18.16%2c13.16 z' /%3e%3c/clipPath%3e%3cclipPath id='_clip27'%3e%3cpath id='path23979' d='m 1307.42%2c1053.86 v 23.97 l -13.83%2c-24.73 -0.36%2c0.64 c 0.14%2c-0.27 0.42%2c-0.89 -0.09%2c-0.89 h -9.89 c -0.65%2c0 -0.01%2c1.01 -0.01%2c1.01 h -0.48 v 40.54 h 10.33 v -24.72 c 0%2c0 13.97%2c24.72 13.97%2c24.72 h 10.69 v -41.05 l -0.49%2c0.51 c 0%2c0 0.62%2c-1.01 -0.02%2c-1.01 h -9.33 c -0.65%2c0 0%2c1.01 0%2c1.01 z m -23.69%2c39.52 v -39.52 c 0%2c0 9.15%2c0 9.15%2c0 0%2c0 14.6%2c26.11 14.6%2c26.11 l 0.91%2c1.63 v -27.74 c 0%2c0 8.38%2c0 8.38%2c0 0%2c0 0%2c33.25 0%2c39.52 h -9.15 l -15.51%2c-27.44 v 27.44 z m -0.97%2c-39.52 c 0%2c0 0%2c-0.51 0%2c-0.51 z m 24.66%2c0 v -0.51 z' /%3e%3c/clipPath%3e%3cclipPath id='_clip29'%3e%3cpath id='path23981' d='m 1324.42%2c1094.68 h 15.52 0.16 c 13.83%2c-0.08 21.59%2c-10.22 21.59%2c-20.92 0%2c-10.73 -7.82%2c-20.91 -21.75%2c-20.91 v 0.28 c -0.02%2c0 -0.03%2c0 -0.04%2c0 h -14.98 c -0.65%2c0 -0.01%2c1.01 -0.01%2c1.01 h -0.49 v -0.5 z m 15.95%2c-40.81 c 13.01%2c0.21 20.34%2c9.77 20.34%2c19.89 0%2c10.24 -7.49%2c19.91 -20.77%2c19.91 v 0 c -0.02%2c0 -0.03%2c0 -0.04%2c0 h -14.5 v -39.53 c 0%2c0 14.54%2c0 14.54%2c0 0%2c0 0.31%2c-0.02 0.43%2c-0.27 z m -6.31%2c7.93 v 24.38 h 5.59 l 0.19%2c-0.01 c 7.85%2c-0.09 12.21%2c-6.25 12.21%2c-12.69 0%2c-6.49 -4.72%2c-12.7 -12.4%2c-12.7 v 0 h -5.03 c -0.63%2c0 -0.07%2c1.02 -0.07%2c1.02 z m 5.59%2c23.36 h -4.61 v -23.36 h 4.61 c 7.07%2c0 11.42%2c5.7 11.42%2c11.68 0%2c5.98 -4.08%2c11.68 -11.42%2c11.68 z' /%3e%3c/clipPath%3e%3cclipPath id='_clip31'%3e%3cpath id='path24303' d='M 41.797%2c1012.94 H -0.979 v 55.44 c 0%2c30.98 17.776%2c57.96 41.302%2c72.31 l 1.474%2c0.9 z m -40.818%2c2.03 H 39.84 c 0%2c0 0%2c123.04 0%2c123.04 C 17.615%2c1123.8 0.979%2c1097.97 0.979%2c1068.38 Z' /%3e%3c/clipPath%3e%3cclipPath id='_clip33'%3e%3cpath id='path24305' d='m 1369.86%2c1012.94 v 128.36 l 1.47%2c-0.9 c 23.53%2c-14.34 41.3%2c-41.32 41.3%2c-72.02 0%2c0 0%2c-55.44 0%2c-55.44 z m 1.95%2c124.79 v -122.76 c 0%2c0 38.86%2c0 38.86%2c0 0%2c0 0%2c53.41 0%2c53.41 0%2c29.32 -16.63%2c55.14 -38.86%2c69.36 z' /%3e%3c/clipPath%3e%3clinearGradient id='_Linear35' x1='0' y1='0' x2='1' y2='0' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-0.630291%2c37.1875%2c-37.1875%2c-0.630291%2c-419.105%2c418.619)'%3e%3cstop offset='0' style='stop-color:rgb(255%2c255%2c0)%3bstop-opacity:0' id='stop2281' /%3e%3cstop offset='0.55' style='stop-color:rgb(255%2c221%2c85)%3bstop-opacity:1' id='stop2283' /%3e%3cstop offset='1' style='stop-color:rgb(255%2c221%2c85)%3bstop-opacity:0' id='stop2285' /%3e%3c/linearGradient%3e%3clinearGradient id='_Linear36' x1='0' y1='0' x2='1' y2='0' gradientUnits='userSpaceOnUse' gradientTransform='matrix(37.1875%2c0.630291%2c-0.630291%2c37.1875%2c418.619%2c419.105)'%3e%3cstop offset='0' style='stop-color:rgb(255%2c255%2c0)%3bstop-opacity:0' id='stop2288' /%3e%3cstop offset='0.55' style='stop-color:rgb(255%2c221%2c85)%3bstop-opacity:1' id='stop2290' /%3e%3cstop offset='1' style='stop-color:rgb(255%2c221%2c85)%3bstop-opacity:0' id='stop2292' /%3e%3c/linearGradient%3e%3clinearGradient id='_Linear42' x1='0' y1='0' x2='1' y2='0' gradientUnits='userSpaceOnUse' gradientTransform='matrix(127.547%2c33.716%2c-33.716%2c127.547%2c679.481%2c1846.4)'%3e%3cstop offset='0' style='stop-color:rgb(128%2c128%2c128)%3bstop-opacity:1' id='stop2330' /%3e%3cstop offset='1' style='stop-color:rgb(140%2c140%2c140)%3bstop-opacity:1' id='stop2332' /%3e%3c/linearGradient%3e%3clinearGradient id='_Linear44' x1='0' y1='0' x2='1' y2='0' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-25.8869%2c0%2c0%2c-25.8869%2c701.405%2c1863.49)'%3e%3cstop offset='0' style='stop-color:rgb(128%2c128%2c128)%3bstop-opacity:1' id='stop2336' /%3e%3cstop offset='1' style='stop-color:rgb(140%2c140%2c140)%3bstop-opacity:1' id='stop2338' /%3e%3c/linearGradient%3e%3clinearGradient id='_Linear45' x1='0' y1='0' x2='1' y2='0' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-28.6377%2c0%2c0%2c-28.6377%2c701.334%2c1863.49)'%3e%3cstop offset='0' style='stop-color:rgb(128%2c128%2c128)%3bstop-opacity:1' id='stop2341' /%3e%3cstop offset='1' style='stop-color:rgb(140%2c140%2c140)%3bstop-opacity:1' id='stop2343' /%3e%3c/linearGradient%3e%3clinearGradient id='_Linear46' x1='0' y1='0' x2='1' y2='0' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-28.867%2c0%2c0%2c-28.867%2c-787.593%2c-1850.9)'%3e%3cstop offset='0' style='stop-color:rgb(128%2c128%2c128)%3bstop-opacity:1' id='stop2346' /%3e%3cstop offset='1' style='stop-color:rgb(140%2c140%2c140)%3bstop-opacity:1' id='stop2348' /%3e%3c/linearGradient%3e%3cradialGradient id='_Radial47' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-13.7525%2c-13.3081%2c12.5963%2c-13.205%2c-800.638%2c-1853.57)'%3e%3cstop offset='0' style='stop-color:rgb(204%2c204%2c204)%3bstop-opacity:1' id='stop2351' /%3e%3cstop offset='1' style='stop-color:rgb(140%2c140%2c140)%3bstop-opacity:1' id='stop2353' /%3e%3c/radialGradient%3e%3cradialGradient id='_Radial48' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-31.4592%2c4.35394e-6%2c-3.02828e-6%2c-26.6266%2c688.739%2c-1858.25)'%3e%3cstop offset='0' style='stop-color:white%3bstop-opacity:0.7' id='stop2356' /%3e%3cstop offset='0.69' style='stop-color:rgb(173%2c173%2c173)%3bstop-opacity:0.42' id='stop2358' /%3e%3cstop offset='1' style='stop-color:rgb(51%2c51%2c51)%3bstop-opacity:0' id='stop2360' /%3e%3c/radialGradient%3e%3clinearGradient id='_Linear50' x1='0' y1='0' x2='1' y2='0' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-15.2653%2c0%2c0%2c-15.2653%2c698.248%2c1857.21)'%3e%3cstop offset='0' style='stop-color:rgb(51%2c51%2c51)%3bstop-opacity:1' id='stop2364' /%3e%3cstop offset='1' style='stop-color:rgb(51%2c51%2c51)%3bstop-opacity:0' id='stop2366' /%3e%3c/linearGradient%3e%3clinearGradient id='_Linear51' x1='0' y1='0' x2='1' y2='0' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-15.2653%2c0%2c0%2c-15.2653%2c-791.141%2c-1857.01)'%3e%3cstop offset='0' style='stop-color:rgb(51%2c51%2c51)%3bstop-opacity:1' id='stop2369' /%3e%3cstop offset='1' style='stop-color:rgb(51%2c51%2c51)%3bstop-opacity:0' id='stop2371' /%3e%3c/linearGradient%3e%3cradialGradient id='_Radial57' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-13.7525%2c-13.3081%2c12.5963%2c-13.205%2c-800.638%2c-1853.57)'%3e%3cstop offset='0' style='stop-color:rgb(204%2c204%2c204)%3bstop-opacity:1' id='stop2395' /%3e%3cstop offset='1' style='stop-color:rgb(140%2c140%2c140)%3bstop-opacity:1' id='stop2397' /%3e%3c/radialGradient%3e%3cradialGradient id='_Radial58' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-31.4592%2c4.35394e-6%2c-3.02828e-6%2c-26.6266%2c688.739%2c-1858.25)'%3e%3cstop offset='0' style='stop-color:white%3bstop-opacity:0.7' id='stop2400' /%3e%3cstop offset='0.69' style='stop-color:rgb(173%2c173%2c173)%3bstop-opacity:0.42' id='stop2402' /%3e%3cstop offset='1' style='stop-color:rgb(51%2c51%2c51)%3bstop-opacity:0' id='stop2404' /%3e%3c/radialGradient%3e%3cradialGradient id='_Radial65' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-13.7525%2c-13.3081%2c12.5963%2c-13.205%2c-800.638%2c-1853.57)'%3e%3cstop offset='0' style='stop-color:rgb(204%2c204%2c204)%3bstop-opacity:1' id='stop2437' /%3e%3cstop offset='1' style='stop-color:rgb(140%2c140%2c140)%3bstop-opacity:1' id='stop2439' /%3e%3c/radialGradient%3e%3cradialGradient id='_Radial66' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-31.4592%2c4.35394e-6%2c-3.02828e-6%2c-26.6266%2c688.739%2c-1858.25)'%3e%3cstop offset='0' style='stop-color:white%3bstop-opacity:0.7' id='stop2442' /%3e%3cstop offset='0.69' style='stop-color:rgb(173%2c173%2c173)%3bstop-opacity:0.42' id='stop2444' /%3e%3cstop offset='1' style='stop-color:rgb(51%2c51%2c51)%3bstop-opacity:0' id='stop2446' /%3e%3c/radialGradient%3e%3cradialGradient id='_Radial73' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-13.7525%2c-13.3081%2c12.5963%2c-13.205%2c-800.638%2c-1853.57)'%3e%3cstop offset='0' style='stop-color:rgb(204%2c204%2c204)%3bstop-opacity:1' id='stop2479' /%3e%3cstop offset='1' style='stop-color:rgb(140%2c140%2c140)%3bstop-opacity:1' id='stop2481' /%3e%3c/radialGradient%3e%3cradialGradient id='_Radial74' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-31.4592%2c4.35394e-6%2c-3.02828e-6%2c-26.6266%2c688.739%2c-1858.25)'%3e%3cstop offset='0' style='stop-color:white%3bstop-opacity:0.7' id='stop2484' /%3e%3cstop offset='0.69' style='stop-color:rgb(173%2c173%2c173)%3bstop-opacity:0.42' id='stop2486' /%3e%3cstop offset='1' style='stop-color:rgb(51%2c51%2c51)%3bstop-opacity:0' id='stop2488' /%3e%3c/radialGradient%3e%3cradialGradient id='_Radial81' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-13.7525%2c-13.3081%2c12.5963%2c-13.205%2c-800.638%2c-1853.57)'%3e%3cstop offset='0' style='stop-color:rgb(204%2c204%2c204)%3bstop-opacity:1' id='stop2521' /%3e%3cstop offset='1' style='stop-color:rgb(140%2c140%2c140)%3bstop-opacity:1' id='stop2523' /%3e%3c/radialGradient%3e%3cradialGradient id='_Radial82' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-31.4592%2c4.35394e-6%2c-3.02828e-6%2c-26.6266%2c688.739%2c-1858.25)'%3e%3cstop offset='0' style='stop-color:white%3bstop-opacity:0.7' id='stop2526' /%3e%3cstop offset='0.69' style='stop-color:rgb(173%2c173%2c173)%3bstop-opacity:0.42' id='stop2528' /%3e%3cstop offset='1' style='stop-color:rgb(51%2c51%2c51)%3bstop-opacity:0' id='stop2530' /%3e%3c/radialGradient%3e%3cradialGradient id='_Radial89' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-13.7525%2c-13.3081%2c12.5963%2c-13.205%2c-800.638%2c-1853.57)'%3e%3cstop offset='0' style='stop-color:rgb(204%2c204%2c204)%3bstop-opacity:1' id='stop2563' /%3e%3cstop offset='1' style='stop-color:rgb(140%2c140%2c140)%3bstop-opacity:1' id='stop2565' /%3e%3c/radialGradient%3e%3cradialGradient id='_Radial90' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-31.4592%2c4.35394e-6%2c-3.02828e-6%2c-26.6266%2c688.739%2c-1858.25)'%3e%3cstop offset='0' style='stop-color:white%3bstop-opacity:0.7' id='stop2568' /%3e%3cstop offset='0.69' style='stop-color:rgb(173%2c173%2c173)%3bstop-opacity:0.42' id='stop2570' /%3e%3cstop offset='1' style='stop-color:rgb(51%2c51%2c51)%3bstop-opacity:0' id='stop2572' /%3e%3c/radialGradient%3e%3cradialGradient id='_Radial97' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-13.7525%2c-13.3081%2c12.5963%2c-13.205%2c-800.638%2c-1853.57)'%3e%3cstop offset='0' style='stop-color:rgb(204%2c204%2c204)%3bstop-opacity:1' id='stop2605' /%3e%3cstop offset='1' style='stop-color:rgb(140%2c140%2c140)%3bstop-opacity:1' id='stop2607' /%3e%3c/radialGradient%3e%3cradialGradient id='_Radial98' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-31.4592%2c4.35394e-6%2c-3.02828e-6%2c-26.6266%2c688.739%2c-1858.25)'%3e%3cstop offset='0' style='stop-color:white%3bstop-opacity:0.7' id='stop2610' /%3e%3cstop offset='0.69' style='stop-color:rgb(173%2c173%2c173)%3bstop-opacity:0.42' id='stop2612' /%3e%3cstop offset='1' style='stop-color:rgb(51%2c51%2c51)%3bstop-opacity:0' id='stop2614' /%3e%3c/radialGradient%3e%3cradialGradient id='_Radial105' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-13.7525%2c-13.3081%2c12.5963%2c-13.205%2c-800.638%2c-1853.57)'%3e%3cstop offset='0' style='stop-color:rgb(204%2c204%2c204)%3bstop-opacity:1' id='stop2647' /%3e%3cstop offset='1' style='stop-color:rgb(140%2c140%2c140)%3bstop-opacity:1' id='stop2649' /%3e%3c/radialGradient%3e%3cradialGradient id='_Radial106' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-31.4592%2c4.35394e-6%2c-3.02828e-6%2c-26.6266%2c688.739%2c-1858.25)'%3e%3cstop offset='0' style='stop-color:white%3bstop-opacity:0.7' id='stop2652' /%3e%3cstop offset='0.69' style='stop-color:rgb(173%2c173%2c173)%3bstop-opacity:0.42' id='stop2654' /%3e%3cstop offset='1' style='stop-color:rgb(51%2c51%2c51)%3bstop-opacity:0' id='stop2656' /%3e%3c/radialGradient%3e%3cradialGradient id='_Radial113' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-13.7525%2c-13.3081%2c12.5963%2c-13.205%2c-800.638%2c-1853.57)'%3e%3cstop offset='0' style='stop-color:rgb(204%2c204%2c204)%3bstop-opacity:1' id='stop2689' /%3e%3cstop offset='1' style='stop-color:rgb(140%2c140%2c140)%3bstop-opacity:1' id='stop2691' /%3e%3c/radialGradient%3e%3cradialGradient id='_Radial114' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-31.4592%2c4.35394e-6%2c-3.02828e-6%2c-26.6266%2c688.739%2c-1858.25)'%3e%3cstop offset='0' style='stop-color:white%3bstop-opacity:0.7' id='stop2694' /%3e%3cstop offset='0.69' style='stop-color:rgb(173%2c173%2c173)%3bstop-opacity:0.42' id='stop2696' /%3e%3cstop offset='1' style='stop-color:rgb(51%2c51%2c51)%3bstop-opacity:0' id='stop2698' /%3e%3c/radialGradient%3e%3cradialGradient id='_Radial121' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-13.7525%2c-13.3081%2c12.5963%2c-13.205%2c-800.638%2c-1853.57)'%3e%3cstop offset='0' style='stop-color:rgb(204%2c204%2c204)%3bstop-opacity:1' id='stop2731' /%3e%3cstop offset='1' style='stop-color:rgb(140%2c140%2c140)%3bstop-opacity:1' id='stop2733' /%3e%3c/radialGradient%3e%3cradialGradient id='_Radial122' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-31.4592%2c4.35394e-6%2c-3.02828e-6%2c-26.6266%2c688.739%2c-1858.25)'%3e%3cstop offset='0' style='stop-color:white%3bstop-opacity:0.7' id='stop2736' /%3e%3cstop offset='0.69' style='stop-color:rgb(173%2c173%2c173)%3bstop-opacity:0.42' id='stop2738' /%3e%3cstop offset='1' style='stop-color:rgb(51%2c51%2c51)%3bstop-opacity:0' id='stop2740' /%3e%3c/radialGradient%3e%3cradialGradient id='_Radial129' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-13.7525%2c-13.3081%2c12.5963%2c-13.205%2c-800.638%2c-1853.57)'%3e%3cstop offset='0' style='stop-color:rgb(204%2c204%2c204)%3bstop-opacity:1' id='stop2773' /%3e%3cstop offset='1' style='stop-color:rgb(140%2c140%2c140)%3bstop-opacity:1' id='stop2775' /%3e%3c/radialGradient%3e%3cradialGradient id='_Radial130' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-31.4592%2c4.35394e-6%2c-3.02828e-6%2c-26.6266%2c688.739%2c-1858.25)'%3e%3cstop offset='0' style='stop-color:white%3bstop-opacity:0.7' id='stop2778' /%3e%3cstop offset='0.69' style='stop-color:rgb(173%2c173%2c173)%3bstop-opacity:0.42' id='stop2780' /%3e%3cstop offset='1' style='stop-color:rgb(51%2c51%2c51)%3bstop-opacity:0' id='stop2782' /%3e%3c/radialGradient%3e%3cradialGradient id='_Radial137' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-13.7525%2c-13.3081%2c12.5963%2c-13.205%2c-800.638%2c-1853.57)'%3e%3cstop offset='0' style='stop-color:rgb(204%2c204%2c204)%3bstop-opacity:1' id='stop2815' /%3e%3cstop offset='1' style='stop-color:rgb(140%2c140%2c140)%3bstop-opacity:1' id='stop2817' /%3e%3c/radialGradient%3e%3cradialGradient id='_Radial138' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-31.4592%2c4.35394e-6%2c-3.02828e-6%2c-26.6266%2c688.739%2c-1858.25)'%3e%3cstop offset='0' style='stop-color:white%3bstop-opacity:0.7' id='stop2820' /%3e%3cstop offset='0.69' style='stop-color:rgb(173%2c173%2c173)%3bstop-opacity:0.42' id='stop2822' /%3e%3cstop offset='1' style='stop-color:rgb(51%2c51%2c51)%3bstop-opacity:0' id='stop2824' /%3e%3c/radialGradient%3e%3cradialGradient id='_Radial145' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-13.7525%2c-13.3081%2c12.5963%2c-13.205%2c-800.638%2c-1853.57)'%3e%3cstop offset='0' style='stop-color:rgb(204%2c204%2c204)%3bstop-opacity:1' id='stop2857' /%3e%3cstop offset='1' style='stop-color:rgb(140%2c140%2c140)%3bstop-opacity:1' id='stop2859' /%3e%3c/radialGradient%3e%3cradialGradient id='_Radial146' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-31.4592%2c4.35394e-6%2c-3.02828e-6%2c-26.6266%2c688.739%2c-1858.25)'%3e%3cstop offset='0' style='stop-color:white%3bstop-opacity:0.7' id='stop2862' /%3e%3cstop offset='0.69' style='stop-color:rgb(173%2c173%2c173)%3bstop-opacity:0.42' id='stop2864' /%3e%3cstop offset='1' style='stop-color:rgb(51%2c51%2c51)%3bstop-opacity:0' id='stop2866' /%3e%3c/radialGradient%3e%3cradialGradient id='_Radial153' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-13.7525%2c-13.3081%2c12.5963%2c-13.205%2c-800.638%2c-1853.57)'%3e%3cstop offset='0' style='stop-color:rgb(204%2c204%2c204)%3bstop-opacity:1' id='stop2899' /%3e%3cstop offset='1' style='stop-color:rgb(140%2c140%2c140)%3bstop-opacity:1' id='stop2901' /%3e%3c/radialGradient%3e%3cradialGradient id='_Radial154' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-31.4592%2c4.35394e-6%2c-3.02828e-6%2c-26.6266%2c688.739%2c-1858.25)'%3e%3cstop offset='0' style='stop-color:white%3bstop-opacity:0.7' id='stop2904' /%3e%3cstop offset='0.69' style='stop-color:rgb(173%2c173%2c173)%3bstop-opacity:0.42' id='stop2906' /%3e%3cstop offset='1' style='stop-color:rgb(51%2c51%2c51)%3bstop-opacity:0' id='stop2908' /%3e%3c/radialGradient%3e%3cradialGradient id='_Radial161' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-13.7525%2c-13.3081%2c12.5963%2c-13.205%2c-800.638%2c-1853.57)'%3e%3cstop offset='0' style='stop-color:rgb(204%2c204%2c204)%3bstop-opacity:1' id='stop2941' /%3e%3cstop offset='1' style='stop-color:rgb(140%2c140%2c140)%3bstop-opacity:1' id='stop2943' /%3e%3c/radialGradient%3e%3cradialGradient id='_Radial162' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-31.4592%2c4.35394e-6%2c-3.02828e-6%2c-26.6266%2c688.739%2c-1858.25)'%3e%3cstop offset='0' style='stop-color:white%3bstop-opacity:0.7' id='stop2946' /%3e%3cstop offset='0.69' style='stop-color:rgb(173%2c173%2c173)%3bstop-opacity:0.42' id='stop2948' /%3e%3cstop offset='1' style='stop-color:rgb(51%2c51%2c51)%3bstop-opacity:0' id='stop2950' /%3e%3c/radialGradient%3e%3cradialGradient id='_Radial169' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-13.7525%2c-13.3081%2c12.5963%2c-13.205%2c-800.638%2c-1853.57)'%3e%3cstop offset='0' style='stop-color:rgb(204%2c204%2c204)%3bstop-opacity:1' id='stop2983' /%3e%3cstop offset='1' style='stop-color:rgb(140%2c140%2c140)%3bstop-opacity:1' id='stop2985' /%3e%3c/radialGradient%3e%3cradialGradient id='_Radial170' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-31.4592%2c4.35394e-6%2c-3.02828e-6%2c-26.6266%2c688.739%2c-1858.25)'%3e%3cstop offset='0' style='stop-color:white%3bstop-opacity:0.7' id='stop2988' /%3e%3cstop offset='0.69' style='stop-color:rgb(173%2c173%2c173)%3bstop-opacity:0.42' id='stop2990' /%3e%3cstop offset='1' style='stop-color:rgb(51%2c51%2c51)%3bstop-opacity:0' id='stop2992' /%3e%3c/radialGradient%3e%3cradialGradient id='_Radial177' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-13.7525%2c-13.3081%2c12.5963%2c-13.205%2c-800.638%2c-1853.57)'%3e%3cstop offset='0' style='stop-color:rgb(204%2c204%2c204)%3bstop-opacity:1' id='stop3025' /%3e%3cstop offset='1' style='stop-color:rgb(140%2c140%2c140)%3bstop-opacity:1' id='stop3027' /%3e%3c/radialGradient%3e%3cradialGradient id='_Radial178' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-31.4592%2c4.35394e-6%2c-3.02828e-6%2c-26.6266%2c688.739%2c-1858.25)'%3e%3cstop offset='0' style='stop-color:white%3bstop-opacity:0.7' id='stop3030' /%3e%3cstop offset='0.69' style='stop-color:rgb(173%2c173%2c173)%3bstop-opacity:0.42' id='stop3032' /%3e%3cstop offset='1' style='stop-color:rgb(51%2c51%2c51)%3bstop-opacity:0' id='stop3034' /%3e%3c/radialGradient%3e%3cradialGradient id='_Radial185' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-13.7525%2c-13.3081%2c12.5963%2c-13.205%2c-800.638%2c-1853.57)'%3e%3cstop offset='0' style='stop-color:rgb(204%2c204%2c204)%3bstop-opacity:1' id='stop3067' /%3e%3cstop offset='1' style='stop-color:rgb(140%2c140%2c140)%3bstop-opacity:1' id='stop3069' /%3e%3c/radialGradient%3e%3cradialGradient id='_Radial186' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-31.4592%2c4.35394e-6%2c-3.02828e-6%2c-26.6266%2c688.739%2c-1858.25)'%3e%3cstop offset='0' style='stop-color:white%3bstop-opacity:0.7' id='stop3072' /%3e%3cstop offset='0.69' style='stop-color:rgb(173%2c173%2c173)%3bstop-opacity:0.42' id='stop3074' /%3e%3cstop offset='1' style='stop-color:rgb(51%2c51%2c51)%3bstop-opacity:0' id='stop3076' /%3e%3c/radialGradient%3e%3cradialGradient id='_Radial193' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-13.7525%2c-13.3081%2c12.5963%2c-13.205%2c-800.638%2c-1853.57)'%3e%3cstop offset='0' style='stop-color:rgb(204%2c204%2c204)%3bstop-opacity:1' id='stop3109' /%3e%3cstop offset='1' style='stop-color:rgb(140%2c140%2c140)%3bstop-opacity:1' id='stop3111' /%3e%3c/radialGradient%3e%3cradialGradient id='_Radial194' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-31.4592%2c4.35394e-6%2c-3.02828e-6%2c-26.6266%2c688.739%2c-1858.25)'%3e%3cstop offset='0' style='stop-color:white%3bstop-opacity:0.7' id='stop3114' /%3e%3cstop offset='0.69' style='stop-color:rgb(173%2c173%2c173)%3bstop-opacity:0.42' id='stop3116' /%3e%3cstop offset='1' style='stop-color:rgb(51%2c51%2c51)%3bstop-opacity:0' id='stop3118' /%3e%3c/radialGradient%3e%3cradialGradient id='_Radial201' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-13.7525%2c-13.3081%2c12.5963%2c-13.205%2c-800.638%2c-1853.57)'%3e%3cstop offset='0' style='stop-color:rgb(204%2c204%2c204)%3bstop-opacity:1' id='stop3151' /%3e%3cstop offset='1' style='stop-color:rgb(140%2c140%2c140)%3bstop-opacity:1' id='stop3153' /%3e%3c/radialGradient%3e%3cradialGradient id='_Radial202' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-31.4592%2c4.35394e-6%2c-3.02828e-6%2c-26.6266%2c688.739%2c-1858.25)'%3e%3cstop offset='0' style='stop-color:white%3bstop-opacity:0.7' id='stop3156' /%3e%3cstop offset='0.69' style='stop-color:rgb(173%2c173%2c173)%3bstop-opacity:0.42' id='stop3158' /%3e%3cstop offset='1' style='stop-color:rgb(51%2c51%2c51)%3bstop-opacity:0' id='stop3160' /%3e%3c/radialGradient%3e%3cradialGradient id='_Radial209' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-13.7525%2c-13.3081%2c12.5963%2c-13.205%2c-800.638%2c-1853.57)'%3e%3cstop offset='0' style='stop-color:rgb(204%2c204%2c204)%3bstop-opacity:1' id='stop3193' /%3e%3cstop offset='1' style='stop-color:rgb(140%2c140%2c140)%3bstop-opacity:1' id='stop3195' /%3e%3c/radialGradient%3e%3cradialGradient id='_Radial210' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-31.4592%2c4.35394e-6%2c-3.02828e-6%2c-26.6266%2c688.739%2c-1858.25)'%3e%3cstop offset='0' style='stop-color:white%3bstop-opacity:0.7' id='stop3198' /%3e%3cstop offset='0.69' style='stop-color:rgb(173%2c173%2c173)%3bstop-opacity:0.42' id='stop3200' /%3e%3cstop offset='1' style='stop-color:rgb(51%2c51%2c51)%3bstop-opacity:0' id='stop3202' /%3e%3c/radialGradient%3e%3cradialGradient id='_Radial217' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-13.7525%2c-13.3081%2c12.5963%2c-13.205%2c-800.638%2c-1853.57)'%3e%3cstop offset='0' style='stop-color:rgb(204%2c204%2c204)%3bstop-opacity:1' id='stop3235' /%3e%3cstop offset='1' style='stop-color:rgb(140%2c140%2c140)%3bstop-opacity:1' id='stop3237' /%3e%3c/radialGradient%3e%3cradialGradient id='_Radial218' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-31.4592%2c4.35394e-6%2c-3.02828e-6%2c-26.6266%2c688.739%2c-1858.25)'%3e%3cstop offset='0' style='stop-color:white%3bstop-opacity:0.7' id='stop3240' /%3e%3cstop offset='0.69' style='stop-color:rgb(173%2c173%2c173)%3bstop-opacity:0.42' id='stop3242' /%3e%3cstop offset='1' style='stop-color:rgb(51%2c51%2c51)%3bstop-opacity:0' id='stop3244' /%3e%3c/radialGradient%3e%3cradialGradient id='_Radial225' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-13.7525%2c-13.3081%2c12.5963%2c-13.205%2c-800.638%2c-1853.57)'%3e%3cstop offset='0' style='stop-color:rgb(204%2c204%2c204)%3bstop-opacity:1' id='stop3277' /%3e%3cstop offset='1' style='stop-color:rgb(140%2c140%2c140)%3bstop-opacity:1' id='stop3279' /%3e%3c/radialGradient%3e%3cradialGradient id='_Radial226' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-31.4592%2c4.35394e-6%2c-3.02828e-6%2c-26.6266%2c688.739%2c-1858.25)'%3e%3cstop offset='0' style='stop-color:white%3bstop-opacity:0.7' id='stop3282' /%3e%3cstop offset='0.69' style='stop-color:rgb(173%2c173%2c173)%3bstop-opacity:0.42' id='stop3284' /%3e%3cstop offset='1' style='stop-color:rgb(51%2c51%2c51)%3bstop-opacity:0' id='stop3286' /%3e%3c/radialGradient%3e%3cradialGradient id='_Radial233' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-13.7525%2c-13.3081%2c12.5963%2c-13.205%2c-800.638%2c-1853.57)'%3e%3cstop offset='0' style='stop-color:rgb(204%2c204%2c204)%3bstop-opacity:1' id='stop3319' /%3e%3cstop offset='1' style='stop-color:rgb(140%2c140%2c140)%3bstop-opacity:1' id='stop3321' /%3e%3c/radialGradient%3e%3cradialGradient id='_Radial234' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-31.4592%2c4.35394e-6%2c-3.02828e-6%2c-26.6266%2c688.739%2c-1858.25)'%3e%3cstop offset='0' style='stop-color:white%3bstop-opacity:0.7' id='stop3324' /%3e%3cstop offset='0.69' style='stop-color:rgb(173%2c173%2c173)%3bstop-opacity:0.42' id='stop3326' /%3e%3cstop offset='1' style='stop-color:rgb(51%2c51%2c51)%3bstop-opacity:0' id='stop3328' /%3e%3c/radialGradient%3e%3cradialGradient id='_Radial241' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-13.7525%2c-13.3081%2c12.5963%2c-13.205%2c-800.638%2c-1853.57)'%3e%3cstop offset='0' style='stop-color:rgb(204%2c204%2c204)%3bstop-opacity:1' id='stop3361' /%3e%3cstop offset='1' style='stop-color:rgb(140%2c140%2c140)%3bstop-opacity:1' id='stop3363' /%3e%3c/radialGradient%3e%3cradialGradient id='_Radial242' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-31.4592%2c4.35394e-6%2c-3.02828e-6%2c-26.6266%2c688.739%2c-1858.25)'%3e%3cstop offset='0' style='stop-color:white%3bstop-opacity:0.7' id='stop3366' /%3e%3cstop offset='0.69' style='stop-color:rgb(173%2c173%2c173)%3bstop-opacity:0.42' id='stop3368' /%3e%3cstop offset='1' style='stop-color:rgb(51%2c51%2c51)%3bstop-opacity:0' id='stop3370' /%3e%3c/radialGradient%3e%3clinearGradient id='_Linear245' x1='0' y1='0' x2='1' y2='0' gradientUnits='userSpaceOnUse' gradientTransform='matrix(0%2c-51.6668%2c51.6668%2c0%2c-606.286%2c486.755)'%3e%3cstop offset='0' style='stop-color:rgb(212%2c170%2c0)%3bstop-opacity:1' id='stop3383' /%3e%3cstop offset='1' style='stop-color:rgb(211%2c177%2c44)%3bstop-opacity:1' id='stop3385' /%3e%3c/linearGradient%3e%3clinearGradient id='_Linear246' x1='0' y1='0' x2='1' y2='0' gradientUnits='userSpaceOnUse' gradientTransform='matrix(10.4409%2c11.5341%2c-11.5341%2c10.4409%2c-614.713%2c432.795)'%3e%3cstop offset='0' style='stop-color:rgb(255%2c230%2c128)%3bstop-opacity:1' id='stop3388' /%3e%3cstop offset='1' style='stop-color:rgb(212%2c170%2c0)%3bstop-opacity:1' id='stop3390' /%3e%3c/linearGradient%3e%3clinearGradient id='_Linear283' x1='0' y1='0' x2='1' y2='0' gradientUnits='userSpaceOnUse' gradientTransform='matrix(37.1875%2c0.630291%2c-0.630291%2c37.1875%2c418.619%2c526.308)'%3e%3cstop offset='0' style='stop-color:rgb(255%2c255%2c0)%3bstop-opacity:0' id='stop3573' /%3e%3cstop offset='0.55' style='stop-color:rgb(255%2c221%2c85)%3bstop-opacity:1' id='stop3575' /%3e%3cstop offset='1' style='stop-color:rgb(255%2c221%2c85)%3bstop-opacity:0' id='stop3577' /%3e%3c/linearGradient%3e%3clinearGradient id='_Linear284' x1='0' y1='0' x2='1' y2='0' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-4.57863%2c-113.553%2c113.553%2c-4.57863%2c69.9172%2c120.356)'%3e%3cstop offset='0' style='stop-color:rgb(255%2c230%2c128)%3bstop-opacity:1' id='stop3580' /%3e%3cstop offset='1' style='stop-color:rgb(212%2c170%2c0)%3bstop-opacity:1' id='stop3582' /%3e%3c/linearGradient%3e%3clinearGradient id='_Linear285' x1='0' y1='0' x2='1' y2='0' gradientUnits='userSpaceOnUse' gradientTransform='matrix(18.0628%2c19.1844%2c-19.1844%2c18.0628%2c81.7664%2c33.3235)'%3e%3cstop offset='0' style='stop-color:rgb(255%2c230%2c128)%3bstop-opacity:1' id='stop3585' /%3e%3cstop offset='1' style='stop-color:rgb(254%2c211%2c42)%3bstop-opacity:1' id='stop3587' /%3e%3c/linearGradient%3e%3clinearGradient id='_Linear287' x1='0' y1='0' x2='1' y2='0' gradientUnits='userSpaceOnUse' gradientTransform='matrix(15.4065%2c25.6776%2c-25.6776%2c15.4065%2c29.9975%2c31.8478)'%3e%3cstop offset='0' style='stop-color:rgb(255%2c230%2c128)%3bstop-opacity:1' id='stop3595' /%3e%3cstop offset='1' style='stop-color:rgb(254%2c211%2c42)%3bstop-opacity:1' id='stop3597' /%3e%3c/linearGradient%3e%3clinearGradient id='_Linear288' x1='0' y1='0' x2='1' y2='0' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-9.0058%2c-103.813%2c103.813%2c-9.0058%2c69.9172%2c120.356)'%3e%3cstop offset='0' style='stop-color:rgb(255%2c230%2c128)%3bstop-opacity:1' id='stop3600' /%3e%3cstop offset='1' style='stop-color:rgb(212%2c170%2c0)%3bstop-opacity:1' id='stop3602' /%3e%3c/linearGradient%3e%3clinearGradient id='_Linear289' x1='0' y1='0' x2='1' y2='0' gradientUnits='userSpaceOnUse' gradientTransform='matrix(102.194%2c27.7436%2c-27.7436%2c102.194%2c14.6841%2c38.9312)'%3e%3cstop offset='0' style='stop-color:rgb(212%2c170%2c0)%3bstop-opacity:1' id='stop3605' /%3e%3cstop offset='1' style='stop-color:rgb(211%2c177%2c44)%3bstop-opacity:1' id='stop3607' /%3e%3c/linearGradient%3e%3clinearGradient id='_Linear290' x1='0' y1='0' x2='1' y2='0' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-2.64645%2c-65.6335%2c65.6335%2c-2.64645%2c361.17%2c163.798)'%3e%3cstop offset='0' style='stop-color:rgb(255%2c230%2c128)%3bstop-opacity:1' id='stop3610' /%3e%3cstop offset='1' style='stop-color:rgb(212%2c170%2c0)%3bstop-opacity:1' id='stop3612' /%3e%3c/linearGradient%3e%3clinearGradient id='_Linear291' x1='0' y1='0' x2='1' y2='0' gradientUnits='userSpaceOnUse' gradientTransform='matrix(10.4403%2c11.0886%2c-11.0886%2c10.4403%2c368.019%2c113.493)'%3e%3cstop offset='0' style='stop-color:rgb(255%2c230%2c128)%3bstop-opacity:1' id='stop3615' /%3e%3cstop offset='1' style='stop-color:rgb(254%2c211%2c42)%3bstop-opacity:1' id='stop3617' /%3e%3c/linearGradient%3e%3clinearGradient id='_Linear292' x1='0' y1='0' x2='1' y2='0' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-0.0351496%2c-1.47321%2c1.47321%2c-0.0351496%2c627.388%2c244.72)'%3e%3cstop offset='0' style='stop-color:rgb(153%2c153%2c153)%3bstop-opacity:1' id='stop3620' /%3e%3cstop offset='1' style='stop-color:rgb(102%2c102%2c102)%3bstop-opacity:1' id='stop3622' /%3e%3c/linearGradient%3e%3clinearGradient id='_Linear293' x1='0' y1='0' x2='1' y2='0' gradientUnits='userSpaceOnUse' gradientTransform='matrix(0%2c4.12243%2c-4.12243%2c0%2c1386.36%2c717.021)'%3e%3cstop offset='0' style='stop-color:rgb(204%2c204%2c204)%3bstop-opacity:1' id='stop3625' /%3e%3cstop offset='1' style='stop-color:rgb(204%2c204%2c204)%3bstop-opacity:0' id='stop3627' /%3e%3c/linearGradient%3e%3clinearGradient id='_Linear297' x1='0' y1='0' x2='1' y2='0' gradientUnits='userSpaceOnUse' gradientTransform='matrix(0%2c-1.6071%2c1.6071%2c0%2c278.781%2c-654.943)'%3e%3cstop offset='0' style='stop-color:rgb(204%2c204%2c204)%3bstop-opacity:1' id='stop3645' /%3e%3cstop offset='1' style='stop-color:rgb(153%2c153%2c153)%3bstop-opacity:1' id='stop3647' /%3e%3c/linearGradient%3e%3clinearGradient id='_Linear298' x1='0' y1='0' x2='1' y2='0' gradientUnits='userSpaceOnUse' gradientTransform='matrix(52.7025%2c39.7776%2c-39.7776%2c52.7025%2c248.074%2c612.028)'%3e%3cstop offset='0' style='stop-color:rgb(128%2c128%2c128)%3bstop-opacity:1' id='stop3650' /%3e%3cstop offset='1' style='stop-color:rgb(140%2c140%2c140)%3bstop-opacity:1' id='stop3652' /%3e%3c/linearGradient%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(0.968404%2c-222.261%2c222.261%2c0.968404%2c275.27%2c1681.54)' gradientUnits='userSpaceOnUse' id='linearGradient25256' xlink:href='%23_Linear5' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-43.5934%2c39.4616%2c-39.4616%2c-43.5934%2c1032.84%2c-2481.1)' gradientUnits='userSpaceOnUse' id='linearGradient25258' xlink:href='%23_Linear6' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(0.968404%2c-222.261%2c222.261%2c0.968404%2c275.27%2c1681.54)' gradientUnits='userSpaceOnUse' id='linearGradient25260' xlink:href='%23_Linear5' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-43.5934%2c39.4616%2c-39.4616%2c-43.5934%2c1032.84%2c-2481.1)' gradientUnits='userSpaceOnUse' id='linearGradient25262' xlink:href='%23_Linear6' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(0.968404%2c-222.261%2c222.261%2c0.968404%2c275.27%2c1681.54)' gradientUnits='userSpaceOnUse' id='linearGradient25264' xlink:href='%23_Linear5' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-43.5934%2c39.4616%2c-39.4616%2c-43.5934%2c1032.84%2c-2481.1)' gradientUnits='userSpaceOnUse' id='linearGradient25266' xlink:href='%23_Linear6' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(0.968404%2c-222.261%2c222.261%2c0.968404%2c275.27%2c1681.54)' gradientUnits='userSpaceOnUse' id='linearGradient25268' xlink:href='%23_Linear5' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-43.5934%2c39.4616%2c-39.4616%2c-43.5934%2c1032.84%2c-2481.1)' gradientUnits='userSpaceOnUse' id='linearGradient25270' xlink:href='%23_Linear6' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(37.1875%2c0.630291%2c-0.630291%2c37.1875%2c418.619%2c419.105)' gradientUnits='userSpaceOnUse' id='linearGradient25272' xlink:href='%23_Linear36' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(37.1875%2c0.630291%2c-0.630291%2c37.1875%2c418.619%2c419.105)' gradientUnits='userSpaceOnUse' id='linearGradient25274' xlink:href='%23_Linear36' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(37.1875%2c0.630291%2c-0.630291%2c37.1875%2c418.619%2c419.105)' gradientUnits='userSpaceOnUse' id='linearGradient25276' xlink:href='%23_Linear36' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(37.1875%2c0.630291%2c-0.630291%2c37.1875%2c418.619%2c419.105)' gradientUnits='userSpaceOnUse' id='linearGradient25278' xlink:href='%23_Linear36' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(37.1875%2c0.630291%2c-0.630291%2c37.1875%2c418.619%2c419.105)' gradientUnits='userSpaceOnUse' id='linearGradient25280' xlink:href='%23_Linear36' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(37.1875%2c0.630291%2c-0.630291%2c37.1875%2c418.619%2c419.105)' gradientUnits='userSpaceOnUse' id='linearGradient25282' xlink:href='%23_Linear36' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(127.547%2c33.716%2c-33.716%2c127.547%2c679.481%2c1846.4)' gradientUnits='userSpaceOnUse' id='linearGradient25284' xlink:href='%23_Linear42' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-25.8869%2c0%2c0%2c-25.8869%2c701.405%2c1863.49)' gradientUnits='userSpaceOnUse' id='linearGradient25286' xlink:href='%23_Linear44' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-28.6377%2c0%2c0%2c-28.6377%2c701.334%2c1863.49)' gradientUnits='userSpaceOnUse' id='linearGradient25288' xlink:href='%23_Linear45' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-28.867%2c0%2c0%2c-28.867%2c-787.593%2c-1850.9)' gradientUnits='userSpaceOnUse' id='linearGradient25290' xlink:href='%23_Linear46' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-15.2653%2c0%2c0%2c-15.2653%2c698.248%2c1857.21)' gradientUnits='userSpaceOnUse' id='linearGradient25292' xlink:href='%23_Linear50' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-15.2653%2c0%2c0%2c-15.2653%2c-791.141%2c-1857.01)' gradientUnits='userSpaceOnUse' id='linearGradient25294' xlink:href='%23_Linear51' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(127.547%2c33.716%2c-33.716%2c127.547%2c679.481%2c1846.4)' gradientUnits='userSpaceOnUse' id='linearGradient25296' xlink:href='%23_Linear42' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-25.8869%2c0%2c0%2c-25.8869%2c701.405%2c1863.49)' gradientUnits='userSpaceOnUse' id='linearGradient25298' xlink:href='%23_Linear44' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-28.6377%2c0%2c0%2c-28.6377%2c701.334%2c1863.49)' gradientUnits='userSpaceOnUse' id='linearGradient25300' xlink:href='%23_Linear45' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-28.867%2c0%2c0%2c-28.867%2c-787.593%2c-1850.9)' gradientUnits='userSpaceOnUse' id='linearGradient25302' xlink:href='%23_Linear46' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-15.2653%2c0%2c0%2c-15.2653%2c698.248%2c1857.21)' gradientUnits='userSpaceOnUse' id='linearGradient25304' xlink:href='%23_Linear50' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-15.2653%2c0%2c0%2c-15.2653%2c-791.141%2c-1857.01)' gradientUnits='userSpaceOnUse' id='linearGradient25306' xlink:href='%23_Linear51' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(127.547%2c33.716%2c-33.716%2c127.547%2c679.481%2c1846.4)' gradientUnits='userSpaceOnUse' id='linearGradient25308' xlink:href='%23_Linear42' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-25.8869%2c0%2c0%2c-25.8869%2c701.405%2c1863.49)' gradientUnits='userSpaceOnUse' id='linearGradient25310' xlink:href='%23_Linear44' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-28.6377%2c0%2c0%2c-28.6377%2c701.334%2c1863.49)' gradientUnits='userSpaceOnUse' id='linearGradient25312' xlink:href='%23_Linear45' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-28.867%2c0%2c0%2c-28.867%2c-787.593%2c-1850.9)' gradientUnits='userSpaceOnUse' id='linearGradient25314' xlink:href='%23_Linear46' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-15.2653%2c0%2c0%2c-15.2653%2c698.248%2c1857.21)' gradientUnits='userSpaceOnUse' id='linearGradient25316' xlink:href='%23_Linear50' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-15.2653%2c0%2c0%2c-15.2653%2c-791.141%2c-1857.01)' gradientUnits='userSpaceOnUse' id='linearGradient25318' xlink:href='%23_Linear51' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(127.547%2c33.716%2c-33.716%2c127.547%2c679.481%2c1846.4)' gradientUnits='userSpaceOnUse' id='linearGradient25320' xlink:href='%23_Linear42' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-25.8869%2c0%2c0%2c-25.8869%2c701.405%2c1863.49)' gradientUnits='userSpaceOnUse' id='linearGradient25322' xlink:href='%23_Linear44' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-28.6377%2c0%2c0%2c-28.6377%2c701.334%2c1863.49)' gradientUnits='userSpaceOnUse' id='linearGradient25324' xlink:href='%23_Linear45' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-28.867%2c0%2c0%2c-28.867%2c-787.593%2c-1850.9)' gradientUnits='userSpaceOnUse' id='linearGradient25326' xlink:href='%23_Linear46' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-15.2653%2c0%2c0%2c-15.2653%2c698.248%2c1857.21)' gradientUnits='userSpaceOnUse' id='linearGradient25328' xlink:href='%23_Linear50' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-15.2653%2c0%2c0%2c-15.2653%2c-791.141%2c-1857.01)' gradientUnits='userSpaceOnUse' id='linearGradient25330' xlink:href='%23_Linear51' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(127.547%2c33.716%2c-33.716%2c127.547%2c679.481%2c1846.4)' gradientUnits='userSpaceOnUse' id='linearGradient25332' xlink:href='%23_Linear42' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-25.8869%2c0%2c0%2c-25.8869%2c701.405%2c1863.49)' gradientUnits='userSpaceOnUse' id='linearGradient25334' xlink:href='%23_Linear44' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-28.6377%2c0%2c0%2c-28.6377%2c701.334%2c1863.49)' gradientUnits='userSpaceOnUse' id='linearGradient25336' xlink:href='%23_Linear45' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-28.867%2c0%2c0%2c-28.867%2c-787.593%2c-1850.9)' gradientUnits='userSpaceOnUse' id='linearGradient25338' xlink:href='%23_Linear46' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-15.2653%2c0%2c0%2c-15.2653%2c698.248%2c1857.21)' gradientUnits='userSpaceOnUse' id='linearGradient25340' xlink:href='%23_Linear50' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-15.2653%2c0%2c0%2c-15.2653%2c-791.141%2c-1857.01)' gradientUnits='userSpaceOnUse' id='linearGradient25342' xlink:href='%23_Linear51' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(127.547%2c33.716%2c-33.716%2c127.547%2c679.481%2c1846.4)' gradientUnits='userSpaceOnUse' id='linearGradient25344' xlink:href='%23_Linear42' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-25.8869%2c0%2c0%2c-25.8869%2c701.405%2c1863.49)' gradientUnits='userSpaceOnUse' id='linearGradient25346' xlink:href='%23_Linear44' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-28.6377%2c0%2c0%2c-28.6377%2c701.334%2c1863.49)' gradientUnits='userSpaceOnUse' id='linearGradient25348' xlink:href='%23_Linear45' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-28.867%2c0%2c0%2c-28.867%2c-787.593%2c-1850.9)' gradientUnits='userSpaceOnUse' id='linearGradient25350' xlink:href='%23_Linear46' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-15.2653%2c0%2c0%2c-15.2653%2c698.248%2c1857.21)' gradientUnits='userSpaceOnUse' id='linearGradient25352' xlink:href='%23_Linear50' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-15.2653%2c0%2c0%2c-15.2653%2c-791.141%2c-1857.01)' gradientUnits='userSpaceOnUse' id='linearGradient25354' xlink:href='%23_Linear51' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(127.547%2c33.716%2c-33.716%2c127.547%2c679.481%2c1846.4)' gradientUnits='userSpaceOnUse' id='linearGradient25356' xlink:href='%23_Linear42' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-25.8869%2c0%2c0%2c-25.8869%2c701.405%2c1863.49)' gradientUnits='userSpaceOnUse' id='linearGradient25358' xlink:href='%23_Linear44' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-28.6377%2c0%2c0%2c-28.6377%2c701.334%2c1863.49)' gradientUnits='userSpaceOnUse' id='linearGradient25360' xlink:href='%23_Linear45' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-28.867%2c0%2c0%2c-28.867%2c-787.593%2c-1850.9)' gradientUnits='userSpaceOnUse' id='linearGradient25362' xlink:href='%23_Linear46' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-15.2653%2c0%2c0%2c-15.2653%2c698.248%2c1857.21)' gradientUnits='userSpaceOnUse' id='linearGradient25364' xlink:href='%23_Linear50' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-15.2653%2c0%2c0%2c-15.2653%2c-791.141%2c-1857.01)' gradientUnits='userSpaceOnUse' id='linearGradient25366' xlink:href='%23_Linear51' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(127.547%2c33.716%2c-33.716%2c127.547%2c679.481%2c1846.4)' gradientUnits='userSpaceOnUse' id='linearGradient25368' xlink:href='%23_Linear42' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-25.8869%2c0%2c0%2c-25.8869%2c701.405%2c1863.49)' gradientUnits='userSpaceOnUse' id='linearGradient25370' xlink:href='%23_Linear44' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-28.6377%2c0%2c0%2c-28.6377%2c701.334%2c1863.49)' gradientUnits='userSpaceOnUse' id='linearGradient25372' xlink:href='%23_Linear45' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-28.867%2c0%2c0%2c-28.867%2c-787.593%2c-1850.9)' gradientUnits='userSpaceOnUse' id='linearGradient25374' xlink:href='%23_Linear46' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-15.2653%2c0%2c0%2c-15.2653%2c698.248%2c1857.21)' gradientUnits='userSpaceOnUse' id='linearGradient25376' xlink:href='%23_Linear50' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-15.2653%2c0%2c0%2c-15.2653%2c-791.141%2c-1857.01)' gradientUnits='userSpaceOnUse' id='linearGradient25378' xlink:href='%23_Linear51' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(127.547%2c33.716%2c-33.716%2c127.547%2c679.481%2c1846.4)' gradientUnits='userSpaceOnUse' id='linearGradient25380' xlink:href='%23_Linear42' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-25.8869%2c0%2c0%2c-25.8869%2c701.405%2c1863.49)' gradientUnits='userSpaceOnUse' id='linearGradient25382' xlink:href='%23_Linear44' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-28.6377%2c0%2c0%2c-28.6377%2c701.334%2c1863.49)' gradientUnits='userSpaceOnUse' id='linearGradient25384' xlink:href='%23_Linear45' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-28.867%2c0%2c0%2c-28.867%2c-787.593%2c-1850.9)' gradientUnits='userSpaceOnUse' id='linearGradient25386' xlink:href='%23_Linear46' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-15.2653%2c0%2c0%2c-15.2653%2c698.248%2c1857.21)' gradientUnits='userSpaceOnUse' id='linearGradient25388' xlink:href='%23_Linear50' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-15.2653%2c0%2c0%2c-15.2653%2c-791.141%2c-1857.01)' gradientUnits='userSpaceOnUse' id='linearGradient25390' xlink:href='%23_Linear51' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(127.547%2c33.716%2c-33.716%2c127.547%2c679.481%2c1846.4)' gradientUnits='userSpaceOnUse' id='linearGradient25392' xlink:href='%23_Linear42' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-25.8869%2c0%2c0%2c-25.8869%2c701.405%2c1863.49)' gradientUnits='userSpaceOnUse' id='linearGradient25394' xlink:href='%23_Linear44' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-28.6377%2c0%2c0%2c-28.6377%2c701.334%2c1863.49)' gradientUnits='userSpaceOnUse' id='linearGradient25396' xlink:href='%23_Linear45' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-28.867%2c0%2c0%2c-28.867%2c-787.593%2c-1850.9)' gradientUnits='userSpaceOnUse' id='linearGradient25398' xlink:href='%23_Linear46' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-15.2653%2c0%2c0%2c-15.2653%2c698.248%2c1857.21)' gradientUnits='userSpaceOnUse' id='linearGradient25400' xlink:href='%23_Linear50' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-15.2653%2c0%2c0%2c-15.2653%2c-791.141%2c-1857.01)' gradientUnits='userSpaceOnUse' id='linearGradient25402' xlink:href='%23_Linear51' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(127.547%2c33.716%2c-33.716%2c127.547%2c679.481%2c1846.4)' gradientUnits='userSpaceOnUse' id='linearGradient25404' xlink:href='%23_Linear42' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-25.8869%2c0%2c0%2c-25.8869%2c701.405%2c1863.49)' gradientUnits='userSpaceOnUse' id='linearGradient25406' xlink:href='%23_Linear44' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-28.6377%2c0%2c0%2c-28.6377%2c701.334%2c1863.49)' gradientUnits='userSpaceOnUse' id='linearGradient25408' xlink:href='%23_Linear45' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-28.867%2c0%2c0%2c-28.867%2c-787.593%2c-1850.9)' gradientUnits='userSpaceOnUse' id='linearGradient25410' xlink:href='%23_Linear46' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-15.2653%2c0%2c0%2c-15.2653%2c698.248%2c1857.21)' gradientUnits='userSpaceOnUse' id='linearGradient25412' xlink:href='%23_Linear50' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-15.2653%2c0%2c0%2c-15.2653%2c-791.141%2c-1857.01)' gradientUnits='userSpaceOnUse' id='linearGradient25414' xlink:href='%23_Linear51' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(127.547%2c33.716%2c-33.716%2c127.547%2c679.481%2c1846.4)' gradientUnits='userSpaceOnUse' id='linearGradient25416' xlink:href='%23_Linear42' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-25.8869%2c0%2c0%2c-25.8869%2c701.405%2c1863.49)' gradientUnits='userSpaceOnUse' id='linearGradient25418' xlink:href='%23_Linear44' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-28.6377%2c0%2c0%2c-28.6377%2c701.334%2c1863.49)' gradientUnits='userSpaceOnUse' id='linearGradient25420' xlink:href='%23_Linear45' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-28.867%2c0%2c0%2c-28.867%2c-787.593%2c-1850.9)' gradientUnits='userSpaceOnUse' id='linearGradient25422' xlink:href='%23_Linear46' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-15.2653%2c0%2c0%2c-15.2653%2c698.248%2c1857.21)' gradientUnits='userSpaceOnUse' id='linearGradient25424' xlink:href='%23_Linear50' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-15.2653%2c0%2c0%2c-15.2653%2c-791.141%2c-1857.01)' gradientUnits='userSpaceOnUse' id='linearGradient25426' xlink:href='%23_Linear51' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(127.547%2c33.716%2c-33.716%2c127.547%2c679.481%2c1846.4)' gradientUnits='userSpaceOnUse' id='linearGradient25428' xlink:href='%23_Linear42' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-25.8869%2c0%2c0%2c-25.8869%2c701.405%2c1863.49)' gradientUnits='userSpaceOnUse' id='linearGradient25430' xlink:href='%23_Linear44' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-28.6377%2c0%2c0%2c-28.6377%2c701.334%2c1863.49)' gradientUnits='userSpaceOnUse' id='linearGradient25432' xlink:href='%23_Linear45' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-28.867%2c0%2c0%2c-28.867%2c-787.593%2c-1850.9)' gradientUnits='userSpaceOnUse' id='linearGradient25434' xlink:href='%23_Linear46' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-15.2653%2c0%2c0%2c-15.2653%2c698.248%2c1857.21)' gradientUnits='userSpaceOnUse' id='linearGradient25436' xlink:href='%23_Linear50' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-15.2653%2c0%2c0%2c-15.2653%2c-791.141%2c-1857.01)' gradientUnits='userSpaceOnUse' id='linearGradient25438' xlink:href='%23_Linear51' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(127.547%2c33.716%2c-33.716%2c127.547%2c679.481%2c1846.4)' gradientUnits='userSpaceOnUse' id='linearGradient25440' xlink:href='%23_Linear42' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-25.8869%2c0%2c0%2c-25.8869%2c701.405%2c1863.49)' gradientUnits='userSpaceOnUse' id='linearGradient25442' xlink:href='%23_Linear44' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-28.6377%2c0%2c0%2c-28.6377%2c701.334%2c1863.49)' gradientUnits='userSpaceOnUse' id='linearGradient25444' xlink:href='%23_Linear45' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-28.867%2c0%2c0%2c-28.867%2c-787.593%2c-1850.9)' gradientUnits='userSpaceOnUse' id='linearGradient25446' xlink:href='%23_Linear46' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-15.2653%2c0%2c0%2c-15.2653%2c698.248%2c1857.21)' gradientUnits='userSpaceOnUse' id='linearGradient25448' xlink:href='%23_Linear50' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-15.2653%2c0%2c0%2c-15.2653%2c-791.141%2c-1857.01)' gradientUnits='userSpaceOnUse' id='linearGradient25450' xlink:href='%23_Linear51' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(127.547%2c33.716%2c-33.716%2c127.547%2c679.481%2c1846.4)' gradientUnits='userSpaceOnUse' id='linearGradient25452' xlink:href='%23_Linear42' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-25.8869%2c0%2c0%2c-25.8869%2c701.405%2c1863.49)' gradientUnits='userSpaceOnUse' id='linearGradient25454' xlink:href='%23_Linear44' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-28.6377%2c0%2c0%2c-28.6377%2c701.334%2c1863.49)' gradientUnits='userSpaceOnUse' id='linearGradient25456' xlink:href='%23_Linear45' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-28.867%2c0%2c0%2c-28.867%2c-787.593%2c-1850.9)' gradientUnits='userSpaceOnUse' id='linearGradient25458' xlink:href='%23_Linear46' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-15.2653%2c0%2c0%2c-15.2653%2c698.248%2c1857.21)' gradientUnits='userSpaceOnUse' id='linearGradient25460' xlink:href='%23_Linear50' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-15.2653%2c0%2c0%2c-15.2653%2c-791.141%2c-1857.01)' gradientUnits='userSpaceOnUse' id='linearGradient25462' xlink:href='%23_Linear51' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(127.547%2c33.716%2c-33.716%2c127.547%2c679.481%2c1846.4)' gradientUnits='userSpaceOnUse' id='linearGradient25464' xlink:href='%23_Linear42' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-25.8869%2c0%2c0%2c-25.8869%2c701.405%2c1863.49)' gradientUnits='userSpaceOnUse' id='linearGradient25466' xlink:href='%23_Linear44' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-28.6377%2c0%2c0%2c-28.6377%2c701.334%2c1863.49)' gradientUnits='userSpaceOnUse' id='linearGradient25468' xlink:href='%23_Linear45' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-28.867%2c0%2c0%2c-28.867%2c-787.593%2c-1850.9)' gradientUnits='userSpaceOnUse' id='linearGradient25470' xlink:href='%23_Linear46' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-15.2653%2c0%2c0%2c-15.2653%2c698.248%2c1857.21)' gradientUnits='userSpaceOnUse' id='linearGradient25472' xlink:href='%23_Linear50' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-15.2653%2c0%2c0%2c-15.2653%2c-791.141%2c-1857.01)' gradientUnits='userSpaceOnUse' id='linearGradient25474' xlink:href='%23_Linear51' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(127.547%2c33.716%2c-33.716%2c127.547%2c679.481%2c1846.4)' gradientUnits='userSpaceOnUse' id='linearGradient25476' xlink:href='%23_Linear42' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-25.8869%2c0%2c0%2c-25.8869%2c701.405%2c1863.49)' gradientUnits='userSpaceOnUse' id='linearGradient25478' xlink:href='%23_Linear44' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-28.6377%2c0%2c0%2c-28.6377%2c701.334%2c1863.49)' gradientUnits='userSpaceOnUse' id='linearGradient25480' xlink:href='%23_Linear45' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-28.867%2c0%2c0%2c-28.867%2c-787.593%2c-1850.9)' gradientUnits='userSpaceOnUse' id='linearGradient25482' xlink:href='%23_Linear46' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-15.2653%2c0%2c0%2c-15.2653%2c698.248%2c1857.21)' gradientUnits='userSpaceOnUse' id='linearGradient25484' xlink:href='%23_Linear50' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-15.2653%2c0%2c0%2c-15.2653%2c-791.141%2c-1857.01)' gradientUnits='userSpaceOnUse' id='linearGradient25486' xlink:href='%23_Linear51' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(127.547%2c33.716%2c-33.716%2c127.547%2c679.481%2c1846.4)' gradientUnits='userSpaceOnUse' id='linearGradient25488' xlink:href='%23_Linear42' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-25.8869%2c0%2c0%2c-25.8869%2c701.405%2c1863.49)' gradientUnits='userSpaceOnUse' id='linearGradient25490' xlink:href='%23_Linear44' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-28.6377%2c0%2c0%2c-28.6377%2c701.334%2c1863.49)' gradientUnits='userSpaceOnUse' id='linearGradient25492' xlink:href='%23_Linear45' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-28.867%2c0%2c0%2c-28.867%2c-787.593%2c-1850.9)' gradientUnits='userSpaceOnUse' id='linearGradient25494' xlink:href='%23_Linear46' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-15.2653%2c0%2c0%2c-15.2653%2c698.248%2c1857.21)' gradientUnits='userSpaceOnUse' id='linearGradient25496' xlink:href='%23_Linear50' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-15.2653%2c0%2c0%2c-15.2653%2c-791.141%2c-1857.01)' gradientUnits='userSpaceOnUse' id='linearGradient25498' xlink:href='%23_Linear51' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(127.547%2c33.716%2c-33.716%2c127.547%2c679.481%2c1846.4)' gradientUnits='userSpaceOnUse' id='linearGradient25500' xlink:href='%23_Linear42' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-25.8869%2c0%2c0%2c-25.8869%2c701.405%2c1863.49)' gradientUnits='userSpaceOnUse' id='linearGradient25502' xlink:href='%23_Linear44' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-28.6377%2c0%2c0%2c-28.6377%2c701.334%2c1863.49)' gradientUnits='userSpaceOnUse' id='linearGradient25504' xlink:href='%23_Linear45' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-28.867%2c0%2c0%2c-28.867%2c-787.593%2c-1850.9)' gradientUnits='userSpaceOnUse' id='linearGradient25506' xlink:href='%23_Linear46' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-15.2653%2c0%2c0%2c-15.2653%2c698.248%2c1857.21)' gradientUnits='userSpaceOnUse' id='linearGradient25508' xlink:href='%23_Linear50' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-15.2653%2c0%2c0%2c-15.2653%2c-791.141%2c-1857.01)' gradientUnits='userSpaceOnUse' id='linearGradient25510' xlink:href='%23_Linear51' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(127.547%2c33.716%2c-33.716%2c127.547%2c679.481%2c1846.4)' gradientUnits='userSpaceOnUse' id='linearGradient25512' xlink:href='%23_Linear42' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-25.8869%2c0%2c0%2c-25.8869%2c701.405%2c1863.49)' gradientUnits='userSpaceOnUse' id='linearGradient25514' xlink:href='%23_Linear44' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-28.6377%2c0%2c0%2c-28.6377%2c701.334%2c1863.49)' gradientUnits='userSpaceOnUse' id='linearGradient25516' xlink:href='%23_Linear45' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-28.867%2c0%2c0%2c-28.867%2c-787.593%2c-1850.9)' gradientUnits='userSpaceOnUse' id='linearGradient25518' xlink:href='%23_Linear46' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-15.2653%2c0%2c0%2c-15.2653%2c698.248%2c1857.21)' gradientUnits='userSpaceOnUse' id='linearGradient25520' xlink:href='%23_Linear50' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-15.2653%2c0%2c0%2c-15.2653%2c-791.141%2c-1857.01)' gradientUnits='userSpaceOnUse' id='linearGradient25522' xlink:href='%23_Linear51' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(127.547%2c33.716%2c-33.716%2c127.547%2c679.481%2c1846.4)' gradientUnits='userSpaceOnUse' id='linearGradient25524' xlink:href='%23_Linear42' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-25.8869%2c0%2c0%2c-25.8869%2c701.405%2c1863.49)' gradientUnits='userSpaceOnUse' id='linearGradient25526' xlink:href='%23_Linear44' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-28.6377%2c0%2c0%2c-28.6377%2c701.334%2c1863.49)' gradientUnits='userSpaceOnUse' id='linearGradient25528' xlink:href='%23_Linear45' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-28.867%2c0%2c0%2c-28.867%2c-787.593%2c-1850.9)' gradientUnits='userSpaceOnUse' id='linearGradient25530' xlink:href='%23_Linear46' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-15.2653%2c0%2c0%2c-15.2653%2c698.248%2c1857.21)' gradientUnits='userSpaceOnUse' id='linearGradient25532' xlink:href='%23_Linear50' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-15.2653%2c0%2c0%2c-15.2653%2c-791.141%2c-1857.01)' gradientUnits='userSpaceOnUse' id='linearGradient25534' xlink:href='%23_Linear51' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(127.547%2c33.716%2c-33.716%2c127.547%2c679.481%2c1846.4)' gradientUnits='userSpaceOnUse' id='linearGradient25536' xlink:href='%23_Linear42' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-25.8869%2c0%2c0%2c-25.8869%2c701.405%2c1863.49)' gradientUnits='userSpaceOnUse' id='linearGradient25538' xlink:href='%23_Linear44' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-28.6377%2c0%2c0%2c-28.6377%2c701.334%2c1863.49)' gradientUnits='userSpaceOnUse' id='linearGradient25540' xlink:href='%23_Linear45' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-28.867%2c0%2c0%2c-28.867%2c-787.593%2c-1850.9)' gradientUnits='userSpaceOnUse' id='linearGradient25542' xlink:href='%23_Linear46' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-15.2653%2c0%2c0%2c-15.2653%2c698.248%2c1857.21)' gradientUnits='userSpaceOnUse' id='linearGradient25544' xlink:href='%23_Linear50' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-15.2653%2c0%2c0%2c-15.2653%2c-791.141%2c-1857.01)' gradientUnits='userSpaceOnUse' id='linearGradient25546' xlink:href='%23_Linear51' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(127.547%2c33.716%2c-33.716%2c127.547%2c679.481%2c1846.4)' gradientUnits='userSpaceOnUse' id='linearGradient25548' xlink:href='%23_Linear42' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-25.8869%2c0%2c0%2c-25.8869%2c701.405%2c1863.49)' gradientUnits='userSpaceOnUse' id='linearGradient25550' xlink:href='%23_Linear44' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-28.6377%2c0%2c0%2c-28.6377%2c701.334%2c1863.49)' gradientUnits='userSpaceOnUse' id='linearGradient25552' xlink:href='%23_Linear45' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-28.867%2c0%2c0%2c-28.867%2c-787.593%2c-1850.9)' gradientUnits='userSpaceOnUse' id='linearGradient25554' xlink:href='%23_Linear46' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-15.2653%2c0%2c0%2c-15.2653%2c698.248%2c1857.21)' gradientUnits='userSpaceOnUse' id='linearGradient25556' xlink:href='%23_Linear50' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-15.2653%2c0%2c0%2c-15.2653%2c-791.141%2c-1857.01)' gradientUnits='userSpaceOnUse' id='linearGradient25558' xlink:href='%23_Linear51' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(127.547%2c33.716%2c-33.716%2c127.547%2c679.481%2c1846.4)' gradientUnits='userSpaceOnUse' id='linearGradient25560' xlink:href='%23_Linear42' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-25.8869%2c0%2c0%2c-25.8869%2c701.405%2c1863.49)' gradientUnits='userSpaceOnUse' id='linearGradient25562' xlink:href='%23_Linear44' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-28.6377%2c0%2c0%2c-28.6377%2c701.334%2c1863.49)' gradientUnits='userSpaceOnUse' id='linearGradient25564' xlink:href='%23_Linear45' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-28.867%2c0%2c0%2c-28.867%2c-787.593%2c-1850.9)' gradientUnits='userSpaceOnUse' id='linearGradient25566' xlink:href='%23_Linear46' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-15.2653%2c0%2c0%2c-15.2653%2c698.248%2c1857.21)' gradientUnits='userSpaceOnUse' id='linearGradient25568' xlink:href='%23_Linear50' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-15.2653%2c0%2c0%2c-15.2653%2c-791.141%2c-1857.01)' gradientUnits='userSpaceOnUse' id='linearGradient25570' xlink:href='%23_Linear51' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(127.547%2c33.716%2c-33.716%2c127.547%2c679.481%2c1846.4)' gradientUnits='userSpaceOnUse' id='linearGradient25572' xlink:href='%23_Linear42' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-25.8869%2c0%2c0%2c-25.8869%2c701.405%2c1863.49)' gradientUnits='userSpaceOnUse' id='linearGradient25574' xlink:href='%23_Linear44' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-28.6377%2c0%2c0%2c-28.6377%2c701.334%2c1863.49)' gradientUnits='userSpaceOnUse' id='linearGradient25576' xlink:href='%23_Linear45' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-28.867%2c0%2c0%2c-28.867%2c-787.593%2c-1850.9)' gradientUnits='userSpaceOnUse' id='linearGradient25578' xlink:href='%23_Linear46' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-15.2653%2c0%2c0%2c-15.2653%2c698.248%2c1857.21)' gradientUnits='userSpaceOnUse' id='linearGradient25580' xlink:href='%23_Linear50' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-15.2653%2c0%2c0%2c-15.2653%2c-791.141%2c-1857.01)' gradientUnits='userSpaceOnUse' id='linearGradient25582' xlink:href='%23_Linear51' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(0%2c-51.6668%2c51.6668%2c0%2c-606.286%2c486.755)' gradientUnits='userSpaceOnUse' id='linearGradient25584' xlink:href='%23_Linear245' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(10.4409%2c11.5341%2c-11.5341%2c10.4409%2c-614.713%2c432.795)' gradientUnits='userSpaceOnUse' id='linearGradient25586' xlink:href='%23_Linear246' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(0%2c-51.6668%2c51.6668%2c0%2c-606.286%2c486.755)' gradientUnits='userSpaceOnUse' id='linearGradient25588' xlink:href='%23_Linear245' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(10.4409%2c11.5341%2c-11.5341%2c10.4409%2c-614.713%2c432.795)' gradientUnits='userSpaceOnUse' id='linearGradient25590' xlink:href='%23_Linear246' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(0%2c-51.6668%2c51.6668%2c0%2c-606.286%2c486.755)' gradientUnits='userSpaceOnUse' id='linearGradient25592' xlink:href='%23_Linear245' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(10.4409%2c11.5341%2c-11.5341%2c10.4409%2c-614.713%2c432.795)' gradientUnits='userSpaceOnUse' id='linearGradient25594' xlink:href='%23_Linear246' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(0%2c-51.6668%2c51.6668%2c0%2c-606.286%2c486.755)' gradientUnits='userSpaceOnUse' id='linearGradient25596' xlink:href='%23_Linear245' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(10.4409%2c11.5341%2c-11.5341%2c10.4409%2c-614.713%2c432.795)' gradientUnits='userSpaceOnUse' id='linearGradient25598' xlink:href='%23_Linear246' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(0%2c-51.6668%2c51.6668%2c0%2c-606.286%2c486.755)' gradientUnits='userSpaceOnUse' id='linearGradient25600' xlink:href='%23_Linear245' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(10.4409%2c11.5341%2c-11.5341%2c10.4409%2c-614.713%2c432.795)' gradientUnits='userSpaceOnUse' id='linearGradient25602' xlink:href='%23_Linear246' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(0%2c-51.6668%2c51.6668%2c0%2c-606.286%2c486.755)' gradientUnits='userSpaceOnUse' id='linearGradient25604' xlink:href='%23_Linear245' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(10.4409%2c11.5341%2c-11.5341%2c10.4409%2c-614.713%2c432.795)' gradientUnits='userSpaceOnUse' id='linearGradient25606' xlink:href='%23_Linear246' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(0%2c-51.6668%2c51.6668%2c0%2c-606.286%2c486.755)' gradientUnits='userSpaceOnUse' id='linearGradient25608' xlink:href='%23_Linear245' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(10.4409%2c11.5341%2c-11.5341%2c10.4409%2c-614.713%2c432.795)' gradientUnits='userSpaceOnUse' id='linearGradient25610' xlink:href='%23_Linear246' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(0%2c-51.6668%2c51.6668%2c0%2c-606.286%2c486.755)' gradientUnits='userSpaceOnUse' id='linearGradient25612' xlink:href='%23_Linear245' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(10.4409%2c11.5341%2c-11.5341%2c10.4409%2c-614.713%2c432.795)' gradientUnits='userSpaceOnUse' id='linearGradient25614' xlink:href='%23_Linear246' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(0%2c-51.6668%2c51.6668%2c0%2c-606.286%2c486.755)' gradientUnits='userSpaceOnUse' id='linearGradient25616' xlink:href='%23_Linear245' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(10.4409%2c11.5341%2c-11.5341%2c10.4409%2c-614.713%2c432.795)' gradientUnits='userSpaceOnUse' id='linearGradient25618' xlink:href='%23_Linear246' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(0%2c-51.6668%2c51.6668%2c0%2c-606.286%2c486.755)' gradientUnits='userSpaceOnUse' id='linearGradient25620' xlink:href='%23_Linear245' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(10.4409%2c11.5341%2c-11.5341%2c10.4409%2c-614.713%2c432.795)' gradientUnits='userSpaceOnUse' id='linearGradient25622' xlink:href='%23_Linear246' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(0%2c-51.6668%2c51.6668%2c0%2c-606.286%2c486.755)' gradientUnits='userSpaceOnUse' id='linearGradient25624' xlink:href='%23_Linear245' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(10.4409%2c11.5341%2c-11.5341%2c10.4409%2c-614.713%2c432.795)' gradientUnits='userSpaceOnUse' id='linearGradient25626' xlink:href='%23_Linear246' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(0%2c-51.6668%2c51.6668%2c0%2c-606.286%2c486.755)' gradientUnits='userSpaceOnUse' id='linearGradient25628' xlink:href='%23_Linear245' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(10.4409%2c11.5341%2c-11.5341%2c10.4409%2c-614.713%2c432.795)' gradientUnits='userSpaceOnUse' id='linearGradient25630' xlink:href='%23_Linear246' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(0%2c-51.6668%2c51.6668%2c0%2c-606.286%2c486.755)' gradientUnits='userSpaceOnUse' id='linearGradient25632' xlink:href='%23_Linear245' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(10.4409%2c11.5341%2c-11.5341%2c10.4409%2c-614.713%2c432.795)' gradientUnits='userSpaceOnUse' id='linearGradient25634' xlink:href='%23_Linear246' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(0%2c-51.6668%2c51.6668%2c0%2c-606.286%2c486.755)' gradientUnits='userSpaceOnUse' id='linearGradient25636' xlink:href='%23_Linear245' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(10.4409%2c11.5341%2c-11.5341%2c10.4409%2c-614.713%2c432.795)' gradientUnits='userSpaceOnUse' id='linearGradient25638' xlink:href='%23_Linear246' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(0%2c-51.6668%2c51.6668%2c0%2c-606.286%2c486.755)' gradientUnits='userSpaceOnUse' id='linearGradient25640' xlink:href='%23_Linear245' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(10.4409%2c11.5341%2c-11.5341%2c10.4409%2c-614.713%2c432.795)' gradientUnits='userSpaceOnUse' id='linearGradient25642' xlink:href='%23_Linear246' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(0%2c-51.6668%2c51.6668%2c0%2c-606.286%2c486.755)' gradientUnits='userSpaceOnUse' id='linearGradient25644' xlink:href='%23_Linear245' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(10.4409%2c11.5341%2c-11.5341%2c10.4409%2c-614.713%2c432.795)' gradientUnits='userSpaceOnUse' id='linearGradient25646' xlink:href='%23_Linear246' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(0%2c-51.6668%2c51.6668%2c0%2c-606.286%2c486.755)' gradientUnits='userSpaceOnUse' id='linearGradient25648' xlink:href='%23_Linear245' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(10.4409%2c11.5341%2c-11.5341%2c10.4409%2c-614.713%2c432.795)' gradientUnits='userSpaceOnUse' id='linearGradient25650' xlink:href='%23_Linear246' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(0%2c-51.6668%2c51.6668%2c0%2c-606.286%2c486.755)' gradientUnits='userSpaceOnUse' id='linearGradient25652' xlink:href='%23_Linear245' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(10.4409%2c11.5341%2c-11.5341%2c10.4409%2c-614.713%2c432.795)' gradientUnits='userSpaceOnUse' id='linearGradient25654' xlink:href='%23_Linear246' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(0%2c-51.6668%2c51.6668%2c0%2c-606.286%2c486.755)' gradientUnits='userSpaceOnUse' id='linearGradient25656' xlink:href='%23_Linear245' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(10.4409%2c11.5341%2c-11.5341%2c10.4409%2c-614.713%2c432.795)' gradientUnits='userSpaceOnUse' id='linearGradient25658' xlink:href='%23_Linear246' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-4.57863%2c-113.553%2c113.553%2c-4.57863%2c69.9172%2c120.356)' gradientUnits='userSpaceOnUse' id='linearGradient25660' xlink:href='%23_Linear284' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-4.57863%2c-113.553%2c113.553%2c-4.57863%2c69.9172%2c120.356)' gradientUnits='userSpaceOnUse' id='linearGradient25662' xlink:href='%23_Linear284' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-0.0351496%2c-1.47321%2c1.47321%2c-0.0351496%2c627.388%2c244.72)' gradientUnits='userSpaceOnUse' id='linearGradient25664' xlink:href='%23_Linear292' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(0%2c4.12243%2c-4.12243%2c0%2c1386.36%2c717.021)' gradientUnits='userSpaceOnUse' id='linearGradient25666' xlink:href='%23_Linear293' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(0%2c4.12243%2c-4.12243%2c0%2c1386.36%2c717.021)' gradientUnits='userSpaceOnUse' id='linearGradient25668' xlink:href='%23_Linear293' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(0%2c4.12243%2c-4.12243%2c0%2c1386.36%2c717.021)' gradientUnits='userSpaceOnUse' id='linearGradient25670' xlink:href='%23_Linear293' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(0%2c4.12243%2c-4.12243%2c0%2c1386.36%2c717.021)' gradientUnits='userSpaceOnUse' id='linearGradient25672' xlink:href='%23_Linear293' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(0%2c-1.6071%2c1.6071%2c0%2c278.781%2c-654.943)' gradientUnits='userSpaceOnUse' id='linearGradient25674' xlink:href='%23_Linear297' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(52.7025%2c39.7776%2c-39.7776%2c52.7025%2c248.074%2c612.028)' gradientUnits='userSpaceOnUse' id='linearGradient25676' xlink:href='%23_Linear298' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(-0.0351496%2c-1.47321%2c1.47321%2c-0.0351496%2c627.388%2c244.72)' gradientUnits='userSpaceOnUse' id='linearGradient25678' xlink:href='%23_Linear292' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(0%2c4.12243%2c-4.12243%2c0%2c1386.36%2c717.021)' gradientUnits='userSpaceOnUse' id='linearGradient25680' xlink:href='%23_Linear293' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(0%2c4.12243%2c-4.12243%2c0%2c1386.36%2c717.021)' gradientUnits='userSpaceOnUse' id='linearGradient25682' xlink:href='%23_Linear293' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(0%2c4.12243%2c-4.12243%2c0%2c1386.36%2c717.021)' gradientUnits='userSpaceOnUse' id='linearGradient25684' xlink:href='%23_Linear293' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(0%2c4.12243%2c-4.12243%2c0%2c1386.36%2c717.021)' gradientUnits='userSpaceOnUse' id='linearGradient25686' xlink:href='%23_Linear293' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(0%2c-1.6071%2c1.6071%2c0%2c278.781%2c-654.943)' gradientUnits='userSpaceOnUse' id='linearGradient25688' xlink:href='%23_Linear297' /%3e%3clinearGradient y2='0' x2='1' y1='0' x1='0' gradientTransform='matrix(52.7025%2c39.7776%2c-39.7776%2c52.7025%2c248.074%2c612.028)' gradientUnits='userSpaceOnUse' id='linearGradient25690' xlink:href='%23_Linear298' /%3e%3c/defs%3e%3cellipse cx='20.318779' cy='20.175306' rx='17.342299' ry='17.341686' style='fill:%230b308f%3bstroke-width:0.0610279' id='ellipse4' /%3e%3ctext y='35.515537' x='7.8387551' transform='scale(0.96953601%2c1.0314212)' style='font-size:37.4723053px%3bfont-family:UDDigiKyokashoNK-B%2c 'UD Digi Kyokasho NK-B'%3bisolation:isolate%3bfill:white%3bstroke-width:0.05916874' id='text6'%3eT%3c/text%3e%3c/svg%3e";

var version = 'v1';
var translationMap = {
  'en': {
    'gui.extension.tfabbit.description': "Use tfabbit. (".concat(version, ")")
  },
  'ja': {
    'gui.extension.tfabbit.description': "tfabbit\u3092\u4F7F\u3046\u3002 (".concat(version, ")")
  },
  'ja-Hira': {
    'gui.extension.tfabbit.description': "\u30C6\u30A3\u30FC\u30D5\u30A1\u30D6\u30D3\u30C3\u30C8\u3092\u3064\u304B\u3046\u3002 (".concat(version, ")")
  }
};
var entry = {
  name: 'tfabbit',
  extensionId: 'tfabbit',
  //extensionURL: 'https://microbit-more.github.io/dist/microbitMore.mjs',
  collaborator: 'TFabWorks',
  iconURL: img$3,
  insetIconURL: img$2,
  description: /*#__PURE__*/React.createElement(FormattedMessage //defaultMessage="Play with all functions of micro:bit."
  //description="Description for the 'Microbit More' extension"
  , {
    id: "gui.extension.tfabbit.description"
  }),
  featured: true,
  disabled: false,
  bluetoothRequired: false,
  internetConnectionRequired: false,
  launchPeripheralConnectionFlow: true,
  useAutoScan: false,
  connectionIconURL: img$1,
  connectionSmallIconURL: img,
  connectingMessage: /*#__PURE__*/React.createElement(FormattedMessage, {
    defaultMessage: "Connecting",
    description: "Message to help people connect to tfabbit.",
    id: "gui.extension.microbit.connectingMessage"
  }),
  helpLink: 'https://tfabworks.com/',
  translationMap: translationMap
};

var _myExtension = {};

/**
 * Types of block
 * @enum {string}
 */
var BlockType$1 = {
  /**
   * Boolean reporter with hexagonal shape
   */
  BOOLEAN: 'Boolean',

  /**
   * A button (not an actual block) for some special action, like making a variable
   */
  BUTTON: 'button',

  /**
   * Command block
   */
  COMMAND: 'command',

  /**
   * Specialized command block which may or may not run a child branch
   * The thread continues with the next block whether or not a child branch ran.
   */
  CONDITIONAL: 'conditional',

  /**
   * Specialized hat block with no implementation function
   * This stack only runs if the corresponding event is emitted by other code.
   */
  EVENT: 'event',

  /**
   * Hat block which conditionally starts a block stack
   */
  HAT: 'hat',

  /**
   * Specialized command block which may or may not run a child branch
   * If a child branch runs, the thread evaluates the loop block again.
   */
  LOOP: 'loop',

  /**
   * General reporter with numeric or string value
   */
  REPORTER: 'reporter'
};
var blockType = BlockType$1;

var web = {exports: {}};

var minilog$2 = {exports: {}};

function M() {
  this._events = {};
}

M.prototype = {
  on: function on(ev, cb) {
    this._events || (this._events = {});
    var e = this._events;
    (e[ev] || (e[ev] = [])).push(cb);
    return this;
  },
  removeListener: function removeListener(ev, cb) {
    var e = this._events[ev] || [],
        i;

    for (i = e.length - 1; i >= 0 && e[i]; i--) {
      if (e[i] === cb || e[i].cb === cb) {
        e.splice(i, 1);
      }
    }
  },
  removeAllListeners: function removeAllListeners(ev) {
    if (!ev) {
      this._events = {};
    } else {
      this._events[ev] && (this._events[ev] = []);
    }
  },
  listeners: function listeners(ev) {
    return this._events ? this._events[ev] || [] : [];
  },
  emit: function emit(ev) {
    this._events || (this._events = {});
    var args = Array.prototype.slice.call(arguments, 1),
        i,
        e = this._events[ev] || [];

    for (i = e.length - 1; i >= 0 && e[i]; i--) {
      e[i].apply(this, args);
    }

    return this;
  },
  when: function when(ev, cb) {
    return this.once(ev, cb, true);
  },
  once: function once(ev, cb, when) {
    if (!cb) return this;

    function c() {
      if (!when) this.removeListener(ev, c);
      if (cb.apply(this, arguments) && when) this.removeListener(ev, c);
    }

    c.cb = cb;
    this.on(ev, c);
    return this;
  }
};

M.mixin = function (dest) {
  var o = M.prototype,
      k;

  for (k in o) {
    o.hasOwnProperty(k) && (dest.prototype[k] = o[k]);
  }
};

var microee$1 = M;

var microee = microee$1; // Implements a subset of Node's stream.Transform - in a cross-platform manner.

function Transform$7() {}

microee.mixin(Transform$7); // The write() signature is different from Node's
// --> makes it much easier to work with objects in logs.
// One of the lessons from v1 was that it's better to target
// a good browser rather than the lowest common denominator
// internally.
// If you want to use external streams, pipe() to ./stringify.js first.

Transform$7.prototype.write = function (name, level, args) {
  this.emit('item', name, level, args);
};

Transform$7.prototype.end = function () {
  this.emit('end');
  this.removeAllListeners();
};

Transform$7.prototype.pipe = function (dest) {
  var s = this; // prevent double piping

  s.emit('unpipe', dest); // tell the dest that it's being piped to

  dest.emit('pipe', s);

  function onItem() {
    dest.write.apply(dest, Array.prototype.slice.call(arguments));
  }

  function onEnd() {
    !dest._isStdio && dest.end();
  }

  s.on('item', onItem);
  s.on('end', onEnd);
  s.when('unpipe', function (from) {
    var match = from === dest || typeof from == 'undefined';

    if (match) {
      s.removeListener('item', onItem);
      s.removeListener('end', onEnd);
      dest.emit('unpipe');
    }

    return match;
  });
  return dest;
};

Transform$7.prototype.unpipe = function (from) {
  this.emit('unpipe', from);
  return this;
};

Transform$7.prototype.format = function (dest) {
  throw new Error(['Warning: .format() is deprecated in Minilog v2! Use .pipe() instead. For example:', 'var Minilog = require(\'minilog\');', 'Minilog', '  .pipe(Minilog.backends.console.formatClean)', '  .pipe(Minilog.backends.console);'].join('\n'));
};

Transform$7.mixin = function (dest) {
  var o = Transform$7.prototype,
      k;

  for (k in o) {
    o.hasOwnProperty(k) && (dest.prototype[k] = o[k]);
  }
};

var transform = Transform$7;

var Transform$6 = transform;
var levelMap = {
  debug: 1,
  info: 2,
  warn: 3,
  error: 4
};

function Filter() {
  this.enabled = true;
  this.defaultResult = true;
  this.clear();
}

Transform$6.mixin(Filter); // allow all matching, with level >= given level

Filter.prototype.allow = function (name, level) {
  this._white.push({
    n: name,
    l: levelMap[level]
  });

  return this;
}; // deny all matching, with level <= given level


Filter.prototype.deny = function (name, level) {
  this._black.push({
    n: name,
    l: levelMap[level]
  });

  return this;
};

Filter.prototype.clear = function () {
  this._white = [];
  this._black = [];
  return this;
};

function test(rule, name) {
  // use .test for RegExps
  return rule.n.test ? rule.n.test(name) : rule.n == name;
}

Filter.prototype.test = function (name, level) {
  var i,
      len = Math.max(this._white.length, this._black.length);

  for (i = 0; i < len; i++) {
    if (this._white[i] && test(this._white[i], name) && levelMap[level] >= this._white[i].l) {
      return true;
    }

    if (this._black[i] && test(this._black[i], name) && levelMap[level] <= this._black[i].l) {
      return false;
    }
  }

  return this.defaultResult;
};

Filter.prototype.write = function (name, level, args) {
  if (!this.enabled || this.test(name, level)) {
    return this.emit('item', name, level, args);
  }
};

var filter = Filter;

(function (module, exports) {
  var Transform = transform,
      Filter = filter;
  var log = new Transform(),
      slice = Array.prototype.slice;

  exports = module.exports = function create(name) {
    var o = function o() {
      log.write(name, undefined, slice.call(arguments));
      return o;
    };

    o.debug = function () {
      log.write(name, 'debug', slice.call(arguments));
      return o;
    };

    o.info = function () {
      log.write(name, 'info', slice.call(arguments));
      return o;
    };

    o.warn = function () {
      log.write(name, 'warn', slice.call(arguments));
      return o;
    };

    o.error = function () {
      log.write(name, 'error', slice.call(arguments));
      return o;
    };

    o.log = o.debug; // for interface compliance with Node and browser consoles

    o.suggest = exports.suggest;
    o.format = log.format;
    return o;
  }; // filled in separately


  exports.defaultBackend = exports.defaultFormatter = null;

  exports.pipe = function (dest) {
    return log.pipe(dest);
  };

  exports.end = exports.unpipe = exports.disable = function (from) {
    return log.unpipe(from);
  };

  exports.Transform = Transform;
  exports.Filter = Filter; // this is the default filter that's applied when .enable() is called normally
  // you can bypass it completely and set up your own pipes

  exports.suggest = new Filter();

  exports.enable = function () {
    if (exports.defaultFormatter) {
      return log.pipe(exports.suggest) // filter
      .pipe(exports.defaultFormatter) // formatter
      .pipe(exports.defaultBackend); // backend
    }

    return log.pipe(exports.suggest) // filter
    .pipe(exports.defaultBackend); // formatter
  };
})(minilog$2, minilog$2.exports);

var hex = {
  black: '#000',
  red: '#c23621',
  green: '#25bc26',
  yellow: '#bbbb00',
  blue: '#492ee1',
  magenta: '#d338d3',
  cyan: '#33bbc8',
  gray: '#808080',
  purple: '#708'
};

function color$2(fg, isInverse) {
  if (isInverse) {
    return 'color: #fff; background: ' + hex[fg] + ';';
  } else {
    return 'color: ' + hex[fg] + ';';
  }
}

var util = color$2;

var Transform$5 = transform,
    color$1 = util;
var colors$1 = {
  debug: ['cyan'],
  info: ['purple'],
  warn: ['yellow', true],
  error: ['red', true]
},
    logger$4 = new Transform$5();

logger$4.write = function (name, level, args) {
  var fn = console.log;

  if (console[level] && console[level].apply) {
    fn = console[level];
    fn.apply(console, ['%c' + name + ' %c' + level, color$1('gray'), color$1.apply(color$1, colors$1[level])].concat(args));
  }
}; // NOP, because piping the formatted logs can only cause trouble.


logger$4.pipe = function () {};

var color_1 = logger$4;

var Transform$4 = transform,
    color = util,
    colors = {
  debug: ['gray'],
  info: ['purple'],
  warn: ['yellow', true],
  error: ['red', true]
},
    logger$3 = new Transform$4();

logger$3.write = function (name, level, args) {
  var fn = console.log;

  if (level != 'debug' && console[level]) {
    fn = console[level];
  }

  var i = 0;

  if (level != 'info') {
    for (; i < args.length; i++) {
      if (typeof args[i] != 'string') break;
    }

    fn.apply(console, ['%c' + name + ' ' + args.slice(0, i).join(' '), color.apply(color, colors[level])].concat(args.slice(i)));
  } else {
    fn.apply(console, ['%c' + name, color.apply(color, colors[level])].concat(args));
  }
}; // NOP, because piping the formatted logs can only cause trouble.


logger$3.pipe = function () {};

var minilog$1 = logger$3;

var Transform$3 = transform;
var newlines = /\n+$/,
    logger$2 = new Transform$3();

logger$2.write = function (name, level, args) {
  var i = args.length - 1;

  if (typeof console === 'undefined' || !console.log) {
    return;
  }

  if (console.log.apply) {
    return console.log.apply(console, [name, level].concat(args));
  } else if (JSON && JSON.stringify) {
    // console.log.apply is undefined in IE8 and IE9
    // for IE8/9: make console.log at least a bit less awful
    if (args[i] && typeof args[i] == 'string') {
      args[i] = args[i].replace(newlines, '');
    }

    try {
      for (i = 0; i < args.length; i++) {
        args[i] = JSON.stringify(args[i]);
      }
    } catch (e) {}

    console.log(args.join(' '));
  }
};

logger$2.formatters = ['color', 'minilog'];
logger$2.color = color_1;
logger$2.minilog = minilog$1;
var console_1 = logger$2;

var Transform$2 = transform,
    cache$1 = [];
var logger$1 = new Transform$2();

logger$1.write = function (name, level, args) {
  cache$1.push([name, level, args]);
}; // utility functions


logger$1.get = function () {
  return cache$1;
};

logger$1.empty = function () {
  cache$1 = [];
};

var array = logger$1;

var Transform$1 = transform,
    cache = false;
var logger = new Transform$1();

logger.write = function (name, level, args) {
  if (typeof window == 'undefined' || typeof JSON == 'undefined' || !JSON.stringify || !JSON.parse) return;

  try {
    if (!cache) {
      cache = window.localStorage.minilog ? JSON.parse(window.localStorage.minilog) : [];
    }

    cache.push([new Date().toString(), name, level, args]);
    window.localStorage.minilog = JSON.stringify(cache);
  } catch (e) {}
};

var localstorage = logger;

var Transform = transform;
var cid = new Date().valueOf().toString(36);

function AjaxLogger(options) {
  this.url = options.url || '';
  this.cache = [];
  this.timer = null;
  this.interval = options.interval || 30 * 1000;
  this.enabled = true;
  this.jQuery = window.jQuery;
  this.extras = {};
}

Transform.mixin(AjaxLogger);

AjaxLogger.prototype.write = function (name, level, args) {
  if (!this.timer) {
    this.init();
  }

  this.cache.push([name, level].concat(args));
};

AjaxLogger.prototype.init = function () {
  if (!this.enabled || !this.jQuery) return;
  var self = this;
  this.timer = setTimeout(function () {
    var i,
        logs = [],
        ajaxData,
        url = self.url;
    if (self.cache.length == 0) return self.init(); // Test each log line and only log the ones that are valid (e.g. don't have circular references).
    // Slight performance hit but benefit is we log all valid lines.

    for (i = 0; i < self.cache.length; i++) {
      try {
        JSON.stringify(self.cache[i]);
        logs.push(self.cache[i]);
      } catch (e) {}
    }

    if (self.jQuery.isEmptyObject(self.extras)) {
      ajaxData = JSON.stringify({
        logs: logs
      });
      url = self.url + '?client_id=' + cid;
    } else {
      ajaxData = JSON.stringify(self.jQuery.extend({
        logs: logs
      }, self.extras));
    }

    self.jQuery.ajax(url, {
      type: 'POST',
      cache: false,
      processData: false,
      data: ajaxData,
      contentType: 'application/json',
      timeout: 10000
    }).success(function (data, status, jqxhr) {
      if (data.interval) {
        self.interval = Math.max(1000, data.interval);
      }
    }).error(function () {
      self.interval = 30000;
    }).always(function () {
      self.init();
    });
    self.cache = [];
  }, this.interval);
};

AjaxLogger.prototype.end = function () {}; // wait until jQuery is defined. Useful if you don't control the load order.


AjaxLogger.jQueryWait = function (onDone) {
  if (typeof window !== 'undefined' && (window.jQuery || window.$)) {
    return onDone(window.jQuery || window.$);
  } else if (typeof window !== 'undefined') {
    setTimeout(function () {
      AjaxLogger.jQueryWait(onDone);
    }, 200);
  }
};

var jquery_simple = AjaxLogger;

(function (module, exports) {
  var Minilog = minilog$2.exports;
  var oldEnable = Minilog.enable,
      oldDisable = Minilog.disable,
      isChrome = typeof navigator != 'undefined' && /chrome/i.test(navigator.userAgent),
      console = console_1; // Use a more capable logging backend if on Chrome

  Minilog.defaultBackend = isChrome ? console.minilog : console; // apply enable inputs from localStorage and from the URL

  if (typeof window != 'undefined') {
    try {
      Minilog.enable(JSON.parse(window.localStorage['minilogSettings']));
    } catch (e) {}

    if (window.location && window.location.search) {
      var match = RegExp('[?&]minilog=([^&]*)').exec(window.location.search);
      match && Minilog.enable(decodeURIComponent(match[1]));
    }
  } // Make enable also add to localStorage


  Minilog.enable = function () {
    oldEnable.call(Minilog, true);

    try {
      window.localStorage['minilogSettings'] = JSON.stringify(true);
    } catch (e) {}

    return this;
  };

  Minilog.disable = function () {
    oldDisable.call(Minilog);

    try {
      delete window.localStorage.minilogSettings;
    } catch (e) {}

    return this;
  };

  exports = module.exports = Minilog;
  exports.backends = {
    array: array,
    browser: Minilog.defaultBackend,
    localStorage: localstorage,
    jQuery: jquery_simple
  };
})(web, web.exports);

var minilog = web.exports;
minilog.enable();
var log$1 = minilog('vm');

var BlockType = blockType;
var log = log$1;
var EXTENSION_ID = 'tfabbit';
var blockIconURI = 'data:image/png;base64,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';
var sensing = {
  brightness: 0,
  temperature: 0,
  motion: 0
};

var Tfabbit = /*#__PURE__*/function () {
  function Tfabbit(runtime, extensionId) {
    _classCallCheck(this, Tfabbit);

    this.runtime = runtime;
    this._webserial = null;
    this.runtime.registerPeripheralExtension(extensionId, this);
    this._extensionId = extensionId;
  }

  _createClass(Tfabbit, [{
    key: "scanSerial",
    value: function scanSerial() {
      this._webserial = new WebSerial(this.runtime, this._extensionId, {
        filters: [{
          usbVendorId: 0x04d8,
          usbProductId: 0x000a
        }]
      });
    } // runtimeから周辺機器scanするとき呼ばれる

  }, {
    key: "scan",
    value: function scan() {
      if (this._webserial) {
        this._webserial.disconnect();
      }

      this.scanSerial();
    } // runtimeから周辺機器に接続するとき呼ばれる

  }, {
    key: "connect",
    value: function connect(id) {
      if (this._webserial) {
        this._webserial.connectPeripheral(id);
      }
    } // tfabbitを切断する

  }, {
    key: "disconnect",
    value: function disconnect() {
      if (this._webserial) {
        this._webserial.disconnect();
      }
    } // tfabbitが接続されているかどうか

  }, {
    key: "isConnected",
    value: function isConnected() {
      var connected = false;

      if (this._webserial) {
        connected = this._webserial.isConnected();
      }

      return connected;
    }
  }]);

  return Tfabbit;
}();

var TfabbitBlocks = /*#__PURE__*/function () {
  function TfabbitBlocks(runtime) {
    _classCallCheck(this, TfabbitBlocks);

    this.runtime = runtime;

    if (runtime.formatMessage) {
      formatMessage = runtime.formatMessage;
    }

    this._peripheral = new Tfabbit(this.runtime, TfabbitBlocks.EXTENSION_ID);
  }

  _createClass(TfabbitBlocks, [{
    key: "getInfo",
    value: function getInfo() {
      return {
        id: TfabbitBlocks.EXTENSION_ID,
        name: TfabbitBlocks.EXTENSION_NAME,
        blockIconURI: blockIconURI,
        showStatusButton: true,
        blocks: [{
          opcode: 'turnON',
          blockType: BlockType.COMMAND,
          text: 'スイッチON'
        }, {
          opcode: 'turnOFF',
          blockType: BlockType.COMMAND,
          text: 'スイッチOFF'
        }, {
          opcode: 'isHumanMoving',
          blockType: BlockType.BOOLEAN,
          text: '人が動いた'
        }, {
          opcode: 'isBright',
          blockType: BlockType.BOOLEAN,
          text: '明るい'
        }, {
          opcode: 'isDark',
          blockType: BlockType.BOOLEAN,
          text: '暗い'
        }, {
          opcode: 'isHot',
          blockType: BlockType.BOOLEAN,
          text: '暑い'
        }, {
          opcode: 'lightLevel',
          blockType: BlockType.REPORTER,
          text: '明るさ(lux)'
        }, {
          opcode: 'getTemperature',
          blockType: BlockType.REPORTER,
          text: '温度(℃)'
        }]
      };
    }
  }, {
    key: "turnON",
    value: function turnON() {
      this._peripheral._webserial.sendCommand('4=1');
    }
  }, {
    key: "turnOFF",
    value: function turnOFF() {
      this._peripheral._webserial.sendCommand('4=0');
    }
  }, {
    key: "lightLevel",
    value: function lightLevel() {
      return sensing.brightness;
    }
  }, {
    key: "getTemperature",
    value: function getTemperature() {
      return sensing.temperature;
    }
  }, {
    key: "isHumanMoving",
    value: function isHumanMoving() {
      if (sensing.motion == 1) {
        return true;
      }

      return false;
    }
  }, {
    key: "isHot",
    value: function isHot() {
      if (sensing.temperature > 30) {
        return true;
      }

      return false;
    }
  }, {
    key: "isBright",
    value: function isBright() {
      if (sensing.brightness > 200) {
        return true;
      }

      return false;
    }
  }, {
    key: "isDark",
    value: function isDark() {
      if (sensing.brightness <= 200) {
        return true;
      }

      return false;
    }
  }], [{
    key: "EXTENSION_NAME",
    get: function get() {
      return 'tfabbit';
    }
  }, {
    key: "EXTENSION_ID",
    get: function get() {
      return EXTENSION_ID;
    }
  }]);

  return TfabbitBlocks;
}();

var WebSerial = /*#__PURE__*/function () {
  function WebSerial(runtime, extensionId, peripheralOptions) {
    _classCallCheck(this, WebSerial);

    this.port = null;
    this.state = 'init';
    this._extensionId = extensionId;
    this._peripheralOptions = peripheralOptions;
    this._serialOptions = {
      baudRate: 115200
    };
    this._runtime = runtime;
    this.sendCompleted = true;
    this.requestPeripheral();
  }

  _createClass(WebSerial, [{
    key: "requestPeripheral",
    value: function requestPeripheral() {
      var _this = this;

      var promise = Promise.resolve();

      if (this.isConnected()) {
        promise = promise.then(function () {
          return _this.disconnect();
        });
      }

      return promise.then(function () {
        navigator.serial.requestPort(_this._peripheralOptions).then(function (selected) {
          _this.port = selected;

          _this._runtime.connectPeripheral(_this._extensionId, null);
        }).catch(function (e) {
          _this._handleRequestError(e);
        });
      });
    }
  }, {
    key: "connectPeripheral",
    value: function connectPeripheral() {
      var _this2 = this;

      if (!this.port) {
        throw new Error('device is not chosen');
      }

      var LineBreakTransformer = /*#__PURE__*/function () {
        function LineBreakTransformer() {
          _classCallCheck(this, LineBreakTransformer);

          this.chunks = "";
        }

        _createClass(LineBreakTransformer, [{
          key: "transform",
          value: function transform(chunk, controller) {
            this.chunks += chunk;
            var lines = this.chunks.split("\n");
            this.chunks = lines.pop();
            lines.forEach(function (line) {
              return controller.enqueue(line);
            });
          }
        }, {
          key: "flush",
          value: function flush(controller) {
            controller.enqueue(this.chunks);
          }
        }]);

        return LineBreakTransformer;
      }();

      this.port.open(this._serialOptions).then(function () {
        log.log("SerialPort: open");
        _this2.state = 'open';
        _this2.writer = _this2.port.writable.getWriter();
        _this2.textDecoder = new TextDecoderStream();
        _this2.readableStreamClosed = _this2.port.readable.pipeTo(_this2.textDecoder.writable);
        _this2.reader = _this2.textDecoder.readable.pipeThrough(new TransformStream(new LineBreakTransformer())).getReader();

        _this2.port.addEventListener('disconnect', function (event) {
          _this2.onDisconnected(event);
        });

        _this2._runtime.emit(_this2._runtime.constructor.PERIPHERAL_CONNECTED);

        _this2.readSerialLoop();
      });
    }
  }, {
    key: "disconnect",
    value: function disconnect() {
      var _this3 = this;

      if (this.state !== 'open') return Promise.resolve();
      this.state = 'closing';
      this.stopReceiving();
      return this.reader.cancel().then(function () {
        return _this3.readableStreamClosed.catch(function () {
          /* Ignore the error */
        });
      }).then(function () {
        _this3.writer.close();

        _this3.writer.releaseLock();

        return _this3.write.closed;
      }).then(function () {
        _this3.port.close();

        _this3.state = 'close';
        _this3.reader = null;
        _this3.writer = null;
        _this3.port = null;

        _this3._runtime.emit(_this3._runtime.constructor.PERIPHERAL_DISCONNECTED);
      }).catch(function () {
        _this3.port.close();

        _this3.state = 'close';
        _this3.reader = null;
        _this3.writer = null;
        _this3.port = null;

        _this3._runtime.emit(_this3._runtime.constructor.PERIPHERAL_DISCONNECTED);
      });
    }
  }, {
    key: "isConnected",
    value: function isConnected() {
      return this.state === 'open';
    }
  }, {
    key: "sendCommand",
    value: function sendCommand(cmd) {
      var _this4 = this;

      var encoder = new TextEncoder();

      try {
        if (this.sendCompleted === false) {
          return;
        }

        this.sendCompleted = false;
        this.writer.write(encoder.encode(cmd + "\n")).then(function () {
          _this4.sendCompleted = true;
        });
      } catch (e) {
        console.log(e);
        return;
      }
    }
  }, {
    key: "receiveData",
    value: function receiveData() {
      var _this5 = this;

      return this.reader.read().then(function (val) {
        var value = val.value;
        var done = val.done;

        if (done) {
          console.log("Canceled");

          _this5.reader.releaseLock();
        } //console.log(value);


        return value;
      });
    }
  }, {
    key: "readSerialLoop",
    value: function readSerialLoop() {
      var _this6 = this;

      if (this.state === 'closing') {
        return;
      }

      var rs = new Promise(function (resolve, reject) {
        resolve(_this6.receiveData());
      });
      rs.then(function (result) {
        if (_this6.dataReceiving) window.clearTimeout(_this6.dataReceiving);
        _this6.dataReceiving = window.setTimeout(function () {}, 1000);

        if (_this6.state === 'closing') {
          return;
        }

        _this6.analyzeReceivedData(result);

        _this6.readSerialLoop();
      }).catch(function () {
        _this6.disconnect();
      });
      return;
    }
  }, {
    key: "analyzeReceivedData",
    value: function analyzeReceivedData(d) {
      //console.log(d);
      splitedData = d.split('=');

      if (splitedData[0] === '1') {
        sensing.brightness = splitedData[1];
      } else if (splitedData[0] === '2') {
        sensing.temperature = splitedData[1] * 0.0625;
      } else if (splitedData[0] === '3') {
        sensing.motion = splitedData[1];
      }
    }
  }, {
    key: "stopReceiving",
    value: function stopReceiving() {
      clearTimeout(this.dataReceiving);
      this.dataReceiving = null;
    }
  }, {
    key: "handleDisconnectError",
    value: function handleDisconnectError() {
      var _this7 = this;

      this.disconnect().then(function () {
        _this7._runtime.emit(_this7._runtime.constructor.PERIPHERAL_CONNECTION_LOST_ERROR, {
          message: "Scratch lost connection to",
          extensionId: _this7._extensionId
        });

        _this7.disconnect();
      });
    }
  }, {
    key: "_handleRequestError",
    value: function _handleRequestError() {
      this._runtime.emit(this._runtime.constructor.PERIPHERAL_REQUEST_ERROR, {
        message: "Scratch lost connection to",
        extensionId: this._extensionId
      });
    }
  }, {
    key: "onDisconnected",
    value: function onDisconnected() {
      this.handleDisconnectError(new Error('device disconnected'));
    }
  }]);

  return WebSerial;
}();

var blockClass = _myExtension.blockClass = TfabbitBlocks;
blockClass = _myExtension.blockClass = TfabbitBlocks;

export { _myExtension as __moduleExports, blockClass, entry };
