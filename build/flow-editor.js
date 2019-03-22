(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["FlowEditor"] = factory();
	else
		root["FlowEditor"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/uuid/index.js":
/*!************************************!*\
  !*** ./node_modules/uuid/index.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var v1 = __webpack_require__(/*! ./v1 */ "./node_modules/uuid/v1.js");
var v4 = __webpack_require__(/*! ./v4 */ "./node_modules/uuid/v4.js");

var uuid = v4;
uuid.v1 = v1;
uuid.v4 = v4;

module.exports = uuid;


/***/ }),

/***/ "./node_modules/uuid/lib/bytesToUuid.js":
/*!**********************************************!*\
  !*** ./node_modules/uuid/lib/bytesToUuid.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substr(1);
}

function bytesToUuid(buf, offset) {
  var i = offset || 0;
  var bth = byteToHex;
  // join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4
  return ([bth[buf[i++]], bth[buf[i++]], 
	bth[buf[i++]], bth[buf[i++]], '-',
	bth[buf[i++]], bth[buf[i++]], '-',
	bth[buf[i++]], bth[buf[i++]], '-',
	bth[buf[i++]], bth[buf[i++]], '-',
	bth[buf[i++]], bth[buf[i++]],
	bth[buf[i++]], bth[buf[i++]],
	bth[buf[i++]], bth[buf[i++]]]).join('');
}

module.exports = bytesToUuid;


/***/ }),

/***/ "./node_modules/uuid/lib/rng-browser.js":
/*!**********************************************!*\
  !*** ./node_modules/uuid/lib/rng-browser.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Unique ID creation requires a high quality random # generator.  In the
// browser this is a little complicated due to unknown quality of Math.random()
// and inconsistent support for the `crypto` API.  We do the best we can via
// feature-detection

// getRandomValues needs to be invoked in a context where "this" is a Crypto
// implementation. Also, find the complete implementation of crypto on IE11.
var getRandomValues = (typeof(crypto) != 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto)) ||
                      (typeof(msCrypto) != 'undefined' && typeof window.msCrypto.getRandomValues == 'function' && msCrypto.getRandomValues.bind(msCrypto));

if (getRandomValues) {
  // WHATWG crypto RNG - http://wiki.whatwg.org/wiki/Crypto
  var rnds8 = new Uint8Array(16); // eslint-disable-line no-undef

  module.exports = function whatwgRNG() {
    getRandomValues(rnds8);
    return rnds8;
  };
} else {
  // Math.random()-based (RNG)
  //
  // If all else fails, use Math.random().  It's fast, but is of unspecified
  // quality.
  var rnds = new Array(16);

  module.exports = function mathRNG() {
    for (var i = 0, r; i < 16; i++) {
      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
      rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
    }

    return rnds;
  };
}


/***/ }),

/***/ "./node_modules/uuid/v1.js":
/*!*********************************!*\
  !*** ./node_modules/uuid/v1.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var rng = __webpack_require__(/*! ./lib/rng */ "./node_modules/uuid/lib/rng-browser.js");
var bytesToUuid = __webpack_require__(/*! ./lib/bytesToUuid */ "./node_modules/uuid/lib/bytesToUuid.js");

// **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html

var _nodeId;
var _clockseq;

// Previous uuid creation time
var _lastMSecs = 0;
var _lastNSecs = 0;

// See https://github.com/broofa/node-uuid for API details
function v1(options, buf, offset) {
  var i = buf && offset || 0;
  var b = buf || [];

  options = options || {};
  var node = options.node || _nodeId;
  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq;

  // node and clockseq need to be initialized to random values if they're not
  // specified.  We do this lazily to minimize issues related to insufficient
  // system entropy.  See #189
  if (node == null || clockseq == null) {
    var seedBytes = rng();
    if (node == null) {
      // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
      node = _nodeId = [
        seedBytes[0] | 0x01,
        seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]
      ];
    }
    if (clockseq == null) {
      // Per 4.2.2, randomize (14 bit) clockseq
      clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;
    }
  }

  // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
  var msecs = options.msecs !== undefined ? options.msecs : new Date().getTime();

  // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock
  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1;

  // Time since last uuid creation (in msecs)
  var dt = (msecs - _lastMSecs) + (nsecs - _lastNSecs)/10000;

  // Per 4.2.1.2, Bump clockseq on clock regression
  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  }

  // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval
  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  }

  // Per 4.2.1.2 Throw error if too many uuids are requested
  if (nsecs >= 10000) {
    throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
  }

  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq;

  // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
  msecs += 12219292800000;

  // `time_low`
  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff;

  // `time_mid`
  var tmh = (msecs / 0x100000000 * 10000) & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff;

  // `time_high_and_version`
  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
  b[i++] = tmh >>> 16 & 0xff;

  // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
  b[i++] = clockseq >>> 8 | 0x80;

  // `clock_seq_low`
  b[i++] = clockseq & 0xff;

  // `node`
  for (var n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }

  return buf ? buf : bytesToUuid(b);
}

