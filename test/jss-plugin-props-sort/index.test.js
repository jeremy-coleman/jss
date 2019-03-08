"use strict";

var _expect = _interopRequireDefault(require("expect.js"));

var _jss = require("jss");

var _index = _interopRequireDefault(require("./index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var settings = {
  createGenerateId: function createGenerateId() {
    return function (rule) {
      return rule.key + "-id";
    };
  }
};
describe('jss-plugin-props-sort', function () {
  var jss;
  beforeEach(function () {
    jss = (0, _jss.create)(settings).use((0, _index.default)());
  });
  describe('sort props by length', function () {
    var sheet;
    beforeEach(function () {
      sheet = jss.createStyleSheet({
        a: {
          'border-left': '1px',
          border: '3px'
        }
      });
    });
    it('should have a rule', function () {
      (0, _expect.default)(sheet.getRule('a')).to.not.be(undefined);
    });
    it('should generate correct CSS', function () {
      (0, _expect.default)(sheet.toString()).to.be('.a-id {\n  border: 3px;\n  border-left: 1px;\n}');
    });
  });
  describe('leave non-style rules unchanged', function () {
    describe('@font-face', function () {
      var sheet;
      beforeEach(function () {
        sheet = jss.createStyleSheet({
          '@font-face': {
            'font-family': 'MyHelvetica',
            src: 'local("Helvetica")'
          }
        });
      });
      it('should generate correct CSS', function () {
        (0, _expect.default)(sheet.toString()).to.be('@font-face {\n  font-family: MyHelvetica;\n  src: local("Helvetica");\n}');
      });
    });
    describe('@media', function () {
      var sheet;
      beforeEach(function () {
        sheet = jss.createStyleSheet({
          '@media print': {
            a: {
              'border-left': '1px',
              border: '3px'
            }
          }
        });
      });
      it('should generate correct CSS', function () {
        (0, _expect.default)(sheet.toString()).to.be('@media print {\n  .a-id {\n    border: 3px;\n    border-left: 1px;\n  }\n}');
      });
    });
  });
});