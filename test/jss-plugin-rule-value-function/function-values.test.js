"use strict";

var _commonTags = require("common-tags");

var _expect = _interopRequireDefault(require("expect.js"));

var _jss = require("jss");

var _ = _interopRequireDefault(require("."));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject23() {
  var data = _taggedTemplateLiteralLoose(["\n        @keyframes keyframes-animateIn-id {}\n        @keyframes keyframes-animateOut-id {}\n        .a-id {\n          animation: keyframes-animateOut-id 5s;\n        }\n      "]);

  _templateObject23 = function _templateObject23() {
    return data;
  };

  return data;
}

function _templateObject22() {
  var data = _taggedTemplateLiteralLoose(["\n        @keyframes keyframes-animateIn-id {}\n        @keyframes keyframes-animateOut-id {}\n        .a-id {\n          animation: keyframes-animateIn-id 5s;\n        }\n      "]);

  _templateObject22 = function _templateObject22() {
    return data;
  };

  return data;
}

function _templateObject21() {
  var data = _taggedTemplateLiteralLoose(["\n        @keyframes keyframes-animateIn-id {}\n        @keyframes keyframes-animateOut-id {}\n        .a-id {\n          animation-name: keyframes-animateOut-id;\n        }\n      "]);

  _templateObject21 = function _templateObject21() {
    return data;
  };

  return data;
}

function _templateObject20() {
  var data = _taggedTemplateLiteralLoose(["\n        @keyframes keyframes-animateIn-id {}\n        @keyframes keyframes-animateOut-id {}\n        .a-id {\n          animation-name: keyframes-animateIn-id;\n        }\n      "]);

  _templateObject20 = function _templateObject20() {
    return data;
  };

  return data;
}

function _templateObject19() {
  var data = _taggedTemplateLiteralLoose(["\n          .a-id {\n            color: green;\n          }\n        "]);

  _templateObject19 = function _templateObject19() {
    return data;
  };

  return data;
}

function _templateObject18() {
  var data = _taggedTemplateLiteralLoose(["\n          .a-id {\n            color: green;\n          }\n        "]);

  _templateObject18 = function _templateObject18() {
    return data;
  };

  return data;
}

function _templateObject17() {
  var data = _taggedTemplateLiteralLoose(["\n          .a-id {}\n          @media all {\n            .b-id {  }\n          }\n          @keyframes keyframes-a-id {\n            0% {  }\n          }\n        "]);

  _templateObject17 = function _templateObject17() {
    return data;
  };

  return data;
}

function _templateObject16() {
  var data = _taggedTemplateLiteralLoose(["\n          .a-id {}\n          @media all {\n            .b-id {  }\n          }\n          @keyframes keyframes-a-id {\n            0% {  }\n          }\n        "]);

  _templateObject16 = function _templateObject16() {
    return data;
  };

  return data;
}

function _templateObject15() {
  var data = _taggedTemplateLiteralLoose(["\n          .a-id {}\n          @media all {\n            .b-id {  }\n          }\n          @keyframes keyframes-a-id {\n            0% {  }\n          }\n        "]);

  _templateObject15 = function _templateObject15() {
    return data;
  };

  return data;
}

function _templateObject14() {
  var data = _taggedTemplateLiteralLoose(["\n          .a-id {\n            color: green;\n          }\n          @media all {\n            .b-id {\n              color: yellow;\n            }\n          }\n          @keyframes keyframes-a-id {\n            0% {\n              color: yellow;\n            }\n          }\n        "]);

  _templateObject14 = function _templateObject14() {
    return data;
  };

  return data;
}

function _templateObject13() {
  var data = _taggedTemplateLiteralLoose(["\n          .a-id {\n            color: yellow;\n          }\n          @media all {\n            .b-id {\n              color: yellow;\n            }\n          }\n          @keyframes keyframes-a-id {\n            0% {\n              color: yellow;\n            }\n          }\n        "]);

  _templateObject13 = function _templateObject13() {
    return data;
  };

  return data;
}

function _templateObject12() {
  var data = _taggedTemplateLiteralLoose(["\n          .a-id {\n            color: green;\n          }\n          @media all {\n            .b-id {\n              color: green;\n            }\n          }\n          @keyframes keyframes-a-id {\n            0% {\n              color: green;\n            }\n          }\n        "]);

  _templateObject12 = function _templateObject12() {
    return data;
  };

  return data;
}

function _templateObject11() {
  var data = _taggedTemplateLiteralLoose(["\n          .a-id {}\n          @media all {\n            .b-id {  }\n          }\n          @keyframes keyframes-a-id {\n            0% {  }\n          }\n        "]);

  _templateObject11 = function _templateObject11() {
    return data;
  };

  return data;
}

function _templateObject10() {
  var data = _taggedTemplateLiteralLoose(["\n        .a-id {\n          color: red !important;\n        }\n      "]);

  _templateObject10 = function _templateObject10() {
    return data;
  };

  return data;
}

