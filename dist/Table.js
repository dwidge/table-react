"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Table = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _lib = require("@dwidge/lib");

var _ImportFile = require("./ImportFile");

var _ExportFile = require("./ExportFile");

var _sort = require("./sort");

var _Table = _interopRequireDefault(require("react-bootstrap/Table"));

var _Button = _interopRequireDefault(require("react-bootstrap/Button"));

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

  var _useState = (0, _react.useState)(),
      _useState2 = _slicedToArray(_useState, 2),
      idEdit = _useState2[0],
      idEditSet = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      isEdited = _useState4[0],
      isEditedSet = _useState4[1];

  var _useState5 = (0, _react.useState)(false),
      _useState6 = _slicedToArray(_useState5, 2),
      confirm = _useState6[0],
      setconfirm = _useState6[1];

  var _useState7 = (0, _react.useState)(0),
      _useState8 = _slicedToArray(_useState7, 2),
      page = _useState8[0],
      setpage = _useState8[1];

  var sort = (0, _sort.useSort)(function (key) {
    var _schema$key, _schema$key$sort;

    return (_schema$key = schema[key]) === null || _schema$key === void 0 ? void 0 : (_schema$key$sort = _schema$key.sort) === null || _schema$key$sort === void 0 ? void 0 : _schema$key$sort.bind(schema[key]);
  });

  var setidEdit = function setidEdit(id) {
    var ask = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    if (ask && isEdited && id !== idEdit && !window.confirm('Cancel changes?')) {
      return;
    }

    idEditSet(id);
    isEditedSet(false);
  };

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

  var onClickEdit = setidEdit;

  var onEdit = function onEdit(val, key) {
    isEditedSet(true);
    return val;
  };

  var onDel = delrow;

  var onSave = function onSave(row) {
    setrow(row);
    setidEdit(undefined, false);
  };

  var onCancel = function onCancel() {
    return setidEdit(undefined, false);
  };

  var onAdd = function onAdd() {
    var row = newRow();
    addrow(row);
    setidEdit(row.id);
  };

  var onClear = function onClear() {
    confirm && setrows([]);
    setidEdit(undefined, false);
    setconfirm(!confirm);
  };

  return /*#__PURE__*/_react.default.createElement("div", {
    "data-testid": 'table' + name
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      overflow: 'auto',
      maxHeight: '80vh'
    }
  }, /*#__PURE__*/_react.default.createElement(_Table.default, {
    striped: true,
    bordered: true,
    hover: true
  }, !inlineHeaders && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("thead", null, /*#__PURE__*/_react.default.createElement("tr", null, schemaA.map(function (_ref4) {
    var _ref5 = _slicedToArray(_ref4, 2),
        key = _ref5[0],
        schem = _ref5[1];

    return /*#__PURE__*/_react.default.createElement("th", {
      key: key
    }, /*#__PURE__*/_react.default.createElement("a", {
      onClick: function onClick() {
        return sort.set(key);
      }
    }, schem.name, " ", sort.key !== key ? '' : sort.asc ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, "\u2191") : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, "\u2193")));
  })))), /*#__PURE__*/_react.default.createElement("tbody", null, cleanrows.sort(sort.sort).slice(page * pageLength, (page + 1) * pageLength).map(function (row) {
    return function (key) {
      return key === idEdit ? /*#__PURE__*/_react.default.createElement(RowEdit, {
        key: key,
        schema: schema,
        row: row,
        inlineHeadersEdit: inlineHeadersEdit,
        onEdit: onEdit,
        onSave: onSave,
        onCancel: onCancel
      }) : /*#__PURE__*/_react.default.createElement(Row, {
        key: key,
        schema: schema,
        row: row,
        inlineHeaders: inlineHeaders,
        addDel: addDel,
        onEdit: onClickEdit,
        onDel: onDel
      });
    }(row.id);
  })))), pages > 1 && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("p", null, page * pageLength + 1, " - ", Math.min(cleanrows.length, (page + 1) * pageLength), " of ", cleanrows.length), /*#__PURE__*/_react.default.createElement(_Button.default, {
    onClick: onPrev,
    "data-testid": "buttonPrev"
  }, "Prev"), /*#__PURE__*/_react.default.createElement(_Button.default, {
    onClick: onNext,
    "data-testid": "buttonNext"
  }, "Next")), addDel && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_Button.default, {
    onClick: onAdd,
    "data-testid": "buttonAdd"
  }, "Add"), /*#__PURE__*/_react.default.createElement(_Button.default, {
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

var RowInline = function RowInline(_ref12) {
  var fields = _ref12.fields,
      inlineHeaders = _ref12.inlineHeaders;
  return inlineHeaders ? /*#__PURE__*/_react.default.createElement(RowVert, {
    fields: fields
  }) : /*#__PURE__*/_react.default.createElement(RowHorz, {
    fields: fields
  });
};

RowInline.propTypes = {
  fields: _propTypes.default.array.isRequired,
  inlineHeaders: _propTypes.default.bool
};

var RowHorz = function RowHorz(_ref13) {
  var fields = _ref13.fields;
  return /*#__PURE__*/_react.default.createElement("tr", null, fields.map(function (_ref14) {
    var _ref15 = _slicedToArray(_ref14, 3),
        key = _ref15[0],
        name = _ref15[1],
        val = _ref15[2];

    return /*#__PURE__*/_react.default.createElement("td", {
      key: key
    }, val);
  }));
};

RowHorz.propTypes = {
  fields: _propTypes.default.array.isRequired
};

var RowVert = function RowVert(_ref16) {
  var fields = _ref16.fields;
  return /*#__PURE__*/_react.default.createElement("tr", null, /*#__PURE__*/_react.default.createElement("td", {
    colSpan: fields.length
  }, fields.map(function (_ref17) {
    var _ref18 = _slicedToArray(_ref17, 3),
        key = _ref18[0],
        name = _ref18[1],
        val = _ref18[2];

    return /*#__PURE__*/_react.default.createElement("div", {
      key: key
    }, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("b", null, name)), /*#__PURE__*/_react.default.createElement("div", null, val));
  })));
};

RowVert.propTypes = {
  fields: _propTypes.default.array.isRequired
};

var Row = function Row(_ref19) {
  var schema = _ref19.schema,
      row = _ref19.row,
      inlineHeaders = _ref19.inlineHeaders,
      addDel = _ref19.addDel,
      onEdit = _ref19.onEdit,
      onDel = _ref19.onDel;
  var rowEdit = load(schema, row);
  var id = rowEdit.id;
  var columns = Object.entries(schema).map(function (_ref20) {
    var _ref21 = _slicedToArray(_ref20, 2),
        key = _ref21[0],
        schem = _ref21[1];

    return [key, schem.name, schem.row(rowEdit[key], rowEdit)];
  });
  var btnedit = ['edit', '', /*#__PURE__*/_react.default.createElement(_Button.default, {
    key: "",
    onClick: function onClick() {
      return onEdit(id);
    },
    "data-testid": 'buttonEdit' + id
  }, "Edit")];
  var btndel = ['del', '', /*#__PURE__*/_react.default.createElement(_Button.default, {
    key: "",
    onClick: function onClick() {
      return onDel(id);
    },
    "data-testid": 'buttonDel' + id
  }, "Del")];
  var fields = addDel ? columns.concat([btnedit, btndel]) : columns.concat([btnedit]);
  return /*#__PURE__*/_react.default.createElement(RowInline, {
    inlineHeaders: inlineHeaders,
    fields: fields
  });
};

Row.propTypes = {
  schema: _propTypes.default.object.isRequired,
  row: _propTypes.default.object.isRequired,
  inlineHeaders: _propTypes.default.bool,
  addDel: _propTypes.default.bool,
  onEdit: _propTypes.default.func.isRequired,
  onDel: _propTypes.default.func.isRequired
};

var RowEdit = function RowEdit(_ref22) {
  var schema = _ref22.schema,
      row = _ref22.row,
      inlineHeadersEdit = _ref22.inlineHeadersEdit,
      _ref22$onEdit = _ref22.onEdit,
      onEdit = _ref22$onEdit === void 0 ? function (o) {
    return o;
  } : _ref22$onEdit,
      onSave = _ref22.onSave,
      onCancel = _ref22.onCancel;

  var _useState9 = (0, _react.useState)(load(schema, row)),
      _useState10 = _slicedToArray(_useState9, 2),
      rowEdit = _useState10[0],
      rowEditSet = _useState10[1];

  var setrowEdit = function setrowEdit(key) {
    return function (val) {
      return rowEditSet(_objectSpread(_objectSpread({}, rowEdit), {}, _defineProperty({}, key, onEdit(val, key))));
    };
  };

  var columns = Object.entries(schema).map(function (_ref23) {
    var _ref24 = _slicedToArray(_ref23, 2),
        key = _ref24[0],
        schem = _ref24[1];

    return [key, schem.name, schem.edit(rowEdit[key], setrowEdit(key), rowEdit)];
  });
  var btnsave = ['save', '', /*#__PURE__*/_react.default.createElement(_Button.default, {
    key: "",
    onClick: function onClick() {
      return isValid(schema, rowEdit) && onSave(save(schema, rowEdit));
    },
    "data-testid": "buttonSave"
  }, "Save")];
  var btncancel = ['cancel', '', /*#__PURE__*/_react.default.createElement(_Button.default, {
    key: "",
    onClick: onCancel,
    "data-testid": "buttonCancel"
  }, "Cancel")];
  var fields = columns.concat([btnsave, btncancel]);
  return /*#__PURE__*/_react.default.createElement(RowInline, {
    inlineHeaders: inlineHeadersEdit,
    fields: fields
  });
};

RowEdit.propTypes = {
  schema: _propTypes.default.object.isRequired,
  row: _propTypes.default.object.isRequired,
  inlineHeadersEdit: _propTypes.default.bool,
  onEdit: _propTypes.default.func,
  onSave: _propTypes.default.func.isRequired,
  onCancel: _propTypes.default.func.isRequired
};