"use strict";

var _expect = _interopRequireDefault(require("expect.js"));

var _commonTags = require("common-tags");

var _jss = require("jss");

var _jssPluginNested = _interopRequireDefault(require("../../jss-plugin-nested"));

var _ = _interopRequireDefault(require("."));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject5() {
  var data = _taggedTemplateLiteralLoose(["\n        .a-id {\n          padding: 5px;\n        }\n        .b-id {\n          background: blue;\n        }\n        .c-id {}\n        .c-id.a-id {}\n        .c-id.a-id .b-id {\n          margin: 10px;\n        }\n      "]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteralLoose(["\n        .a-id {\n          color: red;\n        }\n        .a-id a {\n          color: green;\n        }\n      "]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteralLoose(["\n        .a-id {\n          color: red;\n        }\n        .a-id a {\n          color: green;\n        }\n      "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteralLoose(["\n        .a-id {\n          color: red;\n        }\n        @media all {\n          .a-id {\n            color: green;\n          }\n        }\n      "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteralLoose(["\n        .a-id {\n          color: red;\n        }\n        @media all {\n          .a-id {\n            color: green;\n          }\n        }\n      "]);

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
describe('jss-plugin-rule-value-function: plugin-nested', function () {
  var jss;
  beforeEach(function () {
    jss = (0, _jss.create)(settings).use((0, _jssPluginNested.default)(), (0, _.default)());
  });
  describe('@media nested in fn rule', function () {
    var sheet;
    beforeEach(function () {
      sheet = jss.createStyleSheet({
        a: function a(data) {
          return {
            color: data.color,
            '@media all': {
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
    it('should return correct .toString()', function () {
      sheet.update({
        color: 'red'
      });
      (0, _expect.default)(sheet.toString()).to.be((0, _commonTags.stripIndent)(_templateObject()));
    });
  });
  describe('@media nested as a fn rule', function () {
    var sheet;
    beforeEach(function () {
      sheet = jss.createStyleSheet({
        a: {
          color: 'red',
          '@media all': function mediaAll(data) {
            return {
              color: data.color
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
    it('should return correct .toString()', function () {
      sheet.update({
        color: 'green'
      });
      (0, _expect.default)(sheet.toString()).to.be((0, _commonTags.stripIndent)(_templateObject2()));
    });
  });
  describe('nested selector inside of a fn rule', function () {
    var sheet;
    beforeEach(function () {
      sheet = jss.createStyleSheet({
        a: function a(_ref) {
          var color = _ref.color;
          return {
            color: 'red',
            '& a': {
              color: color
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
        color: 'green'
      });
      (0, _expect.default)(sheet.toString()).to.be((0, _commonTags.stripIndent)(_templateObject3()));
    });
  });
  describe('nested selector as a fn rule', function () {
    var sheet;
    beforeEach(function () {
      sheet = jss.createStyleSheet({
        a: {
          color: 'red',
          '& a': function a(_ref2) {
            var color = _ref2.color;
            return {
              color: color
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
    it('should return correct .toString()', function () {
      sheet.update({
        color: 'green'
      });
      (0, _expect.default)(sheet.toString()).to.be((0, _commonTags.stripIndent)(_templateObject4()));
    });
  });
  describe('deeply nested selector as a fn value', function () {
    var sheet;
    beforeEach(function () {
      sheet = jss.createStyleSheet({
        a: {
          padding: '5px'
        },
        b: {
          background: 'blue'
        },
        c: {
          '&$a': {
            '& $b': {
              margin: function margin() {
                return '10px';
              }
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
      sheet.update();
      (0, _expect.default)(sheet.toString()).to.be((0, _commonTags.stripIndent)(_templateObject5()));
    });
  });
});