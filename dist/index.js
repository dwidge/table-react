"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _schema = require("./schema");

Object.keys(_schema).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _schema[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _schema[key];
    }
  });
});

var _file = require("./file");

Object.keys(_file).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _file[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _file[key];
    }
  });
});

var _Table = require("./Table");

Object.keys(_Table).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Table[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Table[key];
    }
  });
});