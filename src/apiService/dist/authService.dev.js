"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerUser = exports.loginUser = void 0;

var _toolkit = require("@reduxjs/toolkit");

var _http = _interopRequireDefault(require("~/utils/http"));

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var loginUser = (0, _toolkit.createAsyncThunk)('auth/login', function _callee(userCredentials) {
  var req, res;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(_axios["default"].post("".concat(_http["default"], "/v1/auth/login"), userCredentials));

        case 3:
          req = _context.sent;
          res = req.data; // Không cần truy cập đến res.data.data nữa

          localStorage.setItem('accessToken', JSON.stringify(res.accessToken));
          localStorage.setItem('refreshToken', JSON.stringify(res.refreshToken));
          return _context.abrupt("return", res);

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](0);
          throw _context.t0.response !== null ? new Error(_context.t0.response.data.message) : new Error('Đã xảy ra lỗi không mong đợi');

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 10]]);
});
exports.loginUser = loginUser;
var registerUser = (0, _toolkit.createAsyncThunk)('auth/signup', function _callee2(userCredentials) {
  var req, res;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(_axios["default"].post("".concat(_http["default"], "/v1/auth/register"), userCredentials));

        case 3:
          req = _context2.sent;
          _context2.next = 6;
          return regeneratorRuntime.awrap(req.data.data);

        case 6:
          res = _context2.sent;
          return _context2.abrupt("return", res);

        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2["catch"](0);
          throw _context2.t0.response !== null ? new Error(_context2.t0.response.data.message) : new Error('Đã xảy ra lỗi không mong đợi');

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 10]]);
});
exports.registerUser = registerUser;