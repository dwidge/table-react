"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Table = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _lib = require("@dwidge/lib");

require("./Table.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var Table = function Table(_ref) {
  var name = _ref.name,
      schema = _ref.schema,
      defaults = _ref.defaults,
      rows = _ref.rows;
  var schemaA = Object.entries(schema);

  var _rows = _slicedToArray(rows, 2),
      rawrows = _rows[0],
      setrows = _rows[1];

  var _useState = (0, _react.useState)(),
      _useState2 = _slicedToArray(_useState, 2),
      idEdit = _useState2[0],
      setidEdit = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      confirm = _useState4[0],
      setconfirm = _useState4[1];

  var cleanup = function cleanup(row) {
    return schemaA.reduce(function (row, _ref2) {
      var _ref3 = _slicedToArray(_ref2, 2),
          key = _ref3[0],
          schem = _ref3[1];

      return _objectSpread(_objectSpread({}, row), {}, _defineProperty({}, key, schem.cleanup(row[key])));
    }, row);
  };

  var cleanrows = rawrows.map(cleanup);

  var setrow = function setrow(row) {
    return setrows((0, _lib.replaceItemById)(cleanrows, row));
  };

  var delrow = function delrow(id) {
    return setrows((0, _lib.dropItemById)(cleanrows, id));
  };

  var addrow = function addrow(row) {
    return setrows(cleanrows.concat([row]));
  };

  var newrow = function newrow() {
    return _objectSpread(_objectSpread({}, defaults), {}, {
      id: (0, _lib.uuid)()
    });
  };

  var onEdit = setidEdit;
  var onDel = delrow;

  var onSave = function onSave(row) {
    setrow(row);
    setidEdit();
  };

  var onCancel = function onCancel() {
    return setidEdit();
  };

  var onAdd = function onAdd() {
    return addrow(newrow());
  };

  var onClear = function onClear() {
    confirm && setrows([]);
    setconfirm(!confirm);
  };

  return /*#__PURE__*/_react["default"].createElement("div-page", null, /*#__PURE__*/_react["default"].createElement("table-table", {
    "data-testid": 'table' + name
  }, /*#__PURE__*/_react["default"].createElement("table-header", null, schemaA.map(function (_ref4) {
    var _ref5 = _slicedToArray(_ref4, 2),
        key = _ref5[0],
        schem = _ref5[1];

    return /*#__PURE__*/_react["default"].createElement("column-header", {
      key: key
    }, schem.name);
  })), cleanrows.map(function (row) {
    return function (key) {
      return key === idEdit ? /*#__PURE__*/_react["default"].createElement(RowEdit, {
        key: key,
        schema: schema,
        row: row,
        onSave: onSave,
        onCancel: onCancel
      }) : /*#__PURE__*/_react["default"].createElement(Row, {
        key: key,
        schema: schema,
        row: row,
        onEdit: onEdit,
        onDel: onDel
      });
    }(row.id);
  })), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: onAdd,
    "data-testid": "buttonAdd"
  }, "Add"), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: onClear,
    "data-testid": "buttonClear"
  }, confirm ? 'Confirm' : 'Clear'));
};

exports.Table = Table;
Table.propTypes = {
  name: _propTypes["default"].string.isRequired,
  schema: _propTypes["default"].object.isRequired,
  defaults: _propTypes["default"].object.isRequired,
  rows: _propTypes["default"].array.isRequired
};

var Row = function Row(_ref6) {
  var schema = _ref6.schema,
      row = _ref6.row,
      onEdit = _ref6.onEdit,
      onDel = _ref6.onDel;
  var id = row.id;
  return /*#__PURE__*/_react["default"].createElement("table-item", null, Object.entries(schema).map(function (_ref7) {
    var _ref8 = _slicedToArray(_ref7, 2),
        key = _ref8[0],
        schem = _ref8[1];

    return schem.row(row[key]);
  }), /*#__PURE__*/_react["default"].createElement("table-buttons", null, /*#__PURE__*/_react["default"].createElement("button", {
    onClick: function onClick() {
      return onEdit(id);
    },
    "data-testid": 'buttonEdit' + id
  }, "Edit"), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: function onClick() {
      return onDel(id);
    },
    "data-testid": 'buttonDel' + id
  }, "Del")));
};

Row.propTypes = {
  schema: _propTypes["default"].object.isRequired,
  row: _propTypes["default"].object.isRequired,
  onEdit: _propTypes["default"].func.isRequired,
  onDel: _propTypes["default"].func.isRequired
};

var RowEdit = function RowEdit(_ref9) {
  var schema = _ref9.schema,
      row = _ref9.row,
      onSave = _ref9.onSave,
      onCancel = _ref9.onCancel;

  var _useState5 = (0, _react.useState)(row),
      _useState6 = _slicedToArray(_useState5, 2),
      rowEdit = _useState6[0],
      setrowEdit = _useState6[1];

  return /*#__PURE__*/_react["default"].createElement("table-item", null, Object.entries(schema).map(function (_ref10) {
    var _ref11 = _slicedToArray(_ref10, 2),
        key = _ref11[0],
        schem = _ref11[1];

    return schem.edit(rowEdit[key], function (val) {
      return setrowEdit(_objectSpread(_objectSpread({}, rowEdit), {}, _defineProperty({}, key, val)));
    });
  }), /*#__PURE__*/_react["default"].createElement("table-buttons", null, /*#__PURE__*/_react["default"].createElement("button", {
    onClick: function onClick() {
      return onSave(rowEdit);
    },
    "data-testid": "buttonSave"
  }, "Save"), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: onCancel,
    "data-testid": "buttonCancel"
  }, "Cancel")));
};

RowEdit.propTypes = {
  schema: _propTypes["default"].object.isRequired,
  row: _propTypes["default"].object.isRequired,
  onSave: _propTypes["default"].func.isRequired,
  onCancel: _propTypes["default"].func.isRequired
};