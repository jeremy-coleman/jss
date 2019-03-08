import toCss from '../utils/toCss';
export class FontFaceRule {
    constructor(key, style, options) {
        this.type = 'font-face';
        this.at = '@font-face';
        this.isProcessed = false;
        this.key = key;
        this.style = style;
        this.options = options;
    }
    /**
     * Generates a CSS string.
     */
    toString(options) {
        if (Array.isArray(this.style)) {
            let str = '';
            for (let index = 0; index < this.style.length; index++) {
                str += toCss(this.key, this.style[index]);
                if (this.style[index + 1])
                    str += '\n';
            }
            return str;
        }
        return toCss(this.key, this.style, options);
    }
}
export default {
    onCreateRule(key, style, options) {
        return key === '@font-face' ? new FontFaceRule(key, style, options) : null;
    }
};
