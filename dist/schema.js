"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getItemBy = exports.ColumnText = exports.ColumnSet = exports.ColumnRef = exports.ColumnDate = exports.ColumnButton = void 0;

var _react = _interopRequireWildcard(require("react"));

var _libReact = require("@dwidge/lib-react");

var _lib = require("@dwidge/lib");

var _Button = _interopRequireDefault(require("react-bootstrap/Button"));

var _Form = _interopRequireDefault(require("react-bootstrap/Form"));

var _isMatch = _interopRequireDefault(require("date-fns/isMatch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var ColumnText = function ColumnText(name) {
  return {
    name: name,
    row: function row(value) {
      return /*#__PURE__*/_react.default.createElement("column-text", {
        key: name
      }, value);
    },
    edit: function edit(value, setvalue) {
      return /*#__PURE__*/_react.default.createElement("column-text", {
        key: name
      }, /*#__PURE__*/_react.default.createElement(_Form.default.Control, {
        style: {
          minWidth: '10em'
        },
        "data-testid": 'input' + name,
        value: value,
        onChange: (0, _libReact.onChange)(setvalue)
      }));
    },
    cleanup: function cleanup(value) {
      return value;
    }
  };
};

exports.ColumnText = ColumnText;

var ColumnDate = function ColumnDate(name) {
  return {
    name: name,
    valid: function valid(value) {
      return (0, _isMatch.default)(value, 'yyyy/MM/dd');
    },
    row: function row(value) {
      return /*#__PURE__*/_react.default.createElement("column-text", {
        key: name
      }, value);
    },
    edit: function edit(value, setvalue) {
      return /*#__PURE__*/_react.default.createElement("column-text", {
        key: name
      }, /*#__PURE__*/_react.default.createElement(_Form.default.Control, {
        "data-testid": 'input' + name,
        style: this.valid(value) ? {
          minWidth: '10em'
        } : {
          borderColor: 'red',
          minWidth: '10em'
        },
        value: value,
        onChange: (0, _libReact.onChange)(function (v) {
          return setvalue(v);
        })
      }));
    },
    cleanup: function cleanup(value) {
      return value;
    }
  };
};

exports.ColumnDate = ColumnDate;

var ColumnSet = function ColumnSet(name, all, toString) {
  return {
    name: name,
    row: function row(value) {
      return /*#__PURE__*/_react.default.createElement("column-set", {
        key: name
      }, value.length ? value.map(function (id) {
        return (0, _lib.getItemById)(all, id);
      }).map(function (entry) {
        return /*#__PURE__*/_react.default.createElement("div", {
          key: entry.id
        }, toString(entry));
      }) : '-');
    },
    edit: function edit(value, setvalue) {
      return /*#__PURE__*/_react.default.createElement("column-set", {
        key: name
      }, all.map(function (entry) {
        return function (id) {
          return /*#__PURE__*/_react.default.createElement("div", {
            key: id
          }, /*#__PURE__*/_react.default.createElement("input", {
            "data-testid": 'input' + name + id,
            type: "checkbox",
            checked: value.includes(id),
            onChange: (0, _libReact.onChangeChecks)(id, value, setvalue)
          }), " ", toString(entry));
        }(entry.id);
      }));
    },
    cleanup: function cleanup(value) {
      return value.filter(function (id) {
        return (0, _lib.getItemById)(all, id);
      });
    }
  };
};

exports.ColumnSet = ColumnSet;

var getItemBy = function getItemBy(a, v) {
  var k = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'id';
  return a.find(function (o) {
    return o[k] === v;
  });
};

exports.getItemBy = getItemBy;

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
      return /*#__PURE__*/_react.default.createElement("column-text", {
        key: name
      }, this.lookup(value, colDisplay) || '-');
    },
    edit: function edit(value, setvalue) {
      var _this = this;

      var _useState = (0, _react.useState)(value),
          _useState2 = _slicedToArray(_useState, 2),
          ref = _useState2[0],
          setref = _useState2[1];

      var _useState3 = (0, _react.useState)(this.lookup(value) || ''),
          _useState4 = _slicedToArray(_useState3, 2),
          view = _useState4[0],
          setview = _useState4[1];

      var onref = function onref(v) {
        setref(v);

        var newview = _this.lookup(v);

        if (newview) {
          setview(newview);
          setvalue(v);
        }
      };

      var onview = function onview(v) {
        setview(v);

        var newref = _this.rlookup(v);

        if (newref) {
          setref(newref);
          setvalue(newref);
        }
      };

      return /*#__PURE__*/_react.default.createElement("column-text", {
        key: name
      }, /*#__PURE__*/_react.default.createElement("div", null, colRef), /*#__PURE__*/_react.default.createElement(_Form.default.Control, {
        "data-testid": 'input' + name,
        style: this.lookup(ref) ? {
          minWidth: '10em'
        } : {
          minWidth: '10em',
          borderColor: 'red'
        },
        value: ref || '',
        onChange: (0, _libReact.onChange)(onref)
      }), /*#__PURE__*/_react.default.createElement("div", null, colView), /*#__PURE__*/_react.default.createElement(_Form.default.Control, {
        "data-testid": 'inputView' + name,
        style: this.rlookup(view) ? {
          minWidth: '10em'
        } : {
          minWidth: '10em',
          borderColor: 'red'
        },
        value: view || '',
        onChange: (0, _libReact.onChange)(onview)
      }));
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

var ColumnButton = function ColumnButton(name, _onClick, toString) {
  return {
    name: name,
    row: function row(value, _row) {
      return /*#__PURE__*/_react.default.createElement("table-buttons", {
        key: name
      }, /*#__PURE__*/_react.default.createElement(_Button.default, {
        "data-testid": 'button' + name + _row.id,
        onClick: function onClick() {
          return _onClick(value, _row);
        }
      }, toString(value, _row)));
    },
    edit: function edit(value, setvalue, row) {
      return this.row(value, row);
    },
    cleanup: function cleanup(value) {
      return value;
    }
  };
};

exports.ColumnButton = ColumnButton;