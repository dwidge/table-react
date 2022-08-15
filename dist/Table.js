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

var _ImportFile = require("./ImportFile");

var _ExportFile = require("./ExportFile");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

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
      newRow = _ref.newRow,
      rows = _ref.rows,
      _ref$pageLength = _ref.pageLength,
      pageLength = _ref$pageLength === void 0 ? 100 : _ref$pageLength,
      _ref$inlineHeaders = _ref.inlineHeaders,
      inlineHeaders = _ref$inlineHeaders === void 0 ? false : _ref$inlineHeaders,
      _ref$inlineHeadersEdi = _ref.inlineHeadersEdit,
      inlineHeadersEdit = _ref$inlineHeadersEdi === void 0 ? false : _ref$inlineHeadersEdi,
      _ref$addDel = _ref.addDel,
      addDel = _ref$addDel === void 0 ? true : _ref$addDel,
      _ref$enable = _ref.enable,
      enable = _ref$enable === void 0 ? {
    importCSV: false,
    exportCSV: false
  } : _ref$enable;
  var schemaA = Object.entries(schema);

  var _rows = _slicedToArray(rows, 2),
      rawrows = _rows[0],
      setrows = _rows[1];

  var _useState = (0, _react.useState)(0),
      _useState2 = _slicedToArray(_useState, 2),
      idEdit = _useState2[0],
      setidEdit = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      confirm = _useState4[0],
      setconfirm = _useState4[1];

  var _useState5 = (0, _react.useState)(0),
      _useState6 = _slicedToArray(_useState5, 2),
      page = _useState6[0],
      setpage = _useState6[1];

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

  var pages = Math.max(1, Math.ceil(cleanrows.length / pageLength));

  if (page >= pages) {
    setpage(pages - 1);
  }

  if (page < 0) {
    setpage(0);
  }

  var onPrev = function onPrev() {
    if (page > 0) {
      setpage(page - 1);
    }
  };

  var onNext = function onNext() {
    if (page < pages - 1) {
      setpage(page + 1);
    }
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
    var row = newRow();
    addrow(row);
    setidEdit(row.id);
  };

  var onClear = function onClear() {
    confirm && setrows([]);
    setconfirm(!confirm);
  };

  return /*#__PURE__*/_react.default.createElement("div-page", {
    "data-testid": 'table' + name
  }, /*#__PURE__*/_react.default.createElement("table-table", null, !inlineHeaders && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("table-header", null, schemaA.map(function (_ref4) {
    var _ref5 = _slicedToArray(_ref4, 2),
        key = _ref5[0],
        schem = _ref5[1];

    return /*#__PURE__*/_react.default.createElement("column-header", {
      key: key
    }, schem.name);
  }))), cleanrows.slice(page * pageLength, (page + 1) * pageLength).map(function (row) {
    return function (key) {
      return key === idEdit ? /*#__PURE__*/_react.default.createElement(RowEdit, {
        key: key,
        schema: schema,
        row: row,
        inlineHeadersEdit: inlineHeadersEdit,
        onSave: onSave,
        onCancel: onCancel
      }) : /*#__PURE__*/_react.default.createElement(Row, {
        key: key,
        schema: schema,
        row: row,
        inlineHeaders: inlineHeaders,
        addDel: addDel,
        onEdit: onEdit,
        onDel: onDel
      });
    }(row.id);
  })), pages > 1 && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("p", null, page * pageLength + 1, " - ", Math.min(cleanrows.length, (page + 1) * pageLength), " of ", cleanrows.length), /*#__PURE__*/_react.default.createElement("button", {
    onClick: onPrev,
    "data-testid": "buttonPrev"
  }, "Prev"), /*#__PURE__*/_react.default.createElement("button", {
    onClick: onNext,
    "data-testid": "buttonNext"
  }, "Next")), addDel && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("button", {
    onClick: onAdd,
    "data-testid": "buttonAdd"
  }, "Add"), /*#__PURE__*/_react.default.createElement("button", {
    onClick: onClear,
    "data-testid": "buttonClear"
  }, confirm ? 'Confirm' : 'Clear')), enable.importCSV ? /*#__PURE__*/_react.default.createElement(_ImportFile.ImportFile, {
    ext: ".csv",
    onAccept: function onAccept(text) {
      return setrows(cleanrows.concat.apply(cleanrows, _toConsumableArray((0, _lib.calcObjectsFromCsv)(text))));
    }
  }) : '', enable.exportCSV ? /*#__PURE__*/_react.default.createElement(_ExportFile.ExportFile, {
    ext: ".csv",
    name: name + '.csv',
    content: (0, _lib.calcCsvFromObjects)(cleanrows)
  }) : '');
};

exports.Table = Table;
Table.propTypes = {
  name: _propTypes.default.string.isRequired,
  schema: _propTypes.default.object.isRequired,
  newRow: _propTypes.default.func.isRequired,
  rows: _propTypes.default.array.isRequired,
  pageLength: _propTypes.default.number,
  inlineHeaders: _propTypes.default.bool,
  inlineHeadersEdit: _propTypes.default.bool,
  addDel: _propTypes.default.bool,
  enable: _propTypes.default.object
};

