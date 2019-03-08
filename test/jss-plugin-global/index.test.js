"use strict";

var _commonTags = require("common-tags");

var _expect = _interopRequireDefault(require("expect.js"));

var _jss = require("jss");

var _jssPluginNested = _interopRequireDefault(require("jss-plugin-nested"));

var _index = _interopRequireDefault(require("./index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject2() {
  var data = _taggedTemplateLiteralLoose(["\n        @keyframes a {\n          to {\n            width: 100%;\n          }\n        }\n      "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteralLoose(["\n        @keyframes a {\n          to {\n            width: 100%;\n          }\n        }\n      "]);

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
describe('jss-plugin-global', function () {
  var jss;
  beforeEach(function () {
    jss = (0, _jss.create)(settings).use((0, _index.default)());
  });
  describe('@global root container', function () {
    var sheet;
    beforeEach(function () {
      sheet = jss.createStyleSheet({
        '@global': {
          a: {
            color: 'red'
          },
          body: {
            color: 'green'
          }
        }
      });
    });
    it('should add rules', function () {
      (0, _expect.default)(sheet.getRule('@global')).to.not.be(undefined);
      (0, _expect.default)(sheet.getRule('a')).to.be(undefined);
      (0, _expect.default)(sheet.getRule('body')).to.be(undefined);
    });
    it('should generate correct CSS', function () {
      (0, _expect.default)(sheet.toString()).to.be('a {\n  color: red;\n}\nbody {\n  color: green;\n}');
    });
  });
  describe('@global linked', function () {
    var sheet;
    beforeEach(function () {
      sheet = jss.createStyleSheet({
        '@global': {
          a: {
            color: 'red'
          }
        },
        '@global b': {
          color: 'red'
        }
      }, {
        link: true
      }).attach();
    });
    afterEach(function () {
      sheet.detach();
    });
    it('should link inside container', function () {
      (0, _expect.default)(sheet.getRule('@global').getRule('a').renderable).to.not.be(undefined);
    });
    it('should link with prefix', function () {
      (0, _expect.default)(sheet.getRule('@global b').renderable).to.not.be(undefined);
    });
  });
  describe('@global root container with @keyframes', function () {
    var sheet;
    beforeEach(function () {
      sheet = jss.createStyleSheet({
        '@global': {
          '@keyframes a': {
            to: {
              width: '100%'
            }
          }
        }
      });
    });
    it('should add rules', function () {
      (0, _expect.default)(sheet.getRule('keyframes-a')).to.be(undefined);
    });
    it('should generate correct CSS', function () {
      (0, _expect.default)(sheet.toString()).to.be((0, _commonTags.stripIndent)(_templateObject()));
    });
  });
  describe('@global root prefix', function () {
    var sheet;
    beforeEach(function () {
      sheet = jss.createStyleSheet({
        '@global body': {
          color: 'red'
        }
      });
    });
    it('should add rules', function () {
      (0, _expect.default)(sheet.getRule('body')).to.be(undefined);
    });
    it('should generate correct CSS', function () {
      (0, _expect.default)(sheet.toString()).to.be('body {\n  color: red;\n}');
    });
  });
  describe('@global root prefix with keyframes', function () {
    var sheet;
    beforeEach(function () {
      sheet = jss.createStyleSheet({
        '@global @keyframes a': {
          to: {
            width: '100%'
          }
        }
      });
    });
    it('should add rules', function () {
      (0, _expect.default)(sheet.getRule('keyframes-a')).to.be(undefined);
    });
    it('should generate correct CSS', function () {
      (0, _expect.default)(sheet.toString()).to.be((0, _commonTags.stripIndent)(_templateObject2()));
    });
  });
  describe('@global scoped container', function () {
    var sheet;
    beforeEach(function () {
      sheet = jss.createStyleSheet({
        button: {
          float: 'left',
          '@global': {
            span: {
              color: 'red'
            }
          }
        }
      });
    });
    it('should add rules', function () {
      (0, _expect.default)(sheet.getRule('button')).to.not.be(undefined);
      (0, _expect.default)(sheet.getRule('.button-id span')).to.not.be(undefined);
    });
    it('should generate correct CSS', function () {
      (0, _expect.default)(sheet.toString()).to.be('.button-id {\n' + '  float: left;\n' + '}\n' + '.button-id span {\n' + '  color: red;\n' + '}');
    });
  });
  describe('@global scoped container with comma separated selectors', function () {
    var sheet;
    beforeEach(function () {
      sheet = jss.createStyleSheet({
        button: {
          float: 'left',
          '@global': {
            'a, b': {
              color: 'red'
            }
          }
        }
      });
    });
    it('should add rules', function () {
      (0, _expect.default)(sheet.getRule('button')).to.not.be(undefined);
      (0, _expect.default)(sheet.getRule('.button-id a, .button-id b')).to.not.be(undefined);
    });
    it('should generate correct CSS', function () {
      (0, _expect.default)(sheet.toString()).to.be('.button-id {\n' + '  float: left;\n' + '}\n' + '.button-id a, .button-id b {\n' + '  color: red;\n' + '}');
    });
  });
  describe('@global prefixed scoped rule', function () {
    var sheet;
    beforeEach(function () {
      sheet = jss.createStyleSheet({
        button: {
          float: 'left',
          '@global span': {
            color: 'red'
          }
        }
      });
    });
    it('should add rules', function () {
      (0, _expect.default)(sheet.getRule('button')).to.not.be(undefined);
      (0, _expect.default)(sheet.getRule('.button-id span')).to.not.be(undefined);
    });
    it('should generate correct CSS', function () {
      (0, _expect.default)(sheet.toString()).to.be('.button-id {\n' + '  float: left;\n' + '}\n' + '.button-id span {\n' + '  color: red;\n' + '}');
    });
  });
  describe('@global prefixed scoped rule with comma separate selectors', function () {
    var sheet;
    beforeEach(function () {
      sheet = jss.createStyleSheet({
        button: {
          float: 'left',
          '@global a, b': {
            color: 'red'
          }
        }
      });
    });
    it('should add rules', function () {
      (0, _expect.default)(sheet.getRule('button')).to.not.be(undefined);
      (0, _expect.default)(sheet.getRule('.button-id a, .button-id b')).to.not.be(undefined);
    });
    it('should generate correct CSS', function () {
      (0, _expect.default)(sheet.toString()).to.be('.button-id {\n' + '  float: left;\n' + '}\n' + '.button-id a, .button-id b {\n' + '  color: red;\n' + '}');
    });
  });
  describe('@global rules with null, undefined or empty value', function () {
    it('should generate correct CSS with prefix @global rules', function () {
      var sheet = jss.createStyleSheet({
        '@global a': undefined,
        '@global b': null
      });
      (0, _expect.default)(sheet.toString()).to.be('');
    });
    it('should generate correct CSS with @global container rule', function () {
      var sheet = jss.createStyleSheet({
        '@global': {
          a: null,
          b: undefined
        }
      });
      (0, _expect.default)(sheet.toString()).to.be('');
    });
  });
  describe('@global with nested rules inside', function () {
    var jss2;
    beforeEach(function () {
      jss2 = (0, _jss.create)({
        plugins: [(0, _index.default)(), (0, _jssPluginNested.default)()]
      });
    });
    it('should handle regular nested rules', function () {
      var sheet = jss2.createStyleSheet({
        '@global': {
          button: {
            color: 'red',
            '& span': {
              color: 'green'
            }
          }
        }
      });
      (0, _expect.default)(sheet.toString()).to.be('button {\n  color: red;\n}\nbutton span {\n  color: green;\n}');
    });
    it('should handle nested rules inside of a rule with comma separated selector', function () {
      var sheet = jss2.createStyleSheet({
        '@global': {
          'button, a': {
            color: 'red',
            '& span': {
              color: 'green'
            }
          }
        }
      });
      (0, _expect.default)(sheet.toString()).to.be('button, a {\n' + '  color: red;\n' + '}\n' + 'button span, a span {\n' + '  color: green;\n' + '}');
    });
    it('should handle regular deep nested rules', function () {
      var sheet = jss2.createStyleSheet({
        '@global': {
          button: {
            color: 'red',
            '& span': {
              color: 'green',
              '& b': {
                color: 'blue'
              }
            }
          }
        }
      });
      (0, _expect.default)(sheet.toString()).to.be('button {\n' + '  color: red;\n' + '}\n' + 'button span {\n' + '  color: green;\n' + '}\n' + 'button span b {\n' + '  color: blue;\n' + '}');
    });
    it('should handle nested conditional rules', function () {
      var sheet = jss2.createStyleSheet({
        '@global': {
          html: {
            color: 'red',
            '@media (max-width: 767px)': {
              color: 'green'
            }
          }
        }
      });
      (0, _expect.default)(sheet.toString()).to.be('html {\n' + '  color: red;\n' + '}\n' + '@media (max-width: 767px) {\n' + '  html {\n' + '    color: green;\n' + '  }\n' + '}');
    });
    it('should handle conditionals with nesting inside', function () {
      var sheet = jss2.createStyleSheet({
        '@global': {
          '@media (max-width: 767px)': {
            html: {
              color: 'red',
              '& button': {
                color: 'green'
              }
            }
          }
        }
      });
      (0, _expect.default)(sheet.toString()).to.be('@media (max-width: 767px) {\n' + '  html {\n' + '    color: red;\n' + '  }\n' + '  html button {\n' + '    color: green;\n' + '  }\n' + '}');
    });
  });
});