"use strict";

var _expect = _interopRequireDefault(require("expect.js"));

var _commonTags = require("common-tags");

var _jss = require("jss");

var _jssPluginRuleValueFunction = _interopRequireDefault(require("jss-plugin-rule-value-function"));

var _index = _interopRequireDefault(require("./index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject4() {
  var data = _taggedTemplateLiteralLoose(["\n        .a-id {\n          --fontSize: 16;\n        }\n      "]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteralLoose(["\n        .a-id {\n          --fontSize: 12;\n        }\n      "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteralLoose(["\n        .a-id {\n          --fontSize: 12;\n        }\n      "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteralLoose(["\n        .a-id {\n          font-size: 12;\n        }\n      "]);

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
describe('jss-plugin-camel-case', function () {
  var jss;
  beforeEach(function () {
    jss = (0, _jss.create)(settings).use((0, _index.default)());
  });
  describe('regular rule', function () {
    var sheet;
    beforeEach(function () {
      sheet = jss.createStyleSheet({
        a: {
          fontSize: '20px',
          zIndex: 1,
          lineHeight: 1.2
        }
      });
    });
    it('should generate correct CSS', function () {
      (0, _expect.default)(sheet.toString()).to.be('.a-id {\n  font-size: 20px;\n  z-index: 1;\n  line-height: 1.2;\n}');
    });
  });
  describe('@font-face with array of styles', function () {
    var sheet;
    beforeEach(function () {
      sheet = jss.createStyleSheet({
        '@font-face': [{
          fontFamily: 'Lato-Light',
          src: 'url("/fonts/Lato-Light.ttf") format("truetype")'
        }, {
          fontFamily: 'Lato-Bold',
          src: 'url("/fonts/Lato-Bold.ttf") format("truetype")'
        }]
      });
    });
    it('should generate correct CSS', function () {
      (0, _expect.default)(sheet.toString()).to.be('@font-face {\n' + '  font-family: Lato-Light;\n' + '  src: url("/fonts/Lato-Light.ttf") format("truetype");\n' + '}\n' + '@font-face {\n' + '  font-family: Lato-Bold;\n' + '  src: url("/fonts/Lato-Bold.ttf") format("truetype");\n' + '}');
    });
  });
  describe('fallbacks object', function () {
    var sheet;
    beforeEach(function () {
      sheet = jss.createStyleSheet({
        '@font-face': {
          fontFamily: 'MyWebFont',
          fallbacks: {
            fontFamily: 'MyWebFontFallback'
          }
        }
      });
    });
    it('should generate correct CSS', function () {
      (0, _expect.default)(sheet.toString()).to.be('@font-face {\n' + '  font-family: MyWebFontFallback;\n' + '  font-family: MyWebFont;\n' + '}');
    });
  });
  describe('fallbacks array', function () {
    var sheet;
    beforeEach(function () {
      sheet = jss.createStyleSheet({
        '@font-face': {
          fontFamily: 'MyWebFont',
          fallbacks: [{
            fontFamily: 'MyWebFontFallback'
          }]
        }
      });
    });
    it('should generate correct CSS', function () {
      (0, _expect.default)(sheet.toString()).to.be('@font-face {\n' + '  font-family: MyWebFontFallback;\n' + '  font-family: MyWebFont;\n' + '}');
    });
  });
  describe('font faces with fallbacks', function () {
    var sheet;
    beforeEach(function () {
      sheet = jss.createStyleSheet({
        '@font-face': [{
          fontFamily: 'MyWebFont',
          fallbacks: {
            fontFamily: 'MyWebFontFallback'
          }
        }]
      });
    });
    it('should generate correct CSS', function () {
      (0, _expect.default)(sheet.toString()).to.be('@font-face {\n' + '  font-family: MyWebFontFallback;\n' + '  font-family: MyWebFont;\n' + '}');
    });
  });
  describe('function values', function () {
    var sheet;
    beforeEach(function () {
      var localJss = (0, _jss.create)(settings).use((0, _jssPluginRuleValueFunction.default)(), (0, _index.default)());
      sheet = localJss.createStyleSheet({
        a: {
          fontSize: function fontSize() {
            return 12;
          }
        }
      });
    });
    it('should generate correct CSS', function () {
      sheet.update();
      (0, _expect.default)(sheet.toString()).to.be((0, _commonTags.stripIndent)(_templateObject()));
    });
  });
  describe('css variables', function () {
    var localJss;
    beforeEach(function () {
      localJss = (0, _jss.create)(settings).use((0, _jssPluginRuleValueFunction.default)(), (0, _index.default)());
    });
    it('with static css variable', function () {
      var sheet = localJss.createStyleSheet({
        a: {
          '--fontSize': 12
        }
      });
      (0, _expect.default)(sheet.toString()).to.be((0, _commonTags.stripIndent)(_templateObject2()));
    });
    it('with dynamic css variable', function () {
      var sheet = localJss.createStyleSheet({
        a: {
          '--fontSize': function fontSize(size) {
            return size;
          }
        }
      });
      sheet.update(12);
      (0, _expect.default)(sheet.toString()).to.be((0, _commonTags.stripIndent)(_templateObject3()));
      sheet.update(16);
      (0, _expect.default)(sheet.toString()).to.be((0, _commonTags.stripIndent)(_templateObject4()));
    });
  });
});