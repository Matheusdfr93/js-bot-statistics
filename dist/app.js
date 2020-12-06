"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _router = _interopRequireDefault(require("./router"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createApp() {
  const express = (0, _express.default)();
  const router = (0, _router.default)();

  function registerMiddleWares() {
    express.use(_express.default.json());
    express.use((0, _morgan.default)("dev"));
    express.use(router.router);
  }

  function init() {
    router.init();
    registerMiddleWares();
  }

  return {
    init,
    express
  };
}

var _default = createApp;
exports.default = _default;