module.exports = v1;


/***/ }),

/***/ "./node_modules/uuid/v4.js":
/*!*********************************!*\
  !*** ./node_modules/uuid/v4.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var rng = __webpack_require__(/*! ./lib/rng */ "./node_modules/uuid/lib/rng-browser.js");
var bytesToUuid = __webpack_require__(/*! ./lib/bytesToUuid */ "./node_modules/uuid/lib/bytesToUuid.js");

function v4(options, buf, offset) {
  var i = buf && offset || 0;

  if (typeof(options) == 'string') {
    buf = options === 'binary' ? new Array(16) : null;
    options = null;
  }
  options = options || {};

  var rnds = options.random || (options.rng || rng)();

  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
  rnds[6] = (rnds[6] & 0x0f) | 0x40;
  rnds[8] = (rnds[8] & 0x3f) | 0x80;

  // Copy bytes to buffer, if provided
  if (buf) {
    for (var ii = 0; ii < 16; ++ii) {
      buf[i + ii] = rnds[ii];
    }
  }

  return buf || bytesToUuid(rnds);
}

module.exports = v4;


/***/ }),

/***/ "./src/editor.js":
/*!***********************!*\
  !*** ./src/editor.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Editor; });
/* harmony import */ var _node__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node */ "./src/node.js");
/* harmony import */ var _interface__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./interface */ "./src/interface.js");
/* harmony import */ var _eventBase__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./eventBase */ "./src/eventBase.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./util */ "./src/util.js");




const jsPlumb = window.jsPlumb
class Editor extends _eventBase__WEBPACK_IMPORTED_MODULE_2__["default"] {
    /**
     *
     * @param {object} params
     * @param {string} params.container
     * @param {string} params.dragClass
     */
    constructor(params) {
        super()

        /** @type {Array.<HTMLElement>} */
        this.dragElements = []
        this.dragClass = params.dragClass

        /** @type {Array.<Node>} */
        this.nodes = []

        this.interfaces = {
            start: new _interface__WEBPACK_IMPORTED_MODULE_1__["default"]({
                input: [],
                output: "id",
            }),
            middle: new _interface__WEBPACK_IMPORTED_MODULE_1__["default"]({
                input: ["id"],
                output: "id",
            }),
            end: new _interface__WEBPACK_IMPORTED_MODULE_1__["default"]({
                input: ["id"],
                output: "",
            }),
        }

        jsPlumb.ready(() => {
            this.container = document.getElementById(params.container)
            this.init()
        })
    }
    init() {
        this.initDragElement()
        this.initJsplumb()
    }

    initDragElement() {
        this.dragElements = Array.from(
            document.querySelectorAll(`.${this.dragClass}`)
        )
        this.dragElements.forEach(el => {
            el.draggable = true
            el.addEventListener("dragstart", ev => {
                ev.dataTransfer.setData("text/plain", el.dataset.type)
            })
        })
        this.container.addEventListener("drop", e => {
            /** node interface */
            const type = e.dataTransfer.getData("text/plain")

            /** node position */
            const { layerX, layerY } = e

            this.addNode({
                interface: type,
                position: {
                    x: layerX,
                    y: layerY,
                },
            })
        })
        this.container.addEventListener("dragover", e => {
            e.preventDefault()
        })
    }

