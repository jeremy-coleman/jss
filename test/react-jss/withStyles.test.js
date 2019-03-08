"use strict";

var _expect = _interopRequireDefault(require("expect.js"));

var _react = _interopRequireDefault(require("react"));

var _sinon = require("sinon");

var _reactTestRenderer = _interopRequireDefault(require("react-test-renderer"));

var _ = _interopRequireWildcard(require("."));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var createGenerateId = function createGenerateId() {
  var counter = 0;
  return function (rule) {
    return rule.key + "-" + counter++;
  };
};

describe('React-JSS: withStyles', function () {
  it('should work in StrictMode without error on React 16.3+', function () {
    var MyComponent = (0, _.default)({})();
    (0, _sinon.spy)(console, 'error');

    _reactTestRenderer.default.create(_react.default.createElement(_react.default.StrictMode, null, _react.default.createElement(MyComponent, null)));

    (0, _expect.default)(console.error.notCalled).to.be(true);
    console.error.restore();
  });
  describe('reusing style sheets', function () {
    it('should reuse one static sheet for many elements and detach sheet', function () {
      var registry = new _.SheetsRegistry();
      var MyComponent = (0, _.default)({
        button: {
          color: 'red'
        }
      })();

      _reactTestRenderer.default.create(_react.default.createElement(_.JssProvider, {
        registry: registry
      }, _react.default.createElement(MyComponent, null), _react.default.createElement(MyComponent, null), _react.default.createElement(MyComponent, null)));

      (0, _expect.default)(registry.registry.length, 1);
    });
  });
  describe('.withStyles() preserving source order', function () {
    var ComponentA;
    var ComponentB;
    var ComponentC;
    var registry;
    beforeEach(function () {
      registry = new _.SheetsRegistry();
      ComponentA = (0, _.default)({
        button: {
          color: 'red'
        }
      })();
      ComponentB = (0, _.default)({
        button: {
          color: 'blue'
        }
      })();
      ComponentC = (0, _.default)({
        button: {
          color: 'green'
        }
      }, {
        index: 1234
      })();
    });
    it('should provide a default index in ascending order', function () {
      _reactTestRenderer.default.create(_react.default.createElement(_.JssProvider, {
        registry: registry
      }, _react.default.createElement(ComponentA, null), _react.default.createElement(ComponentB, null)));

      (0, _expect.default)(registry.registry.length).to.equal(2);
      var indexA = registry.registry[0].options.index;
      var indexB = registry.registry[1].options.index;
      (0, _expect.default)(indexA).to.be.lessThan(0);
      (0, _expect.default)(indexB).to.be.lessThan(0);
      (0, _expect.default)(indexA).to.be.lessThan(indexB);
    });
    it('should not be affected by rendering order', function () {
      _reactTestRenderer.default.create(_react.default.createElement(_.JssProvider, {
        registry: registry
      }, _react.default.createElement(ComponentB, null), _react.default.createElement(ComponentA, null)));

      (0, _expect.default)(registry.registry.length).to.equal(2);
      var indexA = registry.registry[0].options.index;
      var indexB = registry.registry[1].options.index;
      (0, _expect.default)(indexA).to.be.lessThan(0);
      (0, _expect.default)(indexB).to.be.lessThan(0);
      (0, _expect.default)(indexA).to.be.lessThan(indexB);
    });
    it('should keep custom index', function () {
      _reactTestRenderer.default.create(_react.default.createElement(_.JssProvider, {
        registry: registry
      }, _react.default.createElement(ComponentC, null)));

      (0, _expect.default)(registry.registry.length).to.equal(1);
      var indexC = registry.registry[0].options.index;
      (0, _expect.default)(indexC).to.equal(1234);
    });
  });
  describe('should merge the classes', function () {
    var styles = {
      button: {
        color: 'red'
      }
    };
    it('no default props + no user classes -> sheet classes', function () {
      var Comp = function Comp() {
        return null;
      };

      var StyledComponent = (0, _.default)(styles)(Comp);

      var renderer = _reactTestRenderer.default.create(_react.default.createElement(_.JssProvider, {
        generateId: createGenerateId()
      }, _react.default.createElement(StyledComponent, null)));

      var injectedClasses = renderer.root.findByType(Comp).props.classes;
      (0, _expect.default)(injectedClasses.button).to.be('button-0');
    });
    it('default props + no user classes -> merge sheet classes with default props classes', function () {
      var Comp = function Comp() {
        return null;
      };

      Comp.defaultProps = {
        classes: {
          button: 'default-button'
        }
      };
      var StyledComponent = (0, _.default)(styles)(Comp);

      var renderer = _reactTestRenderer.default.create(_react.default.createElement(_.JssProvider, {
        generateId: createGenerateId()
      }, _react.default.createElement(StyledComponent, null)));

      var injectedClasses = renderer.root.findByType(Comp).props.classes;
      (0, _expect.default)(injectedClasses.button).to.be('button-0 default-button');
    });
    it('default props + user classes -> merge sheet classes with user classes prop', function () {
      var Comp = function Comp() {
        return null;
      };

      Comp.defaultProps = {
        classes: {
          button: 'default-button',
          test: 'test'
        }
      };
      var StyledComponent = (0, _.default)(styles)(Comp);

      var renderer = _reactTestRenderer.default.create(_react.default.createElement(_.JssProvider, {
        generateId: createGenerateId()
      }, _react.default.createElement(StyledComponent, {
        classes: {
          button: 'custom-button'
        }
      })));

      var injectedClasses = renderer.root.findByType(Comp).props.classes;
      (0, _expect.default)(injectedClasses.button).to.be('button-0 custom-button');
      (0, _expect.default)(injectedClasses.test).to.be(undefined);
    });
    it('no default props + user classes -> merge sheet classes with user classes prop', function () {
      var Comp = function Comp() {
        return null;
      };

      var StyledComponent = (0, _.default)(styles)(Comp);

      var renderer = _reactTestRenderer.default.create(_react.default.createElement(_.JssProvider, {
        generateId: createGenerateId()
      }, _react.default.createElement(StyledComponent, {
        classes: {
          button: 'custom-button'
        }
      })));

      var injectedClasses = renderer.root.findByType(Comp).props.classes;
      (0, _expect.default)(injectedClasses.button).to.be('button-0 custom-button');
    });
  });
  describe('access inner component', function () {
    it('should be exposed using "InnerComponent" property', function () {
      var Comp = function Comp() {
        return null;
      };

      var ComponentOuter = (0, _.default)({
        button: {
          color: 'red'
        }
      })(Comp);
      (0, _expect.default)(ComponentOuter.InnerComponent).to.be(Comp);
    });
  });
  describe('access inner element', function () {
    it('should provide a ref to the inner element', function () {
      var innerRef = (0, _sinon.spy)();
      /* eslint-disable-next-line react/no-multi-comp, react/prefer-stateless-function */

      var InnerComponent =
      /*#__PURE__*/
      function (_React$PureComponent) {
        _inheritsLoose(InnerComponent, _React$PureComponent);

        function InnerComponent() {
          return _React$PureComponent.apply(this, arguments) || this;
        }

        var _proto = InnerComponent.prototype;

        _proto.render = function render() {
          return _react.default.createElement("div", null);
        };

        return InnerComponent;
      }(_react.default.PureComponent);

      var StyledComponent = (0, _.default)()(InnerComponent);

      _reactTestRenderer.default.create(_react.default.createElement(StyledComponent, {
        ref: innerRef
      }));

      (0, _expect.default)(innerRef.callCount).to.be(1);
    });
  });
  describe('classNamePrefix', function () {
    var classNamePrefix;

    var generateId = function generateId(rule, sheet) {
      classNamePrefix = sheet.options.classNamePrefix;
      return rule.key + "-id";
    };

    var renderTest = function renderTest(displayName) {
      if (displayName === void 0) {
        displayName = 'DisplayNameTest';
      }

      function DisplayNameTest() {
        return null;
      }

      DisplayNameTest.displayName = displayName;
      var MyComponent = (0, _.default)({
        a: {
          color: 'red'
        }
      })(DisplayNameTest);

      _reactTestRenderer.default.create(_react.default.createElement(_.JssProvider, {
        generateId: generateId
      }, _react.default.createElement(MyComponent, null)));
    };

    it('should pass displayName as prefix', function () {
      renderTest();
      (0, _expect.default)(classNamePrefix).to.be('DisplayNameTest-');
    });
    it('should handle spaces correctly', function () {
      renderTest('Display Name Test');
      (0, _expect.default)(classNamePrefix).to.be('Display-Name-Test-');
    });
    it('should pass no prefix in production', function () {
      process.env.NODE_ENV = 'production';
      renderTest();
      (0, _expect.default)(classNamePrefix).to.be('');
      process.env.NODE_ENV = 'development';
    });
  });
  describe('.withStyles() properly warns about themed styles misuse', function () {
    beforeEach(function () {
      (0, _sinon.spy)(console, 'warn');
    });
    afterEach(function () {
      console.warn.restore();
    });
    it('warn if themed styles dont use theme', function () {
      function DisplayNameTest() {
        return null;
      }

      var MyComponent = (0, _.default)(function () {
        return {};
      })(DisplayNameTest);

      _reactTestRenderer.default.create(_react.default.createElement(MyComponent, null));

      (0, _expect.default)(console.warn.calledWithExactly("Warning: [JSS] <DisplayNameTest />'s styles function doesn't rely on the \"theme\" argument. We recommend declaring styles as an object instead.")).to.be(true);
    });
    it('doesnt warn if themed styles _do use_ theme', function () {
      function DisplayNameTest() {
        return null;
      }

      var MyComponent = (0, _.default)(function (theme) {
        return {};
      })(DisplayNameTest); // eslint-disable-line no-unused-vars

      _reactTestRenderer.default.create(_react.default.createElement(MyComponent, null));

      (0, _expect.default)(console.warn.called).to.be(false);
    });
  });
});