"use strict";

var _expect = _interopRequireDefault(require("expect.js"));

var _jss = require("jss");

var _index = _interopRequireDefault(require("./index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('jss-plugin-cache', function () {
  var jss;
  beforeEach(function () {
    jss = (0, _jss.create)().use((0, _index.default)());
  });
  describe('ensure cache is used', function () {
    it('should not call onCreateRule', function () {
      var styles = {
        a: {
          color: 'red'
        }
      };
      var onCreateRuleCalled = false; // After the first call its cached.

      jss.createStyleSheet(styles);
      jss.use({
        onCreateRule: function onCreateRule() {
          onCreateRuleCalled = true;
        }
      });
      jss.createStyleSheet(styles);
      (0, _expect.default)(onCreateRuleCalled).to.be(false);
    });
    it('should not call processors on a cached rule', function () {
      var styles = {
        a: {
          color: 'red'
        }
      };
      var onProcessRuleCalled = false; // After the first call its cached.

      jss.createStyleSheet(styles);
      jss.use({
        onProcessRule: function onProcessRule() {
          onProcessRuleCalled = true;
        }
      });
      jss.createStyleSheet(styles);
      (0, _expect.default)(onProcessRuleCalled).to.be(false);
    });
  });
  describe('linked rules should not be cached', function () {
    it('should call onCreateRule', function () {
      var styles = {
        a: {
          color: 'red'
        }
      };
      var options = {
        link: true
      };
      var onCreateRuleCalled = false; // After the first call it should not be cached.

      jss.createStyleSheet(styles, options);
      jss.use({
        onCreateRule: function onCreateRule() {
          onCreateRuleCalled = true;
        }
      });
      jss.createStyleSheet(styles, options);
      (0, _expect.default)(onCreateRuleCalled).to.be(true);
    });
  });
});