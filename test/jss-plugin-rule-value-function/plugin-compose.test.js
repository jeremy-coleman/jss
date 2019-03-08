"use strict";

var _expect = _interopRequireDefault(require("expect.js"));

var _commonTags = require("common-tags");

var _jss = require("jss");

var _jssPluginCompose = _interopRequireDefault(require("jss-plugin-compose"));

var _ = _interopRequireDefault(require("."));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject2() {
  var data = _taggedTemplateLiteralLoose(["\n        .a-id {\n          color: red;\n        }\n        .b-id {\n          color: green;\n        }\n      "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteralLoose(["\n        .a-id {\n          color: red;\n        }\n        .b-id {\n          color: green;\n        }\n      "]);

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
describe('jss-plugin-rule-value-function: plugin-compose', function () {
  var jss;
  beforeEach(function () {
    jss = (0, _jss.create)(settings).use((0, _.default)(), (0, _jssPluginCompose.default)());
  });
  describe('composing fn value', function () {
    var sheet;
    beforeEach(function () {
      sheet = jss.createStyleSheet({
        a: {
          color: function color() {
            return 'red';
          }
        },
        b: {
          color: 'green',
          composes: '$a'
        }
      }, {
        link: true
      }).attach();
    });
    afterEach(function () {
      sheet.detach();
    });
    it('should return correct .toString()', function () {
      sheet.update();
      (0, _expect.default)(sheet.toString()).to.be((0, _commonTags.stripIndent)(_templateObject()));
    });
    it('should have composed class names', function () {
      (0, _expect.default)(sheet.classes).to.eql({
        a: 'a-id',
        b: 'b-id a-id'
      });
    });
  });
  describe('composing fn rule', function () {
    var sheet;
    beforeEach(function () {
      sheet = jss.createStyleSheet({
        a: function a() {
          return {
            color: 'red'
          };
        },
        b: {
          color: 'green',
          composes: '$a'
        }
      }, {
        link: true
      }).attach();
    });
    afterEach(function () {
      sheet.detach();
    });
    it('should return correct .toString()', function () {
      sheet.update();
      (0, _expect.default)(sheet.toString()).to.be((0, _commonTags.stripIndent)(_templateObject2()));
    });
    it('should have composed class names', function () {
      (0, _expect.default)(sheet.classes).to.eql({
        a: 'a-id',
        b: 'b-id a-id'
      });
    });
  });
});