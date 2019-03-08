import { CSSSimpleRule, RuleOptions, ToCssOptions, BaseRule } from '../types';
export declare class SimpleRule implements BaseRule {
    type: string;
    key: string;
    value: string;
    options: RuleOptions;
    isProcessed: boolean;
    renderable: CSSSimpleRule | undefined | null;
    constructor(key: string, value: string, options: RuleOptions);
    /**
     * Generates a CSS string.
     */
    toString(options?: ToCssOptions): string;
}
declare const _default: {
    onCreateRule(key: string, value: Object, options: RuleOptions): SimpleRule;
};
export default _default;
//# sourceMappingURL=simpleRule.d.ts.map