    initJsplumb() {
        jsPlumb.setContainer(this.container)
        jsPlumb.bind("connection", function(info) {
            const { connection } = info
            const { source, target } = connection.getParameters()

            /** @type {Node} */
            const sourceNode = source.node

            /** @type {Node} */
            const targetNode = target.node

            sourceNode.addSuccessors(targetNode.uuid)
            targetNode.addAncestors(sourceNode.uuid)
        })

        jsPlumb.bind("beforeDrop", function(info, _) {
            const [source] = info.connection.endpoints
            const target = info.dropEndpoint
            return _util__WEBPACK_IMPORTED_MODULE_3__["notEq"](
                _util__WEBPACK_IMPORTED_MODULE_3__["pipe"](
                    _util__WEBPACK_IMPORTED_MODULE_3__["prop"]("source"),
                    _util__WEBPACK_IMPORTED_MODULE_3__["prop"]("node")
                )(source.getParameters()),
                _util__WEBPACK_IMPORTED_MODULE_3__["pipe"](
                    _util__WEBPACK_IMPORTED_MODULE_3__["prop"]("target"),
                    _util__WEBPACK_IMPORTED_MODULE_3__["prop"]("node")
                )(target.getParameters())
            )
        })

        // disable default contextmenu
        this.container.addEventListener("contextmenu", e => e.preventDefault())
        jsPlumb.bind("contextmenu", function(component) {
            console.log(component)
        })
    }

    registerNodeEvent(node) {
        ;["contextmenu", "click", "dblclick"].forEach(eventName => {
            node.on(
                eventName,
                (params, event) => this.emit(eventName, params, event),
                this
            )
        })
    }
    /**
     *
     * @param {object} params
     * @param {string} params.interface
     * @param {object} params.position
     * @param {number} params.position.x
     * @param {number} params.position.y
     */
    addNode(params) {
        params = Object.assign(
            {
                interface: "middle",
                container: this.container,
            },
            params
        )
        const node = new _node__WEBPACK_IMPORTED_MODULE_0__["default"]({
            interface: this.interfaces[params.interface],
            container: this.container,
            className: "item",
            position: params.position || { x: 0, y: 0 },
        })
        this.nodes.push(node)
        this.registerNodeEvent(node)
        return node
    }
}


/***/ }),

/***/ "./src/eventBase.js":
/*!**************************!*\
  !*** ./src/eventBase.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EventBase; });
class EventBase {
    constructor() {
        /** @type {Object.<string, Array.<{handler: function, context: any}>>} */
        this.eventHandler = {}
    }

    /**
     * @param {string} event
     * @param {function} handler
     * @param {object} context
     */
    on(event, handler, context) {
        ;(this.eventHandler[event] || (this.eventHandler[event] = [])).push({
            handler,
            context,
        })
    }

    /**
     * @param {string} event
     * @param {*} params
     * @param {Event} originalEvent
     */
    emit(event, params, originalEvent) {
        const handlers = this.eventHandler[event] || []
        handlers.forEach(({ handler, context }) => {
            handler.call(context, params, originalEvent)
        })
    }
}


/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: Editor, Node, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node */ "./src/node.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Node", function() { return _node__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./editor */ "./src/editor.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Editor", function() { return _editor__WEBPACK_IMPORTED_MODULE_1__["default"]; });




/* harmony default export */ __webpack_exports__["default"] = (_editor__WEBPACK_IMPORTED_MODULE_1__["default"]);


/***/ }),

/***/ "./src/interface.js":
/*!**************************!*\
  !*** ./src/interface.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Interface; });
/**
 * @typedef {object} Type
 * @property {string} name
 * @property {boolean} required
 */

/**
 * @type {Array.<Type>}
 */
const TYPES = [
    {
        name: "id",
        required: false,
    },
]
class Interface {
    /**
     *
     * @param {object} [params]
     * @param {string[]} params.input
     * @param {string} params.output
     */
    constructor(params) {
        const newParams = Object.assign(
            {
                input: ["id"],
                output: "id",
            },
            params
        )
        this.input = newParams.input
        this.output = newParams.output
    }

    getInputTypes() {
        return this.input.map(input => TYPES.find(it => it.name === input))
    }

    getOutputType() {
        return TYPES.find(it => it.name === this.output)
    }

