import RuleList from '../RuleList';
const defaultToStringOptions = {
  indent: 1,
  children: true
};
const atRegExp = /@([\w-]+)/;
/**
 * Conditional rule for @media, @supports
 */

export class ConditionalRule {
  constructor(key, styles, options) {
    this.type = 'conditional';
    this.at = void 0;
    this.key = void 0;
    this.rules = void 0;
    this.options = void 0;
    this.isProcessed = false;
    this.renderable = void 0;
    this.key = key;
    const atMatch = key.match(atRegExp);
    this.at = atMatch ? atMatch[1] : 'unknown';
    this.options = options;
    this.rules = new RuleList({ ...options,
      parent: this
    });

    for (const name in styles) {
      this.rules.add(name, styles[name]);
    }

    this.rules.process();
  }
  /**
   * Get a rule.
   */


  getRule(name) {
    return this.rules.get(name);
  }
  /**
   * Get index of a rule.
   */


  indexOf(rule) {
    return this.rules.indexOf(rule);
  }
  /**
   * Create and register rule, run plugins.
   */


  addRule(name, style, options) {
    const rule = this.rules.add(name, style, options);
    if (!rule) return null;
    this.options.jss.plugins.onProcessRule(rule);
    return rule;
  }
  /**
   * Generates a CSS string.
   */


  toString(options = defaultToStringOptions) {
    if (options.children === false) {
      return `${this.key} {}`;
    }

    const children = this.rules.toString(options);
    return children ? `${this.key} {\n${children}\n}` : '';
  }

}
const keyRegExp = /@media|@supports\s+/;
export default {
  onCreateRule(key, styles, options) {
    return keyRegExp.test(key) ? new ConditionalRule(key, styles, options) : null;
  }

};