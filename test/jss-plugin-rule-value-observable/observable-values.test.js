"use strict";

var _expect = _interopRequireDefault(require("expect.js"));

var _commonTags = require("common-tags");

var _zenObservable = _interopRequireDefault(require("zen-observable"));

var _jss = require("jss");

var _jssPluginDefaultUnit = _interopRequireDefault(require("jss-plugin-default-unit"));

var _ = _interopRequireDefault(require("."));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject5() {
  var data = _taggedTemplateLiteralLoose(["\n        .a-id {\n          height: 20px;\n        }\n      "]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteralLoose(["\n        .a-id {\n          height: 20;\n        }\n      "]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteralLoose(["\n        .a-id {\n          height: 20px;\n        }\n      "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteralLoose(["\n        .a-id {\n          height: 10px;\n        }\n      "]);

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
describe('jss-plugin-rule-value-observable: values', function () {
  var jss;
  beforeEach(function () {
    jss = (0, _jss.create)(settings).use((0, _.default)(), (0, _jssPluginDefaultUnit.default)());
  });
  describe('.toString()', function () {
    var sheet;
    var observer;
    beforeEach(function () {
      sheet = jss.createStyleSheet({
        a: {
          height: new _zenObservable.default(function (obs) {
            observer = obs;
          })
        }
      }, {
        link: true
      });
    });
    it('should subscribe the observer', function () {
      (0, _expect.default)(observer).to.be.an(Object);
    });
    it('should accept an observable', function () {
      (0, _expect.default)(sheet.toString()).to.be((0, _commonTags.stripIndent)(_templateObject()));
    });
    it('should update the value 1', function () {
      observer.next('10px');
      (0, _expect.default)(sheet.toString()).to.be((0, _commonTags.stripIndent)(_templateObject2()));
    });
    it('should update the value 2', function () {
      observer.next('20px');
      (0, _expect.default)(sheet.toString()).to.be((0, _commonTags.stripIndent)(_templateObject3()));
    });
    it('should not process value', function () {
      jss = (0, _jss.create)(settings).use((0, _.default)({
        process: false
      }), (0, _jssPluginDefaultUnit.default)());
      sheet = jss.createStyleSheet({
        a: {
          height: new _zenObservable.default(function (obs) {
            observer = obs;
          })
        }
      }, {
        link: true
      });
      observer.next(20);
      (0, _expect.default)(sheet.toString()).to.be((0, _commonTags.stripIndent)(_templateObject4()));
    });
    it('should process the value', function () {
      jss = (0, _jss.create)(settings).use((0, _.default)(), (0, _jssPluginDefaultUnit.default)());
      sheet = jss.createStyleSheet({
        a: {
          height: new _zenObservable.default(function (obs) {
            observer = obs;
          })
        }
      }, {
        link: true
      });
      observer.next(20);
      (0, _expect.default)(sheet.toString()).to.be((0, _commonTags.stripIndent)(_templateObject5()));
    });
  });
  describe('.toJSON()', function () {
    it('should handle observable values', function () {
      var rule = jss.createRule({
        color: new _zenObservable.default(function (observer) {
          observer.next('red');
        })
      });
      (0, _expect.default)(rule.toJSON()).to.eql({
        color: 'red'
      });
    });
  });
});