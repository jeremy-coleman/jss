"use strict";

var _expect = _interopRequireDefault(require("expect.js"));

var _jss = require("jss");

var _sinon = _interopRequireDefault(require("sinon"));

var _ = _interopRequireDefault(require("."));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var settings = {
  createGenerateId: function createGenerateId() {
    return function (rule) {
      return rule.key + "-id";
    };
  }
};
describe('jss-plugin-compose', function () {
  var jss;
  var spy;
  beforeEach(function () {
    spy = _sinon.default.spy(console, 'warn');
    jss = (0, _jss.create)(settings).use((0, _.default)());
  });
  afterEach(function () {
    console.warn.restore();
  });
  describe('Ref composition', function () {
    var sheet;
    beforeEach(function () {
      sheet = jss.createStyleSheet({
        a: {
          float: 'left'
        },
        b: {
          composes: '$a',
          color: 'red'
        }
      });
    });
    afterEach(function () {
      (0, _expect.default)(spy.callCount).to.be(0);
    });
    it('should add rules', function () {
      (0, _expect.default)(sheet.getRule('a')).to.not.be(undefined);
      (0, _expect.default)(sheet.getRule('b')).to.not.be(undefined);
    });
    it('should compose classes', function () {
      (0, _expect.default)(sheet.classes.b).to.be('b-id a-id');
    });
    it('should generate correct CSS', function () {
      (0, _expect.default)(sheet.toString()).to.be('.a-id {\n  float: left;\n}\n.b-id {\n  color: red;\n}');
    });
  });
  describe('Global class composition', function () {
    var sheet;
    beforeEach(function () {
      sheet = jss.createStyleSheet({
        a: {
          composes: 'b',
          color: 'red'
        }
      });
    });
    afterEach(function () {
      (0, _expect.default)(spy.callCount).to.be(0);
    });
    it('should compose classes', function () {
      (0, _expect.default)(sheet.classes.a).to.be('a-id b');
    });
    it('should generate correct CSS', function () {
      (0, _expect.default)(sheet.toString()).to.be('.a-id {\n  color: red;\n}');
    });
  });
  describe('Array of refs composition', function () {
    var sheet;
    beforeEach(function () {
      sheet = jss.createStyleSheet({
        a: {
          float: 'left'
        },
        b: {
          color: 'red'
        },
        c: {
          background: 'blue'
        },
        d: {
          composes: ['$a', '$b', '$c'],
          border: 'none'
        },
        e: {
          composes: '$a $b $c',
          border: 'none'
        },
        f: {
          composes: ['$a', ['$b', '$c']],
          border: 'none'
        }
      });
    });
    afterEach(function () {
      (0, _expect.default)(spy.callCount).to.be(0);
    });
    it('should add rules', function () {
      (0, _expect.default)(sheet.getRule('a')).to.not.be(undefined);
      (0, _expect.default)(sheet.getRule('b')).to.not.be(undefined);
      (0, _expect.default)(sheet.getRule('c')).to.not.be(undefined);
      (0, _expect.default)(sheet.getRule('d')).to.not.be(undefined);
      (0, _expect.default)(sheet.getRule('e')).to.not.be(undefined);
      (0, _expect.default)(sheet.getRule('f')).to.not.be(undefined);
    });
    it('should compose classes', function () {
      (0, _expect.default)(sheet.classes.d).to.be('d-id a-id b-id c-id');
      (0, _expect.default)(sheet.classes.e).to.be('e-id a-id b-id c-id');
      (0, _expect.default)(sheet.classes.f).to.be('f-id a-id b-id c-id');
    });
    it('should generate correct CSS', function () {
      (0, _expect.default)(sheet.toString()).to.be('.a-id {\n' + '  float: left;\n' + '}\n' + '.b-id {\n' + '  color: red;\n' + '}\n' + '.c-id {\n' + '  background: blue;\n' + '}\n' + '.d-id {\n' + '  border: none;\n' + '}\n' + '.e-id {\n' + '  border: none;\n' + '}\n' + '.f-id {\n' + '  border: none;\n' + '}');
    });
  });
  describe('Mixed composition', function () {
    var sheet;
    beforeEach(function () {
      sheet = jss.createStyleSheet({
        a: {
          float: 'left'
        },
        b: {
          composes: ['$a', 'c', 'd'],
          color: 'red'
        },
        e: {
          composes: '$a c d',
          color: 'red'
        }
      });
    });
    afterEach(function () {
      (0, _expect.default)(spy.callCount).to.be(0);
    });
    it('should add rules', function () {
      (0, _expect.default)(sheet.getRule('a')).to.not.be(undefined);
      (0, _expect.default)(sheet.getRule('b')).to.not.be(undefined);
      (0, _expect.default)(sheet.getRule('e')).to.not.be(undefined);
    });
    it('should compose classes', function () {
      (0, _expect.default)(sheet.classes.b).to.be('b-id a-id c d');
      (0, _expect.default)(sheet.classes.e).to.be('e-id a-id c d');
    });
    it('should generate correct CSS', function () {
      (0, _expect.default)(sheet.toString()).to.be('.a-id {\n' + '  float: left;\n' + '}\n' + '.b-id {\n' + '  color: red;\n' + '}\n' + '.e-id {\n' + '  color: red;\n' + '}');
    });
  });
  describe('Nested compositions (compose composed)', function () {
    var sheet;
    beforeEach(function () {
      sheet = jss.createStyleSheet({
        a: {
          float: 'left'
        },
        b: {
          composes: ['$a', 'd'],
          color: 'red'
        },
        c: {
          composes: ['$b'],
          background: 'blue'
        }
      });
    });
    afterEach(function () {
      (0, _expect.default)(spy.callCount).to.be(0);
    });
    it('should add rules', function () {
      (0, _expect.default)(sheet.getRule('a')).to.not.be(undefined);
      (0, _expect.default)(sheet.getRule('b')).to.not.be(undefined);
      (0, _expect.default)(sheet.getRule('c')).to.not.be(undefined);
    });
    it('should compose classes', function () {
      (0, _expect.default)(sheet.classes.b).to.be('b-id a-id d');
      (0, _expect.default)(sheet.classes.c).to.be('c-id b-id a-id d');
    });
    it('should generate correct CSS', function () {
      (0, _expect.default)(sheet.toString()).to.be('.a-id {\n' + '  float: left;\n' + '}\n' + '.b-id {\n' + '  color: red;\n' + '}\n' + '.c-id {\n' + '  background: blue;\n' + '}');
    });
  });
  describe('Warnings', function () {
    it('should warn when rule try to compose itself', function () {
      jss.createStyleSheet({
        a: {
          composes: ['$a'],
          color: 'red'
        }
      });
      (0, _expect.default)(spy.callCount).to.be(1);
      (0, _expect.default)(spy.calledWithExactly('Warning: [JSS] Cyclic composition detected. \n' + '.a-id {\n' + '  composes: $a;\n' + '  color: red;\n' + '}')).to.be(true);
    });
    it("should warn when try to compose ref which can't be resolved", function () {
      jss.createStyleSheet({
        a: {
          composes: ['$b'],
          color: 'red'
        }
      });
      (0, _expect.default)(spy.callCount).to.be(1);
      (0, _expect.default)(spy.calledWithExactly('Warning: [JSS] Referenced rule is not defined. \n.a-id {\n  composes: $b;\n  color: red;\n}')).to.be(true);
    });
  });
});