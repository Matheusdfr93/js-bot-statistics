"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const app = app_1.default();
const PORT = process.env.PORT || 5555;
app.init();
app.express.listen(PORT, () => {
    console.log(`listen on PORT: `, PORT);
});
