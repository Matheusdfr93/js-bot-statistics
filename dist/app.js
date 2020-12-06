"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const router_1 = __importDefault(require("./router"));
function createApp() {
    const express = express_1.default();
    const router = router_1.default();
    function registerMiddleWares() {
        express.use(express_1.default.json());
        express.use(morgan_1.default("dev"));
        express.use(router.router);
    }
    function init() {
        router.init();
        registerMiddleWares();
    }
    return {
        init,
        express,
    };
}
exports.default = createApp;
