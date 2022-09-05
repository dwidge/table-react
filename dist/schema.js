"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ColumnText = exports.ColumnSet = exports.ColumnDate = exports.ColumnButton = void 0;

var _react = _interopRequireDefault(require("react"));

var _libReact = require("@dwidge/lib-react");

var _lib = require("@dwidge/lib");

var _Button = _interopRequireDefault(require("react-bootstrap/Button"));

var _Form = _interopRequireDefault(require("react-bootstrap/Form"));

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