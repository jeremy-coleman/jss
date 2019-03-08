"use strict";

var _expect = _interopRequireDefault(require("expect.js"));

var _ = _interopRequireWildcard(require("."));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('React-JSS: exports', function () {
  it('should export withStyles', function () {
    (0, _expect.default)(_.default).to.be.a(Function);
  });
  it('should export jss', function () {
    (0, _expect.default)(_.jss).to.be.an(_.jss.constructor);
  });
  it('should export createGenerateId', function () {
    (0, _expect.default)(_.createGenerateId).to.be.a(Function);
  });
  it('should export ThemeProvider', function () {
    (0, _expect.default)(_.ThemeProvider).to.be.a(Function);
  });
  it('should export JssProvider', function () {
    (0, _expect.default)(_.JssProvider).to.be.a(Function);
  });
  it('should export SheetsRegistry', function () {
    (0, _expect.default)(_.SheetsRegistry).to.be.a(Function);
  });
  it('should export withTheme', function () {
    (0, _expect.default)(_.withTheme).to.be.a(Function);
  });
  it('should export createTheming', function () {
    (0, _expect.default)(_.createTheming).to.be.a(Function);
  });
});