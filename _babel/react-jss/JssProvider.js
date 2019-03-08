import React, { Component } from 'react';
import PropTypes from 'prop-types';
import defaultJss, { createGenerateId, SheetsRegistry } from 'jss';
import JssContext from './JssContext';
import memoize from './memoize-one';
/* eslint-disable react/require-default-props, react/no-unused-prop-types */

export default class JssProvider extends Component {
  constructor(...args) {
    super(...args);
    this.managers = {};
    this.createContext = memoize((outerContext, props) => {
      const {
        registry,
        classNamePrefix,
        jss,
        generateId,
        disableStylesGeneration,
        media
      } = props; // Clone the outer context

      const context = { ...outerContext
      };

      if (registry) {
        context.registry = registry; // This way we identify a new request on the server, because user will create
        // a new Registry instance for each.

        if (registry !== this.registry) {
          // We reset managers because we have to regenerate all sheets for the new request.
          this.managers = {};
          this.registry = registry;
        }
      }

      context.managers = this.managers;

      if (generateId) {
        context.sheetOptions.generateId = generateId;
      } else if (!context.sheetOptions.generateId) {
        if (!this.generateId) {
          this.generateId = createGenerateId();
        }

        context.sheetOptions.generateId = this.generateId;
      } // Merge the classname prefix


      if (classNamePrefix) {
        context.sheetOptions.classNamePrefix = (context.sheetOptions.classNamePrefix || '') + classNamePrefix;
      }

      if (media !== undefined) {
        context.sheetOptions.media = media;
      }

      if (jss) {
        context.jss = jss;
      }

      if (disableStylesGeneration !== undefined) {
        context.disableStylesGeneration = disableStylesGeneration;
      }

      return context;
    });
    this.generateId = void 0;
    this.registry = void 0;

    this.renderProvider = outerContext => {
      const {
        children
      } = this.props; // $FlowFixMe

      const context = this.createContext(outerContext, this.props);
      return React.createElement(JssContext.Provider, {
        value: context
      }, children);
    };
  }

  render() {
    return React.createElement(JssContext.Consumer, null, this.renderProvider);
  }

}
JssProvider.propTypes = {
  registry: PropTypes.instanceOf(SheetsRegistry),
  jss: PropTypes.instanceOf(defaultJss.constructor),
  generateId: PropTypes.func,
  classNamePrefix: PropTypes.string,
  disableStylesGeneration: PropTypes.bool,
  children: PropTypes.node.isRequired,
  media: PropTypes.string
};