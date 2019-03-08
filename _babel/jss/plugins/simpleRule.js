export class SimpleRule {
  constructor(key, value, options) {
    this.type = 'simple';
    this.key = void 0;
    this.value = void 0;
    this.options = void 0;
    this.isProcessed = false;
    this.renderable = void 0;
    this.key = key;
    this.value = value;
    this.options = options;
  }
  /**
   * Generates a CSS string.
   */
  // eslint-disable-next-line no-unused-vars


  toString(options) {
    if (Array.isArray(this.value)) {
      let str = '';

      for (let index = 0; index < this.value.length; index++) {
        str += `${this.key} ${this.value[index]};`;
        if (this.value[index + 1]) str += '\n';
      }

      return str;
    }

    return `${this.key} ${this.value};`;
  }

}
const keysMap = {
  '@charset': true,
  '@import': true,
  '@namespace': true
};
export default {
  onCreateRule(key, value, options) {
    return key in keysMap ? new SimpleRule(key, value, options) : null;
  }

};