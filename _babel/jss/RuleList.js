import createRule from './utils/createRule';
import { StyleRule, KeyframesRule } from './plugins/index';
import escape from './utils/escape';
const defaultUpdateOptions = {
  process: true
};
const forceUpdateOptions = {
  force: true,
  process: true
  /**
   * Contains rules objects and allows adding/removing etc.
   * Is used for e.g. by `StyleSheet` or `ConditionalRule`.
   */

};
export default class RuleList {
  // Rules registry for access by .get() method.
  // It contains the same rule registered by name and by selector.
  // Original styles object.
  // Used to ensure correct rules order.
  constructor(options) {
    this.map = {};
    this.raw = {};
    this.index = [];
    this.options = void 0;
    this.classes = void 0;
    this.keyframes = void 0;
    this.options = options;
    this.classes = options.classes;
    this.keyframes = options.keyframes;
  }
  /**
   * Create and register rule.
   *
   * Will not render after Style Sheet was rendered the first time.
   */


  add(key, decl, ruleOptions) {
    const {
      parent,
      sheet,
      jss,
      Renderer,
      generateId,
      scoped
    } = this.options;
    const options = {
      classes: this.classes,
      parent,
      sheet,
      jss,
      Renderer,
      generateId,
      scoped,
      ...ruleOptions
    }; // We need to save the original decl before creating the rule
    // because cache plugin needs to use it as a key to return a cached rule.

    this.raw[key] = decl;

    if (key in this.classes) {
      // For e.g. rules inside of @media container
      options.selector = `.${escape(this.classes[key])}`;
    }

    const rule = createRule(key, decl, options);
    if (!rule) return null;
    this.register(rule);
    const index = options.index === undefined ? this.index.length : options.index;
    this.index.splice(index, 0, rule);
    return rule;
  }
  /**
   * Get a rule.
   */


  get(name) {
    return this.map[name];
  }
  /**
   * Delete a rule.
   */


  remove(rule) {
    this.unregister(rule);
    delete this.raw[rule.key];
    this.index.splice(this.indexOf(rule), 1);
  }
  /**
   * Get index of a rule.
   */


  indexOf(rule) {
    return this.index.indexOf(rule);
  }
  /**
   * Run `onProcessRule()` plugins on every rule.
   */


  process() {
    const {
      plugins
    } = this.options.jss; // We need to clone array because if we modify the index somewhere else during a loop
    // we end up with very hard-to-track-down side effects.

    this.index.slice(0).forEach(plugins.onProcessRule, plugins);
  }
  /**
   * Register a rule in `.map` and `.classes` maps.
   */


  register(rule) {
    this.map[rule.key] = rule;

    if (rule instanceof StyleRule) {
      this.map[rule.selector] = rule;
      if (rule.id) this.classes[rule.key] = rule.id;
    } else if (rule instanceof KeyframesRule && this.keyframes) {
      this.keyframes[rule.name] = rule.id;
    }
  }
  /**
   * Unregister a rule.
   */


  unregister(rule) {
    delete this.map[rule.key];

    if (rule instanceof StyleRule) {
      delete this.map[rule.selector];
      delete this.classes[rule.key];
    } else if (rule instanceof KeyframesRule) {
      delete this.keyframes[rule.name];
    }
  }
  /**
   * Update the function values with a new data.
   */


  update(...args) {
    let name;
    let data;
    let options;

    if (typeof args[0] === 'string') {
      name = args[0]; // $FlowFixMe

      data = args[1]; // $FlowFixMe

      options = args[2];
    } else {
      data = args[0]; // $FlowFixMe

      options = args[1];
      name = null;
    }

    if (name) {
      this.onUpdate(data, this.get(name), options);
    } else {
      for (let index = 0; index < this.index.length; index++) {
        this.onUpdate(data, this.index[index], options);
      }
    }
  }
  /**
   * Execute plugins, update rule props.
   */


  onUpdate(data, rule, options = defaultUpdateOptions) {
    const {
      jss: {
        plugins
      },
      sheet
    } = this.options; // It is a rules container like for e.g. ConditionalRule.

    if (rule.rules instanceof RuleList) {
      rule.rules.update(data, options);
      return;
    }

    const styleRule = rule;
    const {
      style
    } = styleRule;
    plugins.onUpdate(data, rule, sheet, options); // We rely on a new `style` ref in case it was mutated during onUpdate hook.

    if (options.process && style && style !== styleRule.style) {
      // We need to run the plugins in case new `style` relies on syntax plugins.
      plugins.onProcessStyle(styleRule.style, styleRule, sheet); // Update and add props.

      for (const prop in styleRule.style) {
        const nextValue = styleRule.style[prop];
        const prevValue = style[prop]; // We need to use `force: true` because `rule.style` has been updated during onUpdate hook, so `rule.prop()` will not update the CSSOM rule.
        // We do this comparison to avoid unneeded `rule.prop()` calls, since we have the old `style` object here.

        if (nextValue !== prevValue) {
          styleRule.prop(prop, nextValue, forceUpdateOptions);
        }
      } // Remove props.


      for (const prop in style) {
        const nextValue = styleRule.style[prop];
        const prevValue = style[prop]; // We need to use `force: true` because `rule.style` has been updated during onUpdate hook, so `rule.prop()` will not update the CSSOM rule.
        // We do this comparison to avoid unneeded `rule.prop()` calls, since we have the old `style` object here.

        if (nextValue == null && nextValue !== prevValue) {
          styleRule.prop(prop, null, forceUpdateOptions);
        }
      }
    }
  }
  /**
   * Convert rules to a CSS string.
   */


  toString(options) {
    let str = '';
    const {
      sheet
    } = this.options;
    const link = sheet ? sheet.options.link : false;

    for (let index = 0; index < this.index.length; index++) {
      const rule = this.index[index];
      const css = rule.toString(options); // No need to render an empty rule.

      if (!css && !link) continue;
      if (str) str += '\n';
      str += css;
    }

    return str;
  }

}