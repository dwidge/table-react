"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useSort = exports.sortString = exports.sortAny = void 0;

var _react = require("react");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var sortString = function sortString(a, b) {
  return ('' + a).localeCompare('' + b);
};

exports.sortString = sortString;

var sortAny = function sortAny(a, b) {
  return typeof a === 'string' || typeof b === 'string' ? sortString(a, b) : a - b;
};

exports.sortAny = sortAny;

var useSort = function useSort(getSorter) {
  var _useState = (0, _react.useState)(),
      _useState2 = _slicedToArray(_useState, 2),
      key = _useState2[0],
      keySet = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      asc = _useState4[0],
      ascSet = _useState4[1];

  var set = function set(newkey) {
    if (newkey === key) {
      if (asc) keySet();else ascSet(true);
    } else {
      keySet(newkey);
      ascSet(false);
    }
  };

  var sortType = getSorter(key) || sortAny;

  var sort = function sort(a, b) {
    return asc ? sortType(b[key], a[key], b, a) : sortType(a[key], b[key], a, b);
  };

  return {
    key: key,
    asc: asc,
    sort: sort,
    set: set
  };
};

exports.useSort = useSort;