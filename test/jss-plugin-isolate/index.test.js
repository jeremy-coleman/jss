"use strict";

var _expect = _interopRequireDefault(require("expect.js"));

var _jss = require("jss");

var _jssPluginNested = _interopRequireDefault(require("jss-plugin-nested"));

var _index = _interopRequireDefault(require("./index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('jss-plugin-isolate', function () {
  var jss;
  beforeEach(function () {
    jss = (0, _jss.create)().use((0, _index.default)());
  });
  afterEach(function () {
    _jss.sheets.registry.forEach(function (sheet) {
      return sheet.detach();
    });

    _jss.sheets.reset();
  });
  describe('reset sheet is not created if there is nothing to reset', function () {
    beforeEach(function () {
      jss.createStyleSheet();
    });
    it('should have no reset sheets in registry', function () {
      (0, _expect.default)(_jss.sheets.registry.length).to.be(1);
    });
  });
  describe('ignores atRules', function () {
    beforeEach(function () {
      jss.createStyleSheet({
        '@media print': {},
        '@font-face': {
          'font-family': 'MyHelvetica',
          src: 'local("Helvetica")'
        },
        '@keyframes id': {
          from: {
            top: 0
          },
          '30%': {
            top: 30
          },
          '60%, 70%': {
            top: 80
          }
        },
        '@supports ( display: flexbox )': {}
      });
    });
    it('should have no reset sheets in registry', function () {
      (0, _expect.default)(_jss.sheets.registry.length).to.be(1);
    });
  });
  describe('works with classes', function () {
    var sheet;
    beforeEach(function () {
      sheet = jss.createStyleSheet({
        link: {
          color: 'red'
        },
        linkItem: {
          color: 'blue'
        }
      });
    });
    it('should add selectors to the reset rule', function () {
      var resetRule = _jss.sheets.registry[0].getRule('reset');

      (0, _expect.default)(resetRule.selector).to.contain(sheet.classes.linkItem);
      (0, _expect.default)(resetRule.selector).to.contain(sheet.classes.link);
    });
    it('should have expected reset props', function () {
      var resetRule = _jss.sheets.registry[0].getRule('reset');

      (0, _expect.default)(resetRule.prop('border-collapse')).to.be('separate');
      (0, _expect.default)(resetRule.prop('font-family')).to.be('initial');
    });
  });
  describe('works in multiple StyleSheets', function () {
    var sheet1;
    var sheet2;
    beforeEach(function () {
      sheet1 = jss.createStyleSheet({
        link: {
          color: 'red'
        }
      });
      sheet2 = jss.createStyleSheet({
        linkItem: {
          color: 'blue'
        }
      });
    });
    it('should add selectors to the reset rule', function () {
      var resetRule = _jss.sheets.registry[0].getRule('reset');

      (0, _expect.default)(resetRule.selector).to.contain(sheet1.classes.link);
      (0, _expect.default)(resetRule.selector).to.contain(sheet2.classes.linkItem);
    });
  });
  describe('global option "isolate"', function () {
    beforeEach(function () {
      jss = (0, _jss.create)().use((0, _index.default)({
        isolate: false
      }));
      jss.createStyleSheet({
        a: {
          color: 'blue'
        }
      });
    });
    it('should use global option', function () {
      (0, _expect.default)(_jss.sheets.registry[0].getRule('reset')).to.be(undefined);
    });
  });
  describe('ignores rules if they are ignored in StyleSheet options', function () {
    var sheet1;
    var sheet2;
    beforeEach(function () {
      sheet1 = jss.createStyleSheet({
        link: {
          color: 'red'
        }
      });
      sheet2 = jss.createStyleSheet({
        linkItem: {
          color: 'blue'
        }
      }, {
        isolate: false
      });
    });
    it('should not add selectors to the reset rule', function () {
      var resetRule = _jss.sheets.registry[0].getRule('reset');

      (0, _expect.default)(resetRule.selector).to.contain(sheet1.classes.link);
      (0, _expect.default)(resetRule.selector).not.to.contain(sheet2.classes.linkItem);
    });
  });
  describe('isolate rules if they have isolate: true even if StyleSheet options is isolate: false', function () {
    var sheet;
    beforeEach(function () {
      sheet = jss.createStyleSheet({
        link: {
          isolate: true,
          color: 'blue'
        }
      }, {
        isolate: false
      });
    });
    it('should add selectors to the reset rule', function () {
      var resetRule = _jss.sheets.registry[0].getRule('reset');

      (0, _expect.default)(resetRule.selector).to.contain(sheet.classes.link);
    });
  });
  describe('isolate option as a string', function () {
    var sheet;
    beforeEach(function () {
      sheet = jss.createStyleSheet({
        root: {
          color: 'blue'
        },
        a: {
          color: 'red'
        }
      }, {
        isolate: 'root'
      });
    });
    it('should only isolate rules with matching name', function () {
      var resetRule = _jss.sheets.registry[0].getRule('reset');

      (0, _expect.default)(resetRule.selector).to.contain(sheet.classes.root);
      (0, _expect.default)(resetRule.selector).not.to.contain(sheet.classes.a);
    });
  });
  describe('ignore rules if property isolate is set to false', function () {
    var sheet;
    beforeEach(function () {
      sheet = jss.createStyleSheet({
        link: {
          color: 'red'
        },
        linkItem: {
          color: 'blue',
          isolate: false
        }
      });
    });
    it('should add selectors to the reset rule', function () {
      var resetRule = _jss.sheets.registry[0].getRule('reset');

      (0, _expect.default)(resetRule.selector).to.contain(sheet.classes.link);
      (0, _expect.default)(resetRule.selector).not.to.contain(sheet.classes.linkItem);
    });
    it('should have expected reset props', function () {
      (0, _expect.default)(sheet.getRule('linkItem').prop('isolate')).to.be(undefined);
    });
  });
  describe("don't duplicate selectors", function () {
    var sheet;
    beforeEach(function () {
      sheet = jss.createStyleSheet({
        link: {
          color: 'blue'
        },
        '@media (min-width: 320px)': {
          link: {
            color: 'red'
          }
        }
      });
    });
    it('should add selectors to the reset rule', function () {
      var resetRule = _jss.sheets.registry[0].getRule('reset');

      (0, _expect.default)(resetRule.selector).to.be("." + sheet.classes.link);
    });
  });
  describe('option "reset={width}" with custom props', function () {
    beforeEach(function () {
      jss = (0, _jss.create)().use((0, _index.default)({
        reset: {
          width: '1px'
        }
      }));
      jss.createStyleSheet({
        a: {
          color: 'blue'
        }
      });
    });
    it('should add width prop to the reset rule', function () {
      var resetRule = _jss.sheets.registry[0].getRule('reset');

      (0, _expect.default)(resetRule.prop('width')).to.be('1px');
    });
  });
  describe('createRule()', function () {
    it('should not create reset sheet', function () {
      jss.createRule({
        color: 'red'
      });
      (0, _expect.default)(_jss.sheets.registry.length).to.be(0);
    });
    it('should not throw', function () {
      (0, _expect.default)(function () {
        jss.createRule({
          color: 'red'
        });
      }).to.not.throwException();
    });
  });
  describe('nested media queries with jss-plugin-nested', function () {
    var sheet;
    beforeEach(function () {
      jss = (0, _jss.create)().use((0, _index.default)(), (0, _jssPluginNested.default)());
      sheet = jss.createStyleSheet({
        link: {
          color: 'darksalmon',
          '@media (min-width: 320px)': {
            color: 'steelblue'
          }
        }
      });
    });
    it('should add selectors to the reset rule', function () {
      var resetRule = _jss.sheets.registry[0].getRule('reset');

      (0, _expect.default)(resetRule.selector).to.contain(sheet.classes.link);
    });
  });
  describe('nested media queries with jss-plugin-nested with isolate:false', function () {
    beforeEach(function () {
      jss = (0, _jss.create)().use((0, _index.default)(), (0, _jssPluginNested.default)());
      jss.createStyleSheet({
        link: {
          isolate: false,
          color: 'darksalmon',
          '@media (min-width: 320px)': {
            color: 'steelblue'
          }
        }
      });
    });
    it('should not add selectors to the reset rule', function () {
      var resetRule = _jss.sheets.registry[0].getRule('reset');

      (0, _expect.default)(resetRule).to.be(undefined);
    });
  });
});