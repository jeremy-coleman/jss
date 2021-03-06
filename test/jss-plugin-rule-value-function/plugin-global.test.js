"use strict";

var _expect = _interopRequireDefault(require("expect.js"));

var _commonTags = require("common-tags");

var _jss = require("jss");

var _jssPluginGlobal = _interopRequireDefault(require("jss-plugin-global"));

var _ = _interopRequireDefault(require("."));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject2() {
  var data = _taggedTemplateLiteralLoose(["\n        a {\n          color: red;\n        }\n      "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteralLoose(["\n        a {\n          color: red;\n        }\n        @media all {\n          a {\n            color: green;\n          }\n        }\n      "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteralLoose(strings, raw) { if (!raw) { raw = strings.slice(0); } strings.raw = raw; return strings; }

var settings = {
  createGenerateId: function createGenerateId() {
    return function (rule) {
      return rule.key + "-id";
    };
  }
};
describe('jss-plugin-rule-value-function: plugin-global', function () {
  var jss;
  beforeEach(function () {
    jss = (0, _jss.create)(settings).use((0, _jssPluginGlobal.default)(), (0, _.default)());
  });
  describe('fn rule', function () {
    var sheet;
    beforeEach(function () {
      sheet = jss.createStyleSheet({
        '@global': {
          a: function a(data) {
            return {
              color: data.color
            };
          },
          '@media all': {
            a: {
              color: 'green'
            }
          }
        }
      }, {
        link: true
      }).attach();
    });
    afterEach(function () {
      sheet.detach();
    });
    it('should return correct .toString()', function () {
      sheet.update({
        color: 'red'
      });
      (0, _expect.default)(sheet.toString()).to.be((0, _commonTags.stripIndent)(_templateObject()));
    });
  });
  describe('fn value', function () {
    var sheet;
    beforeEach(function () {
      sheet = jss.createStyleSheet({
        '@global': {
          a: {
            color: function color(data) {
              return data.color;
            }
          }
        }
      }, {
        link: true
      }).attach();
    });
    afterEach(function () {
      sheet.detach();
    });
    it('should return correct .toString()', function () {
      sheet.update({
        color: 'red'
      });
      (0, _expect.default)(sheet.toString()).to.be((0, _commonTags.stripIndent)(_templateObject2()));
    });
  });
});