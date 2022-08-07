"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dateYYMMDDfromSeconds = exports.dateSecondsFromYYMMDD = void 0;

var dateYYMMDDfromSeconds = function dateYYMMDDfromSeconds(sec) {
  return new Date(sec * 1000).toLocaleDateString('en-ZA').split('/').join('-');
};

exports.dateYYMMDDfromSeconds = dateYYMMDDfromSeconds;

var dateSecondsFromYYMMDD = function dateSecondsFromYYMMDD(str) {
  var segs = str.split('-');
  var date = new Date(+segs[0], +segs[1] - 1, +segs[2]);
  return date.getTime() / 1000 | 0;
};

exports.dateSecondsFromYYMMDD = dateSecondsFromYYMMDD;