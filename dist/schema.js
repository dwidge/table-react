"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ColumnText = exports.ColumnSet = void 0;

var _react = _interopRequireDefault(require("react"));

var _libReact = require("@dwidge/lib-react");

var _lib = require("@dwidge/lib");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ColumnText = function ColumnText(name) {
  return {
    name: name,
    row: function row(value) {
      return /*#__PURE__*/_react["default"].createElement("column-text", {
        key: name
      }, value);
    },
    edit: function edit(value, setvalue) {
      return /*#__PURE__*/_react["default"].createElement("column-text", {
        key: name
      }, /*#__PURE__*/_react["default"].createElement("input", {
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

var ColumnSet = function ColumnSet(name, all, toString) {
  return {
    name: name,
    row: function row(value) {
      return /*#__PURE__*/_react["default"].createElement("column-set", {
        key: name
      }, value.map(function (id) {
        return (0, _lib.getItemById)(all, id);
      }).map(function (entry) {
        return /*#__PURE__*/_react["default"].createElement("div", {
          key: entry.id
        }, toString(entry));
      }));
    },
    edit: function edit(value, setvalue) {
      return /*#__PURE__*/_react["default"].createElement("column-set", {
        key: name
      }, all.map(function (entry) {
        return function (id) {
          return /*#__PURE__*/_react["default"].createElement("div", {
            key: id
          }, /*#__PURE__*/_react["default"].createElement("input", {
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