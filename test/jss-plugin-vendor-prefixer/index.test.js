"use strict";

var _expect = _interopRequireDefault(require("expect.js"));

var _jss = require("jss");

var cssVendor = _interopRequireWildcard(require("css-vendor"));

var _detectBrowser = _interopRequireDefault(require("detect-browser"));

var _jssPluginRuleValueFunction = _interopRequireDefault(require("jss-plugin-rule-value-function"));

var _index = _interopRequireDefault(require("./index"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var settings = {
  createGenerateId: function createGenerateId() {
    return function (rule) {
      return rule.key + "-id";
    };
  }
};
var isIE9 = _detectBrowser.default.name === 'ie' && _detectBrowser.default.version === '9.0.0';
var isIEorEdge = _detectBrowser.default.name === 'edge' || _detectBrowser.default.name === 'ie';
describe('jss-plugin-vendor-prefixer', function () {
  var jss;
  beforeEach(function () {
    jss = (0, _jss.create)(settings).use((0, _index.default)());
  });
  describe('prefixed property', function () {
    if (isIE9) {
      return;
    }

    var sheet;
    beforeEach(function () {
      sheet = jss.createStyleSheet({
        a: {
          animation: 'yyy'
        }
      });
    });
    it('should generate correct CSS', function () {
      var prefixedProp = cssVendor.supportedProperty('animation');
      (0, _expect.default)(sheet.toString()).to.be(".a-id {\n  " + prefixedProp + ": yyy;\n}");
    });
  });
  describe('@keyframes', function () {
    var sheet;
    beforeEach(function () {
      sheet = jss.createStyleSheet({
        '@keyframes a': {}
      });
    });
    it('should generate correct CSS', function () {
      if (isIEorEdge) {
        (0, _expect.default)(sheet.toString()).to.be('@keyframes keyframes-a-id {}');
        return;
      }

      var prefixedKeyframes = "@" + cssVendor.prefix.css + "keyframes";
      (0, _expect.default)(sheet.toString()).to.be(prefixedKeyframes + " keyframes-a-id {}");
    });
  });
  describe('unknown property', function () {
    var sheet;
    beforeEach(function () {
      sheet = jss.createStyleSheet({
        a: {
          xxx: 'block'
        }
      });
    });
    it('should generate correct CSS', function () {
      (0, _expect.default)(sheet.toString()).to.be('.a-id {\n  xxx: block;\n}');
    });
  });
  describe('unknown value', function () {
    var sheet;
    beforeEach(function () {
      sheet = jss.createStyleSheet({
        a: {
          display: 'yyy'
        }
      });
    });
    it('should generate correct CSS', function () {
      (0, _expect.default)(sheet.toString()).to.be('.a-id {\n  display: yyy;\n}');
    });
  });
  describe('unknown property and value', function () {
    var sheet;
    beforeEach(function () {
      sheet = jss.createStyleSheet({
        a: {
          xxx: 'yyy'
        }
      });
    });
    it('should generate correct CSS', function () {
      (0, _expect.default)(sheet.toString()).to.be('.a-id {\n  xxx: yyy;\n}');
    });
  });
  describe('array value', function () {
    it('should generate correct border', function () {
      var sheet = jss.createStyleSheet({
        a: {
          border: ['red', 'green']
        }
      });
      (0, _expect.default)(sheet.toString()).to.be('.a-id {\n  border: red, green;\n}');
    });
    it('should generate correct margin', function () {
      var sheet = jss.createStyleSheet({
        a: {
          margin: [['10px', '20px']]
        }
      });
      (0, _expect.default)(sheet.toString()).to.be('.a-id {\n  margin: 10px 20px;\n}');
    });
    it('should generate correct important', function () {
      var sheet = jss.createStyleSheet({
        a: {
          margin: [['10px', '20px'], '!important']
        }
      });
      (0, _expect.default)(sheet.toString()).to.be('.a-id {\n  margin: 10px 20px !important;\n}');
    });
  });
  describe('prefixed value', function () {
    if (isIE9) {
      return;
    }

    var sheet;
    beforeEach(function () {
      sheet = jss.createStyleSheet({
        a: {
          display: 'flex'
        }
      });
    });
    it('should generate correct CSS', function () {
      var supportedValue = cssVendor.supportedValue('display', 'flex');
      (0, _expect.default)(sheet.toString()).to.be(".a-id {\n  display: " + supportedValue + ";\n}");
    });
  });
  describe('prefix function values', function () {
    if (isIE9) {
      return;
    }

    var sheet;
    beforeEach(function () {
      var localJss = (0, _jss.create)(settings).use((0, _jssPluginRuleValueFunction.default)(), (0, _index.default)());
      sheet = localJss.createStyleSheet({
        a: {
          display: function display() {
            return 'flex';
          }
        }
      });
      sheet.update();
    });
    it('should generate correct CSS', function () {
      var supportedValue = cssVendor.supportedValue('display', 'flex');
      (0, _expect.default)(sheet.toString()).to.be(".a-id {\n  display: " + supportedValue + ";\n}");
    });
  });
});