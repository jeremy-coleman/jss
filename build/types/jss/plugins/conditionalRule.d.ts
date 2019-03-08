import RuleList from '../RuleList';
import { CSSMediaRule, Rule, RuleOptions, ToCssOptions, JssStyle, ContainerRule } from '../types';
/**
 * Conditional rule for @media, @supports
 */
export declare class ConditionalRule implements ContainerRule {
    type: string;
    at: string;
    key: string;
    rules: RuleList;
    options: RuleOptions;
    isProcessed: boolean;
    renderable: CSSMediaRule | undefined | null;
    constructor(key: string, styles: Object, options: RuleOptions);
    /**
     * Get a rule.
     */
    getRule(name: string): Rule;
    /**
     * Get index of a rule.
     */
    indexOf(rule: Rule): number;
    /**
     * Create and register rule, run plugins.
     */
    addRule(name: string, style: JssStyle, options?: RuleOptions): Rule | null;
    /**
     * Generates a CSS string.
     */
    toString(options?: ToCssOptions): string;
}
declare const _default: {
    onCreateRule(key: string, styles: Object, options: RuleOptions): ConditionalRule;
};
export default _default;
//# sourceMappingURL=conditionalRule.d.ts.map