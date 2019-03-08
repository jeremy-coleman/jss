"use strict";

var _expect = _interopRequireDefault(require("expect.js"));

var _commonTags = require("common-tags");

var _zenObservable = _interopRequireDefault(require("zen-observable"));

var _jss = require("jss");

var _jssPluginDefaultUnit = _interopRequireDefault(require("jss-plugin-default-unit"));

var _jssPluginCamelCase = _interopRequireDefault(require("jss-plugin-camel-case"));

var _ = _interopRequireDefault(require("."));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject8() {
  var data = _taggedTemplateLiteralLoose(["\n        .a-id {\n          margin-left: 20px;\n        }\n      "]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = _taggedTemplateLiteralLoose(["\n        .a-id {\n          marginLeft: 20;\n        }\n      "]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = _taggedTemplateLiteralLoose(["\n        .a-id {\n          display: inline-block;\n        }\n      "]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteralLoose(["\n        .div-id {\n          display: block;\n        }\n      "]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteralLoose(["\n        .div-id {\n          display: block;\n        }\n        .button-id {\n          height: 3px;\n        }\n        .a-id {\n          opacity: 0;\n        } \n      "]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteralLoose(["\n        .div-id {\n          display: block;\n        }\n        .button-id {\n          height: 3px;\n        }\n      "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteralLoose(["\n        .div-id {\n          opacity: 1;\n          height: 10px;\n        }\n      "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteralLoose(["\n        .div-id {\n          opacity: 0;\n          height: 5px;\n        }\n      "]);

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
describe('jss-plugin-rule-value-observable: rules', function () {
  var jss;
  beforeEach(function () {
    jss = (0, _jss.create)(settings).use((0, _.default)());
  });
  describe('.toString()', function () {
    var sheet;
    var observer;
    beforeEach(function () {
      sheet = jss.createStyleSheet({
        div: new _zenObservable.default(function (obs) {
          observer = obs;
        })
      }, {
        link: true
      }).attach();
    });
    it('should subscribe the observer', function () {
      (0, _expect.default)(observer).to.be.an(Object);
    });
    it('should update the value', function () {
      observer.next({
        opacity: '0',
        height: '5px'
      });
      (0, _expect.default)(sheet.toString()).to.be((0, _commonTags.stripIndent)(_templateObject()));
    });
    it('should update the value when it receives a new emission', function () {
      observer.next({
        opacity: '0',
        height: '5px'
      });
      observer.next({
        opacity: '1',
        height: '10px'
      });
      (0, _expect.default)(sheet.toString()).to.be((0, _commonTags.stripIndent)(_templateObject2()));
    });
    it('should work with multiple rules', function () {
      var divObs;
      var buttonObs;
      sheet = jss.createStyleSheet({
        div: new _zenObservable.default(function (obs) {
          divObs = obs;
        }),
        button: new _zenObservable.default(function (obs) {
          buttonObs = obs;
        })
      }, {
        link: true
      }).attach();
      divObs.next({
        display: 'block'
      });
      buttonObs.next({
        height: '3px'
      });
      (0, _expect.default)(sheet.toString()).to.be((0, _commonTags.stripIndent)(_templateObject3()));
    });
    it('should work with mixed sheets', function () {
      var divObs;
      var buttonObs;
      sheet = jss.createStyleSheet({
        div: new _zenObservable.default(function (obs) {
          divObs = obs;
        }),
        button: new _zenObservable.default(function (obs) {
          buttonObs = obs;
        }),
        a: {
          opacity: '0'
        }
      }, {
        link: true
      }).attach();
      divObs.next({
        display: 'block'
      });
      buttonObs.next({
        height: '3px'
      });
      (0, _expect.default)(sheet.toString()).to.be((0, _commonTags.stripIndent)(_templateObject4()));
    });
    it('should accept synchronous values', function () {
      sheet = jss.createStyleSheet({
        div: new _zenObservable.default(function (obs) {
          obs.next({
            display: 'block'
          });
        })
      }, {
        link: true
      }).attach();
      (0, _expect.default)(sheet.toString()).to.be((0, _commonTags.stripIndent)(_templateObject5()));
    });
    it('should update synchronous values when it receives a new emission', function () {
      sheet = jss.createStyleSheet({
        a: new _zenObservable.default(function (obs) {
          obs.next({
            display: 'block'
          });
          observer = obs;
        })
      }, {
        link: true
      }).attach();
      observer.next({
        display: 'inline-block'
      });
      (0, _expect.default)(sheet.toString()).to.be((0, _commonTags.stripIndent)(_templateObject6()));
    });
    it('should not process props or values', function () {
      jss = (0, _jss.create)(settings).use((0, _.default)({
        process: false
      }), (0, _jssPluginDefaultUnit.default)(), (0, _jssPluginCamelCase.default)());
      sheet = jss.createStyleSheet({
        a: new _zenObservable.default(function (obs) {
          observer = obs;
        })
      }, {
        link: true
      });
      observer.next({
        marginLeft: 20
      });
      (0, _expect.default)(sheet.toString()).to.be((0, _commonTags.stripIndent)(_templateObject7()));
    });
    it('should process props and values', function () {
      jss = (0, _jss.create)(settings).use((0, _.default)(), (0, _jssPluginDefaultUnit.default)(), (0, _jssPluginCamelCase.default)());
      sheet = jss.createStyleSheet({
        a: new _zenObservable.default(function (obs) {
          observer = obs;
        })
      }, {
        link: true
      });
      observer.next({
        marginLeft: 20
      });
      (0, _expect.default)(sheet.toString()).to.be((0, _commonTags.stripIndent)(_templateObject8()));
    });
  });
  describe('.toJSON()', function () {
    var sheet;
    beforeEach(function () {
      sheet = jss.createStyleSheet({
        div: new _zenObservable.default(function (observer) {
          observer.next({
            color: 'red'
          });
        })
      }, {
        link: true
      }).attach();
    });
    it('should handle observable rules', function () {
      var rule = sheet.getRule('div');
      (0, _expect.default)(rule.toJSON()).to.eql({
        color: 'red'
      });
    });
  });
});