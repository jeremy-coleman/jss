/* eslint-disable global-require, react/prop-types */
import expect from 'expect.js';
import React from 'react';
import { stripIndent } from 'common-tags';
import { create } from 'jss';
import TestRenderer from 'react-test-renderer';
import withStyles, { SheetsRegistry, JssProvider } from '.';

const createGenerateId = () => {
  let counter = 0;
  return rule => `${rule.key}-${counter++}`;
};

describe('React-JSS: JssProvider', () => {
  let registry;
  beforeEach(() => {
    registry = new SheetsRegistry();
  });
  describe('nested child JssProvider', () => {
    describe('generateId prop', () => {
      it('should forward from context', () => {
        const generateId = () => 'a';

        const MyComponent = withStyles({
          a: {
            color: 'red'
          }
        })();
        TestRenderer.create(React.createElement(JssProvider, {
          generateId: generateId
        }, React.createElement(JssProvider, {
          registry: registry
        }, React.createElement(MyComponent, null))));
        expect(registry.toString()).to.be(stripIndent`
          .a {
            color: red;
          }
        `);
      });
      it('should overwrite over child props', () => {
        const generateIdParent = () => 'a';

        const generateIdChild = () => 'b';

        const MyComponent = withStyles({
          a: {
            color: 'red'
          }
        })();
        TestRenderer.create(React.createElement(JssProvider, {
          generateId: generateIdParent
        }, React.createElement(JssProvider, {
          generateId: generateIdChild,
          registry: registry
        }, React.createElement(MyComponent, null))));
        expect(registry.toString()).to.be(stripIndent`
          .b {
            color: red;
          }
        `);
      });
    });
    describe('classNamePrefix prop', () => {
      const generateId = (rule, sheet) => sheet.options.classNamePrefix + rule.key;

      const MyComponent = withStyles({
        a: {
          color: 'red'
        }
      })();
      it('should merge with child props', () => {
        TestRenderer.create(React.createElement(JssProvider, {
          classNamePrefix: "A-",
          registry: registry,
          generateId: generateId
        }, React.createElement(JssProvider, {
          classNamePrefix: "B-"
        }, React.createElement(MyComponent, null))));
        expect(registry.toString()).to.be(stripIndent`
          .A-B-NoRenderer-a {
            color: red;
          }
        `);
      });
    });
    describe('jss prop', () => {
      it('should forward from context', () => {
        const localJss = create();
        const MyComponent = withStyles({})();
        TestRenderer.create(React.createElement(JssProvider, {
          jss: localJss
        }, React.createElement(JssProvider, null, React.createElement(MyComponent, null))));
      });
      it('should overwrite over child props', () => {
        const localJss1 = create();
        const localJss2 = create();
        const MyComponent = withStyles({})();
        TestRenderer.create(React.createElement(JssProvider, {
          jss: localJss1
        }, React.createElement(JssProvider, {
          jss: localJss2
        }, React.createElement(MyComponent, null))));
      });
    });
    describe('registry prop', () => {
      it('should forward from context', () => {
        const generateId = () => 'a';

        const MyComponent = withStyles({
          a: {
            color: 'red'
          }
        })();
        TestRenderer.create(React.createElement(JssProvider, {
          registry: registry
        }, React.createElement(JssProvider, {
          generateId: generateId
        }, React.createElement(MyComponent, null))));
        expect(registry.toString()).to.be(stripIndent`
          .a {
            color: red;
          }
        `);
      });
      it('should overwrite over child props', () => {
        const generateId = () => 'a';

        const registryA = new SheetsRegistry();
        const registryB = new SheetsRegistry();
        const MyComponent = withStyles({
          a: {
            color: 'red'
          }
        })();
        TestRenderer.create(React.createElement(JssProvider, {
          registry: registryA
        }, React.createElement(JssProvider, {
          registry: registryB,
          generateId: generateId
        }, React.createElement(MyComponent, null))));
        expect(registryA.toString()).to.be('');
        expect(registryB.toString()).to.be(stripIndent`
          .a {
            color: red;
          }
        `);
      });
    });
    describe('disableStylesGeneration prop', () => {
      it('should forward from context', () => {
        const generateId = () => 'a';

        const MyComponent = withStyles({
          a: {
            color: 'red'
          }
        })();
        TestRenderer.create(React.createElement(JssProvider, {
          registry: registry,
          disableStylesGeneration: true
        }, React.createElement(JssProvider, {
          generateId: generateId
        }, React.createElement(MyComponent, null))));
        expect(registry.toString()).to.be('');
      });
      it('should overwrite over child props', () => {
        const generateId = () => 'a';

        const MyComponent = withStyles({
          a: {
            color: 'red'
          }
        })();
        TestRenderer.create(React.createElement(JssProvider, {
          registry: registry,
          disableStylesGeneration: true
        }, React.createElement(JssProvider, {
          generateId: generateId,
          disableStylesGeneration: false
        }, React.createElement(MyComponent, null))));
        expect(registry.toString()).to.be(stripIndent`
          .a {
            color: red;
          }
        `);
      });
    });
  });
  describe('JssProvider in a stateful component', () => {
    it('should not reset the class name generator', () => {
      const A = withStyles({
        a: {
          color: 'red'
        }
      })();
      const B = withStyles({
        a: {
          color: 'green'
        }
      })();
      const generateId = createGenerateId();

      function MyComponent(props) {
        const Inner = props.value ? A : B;
        return React.createElement(JssProvider, {
          registry: registry,
          generateId: generateId
        }, React.createElement(Inner, null));
      }

      const renderer = TestRenderer.create(React.createElement(MyComponent, {
        value: false
      })); // TODO: Does this make sense?

      expect(registry.toString()).to.be(stripIndent`
        .a-0 {
          color: green;
        }
      `);
      renderer.update(React.createElement(MyComponent, {
        value: true
      }));
      expect(registry.toString()).to.be(stripIndent`
        .a-1 {
          color: red;
        }
      `);
      renderer.update(React.createElement(MyComponent, {
        value: false
      }));
      expect(registry.toString()).to.be(stripIndent`
        .a-0 {
          color: green;
        }
      `);
      renderer.update(React.createElement(MyComponent, {
        value: true
      }));
      expect(registry.toString()).to.be(stripIndent`
        .a-1 {
          color: red;
        }
      `);
    });
  });
  describe('with JssProvider for SSR', () => {
    it('should reset the class generator counter', () => {
      const styles = {
        button: {
          color: 'red',
          border: ({
            border
          }) => border
        }
      };
      const MyComponent = withStyles(styles)();
      let generateId = createGenerateId();
      TestRenderer.create(React.createElement(JssProvider, {
        registry: registry,
        generateId: generateId
      }, React.createElement(MyComponent, {
        border: "green"
      })));
      expect(registry.toString()).to.equal(stripIndent`
        .button-0 {
          color: red;
        }
        .button-1 {
          border: green;
        }
      `);
      registry = new SheetsRegistry();
      generateId = createGenerateId();
      TestRenderer.create(React.createElement(JssProvider, {
        registry: registry,
        generateId: generateId
      }, React.createElement(MyComponent, {
        border: "blue"
      })));
      expect(registry.toString()).to.equal(stripIndent`
        .button-0 {
          color: red;
        }
        .button-1 {
          border: blue;
        }
      `);
    });
    it('should be idempotent', () => {
      const MyComponent = withStyles({
        button: {
          color: props => props.color
        }
      })();
      const customSheets1 = new SheetsRegistry();
      const customSheets2 = new SheetsRegistry();
      const generateId1 = createGenerateId();
      const generateId2 = createGenerateId();
      TestRenderer.create(React.createElement(JssProvider, {
        registry: customSheets1,
        generateId: generateId1
      }, React.createElement(MyComponent, {
        color: "#000"
      })));
      TestRenderer.create(React.createElement(JssProvider, {
        registry: customSheets2,
        generateId: generateId2
      }, React.createElement(MyComponent, {
        color: "#000"
      })));
      const result1 = customSheets1.toString();
      const result2 = customSheets2.toString();
      expect(result1).to.equal(result2);
    });
  });
});