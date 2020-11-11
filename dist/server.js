"use strict";

var _app = _interopRequireDefault(require("./app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _app["default"])();
var PORT = process.env.PORT || 5555;
app.init();
app.express.listen(PORT, function () {
  console.log("listen on PORT: ", PORT);
});