import isInBrowser from 'is-in-browser';
import StyleSheet from './StyleSheet';
import PluginsRegistry from './PluginsRegistry';
import sheets from './sheets';
import { plugins as internalPlugins } from './plugins/index';
import createGenerateIdDefault from './utils/createGenerateId';
import createRule from './utils/createRule';
import DomRenderer from './renderers/DomRenderer';
import VirtualRenderer from './renderers/VirtualRenderer';
let instanceCounter = 0;
export default class Jss {
  constructor(options) {
    this.id = instanceCounter++;
    this.version = process.env.VERSION;
    this.plugins = new PluginsRegistry();
    this.options = {
      createGenerateId: createGenerateIdDefault,
      Renderer: isInBrowser ? DomRenderer : VirtualRenderer,
      plugins: []
    };
    this.generateId = createGenerateIdDefault();

    for (let i = 0; i < internalPlugins.length; i++) {
      this.plugins.use(internalPlugins[i], {
        queue: 'internal'
      });
    }

    this.setup(options);
  }
  /**
   * Prepares various options, applies plugins.
   * Should not be used twice on the same instance, because there is no plugins
   * deduplication logic.
   */


  setup(options = {}) {
    if (options.createGenerateId) {
      this.options.createGenerateId = options.createGenerateId; // $FlowFixMe

      this.generateId = options.createGenerateId();
    }

    if (options.insertionPoint != null) this.options.insertionPoint = options.insertionPoint;

    if (options.virtual || options.Renderer) {
      this.options.Renderer = options.Renderer || (options.virtual ? VirtualRenderer : DomRenderer);
    } // eslint-disable-next-line prefer-spread


    if (options.plugins) this.use.apply(this, options.plugins);
    return this;
  }
  /**
   * Create a Style Sheet.
   */


  createStyleSheet(styles, options = {}) {
    let {
      index
    } = options;

    if (typeof index !== 'number') {
      index = sheets.index === 0 ? 0 : sheets.index + 1;
    }

    const sheet = new StyleSheet(styles, { ...options,
      jss: this,
      generateId: options.generateId || this.generateId,
      insertionPoint: this.options.insertionPoint,
      Renderer: this.options.Renderer,
      index
    });
    this.plugins.onProcessSheet(sheet);
    return sheet;
  }
  /**
   * Detach the Style Sheet and remove it from the registry.
   */


  removeStyleSheet(sheet) {
    sheet.detach();
    sheets.remove(sheet);
    return this;
  }
  /**
   * Create a rule without a Style Sheet.
   */


  createRule(name, style = {}, options = {}) {
    // Enable rule without name for inline styles.
    if (typeof name === 'object') {
      return this.createRule(undefined, name, style);
    }

    const ruleOptions = { ...options,
      jss: this,
      Renderer: this.options.Renderer
    };
    if (!ruleOptions.generateId) ruleOptions.generateId = this.generateId;
    if (!ruleOptions.classes) ruleOptions.classes = {};
    if (!ruleOptions.keyframes) ruleOptions.keyframes = {};
    const rule = createRule(name, style, ruleOptions);
    if (rule) this.plugins.onProcessRule(rule);
    return rule;
  }
  /**
   * Register plugin. Passed function will be invoked with a rule instance.
   */


  use(...plugins) {
    plugins.forEach(plugin => {
      this.plugins.use(plugin);
    });
    return this;
  }

}