function _templateObject9() {
  var data = _taggedTemplateLiteralLoose(["\n        .a-id {\n          color: green;\n        }\n      "]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8() {
  var data = _taggedTemplateLiteralLoose(["\n        .a-id {\n          color: green !important;\n        }\n      "]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = _taggedTemplateLiteralLoose(["\n        .a-id {\n          color: blue !important;\n        }\n      "]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = _taggedTemplateLiteralLoose(["\n        .a-id {\n          color: blue !important;\n        }\n      "]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteralLoose(["\n        .a-id {\n          color: blue;\n        }\n      "]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteralLoose(["\n        .a-id {}\n      "]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteralLoose(["\n        .rule-id {\n          color: red;\n        }\n        .plugin-rule-id {\n          color: red;\n        }\n      "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteralLoose(["\n        .a-id {\n          color: red;\n        }\n      "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteralLoose(["\n        .a-id {}\n      "]);

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
describe('jss-plugin-rule-value-function: Function values', function () {
  var jss;
  beforeEach(function () {
    jss = (0, _jss.create)(settings).use((0, _.default)());
  });
  describe('.addRule() with @media with function values', function () {
    var sheet;
    beforeEach(function () {
      sheet = jss.createStyleSheet({}, {
        link: true
      }).attach();
      sheet.addRule('@media screen', {
        b: {
          color: function color(props) {
            return props.primary ? 'black' : 'white';
          }
        }
      });
    });
    afterEach(function () {
      sheet.detach();
    });
  });
  describe('.addRule() with function values and attached sheet', function () {
    var sheet;
    beforeEach(function () {
      sheet = jss.createStyleSheet(null, {
        link: true
      }).attach();
      sheet.addRule('a', {
        color: function color(_ref) {
          var _color = _ref.color;
          return _color;
        }
      });
    });
    afterEach(function () {
      sheet.detach();
    });
    it('should render an empty rule', function () {
      (0, _expect.default)(sheet.toString()).to.be((0, _commonTags.stripIndent)(_templateObject()));
    });
    it('should render rule with updated color', function () {
      sheet.update({
        color: 'red'
      });
      (0, _expect.default)(sheet.toString()).to.be((0, _commonTags.stripIndent)(_templateObject2()));
    });
  });
  describe('.addRule() with function values for rules from plugins queue', function () {
    var sheet;
    beforeEach(function () {
      jss.use({
        onProcessRule: function onProcessRule(rule, ruleSheet) {
          var ruleName = 'plugin-rule';
          if (rule.key === ruleName) return;
          ruleSheet.addRule(ruleName, {
            color: function color(props) {
              return props.color;
            }
          });
        }
      });
      sheet = jss.createStyleSheet({}, {
        link: true
      }).attach();
    });
    afterEach(function () {
      sheet.detach();
    });
    it('should render color for rule by plugin', function () {
      sheet.addRule('rule', {
        color: function color(props) {
          return props.color;
        }
      });
      sheet.update({
        color: 'red'
      });
      (0, _expect.default)(sheet.toString()).to.be((0, _commonTags.stripIndent)(_templateObject3()));
    });
  });
  describe('.addRule() with arrays returned from function values', function () {
    var sheet;
    beforeEach(function () {
      sheet = jss.createStyleSheet(null, {
        link: true
      }).attach();
      sheet.addRule('a', {
        color: function color(_ref2) {
          var _color2 = _ref2.color;
          return _color2;
        }
      });
    });
    afterEach(function () {
      sheet.detach();
    });
    it('should render an empty rule', function () {
      (0, _expect.default)(sheet.toString()).to.be((0, _commonTags.stripIndent)(_templateObject4()));
    });
    it('should return correct CSS from an array with a single value', function () {
      sheet.update({
        color: ['blue']
      });
      (0, _expect.default)(sheet.toString()).to.be((0, _commonTags.stripIndent)(_templateObject5()));
    });
    it('should return correct CSS from a double array with !important', function () {
      sheet.update({
        color: [['blue'], '!important']
      });
      (0, _expect.default)(sheet.toString()).to.be((0, _commonTags.stripIndent)(_templateObject6()));
    });
    it('should return correct CSS from an array with !important', function () {
      sheet.update({
        color: ['blue', '!important']
      });
      (0, _expect.default)(sheet.toString()).to.be((0, _commonTags.stripIndent)(_templateObject7()));
    });
    it('should return a property value from the CSSOM getPropertyValue function of "green" with important', function () {
      sheet.update({
        color: [['green'], '!important']
      });
      (0, _expect.default)(sheet.toString()).to.be((0, _commonTags.stripIndent)(_templateObject8()));
    });
    it('should return a property value from the CSSOM getPropertyValue function of "green"', function () {
      sheet.update({
        color: ['green']
      });
      (0, _expect.default)(sheet.toString()).to.be((0, _commonTags.stripIndent)(_templateObject9()));
    });
    it('should return a correct priority', function () {
      sheet.update({
        color: [['red'], '!important']
      });
      (0, _expect.default)(sheet.toString()).to.be((0, _commonTags.stripIndent)(_templateObject10()));
    });
  });
  describe('sheet.update()', function () {
    var sheet;
    var styles = {
      a: {
        color: function color(theme) {
          return theme.color;
        }
      },
      '@media all': {
        b: {
          color: function color(theme) {
            return theme.color;
          }
        }
      },
      '@keyframes a': {
        '0%': {
          color: function color(theme) {
            return theme.color;
          }
        }
      }
    };
    beforeEach(function () {
      sheet = jss.createStyleSheet(styles, {
        link: true
      });
    });
    afterEach(function () {
      sheet.detach();
    });
    describe('.toString()', function () {
      it('should return correct .toString() before .update()', function () {
        (0, _expect.default)(sheet.toString()).to.be((0, _commonTags.stripIndent)(_templateObject11()));
      });
      it('should return correct .toString() after single .update()', function () {
        sheet.update({
          color: 'green'
        });
        (0, _expect.default)(sheet.toString()).to.be((0, _commonTags.stripIndent)(_templateObject12()));
      });
      it('should return correct .toString() after double .update()', function () {
        sheet.update({
          color: 'green'
        });
        sheet.update({
          color: 'yellow'
        });
        (0, _expect.default)(sheet.toString()).to.be((0, _commonTags.stripIndent)(_templateObject13()));
      });
      it('should update specific rule', function () {
        sheet.update({
          color: 'yellow'
        });
        sheet.update('a', {
          color: 'green'
        });
        (0, _expect.default)(sheet.toString()).to.be((0, _commonTags.stripIndent)(_templateObject14()));
      });
      it('should remove declarations when value is null', function () {
        sheet.update({
          color: null
        });
        (0, _expect.default)(sheet.toString()).to.be((0, _commonTags.stripIndent)(_templateObject15()));
      });
      it('should remove declarations when value is undefined', function () {
        sheet.update({
          color: undefined
        });
        (0, _expect.default)(sheet.toString()).to.be((0, _commonTags.stripIndent)(_templateObject16()));
      });
      it('should remove declarations when value is false', function () {
        sheet.update({
          color: false
        });
        (0, _expect.default)(sheet.toString()).to.be((0, _commonTags.stripIndent)(_templateObject17()));
      });
    });
    describe('sheet.update() after attach', function () {
      beforeEach(function () {
        sheet = jss.createStyleSheet({
          a: {
            color: function color(theme) {
              return theme.color;
            }
          }
        }, {
          link: true
        });
      });
      it('should render sheet with updated props after attach', function () {
        sheet.attach().update({
          color: 'green'
        });
        (0, _expect.default)(sheet.toString()).to.be((0, _commonTags.stripIndent)(_templateObject18()));
      });
      it('should render updated rule after attach', function () {
        sheet.attach().update('a', {
          color: 'green'
        });
        (0, _expect.default)(sheet.toString()).to.be((0, _commonTags.stripIndent)(_templateObject19()));
      });
    });
  });
  describe('keyframe names', function () {
    it('should work with animation-name', function () {
      var sheet = jss.createStyleSheet({
        '@keyframes animateIn': {},
        '@keyframes animateOut': {},
        a: {
          'animation-name': function animationName(_ref3) {
            var name = _ref3.name;
            return name;
          }
        }
      });
      sheet.update({
        name: '$animateIn'
      });
      (0, _expect.default)(sheet.toString()).to.be((0, _commonTags.stripIndent)(_templateObject20()));
      sheet.update({
        name: '$animateOut'
      });
      (0, _expect.default)(sheet.toString()).to.be((0, _commonTags.stripIndent)(_templateObject21()));
    });
    it('should work with animation prop', function () {
      var sheet = jss.createStyleSheet({
        '@keyframes animateIn': {},
        '@keyframes animateOut': {},
        a: {
          animation: function animation(_ref4) {
            var name = _ref4.name;
            return name + " 5s";
          }
        }
      });
      sheet.update({
        name: '$animateIn'
      });
      (0, _expect.default)(sheet.toString()).to.be((0, _commonTags.stripIndent)(_templateObject22()));
      sheet.update({
        name: '$animateOut'
      });
      (0, _expect.default)(sheet.toString()).to.be((0, _commonTags.stripIndent)(_templateObject23()));
    });
  });
  describe('rule.toJSON()', function () {
    it('should handle function values', function () {
      var sheet = jss.createStyleSheet({
        a: {
          color: function color() {
            return 'red';
          }
        }
      });
      sheet.update();
      (0, _expect.default)(sheet.getRule('a').toJSON()).to.eql({
        color: 'red'
      });
    });
  });
});