import { CSSViewportRule, RuleOptions, JssStyle, ToCssOptions, BaseRule } from '../types';
export declare class ViewportRule implements BaseRule {
    type: string;
    at: string;
    key: string;
    style: JssStyle;
    options: RuleOptions;
    isProcessed: boolean;
    renderable: CSSViewportRule | undefined | null;
    constructor(key: string, style: JssStyle, options: RuleOptions);
    /**
     * Generates a CSS string.
     */
    toString(options?: ToCssOptions): string;
}
declare const _default: {
    onCreateRule(key: string, style: Object, options: RuleOptions): ViewportRule;
};
export default _default;
//# sourceMappingURL=viewportRule.d.ts.map