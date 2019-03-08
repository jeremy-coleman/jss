"use strict";

var _commonTags = require("common-tags");

var _expect = _interopRequireDefault(require("expect.js"));

var _jssPluginNested = _interopRequireDefault(require("jss-plugin-nested"));

var _jssPluginExpand = _interopRequireDefault(require("jss-plugin-expand"));

var _sinon = _interopRequireDefault(require("sinon"));

var _jssPluginRuleValueFunction = _interopRequireDefault(require("jss-plugin-rule-value-function"));

var _jss = require("jss");

var _index = _interopRequireDefault(require("./index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteralLoose(["\n        .a-id {\n          color: green;\n          color: blue;\n        }\n        .b-id {\n          color: green;\n          color: blue;\n          float: left;\n        }\n      "]);

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
describe('jss-plugin-extend', function () {
  var spy;
  var jss;
  beforeEach(function () {
    spy = _sinon.default.spy(console, 'warn');
    jss = (0, _jss.create)(settings).use((0, _jssPluginRuleValueFunction.default)(), (0, _index.default)(), (0, _jssPluginNested.default)(), (0, _jssPluginExpand.default)());
  });
  afterEach(function () {
    console.warn.restore();
  });
  describe('simple extend', function () {
    var sheet;
    beforeEach(function () {
      var a = {
        float: 'left'
      };
      sheet = jss.createStyleSheet({
        a: a,
        b: {
          extend: a,
          width: '1px'
        }
      });
    });
    it('should extend', function () {
      (0, _expect.default)(sheet.getRule('a')).to.not.be(undefined);
      (0, _expect.default)(sheet.getRule('b')).to.not.be(undefined);
      (0, _expect.default)(sheet.toString()).to.be('.a-id {\n' + '  float: left;\n' + '}\n' + '.b-id {\n' + '  float: left;\n' + '  width: 1px;\n' + '}');
    });
  });
  describe('ensure override order', function () {
    var sheet;
    beforeEach(function () {
      var a = {
        float: 'left',
        color: 'red'
      };
      sheet = jss.createStyleSheet({
        a: {
          extend: a,
          float: 'right'
        }
      });
    });
    it('should have correct order', function () {
      (0, _expect.default)(sheet.getRule('a')).to.not.be(undefined);
      (0, _expect.default)(sheet.toString()).to.be('.a-id {\n  float: right;\n  color: red;\n}');
    });
  });
  describe('multi extend', function () {
    var sheet;
    beforeEach(function () {
      var a = {
        float: 'left'
      };
      var b = {
        position: 'absolute'
      };
      sheet = jss.createStyleSheet({
        c: {
          extend: [a, b],
          width: '1px'
        }
      });
    });
    it('should have correct output', function () {
      (0, _expect.default)(sheet.getRule('c')).to.not.be(undefined);
      (0, _expect.default)(sheet.toString()).to.be('.c-id {\n  float: left;\n  position: absolute;\n  width: 1px;\n}');
    });
  });
  describe('nested extend 1', function () {
    var sheet;
    beforeEach(function () {
      var c = {
        float: 'left'
      };
      var b = {
        extend: c,
        display: 'none'
      };
      sheet = jss.createStyleSheet({
        a: {
          extend: b,
          width: '1px'
        }
      });
    });
    it('should should have correct output', function () {
      (0, _expect.default)(sheet.getRule('a')).to.not.be(undefined);
      (0, _expect.default)(sheet.toString()).to.be('.a-id {\n  float: left;\n  display: none;\n  width: 1px;\n}');
    });
  });
  describe('nested extend 2', function () {
    var sheet;
    beforeEach(function () {
      var b = {
        '&:hover': {
          float: 'left',
          width: '3px'
        }
      };
      sheet = jss.createStyleSheet({
        a: {
          extend: b,
          width: '1px',
          '&:hover': {
            width: '2px',
            height: '2px'
          }
        }
      });
    });
    it('should have correct output', function () {
      (0, _expect.default)(sheet.getRule('a')).to.not.be(undefined);
      (0, _expect.default)(sheet.toString()).to.be('.a-id {\n' + '  width: 1px;\n' + '}\n' + '.a-id:hover {\n' + '  float: left;\n' + '  width: 2px;\n' + '  height: 2px;\n' + '}');
    });
  });
  describe('deep nested extend', function () {
    var sheet;
    beforeEach(function () {
      var a = {
        '&:hover': {
          width: '5px',
          height: '5px'
        },
        border: {
          width: '3px'
        }
      };
      var b = {
        extend: a,
        '&:hover': {
          width: '4px'
        },
        border: {
          color: 'blue'
        }
      };
      var c = {
        extend: b,
        '&:hover': {
          height: '2px'
        }
      };
      var d = {
        extend: c,
        '&:hover': {
          width: '2px'
        }
      };
      sheet = jss.createStyleSheet({
        a: {
          extend: d,
          width: '2px',
          border: {
            width: '1px',
            color: 'red',
            style: 'solid'
          },
          '&:hover': {
            color: 'red'
          }
        }
      });
    });
    it('should have correct output', function () {
      (0, _expect.default)(sheet.getRule('a')).to.not.be(undefined);
      (0, _expect.default)(sheet.toString()).to.be('.a-id {\n' + '  width: 2px;\n' + '  border-width: 1px;\n' + '  border-style: solid;\n' + '  border-color: red;\n' + '}\n' + '.a-id:hover {\n' + '  width: 2px;\n' + '  height: 2px;\n' + '  color: red;\n' + '}');
    });
  });
  describe('multi child extend with css state', function () {
    var sheet;
    beforeEach(function () {
      sheet = jss.createStyleSheet({
        base: {
          '&:hover': {
            width: '1px'
          }
        },
        child1: {
          extend: 'base',
          '&:hover': {
            width: '5px'
          }
        },
        child2: {
          extend: 'base'
        }
      });
    });
    it('should have correct output', function () {
      (0, _expect.default)(sheet.getRule('base')).to.not.be(undefined);
      (0, _expect.default)(sheet.getRule('child1')).to.not.be(undefined);
      (0, _expect.default)(sheet.getRule('child2')).to.not.be(undefined);
      (0, _expect.default)(sheet.toString()).to.be('.base-id:hover {\n' + '  width: 1px;\n' + '}\n' + '.child1-id:hover {\n' + '  width: 5px;\n' + '}\n' + '.child2-id:hover {\n' + '  width: 1px;\n' + '}');
    });
  });
  describe('extend using rule name', function () {
    var sheet;
    beforeEach(function () {
      sheet = jss.createStyleSheet({
        a: {
          float: 'left'
        },
        b: {
          extend: 'a',
          width: '1px'
        }
      });
    });
    it('should have correct output', function () {
      (0, _expect.default)(sheet.getRule('a')).to.not.be(undefined);
      (0, _expect.default)(sheet.getRule('b')).to.not.be(undefined);
      (0, _expect.default)(sheet.toString()).to.be('.a-id {\n' + '  float: left;\n' + '}\n' + '.b-id {\n' + '  float: left;\n' + '  width: 1px;\n' + '}');
    });
  });
  describe('extend value with fallbacks', function () {
    var sheet;
    beforeEach(function () {
      sheet = jss.createStyleSheet({
        a: {
          color: 'blue',
          fallbacks: {
            color: 'green'
          }
        },
        b: {
          extend: 'a',
          float: 'left'
        }
      });
    });
    it('should have correct output', function () {
      (0, _expect.default)(sheet.toString()).to.be((0, _commonTags.stripIndent)(_templateObject()));
    });
  });
  describe('extend using rule name with cyclic warning', function () {
    var sheet;
    beforeEach(function () {
      sheet = jss.createStyleSheet({
        a: {
          extend: 'a',
          width: '1px'
        }
      });
    });
    it('error if extend using same rule name', function () {
      (0, _expect.default)(spy.callCount).to.be(1);
      (0, _expect.default)(spy.calledWithExactly('Warning: [JSS] A rule tries to extend itself \n.a-id {\n  extend: a;\n  width: 1px;\n}')).to.be(true);
      (0, _expect.default)(sheet.getRule('a')).to.not.be(undefined);
      (0, _expect.default)(sheet.toString()).to.be('.a-id {\n  width: 1px;\n}');
    });
  });
  describe('extend inside of a function rule', function () {
    var sheet;
    beforeEach(function () {
      var styles = {
        a: function a(data) {
          return {
            extend: data.redContainer,
            height: '200px'
          };
        }
      };
      sheet = jss.createStyleSheet(styles, {
        link: true
      }).attach();
      sheet.update({
        redContainer: {
          background: 'red'
        }
      });
    });
    it('should have correct output', function () {
      (0, _expect.default)(sheet.getRule('a')).to.not.be(undefined);
      (0, _expect.default)(sheet.toString()).to.be('.a-id {\n  background: red;\n  height: 200px;\n}');
    });
  });
  describe('extend function', function () {
    var sheet;
    beforeEach(function () {
      var b = {
        display: 'block'
      };
      sheet = jss.createStyleSheet({
        a: {
          extend: function extend(data) {
            return data.block && b;
          },
          color: 'red',
          '& span': {
            extend: function extend(data) {
              return data.block && b;
            },
            color: 'blue'
          }
        }
      });
    });
    it('should have correct output', function () {
      (0, _expect.default)(sheet.getRule('a')).to.not.be(undefined);
      sheet.update({
        block: true
      });
      (0, _expect.default)(sheet.toString()).to.be('.a-id {\n' + '  color: red;\n' + '  display: block;\n' + '}\n' + '.a-id span {\n' + '  color: blue;\n' + '  display: block;\n' + '}');
      sheet.update({
        block: false
      });
      (0, _expect.default)(sheet.toString()).to.be('.a-id {\n  color: red;\n}\n.a-id span {\n  color: blue;\n}');
    });
  });
});