    /**
     * @param {string[]} input
     */
    setInput(input) {
        this.input = input
    }

    /**
     * @param {string} output
     */
    setOutput(output) {
        this.output = output
    }
}
Interface.defineType =
    /**
     * @param {Type} type
     */
    function(type) {
        let oldIndex = TYPES.findIndex(it => Interface.isSameType(type, it))
        if (oldIndex !== -1) {
            console.warn(`类型[${type.name}]被覆盖`)
            TYPES.splice(oldIndex, 1)
        }
        TYPES.push(type)
    }

Interface.validate =
    /**
     * @param {Type} output
     * @param {Type} input
     */
    function(output, input) {
        return output.name === input.name
    }

Interface.isSameType =
    /**
     *
     * @param {Type} type1
     * @param {Type} type2
     */
    function(type1, type2) {
        return type1.name === type2.name
    }


/***/ }),

/***/ "./src/node.js":
/*!*********************!*\
  !*** ./src/node.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Node; });
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/index.js");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(uuid__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _interface__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./interface */ "./src/interface.js");
/* harmony import */ var _eventBase__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./eventBase */ "./src/eventBase.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./util */ "./src/util.js");




const jsPlumb = window.jsPlumb
class Node extends _eventBase__WEBPACK_IMPORTED_MODULE_2__["default"] {
    /**
     * @param {object} params
     * @param {Element} params.container
     * @param {string} [params.uuid]
     * @param {Interface} params.interface
     * @param {String[]} [params.ancestors]
     * @param {String[]} [params.successors]
     * @param {string} [params.className]
     * @param {object} [params.parameters]
     * @param {object} [params.parameters]
     * @param {object} params.position
     * @param {number} params.position.x
     * @param {number} params.position.y
     */
    constructor(params) {
        super()

        this.uuid = params.uuid || Object(uuid__WEBPACK_IMPORTED_MODULE_0__["v1"])()
        this.container = params.container

        const element = document.createElement("div")
        element.setAttribute("id", this.uuid)
        element.setAttribute("class", params.className)
        ;["contextmenu", "click", "dblclick"].forEach(eventName => {
            element.addEventListener(eventName, e =>
                this.emit(eventName, this, e)
            )
        })
        params.container.appendChild(element)
        const { width, height } = element.getBoundingClientRect()
        element.style.left = `${params.position.x - width / 2}px`
        element.style.top = `${params.position.y - height / 2}px`

        this.interface = params.interface || new _interface__WEBPACK_IMPORTED_MODULE_1__["default"]()
        /** @type {String[]} */
        this.ancestors = params.ancestors || []
        /** @type {String[]} */
        this.successors = params.successors || []

        const isTarget = params.interface.input.length > 0
        const isSource = !!params.interface.output
        const defaultColor = "#456"
        const activeColor = "#1890ff"
        const common = {
            endpoint: "Dot",
            paintStyle: {
                fill: defaultColor,
                strokeStyle: defaultColor,
                radius: 6,
            },
            hoverPaintStyle: {
                fill: activeColor,
                strokeStyle: activeColor,
            },
            connectorStyle: {
                outlineStroke: defaultColor,
                strokeStyle: defaultColor,
                strokeWidth: 0.5,
            },
            connectorHoverStyle: {
                outlineStroke: activeColor,
                strokeStyle: activeColor,
                strokeWidth: 1,
            },
            connector: [
                "Flowchart",
                { gap: 6, cornerRadius: 5, alwaysRespectStubs: true },
            ],
            connectorOverlays: [
                [
                    "Arrow",
                    {
                        width: 12,
                        length: 12,
                        location: 1,
                        paintStyle: {
                            fill: defaultColor,
                        },
                    },
                ],
            ],
        }
        if (isTarget) {
            params.interface.input.forEach(type => {
                jsPlumb.addEndpoint(
                    element,
                    {
                        isTarget: true,
                        isSource: false,
                        anchor: "Top",
                        maxConnections: -1,
                        parameters: {
                            target: {
                                node: this,
                                type,
                                input: true,
                                output: false,
                            },
                        },
                    },
                    // @ts-ignore
                    common
                )
            })
        }
        if (isSource) {
            jsPlumb.addEndpoint(
                element,
                {
                    isSource: true,
                    isTarget: false,
                    anchor: "Bottom",
                    maxConnections: -1,
                    parameters: {
                        source: {
                            node: this,
                            type: params.interface.output,
                            input: false,
                            output: true,
                        },
                    },
                },
                // @ts-ignore
                common
            )
        }
        jsPlumb.draggable(element)
    }

