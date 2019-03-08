import { CSSFontFaceRule, RuleOptions, JssStyle, ToCssOptions, BaseRule } from '../types';
export declare class FontFaceRule implements BaseRule {
    type: string;
    at: string;
    key: string;
    style: JssStyle;
    options: RuleOptions;
    isProcessed: boolean;
    renderable: CSSFontFaceRule | undefined | null;
    constructor(key: string, style: JssStyle, options: RuleOptions);
    /**
     * Generates a CSS string.
     */
    toString(options?: ToCssOptions): string;
}
declare const _default: {
    onCreateRule(key: string, style: Object, options: RuleOptions): FontFaceRule;
};
export default _default;
//# sourceMappingURL=fontFaceRule.d.ts.map