"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ColumnText = exports.ColumnSet = exports.ColumnRef = exports.ColumnDate = void 0;

var _react = _interopRequireDefault(require("react"));

var _libReact = require("@dwidge/lib-react");

var _lib = require("@dwidge/lib");

var _isMatch = _interopRequireDefault(require("date-fns/isMatch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
      }, /*#__PURE__*/_react.default.createElement("input", {
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
      }, /*#__PURE__*/_react.default.createElement("input", {
        "data-testid": 'input' + name,
        style: this.valid(value) ? {} : {
          background: 'red'
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

var ColumnRef = function ColumnRef(name, all, toString) {
  return {
    name: name,
    valid: function valid(value) {
      return !value || !!(0, _lib.getItemById)(all, value) || !!(0, _lib.getItemById)(all, +value);
    },
    row: function row(value) {
      var item = (0, _lib.getItemById)(all, +value);
      return /*#__PURE__*/_react.default.createElement("column-text", {
        key: name
      }, item ? toString(item) : '-');
    },
    edit: function edit(value, setvalue) {
      return /*#__PURE__*/_react.default.createElement("column-text", {
        key: name
      }, /*#__PURE__*/_react.default.createElement("input", {
        "data-testid": 'input' + name,
        style: this.valid(value) ? {} : {
          background: 'red'
        },
        value: value || '',
        onChange: (0, _libReact.onChange)(setvalue)
      }));
    },
    cleanup: function cleanup(value) {
      return value;
    }
  };
};

exports.ColumnRef = ColumnRef;