    /**
     * @param {string} uuid
     */
    addAncestors(uuid) {
        this.ancestors.push(uuid)
    }

    /**
     * @param {string} uuid
     */
    removeAncestors(uuid) {
        this.ancestors = this.ancestors.filter(_util__WEBPACK_IMPORTED_MODULE_3__["eq"](uuid))
    }

    /**
     * @param {string} uuid
     */
    addSuccessors(uuid) {
        this.successors.push(uuid)
    }

    /**
     * @param {string} uuid
     */
    removeSuccessors(uuid) {
        this.successors = this.successors.filter(_util__WEBPACK_IMPORTED_MODULE_3__["eq"](uuid))
    }
}

Node.isSame = _util__WEBPACK_IMPORTED_MODULE_3__["compose"](
    _util__WEBPACK_IMPORTED_MODULE_3__["spread"](_util__WEBPACK_IMPORTED_MODULE_3__["eq"]),
    _util__WEBPACK_IMPORTED_MODULE_3__["map"](_util__WEBPACK_IMPORTED_MODULE_3__["prop"]("uuid")),
    _util__WEBPACK_IMPORTED_MODULE_3__["together"]
)


/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/*! exports provided: partial, curryN, curry, compose, pipe, unary, isNil, id, eq, not, notEq, map, prop, spread, ifElse, T, F, together, tap, debug */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "partial", function() { return partial; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "curryN", function() { return curryN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "curry", function() { return curry; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "compose", function() { return compose; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pipe", function() { return pipe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unary", function() { return unary; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isNil", function() { return isNil; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "id", function() { return id; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "eq", function() { return eq; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "not", function() { return not; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "notEq", function() { return notEq; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "map", function() { return map; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "prop", function() { return prop; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spread", function() { return spread; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ifElse", function() { return ifElse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "T", function() { return T; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "F", function() { return F; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "together", function() { return together; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tap", function() { return tap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "debug", function() { return debug; });
/**
 * @param {function} fn
 * @param {array} args
 */
const partial = (fn, args) => {
    return function() {
        return fn.apply(null, args.concat(Array.from(arguments)))
    }
}

/**
 * curryN.
 * @param {function} fn
 * @param {number} n
 */
const curryN = (fn, n) => {
    return function() {
        let args = Array.from(arguments)
        if (n <= args.length) {
            return fn.apply(null, args)
        }
        return curryN(partial(fn, args), n - args.length)
    }
}

/**
 * curry.
 * @param {function} fn
 */
const curry = fn => curryN(fn, fn.length)

/**
 * compose.
 */
const compose = function(...fns) {
    return function() {
        let index = fns.length - 1
        let result = fns[index--].apply(null, arguments)
        while (index >= 0) {
            result = fns[index--].call(null, result)
        }
        return result
    }
}

/**
 * @param  {...function} fns
 */
const pipe = (...fns) => compose(...fns.reverse())

const unary = fn => (...args) => fn(args[0])

const isNil = a => a === undefined || a === null

const id = a => a

const _eq = (a, b) => a === b
const eq = curry(_eq)

const _not = a => !a
const not = curry(_not)

const _notEq = compose(
    not,
    eq
)
const notEq = curry(_notEq)

const _map = (fn, arr) => arr.map(unary(fn))
const map = curry(_map)

const _prop = (propName, obj) => {
    return obj[propName]
}
const prop = curry(_prop)

const _spread = (fn, arr) => fn(...arr)
const spread = curry(_spread)

const ifElse = (check, trueHandler, falseHandler, ...args) =>
    check(...args) ? trueHandler(...args) : falseHandler(...args)

const T = () => true

const F = () => false

const together = (...args) => args

const _tap = (fn, a) => {
    fn(a)
    return a
}
const tap = curry(_tap)

const debug = curry(tap)(console.log)


/***/ })

/******/ });
});
//# sourceMappingURL=flow-editor.js.map