"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.saveText = void 0;

var _fileSaver = require("file-saver");

var saveText = function saveText(text, file) {
  var mime = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'text/plain';
  var blob = new Blob([text], {
    type: mime + ';charset=utf-8'
  });
  (0, _fileSaver.saveAs)(blob, file);
};

exports.saveText = saveText;