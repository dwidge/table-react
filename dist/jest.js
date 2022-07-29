"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.type = exports.tools = exports.serialSpy = exports.input = exports.getText = exports.getTags = exports.getTag = exports.click = exports.clear = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var getTag = function getTag(el) {
  return function (tag) {
    return getTags(el)(tag)[0];
  };
};

exports.getTag = getTag;

var getTags = function getTags(el) {
  return function (tag) {
    return _toConsumableArray(el.getElementsByTagName(tag));
  };
};

exports.getTags = getTags;

var getText = function getText(el) {
  return el.textContent;
};

exports.getText = getText;

var tools = function tools(userEvent, screen, jest) {
  return {
    text: function text(testid) {
      return getText(screen.getByTestId(testid));
    }
  };
};

exports.tools = tools;

var type = function type(userEvent, screen) {
  return function (testid, text) {
    return userEvent.type(screen.getByTestId(testid), text);
  };
};

exports.type = type;

var clear = function clear(userEvent, screen) {
  return function (testid, text) {
    return userEvent.clear(screen.getByTestId(testid));
  };
};

exports.clear = clear;

var input = function input(userEvent, screen) {
  return function (testid, text) {
    userEvent.clear(screen.getByTestId(testid));
    userEvent.type(screen.getByTestId(testid), text);
  };
};

exports.input = input;

var click = function click(userEvent, screen) {
  return function (testid) {
    return userEvent.click(screen.getByTestId(testid));
  };
};

exports.click = click;

var serialSpy = function serialSpy(jest) {
  return function (object, key, returns) {
    return returns.reduce(function (f, val) {
      return f.mockImplementationOnce(function () {
        return val;
      });
    }, jest.spyOn(object, key));
  };
};

exports.serialSpy = serialSpy;