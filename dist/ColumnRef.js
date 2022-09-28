"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getItemBy = exports.ColumnRef = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Form = _interopRequireDefault(require("react-bootstrap/Form"));

var _reactBootstrapTypeahead = require("react-bootstrap-typeahead");

var _sort = require("./sort");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var getItemBy = function getItemBy(a, v) {
  var k = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'id';
  return a.find(function (o) {
    return o[k] === v;
  });
};

exports.getItemBy = getItemBy;

var se = function se(x) {
  var f = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var t = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '' + x;
  return x == null || x === '' ? f : t;
};

var ColumnRef = function ColumnRef(name, _ref) {
  var all = _ref.all,
      _ref$colRef = _ref.colRef,
      colRef = _ref$colRef === void 0 ? 'id' : _ref$colRef,
      _ref$colView = _ref.colView,
      colView = _ref$colView === void 0 ? 'name' : _ref$colView,
      _ref$colDisplay = _ref.colDisplay,
      colDisplay = _ref$colDisplay === void 0 ? colView : _ref$colDisplay;
  return {
    name: name,
    valid: function valid(value) {
      return !value || !!this.lookup(value);
    },
    row: function row(value) {
      var display = this.lookup(value, colDisplay);
      return /*#__PURE__*/_react.default.createElement("column-text", {
        key: name
      }, se(display, '-'));
    },
    sort: function sort(a, b) {
      return (0, _sort.sortAny)(this.lookup(a, colDisplay), this.lookup(b, colDisplay));
    },
    edit: function edit(ref, setref) {
      var _this = this;

      var _useState = (0, _react.useState)(se(this.lookup(ref))),
          _useState2 = _slicedToArray(_useState, 2),
          view = _useState2[0],
          setview = _useState2[1];

      (0, _react.useEffect)(function () {
        setview(se(_this.lookup(ref)));
      }, [all]);

      var onref = function onref(v) {
        setref(v);
        setview(se(_this.lookup(v)));
      };

      var onview = function onview(v) {
        setview(v);
        setref(se(_this.rlookup(v)));
      };

      var _ref2 = [se(ref, [], ['' + ref]), function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 1),
            s = _ref4[0];

        return onref(se(s));
      }],
          refTa = _ref2[0],
          refTaSet = _ref2[1];
      var refOptions = all.map(function (v) {
        return se(v[colRef]);
      });
      var _ref5 = [se(view, [], ['' + view]), function (_ref6) {
        var _ref7 = _slicedToArray(_ref6, 1),
            s = _ref7[0];

        return onview(se(s));
      }],
          viewTa = _ref5[0],
          viewTaSet = _ref5[1];
      var viewOptions = all.map(function (v) {
        return se(v[colView]);
      });
      return /*#__PURE__*/_react.default.createElement("column-text", {
        key: name
      }, /*#__PURE__*/_react.default.createElement(_Form.default.Group, null, /*#__PURE__*/_react.default.createElement(_Form.default.Label, null, colRef), /*#__PURE__*/_react.default.createElement(_reactBootstrapTypeahead.Typeahead, {
        id: 'input' + name,
        inputProps: {
          'data-testid': 'input' + name
        },
        style: this.lookup(ref) ? {
          minWidth: '10em'
        } : {
          minWidth: '10em',
          borderColor: 'red'
        },
        onChange: refTaSet,
        options: refOptions,
        placeholder: "Choose...",
        selected: refTa
      })), /*#__PURE__*/_react.default.createElement(_Form.default.Group, null, /*#__PURE__*/_react.default.createElement(_Form.default.Label, null, colView), /*#__PURE__*/_react.default.createElement(_reactBootstrapTypeahead.Typeahead, {
        id: 'inputView' + name,
        inputProps: {
          'data-testid': 'inputView' + name
        },
        style: this.rlookup(view) ? {
          minWidth: '10em'
        } : {
          minWidth: '10em',
          borderColor: 'red'
        },
        onChange: viewTaSet,
        options: viewOptions,
        placeholder: "Choose...",
        selected: viewTa
      })));
    },
    cleanup: function cleanup(value) {
      return value;
    },
    lookup: function lookup(value) {
      var col = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : colView;
      var item = getItemBy(all, value, colRef) || getItemBy(all, +value, colRef) || {};
      return item[col];
    },
    rlookup: function rlookup(value) {
      var item = getItemBy(all, value, colView) || getItemBy(all, +value, colView) || {};
      return item[colRef];
    }
  };
};

exports.ColumnRef = ColumnRef;