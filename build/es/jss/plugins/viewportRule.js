import toCss from '../utils/toCss';
export class ViewportRule {
    constructor(key, style, options) {
        this.type = 'viewport';
        this.at = '@viewport';
        this.isProcessed = false;
        this.key = key;
        this.style = style;
        this.options = options;
    }
    /**
     * Generates a CSS string.
     */
    toString(options) {
        return toCss(this.key, this.style, options);
    }
}
export default {
    onCreateRule(key, style, options) {
        return key === '@viewport' || key === '@-ms-viewport'
            ? new ViewportRule(key, style, options)
            : null;
    }
};
