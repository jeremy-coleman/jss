/* eslint-disable global-require, react/prop-types, no-underscore-dangle */
import expect from 'expect.js';
import React from 'react';
import { spy } from 'sinon';
import TestRenderer from 'react-test-renderer';
import withStyles, { JssProvider, SheetsRegistry } from '.';

const createGenerateId = () => {
  let counter = 0;
  return rule => `${rule.key}-${counter++}`;
};

describe('React-JSS: withStyles', () => {
  it('should work in StrictMode without error on React 16.3+', () => {
    const MyComponent = withStyles({})();
    spy(console, 'error');
    TestRenderer.create(React.createElement(React.StrictMode, null, React.createElement(MyComponent, null)));
    expect(console.error.notCalled).to.be(true);
    console.error.restore();
  });
  describe('reusing style sheets', () => {
    it('should reuse one static sheet for many elements and detach sheet', () => {
      const registry = new SheetsRegistry();
      const MyComponent = withStyles({
        button: {
          color: 'red'
        }
      })();
      TestRenderer.create(React.createElement(JssProvider, {
        registry: registry
      }, React.createElement(MyComponent, null), React.createElement(MyComponent, null), React.createElement(MyComponent, null)));
      expect(registry.registry.length, 1);
    });
  });
  describe('.withStyles() preserving source order', () => {
    let ComponentA;
    let ComponentB;
    let ComponentC;
    let registry;
    beforeEach(() => {
      registry = new SheetsRegistry();
      ComponentA = withStyles({
        button: {
          color: 'red'
        }
      })();
      ComponentB = withStyles({
        button: {
          color: 'blue'
        }
      })();
      ComponentC = withStyles({
        button: {
          color: 'green'
        }
      }, {
        index: 1234
      })();
    });
    it('should provide a default index in ascending order', () => {
      TestRenderer.create(React.createElement(JssProvider, {
        registry: registry
      }, React.createElement(ComponentA, null), React.createElement(ComponentB, null)));
      expect(registry.registry.length).to.equal(2);
      const indexA = registry.registry[0].options.index;
      const indexB = registry.registry[1].options.index;
      expect(indexA).to.be.lessThan(0);
      expect(indexB).to.be.lessThan(0);
      expect(indexA).to.be.lessThan(indexB);
    });
    it('should not be affected by rendering order', () => {
      TestRenderer.create(React.createElement(JssProvider, {
        registry: registry
      }, React.createElement(ComponentB, null), React.createElement(ComponentA, null)));
      expect(registry.registry.length).to.equal(2);
      const indexA = registry.registry[0].options.index;
      const indexB = registry.registry[1].options.index;
      expect(indexA).to.be.lessThan(0);
      expect(indexB).to.be.lessThan(0);
      expect(indexA).to.be.lessThan(indexB);
    });
    it('should keep custom index', () => {
      TestRenderer.create(React.createElement(JssProvider, {
        registry: registry
      }, React.createElement(ComponentC, null)));
      expect(registry.registry.length).to.equal(1);
      const indexC = registry.registry[0].options.index;
      expect(indexC).to.equal(1234);
    });
  });
  describe('should merge the classes', () => {
    const styles = {
      button: {
        color: 'red'
      }
    };
    it('no default props + no user classes -> sheet classes', () => {
      const Comp = () => null;

      const StyledComponent = withStyles(styles)(Comp);
      const renderer = TestRenderer.create(React.createElement(JssProvider, {
        generateId: createGenerateId()
      }, React.createElement(StyledComponent, null)));
      const injectedClasses = renderer.root.findByType(Comp).props.classes;
      expect(injectedClasses.button).to.be('button-0');
    });
    it('default props + no user classes -> merge sheet classes with default props classes', () => {
      const Comp = () => null;

      Comp.defaultProps = {
        classes: {
          button: 'default-button'
        }
      };
      const StyledComponent = withStyles(styles)(Comp);
      const renderer = TestRenderer.create(React.createElement(JssProvider, {
        generateId: createGenerateId()
      }, React.createElement(StyledComponent, null)));
      const injectedClasses = renderer.root.findByType(Comp).props.classes;
      expect(injectedClasses.button).to.be('button-0 default-button');
    });
    it('default props + user classes -> merge sheet classes with user classes prop', () => {
      const Comp = () => null;

      Comp.defaultProps = {
        classes: {
          button: 'default-button',
          test: 'test'
        }
      };
      const StyledComponent = withStyles(styles)(Comp);
      const renderer = TestRenderer.create(React.createElement(JssProvider, {
        generateId: createGenerateId()
      }, React.createElement(StyledComponent, {
        classes: {
          button: 'custom-button'
        }
      })));
      const injectedClasses = renderer.root.findByType(Comp).props.classes;
      expect(injectedClasses.button).to.be('button-0 custom-button');
      expect(injectedClasses.test).to.be(undefined);
    });
    it('no default props + user classes -> merge sheet classes with user classes prop', () => {
      const Comp = () => null;

      const StyledComponent = withStyles(styles)(Comp);
      const renderer = TestRenderer.create(React.createElement(JssProvider, {
        generateId: createGenerateId()
      }, React.createElement(StyledComponent, {
        classes: {
          button: 'custom-button'
        }
      })));
      const injectedClasses = renderer.root.findByType(Comp).props.classes;
      expect(injectedClasses.button).to.be('button-0 custom-button');
    });
  });
  describe('access inner component', () => {
    it('should be exposed using "InnerComponent" property', () => {
      const Comp = () => null;

      const ComponentOuter = withStyles({
        button: {
          color: 'red'
        }
      })(Comp);
      expect(ComponentOuter.InnerComponent).to.be(Comp);
    });
  });
  describe('access inner element', () => {
    it('should provide a ref to the inner element', () => {
      const innerRef = spy();
      /* eslint-disable-next-line react/no-multi-comp, react/prefer-stateless-function */

      class InnerComponent extends React.PureComponent {
        render() {
          return React.createElement("div", null);
        }

      }

      const StyledComponent = withStyles()(InnerComponent);
      TestRenderer.create(React.createElement(StyledComponent, {
        ref: innerRef
      }));
      expect(innerRef.callCount).to.be(1);
    });
  });
  describe('classNamePrefix', () => {
    let classNamePrefix;

    const generateId = (rule, sheet) => {
      classNamePrefix = sheet.options.classNamePrefix;
      return `${rule.key}-id`;
    };

    const renderTest = (displayName = 'DisplayNameTest') => {
      function DisplayNameTest() {
        return null;
      }

      DisplayNameTest.displayName = displayName;
      const MyComponent = withStyles({
        a: {
          color: 'red'
        }
      })(DisplayNameTest);
      TestRenderer.create(React.createElement(JssProvider, {
        generateId: generateId
      }, React.createElement(MyComponent, null)));
    };

    it('should pass displayName as prefix', () => {
      renderTest();
      expect(classNamePrefix).to.be('DisplayNameTest-');
    });
    it('should handle spaces correctly', () => {
      renderTest('Display Name Test');
      expect(classNamePrefix).to.be('Display-Name-Test-');
    });
    it('should pass no prefix in production', () => {
      process.env.NODE_ENV = 'production';
      renderTest();
      expect(classNamePrefix).to.be('');
      process.env.NODE_ENV = 'development';
    });
  });
  describe('.withStyles() properly warns about themed styles misuse', () => {
    beforeEach(() => {
      spy(console, 'warn');
    });
    afterEach(() => {
      console.warn.restore();
    });
    it('warn if themed styles dont use theme', () => {
      function DisplayNameTest() {
        return null;
      }

      const MyComponent = withStyles(() => ({}))(DisplayNameTest);
      TestRenderer.create(React.createElement(MyComponent, null));
      expect(console.warn.calledWithExactly(`Warning: [JSS] <DisplayNameTest />'s styles function doesn't rely on the "theme" argument. We recommend declaring styles as an object instead.`)).to.be(true);
    });
    it('doesnt warn if themed styles _do use_ theme', () => {
      function DisplayNameTest() {
        return null;
      }

      const MyComponent = withStyles(theme => ({}))(DisplayNameTest); // eslint-disable-line no-unused-vars

      TestRenderer.create(React.createElement(MyComponent, null));
      expect(console.warn.called).to.be(false);
    });
  });
});