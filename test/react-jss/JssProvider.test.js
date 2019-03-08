"use strict";

var _expect = _interopRequireDefault(require("expect.js"));

var _react = _interopRequireDefault(require("react"));

var _commonTags = require("common-tags");

var _jss = require("jss");

var _reactTestRenderer = _interopRequireDefault(require("react-test-renderer"));

var _ = _interopRequireWildcard(require("."));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject12() {
  var data = _taggedTemplateLiteralLoose(["\n        .button-0 {\n          color: red;\n        }\n        .button-1 {\n          border: blue;\n        }\n      "]);

  _templateObject12 = function _templateObject12() {
    return data;
  };

  return data;
}

function _templateObject11() {
  var data = _taggedTemplateLiteralLoose(["\n        .button-0 {\n          color: red;\n        }\n        .button-1 {\n          border: green;\n        }\n      "]);

  _templateObject11 = function _templateObject11() {
    return data;
  };

  return data;
}

function _templateObject10() {
  var data = _taggedTemplateLiteralLoose(["\n        .a-1 {\n          color: red;\n        }\n      "]);

  _templateObject10 = function _templateObject10() {
    return data;
  };

  return data;
}

function _templateObject9() {
  var data = _taggedTemplateLiteralLoose(["\n        .a-0 {\n          color: green;\n        }\n      "]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8() {
  var data = _taggedTemplateLiteralLoose(["\n        .a-1 {\n          color: red;\n        }\n      "]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = _taggedTemplateLiteralLoose(["\n        .a-0 {\n          color: green;\n        }\n      "]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = _taggedTemplateLiteralLoose(["\n          .a {\n            color: red;\n          }\n        "]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteralLoose(["\n          .a {\n            color: red;\n          }\n        "]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteralLoose(["\n          .a {\n            color: red;\n          }\n        "]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteralLoose(["\n          .A-B-NoRenderer-a {\n            color: red;\n          }\n        "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteralLoose(["\n          .b {\n            color: red;\n          }\n        "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteralLoose(["\n          .a {\n            color: red;\n          }\n        "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteralLoose(strings, raw) { if (!raw) { raw = strings.slice(0); } strings.raw = raw; return strings; }

var createGenerateId = function createGenerateId() {
  var counter = 0;
  return function (rule) {
    return rule.key + "-" + counter++;
  };
};

describe('React-JSS: JssProvider', function () {
  var registry;
  beforeEach(function () {
    registry = new _.SheetsRegistry();
  });
  describe('nested child JssProvider', function () {
    describe('generateId prop', function () {
      it('should forward from context', function () {
        var generateId = function generateId() {
          return 'a';
        };

        var MyComponent = (0, _.default)({
          a: {
            color: 'red'
          }
        })();

        _reactTestRenderer.default.create(_react.default.createElement(_.JssProvider, {
          generateId: generateId
        }, _react.default.createElement(_.JssProvider, {
          registry: registry
        }, _react.default.createElement(MyComponent, null))));

        (0, _expect.default)(registry.toString()).to.be((0, _commonTags.stripIndent)(_templateObject()));
      });
      it('should overwrite over child props', function () {
        var generateIdParent = function generateIdParent() {
          return 'a';
        };

        var generateIdChild = function generateIdChild() {
          return 'b';
        };

        var MyComponent = (0, _.default)({
          a: {
            color: 'red'
          }
        })();

        _reactTestRenderer.default.create(_react.default.createElement(_.JssProvider, {
          generateId: generateIdParent
        }, _react.default.createElement(_.JssProvider, {
          generateId: generateIdChild,
          registry: registry
        }, _react.default.createElement(MyComponent, null))));

        (0, _expect.default)(registry.toString()).to.be((0, _commonTags.stripIndent)(_templateObject2()));
      });
    });
    describe('classNamePrefix prop', function () {
      var generateId = function generateId(rule, sheet) {
        return sheet.options.classNamePrefix + rule.key;
      };

      var MyComponent = (0, _.default)({
        a: {
          color: 'red'
        }
      })();
      it('should merge with child props', function () {
        _reactTestRenderer.default.create(_react.default.createElement(_.JssProvider, {
          classNamePrefix: "A-",
          registry: registry,
          generateId: generateId
        }, _react.default.createElement(_.JssProvider, {
          classNamePrefix: "B-"
        }, _react.default.createElement(MyComponent, null))));

        (0, _expect.default)(registry.toString()).to.be((0, _commonTags.stripIndent)(_templateObject3()));
      });
    });
    describe('jss prop', function () {
      it('should forward from context', function () {
        var localJss = (0, _jss.create)();
        var MyComponent = (0, _.default)({})();

        _reactTestRenderer.default.create(_react.default.createElement(_.JssProvider, {
          jss: localJss
        }, _react.default.createElement(_.JssProvider, null, _react.default.createElement(MyComponent, null))));
      });
      it('should overwrite over child props', function () {
        var localJss1 = (0, _jss.create)();
        var localJss2 = (0, _jss.create)();
        var MyComponent = (0, _.default)({})();

        _reactTestRenderer.default.create(_react.default.createElement(_.JssProvider, {
          jss: localJss1
        }, _react.default.createElement(_.JssProvider, {
          jss: localJss2
        }, _react.default.createElement(MyComponent, null))));
      });
    });
    describe('registry prop', function () {
      it('should forward from context', function () {
        var generateId = function generateId() {
          return 'a';
        };

        var MyComponent = (0, _.default)({
          a: {
            color: 'red'
          }
        })();

        _reactTestRenderer.default.create(_react.default.createElement(_.JssProvider, {
          registry: registry
        }, _react.default.createElement(_.JssProvider, {
          generateId: generateId
        }, _react.default.createElement(MyComponent, null))));

        (0, _expect.default)(registry.toString()).to.be((0, _commonTags.stripIndent)(_templateObject4()));
      });
      it('should overwrite over child props', function () {
        var generateId = function generateId() {
          return 'a';
        };

        var registryA = new _.SheetsRegistry();
        var registryB = new _.SheetsRegistry();
        var MyComponent = (0, _.default)({
          a: {
            color: 'red'
          }
        })();

        _reactTestRenderer.default.create(_react.default.createElement(_.JssProvider, {
          registry: registryA
        }, _react.default.createElement(_.JssProvider, {
          registry: registryB,
          generateId: generateId
        }, _react.default.createElement(MyComponent, null))));

        (0, _expect.default)(registryA.toString()).to.be('');
        (0, _expect.default)(registryB.toString()).to.be((0, _commonTags.stripIndent)(_templateObject5()));
      });
    });
    describe('disableStylesGeneration prop', function () {
      it('should forward from context', function () {
        var generateId = function generateId() {
          return 'a';
        };

        var MyComponent = (0, _.default)({
          a: {
            color: 'red'
          }
        })();

        _reactTestRenderer.default.create(_react.default.createElement(_.JssProvider, {
          registry: registry,
          disableStylesGeneration: true
        }, _react.default.createElement(_.JssProvider, {
          generateId: generateId
        }, _react.default.createElement(MyComponent, null))));

        (0, _expect.default)(registry.toString()).to.be('');
      });
      it('should overwrite over child props', function () {
        var generateId = function generateId() {
          return 'a';
        };

        var MyComponent = (0, _.default)({
          a: {
            color: 'red'
          }
        })();

        _reactTestRenderer.default.create(_react.default.createElement(_.JssProvider, {
          registry: registry,
          disableStylesGeneration: true
        }, _react.default.createElement(_.JssProvider, {
          generateId: generateId,
          disableStylesGeneration: false
        }, _react.default.createElement(MyComponent, null))));

        (0, _expect.default)(registry.toString()).to.be((0, _commonTags.stripIndent)(_templateObject6()));
      });
    });
  });
  describe('JssProvider in a stateful component', function () {
    it('should not reset the class name generator', function () {
      var A = (0, _.default)({
        a: {
          color: 'red'
        }
      })();
      var B = (0, _.default)({
        a: {
          color: 'green'
        }
      })();
      var generateId = createGenerateId();

      function MyComponent(props) {
        var Inner = props.value ? A : B;
        return _react.default.createElement(_.JssProvider, {
          registry: registry,
          generateId: generateId
        }, _react.default.createElement(Inner, null));
      }

      var renderer = _reactTestRenderer.default.create(_react.default.createElement(MyComponent, {
        value: false
      })); // TODO: Does this make sense?


      (0, _expect.default)(registry.toString()).to.be((0, _commonTags.stripIndent)(_templateObject7()));
      renderer.update(_react.default.createElement(MyComponent, {
        value: true
      }));
      (0, _expect.default)(registry.toString()).to.be((0, _commonTags.stripIndent)(_templateObject8()));
      renderer.update(_react.default.createElement(MyComponent, {
        value: false
      }));
      (0, _expect.default)(registry.toString()).to.be((0, _commonTags.stripIndent)(_templateObject9()));
      renderer.update(_react.default.createElement(MyComponent, {
        value: true
      }));
      (0, _expect.default)(registry.toString()).to.be((0, _commonTags.stripIndent)(_templateObject10()));
    });
  });
  describe('with JssProvider for SSR', function () {
    it('should reset the class generator counter', function () {
      var styles = {
        button: {
          color: 'red',
          border: function border(_ref) {
            var _border = _ref.border;
            return _border;
          }
        }
      };
      var MyComponent = (0, _.default)(styles)();
      var generateId = createGenerateId();

      _reactTestRenderer.default.create(_react.default.createElement(_.JssProvider, {
        registry: registry,
        generateId: generateId
      }, _react.default.createElement(MyComponent, {
        border: "green"
      })));

      (0, _expect.default)(registry.toString()).to.equal((0, _commonTags.stripIndent)(_templateObject11()));
      registry = new _.SheetsRegistry();
      generateId = createGenerateId();

      _reactTestRenderer.default.create(_react.default.createElement(_.JssProvider, {
        registry: registry,
        generateId: generateId
      }, _react.default.createElement(MyComponent, {
        border: "blue"
      })));

      (0, _expect.default)(registry.toString()).to.equal((0, _commonTags.stripIndent)(_templateObject12()));
    });
    it('should be idempotent', function () {
      var MyComponent = (0, _.default)({
        button: {
          color: function color(props) {
            return props.color;
          }
        }
      })();
      var customSheets1 = new _.SheetsRegistry();
      var customSheets2 = new _.SheetsRegistry();
      var generateId1 = createGenerateId();
      var generateId2 = createGenerateId();

      _reactTestRenderer.default.create(_react.default.createElement(_.JssProvider, {
        registry: customSheets1,
        generateId: generateId1
      }, _react.default.createElement(MyComponent, {
        color: "#000"
      })));

      _reactTestRenderer.default.create(_react.default.createElement(_.JssProvider, {
        registry: customSheets2,
        generateId: generateId2
      }, _react.default.createElement(MyComponent, {
        color: "#000"
      })));

      var result1 = customSheets1.toString();
      var result2 = customSheets2.toString();
      (0, _expect.default)(result1).to.equal(result2);
    });
  });
});