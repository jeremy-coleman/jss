import warning from 'tiny-warning';
import toCss from '../utils/toCss';
import toCssValue from '../utils/toCssValue';
import escape from '../utils/escape';
export class BaseStyleRule {
  constructor(key, style, options) {
    this.type = 'style';
    this.key = void 0;
    this.isProcessed = false;
    this.style = void 0;
    this.renderer = void 0;
    this.renderable = void 0;
    this.options = void 0;
    const {
      sheet,
      Renderer
    } = options;
    this.key = key;
    this.options = options;
    this.style = style;
    this.renderer = sheet ? sheet.renderer : new Renderer();
  }
  /**
   * Get or set a style property.
   */


  prop(name, value, options) {
    // It's a getter.
    if (value === undefined) return this.style[name]; // Don't do anything if the value has not changed.

    const force = options ? options.force : false;
    if (!force && this.style[name] === value) return this;
    let newValue = value;

    if (!options || options.process !== false) {
      newValue = this.options.jss.plugins.onChangeValue(value, name, this);
    }

    const isEmpty = newValue == null || newValue === false;
    const isDefined = name in this.style; // Value is empty and wasn't defined before.

    if (isEmpty && !isDefined && !force) return this; // We are going to remove this value.

    const remove = isEmpty && isDefined;
    if (remove) delete this.style[name];else this.style[name] = newValue; // Renderable is defined if StyleSheet option `link` is true.

    if (this.renderable) {
      if (remove) this.renderer.removeProperty(this.renderable, name);else this.renderer.setProperty(this.renderable, name, newValue);
      return this;
    }

    const {
      sheet
    } = this.options;

    if (sheet && sheet.attached) {
      warning(false, '[JSS] Rule is not linked. Missing sheet option "link: true".');
    }

    return this;
  }

}
export class StyleRule extends BaseStyleRule {
  constructor(key, style, options) {
    super(key, style, options);
    this.selectorText = void 0;
    this.id = void 0;
    this.renderable = void 0;
    const {
      selector,
      scoped,
      sheet,
      generateId
    } = options;

    if (selector) {
      this.selectorText = selector;
    } else if (scoped !== false) {
      this.id = generateId(this, sheet);
      this.selectorText = `.${escape(this.id)}`;
    }
  }
  /**
   * Set selector string.
   * Attention: use this with caution. Most browsers didn't implement
   * selectorText setter, so this may result in rerendering of entire Style Sheet.
   */


  set selector(selector) {
    if (selector === this.selectorText) return;
    this.selectorText = selector;
    if (!this.renderable) return;
    const hasChanged = this.renderer.setSelector(this.renderable, selector); // If selector setter is not implemented, rerender the rule.

    if (!hasChanged) {
      this.renderer.replaceRule(this.renderable, this);
    }
  }
  /**
   * Get selector string.
   */


  get selector() {
    return this.selectorText;
  }
  /**
   * Apply rule to an element inline.
   */


  applyTo(renderable) {
    const json = this.toJSON();

    for (const prop in json) this.renderer.setProperty(renderable, prop, json[prop]);

    return this;
  }
  /**
   * Returns JSON representation of the rule.
   * Fallbacks are not supported.
   * Useful for inline styles.
   */


  toJSON() {
    const json = {};

    for (const prop in this.style) {
      const value = this.style[prop];
      if (typeof value !== 'object') json[prop] = value;else if (Array.isArray(value)) json[prop] = toCssValue(value);
    }

    return json;
  }
  /**
   * Generates a CSS string.
   */


  toString(options) {
    const {
      sheet
    } = this.options;
    const link = sheet ? sheet.options.link : false;
    const opts = link ? { ...options,
      allowEmpty: true
    } : options;
    return toCss(this.selectorText, this.style, opts);
  }

}
export default {
  onCreateRule(name, style, options) {
    if (name[0] === '@' || options.parent && options.parent.type === 'keyframes') {
      return null;
    }

    return new StyleRule(name, style, options);
  }

};