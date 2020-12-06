"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _Campeao = _interopRequireDefault(require("./WebScraping/SerieA/Campeao"));

var _probController = _interopRequireDefault(require("./Controllers/probController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createRouter() {
  const router = (0, _express.Router)();
  const champController = _Campeao.default;
  const probControllers = _probController.default;

  function registerRoutes() {
    router.get("/", (req, res) => {
      res.send({
        status: "abroba"
      }).status(200);
    });
    router.post("/probChamp", champController.getProbsByTeam);
    router.post("/probController", probControllers);
  }

  function init() {
    registerRoutes();
  }

  return {
    init,
    router
  };
}

var _default = createRouter;
exports.default = _default;