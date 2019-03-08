"use strict";

var _expect = _interopRequireDefault(require("expect.js"));

var _commonTags = require("common-tags");

var _jss = require("jss");

var _ = _interopRequireDefault(require("."));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject8() {
  var data = _taggedTemplateLiteralLoose(["\n        @media screen {\n          .b-id {\n            color: black;\n          }\n        }\n      "]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = _taggedTemplateLiteralLoose(["\n        .a-id {\n          color: white;\n        }\n      "]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = _taggedTemplateLiteralLoose(["\n        .a-id {\n          color: black;\n        }\n      "]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteralLoose(["\n        @media all {\n          .a-id {\n            color: red;\n          }\n        }\n      "]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteralLoose(["\n        .a-id {\n          color: green;\n          color: red;\n        }\n      "]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteralLoose(["\n        .a-id {\n          color: red;\n        }\n      "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteralLoose(["\n        .a-id {\n          color: red;\n          display: block;\n        }\n      "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteralLoose(["\n        .a-id {\n          color: red;\n          display: block;\n        }\n      "]);

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
describe('jss-plugin-rule-value-function: Function rules', function () {
  var jss;
  beforeEach(function () {
    jss = (0, _jss.create)(settings).use((0, _.default)());
  });
  describe('basic', function () {
    var sheet;
    beforeEach(function () {
      sheet = jss.createStyleSheet({
        a: function a(data) {
          return {
            color: data.color,
            display: 'block'
          };
        }
      }, {
        link: true
      }).attach();
    });
    afterEach(function () {
      sheet.detach();
    });
    it('should compile correctly', function () {
      sheet.update({
        color: 'red'
      });
      (0, _expect.default)(sheet.toString()).to.be((0, _commonTags.stripIndent)(_templateObject()));
    });
  });
  describe('remove props', function () {
    var sheet;
    beforeEach(function () {
      sheet = jss.createStyleSheet({
        a: function a(data) {
          if (data.noDisplay) {
            return {
              color: data.color
            };
          }

          return {
            color: data.color,
            display: 'block'
          };
        }
      }, {
        link: true
      }).attach();
    });
    afterEach(function () {
      sheet.detach();
    });
    it('should compile with color and display', function () {
      sheet.update({
        color: 'red'
      });
      (0, _expect.default)(sheet.toString()).to.be((0, _commonTags.stripIndent)(_templateObject2()));
    });
    it('should compile with color', function () {
      sheet.update({
        color: 'red'
      });
      sheet.update({
        color: 'red',
        noDisplay: true
      });
      (0, _expect.default)(sheet.toString()).to.be((0, _commonTags.stripIndent)(_templateObject3()));
    });
  });
  describe('fallbacks inside', function () {
    var sheet;
    beforeEach(function () {
      sheet = jss.createStyleSheet({
        a: function a(data) {
          return {
            color: data.color,
            fallbacks: {
              color: 'green'
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
    it('should output with fallbacks', function () {
      sheet.update({
        color: 'red'
      });
      (0, _expect.default)(sheet.toString()).to.be((0, _commonTags.stripIndent)(_templateObject4()));
    });
  });
  describe('@media with fn values', function () {
    var sheet;
    beforeEach(function () {
      sheet = jss.createStyleSheet({
        '@media all': {
          a: {
            color: function color(_ref) {
              var _color = _ref.color;
              return _color;
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
      (0, _expect.default)(sheet.toString()).to.be((0, _commonTags.stripIndent)(_templateObject5()));
    });
  });
  describe('.addRule() with style rule', function () {
    var sheet;
    beforeEach(function () {
      sheet = jss.createStyleSheet(null, {
        link: true
      }).attach();
      sheet.addRule('a', function (data) {
        return {
          color: data.primary ? 'black' : 'white'
        };
      });
    });
    afterEach(function () {
      sheet.detach();
    });
    it('should compile correct CSS', function () {
      sheet.update({
        primary: true
      });
      (0, _expect.default)(sheet.toString()).to.be((0, _commonTags.stripIndent)(_templateObject6()));
    });
    it('should return correct .toString()', function () {
      sheet.update({
        primary: false
      });
      (0, _expect.default)(sheet.toString()).to.be((0, _commonTags.stripIndent)(_templateObject7()));
    });
  });
  describe('.addRule() with @media', function () {
    var sheet;
    beforeEach(function () {
      sheet = jss.createStyleSheet({}, {
        link: true
      }).attach();
      sheet.addRule('@media screen', {
        b: function b(data) {
          return {
            color: data.primary ? 'black' : 'white'
          };
        }
      });
    });
    afterEach(function () {
      sheet.detach();
    });
    it('should return correct .toString()', function () {
      sheet.update({
        primary: true
      });
      (0, _expect.default)(sheet.toString()).to.be((0, _commonTags.stripIndent)(_templateObject8()));
    });
  });
});