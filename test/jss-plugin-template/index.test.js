"use strict";

var _expect = _interopRequireDefault(require("expect.js"));

var _commonTags = require("common-tags");

var _jss = require("jss");

var _sinon = _interopRequireDefault(require("sinon"));

var _ = _interopRequireDefault(require("."));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject6() {
  var data = _taggedTemplateLiteralLoose(["\n        @keyframes keyframes-a-id {\n          from {\n            opacity: 0;\n          }\n          to {\n            opacity: 1;\n          }\n        }\n      "]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteralLoose(["\n        @media print {\n          .button-id {\n            color: black;\n          }\n        }\n      "]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteralLoose(["\n        .a-id {\n          color: red;\n          float: left;\n        }\n      "]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteralLoose(["\n        .a-id {\n          color: red;\n          float: left;\n        }\n      "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteralLoose(["\n        .a-id {\n          color: red;\n          float: left;\n        }\n      "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteralLoose(["\n        .a-id {\n          color: red;\n        }\n      "]);

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
describe('jss-plugin-template', function () {
  var spy;
  var jss;
  beforeEach(function () {
    spy = _sinon.default.spy(console, 'warn');
    jss = (0, _jss.create)(settings).use((0, _.default)());
  });
  afterEach(function () {
    console.warn.restore();
  });
  describe('template literals', function () {
    it('should convert a single single property/value', function () {
      var sheet = jss.createStyleSheet({
        a: "\n          color: red;\n        "
      });
      (0, _expect.default)(sheet.toString()).to.be((0, _commonTags.stripIndent)(_templateObject()));
    });
    it('should parse multiple props/values', function () {
      var sheet = jss.createStyleSheet({
        a: "\n          color: red;\n          float: left;\n        "
      });
      (0, _expect.default)(sheet.toString()).to.be((0, _commonTags.stripIndent)(_templateObject2()));
      (0, _expect.default)(spy.callCount).to.be(0);
    });
    it('should warn when there is no colon found', function () {
      jss.createStyleSheet({
        a: 'color red;'
      });
      (0, _expect.default)(spy.callCount).to.be(1);
      (0, _expect.default)(spy.calledWithExactly('Warning: [JSS] Malformed CSS string "color red;"')).to.be(true);
    });
    it('should strip spaces', function () {
      var sheet = jss.createStyleSheet({
        a: "\n            color:     red   ;\n            float:   left   ;\n        "
      });
      (0, _expect.default)(sheet.toString()).to.be((0, _commonTags.stripIndent)(_templateObject3()));
    });
    it('should allow skiping last semicolon', function () {
      var sheet = jss.createStyleSheet({
        a: "\n          color: red;\n          float: left\n        "
      });
      (0, _expect.default)(sheet.toString()).to.be((0, _commonTags.stripIndent)(_templateObject4()));
    });
    it('should support @media', function () {
      var sheet = jss.createStyleSheet({
        '@media print': {
          button: 'color: black'
        }
      });
      (0, _expect.default)(sheet.toString()).to.be((0, _commonTags.stripIndent)(_templateObject5()));
    });
    it('should support @keyframes', function () {
      var sheet = jss.createStyleSheet({
        '@keyframes a': {
          from: 'opacity: 0',
          to: 'opacity: 1'
        }
      });
      (0, _expect.default)(sheet.toString()).to.be((0, _commonTags.stripIndent)(_templateObject6()));
    });
  });
});