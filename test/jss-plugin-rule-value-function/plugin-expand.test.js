"use strict";

var _expect = _interopRequireDefault(require("expect.js"));

var _commonTags = require("common-tags");

var _jss = require("jss");

var _jssPluginExpand = _interopRequireDefault(require("../../jss-plugin-expand"));

var _ = _interopRequireDefault(require("."));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject6() {
  var data = _taggedTemplateLiteralLoose(["\n        .a-id {\n          border-color: blue;\n        }\n      "]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteralLoose(["\n        .a-id {\n          border-color: red;\n        }\n      "]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteralLoose(["\n        .a-id {\n          border-color: red;\n        }\n      "]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteralLoose(["\n        .a-id {\n          border-top: 5px;\n          border-bottom: 5px;\n        }\n      "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteralLoose(["\n        .a-id {\n          border-top: 1px;\n          border-bottom: 1px;\n        }\n      "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteralLoose(["\n        .a-id {\n          border-top: 1px;\n          border-bottom: 1px;\n        }\n      "]);

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
describe('jss-plugin-rule-value-function: plugin-expand', function () {
  var jss;
  beforeEach(function () {
    jss = (0, _jss.create)(settings).use((0, _.default)(), (0, _jssPluginExpand.default)());
  });
  describe('expanding in fn values', function () {
    var sheet;
    beforeEach(function () {
      sheet = jss.createStyleSheet({
        a: {
          border: function border(props) {
            return {
              top: props.border,
              bottom: props.border
            };
          }
        }
      }, {
        link: true
      }).attach();
    });
    afterEach(function () {
      sheet.detach();
    });
    it.skip('should return correct .toString()', function () {
      sheet.update({
        border: '1px'
      });
      (0, _expect.default)(sheet.toString()).to.be((0, _commonTags.stripIndent)(_templateObject()));
    });
    it.skip('should handle when updating multiple times', function () {
      sheet.update({
        border: '1px'
      });
      (0, _expect.default)(sheet.toString()).to.be((0, _commonTags.stripIndent)(_templateObject2()));
      sheet.update({
        border: '5px'
      });
      (0, _expect.default)(sheet.toString()).to.be((0, _commonTags.stripIndent)(_templateObject3()));
    });
  });
  describe('expanding in fn rules', function () {
    var sheet;
    beforeEach(function () {
      sheet = jss.createStyleSheet({
        a: function a(props) {
          return {
            border: {
              color: props.color
            }
          };
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
      (0, _expect.default)(sheet.toString()).to.be((0, _commonTags.stripIndent)(_templateObject4()));
    });
    it('should handle updating multiple times', function () {
      sheet.update({
        color: 'red'
      });
      (0, _expect.default)(sheet.toString()).to.be((0, _commonTags.stripIndent)(_templateObject5()));
      sheet.update({
        color: 'blue'
      });
      (0, _expect.default)(sheet.toString()).to.be((0, _commonTags.stripIndent)(_templateObject6()));
    });
  });
});