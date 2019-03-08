"use strict";

var _expect = _interopRequireDefault(require("expect.js"));

var _zenObservable = _interopRequireDefault(require("zen-observable"));

var _jss = require("jss");

var _jssPluginRuleValueObservable = _interopRequireDefault(require("jss-plugin-rule-value-observable"));

var _ = _interopRequireDefault(require("."));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var settings = {
  createGenerateId: function createGenerateId() {
    return function (rule) {
      return rule.key + "-id";
    };
  }
};
describe('jss-plugin-expand', function () {
  var jss;
  beforeEach(function () {
    jss = (0, _jss.create)(settings).use((0, _.default)());
  });
  describe('space-separated values as arrays', function () {
    var sheet;
    beforeEach(function () {
      sheet = jss.createStyleSheet({
        a: {
          padding: [20, 10],
          'background-size': [10, 'auto'],
          'border-radius': [10, 15, 20, 20]
        }
      });
    });
    it('should add rules', function () {
      (0, _expect.default)(sheet.getRule('a')).to.not.be(undefined);
    });
    it('should generate correct CSS', function () {
      (0, _expect.default)(sheet.toString()).to.be('.a-id {\n' + '  padding: 20 10;\n' + '  background-size: 10 auto;\n' + '  border-radius: 10 15 20 20;\n' + '}');
    });
  });
  describe('comma-separated values as arrays (using double arrays)', function () {
    var sheet;
    beforeEach(function () {
      sheet = jss.createStyleSheet({
        a: {
          transition: [['opacity', 1, 'linear'], ['transform', 300, 'ease']]
        }
      });
    });
    it('should add rules', function () {
      (0, _expect.default)(sheet.getRule('a')).to.not.be(undefined);
    });
    it('should generate correct CSS', function () {
      (0, _expect.default)(sheet.toString()).to.be('.a-id {\n  transition: opacity 1 linear, transform 300 ease;\n}');
    });
  });
  describe('simple expanded rules', function () {
    var sheet;
    beforeEach(function () {
      sheet = jss.createStyleSheet({
        a: {
          border: {
            width: 1,
            style: 'solid',
            color: '#f00'
          }
        }
      });
    });
    it('should add rules', function () {
      (0, _expect.default)(sheet.getRule('a')).to.not.be(undefined);
    });
    it('should generate correct CSS', function () {
      (0, _expect.default)(sheet.toString()).to.be('.a-id {\n' + '  border-width: 1;\n' + '  border-style: solid;\n' + '  border-color: #f00;\n' + '}');
    });
  });
  describe('expanded rules multiple objects as entry', function () {
    var sheet;
    beforeEach(function () {
      sheet = jss.createStyleSheet({
        a: {
          transition: [{
            property: 'all',
            delay: 2,
            duration: 5,
            timingFunction: 'linear'
          }, {
            property: 'opacity',
            duration: 1
          }]
        }
      });
    });
    it('should add rules', function () {
      (0, _expect.default)(sheet.getRule('a')).to.not.be(undefined);
    });
    it('should generate correct CSS', function () {
      (0, _expect.default)(sheet.toString()).to.be('.a-id {\n  transition: all 5 linear 2, opacity 1;\n}');
    });
  });
  describe('expanded rules as an object (without some styles)', function () {
    var sheet;
    beforeEach(function () {
      sheet = jss.createStyleSheet({
        a: {
          background: {
            color: '#000',
            image: 'url(test.jpg)',
            position: [0, 0],
            repeat: 'no-repeat'
          }
        }
      });
    });
    it('should add rules', function () {
      (0, _expect.default)(sheet.getRule('a')).to.not.be(undefined);
    });
    it('should generate correct CSS', function () {
      (0, _expect.default)(sheet.toString()).to.be('.a-id {\n' + '  background: #000 0 0 no-repeat;\n' + '  background-image: url(test.jpg);\n' + '}');
    });
  });
  describe('expand with fallbacks', function () {
    var sheet;
    beforeEach(function () {
      sheet = jss.createStyleSheet({
        a: {
          background: {
            color: 'rgba(255, 255, 255, 0.8)'
          },
          padding: 50,
          fallbacks: {
            background: {
              color: 'white'
            },
            padding: 20
          }
        }
      });
    });
    it('should add rules', function () {
      (0, _expect.default)(sheet.getRule('a')).to.not.be(undefined);
    });
    it('should generate correct CSS', function () {
      (0, _expect.default)(sheet.toString()).to.be('.a-id {\n' + '  background: white;\n' + '  padding: 20;\n' + '  background: rgba(255, 255, 255, 0.8);\n' + '  padding: 50;\n' + '}');
    });
  });
  describe('expand with multiple fallbacks for the same prop', function () {
    var sheet;
    beforeEach(function () {
      sheet = jss.createStyleSheet({
        a: {
          background: 'linear-gradient(red 0%, green 100%)',
          fallbacks: [{
            background: 'red'
          }, {
            background: {
              color: 'url(test.png)',
              repeat: 'no-repeat',
              position: [0, 0]
            }
          }]
        }
      });
    });
    it('should add rules', function () {
      (0, _expect.default)(sheet.getRule('a')).to.not.be(undefined);
    });
    it('should generate correct CSS', function () {
      (0, _expect.default)(sheet.toString()).to.be('.a-id {\n' + '  background: red;\n' + '  background: url(test.png) 0 0 no-repeat;\n' + '  background: linear-gradient(red 0%, green 100%);\n' + '}');
    });
  });
  describe('expand with fallbacks and custom properties', function () {
    var sheet;
    beforeEach(function () {
      sheet = jss.createStyleSheet({
        a: {
          background: {
            image: 'linear-gradient(red 0%, green 100%)',
            size: [10, 20]
          },
          fallbacks: {
            background: {
              image: 'url(gradient.png)',
              size: 'auto'
            }
          }
        }
      });
    });
    it('should add rules', function () {
      (0, _expect.default)(sheet.getRule('a')).to.not.be(undefined);
    });
    it('should generate correct CSS', function () {
      (0, _expect.default)(sheet.toString()).to.be('.a-id {\n' + '  background-size: auto;\n' + '  background-image: url(gradient.png);\n' + '  background-size: 10 20;\n' + '  background-image: linear-gradient(red 0%, green 100%);\n' + '}');
    });
  });
  describe('integration with jss-plugin-camel-case', function () {
    var sheet;
    beforeEach(function () {
      sheet = jss.createStyleSheet({
        a: {
          transition: {
            timingFunction: 'linear',
            delay: '300ms',
            property: 'opacity',
            duration: '200ms'
          }
        }
      });
    });
    it('should add rules', function () {
      (0, _expect.default)(sheet.getRule('a')).to.not.be(undefined);
    });
    it('should generate correct CSS', function () {
      (0, _expect.default)(sheet.toString()).to.be('.a-id {\n  transition: opacity 200ms linear 300ms;\n}');
    });
  });
  describe('non-standart properties support', function () {
    var sheet;
    beforeEach(function () {
      sheet = jss.createStyleSheet({
        a: {
          border: {
            width: ['2px', '3px'],
            style: 'solid',
            color: 'black',
            radius: ['5px', '10px']
          }
        }
      });
    });
    it('should add rules', function () {
      (0, _expect.default)(sheet.getRule('a')).to.not.be(undefined);
    });
    it('should generate correct CSS', function () {
      (0, _expect.default)(sheet.toString()).to.be('.a-id {\n' + '  border-radius: 5px 10px;\n' + '  border-width: 2px 3px;\n' + '  border-style: solid;\n' + '  border-color: black;\n' + '}');
    });
  });
  describe('non-standart properties should not overwrite standart properties notation', function () {
    var sheet;
    beforeEach(function () {
      sheet = jss.createStyleSheet({
        a: {
          border: {
            radius: ['5px', '10px']
          },
          'border-radius': '10px'
        }
      });
    });
    it('should add rules', function () {
      (0, _expect.default)(sheet.getRule('a')).to.not.be(undefined);
    });
    it('should generate correct CSS', function () {
      (0, _expect.default)(sheet.toString()).to.be('.a-id {\n  border-radius: 10px;\n}');
    });
  });
  describe('gracefully handle invalid values', function () {
    var sheet;
    beforeEach(function () {
      sheet = jss.createStyleSheet({
        a: {
          padding: [],
          // Empty: incorrect, to ignore
          color: '',
          margin: 0,
          'border-radius': '10px' // Still one correct value

        },
        p: {
          margin: [] // Will lead to empty rule, eliminated

        }
      });
    });
    it('should add rules', function () {
      (0, _expect.default)(sheet.getRule('a')).to.not.be(undefined);
    });
    it('should generate correct CSS', function () {
      (0, _expect.default)(sheet.toString()).to.be('.a-id {\n  margin: 0;\n  border-radius: 10px;\n}');
    });
  });
  describe('support observable value', function () {
    var sheet;
    beforeEach(function () {
      jss.use((0, _jssPluginRuleValueObservable.default)());
      sheet = jss.createStyleSheet({
        a: {
          width: new _zenObservable.default(function (observer) {
            observer.next(1);
          })
        }
      });
    });
    it('should generate correct CSS', function () {
      (0, _expect.default)(sheet.toString()).to.be('.a-id {\n  width: 1;\n}');
    });
  });
});