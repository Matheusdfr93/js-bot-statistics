"use strict";

var _app = _interopRequireDefault(require("./app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _app.default)();
const PORT = process.env.PORT || 5556;
app.init();
app.express.listen(PORT, () => {
  console.log(`listen on PORT: `, PORT);
});