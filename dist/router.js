"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Campeao_1 = __importDefault(require("./WebScraping/SerieA/Campeao"));
const probController_1 = __importDefault(require("./Controllers/probController"));
function createRouter() {
    const router = express_1.Router();
    const champController = Campeao_1.default;
    const probControllers = probController_1.default;
    function registerRoutes() {
        router.get("/", (req, res) => {
            res.send({ status: "abroba" }).status(200);
        });
        router.post("/probChamp", champController.getProbsByTeam);
        router.post("/probController", probControllers);
    }
    function init() {
        registerRoutes();
    }
    return {
        init,
        router,
    };
}
exports.default = createRouter;