var load = function load(schema, row) {
  return Object.entries(schema).reduce(function (row, _ref6) {
    var _ref7 = _slicedToArray(_ref6, 2),
        key = _ref7[0],
        schem = _ref7[1];

    return _objectSpread(_objectSpread({}, row), {}, _defineProperty({}, key, schem.load && schem.load(row[key]) || row[key]));
  }, row);
};

var save = function save(schema, row) {
  return Object.entries(schema).reduce(function (row, _ref8) {
    var _ref9 = _slicedToArray(_ref8, 2),
        key = _ref9[0],
        schem = _ref9[1];

    return _objectSpread(_objectSpread({}, row), {}, _defineProperty({}, key, schem.save && schem.save(row[key]) || row[key]));
  }, row);
};

var isValid = function isValid(schema, row) {
  return Object.entries(schema).every(function (_ref10) {
    var _ref11 = _slicedToArray(_ref10, 2),
        key = _ref11[0],
        schem = _ref11[1];

    return !schem.valid || schem.valid(row[key]);
  });
};

var Row = function Row(_ref12) {
  var schema = _ref12.schema,
      row = _ref12.row,
      inlineHeaders = _ref12.inlineHeaders,
      addDel = _ref12.addDel,
      onEdit = _ref12.onEdit,
      onDel = _ref12.onDel;
  var rowEdit = load(schema, row);
  var id = rowEdit.id;

  var field = function field(name, value) {
    return inlineHeaders ? /*#__PURE__*/_react.default.createElement("table-row", {
      style: {
        display: 'block'
      },
      key: name
    }, /*#__PURE__*/_react.default.createElement("column-header", null, name), /*#__PURE__*/_react.default.createElement("div", null, value)) : value;
  };

  return /*#__PURE__*/_react.default.createElement("table-item", null, Object.entries(schema).map(function (_ref13) {
    var _ref14 = _slicedToArray(_ref13, 2),
        key = _ref14[0],
        schem = _ref14[1];

    return field(schem.name, schem.row(rowEdit[key], rowEdit));
  }), /*#__PURE__*/_react.default.createElement("table-buttons", null, /*#__PURE__*/_react.default.createElement("button", {
    onClick: function onClick() {
      return onEdit(id);
    },
    "data-testid": 'buttonEdit' + id
  }, "Edit"), addDel && /*#__PURE__*/_react.default.createElement("button", {
    onClick: function onClick() {
      return onDel(id);
    },
    "data-testid": 'buttonDel' + id
  }, "Del")));
};

Row.propTypes = {
  schema: _propTypes.default.object.isRequired,
  row: _propTypes.default.object.isRequired,
  inlineHeaders: _propTypes.default.bool,
  addDel: _propTypes.default.bool,
  onEdit: _propTypes.default.func.isRequired,
  onDel: _propTypes.default.func.isRequired
};

var RowEdit = function RowEdit(_ref15) {
  var schema = _ref15.schema,
      row = _ref15.row,
      inlineHeadersEdit = _ref15.inlineHeadersEdit,
      onSave = _ref15.onSave,
      onCancel = _ref15.onCancel;

  var _useState7 = (0, _react.useState)(load(schema, row)),
      _useState8 = _slicedToArray(_useState7, 2),
      rowEdit = _useState8[0],
      setrowEdit = _useState8[1];

  var field = function field(name, value) {
    return inlineHeadersEdit ? /*#__PURE__*/_react.default.createElement("table-row", {
      style: {
        display: 'block'
      },
      key: name
    }, /*#__PURE__*/_react.default.createElement("column-header", null, name), /*#__PURE__*/_react.default.createElement("div", null, value)) : value;
  };

  return /*#__PURE__*/_react.default.createElement("table-item", null, Object.entries(schema).map(function (_ref16) {
    var _ref17 = _slicedToArray(_ref16, 2),
        key = _ref17[0],
        schem = _ref17[1];

    return field(schem.name, schem.edit(rowEdit[key], function (val) {
      return setrowEdit(_objectSpread(_objectSpread({}, rowEdit), {}, _defineProperty({}, key, val)));
    }));
  }), /*#__PURE__*/_react.default.createElement("table-buttons", null, /*#__PURE__*/_react.default.createElement("button", {
    onClick: function onClick() {
      return isValid(schema, rowEdit) && onSave(save(schema, rowEdit));
    },
    "data-testid": "buttonSave"
  }, "Save"), /*#__PURE__*/_react.default.createElement("button", {
    onClick: onCancel,
    "data-testid": "buttonCancel"
  }, "Cancel")));
};

RowEdit.propTypes = {
  schema: _propTypes.default.object.isRequired,
  row: _propTypes.default.object.isRequired,
  inlineHeadersEdit: _propTypes.default.bool,
  onSave: _propTypes.default.func.isRequired,
  onCancel: _propTypes.default.func.isRequired
};